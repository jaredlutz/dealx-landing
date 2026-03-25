import { brand, cn } from "@/lib/theme";

export const publicInputClass = cn(
  "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground",
  "placeholder:text-muted-foreground/70 focus:border-diversy-primary focus:outline-none focus:ring-2 focus:ring-diversy-primary/30"
);

export const publicLabelClass = cn("block text-sm font-medium", brand.text);
