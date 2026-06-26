"use client";

import { VOICE_AI_CALL_CONSENT } from "@/lib/investment-interest-consent";
import { cn } from "@/lib/theme";

/**
 * Optional TCPA PEWC for AI voice — show when the form collects a dialable phone.
 */
export default function VoiceAiCallConsentControl({ checked, onChange, className }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer gap-3 text-sm leading-snug text-muted-foreground",
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/30"
      />
      <span>{VOICE_AI_CALL_CONSENT}</span>
    </label>
  );
}
