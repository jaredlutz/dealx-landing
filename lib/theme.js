/**
 * DiversyFund brand theme.
 * Semantic tokens (background, foreground, muted, card, border) come from globals.css + tailwind.config.
 */
export const brand = {
  primary: "#005EE0",
  primaryHover: "#0066F5",
  dark: "#0A0B0D",

  /** Page shell — use with layout wrappers */
  bg: "bg-background",
  text: "text-foreground",

  /** Legacy alias: elevated panels → card token */
  bgElevated: "bg-card text-card-foreground",
  panel: "bg-muted",
  panel2: "bg-muted/80",

  border: "border-border",
  borderPrimary: "border-diversy-primary/40",

  /** Section separation: border only; surface stays canvas (no light bands in dark) */
  sectionRule: "border-t border-border",
  sectionSurface: "bg-background",
  sectionFooter: "border-t border-border bg-muted",

  muted: "text-muted-foreground",
  subtle: "text-muted-foreground",

  accent: "text-diversy-primary",
  accentBg: "bg-diversy-primary",

  gold: "text-diversy-primary",
};

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
