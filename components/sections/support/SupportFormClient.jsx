"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { SMS_CONSENT_MARKETING, SMS_CONSENT_TRANSACTIONAL } from "@/lib/investment-interest-consent";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";
import Button from "@/components/ui/Button";

function digitsOnly(s) {
  return String(s || "").replace(/\D/g, "");
}

const CATEGORIES = [
  { value: "", label: "Select a topic" },
  { value: "account", label: "Account access or profile" },
  { value: "investment", label: "Investment or holding details" },
  { value: "platform", label: "Portal or platform question" },
  { value: "other", label: "Other" },
];

export default function SupportFormClient() {
  const id = useId();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [consentTransactional, setConsentTransactional] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");

  const phoneDigits = digitsOnly(phone);
  const showSms = phoneDigits.length >= 10;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete your name, email, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!category) {
      setError("Please select a topic.");
      return;
    }
    if (showSms && !consentTransactional) {
      setError("To receive text messages at the number provided, please check the transactional SMS consent box.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          category,
          message: message.trim(),
          consentTransactionalSms: showSms ? consentTransactional : false,
          consentMarketingSms: showSms ? consentMarketing : false,
          companyWebsite: companyWebsite || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again or email investorsupport@diversyfund.com.");
        return;
      }
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setCategory("");
      setMessage("");
      setConsentTransactional(false);
      setConsentMarketing(false);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className={cn(
          "rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-6",
          brand.text
        )}
      >
        <p className="font-medium">Thank you.</p>
        <p className={cn("mt-2 text-sm", brand.muted)}>
          Our investor support team will review your message and respond as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className={cn("mt-4 text-sm font-medium text-diversy-primary hover:underline")}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div>
        <label className={publicLabelClass} htmlFor={`${id}-name`}>
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id={`${id}-name`}
          className={publicInputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div>
        <label className={publicLabelClass} htmlFor={`${id}-email`}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id={`${id}-email`}
          type="email"
          className={publicInputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label className={publicLabelClass} htmlFor={`${id}-phone`}>
          Phone
        </label>
        <input
          id={`${id}-phone`}
          type="tel"
          className={publicInputClass}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          placeholder="Optional — for SMS updates about your request"
        />
        {phoneDigits.length > 0 && phoneDigits.length < 10 && (
          <p className={cn("mt-1 text-xs", brand.subtle)}>Enter a complete phone number (10+ digits) for SMS.</p>
        )}
      </div>

      <div>
        <label className={publicLabelClass} htmlFor={`${id}-cat`}>
          Topic <span className="text-red-500">*</span>
        </label>
        <select
          id={`${id}-cat`}
          className={publicInputClass}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {CATEGORIES.map((c) => (
            <option key={c.value || "x"} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={publicLabelClass} htmlFor={`${id}-msg`}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id={`${id}-msg`}
          className={cn(publicInputClass, "min-h-[8rem] resize-y")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          placeholder="Describe your question or issue…"
        />
      </div>

      {showSms && (
        <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
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

      <Button type="submit" showArrow={false} disabled={submitting}>
        {submitting ? "Sending…" : "Submit"}
      </Button>

      <p className={cn("text-sm", brand.muted)}>
        For general inquiries (not account-specific), use our{" "}
        <Link href="/contact" className="font-medium text-diversy-primary hover:underline">
          Contact form
        </Link>
        .
      </p>
    </form>
  );
}
