"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Linkedin, Loader2, Lock } from "lucide-react";
import EmailConsentControls from "@/components/forms/EmailConsentControls";
import EmailVerificationStep from "@/components/forms/EmailVerificationStep";
import PasswordField from "@/components/forms/PasswordField";
import { isPasswordStrong } from "@/lib/password-strength";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";

export const UNLOCK_STORAGE_KEY = "df-insights-unlocked-v1";

const RANGE_OPTIONS = [
  { value: "under_100k", label: "Under $100,000" },
  { value: "100k_250k", label: "$100,000 – $250,000" },
  { value: "250k_1m", label: "$250,000 – $1,000,000" },
  { value: "1m_plus", label: "$1,000,000+" },
  { value: "prefer_not", label: "Prefer not to say" },
];

// Email/password sign-ups must point us at a real profile. LinkedIn sign-ups
// skip this because their LinkedIn identity is already linked to the WorkOS user.
const SOCIAL_PLATFORM_OPTIONS = [
  { value: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourname or @yourname" },
  { value: "x", label: "X (Twitter)", placeholder: "@yourhandle" },
  { value: "instagram", label: "Instagram", placeholder: "@yourhandle" },
  { value: "facebook", label: "Facebook", placeholder: "facebook.com/yourname" },
  { value: "other", label: "Other", placeholder: "Profile URL or @handle" },
];

/** @returns {boolean} */
export function readStoredUnlock() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeStoredUnlock() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(UNLOCK_STORAGE_KEY, "1");
  } catch {
    // ignore — gated state still resolves for this session via React state
  }
}

/**
 * Insights & Education sign-up gate — shared by `ArticleGate` (markdown) and
 * `GatedSection` (JSX). The form is **fully self-hosted on the LP**: nothing
 * redirects to the WorkOS hosted chooser UI. A single `POST /api/insights-unlock`
 * does the real WorkOS sign-up (`userManagement.createUser` +
 * `authenticateWithPassword` + `saveSession`) and the capital metadata write
 * in one round trip.
 *
 * Modes (driven by `/api/insights-signup/me` on mount + the API response):
 *   - `signup`  — no WorkOS session; show "Sign up with LinkedIn" deep-link
 *                 button + the inline email/password form (First/Last/Email/
 *                 Password + Capital + Consent). The LinkedIn button hits
 *                 `/api/insights-signup/linkedin/start` which deep-links via
 *                 WorkOS's built-in `provider: "LinkedInOAuth"` (LinkedIn UI,
 *                 not WorkOS hosted UI) → `/callback` → returns here with a
 *                 live AuthKit session → card flips to `capital`.
 *   - `verify`  — `/api/insights-unlock` returned `status: "verify_email"`.
 *                 WorkOS auto-emailed a one-time code; render
 *                 `EmailVerificationStep` and POST the code to
 *                 `/api/insights-unlock/verify` (with the same capital +
 *                 consent payload) to finalize.
 *   - `capital` — WorkOS session present, no unlock metadata yet; show Capital
 *                 + Consent only.
 *   - `loading` — initial status fetch in flight.
 *
 * The localStorage flag `df-insights-unlocked-v1` is the first-paint fast-path
 * that parents check before mounting the card at all; on submit success we
 * write the flag and call `onUnlocked()` to reveal the article body.
 *
 * @param {{ slug: string, eyebrow?: string, onUnlocked: () => void }} props
 */
export default function InsightsUnlockCard({ slug, eyebrow = "Continue reading", onUnlocked }) {
  const pathname = usePathname();
  const formId = useId();

  /** @type {"loading" | "signup" | "verify" | "capital"} */
  const [mode, setMode] = useState("loading");
  const [sessionFirstName, setSessionFirstName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [consentEmailPrivacy, setConsentEmailPrivacy] = useState(false);
  const [consentMarketingEmail, setConsentMarketingEmail] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [pendingToken, setPendingToken] = useState("");
  const [pendingUserId, setPendingUserId] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const selectedSocialPlaceholder = useMemo(() => {
    const match = SOCIAL_PLATFORM_OPTIONS.find((o) => o.value === socialPlatform);
    return match?.placeholder ?? "Profile URL or @handle";
  }, [socialPlatform]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/insights-signup/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) {
          if (!cancelled) setMode("signup");
          return;
        }
        if (data.status === "unlocked") {
          writeStoredUnlock();
          onUnlocked();
        } else if (data.status === "partial") {
          setSessionFirstName(typeof data.firstName === "string" ? data.firstName : "");
          setMode("capital");
        } else {
          setMode("signup");
        }
      })
      .catch(() => {
        if (!cancelled) setMode("signup");
      });
    return () => {
      cancelled = true;
    };
  }, [onUnlocked]);

  const linkedinHref = useMemo(() => {
    const from = pathname && pathname.startsWith("/") ? pathname : "/insights-education";
    return `/api/insights-signup/linkedin/start?from=${encodeURIComponent(from)}`;
  }, [pathname]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!firstName.trim()) {
        setError("Please enter your first name.");
        return;
      }
      if (!lastName.trim()) {
        setError("Please enter your last name.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!isPasswordStrong(password)) {
        setError("Your password doesn't meet the strength requirements listed below the field.");
        return;
      }
      if (!socialPlatform) {
        setError("Please select where we can find you online.");
        return;
      }
      if (!socialHandle.trim()) {
        setError("Please enter your handle or profile URL.");
        return;
      }
    }
    if (!investmentRange) {
      setError("Please select an investment range.");
      return;
    }
    if (!consentEmailPrivacy) {
      setError("Please confirm the Privacy Policy acknowledgment to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const body =
        mode === "signup"
          ? {
              slug,
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              email: email.trim(),
              password,
              socialPlatform,
              socialHandle: socialHandle.trim(),
              investmentRange,
              consentEmailPrivacy,
              consentMarketingEmail,
              companyWebsite: companyWebsite || undefined,
            }
          : {
              slug,
              investmentRange,
              consentEmailPrivacy,
              consentMarketingEmail,
              companyWebsite: companyWebsite || undefined,
            };
      const res = await fetch("/api/insights-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }
      if (data.status === "verify_email" && typeof data.pendingAuthenticationToken === "string") {
        setPendingToken(data.pendingAuthenticationToken);
        setPendingUserId(typeof data.userId === "string" ? data.userId : "");
        setPendingEmail(typeof data.email === "string" ? data.email : email.trim());
        setMode("verify");
        return;
      }
      writeStoredUnlock();
      onUnlocked();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerifySubmit(code) {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/insights-unlock/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          slug,
          code,
          pendingAuthenticationToken: pendingToken,
          socialPlatform,
          socialHandle: socialHandle.trim(),
          investmentRange,
          consentEmailPrivacy,
          consentMarketingEmail,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.message || "That code didn't work. Please try again.");
        return;
      }
      writeStoredUnlock();
      onUnlocked();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResendCode() {
    if (!pendingUserId) {
      throw new Error("Missing user reference. Please start sign-up again.");
    }
    const res = await fetch("/api/insights-unlock/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId: pendingUserId }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      throw new Error(data.message || "We couldn't resend the code. Please try again.");
    }
  }

  function handleVerifyBack() {
    setError("");
    setPendingToken("");
    setPendingUserId("");
    setPendingEmail("");
    setMode("signup");
  }

  if (mode === "loading") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border bg-card p-5 shadow-xl",
          "ring-1 ring-border/40 sm:p-6"
        )}
      >
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-diversy-primary" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary">{eyebrow}</p>
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Checking your sign-up status…
        </div>
      </div>
    );
  }

  const heading =
    mode === "signup"
      ? "Sign up to keep reading."
      : mode === "verify"
      ? "Verify your email to keep reading."
      : sessionFirstName
      ? `Welcome, ${sessionFirstName}. One more question to keep reading.`
      : "One more question to keep reading.";

  const subhead =
    mode === "signup"
      ? "We share full long-form analysis with allocators we can route a useful next step to. Sign up in under a minute to unlock every Insights & Education article."
      : mode === "verify"
      ? "We just emailed you a one-time verification code. Enter it below to finish signing up — your answers from the previous step are still saved."
      : "Tell us about the allocation you're considering. Takes about ten seconds.";

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-xl",
        "ring-1 ring-border/40 sm:p-6"
      )}
    >
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-diversy-primary" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary">{eyebrow}</p>
      </div>
      <h3 className={cn("mt-3 text-lg font-semibold tracking-tight sm:text-xl", brand.text)}>{heading}</h3>
      <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{subhead}</p>

      {mode === "verify" ? (
        <div className="mt-5">
          <EmailVerificationStep
            email={pendingEmail || email.trim()}
            userId={pendingUserId}
            submitting={submitting}
            submitLabel="Verify and unlock"
            error={error}
            onSubmit={handleVerifySubmit}
            onResend={handleResendCode}
            onBack={handleVerifyBack}
          />
        </div>
      ) : null}

      {mode === "signup" ? (
        <>
          <a
            href={linkedinHref}
            className={cn(
              "mt-5 inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition",
              "bg-[#0A66C2] text-white hover:bg-[#0a5cb0]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/60"
            )}
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            Sign up with LinkedIn
          </a>
          <div className="my-4 flex items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-border" />
            <span className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", brand.subtle)}>or</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </>
      ) : null}

      {mode !== "verify" ? (
      <form onSubmit={handleSubmit} className={cn(mode === "signup" ? "space-y-4" : "mt-5 space-y-4")}>
        <input
          type="text"
          name="company"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        {mode === "signup" ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={publicLabelClass} htmlFor={`${formId}-fn`}>
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-fn`}
                  className={publicInputClass}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <label className={publicLabelClass} htmlFor={`${formId}-ln`}>
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-ln`}
                  className={publicInputClass}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>
            <div>
              <label className={publicLabelClass} htmlFor={`${formId}-em`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id={`${formId}-em`}
                type="email"
                className={publicInputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <PasswordField
              id={`${formId}-pw`}
              value={password}
              onChange={setPassword}
              helperText="We'll use this if you come back later."
            />
            <div className="grid gap-3 sm:grid-cols-[160px,1fr]">
              <div>
                <label className={publicLabelClass} htmlFor={`${formId}-platform`}>
                  Social platform <span className="text-red-500">*</span>
                </label>
                <select
                  id={`${formId}-platform`}
                  className={publicInputClass}
                  value={socialPlatform}
                  onChange={(e) => setSocialPlatform(e.target.value)}
                  required
                >
                  <option value="">Select platform</option>
                  {SOCIAL_PLATFORM_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={publicLabelClass} htmlFor={`${formId}-handle`}>
                  Handle or profile URL <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-handle`}
                  className={publicInputClass}
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                  placeholder={selectedSocialPlaceholder}
                  autoComplete="off"
                  maxLength={200}
                  required
                />
              </div>
            </div>
          </>
        ) : null}

        <div>
          <label className={publicLabelClass} htmlFor={`${formId}-range`}>
            How much capital are you considering allocating? <span className="text-red-500">*</span>
          </label>
          <select
            id={`${formId}-range`}
            className={publicInputClass}
            value={investmentRange}
            onChange={(e) => setInvestmentRange(e.target.value)}
            required
          >
            <option value="">Select range</option>
            {RANGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <EmailConsentControls
          privacyChecked={consentEmailPrivacy}
          onPrivacyChange={setConsentEmailPrivacy}
          marketingChecked={consentMarketingEmail}
          onMarketingChange={setConsentMarketingEmail}
        />

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition",
            "hover:bg-diversy-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/60",
            "disabled:pointer-events-none disabled:opacity-60"
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {mode === "signup" ? "Signing up…" : "Unlocking…"}
            </>
          ) : (
            <>{mode === "signup" ? "Sign up and continue reading" : "Unlock the rest of the article"}</>
          )}
        </button>

        <p className={cn("text-[11px] leading-relaxed", brand.subtle)}>
          For informational purposes only. Not an offer or solicitation. We may follow up by email.
        </p>
      </form>
      ) : null}
    </div>
  );
}
