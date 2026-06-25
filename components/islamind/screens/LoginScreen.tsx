"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Brain } from "lucide-react";
import type { NavigateProps } from "@/lib/islamind-types";

interface LoginScreenProps extends NavigateProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to sign in.";
}

export function LoginScreen({ navigate, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onLogin(email, password);
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 pt-14 pb-6">
        <button
          onClick={() => navigate("landing")}
          className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-foreground" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Brain size={16} className="text-white" aria-hidden="true" />
          </div>
          <span className="text-foreground font-bold" style={{ fontSize: 17 }}>
            IslaMind
          </span>
        </div>
      </header>

      <div className="px-6 flex-1">
        <h1
          className="text-foreground mb-1 font-bold"
          style={{ fontSize: 26, letterSpacing: -0.3 }}
        >
          Welcome back
        </h1>
        <p className="text-muted-foreground mb-8 text-[15px]">
          Sign in to your private space
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="login-email"
              className="block text-foreground mb-1.5 text-[13px] font-semibold"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              className="w-full h-13 px-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-[15px]"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-foreground mb-1.5 text-[13px] font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full h-13 px-4 py-3.5 pr-12 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-[15px]"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-sm active:scale-[0.98] transition-transform mt-2 font-semibold text-base"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      <footer className="px-6 py-8 text-center">
        <span className="text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
        </span>
        <button
          onClick={() => navigate("register")}
          className="text-primary text-sm font-semibold"
        >
          Sign up free
        </button>
      </footer>
    </main>
  );
}
