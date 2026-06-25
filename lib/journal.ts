import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  mood_score: number | null;
  emotions: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface JournalEntryValues {
  title: string | null;
  content: string;
  mood_score: number | null;
  emotions: string[];
  tags: string[];
}

const JOURNAL_COLUMNS =
  "id, user_id, title, content, mood_score, emotions, tags, created_at, updated_at";

function supabase() {
  return createBrowserSupabaseClient();
}

function cleanValues(values: JournalEntryValues): JournalEntryValues {
  const content = values.content.trim();
  if (!content) throw new Error("Journal content is required.");

  const title = values.title?.trim() || null;

  return {
    ...values,
    title,
    content,
    emotions: values.emotions.filter(Boolean),
    tags: values.tags.filter(Boolean),
  };
}

export async function createJournalEntry(
  userId: string,
  values: JournalEntryValues
) {
  const { data, error } = await supabase()
    .from("journal_entries")
    .insert({ ...cleanValues(values), user_id: userId })
    .select(JOURNAL_COLUMNS)
    .single();

  if (error) throw error;
  return data as JournalEntry;
}

export async function listJournalEntries(userId: string, limit = 100) {
  const { data, error } = await supabase()
    .from("journal_entries")
    .select(JOURNAL_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as JournalEntry[];
}

export async function updateJournalEntry(
  id: string,
  userId: string,
  values: JournalEntryValues
) {
  const { data, error } = await supabase()
    .from("journal_entries")
    .update(cleanValues(values))
    .eq("id", id)
    .eq("user_id", userId)
    .select(JOURNAL_COLUMNS)
    .single();

  if (error) throw error;
  return data as JournalEntry;
}

export async function deleteJournalEntry(id: string, userId: string) {
  const { error } = await supabase()
    .from("journal_entries")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}

export function formatJournalDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getJournalTitle(entry: JournalEntry) {
  return entry.title?.trim() || "Untitled entry";
}

export function getJournalPreview(entry: JournalEntry, length = 120) {
  const text = entry.content.replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

export function getRecentJournalEntry(entries: JournalEntry[]) {
  return entries[0] ?? null;
}
