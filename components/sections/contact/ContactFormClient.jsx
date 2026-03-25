"use client";

import Link from "next/link";
import { useId, useState } from "react";
import {
  CONTACT_PAGE_PRIVACY_LEAD_IN,
  CONTACT_PAGE_SMS_PARAGRAPH_1,
  CONTACT_PAGE_SMS_PARAGRAPH_2,
  CONTACT_SMS_MARKETING_CHECKBOX_SUMMARY,
} from "@/lib/contact-consent";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";
import Button from "@/components/ui/Button";

function digitsOnly(s) {
  return String(s || "").replace(/\D/g, "");
}

export default function ContactFormClient() {
  const id = useId();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consentMarketingSms, setConsentMarketingSms] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("");

  const phoneDigits = digitsOnly(phone);
  const showPhoneConsent = phoneDigits.length >= 10;

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
    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }
    if (showPhoneConsent && !consentMarketingSms) {
      setError("Please confirm SMS marketing consent for the mobile number you provided, or remove the phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          message: message.trim(),
          consentMarketingSms: showPhoneConsent ? consentMarketingSms : false,
          companyWebsite: companyWebsite || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again or email investorsupport@diversyfund.com.");
        return;
      }
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setConsentMarketingSms(false);
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
        <p className="font-medium">Thank you for reaching out.</p>
        <p className={cn("mt-2 text-sm", brand.muted)}>
          Our team will review your message and get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className={cn("mt-4 text-sm font-medium text-diversy-primary hover:underline")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={publicLabelClass} htmlFor={`${id}-fn`}>
            First name <span className="text-red-500">*</span>
          </label>
          <input
            id={`${id}-fn`}
            className={publicInputClass}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            required
          />
        </div>
        <div>
          <label className={publicLabelClass} htmlFor={`${id}-ln`}>
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            id={`${id}-ln`}
            className={publicInputClass}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            required
          />
        </div>
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
          Mobile phone
        </label>
        <input
          id={`${id}-phone`}
          type="tel"
          className={publicInputClass}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          placeholder="Optional"
        />
        {phoneDigits.length > 0 && phoneDigits.length < 10 && (
          <p className={cn("mt-1 text-xs", brand.subtle)}>Enter a complete number (10+ digits) or leave blank.</p>
        )}
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
          placeholder="How can we help?"
        />
      </div>

      {showPhoneConsent && (
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <label className="flex cursor-pointer gap-2.5">
            <input
              type="checkbox"
              checked={consentMarketingSms}
              onChange={(e) => setConsentMarketingSms(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/40"
            />
            <span className={cn("text-xs leading-snug", brand.muted)}>{CONTACT_SMS_MARKETING_CHECKBOX_SUMMARY}</span>
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
    </form>

    <div
      role="note"
      className={cn(
        "mt-6 border-t border-border/80 pt-6",
        "space-y-3 text-xs leading-relaxed sm:text-sm",
        brand.muted
      )}
    >
      <p>{CONTACT_PAGE_SMS_PARAGRAPH_1}</p>
      <p>{CONTACT_PAGE_SMS_PARAGRAPH_2}</p>
      <p>
        {CONTACT_PAGE_PRIVACY_LEAD_IN}
        <Link href="/privacy-policy" className="text-diversy-primary underline-offset-2 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
    </>
  );
}
