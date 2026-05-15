"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";

const RESEND_COOLDOWN_SECONDS = 30;

/**
 * Shared "enter the code we just emailed you" step used by both
 * `InsightsUnlockCard` (Insights & Education gate) and `LeadSignupForm`
 * (modal-hosted IRA / Income Investments lead-magnet flows).
 *
 * Driven entirely by props so each parent owns its own pending-token state
 * and submit handler. The parent decides which API endpoint to post the code
 * to (`/api/insights-unlock/verify` vs `/api/lead-signup/verify`) and which
 * resend endpoint to call (`.../resend`).
 *
 * @param {{
 *   email: string,
 *   userId?: string | null,
 *   submitting: boolean,
 *   submitLabel?: string,
 *   error?: string,
 *   onSubmit: (code: string) => void | Promise<void>,
 *   onResend?: () => Promise<void>,
 *   onBack?: () => void,
 * }} props
 */
export default function EmailVerificationStep({
  email,
  userId,
  submitting,
  submitLabel = "Verify and continue",
  error,
  onSubmit,
  onResend,
  onBack,
}) {
  const fieldId = useId();
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  const [code, setCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState("idle"); // idle | sending | sent | error
  const [resendMessage, setResendMessage] = useState("");

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    if (!code.trim()) return;
    void onSubmit(code.trim());
  }

  async function handleResend() {
    if (!onResend || resendStatus === "sending" || resendCooldown > 0) return;
    setResendStatus("sending");
    setResendMessage("");
    try {
      await onResend();
      setResendStatus("sent");
      setResendMessage("New code sent. Check your inbox.");
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setResendStatus("error");
      setResendMessage(
        err && typeof err.message === "string"
          ? err.message
          : "We couldn't resend the code. Please try again."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-3">
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
        <div className={cn("text-sm leading-relaxed", brand.muted)}>
          We sent a verification code to <span className={cn("font-semibold", brand.text)}>{email}</span>.
          Enter it below to finish signing up.
        </div>
      </div>

      <div>
        <label className={publicLabelClass} htmlFor={fieldId}>
          Verification code <span className="text-red-500">*</span>
        </label>
        <input
          ref={inputRef}
          id={fieldId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          className={cn(publicInputClass, "tracking-[0.45em] text-center text-base font-semibold")}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9A-Za-z]/g, "").slice(0, 8))}
          required
          aria-describedby={`${fieldId}-help`}
        />
        <p id={`${fieldId}-help`} className={cn("mt-1 text-[11px]", brand.subtle)}>
          The code is usually 6 digits and arrives within a minute. Check your spam folder if you don't see it.
        </p>
      </div>

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
        disabled={submitting || code.trim().length === 0}
        className={cn(
          "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition",
          "hover:bg-diversy-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/60",
          "disabled:pointer-events-none disabled:opacity-60"
        )}
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {submitting ? "Verifying…" : submitLabel}
      </button>

      <div className="flex flex-col gap-1 text-center text-xs">
        {onResend ? (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendStatus === "sending" || resendCooldown > 0 || !userId}
            className={cn(
              "self-center rounded-md px-2 py-1 font-medium text-diversy-primary",
              "hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {resendStatus === "sending"
              ? "Sending…"
              : resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Didn't get the code? Resend it"}
          </button>
        ) : null}
        {resendMessage ? (
          <p
            className={cn(
              "text-[11px]",
              resendStatus === "error"
                ? "text-red-700 dark:text-red-300"
                : brand.subtle
            )}
          >
            {resendMessage}
          </p>
        ) : null}
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className={cn(
              "self-center rounded-md px-2 py-1 font-medium",
              brand.muted,
              "hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
            )}
          >
            Use a different email
          </button>
        ) : null}
      </div>
    </form>
  );
}
