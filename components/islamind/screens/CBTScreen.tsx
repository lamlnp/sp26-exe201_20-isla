"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { CBT_STEPS } from "@/lib/islamind-mock-data";
import type { NavigateProps } from "@/lib/islamind-types";
import type { CbtRecordValues } from "@/lib/cbt";

interface CBTScreenProps extends NavigateProps {
  onComplete: (values: CbtRecordValues) => Promise<void>;
}

export function CBTScreen({ navigate, onComplete }: CBTScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(CBT_STEPS.length).fill(""));
  const [moodAfter, setMoodAfter] = useState(6);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = CBT_STEPS[currentStep];
  const progress = (currentStep / (CBT_STEPS.length - 1)) * 100;
  const isLastStep = Boolean(step.isLast);
  const fillPct = ((moodAfter - 1) / 9) * 100;

  function updateAnswer(index: number, value: string) {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  }

  async function handleNext() {
    if (isLastStep) {
      setSaving(true);
      setError(null);

      try {
        await onComplete({
          situation: answers[0],
          emotion: answers[1],
          automatic_thought: answers[2],
          evidence_for: answers[3],
          evidence_against: answers[4],
          balanced_thought: answers[5],
          mood_after: moodAfter,
          after_reframe_note: answers[6],
        });
        setDone(true);
      } catch (saveError) {
        setError(
          saveError instanceof Error
            ? saveError.message
            : "Unable to save thought record."
        );
      } finally {
        setSaving(false);
      }
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  // Completion screen
  if (done) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-5 pb-28">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
          <Check size={36} className="text-primary" aria-hidden="true" />
        </div>
        <h2
          className="text-foreground mb-2 text-center font-bold text-pretty"
          style={{ fontSize: 24 }}
        >
          Thought Record complete
        </h2>
        <p className="text-muted-foreground text-center mb-8 text-[15px] leading-relaxed">
          Great work. Examining your thoughts with curiosity is a real skill — and
          your record has been saved.
        </p>
        <div className="w-full bg-card rounded-2xl p-4 border border-border mb-4">
          <p className="text-foreground mb-2 text-[13px] font-semibold">
            Your balanced thought
          </p>
          <p
            className="text-muted-foreground text-sm leading-[1.65] italic"
          >
            &quot;
            {answers[5] ||
              "This exam result is disappointing, but it doesn't define my intelligence or my semester. I can learn from it."}
            &quot;
          </p>
        </div>
        <div className="w-full bg-card rounded-2xl p-4 border border-border mb-4">
          <p className="text-foreground mb-2 text-[13px] font-semibold">
            Mood after reframing
          </p>
          <p className="text-muted-foreground text-sm leading-[1.65]">
            {moodAfter}/10
            {answers[6].trim() ? ` · ${answers[6].trim()}` : ""}
          </p>
        </div>
        <button
          onClick={() => navigate("dashboard")}
          className="w-full h-14 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform mb-3 font-semibold text-base"
        >
          Back to home
        </button>
        <button
          onClick={() => navigate("journal-editor")}
          className="w-full h-12 rounded-xl border border-border bg-card text-foreground flex items-center justify-center font-medium text-sm"
        >
          Write about this in my journal
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={() =>
            currentStep > 0
              ? setCurrentStep(currentStep - 1)
              : navigate("dashboard")
          }
          className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center"
          aria-label={currentStep > 0 ? "Previous step" : "Go back"}
        >
          <ArrowLeft size={18} className="text-foreground" aria-hidden="true" />
        </button>
        <div className="flex-1">
          <h1 className="text-foreground font-bold text-[15px]">
            Thought Record
          </h1>
          <p className="text-muted-foreground text-xs">
            Step {currentStep + 1} of {CBT_STEPS.length}
          </p>
        </div>
      </header>

      {/* Progress bar */}
      <div
        className="mx-5 mb-6 h-1.5 bg-border rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={CBT_STEPS.length}
        aria-label={`Step ${currentStep + 1} of ${CBT_STEPS.length}`}
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step pills */}
      <div
        className="px-5 flex gap-1.5 mb-6 overflow-x-auto scrollbar-hide pb-1"
        aria-label="Steps"
      >
        {CBT_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => i <= currentStep && setCurrentStep(i)}
            disabled={i > currentStep}
            className="flex-shrink-0 px-2.5 py-1 rounded-full border transition-all text-[11px]"
            style={{
              background:
                i === currentStep
                  ? "#2F7D72"
                  : i < currentStep
                  ? "#DDEFEA"
                  : "white",
              borderColor:
                i === currentStep
                  ? "#2F7D72"
                  : i < currentStep
                  ? "#A7C7B7"
                  : "#E5E7EB",
              color:
                i === currentStep
                  ? "white"
                  : i < currentStep
                  ? "#2F7D72"
                  : "#6B7280",
              fontWeight: i === currentStep ? 600 : 400,
              cursor: i <= currentStep ? "pointer" : "default",
            }}
            aria-current={i === currentStep ? "step" : undefined}
          >
            {i < currentStep ? "✓ " : ""}
            {s.label}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-4">
        {/* Step card */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <span
              style={{ fontSize: 28 }}
              role="img"
              aria-label={step.label}
            >
              {step.emoji}
            </span>
            <div>
              <p className="text-foreground font-bold" style={{ fontSize: 17 }}>
                {step.title}
              </p>
              <p className="text-muted-foreground text-xs">{step.label}</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4 text-sm leading-[1.65]">
            {step.desc}
          </p>
          {isLastStep ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-foreground font-semibold text-sm">
                    Mood after reframing
                  </p>
                  <span className="text-primary font-bold text-sm">
                    {moodAfter}/10
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={moodAfter}
                  onChange={(event) => setMoodAfter(Number(event.target.value))}
                  className="isla-range w-full"
                  style={{
                    background: `linear-gradient(to right, #2F7D72 0%, #2F7D72 ${fillPct}%, #E5E7EB ${fillPct}%, #E5E7EB 100%)`,
                  }}
                  aria-label="Mood after reframing"
                  aria-valuemin={1}
                  aria-valuemax={10}
                  aria-valuenow={moodAfter}
                />
              </div>
              <textarea
                value={answers[currentStep]}
                onChange={(e) => updateAnswer(currentStep, e.target.value)}
                placeholder={step.placeholder}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm leading-relaxed"
                aria-label="After reframe note"
              />
            </div>
          ) : (
            <textarea
              value={answers[currentStep]}
              onChange={(e) => updateAnswer(currentStep, e.target.value)}
              placeholder={step.placeholder}
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm leading-relaxed"
              aria-label={step.title}
            />
          )}
        </div>

        {error && (
          <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {/* Previous answers (collapsed summary) */}
        {currentStep > 0 && answers[currentStep - 1] && (
          <div className="bg-card rounded-2xl p-4 border border-border opacity-60">
            <p className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wide mb-1">
              Previous: {CBT_STEPS[currentStep - 1].label}
            </p>
            <p className="text-foreground text-[13px] leading-relaxed line-clamp-2">
              {answers[currentStep - 1]}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 h-12 rounded-2xl border border-border bg-card text-foreground flex items-center justify-center gap-2 font-medium text-sm"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={saving}
            className="flex-1 h-12 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform font-semibold text-sm disabled:opacity-60"
          >
            {isLastStep ? (saving ? "Saving..." : "Complete") : "Next"}
            {!isLastStep && <ArrowRight size={16} aria-hidden="true" />}
            {isLastStep && <Check size={16} aria-hidden="true" />}
          </button>
        </div>

        {/* Safety note */}
        <p className="text-center text-muted-foreground text-[11px] leading-relaxed pb-4">
          This is a self-guided exercise. It is not therapy or clinical treatment.
          If you are struggling significantly, please speak with a professional.
        </p>
      </div>
    </main>
  );
}
