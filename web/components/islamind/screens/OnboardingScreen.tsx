"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  GENDER_OPTIONS,
  LIFE_CONTEXT_OPTIONS,
  type GenderValue,
  type LifeContext,
  type Profile,
} from "@/lib/islamind-auth";
import { ONBOARDING_STEPS } from "@/lib/islamind-mock-data";
import type { NavigateProps } from "@/lib/islamind-types";

interface OnboardingScreenProps extends NavigateProps {
  profile: Profile | null;
  onComplete: (values: {
    age: number | null;
    gender: GenderValue | null;
    life_context: LifeContext | null;
  }) => Promise<void>;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to save onboarding.";
}

export function OnboardingScreen({
  profile,
  onComplete,
}: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(profile?.age?.toString() ?? "");
  const [gender, setGender] = useState<GenderValue | "">(profile?.gender ?? "");
  const [lifeContext, setLifeContext] = useState<LifeContext | "">(
    profile?.life_context ?? ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = ONBOARDING_STEPS.length + 1;
  const isProfileStep = step === ONBOARDING_STEPS.length;
  const current = ONBOARDING_STEPS[step];

  async function finish(skipOptional = false) {
    setError(null);
    setIsSubmitting(true);

    try {
      await onComplete({
        age: skipOptional || age === "" ? null : Number(age),
        gender: skipOptional || gender === "" ? null : gender,
        life_context: skipOptional || lifeContext === "" ? null : lifeContext,
      });
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setIsSubmitting(false);
    }
  }

  function next() {
    if (isProfileStep) {
      finish(false);
      return;
    }

    setStep(step + 1);
  }

  return (
    <main className="min-h-screen bg-background flex flex-col px-6 pt-16 pb-10">
      <div
        className="flex gap-2 mb-12"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${step + 1} of ${totalSteps}`}
      >
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all"
            style={{
              flex: i === step ? 2 : 1,
              background: i <= step ? "#2F7D72" : "#E5E7EB",
            }}
          />
        ))}
      </div>

      {!isProfileStep ? (
        <div
          className="rounded-3xl p-8 mb-8 flex-1 flex flex-col items-center justify-center text-center"
          style={{
            background: current.bg,
            border: current.important ? "2px solid #FED7D7" : "none",
          }}
        >
          <span style={{ fontSize: 64 }} aria-hidden="true">
            {current.emoji}
          </span>
          <h2
            className="text-foreground mt-6 mb-3 font-bold text-balance"
            style={{ fontSize: 24, letterSpacing: -0.3 }}
          >
            {current.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base">
            {current.desc}
          </p>
          {current.important && (
            <div className="mt-4 px-4 py-2 rounded-xl bg-card border border-[#FED7D7]">
              <p className="text-destructive text-[13px] font-medium">
                For emergencies, always contact your local emergency services
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl p-6 mb-8 flex-1 bg-card border border-border">
          <h2
            className="text-foreground mb-2 font-bold"
            style={{ fontSize: 24, letterSpacing: -0.3 }}
          >
            Personalize your space
          </h2>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            These details are optional and help shape future reflections.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="onboarding-age"
                className="block text-foreground mb-1.5 text-[13px] font-semibold"
              >
                Age
              </label>
              <input
                id="onboarding-age"
                type="number"
                min={12}
                max={120}
                value={age}
                onChange={(event) => setAge(event.target.value)}
                placeholder="Optional"
                className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label
                htmlFor="onboarding-gender"
                className="block text-foreground mb-1.5 text-[13px] font-semibold"
              >
                Gender
              </label>
              <select
                id="onboarding-gender"
                value={gender}
                onChange={(event) => setGender(event.target.value as GenderValue | "")}
                className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Skip</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="onboarding-life-context"
                className="block text-foreground mb-1.5 text-[13px] font-semibold"
              >
                Are you working or studying?
              </label>
              <select
                id="onboarding-life-context"
                value={lifeContext}
                onChange={(event) =>
                  setLifeContext(event.target.value as LifeContext | "")
                }
                className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Skip</option>
                {LIFE_CONTEXT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="mb-3 rounded-xl bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
          {error}
        </p>
      )}

      <p className="text-center text-muted-foreground mb-5 text-[13px]">
        {step + 1} of {totalSteps}
      </p>

      <button
        onClick={next}
        disabled={isSubmitting}
        className="w-full h-14 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform font-semibold text-base disabled:opacity-70"
      >
        {isProfileStep
          ? isSubmitting
            ? "Saving..."
            : "Finish"
          : "Continue"}
        <ArrowRight size={18} aria-hidden="true" />
      </button>

      <button
        onClick={() => finish(true)}
        disabled={isSubmitting}
        className="mt-3 w-full py-3 text-center text-muted-foreground text-sm disabled:opacity-70"
      >
        Skip for now
      </button>
    </main>
  );
}
