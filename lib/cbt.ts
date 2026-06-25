import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export interface CbtRecord {
  id: string;
  user_id: string;
  situation: string | null;
  emotion: string | null;
  automatic_thought: string | null;
  evidence_for: string | null;
  evidence_against: string | null;
  balanced_thought: string | null;
  mood_after: number | null;
  after_reframe_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface CbtRecordValues {
  situation: string | null;
  emotion: string | null;
  automatic_thought: string | null;
  evidence_for: string | null;
  evidence_against: string | null;
  balanced_thought: string | null;
  mood_after: number | null;
  after_reframe_note: string | null;
}

const CBT_COLUMNS =
  "id, user_id, situation, emotion, automatic_thought, evidence_for, evidence_against, balanced_thought, mood_after, after_reframe_note, created_at, updated_at";

function supabase() {
  return createBrowserSupabaseClient();
}

function cleanText(value: string | null) {
  const nextValue = value?.trim();
  return nextValue || null;
}

function cleanValues(values: CbtRecordValues): CbtRecordValues {
  return {
    situation: cleanText(values.situation),
    emotion: cleanText(values.emotion),
    automatic_thought: cleanText(values.automatic_thought),
    evidence_for: cleanText(values.evidence_for),
    evidence_against: cleanText(values.evidence_against),
    balanced_thought: cleanText(values.balanced_thought),
    mood_after: values.mood_after,
    after_reframe_note: cleanText(values.after_reframe_note),
  };
}

export async function createCbtRecord(userId: string, values: CbtRecordValues) {
  const { data, error } = await supabase()
    .from("cbt_records")
    .insert({ ...cleanValues(values), user_id: userId })
    .select(CBT_COLUMNS)
    .single();

  if (error) throw error;
  return data as CbtRecord;
}

export async function listCbtRecords(userId: string, limit = 20) {
  const { data, error } = await supabase()
    .from("cbt_records")
    .select(CBT_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as CbtRecord[];
}
