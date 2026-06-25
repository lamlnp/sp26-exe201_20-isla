"use client";

import { useState } from "react";
import { Plus, Search, ChevronRight, Trash2 } from "lucide-react";
import type { NavigateProps } from "@/lib/islamind-types";
import type { JournalEntry } from "@/lib/journal";
import {
  formatJournalDate,
  getJournalPreview,
  getJournalTitle,
} from "@/lib/journal";

function moodColor(mood: number): string {
  if (mood >= 7) return "#2F7D72";
  if (mood >= 5) return "#A7C7B7";
  return "#F2B880";
}

interface JournalListScreenProps extends NavigateProps {
  entries: JournalEntry[];
  loading: boolean;
  error: string | null;
  onCreate: () => void;
  onOpen: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export function JournalListScreen({
  entries,
  loading,
  error,
  onCreate,
  onOpen,
  onDelete,
}: JournalListScreenProps) {
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const query = search.trim().toLowerCase();

  const filtered = query
    ? entries.filter((entry) =>
        [
          entry.title ?? "",
          entry.content,
          ...entry.emotions,
          ...entry.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : entries;

  async function deleteEntry(id: string) {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }

    setDeletingId(id);
    setDeleteError(null);
    try {
      await onDelete(id);
      setConfirmDeleteId(null);
    } catch (deleteErr) {
      setDeleteError(
        deleteErr instanceof Error ? deleteErr.message : "Unable to delete entry."
      );
    } finally {
      setDeletingId(null);
    }
  }

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
            onClick={onCreate}
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
        {(error || deleteError) && (
          <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error || deleteError}
          </p>
        )}

        {loading && (
          <p className="text-center text-muted-foreground py-10 text-sm">
            Loading journal entries...
          </p>
        )}

        {!loading && entries.length === 0 && (
          <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
            <p className="text-foreground font-semibold text-base mb-2">
              No journal entries yet
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Start with a few private lines about your day.
            </p>
            <button
              onClick={onCreate}
              className="h-11 rounded-2xl bg-primary px-5 text-white font-semibold text-sm"
            >
              New entry
            </button>
          </div>
        )}

        {!loading && entries.length > 0 && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-10 text-sm">
            No entries match your search.
          </p>
        )}

        {filtered.map((entry) => (
          <article
            key={entry.id}
            className="bg-card rounded-3xl p-5 border border-border shadow-sm"
          >
            <button
              onClick={() => onOpen(entry.id)}
              className="w-full text-left"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-foreground font-semibold text-base">
                  {getJournalTitle(entry)}
                </p>
                <ChevronRight
                  size={18}
                  className="text-border flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-muted-foreground text-[13px] font-medium">
                  {formatJournalDate(entry.created_at)}
                </span>
                {entry.mood_score && (
                  <>
                    <span
                      className="w-1 h-1 rounded-full bg-border"
                      aria-hidden="true"
                    />
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: moodColor(entry.mood_score) }}
                    >
                      {entry.mood_score}/10
                    </span>
                  </>
                )}
              </div>

              {entry.emotions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3" role="list" aria-label="Emotions">
                  {entry.emotions.map((emotion) => (
                    <span
                      key={emotion}
                      role="listitem"
                      className="px-2 py-0.5 rounded-full bg-secondary text-primary text-[11px] font-medium"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {getJournalPreview(entry)}
              </p>
            </button>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => deleteEntry(entry.id)}
                disabled={deletingId === entry.id}
                className="h-9 rounded-xl border border-border px-3 text-xs font-semibold text-muted-foreground hover:border-destructive/30 hover:text-destructive disabled:opacity-60 flex items-center gap-1.5"
              >
                <Trash2 size={13} aria-hidden="true" />
                {confirmDeleteId === entry.id ? "Confirm" : "Delete"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
