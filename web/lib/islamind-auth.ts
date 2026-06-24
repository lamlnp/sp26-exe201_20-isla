import type { Session } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export type Plan = "basic" | "companion";
export type GenderValue = "male" | "female" | "fggt_cnt";
export type LifeContext = "working" | "studying" | "both" | "none";

export interface Profile {
  id: string;
  display_name: string | null;
  age: number | null;
  gender: GenderValue | null;
  life_context: LifeContext | null;
  onboarding_completed: boolean;
  plan: Plan;
  daily_ai_request_count: number;
  daily_ai_request_date: string | null;
}

export const GENDER_OPTIONS: { value: GenderValue; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "fggt_cnt", label: "Other / Questioning" },
];

export const LIFE_CONTEXT_OPTIONS: { value: LifeContext; label: string }[] = [
  { value: "working", label: "Working" },
  { value: "studying", label: "Studying" },
  { value: "both", label: "Working and studying" },
  { value: "none", label: "None right now" },
];

const PROFILE_COLUMNS =
  "id, display_name, age, gender, life_context, onboarding_completed, plan, daily_ai_request_count, daily_ai_request_date";

function supabase() {
  return createBrowserSupabaseClient();
}

export function getGenderLabel(value: GenderValue | null | undefined) {
  return GENDER_OPTIONS.find((option) => option.value === value)?.label ?? "";
}

export async function getCurrentSession() {
  const { data, error } = await supabase().auth.getSession();
  if (error) throw error;
  return data.session;
}

export function onSessionChange(callback: (session: Session | null) => void) {
  const { data } = supabase().auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return data.subscription;
}

export async function loadProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase()
    .from("profiles")
    .select(PROFILE_COLUMNS)
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function waitForProfile(userId: string): Promise<Profile> {
  let lastError: unknown;

  for (let i = 0; i < 5; i += 1) {
    try {
      return await loadProfile(userId);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  throw lastError;
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase().auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) throw error;
  return data.session;
}

export async function signUpWithPassword(
  name: string,
  email: string,
  password: string
) {
  const displayName = name.trim();
  const { data, error } = await supabase().auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        display_name: displayName,
        name: displayName,
      },
    },
  });

  if (error) throw error;
  return data.session;
}

export async function updateProfile(
  userId: string,
  values: Partial<
    Pick<
      Profile,
      "display_name" | "age" | "gender" | "life_context" | "onboarding_completed"
    >
  >
) {
  const { data, error } = await supabase()
    .from("profiles")
    .update(values)
    .eq("id", userId)
    .select(PROFILE_COLUMNS)
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function upgradeToCompanion() {
  const { error } = await supabase().rpc("upgrade_current_user_to_companion");
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase().auth.signOut();
  if (error) throw error;
}
