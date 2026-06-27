import { cn } from "@/lib/theme";

const STEPS = [
  { id: 1, label: "Pick a time" },
  { id: 2, label: "Your details" },
  { id: 3, label: "Confirmed" },
];

/** Lightweight booking progress — step 3 only shown after confirm elsewhere. */
export default function BookingStepIndicator({ currentStep = 1, className }) {
  return (
    <ol
      className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-xs", className)}
      aria-label="Booking progress"
    >
      {STEPS.filter((s) => s.id <= 2 || currentStep >= 3).map((step, index, arr) => (
        <li key={step.id} className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
              currentStep === step.id
                ? "bg-[#005EE0] text-white"
                : currentStep > step.id
                  ? "bg-[#005EE0]/15 text-[#005EE0]"
                  : "bg-zinc-100 text-zinc-500"
            )}
            aria-current={currentStep === step.id ? "step" : undefined}
          >
            {step.id}
          </span>
          <span
            className={cn(
              "font-medium",
              currentStep === step.id ? "text-zinc-900" : "text-zinc-500"
            )}
          >
            {step.label}
          </span>
          {index < arr.length - 1 ? (
            <span className="hidden text-zinc-300 sm:inline" aria-hidden>
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
