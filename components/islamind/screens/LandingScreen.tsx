"use client";

import { ArrowRight, Shield, Brain, Heart } from "lucide-react";
import type { NavigateProps } from "@/lib/islamind-types";

const featurePills = [
  { icon: "🌿", text: "Mood tracking" },
  { icon: "📝", text: "Private journal" },
  { icon: "✨", text: "AI reflections" },
  { icon: "🧠", text: "CBT exercises" },
];

const featureCards = [
  {
    icon: Shield,
    color: "#DDEFEA",
    iconColor: "#2F7D72",
    title: "Private by design",
    desc: "Your entries are yours alone. No sharing, no social feeds.",
  },
  {
    icon: Heart,
    color: "#FFF0E6",
    iconColor: "#F2B880",
    title: "Not therapy — but thoughtful",
    desc: "IslaMind supports self-reflection, not diagnosis or treatment.",
  },
  {
    icon: Brain,
    color: "#F0F9F6",
    iconColor: "#A7C7B7",
    title: "Built for reflection",
    desc: "Designed around everyday emotional rhythms.",
  },
];

export function LandingScreen({ navigate }: NavigateProps) {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-10">
        {/* Decorative background circles */}
        <div
          className="absolute -top-20 -right-16 w-72 h-72 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, #DDEFEA 0%, #A7C7B7 60%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-40 -left-20 w-48 h-48 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, #F2B880 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
              <Brain size={20} className="text-white" aria-hidden="true" />
            </div>
            <span
              className="text-foreground font-bold text-xl"
              style={{ letterSpacing: -0.5 }}
            >
              IslaMind
            </span>
          </div>

          <h1
            className="text-foreground mb-3 leading-tight font-bold text-pretty"
            style={{ fontSize: 32, letterSpacing: -0.5 }}
          >
            A quiet space for your mind
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8 text-base">
            Track your mood, write freely, and explore gentle self-reflection.
            IslaMind is a mobile-first AI-assisted mental wellness companion for
            you. Not therapy — thoughtful.
          </p>

          <button
            onClick={() => navigate("register")}
            className="w-full h-14 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform mb-3 font-semibold text-base"
          >
            Get started — it&apos;s free
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => navigate("login")}
            className="w-full h-12 rounded-2xl border border-border bg-card text-foreground flex items-center justify-center gap-2 active:scale-[0.98] transition-transform text-sm font-medium"
          >
            I already have an account
          </button>
        </div>
      </section>

      {/* Feature pills */}
      <div
        className="px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide"
        role="list"
        aria-label="App features"
      >
        {featurePills.map((f) => (
          <div
            key={f.text}
            role="listitem"
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border"
          >
            <span className="text-sm" aria-hidden="true">{f.icon}</span>
            <span className="text-foreground text-[13px] font-medium">
              {f.text}
            </span>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="px-6 py-4 space-y-3 flex-1 pb-10">
        {featureCards.map((card) => (
          <div
            key={card.title}
            className="flex items-start gap-4 bg-card rounded-3xl p-5 border border-border shadow-sm"
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: card.color }}
            >
              <card.icon
                size={18}
                style={{ color: card.iconColor }}
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-0.5">
                {card.title}
              </p>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
