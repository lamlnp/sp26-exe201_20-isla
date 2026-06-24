"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { NavigateProps } from "@/lib/islamind-types";

const emotions = [
  "😊 Happy", "😌 Calm", "😟 Anxious", "😔 Sad",
  "😤 Frustrated", "😴 Tired", "🤩 Excited", "😐 Neutral",
  "🥺 Overwhelmed", "💪 Motivated",
];
const tags = [
  "Study stress", "Social anxiety", "Sleep issues", "Relationship",
  "Health", "Family", "Work/intern", "Self-doubt", "Physical activity", "Good news",
];
const moodEmojis = ["😭", "😢", "😟", "😕", "😐", "🙂", "😊", "😁", "🤩", "🥳"];
const moodLabels = [
  "Very bad", "Bad", "Low", "A bit low", "Okay",
  "Good", "Pretty good", "Great", "Excellent", "Amazing",
];

export function MoodCheckinScreen({ navigate }: NavigateProps) {
  const [mood, setMood] = useState(6);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const fillPct = ((mood - 1) / 9) * 100;

  function toggleEmotion(e: string) {
    setSelectedEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  }

  function toggleTag(t: string) {
    setSelectedTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  return (
    <main className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={() => navigate("dashboard")}
          className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-foreground" aria-hidden="true" />
        </button>
        <h1 className="text-foreground font-bold" style={{ fontSize: 18 }}>
          Mood check-in
        </h1>
      </header>

      <div className="px-5 space-y-6">
        {/* Mood scale */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-foreground mb-4 text-center font-semibold text-[15px]">
            How are you feeling right now?
          </p>

          {/* Emoji & score */}
          <div className="flex flex-col items-center mb-6">
            <span
              style={{ fontSize: 56 }}
              role="img"
              aria-label={moodLabels[mood - 1]}
            >
              {moodEmojis[mood - 1]}
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-primary font-bold" style={{ fontSize: 36 }}>
                {mood}
              </span>
              <span className="text-muted-foreground text-base">/ 10</span>
            </div>
            <span className="text-muted-foreground mt-1 text-sm">
              {moodLabels[mood - 1]}
            </span>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min={1}
              max={10}
              value={mood}
              onChange={(e) => setMood(Number(e.target.value))}
              className="isla-range w-full"
              style={{
                background: `linear-gradient(to right, #2F7D72 0%, #2F7D72 ${fillPct}%, #E5E7EB ${fillPct}%, #E5E7EB 100%)`,
              }}
              aria-label="Mood level"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={mood}
            />
            <div className="flex justify-between mt-1.5" aria-hidden="true">
              <span className="text-muted-foreground text-[11px]">1</span>
              <span className="text-muted-foreground text-[11px]">10</span>
            </div>
          </div>
        </div>

        {/* Emotion chips */}
        <div>
          <p className="text-foreground mb-3 text-sm font-semibold">
            What emotions are present?
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Select emotions">
            {emotions.map((e) => {
              const active = selectedEmotions.includes(e);
              return (
                <button
                  key={e}
                  type="button"
                  onClick={() => toggleEmotion(e)}
                  aria-pressed={active}
                  className="px-3 py-1.5 rounded-full border transition-all text-[13px]"
                  style={{
                    fontWeight: active ? 600 : 500,
                    background: active ? "#DDEFEA" : "#fff",
                    borderColor: active ? "#2F7D72" : "#E5E7EB",
                    color: active ? "#2F7D72" : "#263238",
                  }}
                >
                  {e}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tag chips */}
        <div>
          <p className="text-foreground mb-3 text-sm font-semibold">
            What&apos;s it related to?{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Select tags">
            {tags.map((t) => {
              const active = selectedTags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  aria-pressed={active}
                  className="px-3 py-1.5 rounded-full border transition-all text-[12px] font-medium"
                  style={{
                    background: active ? "#FFF0E6" : "#fff",
                    borderColor: active ? "#F2B880" : "#E5E7EB",
                    color: active ? "#B25C00" : "#6B7280",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional note */}
        <div>
          <p className="text-foreground mb-2 text-sm font-semibold">
            A quick note{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind? Just a sentence is fine..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm"
            aria-label="Optional note"
          />
        </div>

        {/* Save */}
        <button
          onClick={() => navigate("dashboard")}
          className="w-full h-14 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform font-semibold text-base"
        >
          Save check-in
          <ChevronRight size={18} aria-hidden="true" />
        </button>

        <p className="text-center text-muted-foreground text-xs pb-4">
          Your mood data is private and stored only on your account.
        </p>
      </div>
    </main>
  );
}
