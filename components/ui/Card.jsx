import { cn } from "@/lib/theme";

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm transition hover:border-diversy-primary/30 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)] dark:hover:border-diversy-primary/20 dark:hover:bg-white/[0.07]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
