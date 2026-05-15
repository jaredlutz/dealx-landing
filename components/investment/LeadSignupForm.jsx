"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Linkedin, Loader2 } from "lucide-react";
import EmailConsentControls from "@/components/forms/EmailConsentControls";
import EmailVerificationStep from "@/components/forms/EmailVerificationStep";
import PasswordField from "@/components/forms/PasswordField";
import {
  SMS_CONSENT_MARKETING,
  SMS_CONSENT_TRANSACTIONAL,
} from "@/lib/investment-interest-consent";
import { isPasswordStrong } from "@/lib/password-strength";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";

/**
 * `LeadSignupForm` is the modal-hosted twin of the Insights gate's
 * `InsightsUnlockCard` — same WorkOS sign-up machinery, same LinkedIn
 * deep-link, same Social-platform-and-handle requirement for the
 * email/password path. The form is intent-driven so the IRA download flow
 * stays minimal while the Income Investments flow asks an extra investment
 * timeline / primary-goal / phone block.
 *
 * Three driving modes:
 *   - `signup`  — no WorkOS session yet; show LinkedIn deep-link button +
 *                 the inline email/password form.
 *   - `verify`  — `/api/lead-signup` returned `status: "verify_email"`.
 *                 Render `EmailVerificationStep` and POST the code to
 *                 `/api/lead-signup/verify` (with the same intent + capital
 *                 metadata) to finalize.
 *   - `capital` — WorkOS session present; skip identity fields, only ask the
 *                 intent-specific questions + capital + consent.
 *
 * LinkedIn deep-link UX: we stash `{ source, successAction, ts }` in
 * `sessionStorage` BEFORE redirecting to LinkedIn; the
 * `InvestmentInterestProvider` reads that on mount when the visitor lands
 * back on the LP after `/callback` and re-opens the modal so the action
 * (download / lead capture) can be completed without a manual re-click.
 */

const RANGE_OPTIONS = [
  { value: "under_100k", label: "Under $100,000" },
  { value: "100k_250k", label: "$100,000 – $250,000" },
  { value: "250k_1m", label: "$250,000 – $1,000,000" },
  { value: "1m_plus", label: "$1,000,000+" },
  { value: "prefer_not", label: "Prefer not to say" },
];

const SOCIAL_PLATFORM_OPTIONS = [
  { value: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourname or @yourname" },
  { value: "x", label: "X (Twitter)", placeholder: "@yourhandle" },
  { value: "instagram", label: "Instagram", placeholder: "@yourhandle" },
  { value: "facebook", label: "Facebook", placeholder: "facebook.com/yourname" },
  { value: "other", label: "Other", placeholder: "Profile URL or @handle" },
];

const TIMELINE_OPTIONS = [
  { value: "now", label: "Investing now (0–4 weeks)" },
  { value: "1_3m", label: "1–3 months" },
  { value: "3_6m", label: "3–6 months" },
  { value: "6_12m", label: "6–12 months" },
  { value: "exploring", label: "Exploring — no timeline yet" },
];

const GOAL_OPTIONS = [
  { value: "income", label: "Income" },
  { value: "preservation", label: "Preservation" },
  { value: "growth", label: "Growth" },
  { value: "diversification", label: "Diversification" },
];

export const PENDING_LEAD_MODAL_KEY = "df-pending-lead-modal-v1";

function digitsOnly(s) {
  return String(s || "").replace(/\D/g, "");
}

/**
 * @typedef {{ kind: "portal" }} PortalSuccessAction
 * @typedef {{ kind: "download", href: string, filename?: string, title: string, description?: string, eyebrow?: string }} DownloadSuccessAction
 * @typedef {PortalSuccessAction | DownloadSuccessAction | null} SuccessAction
 *
 * @param {{
 *   intent: "ira-download" | "income-investments",
 *   source: string,
 *   successAction?: SuccessAction,
 *   onSubmitSuccess: (resp: { firstName: string, lastName: string, email: string }) => void,
 *   onCancel?: () => void,
 * }} props
 */
export default function LeadSignupForm({
  intent,
  source,
  successAction = null,
  onSubmitSuccess,
  onCancel,
}) {
  const pathname = usePathname();
  const formId = useId();
  const isIncomeInvestments = intent === "income-investments";

  /** @type {[ "loading" | "signup" | "verify" | "capital", Function ]} */
  const [mode, setMode] = useState("loading");
  const [sessionFirstName, setSessionFirstName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [investmentTimeline, setInvestmentTimeline] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [phone, setPhone] = useState("");
  const [consentEmailPrivacy, setConsentEmailPrivacy] = useState(false);
  const [consentMarketingEmail, setConsentMarketingEmail] = useState(false);
  const [consentTransactionalSms, setConsentTransactionalSms] = useState(false);
  const [consentMarketingSms, setConsentMarketingSms] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [pendingToken, setPendingToken] = useState("");
  const [pendingUserId, setPendingUserId] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const phoneDigits = digitsOnly(phone);
  const showSmsConsents = isIncomeInvestments && phoneDigits.length >= 10;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/insights-signup/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setMode("signup");
          return;
        }
        if (data.status === "unlocked" || data.status === "partial") {
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
  }, []);

  const selectedSocialPlaceholder = useMemo(() => {
    const match = SOCIAL_PLATFORM_OPTIONS.find((o) => o.value === socialPlatform);
    return match?.placeholder ?? "Profile URL or @handle";
  }, [socialPlatform]);

  const linkedinHref = useMemo(() => {
    const from = pathname && pathname.startsWith("/") ? pathname : "/";
    return `/api/insights-signup/linkedin/start?from=${encodeURIComponent(from)}`;
  }, [pathname]);

  function handleLinkedInClick(e) {
    // Stash the modal context so the provider can re-open us on return.
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(
          PENDING_LEAD_MODAL_KEY,
          JSON.stringify({
            source,
            successAction,
            ts: Date.now(),
          })
        );
      } catch {
        // sessionStorage unavailable — the LinkedIn flow still works, the
        // visitor just has to click the CTA again after they return.
      }
    }
    // Let the anchor's default navigation continue.
    void e;
  }

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
    if (isIncomeInvestments) {
      if (!investmentTimeline) {
        setError("Please select your investment timeline.");
        return;
      }
      if (!primaryGoal) {
        setError("Please select your primary goal.");
        return;
      }
      if (phoneDigits.length > 0 && phoneDigits.length < 10) {
        setError("Enter a complete phone number (10+ digits) or leave it blank.");
        return;
      }
      if (showSmsConsents && !consentTransactionalSms) {
        setError(
          "To receive text messages at the number provided, please check the transactional SMS consent box."
        );
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
      const body = {
        intent,
        source,
        investmentRange,
        consentEmailPrivacy,
        consentMarketingEmail,
        companyWebsite: companyWebsite || undefined,
      };
      if (mode === "signup") {
        body.firstName = firstName.trim();
        body.lastName = lastName.trim();
        body.email = email.trim();
        body.password = password;
        body.socialPlatform = socialPlatform;
        body.socialHandle = socialHandle.trim();
      }
      if (isIncomeInvestments) {
        body.investmentTimeline = investmentTimeline;
        body.primaryGoal = primaryGoal;
        if (phoneDigits.length >= 10) {
          body.phone = phone.trim();
          body.consentTransactionalSms = consentTransactionalSms;
          body.consentMarketingSms = consentMarketingSms;
        }
      }
      const res = await fetch("/api/lead-signup", {
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
      // Best-effort cleanup so a future flow doesn't re-trigger the modal.
      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.removeItem(PENDING_LEAD_MODAL_KEY);
        } catch {
          // ignore
        }
      }
      onSubmitSuccess({
        firstName: data.firstName ?? firstName,
        lastName: data.lastName ?? lastName,
        email: data.email ?? email,
      });
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
      const verifyBody = {
        intent,
        source,
        code,
        pendingAuthenticationToken: pendingToken,
        socialPlatform,
        socialHandle: socialHandle.trim(),
        investmentRange,
        consentEmailPrivacy,
        consentMarketingEmail,
      };
      if (isIncomeInvestments) {
        verifyBody.investmentTimeline = investmentTimeline;
        verifyBody.primaryGoal = primaryGoal;
        if (phoneDigits.length >= 10) {
          verifyBody.phone = phone.trim();
          verifyBody.consentTransactionalSms = consentTransactionalSms;
          verifyBody.consentMarketingSms = consentMarketingSms;
        }
      }
      const res = await fetch("/api/lead-signup/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(verifyBody),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.message || "That code didn't work. Please try again.");
        return;
      }
      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.removeItem(PENDING_LEAD_MODAL_KEY);
        } catch {
          // ignore
        }
      }
      onSubmitSuccess({
        firstName: data.firstName ?? firstName,
        lastName: data.lastName ?? lastName,
        email: data.email ?? email,
      });
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
    const res = await fetch("/api/lead-signup/resend", {
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
      <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Checking your sign-up status…
      </div>
    );
  }

  if (mode === "verify") {
    const verifyLabel = isIncomeInvestments
      ? "Verify and submit"
      : successAction?.kind === "download"
        ? "Verify and download the guide"
        : "Verify and continue";
    return (
      <div className="space-y-4">
        <EmailVerificationStep
          email={pendingEmail || email.trim()}
          userId={pendingUserId}
          submitting={submitting}
          submitLabel={verifyLabel}
          error={error}
          onSubmit={handleVerifySubmit}
          onResend={handleResendCode}
          onBack={handleVerifyBack}
        />
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 text-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        ) : null}
      </div>
    );
  }

  const isDownload = successAction?.kind === "download";
  const submitLabel = submitting
    ? mode === "signup"
      ? isDownload
        ? "Preparing your guide…"
        : "Signing up…"
      : isDownload
        ? "Preparing your guide…"
        : "Submitting…"
    : mode === "signup"
      ? isDownload
        ? "Sign up and download the guide"
        : "Sign up and continue"
      : isDownload
        ? "Get the guide"
        : "Submit";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" ? (
        <div className="space-y-4">
          <a
            href={linkedinHref}
            onClick={handleLinkedInClick}
            className={cn(
              "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition",
              "bg-[#0A66C2] text-white hover:bg-[#0a5cb0]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/60"
            )}
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            Sign up with LinkedIn
          </a>
          <div className="flex items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-border" />
            <span className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", brand.subtle)}>or</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </div>
      ) : sessionFirstName ? (
        <p className={cn("text-sm leading-relaxed", brand.muted)}>
          Welcome back, {sessionFirstName}. A couple of quick questions
          {isIncomeInvestments ? " so we can route the right next step" : isDownload ? " before we send the guide" : ""}.
        </p>
      ) : null}

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

      {isIncomeInvestments ? (
        <>
          <div>
            <label className={publicLabelClass} htmlFor={`${formId}-timeline`}>
              Investment timeline <span className="text-red-500">*</span>
            </label>
            <select
              id={`${formId}-timeline`}
              className={publicInputClass}
              value={investmentTimeline}
              onChange={(e) => setInvestmentTimeline(e.target.value)}
              required
            >
              <option value="">Select timeline</option>
              {TIMELINE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={publicLabelClass} htmlFor={`${formId}-goal`}>
              Primary goal <span className="text-red-500">*</span>
            </label>
            <select
              id={`${formId}-goal`}
              className={publicInputClass}
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              required
            >
              <option value="">Select primary goal</option>
              {GOAL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={publicLabelClass} htmlFor={`${formId}-phone`}>
              Phone
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              className={publicInputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="Optional — required if you want SMS updates"
            />
            {phoneDigits.length > 0 && phoneDigits.length < 10 ? (
              <p className={cn("mt-1 text-xs", brand.subtle)}>
                Enter a complete phone number (10+ digits) for SMS.
              </p>
            ) : null}
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

      {showSmsConsents ? (
        <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-3">
          <p className={cn("text-xs font-medium", brand.text)}>SMS consent</p>
          <label className="flex cursor-pointer gap-2.5">
            <input
              type="checkbox"
              checked={consentTransactionalSms}
              onChange={(e) => setConsentTransactionalSms(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/40"
            />
            <span className={cn("text-xs leading-snug", brand.muted)}>{SMS_CONSENT_TRANSACTIONAL}</span>
          </label>
          <label className="flex cursor-pointer gap-2.5">
            <input
              type="checkbox"
              checked={consentMarketingSms}
              onChange={(e) => setConsentMarketingSms(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/40"
            />
            <span className={cn("text-xs leading-snug", brand.muted)}>{SMS_CONSENT_MARKETING}</span>
          </label>
        </div>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition",
            "hover:bg-diversy-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/60",
            "disabled:pointer-events-none disabled:opacity-60"
          )}
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="py-2 text-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <p className={cn("text-[11px] leading-relaxed", brand.subtle)}>
        For informational purposes only. Not an offer or solicitation. We may follow up by email.
      </p>
    </form>
  );
}
