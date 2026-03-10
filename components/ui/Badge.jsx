import { cn } from "@/lib/theme";
import { brand } from "@/lib/theme";

export default function Badge({ children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs",
        brand.muted
      )}
    >
      {children}
    </span>
  );
}
