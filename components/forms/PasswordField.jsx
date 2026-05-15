"use client";

import { useId, useMemo, useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { evaluatePassword } from "@/lib/password-strength";
import { publicInputClass, publicLabelClass } from "@/lib/public-form-styles";
import { brand, cn } from "@/lib/theme";

const SEGMENT_COLORS = [
  "bg-border",
  "bg-red-500/70",
  "bg-amber-500/80",
  "bg-yellow-500/80",
  "bg-emerald-500/80",
];

const LABEL_COLORS = {
  "Too short": "text-muted-foreground",
  Weak: "text-red-600 dark:text-red-400",
  Fair: "text-amber-600 dark:text-amber-400",
  Good: "text-yellow-600 dark:text-yellow-500",
  Strong: "text-emerald-600 dark:text-emerald-400",
};

/**
 * Inline password input with a live strength meter and a checklist of the
 * actual rules WorkOS enforces server-side. The visitor learns the password is
 * weak the moment they type — not after they hit submit. Use the
 * `isPasswordStrong` helper from `lib/password-strength.js` to gate submission.
 *
 * @param {{
 *   id?: string,
 *   value: string,
 *   onChange: (value: string) => void,
 *   label?: string,
 *   required?: boolean,
 *   autoComplete?: string,
 *   describedById?: string,
 *   helperText?: string,
 *   className?: string,
 * }} props
 */
export default function PasswordField({
  id,
  value,
  onChange,
  label = "Password",
  required = true,
  autoComplete = "new-password",
  describedById,
  helperText = "We'll use this if you come back later.",
  className,
}) {
  const generatedId = useId();
  const inputId = id || `${generatedId}-pw`;
  const meterId = `${inputId}-strength`;
  const checklistId = `${inputId}-checklist`;
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState(false);

  const evaluation = useMemo(() => evaluatePassword(value), [value]);
  const meterFillCount = evaluation.score;
  const showFeedback = touched || value.length > 0;
  const ariaDescribedBy = [describedById, showFeedback ? meterId : null, showFeedback ? checklistId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label className={publicLabelClass} htmlFor={inputId}>
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={revealed ? "text" : "password"}
          className={cn(publicInputClass, "pr-11")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          autoComplete={autoComplete}
          minLength={8}
          required={required}
          aria-describedby={ariaDescribedBy}
          aria-invalid={showFeedback && !evaluation.strong ? "true" : undefined}
        />
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5",
            "text-muted-foreground hover:text-foreground",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
          )}
          aria-label={revealed ? "Hide password" : "Show password"}
        >
          {revealed ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
        </button>
      </div>

      {showFeedback ? (
        <>
          <div id={meterId} className="flex items-center gap-2" aria-live="polite">
            <div className="flex h-1.5 flex-1 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-full flex-1 rounded-full transition-colors",
                    i < meterFillCount ? SEGMENT_COLORS[meterFillCount] : "bg-border"
                  )}
                />
              ))}
            </div>
            <span
              className={cn(
                "min-w-[3.5rem] text-right text-[11px] font-semibold uppercase tracking-[0.12em]",
                LABEL_COLORS[evaluation.label] || "text-muted-foreground"
              )}
            >
              {evaluation.label}
            </span>
          </div>

          <ul id={checklistId} className="space-y-1 pt-1">
            {evaluation.requirements.map((req) => (
              <li
                key={req.id}
                className={cn(
                  "flex items-start gap-1.5 text-[11px] leading-relaxed",
                  req.met ? "text-emerald-700 dark:text-emerald-400" : brand.subtle
                )}
              >
                {req.met ? (
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                ) : (
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
                )}
                <span>{req.label}</span>
              </li>
            ))}
          </ul>
        </>
      ) : helperText ? (
        <p className={cn("text-[11px]", brand.subtle)}>{helperText}</p>
      ) : null}
    </div>
  );
}
