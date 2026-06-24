import { createClient } from "@supabase/supabase-js";

let browserClient: ReturnType<typeof createClient<any>> | null = null;

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase public environment variables.");
  }

  return { url, anonKey };
}

export function createBrowserSupabaseClient() {
  if (browserClient) return browserClient;

  const { url, anonKey } = getSupabaseConfig();

  browserClient = createClient<any>(url, anonKey);
  return browserClient;
}
