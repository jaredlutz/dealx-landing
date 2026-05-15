"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Download, X } from "lucide-react";
import LeadSignupForm from "@/components/investment/LeadSignupForm";
import Button from "@/components/ui/Button";
import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";

/**
 * Investment interest modal — the "Review current opportunities" / "See available
 * income investments" / "Download the IRA Investing Guide" entry point.
 *
 * Hosts `LeadSignupForm` inside a `<dialog>` so every CTA across the site shares
 * the same WorkOS-backed sign-up gate (real account creation via
 * `userManagement.createUser` + `authenticateWithPassword` + `saveSession`, or
 * the LinkedIn deep-link short-cut) instead of an anonymous lead form. The
 * intent is derived from `successAction.kind`:
 *   - `download` → `intent: "ira-download"` (minimal sign-up + auto-download)
 *   - everything else → `intent: "income-investments"` (sign-up + investment
 *     timeline + primary goal + optional phone with SMS consents)
 */
export default function InvestmentInterestModal({ open, source, successAction = null, onClose }) {
  const dialogRef = useRef(null);
  const downloadAnchorRef = useRef(null);
  const formId = useId();
  const [success, setSuccess] = useState(false);
  // Bumped each time `open` transitions to true so the inline form
  // remounts fresh (no stale half-filled state when the visitor reopens
  // the modal after dismissing it).
  const [openCount, setOpenCount] = useState(0);

  const isDownloadFlow = successAction?.kind === "download";
  const intent = isDownloadFlow ? "ira-download" : "income-investments";

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
    setOpenCount((n) => n + 1);
  }, [open]);

  function handleClose() {
    setSuccess(false);
    onClose();
  }

  function triggerDownload(action) {
    const a = downloadAnchorRef.current;
    if (!a || typeof window === "undefined") return;
    a.href = action.href;
    a.download = action.filename || "";
    a.rel = "noopener";
    a.target = "_blank";
    a.click();
  }

  function handleSubmitSuccess() {
    setSuccess(true);
    if (isDownloadFlow && successAction?.href) {
      triggerDownload(successAction);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "investment-interest-dialog fixed left-1/2 top-1/2 z-[100] m-0 w-[min(100vw-1.5rem,30rem)] max-w-none -translate-x-1/2 -translate-y-1/2",
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
          "pointer-events-auto flex max-h-[min(92dvh,44rem)] w-full flex-col overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-xl"
        )}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            {isDownloadFlow ? (
              <>
                {successAction.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-diversy-primary">
                    {successAction.eyebrow}
                  </p>
                ) : null}
                <h2 id={`${formId}-title`} className={cn("text-lg font-semibold tracking-tight", brand.text)}>
                  {successAction.title || "Get the guide"}
                </h2>
                <p className={cn("mt-1 text-xs", brand.muted)}>
                  {successAction.description ||
                    "Sign up to unlock the PDF — we'll email a copy for later."}
                </p>
              </>
            ) : (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-diversy-primary">
                  Income investments
                </p>
                <h2 id={`${formId}-title`} className={cn("text-lg font-semibold tracking-tight", brand.text)}>
                  See available income investments
                </h2>
                <p className={cn("mt-1 text-xs", brand.muted)}>
                  Sign up and tell us a bit about your allocation so we can route the right next step.
                </p>
              </>
            )}
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
            "max-h-[min(calc(92dvh-9rem),calc(44rem-9rem))]",
            "[-webkit-overflow-scrolling:touch]"
          )}
        >
          {success ? (
            isDownloadFlow ? (
              <div className="space-y-4">
                <p className={cn("text-sm leading-relaxed", brand.muted)}>
                  Thank you. Your download should have started — if not, use the button below. We&apos;ve also flagged
                  your interest so our team can follow up with the next step.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    href={successAction.href}
                    onClick={() => triggerDownload(successAction)}
                    showArrow={false}
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Download the guide
                  </Button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className={cn("text-center text-sm font-medium text-diversy-primary hover:underline")}
                  >
                    Close
                  </button>
                </div>
                <a ref={downloadAnchorRef} className="hidden" aria-hidden tabIndex={-1} />
              </div>
            ) : (
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
            )
          ) : (
            <LeadSignupForm
              key={openCount}
              intent={intent}
              source={source || "modal"}
              successAction={successAction}
              onSubmitSuccess={handleSubmitSuccess}
              onCancel={handleClose}
            />
          )}
        </div>
      </div>
    </dialog>
  );
}
