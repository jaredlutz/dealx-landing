"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import EmailConsentControls from "@/components/forms/EmailConsentControls";
import {
  SCORECARD_ANSWER_FIELDS,
  WEBINAR_SCORECARD_OPTIONS,
  WEBINAR_SCORECARD_STEPS,
  WEBINAR_SCORECARD_TOTAL_STEPS,
} from "@/lib/webinar-scorecard";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";

const motionEase = [0.25, 0.1, 0.25, 1];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

function tierLabel(tier) {
  if (tier === "high") return "Ready to move";
  if (tier === "medium") return "Engaged — clarifying";
  return "Research stage";
}

function tierBlurb(tier) {
  if (tier === "high") {
    return "Your timeline and intent match investors who typically progress directly to document review.";
  }
  if (tier === "medium") {
    return "You’re past casual research — the briefing and a follow-up conversation can map our structure to your constraints.";
  }
  return "Education-first paths are completely valid. Start with the briefing and circle back when timing aligns.";
}

/**
 * Optional `eventSlug` tags the CRM forward as a live-event submission and
 * `redirectTo` switches success behavior to push to that URL with the snapshot
 * encoded as query params (`tier`, `score`, `qualified`, `name`). When
 * `redirectTo` is omitted (default `/webinar-registration` usage), the form
 * renders the inline `ResultPanel` like before.
 */
export default function WebinarScorecardForm({ eventSlug = null, redirectTo = null } = {}) {
  const formId = useId();
  const router = useRouter();
  const honeypotRef = useRef(null);
  const headingRef = useRef(null);

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consentEmailPrivacy, setConsentEmailPrivacy] = useState(false);
  const [consentMarketingEmail, setConsentMarketingEmail] = useState(false);
  const [answers, setAnswers] = useState({});
  const [openText, setOpenText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const stepDef = useMemo(
    () => WEBINAR_SCORECARD_STEPS.find((s) => s.step === step) ?? WEBINAR_SCORECARD_STEPS[0],
    [step]
  );

  const progressPct = Math.round((step / WEBINAR_SCORECARD_TOTAL_STEPS) * 100);
  const phoneDigits = digitsOnly(phone);
  const isLastStep = step === WEBINAR_SCORECARD_TOTAL_STEPS;

  const canAdvance = useMemo(() => {
    if (stepDef.kind === "contact") {
      const phoneOk = !phone.trim() || phoneDigits.length >= 10;
      return (
        firstName.trim().length > 0 &&
        EMAIL_RE.test(email.trim()) &&
        consentEmailPrivacy &&
        phoneOk
      );
    }
    if (stepDef.kind === "textarea") return true;
    return Boolean(answers[stepDef.field]);
  }, [stepDef, firstName, email, consentEmailPrivacy, phone, phoneDigits, answers]);

  const focusHeading = useCallback(() => {
    requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
  }, []);

  const goNext = useCallback(() => {
    setError("");
    if (step < WEBINAR_SCORECARD_TOTAL_STEPS) {
      setStep((s) => s + 1);
      focusHeading();
    }
  }, [step, focusHeading]);

  const goBack = useCallback(() => {
    setError("");
    if (step > 1) {
      setStep((s) => s - 1);
      focusHeading();
    }
  }, [step, focusHeading]);

  const submit = useCallback(async () => {
    setError("");
    if (honeypotRef.current?.value) {
      if (redirectTo) {
        router.push(redirectTo);
        return;
      }
      setResult({
        scorePct: 0,
        tier: "low",
        insights: [],
        qualified: false,
      });
      return;
    }
    for (const field of SCORECARD_ANSWER_FIELDS) {
      if (!answers[field]) {
        setError("Please answer every question before submitting.");
        return;
      }
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/webinar-scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim() || null,
          phone: phone.trim() || null,
          consentEmail: true,
          consentMarketingEmail,
          q15AnythingElse: openText.trim() || null,
          eventSlug: eventSlug || null,
          ...answers,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      const snapshot = {
        scorePct: typeof data.scorePct === "number" ? data.scorePct : 0,
        tier: typeof data.tier === "string" ? data.tier : "medium",
        insights: Array.isArray(data.insights) ? data.insights : [],
        qualified: Boolean(data.qualified),
      };
      if (redirectTo) {
        const params = new URLSearchParams({
          tier: snapshot.tier,
          score: String(snapshot.scorePct),
          qualified: snapshot.qualified ? "1" : "0",
          name: firstName.trim(),
        });
        const separator = redirectTo.includes("?") ? "&" : "?";
        router.push(`${redirectTo}${separator}${params.toString()}`);
        return;
      }
      setResult(snapshot);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [
    answers,
    email,
    firstName,
    lastName,
    phone,
    openText,
    consentMarketingEmail,
    eventSlug,
    redirectTo,
    router,
  ]);

  if (result) {
    return <ResultPanel result={result} firstName={firstName.trim()} />;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
      <div className="mb-6 space-y-3">
        <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span>
            Step {step} / {WEBINAR_SCORECARD_TOTAL_STEPS}
          </span>
          <span className="tabular-nums">{progressPct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-diversy-primary"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.45, ease: motionEase }}
          />
        </div>
        <div className="pt-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
            {stepDef.subtitle}
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 text-balance text-xl font-semibold tracking-tight text-foreground outline-none sm:text-2xl"
          >
            {stepDef.title}
          </h2>
          {stepDef.helper ? (
            <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{stepDef.helper}</p>
          ) : null}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: motionEase }}
          className="min-h-[200px]"
        >
          {stepDef.kind === "contact" ? (
            <ContactStep
              formId={formId}
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phone}
              consentEmailPrivacy={consentEmailPrivacy}
              consentMarketingEmail={consentMarketingEmail}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setPhone={setPhone}
              setConsentEmailPrivacy={setConsentEmailPrivacy}
              setConsentMarketingEmail={setConsentMarketingEmail}
              honeypotRef={honeypotRef}
            />
          ) : null}

          {stepDef.kind === "choice" ? (
            <OptionGroup
              options={WEBINAR_SCORECARD_OPTIONS[stepDef.field]}
              selected={answers[stepDef.field]}
              onSelect={(value) =>
                setAnswers((prev) => ({ ...prev, [stepDef.field]: value }))
              }
            />
          ) : null}

          {stepDef.kind === "textarea" ? (
            <div className="space-y-2">
              <label htmlFor={`${formId}-open`} className={publicLabelClass}>
                Open response <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id={`${formId}-open`}
                rows={5}
                value={openText}
                onChange={(e) => setOpenText(e.target.value.slice(0, 2000))}
                placeholder="Anything specific you’d like the investor team to know before the briefing?"
                className={cn(publicInputClass, "min-h-[120px] resize-y")}
              />
              <p className="text-xs text-muted-foreground">{openText.length}/2000</p>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1 || submitting}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium transition",
            "hover:border-diversy-primary/35 hover:bg-muted/40",
            "disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </button>
        <button
          type="button"
          onClick={isLastStep ? submit : goNext}
          disabled={!canAdvance || submitting}
          className={cn(
            "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition",
            "hover:bg-diversy-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/60",
            "disabled:pointer-events-none disabled:opacity-50",
            "sm:min-w-[220px]"
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Submitting…
            </>
          ) : isLastStep ? (
            <>
              View my readiness snapshot
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </div>

      <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
        For accredited investors only. Educational only — not an offer or solicitation. Securities are offered solely
        by prospectus or private placement memorandum.
      </p>
    </div>
  );
}

function ContactStep({
  formId,
  firstName,
  lastName,
  email,
  phone,
  consentEmailPrivacy,
  consentMarketingEmail,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setConsentEmailPrivacy,
  setConsentMarketingEmail,
  honeypotRef,
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-firstName`} className={publicLabelClass}>
            First name <span className="text-diversy-primary">*</span>
          </label>
          <input
            id={`${formId}-firstName`}
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={publicInputClass}
            required
          />
        </div>
        <div>
          <label htmlFor={`${formId}-lastName`} className={publicLabelClass}>
            Last name
          </label>
          <input
            id={`${formId}-lastName`}
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={publicInputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className={publicLabelClass}>
          Email <span className="text-diversy-primary">*</span>
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={publicInputClass}
          placeholder="you@firm.com"
          required
        />
      </div>

      <div>
        <label htmlFor={`${formId}-phone`} className={publicLabelClass}>
          Phone <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id={`${formId}-phone`}
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={publicInputClass}
          placeholder="+1 555 123 4567"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Add a number if you want SMS confirmations for the briefing.
        </p>
      </div>

      <EmailConsentControls
        privacyChecked={consentEmailPrivacy}
        onPrivacyChange={setConsentEmailPrivacy}
        marketingChecked={consentMarketingEmail}
        onMarketingChange={setConsentMarketingEmail}
      />

      <div className="hidden" aria-hidden>
        <label>
          Company website
          <input ref={honeypotRef} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </div>
  );
}

function OptionGroup({ options, selected, onSelect }) {
  return (
    <ul role="listbox" className="space-y-2.5">
      {options.map((opt) => {
        const on = selected === opt.value;
        return (
          <li key={opt.value}>
            <motion.button
              type="button"
              role="option"
              aria-selected={on}
              whileTap={{ scale: 0.992 }}
              transition={{ duration: 0.15 }}
              onClick={() => onSelect(opt.value)}
              className={cn(
                "group relative flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium leading-snug transition",
                on
                  ? "border-diversy-primary bg-diversy-primary/10 text-foreground shadow-sm ring-2 ring-diversy-primary/20"
                  : "border-border bg-background text-foreground hover:border-diversy-primary/40 hover:bg-muted/40"
              )}
            >
              <span className="pr-1">{opt.label}</span>
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition",
                  on ? "opacity-100" : "opacity-0"
                )}
                aria-hidden
              >
                <CheckCircle2 className="h-5 w-5 text-diversy-primary" />
              </span>
            </motion.button>
          </li>
        );
      })}
    </ul>
  );
}

function ResultPanel({ result, firstName }) {
  const { scorePct, tier, insights, qualified } = result;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary">
          Readiness snapshot
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {firstName ? `${firstName}, you’re registered.` : "You’re registered."}
        </h2>
        <p className={cn("mt-3 text-sm leading-relaxed sm:text-base", brand.muted)}>
          We’ll email the briefing access details and a copy of this snapshot. Educational context only — not
          investment advice, a suitability determination, or any promise of access, approval, or performance.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-6">
          <div className="rounded-xl border border-border bg-muted/30 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Readiness index
            </p>
            <p className="mt-1 text-4xl font-semibold tabular-nums tracking-tight text-foreground">
              {scorePct}
              <span className="ml-0.5 text-xl text-muted-foreground">%</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">
              {tierLabel(tier)}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tierBlurb(tier)}</p>
          </div>
        </div>

        {insights.length > 0 ? (
          <div className="mt-7 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Reflected from your answers
            </p>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-foreground">
              {insights.map((line, i) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-diversy-primary/10 text-[11px] font-semibold text-diversy-primary">
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <NextStepCard tier={tier} qualified={qualified} />
    </div>
  );
}

function NextStepCard({ tier, qualified }) {
  let headline;
  let body;
  let primary = { label: "Open the briefing deck", href: "/fixed-income-webinar" };
  let secondary = { label: "Talk with the investor team", href: "/contact" };

  if (!qualified) {
    headline = "Start with the briefing replay";
    body =
      "Based on your responses, the most useful next step is the on-demand briefing — supply, debt maturities, and refinancing pressure in plain language. When timeline and ticket size firm up, the team is available for a private conversation.";
  } else if (tier === "high") {
    headline = "Next steps for active allocators";
    body =
      "Your responses suggest you’re actively allocating and ready for document-level discussion. Watch the briefing for full context on supply, debt, and pricing, then connect with the team for a private review.";
    secondary = { label: "Book a private call", href: "/contact" };
  } else {
    headline = "Two ways to go deeper";
    body =
      "You’re engaged but may still want macro and program context. The briefing replay covers the full narrative; from there the team can match the right next step to your timeline.";
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary">
        Recommended next step
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{headline}</h3>
      <p className={cn("mt-3 text-sm leading-relaxed sm:text-base", brand.muted)}>{body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={primary.href}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-diversy-primary-hover",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/60"
          )}
        >
          {primary.label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          href={secondary.href}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition",
            "hover:border-diversy-primary/35 hover:bg-muted/40"
          )}
        >
          {secondary.label}
          <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
