"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2, Smartphone } from "lucide-react";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";

const RESEND_COOLDOWN_SECONDS = 30;

/**
 * SMS one-time-code step for deck request text verification.
 */
export default function SmsVerificationStep({
  phone,
  submitting,
  submitLabel = "Verify and open materials",
  error,
  onSubmit,
  onResend,
  onBack,
  children,
}) {
  const fieldId = useId();
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  const [code, setCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState("idle");
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
      setResendMessage("New code sent.");
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
        <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
        <div className={cn("text-sm leading-relaxed", brand.muted)}>
          We sent a verification code to{" "}
          <span className={cn("font-semibold", brand.text)}>{phone}</span>. Enter it below to
          request the deck.
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
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
          required
          aria-describedby={`${fieldId}-help`}
        />
        <p id={`${fieldId}-help`} className={cn("mt-1 text-[11px]", brand.subtle)}>
          6-digit code. Message &amp; data rates may apply.
        </p>
      </div>

      <p className={cn("text-[11px] leading-relaxed", brand.subtle)}>
        Code not showing up? Wait up to a minute, check spam filters on your phone, then tap
        resend. If it still doesn&apos;t arrive, use the email or social tab instead.
      </p>

      {children}

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
        disabled={submitting || code.trim().length < 6}
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
            disabled={resendStatus === "sending" || resendCooldown > 0}
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
              resendStatus === "error" ? "text-red-700 dark:text-red-300" : brand.subtle
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
            Use a different phone number
          </button>
        ) : null}
      </div>
    </form>
  );
}
