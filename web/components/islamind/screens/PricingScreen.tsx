"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import type { Profile } from "@/lib/islamind-auth";
import type { NavigateProps } from "@/lib/islamind-types";

const companionFeatures = [
  "Unlimited journal entries",
  "Unlimited AI reflections",
  "Unlimited CBT Thought Records",
  "Advanced mood analytics & insights",
  "Weekly reflection summaries",
];

const freeFeatures = [
  "Unlimited mood check-ins",
  "Private journal entries",
  "7 AI requests per day",
  "Basic mood tracking",
];

interface PricingScreenProps extends NavigateProps {
  profile: Profile | null;
  onUpgrade: () => Promise<void>;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to upgrade plan.";
}

export function PricingScreen({ navigate, profile, onUpgrade }: PricingScreenProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [paymentAccepted, setPaymentAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCompanion = profile?.plan === "companion";

  async function handleUpgrade() {
    setError(null);
    setPaymentAccepted(false);
    setIsUpgrading(true);

    try {
      await onUpgrade();
      setPaymentAccepted(true);
    } catch (upgradeError) {
      setError(getErrorMessage(upgradeError));
    } finally {
      setIsUpgrading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="px-6 pt-14 pb-4">
        <button
          onClick={() => navigate("profile")}
          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-sm hover:bg-background transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-foreground" aria-hidden="true" />
        </button>
        <h1
          className="text-foreground font-bold"
          style={{ fontSize: 24, letterSpacing: "-0.5px" }}
        >
          Plans & Pricing
        </h1>
      </header>

      <div className="px-6 space-y-6">
        {/* Companion plan — recommended */}
        <article
          className="bg-card rounded-3xl p-6 shadow-sm border-2 border-primary relative"
          aria-label="Companion plan"
        >
          <div
            className="absolute -top-3 right-6 px-3 py-1 rounded-full text-white text-xs font-semibold"
            style={{ background: "#2F7D72" }}
            aria-label="Recommended plan"
          >
            Recommended
          </div>

          <div className="mb-6">
            <p className="text-foreground mb-1 font-bold" style={{ fontSize: 18 }}>
              IslaMind Companion
            </p>
            <p className="text-muted-foreground mb-4 text-sm">
              Deeper reflection, unlimited insights
            </p>
            <div className="flex items-baseline gap-1">
              <span
                className="text-primary font-bold"
                style={{ fontSize: 32 }}
              >
                $6.99
              </span>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8" aria-label="Companion plan features">
            {companionFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-primary" aria-hidden="true" />
                </div>
                <p className="text-foreground text-sm leading-relaxed">{f}</p>
              </li>
            ))}
          </ul>

          {error && (
            <p className="mb-3 rounded-xl bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
              {error}
            </p>
          )}
          <button
            onClick={handleUpgrade}
            disabled={isCompanion || isUpgrading}
            className="w-full h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors font-semibold text-[15px] disabled:opacity-70"
          >
            {paymentAccepted
              ? "Payment Accepted"
              : isCompanion
              ? "Current plan"
              : isUpgrading
              ? "Confirming..."
              : "Confirm mock payment"}
          </button>
        </article>

        {/* Free plan */}
        <article
          className="bg-card rounded-3xl p-6 shadow-sm border border-border"
          aria-label="Basic free plan"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-foreground mb-1 font-bold" style={{ fontSize: 18 }}>
                Basic
              </p>
              <p className="text-muted-foreground text-sm">
                {isCompanion ? "Included baseline" : "Current plan"}
              </p>
            </div>
            <span className="text-foreground font-bold" style={{ fontSize: 24 }}>
              $0
            </span>
          </div>

          <ul className="space-y-3" aria-label="Basic plan features">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check
                    size={12}
                    className="text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f}
                </p>
              </li>
            ))}
          </ul>
        </article>

        {/* Student discount */}
        <div
          className="rounded-3xl p-6 border border-[#F2B880]/30"
          style={{ background: "#FFF0E6" }}
        >
          <p className="text-foreground mb-2 font-bold" style={{ fontSize: 16 }}>
            University Student?
          </p>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            Verify your .edu email to receive 50% off the Companion plan during
            your studies.
          </p>
          <button className="text-primary hover:text-primary/80 transition-colors font-semibold text-sm">
            Verify student status →
          </button>
        </div>

        {/* Fine print */}
        <p className="text-center text-muted-foreground text-xs leading-relaxed pb-4">
          Cancel anytime. Prices shown in USD. IslaMind is a self-reflection
          tool, not a medical or clinical service.
        </p>
      </div>
    </main>
  );
}
