import { cn } from "@/lib/theme";

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition hover:border-diversy-primary/30 dark:hover:border-white/[0.14]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
