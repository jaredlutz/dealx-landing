"use client";

import { ArrowRight } from "lucide-react";
import { useInvestmentInterest } from "@/contexts/investment-interest-context";
import { cn } from "@/lib/theme";

export default function InvestStickyCta({ source, children, className }) {
  const { openModal } = useInvestmentInterest();

  return (
    <button
      type="button"
      onClick={() => openModal(source)}
      className={cn(
        "flex w-full items-center justify-center gap-2 bg-diversy-primary px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-diversy-primary-hover",
        "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-diversy-primary",
        "pb-[max(1rem,env(safe-area-inset-bottom))]",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </button>
  );
}
