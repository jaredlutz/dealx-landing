import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/theme";

export default function Button({ children, variant = "primary", href = "#", onClick, showArrow = true, type, ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 min-h-[44px] text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/50 focus-visible:ring-2 focus-visible:ring-diversy-primary/60";
  const styles =
    variant === "primary"
      ? "bg-diversy-primary text-white hover:bg-diversy-primary-hover"
      : variant === "secondary"
        ? "border-2 border-diversy-primary/40 bg-transparent text-diversy-primary hover:bg-diversy-primary/5 hover:border-diversy-primary/60 dark:border-diversy-primary/50 dark:text-diversy-primary dark:hover:bg-diversy-primary/10"
        : "border border-gray-200 bg-gray-100 text-gray-900 hover:bg-gray-200 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15";

  const className = cn(base, styles);
  if (type === "submit") {
    return (
      <button type="submit" onClick={onClick} className={className} {...props}>
        {children}
        {showArrow && <ArrowRight className="h-4 w-4" />}
      </button>
    );
  }
  return (
    <a href={href} onClick={onClick} className={className} {...props}>
      {children}
      {showArrow && <ArrowRight className="h-4 w-4" />}
    </a>
  );
}
