"use client";

import {
  Bell,
  ChevronRight,
  Brain,
  BookOpen,
  Sparkles,
  ClipboardList,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { JOURNAL_ENTRIES } from "@/lib/islamind-mock-data";
import type { NavigateProps } from "@/lib/islamind-types";
import type { Profile } from "@/lib/islamind-auth";
import type { MoodCheckin } from "@/lib/mood";
import { getAverageMood, getSevenDayMoodData } from "@/lib/mood";

interface DashboardScreenProps extends NavigateProps {
  profile: Profile | null;
  moodCheckins: MoodCheckin[];
  moodLoading: boolean;
  moodError: string | null;
}

export function DashboardScreen({
  navigate,
  profile,
  moodCheckins,
  moodLoading,
  moodError,
}: DashboardScreenProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const recentEntry = JOURNAL_ENTRIES[0];
  const firstName = profile?.display_name?.trim().split(/\s+/)[0] || "there";
  const weekData = getSevenDayMoodData(moodCheckins);
  const averageMood = getAverageMood(moodCheckins, 7);

  return (
    <main className="min-h-screen bg-background pb-28 font-sans">
      {/* Header */}
      <header className="px-6 pt-14 pb-6 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground mb-0.5 text-sm">{greeting},</p>
          <h1
            className="text-foreground font-bold"
            style={{ fontSize: 24, letterSpacing: "-0.5px" }}
          >
            {firstName}
          </h1>
        </div>
        <button
          className="w-11 h-11 rounded-full bg-card border border-border shadow-sm flex items-center justify-center relative hover:bg-background transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-foreground" aria-hidden="true" />
          <span
            className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-accent"
            aria-hidden="true"
          />
        </button>
      </header>

      <div className="px-6 space-y-6">
        {/* Mood check-in card */}
        <div className="bg-primary rounded-3xl p-6 relative overflow-hidden shadow-sm">
          <p
            className="text-secondary mb-1.5 uppercase tracking-wide"
            style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.5px" }}
          >
            Daily Check-in
          </p>
          <p
            className="text-white mb-6 font-semibold"
            style={{ fontSize: 20, letterSpacing: "-0.5px" }}
          >
            How are you feeling today?
          </p>
          <button
            onClick={() => navigate("mood-checkin")}
            className="w-full h-12 rounded-2xl bg-card text-primary flex items-center justify-center gap-2 hover:bg-background transition-colors shadow-sm font-semibold text-[15px]"
          >
            Check in now
          </button>
        </div>

        {/* Recent Mood */}
        <div className="bg-card rounded-3xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-foreground font-bold text-base">Recent Mood</p>
            <button
              onClick={() => navigate("mood-history")}
              className="text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors text-[13px] font-medium"
            >
              Details{" "}
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center gap-6 mb-4">
            <div>
              <p
                className="text-foreground font-bold"
                style={{ fontSize: 32, letterSpacing: "-1px" }}
              >
                {moodLoading ? "--" : averageMood ?? "--"}
              </p>
              <p className="text-muted-foreground text-xs">Avg / 10</p>
            </div>
            <div className="flex-1 h-16">
              {weekData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weekData}>
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#2F7D72"
                      strokeWidth={2.5}
                      dot={{ fill: "#2F7D72", r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: "#F2B880", strokeWidth: 0 }}
                    />
                    <Tooltip
                      cursor={{ stroke: "#E5E7EB", strokeWidth: 1, strokeDasharray: "4 4" }}
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
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl bg-background px-3 text-center">
                  <p className="text-muted-foreground text-xs">
                    {moodLoading ? "Loading mood data..." : "No check-ins yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Day bars */}
          {moodError && (
            <p className="mb-3 rounded-xl bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
              {moodError}
            </p>
          )}
          {weekData.length > 0 && (
            <div className="flex gap-2" aria-hidden="true">
              {weekData.map((d) => (
                <div key={d.day} className="flex-1 text-center">
                  <div
                    className="w-full rounded-sm mb-1.5"
                    style={{
                      height: 4,
                      background:
                        d.mood >= 7
                          ? "#2F7D72"
                          : d.mood >= 5
                          ? "#A7C7B7"
                          : "#F2B880",
                    }}
                  />
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: 10, fontWeight: 500 }}
                  >
                    {d.day}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <section aria-labelledby="tools-heading">
          <p
            id="tools-heading"
            className="text-foreground mb-4 px-1 font-bold text-base"
          >
            Tools
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: BookOpen,
                label: "Journal",
                color: "#DDEFEA",
                iconColor: "#2F7D72",
                screen: "journal-editor" as const,
              },
              {
                icon: ClipboardList,
                label: "Thought Record",
                color: "#F7F4ED",
                iconColor: "#263238",
                screen: "cbt" as const,
              },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.screen)}
                className="bg-card rounded-3xl p-5 border border-border shadow-sm text-left hover:border-[#A7C7B7] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ background: a.color }}
                >
                  <a.icon
                    size={18}
                    style={{ color: a.iconColor }}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-foreground font-semibold text-sm">
                  {a.label}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Recent journal entry */}
        <section aria-labelledby="recent-entry-heading">
          <div className="flex items-center justify-between mb-4 px-1">
            <p
              id="recent-entry-heading"
              className="text-foreground font-bold text-base"
            >
              Recent Entry
            </p>
            <button
              onClick={() => navigate("journal-list")}
              className="text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors text-[13px] font-medium"
            >
              View all{" "}
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>
          <button
            onClick={() => navigate("journal-editor")}
            className="bg-card rounded-3xl p-5 border border-border shadow-sm w-full text-left hover:border-[#A7C7B7] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground text-xs font-medium">
                {recentEntry.date}
              </span>
              <span className="px-2 py-0.5 rounded text-primary bg-secondary text-[11px] font-semibold">
                Mood {recentEntry.mood}/10
              </span>
            </div>
            <p className="text-foreground mb-2 font-semibold text-base">
              {recentEntry.title}
            </p>
            <p
              className="text-muted-foreground text-sm leading-relaxed line-clamp-2"
            >
              {recentEntry.preview}
            </p>
            {recentEntry.hasReflection && (
              <div className="flex items-center gap-1.5 mt-3">
                <Sparkles size={13} className="text-primary" aria-hidden="true" />
                <span className="text-primary text-xs font-medium">
                  AI reflection available
                </span>
              </div>
            )}
          </button>
        </section>

        {/* Reflection card teaser */}
        <button
          onClick={() => navigate("reflection-card")}
          className="w-full rounded-3xl p-5 shadow-sm text-left"
          style={{
            background: "linear-gradient(135deg, #2F7D72 0%, #A7C7B7 100%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white font-bold text-base mb-1">
                Reflection Card
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                Draw a card for today&apos;s journaling prompt
              </p>
            </div>
            <div className="w-10 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl" aria-hidden="true">
                ✦
              </span>
            </div>
          </div>
        </button>

        {/* Safety notice */}
        <button
          onClick={() => navigate("safety")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border text-left hover:border-destructive/30 transition-colors"
        >
          <Brain
            size={16}
            className="text-muted-foreground flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-muted-foreground text-xs leading-relaxed flex-1">
            IslaMind is for self-reflection, not therapy. In crisis? See
            resources.
          </p>
          <ChevronRight
            size={14}
            className="text-muted-foreground flex-shrink-0"
            aria-hidden="true"
          />
        </button>
      </div>
    </main>
  );
}
