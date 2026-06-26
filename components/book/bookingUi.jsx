import { cn } from "@/lib/theme";
import { PUBLIC_BOOKING_CARD_CLASS } from "@/lib/book/publicBookingResourceLinks";

export function BookingCard({ className, id, children }) {
  return (
    <div id={id} className={cn(PUBLIC_BOOKING_CARD_CLASS, className)}>
      {children}
    </div>
  );
}

export function BookingCardHeader({ className, children }) {
  return (
    <div className={cn("space-y-1 border-b border-zinc-100 px-6 pb-6 pt-6", className)}>{children}</div>
  );
}

export function BookingCardTitle({ className, children }) {
  return <h2 className={cn("text-xl font-semibold text-[#111827] sm:text-2xl", className)}>{children}</h2>;
}

export function BookingCardDescription({ className, children }) {
  return <p className={cn("text-sm text-zinc-500", className)}>{children}</p>;
}

export function BookingCardContent({ className, children }) {
  return <div className={cn("space-y-6 px-6 pb-6 pt-6", className)}>{children}</div>;
}

export function BookingLabel({ htmlFor, className, children }) {
  return (
    <label htmlFor={htmlFor} className={cn("block text-sm font-medium text-[#111827]", className)}>
      {children}
    </label>
  );
}

export function BookingInput({ className, ...props }) {
  return (
    <input
      className={cn(
        "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-[#111827]",
        "placeholder:text-zinc-400 focus:border-[#005EE0] focus:outline-none focus:ring-2 focus:ring-[#005EE0]/30",
        className
      )}
      {...props}
    />
  );
}

export function BookingSelect({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-[#111827]",
        "focus:border-[#005EE0] focus:outline-none focus:ring-2 focus:ring-[#005EE0]/30",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function BookingButton({
  variant = "primary",
  size = "default",
  className,
  disabled,
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-[#005EE0]/40 disabled:pointer-events-none disabled:opacity-50";
  const sizes = {
    default: "px-4 py-2.5 text-sm",
    sm: "px-3 py-1.5 text-sm",
  };
  const variants = {
    primary: "bg-[#005EE0] text-white hover:bg-[#0066F5]",
    outline: "border border-zinc-200 bg-white text-[#111827] hover:bg-zinc-50",
    ghost: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
  };
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(base, sizes[size] ?? sizes.default, variants[variant] ?? variants.primary, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function BookingSkeleton({ className }) {
  return <div className={cn("animate-pulse rounded-md bg-zinc-200/80", className)} aria-hidden />;
}

export const SCHEDULER_BTN_CLASS =
  "w-full bg-[#005EE0] text-white hover:bg-[#0066F5] disabled:opacity-50";
