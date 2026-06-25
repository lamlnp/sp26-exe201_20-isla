"use client";

import { useState } from "react";
import { ArrowLeft, Check, Pencil, Trash2, TrendingUp, X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import type { NavigateProps } from "@/lib/islamind-types";
import type { MoodCheckin, MoodCheckinValues } from "@/lib/mood";
import {
  formatMoodDate,
  getAverageMood,
  getMoodStreak,
  getThirtyDayMoodData,
  getTopEmotions,
  MOOD_EMOJIS,
  MOOD_EMOTIONS,
  MOOD_LABELS,
  MOOD_TAGS,
} from "@/lib/mood";

interface MoodHistoryScreenProps extends NavigateProps {
  moodCheckins: MoodCheckin[];
  moodLoading: boolean;
  moodError: string | null;
  onUpdate: (id: string, values: MoodCheckinValues) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

interface EditState {
  id: string;
  mood: number;
  emotions: string[];
  tags: string[];
  note: string;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to update mood data.";
}

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function MoodHistoryScreen({
  navigate,
  moodCheckins,
  moodLoading,
  moodError,
  onUpdate,
  onDelete,
}: MoodHistoryScreenProps) {
  const [edit, setEdit] = useState<EditState | null>(null);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const monthData = getThirtyDayMoodData(moodCheckins);
  const topEmotions = getTopEmotions(moodCheckins);
  const averageMood = getAverageMood(moodCheckins, 30);
  const streak = getMoodStreak(moodCheckins);
  const trendLabel =
    monthData.length < 2
      ? "Building"
      : monthData[monthData.length - 1].mood >= monthData[0].mood
      ? "Improving"
      : "Changing";
  const summaryStats = [
    { value: averageMood?.toString() ?? "--", label: "30-day avg", trend: "" },
    { value: streak.toString(), label: "Day streak", trend: streak > 0 ? "Active" : "" },
    { value: moodCheckins.length.toString(), label: "Check-ins", trend: "" },
  ];

  function startEdit(checkin: MoodCheckin) {
    setLocalError(null);
    setConfirmingDeleteId(null);
    setEdit({
      id: checkin.id,
      mood: checkin.mood_score,
      emotions: checkin.emotions,
      tags: checkin.tags,
      note: checkin.note ?? "",
    });
  }

  async function handleUpdate() {
    if (!edit) return;

    setBusyId(edit.id);
    setLocalError(null);

    try {
      await onUpdate(edit.id, {
        mood_score: edit.mood,
        emotions: edit.emotions,
        tags: edit.tags,
        note: edit.note.trim() || null,
      });
      setEdit(null);
    } catch (error) {
      setLocalError(getErrorMessage(error));
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    if (confirmingDeleteId !== id) {
      setConfirmingDeleteId(id);
      setEdit(null);
      return;
    }

    setBusyId(id);
    setLocalError(null);

    try {
      await onDelete(id);
      setConfirmingDeleteId(null);
    } catch (error) {
      setLocalError(getErrorMessage(error));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      <header className="px-6 pt-14 pb-6 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("dashboard")}
            className="w-10 h-10 rounded-full bg-background hover:bg-border transition-colors flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft size={18} className="text-foreground" aria-hidden="true" />
          </button>
          <h1
            className="text-foreground font-bold"
            style={{ fontSize: 20, letterSpacing: "-0.5px" }}
          >
            Mood Insights
          </h1>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {(moodError || localError) && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {moodError || localError}
          </p>
        )}

        <div className="grid grid-cols-3 gap-3" role="list" aria-label="Summary statistics">
          {summaryStats.map((stat) => (
            <div
              key={stat.label}
              role="listitem"
              className="bg-card rounded-3xl p-4 shadow-sm border border-border text-center"
            >
              <p
                className="text-foreground font-bold"
                style={{ fontSize: 24, letterSpacing: "-0.5px" }}
              >
                {moodLoading ? "--" : stat.value}
              </p>
              <p className="text-muted-foreground mt-1 mb-1 text-[11px] font-medium">
                {stat.label}
              </p>
              {stat.trend && (
                <p className="text-primary text-[11px] font-semibold">{stat.trend}</p>
              )}
            </div>
          ))}
        </div>

        <section
          className="bg-card rounded-3xl p-5 shadow-sm border border-border"
          aria-labelledby="trend-heading"
        >
          <div className="flex items-center justify-between mb-6">
            <p id="trend-heading" className="text-foreground font-bold text-base">
              30-Day Trend
            </p>
            <div className="flex items-center gap-1.5 text-primary text-[13px] font-semibold">
              <TrendingUp size={16} aria-hidden="true" />
              {trendLabel}
            </div>
          </div>
          <div style={{ height: 180 }}>
            {monthData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthData}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                    interval={6}
                  />
                  <YAxis
                    domain={[1, 10]}
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                    ticks={[2, 4, 6, 8, 10]}
                  />
                  <Tooltip
                    cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-foreground rounded-lg px-3 py-1.5 shadow-md">
                          <p className="text-white text-[13px] font-semibold">
                            {payload[0].value}/10
                          </p>
                        </div>
                      ) : null
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#2F7D72"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#F2B880", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl bg-background px-4 text-center">
                <p className="text-muted-foreground text-sm">
                  {moodLoading ? "Loading mood data..." : "Save a check-in to see your trend."}
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          className="bg-card rounded-3xl p-5 shadow-sm border border-border"
          aria-labelledby="emotions-heading"
        >
          <p id="emotions-heading" className="text-foreground font-bold text-base mb-5">
            Top Emotions
          </p>
          <div style={{ height: 160 }}>
            {topEmotions.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topEmotions}
                  margin={{ top: 0, right: 5, left: -25, bottom: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#F7F4ED" }}
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-foreground rounded-lg px-3 py-1.5 shadow-md">
                          <p className="text-white text-[13px] font-semibold">
                            {payload[0].value} check-ins
                          </p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {topEmotions.map((emotion) => (
                      <Cell key={emotion.name} fill={emotion.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl bg-background px-4 text-center">
                <p className="text-muted-foreground text-sm">
                  Select emotions during check-ins to see patterns.
                </p>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="saved-checkins-heading" className="space-y-3">
          <p id="saved-checkins-heading" className="text-foreground px-1 font-bold text-base">
            Saved check-ins
          </p>

          {moodCheckins.length === 0 ? (
            <div className="bg-card rounded-3xl p-5 border border-border text-center">
              <p className="text-foreground font-semibold text-sm">
                No mood check-ins yet
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                Your saved entries will appear here.
              </p>
            </div>
          ) : (
            moodCheckins.map((checkin) => {
              const isEditing = edit?.id === checkin.id;
              const isBusy = busyId === checkin.id;

              return (
                <article
                  key={checkin.id}
                  className="bg-card rounded-3xl p-5 border border-border shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">
                        {formatMoodDate(checkin.created_at)}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl" aria-hidden="true">
                          {MOOD_EMOJIS[checkin.mood_score - 1]}
                        </span>
                        <p className="text-foreground font-bold text-lg">
                          {checkin.mood_score}/10
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {MOOD_LABELS[checkin.mood_score - 1]}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(checkin)}
                        className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center"
                        aria-label="Edit mood check-in"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(checkin.id)}
                        disabled={isBusy}
                        className="h-9 rounded-full bg-background border border-border px-3 text-[12px] font-semibold text-destructive disabled:opacity-60"
                        aria-label="Delete mood check-in"
                      >
                        {confirmingDeleteId === checkin.id ? "Confirm" : <Trash2 size={15} aria-hidden="true" />}
                      </button>
                    </div>
                  </div>

                  {checkin.note && (
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                      {checkin.note}
                    </p>
                  )}

                  {(checkin.emotions.length > 0 || checkin.tags.length > 0) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[...checkin.emotions, ...checkin.tags].map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {isEditing && edit && (
                    <div className="mt-5 space-y-4 border-t border-border pt-5">
                      <div>
                        <p className="text-foreground mb-2 text-sm font-semibold">
                          Mood score
                        </p>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={edit.mood}
                          onChange={(event) =>
                            setEdit({ ...edit, mood: Number(event.target.value) })
                          }
                          className="isla-range w-full"
                          aria-label="Edit mood level"
                        />
                        <p className="text-muted-foreground mt-1 text-xs">
                          {edit.mood}/10 · {MOOD_LABELS[edit.mood - 1]}
                        </p>
                        <div
                          className="mt-3 grid grid-cols-10 gap-1"
                          role="group"
                          aria-label="Set edit mood score"
                        >
                          {Array.from({ length: 10 }, (_, index) => index + 1).map(
                            (score) => (
                              <button
                                key={score}
                                type="button"
                                onClick={() => setEdit({ ...edit, mood: score })}
                                aria-pressed={edit.mood === score}
                                aria-label={`Set edit mood ${score}`}
                                className="h-8 rounded-lg border text-[12px] font-semibold transition-colors"
                                style={{
                                  background: edit.mood === score ? "#2F7D72" : "#fff",
                                  borderColor:
                                    edit.mood === score ? "#2F7D72" : "#E5E7EB",
                                  color: edit.mood === score ? "#fff" : "#6B7280",
                                }}
                              >
                                {score}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-foreground mb-2 text-sm font-semibold">
                          Emotions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {MOOD_EMOTIONS.map((emotion) => {
                            const active = edit.emotions.includes(emotion);
                            return (
                              <button
                                key={emotion}
                                type="button"
                                onClick={() =>
                                  setEdit({
                                    ...edit,
                                    emotions: toggleValue(edit.emotions, emotion),
                                  })
                                }
                                className="rounded-full border px-3 py-1.5 text-[12px] font-medium"
                                style={{
                                  background: active ? "#DDEFEA" : "#fff",
                                  borderColor: active ? "#2F7D72" : "#E5E7EB",
                                  color: active ? "#2F7D72" : "#263238",
                                }}
                              >
                                {emotion}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="text-foreground mb-2 text-sm font-semibold">
                          Tags
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {MOOD_TAGS.map((tag) => {
                            const active = edit.tags.includes(tag);
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() =>
                                  setEdit({
                                    ...edit,
                                    tags: toggleValue(edit.tags, tag),
                                  })
                                }
                                className="rounded-full border px-3 py-1.5 text-[12px] font-medium"
                                style={{
                                  background: active ? "#FFF0E6" : "#fff",
                                  borderColor: active ? "#F2B880" : "#E5E7EB",
                                  color: active ? "#B25C00" : "#6B7280",
                                }}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <textarea
                        value={edit.note}
                        onChange={(event) => setEdit({ ...edit, note: event.target.value })}
                        rows={3}
                        className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        aria-label="Edit mood note"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdate}
                          disabled={isBusy}
                          className="h-11 flex-1 rounded-xl bg-primary text-white flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-70"
                        >
                          <Check size={16} aria-hidden="true" />
                          {isBusy ? "Saving..." : "Save changes"}
                        </button>
                        <button
                          onClick={() => setEdit(null)}
                          className="h-11 w-11 rounded-xl border border-border bg-background flex items-center justify-center"
                          aria-label="Cancel edit"
                        >
                          <X size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}
