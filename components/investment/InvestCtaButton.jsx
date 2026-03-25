"use client";

import { ArrowRight } from "lucide-react";
import { useInvestmentInterest } from "@/contexts/investment-interest-context";
import { cn } from "@/lib/theme";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 min-h-[44px] text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/50 focus-visible:ring-2 focus-visible:ring-diversy-primary/60";

const variants = {
  primary:
    "bg-diversy-primary text-white hover:bg-diversy-primary-hover",
  secondary:
    "border-2 border-diversy-primary/40 bg-transparent text-diversy-primary hover:bg-diversy-primary/5 hover:border-diversy-primary/60 dark:border-diversy-primary/50 dark:text-diversy-primary dark:hover:bg-diversy-primary/10",
};

/**
 * Opens the investment-interest modal (same flow as portal campaign form, with contact fields on the marketing site).
 */
export default function InvestCtaButton({
  source,
  children,
  className,
  variant = "primary",
  showArrow = true,
  onBeforeOpen,
  type = "button",
  ...rest
}) {
  const { openModal } = useInvestmentInterest();

  return (
    <button
      type={type}
      className={cn(base, variants[variant] ?? variants.primary, className)}
      onClick={() => {
        onBeforeOpen?.();
        openModal(source);
      }}
      {...rest}
    >
      {children}
      {showArrow && <ArrowRight className="h-4 w-4" aria-hidden />}
    </button>
  );
}
