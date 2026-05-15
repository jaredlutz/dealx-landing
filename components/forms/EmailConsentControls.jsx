"use client";

import Link from "next/link";
import { useId } from "react";
import {
  EMAIL_CONSENT_MARKETING_OPTIONAL,
  EMAIL_CONSENT_PRIVACY_PREFIX,
  EMAIL_CONSENT_PRIVACY_SUFFIX,
} from "@/lib/email-consent";
import { brand, cn } from "@/lib/theme";

export default function EmailConsentControls({
  privacyChecked,
  onPrivacyChange,
  marketingChecked,
  onMarketingChange,
  showMarketing = true,
  showHeading = true,
  className,
  labelClassName,
}) {
  const uid = useId();
  const labelCls = labelClassName ?? cn("text-xs leading-snug", brand.muted);

  return (
    <div className={cn("space-y-3 rounded-lg border border-border bg-muted/40 p-4", className)}>
      {showHeading ? (
        <p className={cn("text-xs font-medium", brand.text)}>Email & privacy</p>
      ) : null}
      <label className="flex cursor-pointer gap-2.5">
        <input
          id={`${uid}-email-privacy`}
          type="checkbox"
          checked={privacyChecked}
          onChange={(e) => onPrivacyChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/40"
          required
        />
        <span className={labelCls}>
          {EMAIL_CONSENT_PRIVACY_PREFIX}
          <Link href="/privacy-policy" className="font-medium text-diversy-primary underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          {EMAIL_CONSENT_PRIVACY_SUFFIX}
        </span>
      </label>
      {showMarketing ? (
        <label className="flex cursor-pointer gap-2.5">
          <input
            id={`${uid}-email-marketing`}
            type="checkbox"
            checked={marketingChecked}
            onChange={(e) => onMarketingChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/40"
          />
          <span className={labelCls}>{EMAIL_CONSENT_MARKETING_OPTIONAL}</span>
        </label>
      ) : null}
    </div>
  );
}
