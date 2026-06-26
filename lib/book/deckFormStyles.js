import { cn } from "@/lib/theme";

/** Light-surface inputs for /book/* LPs (avoid dark theme `bg-background` on institutional pages). */
export const deckFormInputClass = cn(
  "mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827]",
  "placeholder:text-[#9ca3af] focus:border-[#005EE0] focus:outline-none focus:ring-2 focus:ring-[#005EE0]/30"
);

export const deckFormLabelClass = "block text-sm font-medium text-[#111827]";
