"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import EmailConsentControls from "@/components/forms/EmailConsentControls";
import SmsVerificationStep from "@/components/forms/SmsVerificationStep";
import VoiceAiCallConsentControl from "@/components/forms/VoiceAiCallConsentControl";
import { trackDfIncomeDeckRequested } from "@/lib/analytics/trackDfIncomeDeckRequest";
import { deckFormInputClass, deckFormLabelClass } from "@/lib/book/deckFormStyles";
import {
  SMS_CONSENT_MARKETING,
  SMS_CONSENT_TRANSACTIONAL,
} from "@/lib/investment-interest-consent";
import { brand, cn } from "@/lib/theme";

const RANGE_OPTIONS = [
  { value: "under_100k", label: "Under $100,000" },
  { value: "100k_250k", label: "$100,000 – $250,000" },
  { value: "250k_1m", label: "$250,000 – $1,000,000" },
  { value: "1m_plus", label: "$1,000,000+" },
];

const AUTH_TABS = [
  { id: "social", label: "Social" },
  { id: "email", label: "Email" },
  { id: "text", label: "Text" },
];

/**
 * DF Income deck request — Google/LinkedIn, email (no OTP), or SMS verification.
 */
export default function Df2026DeckLeadSignupForm({
  source,
  submitLabel,
  onSuccess,
  bookCallHref = "/incomeopportunity/book",
}) {
  const pathname = usePathname();
  const formId = useId();
  const returnPath = pathname?.startsWith("/") ? pathname : "/book/df-income";

  const [mode, setMode] = useState("loading");
  const [authTab, setAuthTab] = useState("social");
  const [sessionFirstName, setSessionFirstName] = useState("");
  const [sessionUserId, setSessionUserId] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [consentEmailPrivacy, setConsentEmailPrivacy] = useState(false);
  const [consentMarketingEmail, setConsentMarketingEmail] = useState(false);
  const [consentTransactionalSms, setConsentTransactionalSms] = useState(false);
  const [consentMarketingSms, setConsentMarketingSms] = useState(false);
  const [consentVoiceAiCall, setConsentVoiceAiCall] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [pendingVerificationId, setPendingVerificationId] = useState("");
  const [pendingPhone, setPendingPhone] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/insights-signup/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (!data || data.status === "none") {
          setMode("signup");
          return;
        }
        if (data.status === "partial" || data.status === "unlocked") {
          setSessionFirstName(typeof data.firstName === "string" ? data.firstName : "");
          setSessionUserId(typeof data.userId === "string" ? data.userId : "");
          if (typeof data.firstName === "string") setFirstName(data.firstName);
          if (typeof data.lastName === "string") setLastName(data.lastName);
          if (typeof data.email === "string") setEmail(data.email);
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

  const googleHref = useMemo(
    () => `/api/insights-signup/google/start?from=${encodeURIComponent(returnPath)}`,
    [returnPath]
  );
  const linkedinHref = useMemo(
    () => `/api/insights-signup/linkedin/start?from=${encodeURIComponent(returnPath)}`,
    [returnPath]
  );

  function trackDeckRequestComplete(signupMode) {
    trackDfIncomeDeckRequested({
      source,
      path: returnPath,
      investmentRange,
      signupMode,
    });
  }

  async function postDeckSignup(body) {
    const res = await fetch("/api/crm/df-income-deck-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  }

  function deckErrorMessage(data) {
    if (data?.error === "missing_identity") {
      return "We need your email or phone to send materials. Please try again.";
    }
    return data?.message || data?.error || "Something went wrong. Please try again.";
  }

  function smsErrorMessage(code) {
    switch (code) {
      case "invalid_phone":
        return "Please enter a valid U.S. phone number.";
      case "invalid_code":
        return "That code didn't work. Please try again.";
      case "verification_expired":
        return "That code expired. Please request a new verification text.";
      case "verification_not_found":
        return "This verification session expired. Please start again.";
      case "too_many_attempts":
        return "Too many attempts. Please request a new verification text.";
      case "resend_cooldown":
        return "Please wait a moment before requesting another code.";
      case "transactional_sms_consent_required":
        return "Please consent to receive the verification text.";
      case "sms_verification_unavailable":
      case "sms_line_not_configured":
      case "sms_verification_disabled":
        return "Text verification is temporarily unavailable. Please use email or social sign-in.";
      default:
        return "Something went wrong. Please try again.";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (mode === "signup" && authTab === "email") {
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
    }

    if (mode === "signup" && authTab === "text") {
      if (!firstName.trim()) {
        setError("Please enter your first name.");
        return;
      }
      if (!lastName.trim()) {
        setError("Please enter your last name.");
        return;
      }
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        setError("Please enter a valid phone number.");
        return;
      }
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError("Please enter a valid email address or leave it blank.");
        return;
      }
      if (!consentTransactionalSms) {
        setError("Please consent to receive the verification text.");
        return;
      }
    }

    if (mode === "capital") {
      if (!email.trim()) {
        setError("We couldn't read your sign-in email. Please use the email tab or try Google/LinkedIn again.");
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
      if (mode === "signup" && authTab === "text") {
        const res = await fetch("/api/crm/df-income-deck-sms/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: phone.trim(),
            email: email.trim() || undefined,
            source,
            companyWebsite: companyWebsite || undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          setError(smsErrorMessage(data.error) || data.message || smsErrorMessage());
          return;
        }
        setPendingVerificationId(data.verificationId);
        setPendingPhone(data.maskedPhone || phone.trim());
        setMode("verify_sms");
        return;
      }

      const deckBody = {
        source,
        investmentRange,
        consentEmailPrivacy,
        consentMarketingEmail,
        companyWebsite: companyWebsite || undefined,
      };

      if (mode === "signup" && authTab === "email") {
        deckBody.signupMethod = "email_direct";
        deckBody.firstName = firstName.trim();
        deckBody.lastName = lastName.trim();
        deckBody.email = email.trim();
        if (phone.trim()) deckBody.phone = phone.trim();
      } else if (mode === "capital") {
        deckBody.signupMethod = "oauth_or_existing";
        deckBody.firstName = firstName.trim() || sessionFirstName;
        deckBody.lastName = lastName.trim();
        deckBody.email = email.trim();
        if (sessionUserId) deckBody.workosUserId = sessionUserId;
        if (phone.trim()) deckBody.phone = phone.trim();
      }

      const data = await postDeckSignup(deckBody);
      if (!data.ok) {
        setError(deckErrorMessage(data));
        return;
      }
      trackDeckRequestComplete(mode === "capital" ? "capital" : authTab);
      onSuccess({
        firstName: data.firstName ?? firstName,
        lastName: data.lastName ?? lastName,
        email: data.email ?? email,
        materialsTid: data.materialsTid ?? null,
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSmsVerifySubmit(code) {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/crm/df-income-deck-sms/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verificationId: pendingVerificationId,
          code,
          source,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          investmentRange,
          signupMethod: "sms_otp",
          consentEmailPrivacy,
          consentMarketingEmail,
          consentTransactionalSms,
          consentMarketingSms,
          consentVoiceAiCall,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(smsErrorMessage(data.error) || data.message || "That code didn't work. Please try again.");
        return;
      }
      trackDeckRequestComplete("text");
      onSuccess({
        firstName: data.firstName ?? firstName,
        lastName: data.lastName ?? lastName,
        email: data.email ?? email,
        materialsTid: data.materialsTid ?? null,
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSmsResendCode() {
    if (!pendingVerificationId) {
      throw new Error("Missing verification session. Please start again.");
    }
    const res = await fetch("/api/crm/df-income-deck-sms/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verificationId: pendingVerificationId, resend: true }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(smsErrorMessage(data.error) || "We couldn't resend the code. Please try again.");
    }
    if (data.maskedPhone) setPendingPhone(data.maskedPhone);
  }

  const defaultSubmitLabel = submitting
    ? mode === "signup" && authTab === "text"
      ? "Sending verification text…"
      : "Submitting…"
    : mode === "signup" && authTab === "social"
      ? "Continue after signing in above"
      : mode === "signup" && authTab === "text"
        ? "Send verification text"
        : mode === "signup"
          ? "Request the investor deck"
          : "Request the deck";

  if (mode === "loading") {
    return (
      <div className={cn("flex items-center gap-2 py-2", brand.muted)}>
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Checking your sign-up status…
      </div>
    );
  }

  if (mode === "verify_sms") {
    return (
      <SmsVerificationStep
        phone={pendingPhone || phone.trim()}
        submitting={submitting}
        submitLabel="Verify and open materials"
        error={error}
        onSubmit={handleSmsVerifySubmit}
        onResend={handleSmsResendCode}
        onBack={() => {
          setError("");
          setPendingVerificationId("");
          setPendingPhone("");
          setMode("signup");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="companyWebsite"
        value={companyWebsite}
        onChange={(e) => setCompanyWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {mode === "signup" ? (
        <>
          <div className="flex gap-1 rounded-lg border border-[#e5e7eb] p-1" role="tablist" aria-label="Sign-in method">
            {AUTH_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={authTab === tab.id}
                className={cn(
                  "flex-1 rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                  authTab === tab.id
                    ? "bg-[#005EE0] text-white"
                    : "text-zinc-600 hover:bg-zinc-50"
                )}
                onClick={() => {
                  setAuthTab(tab.id);
                  setError("");
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {authTab === "social" && (
            <div className="space-y-3">
              <a
                href={googleHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#dadce0] bg-white px-4 py-2.5 text-sm font-semibold text-[#3c4043] hover:bg-[#f8f9fa]"
              >
                Continue with Google
              </a>
              <a
                href={linkedinHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004182]"
              >
                Continue with LinkedIn
              </a>
              <p className={cn("text-xs", brand.muted)}>
                After signing in, complete investment range and consents below, then request the deck.
              </p>
            </div>
          )}

          {authTab === "email" && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={deckFormLabelClass} htmlFor={`${formId}-first`}>
                    First name
                  </label>
                  <input
                    id={`${formId}-first`}
                    className={deckFormInputClass}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div>
                  <label className={deckFormLabelClass} htmlFor={`${formId}-last`}>
                    Last name
                  </label>
                  <input
                    id={`${formId}-last`}
                    className={deckFormInputClass}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className={deckFormLabelClass} htmlFor={`${formId}-email`}>
                  Email
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  className={deckFormInputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className={deckFormLabelClass} htmlFor={`${formId}-phone`}>
                  Phone <span className="font-normal text-zinc-500">(optional)</span>
                </label>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  className={deckFormInputClass}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>
          )}

          {authTab === "text" && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={deckFormLabelClass} htmlFor={`${formId}-text-first`}>
                    First name
                  </label>
                  <input
                    id={`${formId}-text-first`}
                    className={deckFormInputClass}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div>
                  <label className={deckFormLabelClass} htmlFor={`${formId}-text-last`}>
                    Last name
                  </label>
                  <input
                    id={`${formId}-text-last`}
                    className={deckFormInputClass}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className={deckFormLabelClass} htmlFor={`${formId}-text-phone`}>
                  Mobile phone
                </label>
                <input
                  id={`${formId}-text-phone`}
                  type="tel"
                  className={deckFormInputClass}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>
              <div>
                <label className={deckFormLabelClass} htmlFor={`${formId}-text-email`}>
                  Email <span className="font-normal text-zinc-500">(optional — deck copy by email)</span>
                </label>
                <input
                  id={`${formId}-text-email`}
                  type="email"
                  className={deckFormInputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>
          )}
        </>
      ) : sessionFirstName ? (
        <p className={cn("text-sm text-[#4b5563]")}>
          Welcome back, {sessionFirstName}. Confirm your investment range below to open the materials
          again — we&apos;ll refresh your profile if anything changed.
        </p>
      ) : null}

      {(mode === "capital" || (mode === "signup" && (authTab === "email" || authTab === "text"))) && (
        <>
      <div>
        <label className={deckFormLabelClass} htmlFor={`${formId}-range`}>
          Investment range
        </label>
        <select
          id={`${formId}-range`}
          className={deckFormInputClass}
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

      {authTab === "text" ? (
        <div className="space-y-3">
          <label className="flex cursor-pointer gap-3 text-sm leading-snug text-muted-foreground">
            <input
              type="checkbox"
              checked={consentTransactionalSms}
              onChange={(e) => setConsentTransactionalSms(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/30"
              required
            />
            <span className={cn("text-xs leading-snug", brand.muted)}>{SMS_CONSENT_TRANSACTIONAL}</span>
          </label>
          <label className="flex cursor-pointer gap-3 text-sm leading-snug text-muted-foreground">
            <input
              type="checkbox"
              checked={consentMarketingSms}
              onChange={(e) => setConsentMarketingSms(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/30"
            />
            <span className={cn("text-xs leading-snug", brand.muted)}>{SMS_CONSENT_MARKETING}</span>
          </label>
          <VoiceAiCallConsentControl checked={consentVoiceAiCall} onChange={setConsentVoiceAiCall} />
        </div>
      ) : null}

      <EmailConsentControls
        privacyChecked={consentEmailPrivacy}
        onPrivacyChange={setConsentEmailPrivacy}
        marketingChecked={consentMarketingEmail}
        onMarketingChange={setConsentMarketingEmail}
      />

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#005EE0] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0066F5] disabled:opacity-50"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {submitLabel ?? defaultSubmitLabel}
      </button>
        </>
      )}

      {mode === "signup" && authTab === "social" && error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {mode === "signup" && authTab === "social" && (
        <p className={cn("text-center text-xs", brand.muted)}>
          Or{" "}
          <button type="button" className="font-semibold text-[#005EE0] underline" onClick={() => setAuthTab("email")}>
            confirm with email
          </button>
          {" · "}
          <button type="button" className="font-semibold text-[#005EE0] underline" onClick={() => setAuthTab("text")}>
            verify by text
          </button>
          {" · "}
          <a href={bookCallHref} className="font-semibold text-[#005EE0] underline">
            book a call
          </a>
        </p>
      )}
    </form>
  );
}
