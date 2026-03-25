import { cn } from "@/lib/theme";
import { brand } from "@/lib/theme";

export default function Badge({ children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs",
        brand.muted
      )}
    >
      {children}
    </span>
  );
}
