"use client";

import { Home, BookOpen, Sparkles, Wrench, User } from "lucide-react";
import type { Screen } from "@/lib/islamind-types";

interface BottomNavProps {
  current: Screen;
  navigate: (s: Screen) => void;
}

const tabs: { id: Screen; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "journal-list", label: "Journal", icon: BookOpen },
  { id: "reflection-card", label: "Reflect", icon: Sparkles },
  { id: "cbt", label: "Tools", icon: Wrench },
  { id: "profile", label: "Profile", icon: User },
];

const activeMap: Record<string, Screen[]> = {
  dashboard: ["dashboard", "mood-checkin", "mood-history"],
  "journal-list": ["journal-list", "journal-editor", "ai-reflection"],
  "reflection-card": ["reflection-card"],
  cbt: ["cbt"],
  profile: ["profile", "pricing"],
};

export function BottomNav({ current, navigate }: BottomNavProps) {
  function isActive(id: Screen): boolean {
    return activeMap[id]?.includes(current) ?? false;
  }

  return (
    <nav
      className="w-full bg-white border-t border-border px-2 pb-[env(safe-area-inset-bottom)]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between py-1">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = isActive(id);
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              className="flex flex-col items-center justify-center w-[72px] h-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <div
                className={`flex items-center justify-center w-14 h-8 rounded-full transition-colors ${
                  active ? "bg-secondary" : "bg-transparent"
                }`}
              >
                <Icon
                  size={20}
                  className={active ? "text-primary" : "text-muted-foreground"}
                  strokeWidth={active ? 2.5 : 2}
                  aria-hidden="true"
                />
              </div>
              <span
                className="mt-1 text-[11px] transition-colors leading-none"
                style={{
                  color: active ? "#2F7D72" : "#6B7280",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
