"use client";

import { ArrowLeft, TrendingUp } from "lucide-react";
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
import { MONTH_DATA, TOP_EMOTIONS } from "@/lib/islamind-mock-data";
import type { NavigateProps } from "@/lib/islamind-types";

const summaryStats = [
  { value: "7.1", label: "30-day avg", trend: "+0.6" },
  { value: "14", label: "Day streak", trend: "Active" },
  { value: "31", label: "Check-ins", trend: "" },
];

export function MoodHistoryScreen({ navigate }: NavigateProps) {
  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Header */}
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
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3" role="list" aria-label="Summary statistics">
          {summaryStats.map((s) => (
            <div
              key={s.label}
              role="listitem"
              className="bg-card rounded-3xl p-4 shadow-sm border border-border text-center"
            >
              <p
                className="text-foreground font-bold"
                style={{ fontSize: 24, letterSpacing: "-0.5px" }}
              >
                {s.value}
              </p>
              <p className="text-muted-foreground mt-1 mb-1 text-[11px] font-medium">
                {s.label}
              </p>
              {s.trend && (
                <p className="text-primary text-[11px] font-semibold">{s.trend}</p>
              )}
            </div>
          ))}
        </div>

        {/* Trend chart */}
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
              Improving
            </div>
          </div>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={MONTH_DATA}
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
          </div>
        </section>

        {/* Top emotions */}
        <section
          className="bg-card rounded-3xl p-5 shadow-sm border border-border"
          aria-labelledby="emotions-heading"
        >
          <p id="emotions-heading" className="text-foreground font-bold text-base mb-5">
            Top Emotions
          </p>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={TOP_EMOTIONS}
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
                          {payload[0].value} days
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {TOP_EMOTIONS.map((e, index) => (
                    <Cell key={`cell-${index}`} fill={e.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4" role="list" aria-label="Emotion legend">
            {TOP_EMOTIONS.map((e) => (
              <div
                key={e.name}
                role="listitem"
                className="flex items-center gap-1.5"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: e.color }}
                  aria-hidden="true"
                />
                <span className="text-muted-foreground text-[12px]">{e.name}</span>
                <span className="text-foreground text-[12px] font-semibold">
                  {e.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Insight card */}
        <div className="bg-secondary rounded-3xl p-5 border border-[#A7C7B7]">
          <p className="text-foreground font-bold text-sm mb-2">
            This month&apos;s pattern
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your mood tends to dip mid-week and recover toward the weekend. Anxiety
            is your most frequent emotion — this is common during exam periods.
            Your streak of 14 days shows real consistency.
          </p>
        </div>
      </div>
    </main>
  );
}
