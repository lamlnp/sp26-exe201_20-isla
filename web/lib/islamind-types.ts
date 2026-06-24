export type Screen =
  | "landing"
  | "login"
  | "register"
  | "onboarding"
  | "dashboard"
  | "mood-checkin"
  | "journal-list"
  | "journal-editor"
  | "ai-reflection"
  | "cbt"
  | "reflection-card"
  | "mood-history"
  | "profile"
  | "pricing"
  | "safety";

export interface NavigateProps {
  navigate: (screen: Screen) => void;
}

export const BOTTOM_NAV_SCREENS: Screen[] = [
  "dashboard",
  "mood-history",
  "journal-list",
  "journal-editor",
  "ai-reflection",
  "reflection-card",
  "cbt",
  "profile",
  "pricing",
];
