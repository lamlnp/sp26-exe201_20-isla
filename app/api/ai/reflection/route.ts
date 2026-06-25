import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  BANGKOK_RESET_LABEL,
  BASIC_DAILY_AI_LIMIT,
  buildReflectionPrompt,
  getFallbackReflection,
  getSafetyFallbackReflection,
  hasCrisisLikeText,
  mapReflectionRow,
  validateReflectionJson,
  type AIReflectionContent,
} from "@/lib/ai/reflection";

export const runtime = "nodejs";

const REFLECTION_COLUMNS =
  "id, journal_entry_id, emotional_summary, possible_theme, reflective_question, small_action, safety_note, is_mock, created_at";

function getBearerToken(request: Request) {
  const header = request.headers.get("authorization");
  const match = header?.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
}

function liveAiEnabled() {
  return Boolean(
    process.env.OPENAI_API_KEY &&
      process.env.OPENAI_MODEL &&
      process.env.OPENAI_REFLECTION_LIVE_APPROVED === "true"
  );
}

async function callOpenAI(prompt: string): Promise<AIReflectionContent | null> {
  if (!liveAiEnabled()) return null;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Return only valid JSON for a short self-reflection. Do not include markdown.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string") return null;

    return validateReflectionJson(JSON.parse(content));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const accessToken = getBearerToken(request);
  if (!accessToken) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const supabase = createServerSupabaseClient(accessToken);
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  let journalEntryId: unknown;
  try {
    journalEntryId = (await request.json())?.journalEntryId;
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  if (typeof journalEntryId !== "string" || !journalEntryId.trim()) {
    return NextResponse.json({ error: "INVALID_JOURNAL_ENTRY_ID" }, { status: 400 });
  }

  const { data: entry, error: entryError } = await supabase
    .from("journal_entries")
    .select("id, user_id, content")
    .eq("id", journalEntryId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (entryError) {
    return NextResponse.json({ error: "UNABLE_TO_LOAD_ENTRY" }, { status: 500 });
  }

  if (!entry) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  if (hasCrisisLikeText(entry.content)) {
    return NextResponse.json({
      reflection: getSafetyFallbackReflection(entry.id),
      blockedNormalReflection: true,
    });
  }

  const { data: existing, error: existingError } = await supabase
    .from("ai_reflections")
    .select(REFLECTION_COLUMNS)
    .eq("user_id", user.id)
    .eq("journal_entry_id", entry.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json(
      { error: "UNABLE_TO_LOAD_REFLECTION" },
      { status: 500 }
    );
  }

  if (existing) {
    return NextResponse.json({ reflection: mapReflectionRow(existing) });
  }

  const { data: quotaRows, error: quotaError } = await supabase.rpc(
    "consume_current_user_ai_quota",
    { p_daily_limit: BASIC_DAILY_AI_LIMIT }
  );

  if (quotaError) {
    return NextResponse.json({ error: "UNABLE_TO_CHECK_QUOTA" }, { status: 500 });
  }

  const quota = Array.isArray(quotaRows) ? quotaRows[0] : quotaRows;
  if (!quota?.allowed) {
    return NextResponse.json(
      {
        error: "AI_REQUEST_LIMIT_REACHED",
        upgradeRequired: true,
        plan: "basic",
        dailyLimit: BASIC_DAILY_AI_LIMIT,
        resetsAt: BANGKOK_RESET_LABEL,
      },
      { status: 429 }
    );
  }

  const providerReflection = await callOpenAI(buildReflectionPrompt(entry.content));
  const reflection = providerReflection ?? getFallbackReflection();
  const isMock = !providerReflection;

  const { data: inserted, error: insertError } = await supabase
    .from("ai_reflections")
    .insert({
      user_id: user.id,
      journal_entry_id: entry.id,
      emotional_summary: reflection.emotionalSummary,
      possible_theme: reflection.possibleTheme,
      reflective_question: reflection.reflectiveQuestion,
      small_action: reflection.smallAction,
      safety_note: reflection.safetyNote,
      model: providerReflection ? process.env.OPENAI_MODEL : "fallback",
      is_mock: isMock,
    })
    .select(REFLECTION_COLUMNS)
    .single();

  if (insertError) {
    return NextResponse.json({ error: "UNABLE_TO_SAVE_REFLECTION" }, { status: 500 });
  }

  return NextResponse.json({ reflection: mapReflectionRow(inserted) });
}
