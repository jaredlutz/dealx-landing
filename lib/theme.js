/**
 * DiversyFund brand theme.
 * Colors from diversyfund-logo.svg: primary #005EE0, dark #0A0B0D
 * Theme-aware: light mode base, dark: for dark mode
 */
export const brand = {
  // Core palette
  primary: "#005EE0",
  primaryHover: "#0066F5",
  dark: "#0A0B0D",

  // Backgrounds
  bg: "bg-gray-50 dark:bg-[#0A0B0D]",
  bgElevated: "bg-white dark:bg-[#0F1114]",
  panel: "bg-gray-100/80 dark:bg-white/5",
  panel2: "bg-gray-200/50 dark:bg-white/3",

  // Borders
  border: "border-gray-200 dark:border-white/10",
  borderPrimary: "border-diversy-primary/40",

  // Text
  text: "text-gray-900 dark:text-white",
  muted: "text-gray-600 dark:text-white/85",
  subtle: "text-gray-500 dark:text-white/70",

  // Accents
  accent: "text-diversy-primary",
  accentBg: "bg-diversy-primary",

  gold: "text-diversy-primary",
};

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
