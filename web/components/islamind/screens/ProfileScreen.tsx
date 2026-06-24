"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getGenderLabel, type Profile } from "@/lib/islamind-auth";
import type { NavigateProps } from "@/lib/islamind-types";

const menuItems = [
  {
    icon: Lock,
    label: "Privacy & data",
    sub: "Manage your data",
    screen: undefined,
  },
  {
    icon: Shield,
    label: "Safety resources",
    sub: "Crisis & support info",
    screen: "safety" as const,
  },
  {
    icon: HelpCircle,
    label: "Help & feedback",
    sub: "Get support",
    screen: undefined,
  },
];

const stats = [
  { v: "23", l: "Journals" },
  { v: "31", l: "Check-ins" },
  { v: "14🔥", l: "Day streak" },
];

interface ProfileScreenProps extends NavigateProps {
  session: Session;
  profile: Profile | null;
  onSignOut: () => Promise<void>;
}

export function ProfileScreen({
  navigate,
  session,
  profile,
  onSignOut,
}: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reminderTime, setReminderTime] = useState("20:00");
  const [isSigningOut, setIsSigningOut] = useState(false);

  const displayName = profile?.display_name?.trim() || "IslaMind user";
  const email = session.user.email ?? "";
  const initial = displayName.charAt(0).toUpperCase();
  const isCompanion = profile?.plan === "companion";
  const genderLabel = getGenderLabel(profile?.gender);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await onSignOut();
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-14 pb-6">
        <h1
          className="text-foreground font-bold"
          style={{ fontSize: 22, letterSpacing: -0.3 }}
        >
          Profile & Settings
        </h1>
      </header>

      <div className="px-5 space-y-4">
        {/* User card */}
        <div className="bg-card rounded-2xl p-5 border border-border flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, #2F7D72 0%, #A7C7B7 100%)",
            }}
            aria-hidden="true"
          >
            <span className="text-white font-bold" style={{ fontSize: 26 }}>
              {initial}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-bold" style={{ fontSize: 17 }}>
              {displayName}
            </p>
            <p className="text-muted-foreground text-[13px]">
              {email}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded-full bg-secondary text-primary text-[11px] font-semibold">
                {isCompanion ? "Companion plan" : "Basic plan"}
              </span>
              {!isCompanion && (
                <button
                  onClick={() => navigate("pricing")}
                  className="text-[11px] font-semibold"
                  style={{ color: "#F2B880" }}
                >
                  Upgrade →
                </button>
              )}
            </div>
          </div>
        </div>

        {(profile?.age || genderLabel || profile?.life_context) && (
          <div className="bg-card rounded-2xl p-4 border border-border">
            <p className="text-foreground mb-3 text-[13px] font-semibold">
              About you
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-background p-2">
                <p className="text-muted-foreground text-[10px]">Age</p>
                <p className="text-foreground text-xs font-semibold">
                  {profile?.age ?? "-"}
                </p>
              </div>
              <div className="rounded-xl bg-background p-2">
                <p className="text-muted-foreground text-[10px]">Gender</p>
                <p className="text-foreground text-xs font-semibold">
                  {genderLabel || "-"}
                </p>
              </div>
              <div className="rounded-xl bg-background p-2">
                <p className="text-muted-foreground text-[10px]">Context</p>
                <p className="text-foreground text-xs font-semibold capitalize">
                  {profile?.life_context ?? "-"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <p className="text-foreground mb-3 text-[13px] font-semibold">
            My progress
          </p>
          <div className="grid grid-cols-3 gap-2" role="list" aria-label="Progress stats">
            {stats.map((s) => (
              <div
                key={s.l}
                role="listitem"
                className="text-center p-2 rounded-xl bg-background"
              >
                <p className="text-foreground font-bold" style={{ fontSize: 18 }}>
                  {s.v}
                </p>
                <p className="text-muted-foreground text-[10px]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-background">
            <p className="text-foreground text-[13px] font-semibold">
              Reminders
            </p>
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-b border-background">
            <div className="flex items-center gap-3">
              <Bell
                size={17}
                className="text-muted-foreground"
                aria-hidden="true"
              />
              <p className="text-foreground text-sm">
                Daily check-in reminder
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className="w-11 h-6 rounded-full transition-colors relative flex-shrink-0"
              style={{ background: notifications ? "#2F7D72" : "#E5E7EB" }}
              role="switch"
              aria-checked={notifications}
              aria-label="Toggle daily check-in reminder"
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                style={{
                  left: notifications ? "calc(100% - 1.375rem)" : "2px",
                }}
                aria-hidden="true"
              />
            </button>
          </div>
          {notifications && (
            <div className="px-4 py-3 flex items-center justify-between border-b border-background">
              <p className="text-muted-foreground text-[13px]">
                Reminder time
              </p>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="text-foreground bg-background px-2 py-1 rounded-lg border border-border outline-none text-[13px] font-medium"
                aria-label="Reminder time"
              />
            </div>
          )}
        </div>

        {/* Appearance */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-background">
            <p className="text-foreground text-[13px] font-semibold">
              Appearance
            </p>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon
                  size={17}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
              ) : (
                <Sun
                  size={17}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              <p className="text-foreground text-sm">Dark mode</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-11 h-6 rounded-full transition-colors relative flex-shrink-0"
              style={{ background: darkMode ? "#2F7D72" : "#E5E7EB" }}
              role="switch"
              aria-checked={darkMode}
              aria-label="Toggle dark mode"
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                style={{
                  left: darkMode ? "calc(100% - 1.375rem)" : "2px",
                }}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Menu items */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => item.screen && navigate(item.screen)}
              className={`w-full px-4 py-3.5 flex items-center gap-3 text-left active:bg-background transition-colors ${
                i < menuItems.length - 1 ? "border-b border-background" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
                <item.icon
                  size={15}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm">{item.label}</p>
                <p className="text-muted-foreground text-[11px]">{item.sub}</p>
              </div>
              <ChevronRight
                size={15}
                className="text-muted-foreground flex-shrink-0"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        {/* Upgrade CTA */}
        <button
          onClick={() => navigate("pricing")}
          className="w-full rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
          style={{ background: "linear-gradient(135deg, #2F7D72 0%, #3D9B8E 100%)" }}
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <span style={{ fontSize: 20 }} aria-hidden="true">
              ✨
            </span>
          </div>
          <div className="text-left flex-1">
            <p className="text-white font-bold text-[15px]">
              {isCompanion ? "Companion is active" : "Upgrade to Companion"}
            </p>
            <p className="text-white/70 text-xs">
              {isCompanion
                ? "Unlimited AI reflections are ready"
                : "Unlimited AI reflections & insights"}
            </p>
          </div>
          <ChevronRight
            size={18}
            className="text-white/70 flex-shrink-0"
            aria-hidden="true"
          />
        </button>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full h-12 rounded-xl border border-border bg-card flex items-center justify-center gap-2 text-destructive active:scale-[0.98] transition-transform font-medium text-sm"
        >
          <LogOut size={16} aria-hidden="true" />
          {isSigningOut ? "Signing out..." : "Sign out"}
        </button>

        <p className="text-center text-muted-foreground text-[11px] pb-4">
          IslaMind v1.0.0 · Made with care for your wellbeing
        </p>
      </div>
    </main>
  );
}
