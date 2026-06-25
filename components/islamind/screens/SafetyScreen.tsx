"use client";

import { Phone, MessageCircle, Globe, Heart, AlertTriangle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { NavigateProps } from "@/lib/islamind-types";

const resources = [
  {
    name: "Into The Light Korea",
    description: "Suicide and crisis counseling",
    phone: "1393",
    icon: Phone,
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    name: "Korea Mental Health Crisis",
    description: "24/7 mental health hotline",
    phone: "1577-0199",
    icon: Phone,
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    name: "Talk to Someone Online",
    description: "Text-based support",
    phone: null,
    icon: MessageCircle,
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "International Crisis Lines",
    description: "Find help in your country",
    phone: null,
    icon: Globe,
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
];

const warningSignals = [
  "Thoughts of harming yourself or others",
  "Feeling like life is not worth living",
  "Sudden calmness after deep depression",
  "Giving away valued possessions",
  "Saying goodbye to people unexpectedly",
];

const copingStrategies = [
  { label: "Breathe slowly", detail: "4 counts in, hold 4, out 4" },
  { label: "Ground yourself", detail: "Name 5 things you can see right now" },
  { label: "Call someone", detail: "Reach out to a friend or family member" },
  { label: "Move your body", detail: "A short walk can shift your state" },
];

export function SafetyScreen({ navigate }: NavigateProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-[#B42318] text-white px-4 pt-12 pb-6">
        <button
          onClick={() => navigate("dashboard")}
          className="flex items-center gap-1 text-white/80 text-sm mb-4 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-snug">Safety &amp; Crisis Guidance</h1>
            <p className="text-white/80 text-sm mt-0.5">
              You are not alone. Help is available right now.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-6">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Important notice</p>
              <p className="text-amber-700 text-sm mt-1 leading-relaxed">
                IslaMind is a self-reflection tool — not therapy, not medical care, and not emergency
                support. If you are in immediate danger, please contact emergency services or a
                crisis line immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency banner */}
        <div className="bg-[#B42318] rounded-2xl p-4 text-white text-center">
          <p className="font-bold text-lg">In immediate danger?</p>
          <p className="text-white/80 text-sm mt-1 mb-3">Call emergency services now</p>
          <a href="tel:119">
            <Button className="bg-white text-[#B42318] hover:bg-white/90 font-bold w-full">
              <Phone className="w-4 h-4 mr-2" />
              Call 119 (Emergency)
            </Button>
          </a>
        </div>

        {/* Crisis resources */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-3">Crisis Resources</h2>
          <div className="space-y-3">
            {resources.map((res) => {
              const Icon = res.icon;
              return (
                <div
                  key={res.name}
                  className={`flex items-center gap-3 p-4 rounded-2xl border ${res.color}`}
                >
                  <div className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{res.name}</p>
                    <p className="text-xs opacity-70 mt-0.5">{res.description}</p>
                  </div>
                  {res.phone && (
                    <a href={`tel:${res.phone}`}>
                      <Button size="sm" variant="outline" className="text-xs font-bold border-current">
                        {res.phone}
                      </Button>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Warning signals */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-3">Warning Signals to Watch</h2>
          <div className="bg-card rounded-2xl border border-border p-4 space-y-2">
            {warningSignals.map((signal) => (
              <div key={signal} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B42318] mt-2 flex-shrink-0" />
                <p className="text-sm text-foreground leading-relaxed">{signal}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coping strategies */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-3">Immediate Coping Strategies</h2>
          <div className="grid grid-cols-2 gap-3">
            {copingStrategies.map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border rounded-2xl p-4"
              >
                <p className="font-semibold text-sm text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center leading-relaxed pb-2">
          IslaMind is not a substitute for professional mental health care. Please seek a
          qualified therapist or counselor for ongoing support.
        </p>
      </div>
    </div>
  );
}
