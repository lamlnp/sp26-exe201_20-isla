"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import type { Profile } from "@/lib/islamind-auth";
import {
  getCurrentSession,
  loadProfile,
  onSessionChange,
  signInWithPassword,
  signOut,
  signUpWithPassword,
  updateProfile,
  upgradeToCompanion,
  waitForProfile,
} from "@/lib/islamind-auth";
import type { MoodCheckin, MoodCheckinValues } from "@/lib/mood";
import {
  createMoodCheckin,
  deleteMoodCheckin,
  listMoodCheckins,
  updateMoodCheckin,
} from "@/lib/mood";
import type { Screen } from "@/lib/islamind-types";
import { BottomNav } from "@/components/islamind/BottomNav";
import { LandingScreen } from "@/components/islamind/screens/LandingScreen";
import { LoginScreen } from "@/components/islamind/screens/LoginScreen";
import { RegisterScreen } from "@/components/islamind/screens/RegisterScreen";
import { OnboardingScreen } from "@/components/islamind/screens/OnboardingScreen";
import { DashboardScreen } from "@/components/islamind/screens/DashboardScreen";
import { MoodCheckinScreen } from "@/components/islamind/screens/MoodCheckinScreen";
import { MoodHistoryScreen } from "@/components/islamind/screens/MoodHistoryScreen";
import { JournalListScreen } from "@/components/islamind/screens/JournalListScreen";
import { JournalEditorScreen } from "@/components/islamind/screens/JournalEditorScreen";
import { AIReflectionScreen } from "@/components/islamind/screens/AIReflectionScreen";
import { CBTScreen } from "@/components/islamind/screens/CBTScreen";
import { ReflectionCardScreen } from "@/components/islamind/screens/ReflectionCardScreen";
import { ProfileScreen } from "@/components/islamind/screens/ProfileScreen";
import { PricingScreen } from "@/components/islamind/screens/PricingScreen";
import { SafetyScreen } from "@/components/islamind/screens/SafetyScreen";

const APP_SCREENS: Screen[] = [
  "dashboard",
  "mood-checkin",
  "mood-history",
  "journal-list",
  "journal-editor",
  "ai-reflection",
  "reflection-card",
  "cbt",
  "profile",
  "pricing",
  "safety",
];

const PRIVATE_SCREENS: Screen[] = ["onboarding", ...APP_SCREENS];
const PUBLIC_SCREENS: Screen[] = ["landing", "login", "register"];

function nextScreenForProfile(profile: Profile | null): Screen {
  return profile?.onboarding_completed ? "dashboard" : "onboarding";
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function IslaMindApp() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [moodCheckins, setMoodCheckins] = useState<MoodCheckin[]>([]);
  const [moodLoading, setMoodLoading] = useState(false);
  const [moodError, setMoodError] = useState<string | null>(null);

  const refreshProfile = useCallback(async (userId: string) => {
    const nextProfile = await loadProfile(userId);
    setProfile(nextProfile);
    return nextProfile;
  }, []);

  const refreshMoodCheckins = useCallback(async (userId: string) => {
    setMoodLoading(true);
    setMoodError(null);

    try {
      const nextCheckins = await listMoodCheckins(userId);
      setMoodCheckins(nextCheckins);
      return nextCheckins;
    } catch (error) {
      setMoodError(getErrorMessage(error));
      throw error;
    } finally {
      setMoodLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function initAuth() {
      try {
        setAuthLoading(true);
        const currentSession = await getCurrentSession();
        if (!active) return;

        setSession(currentSession);
        if (currentSession) {
          const nextProfile = await refreshProfile(currentSession.user.id);
          await refreshMoodCheckins(currentSession.user.id);
          if (!active) return;
          setScreen((current) =>
            PUBLIC_SCREENS.includes(current)
              ? nextScreenForProfile(nextProfile)
              : current
          );
        }
      } catch (error) {
        if (active) setAuthError(getErrorMessage(error));
      } finally {
        if (active) setAuthLoading(false);
      }
    }

    initAuth();

    const subscription = onSessionChange(async (nextSession) => {
      setSession(nextSession);
      if (!nextSession) {
        setProfile(null);
        setMoodCheckins([]);
        setMoodError(null);
        setScreen("landing");
        return;
      }

      try {
        const nextProfile = await refreshProfile(nextSession.user.id);
        await refreshMoodCheckins(nextSession.user.id);
        setScreen((current) =>
          PUBLIC_SCREENS.includes(current) ? nextScreenForProfile(nextProfile) : current
        );
      } catch (error) {
        setAuthError(getErrorMessage(error));
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [refreshMoodCheckins, refreshProfile]);

  useEffect(() => {
    if (!authLoading && !session && PRIVATE_SCREENS.includes(screen)) {
      setScreen("login");
    }
  }, [authLoading, session, screen]);

  const navigate = (target: Screen) => {
    setAuthError(null);
    if (!session && PRIVATE_SCREENS.includes(target)) {
      setScreen("login");
      return;
    }

    setScreen(target);
  };

  async function handleLogin(email: string, password: string) {
    setAuthError(null);
    const nextSession = await signInWithPassword(email, password);
    if (!nextSession) throw new Error("No session returned after sign in.");

    setSession(nextSession);
    const nextProfile = await refreshProfile(nextSession.user.id);
    await refreshMoodCheckins(nextSession.user.id);
    setScreen(nextScreenForProfile(nextProfile));
  }

  async function handleRegister(name: string, email: string, password: string) {
    setAuthError(null);
    const nextSession = await signUpWithPassword(name, email, password);
    if (!nextSession) {
      throw new Error("Registration created, but sign-in is waiting for email confirmation.");
    }

    setSession(nextSession);
    const nextProfile = await waitForProfile(nextSession.user.id);
    setProfile(nextProfile);
    setMoodCheckins([]);
    setScreen("onboarding");
  }

  async function handleCompleteOnboarding(values: {
    age: number | null;
    gender: Profile["gender"];
    life_context: Profile["life_context"];
  }) {
    if (!session) throw new Error("Please sign in before onboarding.");

    const nextProfile = await updateProfile(session.user.id, {
      ...values,
      onboarding_completed: true,
    });
    setProfile(nextProfile);
    await refreshMoodCheckins(session.user.id);
    setScreen("dashboard");
  }

  async function handleSignOut() {
    setAuthError(null);
    await signOut();
    setSession(null);
    setProfile(null);
    setMoodCheckins([]);
    setMoodError(null);
    setScreen("landing");
  }

  async function handleUpgrade() {
    if (!session) throw new Error("Please sign in before upgrading.");
    await upgradeToCompanion();
    await refreshProfile(session.user.id);
  }

  async function handleCreateMoodCheckin(values: MoodCheckinValues) {
    if (!session) throw new Error("Please sign in before saving mood.");
    setMoodError(null);
    await createMoodCheckin(session.user.id, values);
    await refreshMoodCheckins(session.user.id);
    setScreen("dashboard");
  }

  async function handleUpdateMoodCheckin(id: string, values: MoodCheckinValues) {
    if (!session) throw new Error("Please sign in before updating mood.");
    setMoodError(null);
    await updateMoodCheckin(id, session.user.id, values);
    await refreshMoodCheckins(session.user.id);
  }

  async function handleDeleteMoodCheckin(id: string) {
    if (!session) throw new Error("Please sign in before deleting mood.");
    setMoodError(null);
    await deleteMoodCheckin(id, session.user.id);
    await refreshMoodCheckins(session.user.id);
  }

  const showNav = APP_SCREENS.includes(screen);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative mx-auto w-full max-w-md min-h-screen bg-background shadow-2xl">
        {authLoading ? (
          <main className="min-h-screen flex items-center justify-center px-6 text-center">
            <p className="text-muted-foreground text-sm">Loading IslaMind...</p>
          </main>
        ) : (
          <>
            {authError && (
              <div className="absolute left-4 right-4 top-4 z-[60] rounded-xl border border-destructive/20 bg-card px-4 py-3 text-sm text-destructive shadow-sm">
                {authError}
              </div>
            )}

            <div className={showNav ? "pb-[env(safe-area-inset-bottom)]" : ""}>
              {screen === "landing" && <LandingScreen navigate={navigate} />}
              {screen === "login" && (
                <LoginScreen navigate={navigate} onLogin={handleLogin} />
              )}
              {screen === "register" && (
                <RegisterScreen navigate={navigate} onRegister={handleRegister} />
              )}
              {screen === "onboarding" && (
                <OnboardingScreen
                  navigate={navigate}
                  profile={profile}
                  onComplete={handleCompleteOnboarding}
                />
              )}
              {screen === "dashboard" && (
                <DashboardScreen
                  navigate={navigate}
                  profile={profile}
                  moodCheckins={moodCheckins}
                  moodLoading={moodLoading}
                  moodError={moodError}
                />
              )}
              {screen === "mood-checkin" && (
                <MoodCheckinScreen
                  navigate={navigate}
                  onSave={handleCreateMoodCheckin}
                />
              )}
              {screen === "mood-history" && (
                <MoodHistoryScreen
                  navigate={navigate}
                  moodCheckins={moodCheckins}
                  moodLoading={moodLoading}
                  moodError={moodError}
                  onUpdate={handleUpdateMoodCheckin}
                  onDelete={handleDeleteMoodCheckin}
                />
              )}
              {screen === "journal-list" && <JournalListScreen navigate={navigate} />}
              {screen === "journal-editor" && <JournalEditorScreen navigate={navigate} />}
              {screen === "ai-reflection" && <AIReflectionScreen navigate={navigate} />}
              {screen === "cbt" && <CBTScreen navigate={navigate} />}
              {screen === "reflection-card" && <ReflectionCardScreen navigate={navigate} />}
              {screen === "profile" && session && (
                <ProfileScreen
                  navigate={navigate}
                  session={session}
                  profile={profile}
                  onSignOut={handleSignOut}
                />
              )}
              {screen === "pricing" && (
                <PricingScreen
                  navigate={navigate}
                  profile={profile}
                  onUpgrade={handleUpgrade}
                />
              )}
              {screen === "safety" && <SafetyScreen navigate={navigate} />}
            </div>

            {showNav && (
              <div className="sticky bottom-0 left-0 right-0 z-50">
                <BottomNav current={screen} navigate={navigate} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
