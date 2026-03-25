"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { getSignUpUrl } from "@/lib/portal";
import { SMS_CONSENT_MARKETING, SMS_CONSENT_TRANSACTIONAL } from "@/lib/investment-interest-consent";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";
import Button from "@/components/ui/Button";

const INVESTMENT_RANGES = [
  { value: "", label: "Select range" },
  { value: "under_100k", label: "Under $100,000" },
  { value: "100k_250k", label: "$100,000 – $250,000" },
  { value: "250k_1m", label: "$250,000 – $1,000,000" },
  { value: "1m_plus", label: "$1,000,000+" },
  { value: "prefer_not", label: "Prefer not to say" },
];

const ACCREDITED = [
  { value: "", label: "Select one" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "I'm not sure" },
];

function digitsOnly(s) {
  return String(s || "").replace(/\D/g, "");
}

const inputClass = publicInputClass;
const labelClass = publicLabelClass;

export default function InvestmentInterestModal({ open, source, onClose }) {
  const dialogRef = useRef(null);
  const formId = useId();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [accreditedInvestor, setAccreditedInvestor] = useState("");
  const [comments, setComments] = useState("");
  const [consentTransactional, setConsentTransactional] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");

  const phoneDigits = digitsOnly(phone);
  const showSmsConsents = phoneDigits.length >= 10;

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  useEffect(
    () => () => {
      dialogRef.current?.close();
    },
    []
  );

  useEffect(() => {
    if (!open) return;
    setSuccess(false);
    setError("");
  }, [open]);

  function reset() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setInvestmentRange("");
    setAccreditedInvestor("");
    setComments("");
    setConsentTransactional(false);
    setConsentMarketing(false);
    setCompanyWebsite("");
    setError("");
  }

  function handleClose() {
    reset();
    setSuccess(false);
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!investmentRange) {
      setError("Please select how much you are looking to invest.");
      return;
    }
    if (!accreditedInvestor) {
      setError("Please indicate accredited investor status.");
      return;
    }
    if (showSmsConsents && !consentTransactional) {
      setError("To receive text messages at the number provided, please check the transactional SMS consent box.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/investment-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          investmentRange,
          accreditedInvestor,
          comments: comments.trim() || undefined,
          consentTransactionalSms: showSmsConsents ? consentTransactional : false,
          consentMarketingSms: showSmsConsents ? consentMarketing : false,
          companyWebsite: companyWebsite || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again or email investorsupport@diversyfund.com.");
        return;
      }
      setSuccess(true);
      reset();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "investment-interest-dialog fixed left-1/2 top-1/2 z-[100] m-0 w-[min(100vw-1.5rem,28rem)] max-w-none -translate-x-1/2 -translate-y-1/2",
        "border-0 bg-transparent p-0"
      )}
      onClose={handleClose}
    >
      {/*
        Avoid flex/grid on the native <dialog> node — WebKit often mis-sizes children (collapsed body, dead clicks).
        Scroll region uses an explicit max-height instead of flex-1 so the form stays visible and tappable on iOS.
      */}
      <div
        className={cn(
          "pointer-events-auto flex max-h-[min(92dvh,40rem)] w-full flex-col overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-xl"
        )}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 id={`${formId}-title`} className={cn("text-lg font-semibold tracking-tight", brand.text)}>
              Investment interest
            </h2>
            <p className={cn("mt-1 text-xs", brand.muted)}>
              Tell us how we can help. We&apos;ll follow up with next steps.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={cn(
            "overflow-y-auto overscroll-contain px-5 py-4",
            "max-h-[min(calc(92dvh-9rem),calc(40rem-9rem))]",
            "[-webkit-overflow-scrolling:touch]"
          )}
        >
        {success ? (
          <div className="space-y-4">
            <p className={cn("text-sm leading-relaxed", brand.muted)}>
              Thank you. Our team will review your information and reach out shortly.
            </p>
            <p className={cn("text-sm leading-relaxed", brand.muted)}>
              Continue to the investor portal to create your account and complete onboarding when you&apos;re ready.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Button href={getSignUpUrl()} showArrow>
                Go to investor portal
              </Button>
              <button
                type="button"
                onClick={handleClose}
                className={cn("text-center text-sm font-medium text-diversy-primary hover:underline")}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form id={`${formId}-form`} onSubmit={handleSubmit} className="space-y-4">
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

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor={`${formId}-fn`}>
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-fn`}
                  className={inputClass}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${formId}-ln`}>
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  id={`${formId}-ln`}
                  className={inputClass}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor={`${formId}-em`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id={`${formId}-em`}
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor={`${formId}-ph`}>
                Phone
              </label>
              <input
                id={`${formId}-ph`}
                type="tel"
                className={inputClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                placeholder="Optional — required if you want SMS updates"
              />
              {phoneDigits.length > 0 && phoneDigits.length < 10 && (
                <p className={cn("mt-1 text-xs", brand.subtle)}>Enter a complete phone number (10+ digits) for SMS.</p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor={`${formId}-range`}>
                How much are you looking to invest? <span className="text-red-500">*</span>
              </label>
              <select
                id={`${formId}-range`}
                className={inputClass}
                value={investmentRange}
                onChange={(e) => setInvestmentRange(e.target.value)}
                required
              >
                {INVESTMENT_RANGES.map((o) => (
                  <option key={o.value || "empty"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor={`${formId}-acc`}>
                Are you an accredited investor? <span className="text-red-500">*</span>
              </label>
              <select
                id={`${formId}-acc`}
                className={inputClass}
                value={accreditedInvestor}
                onChange={(e) => setAccreditedInvestor(e.target.value)}
                required
              >
                {ACCREDITED.map((o) => (
                  <option key={o.value || "empty"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor={`${formId}-msg`}>
                Anything else we should know?
              </label>
              <textarea
                id={`${formId}-msg`}
                className={cn(inputClass, "min-h-[5rem] resize-y")}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
              />
            </div>

            {showSmsConsents && (
              <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-3">
                <p className={cn("text-xs font-medium", brand.text)}>SMS consent</p>
                <label className="flex cursor-pointer gap-2.5">
                  <input
                    type="checkbox"
                    checked={consentTransactional}
                    onChange={(e) => setConsentTransactional(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/40"
                  />
                  <span className={cn("text-xs leading-snug", brand.muted)}>{SMS_CONSENT_TRANSACTIONAL}</span>
                </label>
                <label className="flex cursor-pointer gap-2.5">
                  <input
                    type="checkbox"
                    checked={consentMarketing}
                    onChange={(e) => setConsentMarketing(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/40"
                  />
                  <span className={cn("text-xs leading-snug", brand.muted)}>{SMS_CONSENT_MARKETING}</span>
                </label>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <Button type="submit" showArrow={false} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </Button>
              <button
                type="button"
                onClick={handleClose}
                className={cn("py-2 text-center text-sm font-medium text-muted-foreground hover:text-foreground")}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        </div>
      </div>
    </dialog>
  );
}
