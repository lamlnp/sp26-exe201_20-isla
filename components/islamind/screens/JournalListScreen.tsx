"use client";

import { useState } from "react";
import { Plus, Search, ChevronRight, Sparkles } from "lucide-react";
import { JOURNAL_ENTRIES } from "@/lib/islamind-mock-data";
import type { NavigateProps } from "@/lib/islamind-types";

function moodColor(mood: number): string {
  if (mood >= 7) return "#2F7D72";
  if (mood >= 5) return "#A7C7B7";
  return "#F2B880";
}

export function JournalListScreen({ navigate }: NavigateProps) {
  const [search, setSearch] = useState("");

  const filtered = JOURNAL_ENTRIES.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Sticky header */}
      <header className="px-6 pt-14 pb-6 bg-card border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between mb-5">
          <h1
            className="text-foreground font-bold"
            style={{ fontSize: 24, letterSpacing: "-0.5px" }}
          >
            Journal
          </h1>
          <button
            onClick={() => navigate("journal-editor")}
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center shadow-sm"
            aria-label="New journal entry"
          >
            <Plus size={20} className="text-white" aria-hidden="true" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search entries..."
            className="w-full h-12 pl-11 pr-4 rounded-2xl bg-background border border-transparent text-foreground placeholder:text-muted-foreground outline-none focus:bg-card focus:border-primary focus:ring-2 focus:ring-secondary transition-all text-[15px]"
            aria-label="Search journal entries"
          />
        </div>
      </header>

      <div className="px-6 py-6 space-y-4">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-10 text-sm">
            No entries found.
          </p>
        )}
        {filtered.map((entry) => (
          <button
            key={entry.id}
            onClick={() => navigate("journal-editor")}
            className="bg-card rounded-3xl p-5 border border-border w-full text-left hover:border-[#A7C7B7] transition-colors shadow-sm"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-foreground font-semibold text-base">
                {entry.title}
              </p>
              <ChevronRight
                size={18}
                className="text-border flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-muted-foreground text-[13px] font-medium">
                {entry.date}
              </span>
              <span
                className="w-1 h-1 rounded-full bg-border"
                aria-hidden="true"
              />
              <span
                className="text-[13px] font-semibold"
                style={{ color: moodColor(entry.mood) }}
              >
                {entry.mood}/10
              </span>
            </div>

            {/* Emotion chips */}
            <div className="flex gap-1.5 mb-3" role="list" aria-label="Emotions">
              {entry.emotions.map((em) => (
                <span
                  key={em}
                  role="listitem"
                  className="px-2 py-0.5 rounded-full bg-secondary text-primary text-[11px] font-medium"
                >
                  {em}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {entry.preview}
            </p>

            {entry.hasReflection && (
              <div className="flex items-center gap-1.5 mt-3">
                <Sparkles
                  size={12}
                  className="text-primary"
                  aria-hidden="true"
                />
                <span className="text-primary text-[11px] font-medium">
                  AI reflection
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </main>
  );
}
