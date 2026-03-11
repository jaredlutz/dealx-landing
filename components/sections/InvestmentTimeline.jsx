import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const STEPS = [
  "Investment opens",
  "Capital deployed into asset",
  "Quarterly income distributions",
  "Property exit or refinance",
  "Capital returned",
];

export default function InvestmentTimeline() {
  return (
    <section className="pt-20">
      <Container>
        <SectionTitle
          eyebrow="Lifecycle"
          title="Investment timeline"
          subtitle="Typical timeline: 3–5 years depending on the offering. Clear sequence from commitment to return."
          titleSize="large"
        />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 overflow-x-auto pb-2">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl border px-4 py-2.5",
                brand.border,
                "bg-gray-50 dark:bg-white/5"
              )}
            >
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold", brand.accentBg, "text-white")}>
                {i + 1}
              </span>
              <span className={cn("text-sm font-medium", brand.text)}>{step}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
