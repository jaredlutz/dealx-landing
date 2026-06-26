"use client";

import { useMemo } from "react";
import { cn } from "@/lib/theme";

/**
 * Social sign-in strip for public investor-call booking — prefills session via WorkOS OAuth return.
 */
export default function InvestorCallContactAuth({
  signedInEmail,
  signedInName,
  returnPath = "/book/investor-call",
  onUseManual,
  manualActive,
  className,
}) {
  const googleHref = useMemo(
    () => `/api/insights-signup/google/start?from=${encodeURIComponent(returnPath)}`,
    [returnPath]
  );
  const linkedinHref = useMemo(
    () => `/api/insights-signup/linkedin/start?from=${encodeURIComponent(returnPath)}`,
    [returnPath]
  );

  if (signedInEmail) {
    return (
      <div className={cn("rounded-lg border border-[#005EE0]/20 bg-[#005EE0]/5 px-4 py-3 text-sm", className)}>
        <p className="font-medium text-zinc-900">
          Signed in{signedInName ? ` as ${signedInName}` : ""}
        </p>
        <p className="mt-1 text-zinc-600">{signedInEmail}</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm font-medium text-zinc-900">Sign in to prefill your details</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <a
          href={googleHref}
          className="inline-flex items-center justify-center rounded-lg border border-[#dadce0] bg-white px-3 py-2 text-sm font-semibold text-[#3c4043] hover:bg-[#f8f9fa]"
        >
          Google
        </a>
        <a
          href={linkedinHref}
          className="inline-flex items-center justify-center rounded-lg bg-[#0A66C2] px-3 py-2 text-sm font-semibold text-white hover:bg-[#004182]"
        >
          LinkedIn
        </a>
      </div>
      <div className="flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-zinc-200" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">or</span>
        <span className="h-px flex-1 bg-zinc-200" />
      </div>
      <button
        type="button"
        onClick={onUseManual}
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
          manualActive
            ? "border-[#005EE0] bg-[#005EE0]/5 text-[#005EE0]"
            : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
        )}
      >
        Enter details manually
      </button>
    </div>
  );
}
