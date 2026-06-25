import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type {
  AIReflectionApiResponse,
  AIReflectionRequest,
} from "@/lib/ai/reflection";

export async function requestAIReflection(
  request: AIReflectionRequest
): Promise<AIReflectionApiResponse> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  const accessToken = data.session?.access_token;
  if (!accessToken) throw new Error("Please sign in before generating a reflection.");

  const response = await fetch("/api/ai/reflection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(request),
  });

  const body = (await response.json()) as AIReflectionApiResponse | { error?: string };
  const errorCode = "error" in body ? body.error : undefined;
  if (!response.ok && errorCode !== "AI_REQUEST_LIMIT_REACHED") {
    throw new Error(errorCode || "Unable to generate reflection.");
  }

  return body as AIReflectionApiResponse;
}
