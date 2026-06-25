import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export interface MoodCheckin {
  id: string;
  user_id: string;
  mood_score: number;
  emotions: string[];
  tags: string[];
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface MoodCheckinValues {
  mood_score: number;
  emotions: string[];
  tags: string[];
  note: string | null;
}

export interface MoodChartPoint {
  day: string;
  mood: number;
}

export interface TopEmotion {
  name: string;
  count: number;
  color: string;
}

const MOOD_COLUMNS =
  "id, user_id, mood_score, emotions, tags, note, created_at, updated_at";

const emotionColors = ["#F2B880", "#A7C7B7", "#2F7D72", "#6B7280", "#DDEFEA"];

export const MOOD_EMOTIONS = [
  "😊 Happy",
  "😌 Calm",
  "😟 Anxious",
  "😔 Sad",
  "😤 Frustrated",
  "😴 Tired",
  "🤩 Excited",
  "😐 Neutral",
  "🥺 Overwhelmed",
  "💪 Motivated",
];

export const MOOD_TAGS = [
  "Study stress",
  "Social anxiety",
  "Sleep issues",
  "Relationship",
  "Health",
  "Family",
  "Work/intern",
  "Self-doubt",
  "Physical activity",
  "Good news",
];

export const MOOD_EMOJIS = ["😭", "😢", "😟", "😕", "😐", "🙂", "😊", "😁", "🤩", "🥳"];

export const MOOD_LABELS = [
  "Very bad",
  "Bad",
  "Low",
  "A bit low",
  "Okay",
  "Good",
  "Pretty good",
  "Great",
  "Excellent",
  "Amazing",
];

function supabase() {
  return createBrowserSupabaseClient();
}

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

function average(values: number[]) {
  if (values.length === 0) return null;
  return roundOne(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function chartDataForDays(checkins: MoodCheckin[], days: number) {
  const today = startOfLocalDay(new Date());
  const buckets = new Map<string, number[]>();

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    buckets.set(dateKey(date), []);
  }

  checkins.forEach((checkin) => {
    const key = dateKey(new Date(checkin.created_at));
    buckets.get(key)?.push(checkin.mood_score);
  });

  return Array.from(buckets.entries())
    .map(([key, values]) => {
      const date = new Date(`${key}T00:00:00`);
      return {
        day:
          days <= 7
            ? date.toLocaleDateString("en-US", { weekday: "short" })
            : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        mood: average(values),
      };
    })
    .filter((point): point is MoodChartPoint => point.mood !== null);
}

export async function createMoodCheckin(
  userId: string,
  values: MoodCheckinValues
) {
  const { data, error } = await supabase()
    .from("mood_checkins")
    .insert({ ...values, user_id: userId })
    .select(MOOD_COLUMNS)
    .single();

  if (error) throw error;
  return data as MoodCheckin;
}

export async function listMoodCheckins(userId: string, limit = 90) {
  const { data, error } = await supabase()
    .from("mood_checkins")
    .select(MOOD_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as MoodCheckin[];
}

export async function updateMoodCheckin(
  id: string,
  userId: string,
  values: MoodCheckinValues
) {
  const { data, error } = await supabase()
    .from("mood_checkins")
    .update(values)
    .eq("id", id)
    .eq("user_id", userId)
    .select(MOOD_COLUMNS)
    .single();

  if (error) throw error;
  return data as MoodCheckin;
}

export async function deleteMoodCheckin(id: string, userId: string) {
  const { error } = await supabase()
    .from("mood_checkins")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}

export function getSevenDayMoodData(checkins: MoodCheckin[]) {
  return chartDataForDays(checkins, 7);
}

export function getThirtyDayMoodData(checkins: MoodCheckin[]) {
  return chartDataForDays(checkins, 30);
}

export function getAverageMood(checkins: MoodCheckin[], days?: number) {
  const since = days
    ? new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    : null;
  const scores = checkins
    .filter((checkin) => !since || new Date(checkin.created_at) >= since)
    .map((checkin) => checkin.mood_score);

  return average(scores);
}

export function getMoodStreak(checkins: MoodCheckin[]) {
  const days = new Set(
    checkins.map((checkin) => dateKey(startOfLocalDay(new Date(checkin.created_at))))
  );
  const cursor = startOfLocalDay(new Date());
  let streak = 0;

  while (days.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function getTopEmotions(checkins: MoodCheckin[], limit = 5): TopEmotion[] {
  const counts = new Map<string, number>();

  checkins.forEach((checkin) => {
    checkin.emotions.forEach((emotion) => {
      counts.set(emotion, (counts.get(emotion) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count], index) => ({
      name,
      count,
      color: emotionColors[index % emotionColors.length],
    }));
}

export function formatMoodDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
