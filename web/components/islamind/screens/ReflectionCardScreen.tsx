"use client";

import { useState } from "react";
import { ArrowLeft, RefreshCw, BookOpen } from "lucide-react";
import { REFLECTION_CARDS } from "@/lib/islamind-mock-data";
import type { NavigateProps } from "@/lib/islamind-types";

export function ReflectionCardScreen({ navigate }: NavigateProps) {
  const [drawn, setDrawn] = useState(false);
  const [card, setCard] = useState(REFLECTION_CARDS[0]);
  const [flipped, setFlipped] = useState(false);

  function drawCard() {
    const random =
      REFLECTION_CARDS[Math.floor(Math.random() * REFLECTION_CARDS.length)];
    setCard(random);
    setDrawn(true);
    setFlipped(false);
    setTimeout(() => setFlipped(true), 100);
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={() => navigate("dashboard")}
          className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-foreground" aria-hidden="true" />
        </button>
        <div>
          <h1 className="text-foreground font-bold" style={{ fontSize: 18 }}>
            Reflection Cards
          </h1>
          <p className="text-muted-foreground text-xs">
            A prompt to spark self-reflection
          </p>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="mx-5 mb-5 px-4 py-2.5 rounded-xl bg-card border border-border" role="note">
        <p className="text-muted-foreground text-xs leading-relaxed">
          🌿 These cards use{" "}
          <strong className="text-foreground">abstract symbols and themes</strong>{" "}
          as journaling prompts. They are not tarot, astrology, or
          fortune-telling. They simply offer a starting point for reflection.
        </p>
      </div>

      {/* Card area */}
      <div className="px-5">
        {!drawn ? (
          /* Pre-draw: deck visual */
          <div className="flex flex-col items-center py-8">
            <div className="relative mb-8" style={{ width: 220, height: 344 }}>
              {[3, 2, 1].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-3xl border border-white/20"
                  style={{
                    width: 220,
                    height: 320,
                    background:
                      "linear-gradient(135deg, #2F7D72 0%, #A7C7B7 100%)",
                    left: i * 3,
                    top: i * 3,
                    opacity: 0.7 - i * 0.1,
                  }}
                  aria-hidden="true"
                />
              ))}
              <div
                className="absolute rounded-3xl border border-white/20 flex items-center justify-center shadow-xl"
                style={{
                  width: 220,
                  height: 320,
                  background:
                    "linear-gradient(135deg, #2F7D72 0%, #A7C7B7 100%)",
                  left: 12,
                  top: 12,
                }}
              >
                <div className="text-center">
                  <p
                    className="text-white/60"
                    style={{ fontSize: 64 }}
                    aria-hidden="true"
                  >
                    ✦
                  </p>
                  <p className="text-white font-semibold text-base">
                    Reflection Cards
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Tap to draw
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm text-center mb-6 leading-relaxed max-w-xs">
              Draw a card to receive a reflection prompt for today&apos;s journaling
              session.
            </p>

            <button
              onClick={drawCard}
              className="h-14 px-8 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform font-semibold text-base"
            >
              Draw a card
            </button>
          </div>
        ) : (
          /* Post-draw: card revealed */
          <div
            className="transition-all duration-500"
            style={{ opacity: flipped ? 1 : 0, transform: flipped ? "translateY(0)" : "translateY(12px)" }}
          >
            {/* Card visual */}
            <div
              className="w-full rounded-3xl p-8 mb-5 flex flex-col items-center text-center shadow-xl"
              style={{ background: card.gradient, minHeight: 260 }}
              aria-label={`Card: ${card.name}`}
            >
              <span
                className="text-white/60 mb-4 font-mono"
                style={{ fontSize: 48, lineHeight: 1 }}
                aria-hidden="true"
              >
                {card.symbol}
              </span>
              <p
                className="text-white font-bold mb-1"
                style={{ fontSize: 22, letterSpacing: -0.3 }}
              >
                {card.name}
              </p>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4">
                {card.theme}
              </span>
              <p className="text-white/80 text-sm leading-relaxed">
                {card.meaning}
              </p>
            </div>

            {/* Prompt */}
            <div className="bg-card rounded-2xl p-5 border border-border mb-4">
              <p className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wide mb-2">
                Reflection prompt
              </p>
              <p className="text-foreground text-[15px] leading-[1.7] italic">
                &quot;{card.prompt}&quot;
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={drawCard}
                className="flex-1 h-12 rounded-2xl border border-border bg-card text-foreground flex items-center justify-center gap-2 hover:bg-background transition-colors font-medium text-sm"
              >
                <RefreshCw size={15} aria-hidden="true" />
                New card
              </button>
              <button
                onClick={() => navigate("journal-editor")}
                className="flex-1 h-12 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition-colors font-semibold text-sm"
              >
                <BookOpen size={15} aria-hidden="true" />
                Write about this
              </button>
            </div>

            {/* All cards */}
            <section aria-labelledby="all-cards-heading">
              <p
                id="all-cards-heading"
                className="text-foreground font-bold text-sm mb-3"
              >
                All cards
              </p>
              <div className="space-y-2">
                {REFLECTION_CARDS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCard(c);
                      setFlipped(false);
                      setTimeout(() => setFlipped(true), 100);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-[#A7C7B7] transition-colors text-left"
                    aria-pressed={card.id === c.id}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: c.gradient }}
                    >
                      <span className="text-white text-xs" aria-hidden="true">
                        {c.symbol.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-foreground text-sm font-semibold truncate"
                        style={{ color: card.id === c.id ? "#2F7D72" : undefined }}
                      >
                        {c.name}
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        {c.theme}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
