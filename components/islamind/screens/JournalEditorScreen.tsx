"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles, Save } from "lucide-react";
import type { NavigateProps } from "@/lib/islamind-types";

const emotions = [
  "Anxious", "Calm", "Happy", "Sad",
  "Frustrated", "Tired", "Hopeful", "Overwhelmed",
];
const tags = ["Study stress", "Social", "Sleep", "Family", "Health", "Personal"];

export function JournalEditorScreen({ navigate }: NavigateProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mood, setMood] = useState(6);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(["Anxious"]);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Study stress"]);

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
    <main className="min-h-screen bg-card pb-8">
      {/* Sticky header */}
      <header className="flex items-center justify-between px-6 pt-14 pb-4 bg-card sticky top-0 z-10 border-b border-border">
        <button
          onClick={() => navigate("journal-list")}
          className="w-10 h-10 rounded-full bg-background hover:bg-border transition-colors flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-foreground" aria-hidden="true" />
        </button>
        <h1 className="text-foreground font-bold text-base">New Entry</h1>
        <button
          onClick={() => navigate("journal-list")}
          className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center"
          aria-label="Save entry"
        >
          <Save size={16} className="text-white" aria-hidden="true" />
        </button>
      </header>

      <div className="px-6 space-y-6 pt-4">
        {/* Date + mood badge */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-[13px] font-medium">
            Thursday, June 11 · 9:14 AM
          </p>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary">
            <span className="text-primary font-bold text-[13px]">
              Mood {mood}/10
            </span>
          </div>
        </div>

        {/* Mood slider panel */}
        <div className="bg-background rounded-3xl p-5 border border-border">
          <p className="text-foreground font-semibold text-sm mb-3">
            Adjust Mood
          </p>
          <input
            type="range"
            min={1}
            max={10}
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="isla-range w-full mb-4"
            style={{
              background: `linear-gradient(to right, #2F7D72 0%, #2F7D72 ${fillPct}%, #E5E7EB ${fillPct}%, #E5E7EB 100%)`,
            }}
            aria-label="Mood level"
            aria-valuemin={1}
            aria-valuemax={10}
            aria-valuenow={mood}
          />

          {/* Emotion chips */}
          <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Select emotions">
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
                    background: active ? "#DDEFEA" : "white",
                    borderColor: active ? "#2F7D72" : "#E5E7EB",
                    color: active ? "#2F7D72" : "#6B7280",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {e}
                </button>
              );
            })}
          </div>

          {/* Tag chips */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Select tags">
            {tags.map((t) => {
              const active = selectedTags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  aria-pressed={active}
                  className="px-3 py-1 rounded-full border transition-all text-[12px]"
                  style={{
                    background: active ? "#FFF0E6" : "transparent",
                    borderColor: active ? "#F2B880" : "transparent",
                    color: active ? "#B25C00" : "#6B7280",
                    fontWeight: 500,
                  }}
                >
                  #{t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give this entry a title..."
          className="w-full px-0 py-2 bg-transparent border-b border-border text-foreground placeholder:text-[#A7C7B7] outline-none transition-colors focus:border-primary font-bold"
          style={{ fontSize: 24, letterSpacing: "-0.5px" }}
          aria-label="Entry title"
        />

        {/* Editor */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind today? Write freely — this is your private space. There are no rules here, and no one will read this unless you choose to share it."
          rows={12}
          className="w-full bg-transparent text-foreground placeholder:text-[#A7C7B7] outline-none resize-none text-base"
          style={{ lineHeight: 1.7 }}
          aria-label="Journal entry"
        />

        {/* AI Reflection CTA */}
        <div className="bg-[#F0F9F6] rounded-3xl p-5 border border-secondary">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
              <Sparkles size={18} className="text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-foreground font-semibold text-[15px]">
                AI Reflection
              </p>
              <p className="text-primary text-[13px] font-medium">
                Get a gentle, thoughtful mirror
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4 text-[13px] leading-relaxed">
            IslaMind&apos;s AI will reflect back themes and patterns from your
            writing. This is not clinical advice or a diagnosis.
          </p>
          <button
            onClick={() => navigate("ai-reflection")}
            className="w-full h-12 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm font-semibold text-[15px]"
          >
            <Sparkles size={16} aria-hidden="true" />
            Generate reflection
          </button>
        </div>
      </div>
    </main>
  );
}
