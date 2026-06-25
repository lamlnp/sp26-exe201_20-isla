"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Brain, Check } from "lucide-react";
import type { NavigateProps } from "@/lib/islamind-types";

interface RegisterScreenProps extends NavigateProps {
  onRegister: (name: string, email: string, password: string) => Promise<void>;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to create account.";
}

export function RegisterScreen({ navigate, onRegister }: RegisterScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = Math.min(Math.floor(password.length / 3), 3);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreed) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await onRegister(name, email, password);
    } catch (registerError) {
      setError(getErrorMessage(registerError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
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

      <div className="px-6 flex-1 overflow-y-auto pb-8">
        <h1
          className="text-foreground mb-1 font-bold"
          style={{ fontSize: 26, letterSpacing: -0.3 }}
        >
          Create your space
        </h1>
        <p className="text-muted-foreground mb-8 text-[15px]">
          Private, calm, and completely yours
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="reg-name"
              className="block text-foreground mb-1.5 text-[13px] font-semibold"
            >
              Full name
            </label>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Maria Santos"
              className="w-full h-13 px-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-[15px]"
              autoComplete="name"
              required
              minLength={1}
              maxLength={50}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="block text-foreground mb-1.5 text-[13px] font-semibold"
            >
              University email
            </label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maria@university.edu"
              className="w-full h-13 px-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-[15px]"
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="block text-foreground mb-1.5 text-[13px] font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full h-13 px-4 py-3.5 pr-12 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-[15px]"
                autoComplete="new-password"
                required
                minLength={8}
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
            {/* Strength meter */}
            <div className="flex gap-1.5 mt-2" aria-label={`Password strength: ${strength}/3`}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-1 rounded-full transition-colors"
                  style={{
                    background: i < strength ? "#2F7D72" : "#E5E7EB",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Consent */}
          <div className="bg-card rounded-2xl p-4 border border-border">
            <p className="text-foreground mb-3 text-[13px] font-semibold">
              Before you continue
            </p>
            <p className="text-muted-foreground mb-4 text-[13px] leading-relaxed">
              IslaMind is a{" "}
              <strong className="text-foreground">self-reflection tool</strong>,
              not a medical service. It does not provide therapy, diagnosis, or
              crisis intervention. If you are in immediate distress, please
              contact emergency services or a trusted person.
            </p>
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className="flex items-start gap-3 w-full text-left"
              aria-pressed={agreed}
            >
              <div
                className="w-5 h-5 rounded flex-shrink-0 mt-0.5 border-2 flex items-center justify-center transition-colors"
                style={{
                  background: agreed ? "#2F7D72" : "transparent",
                  borderColor: agreed ? "#2F7D72" : "#E5E7EB",
                }}
              >
                {agreed && (
                  <Check size={11} className="text-white" aria-hidden="true" />
                )}
              </div>
              <span className="text-foreground text-[13px]">
                I understand this app is for self-reflection only and is not a
                substitute for professional mental health care.
              </span>
            </button>
          </div>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!agreed || isSubmitting}
            className={`w-full h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all font-semibold text-base ${
              agreed && !isSubmitting
                ? "bg-primary text-white active:scale-[0.98]"
                : "bg-border text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Creating account..." : "Create my account"}
          </button>
        </form>
      </div>

      <footer className="px-6 py-4 text-center">
        <span className="text-muted-foreground text-sm">
          Already have an account?{" "}
        </span>
        <button
          onClick={() => navigate("login")}
          className="text-primary text-sm font-semibold"
        >
          Sign in
        </button>
      </footer>
    </main>
  );
}
