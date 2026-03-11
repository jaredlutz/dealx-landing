import { AlertTriangle, Check } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const PROBLEMS = [
  "Unclear terms",
  "Inconsistent reporting",
  "Optimistic marketing",
  "Undefined liquidity",
];

const SOLUTIONS = [
  "Defined investment durations",
  "Structured income cadence",
  "Standardized reporting",
  "Documentation-first offerings",
];

export default function WhyDiversyFund() {
  return (
    <section className="pt-20">
      <Container>
        <SectionTitle
          eyebrow="Origin"
          title="Why DiversyFund was built"
          subtitle="Private real estate investing has traditionally suffered from structural problems. DiversyFund was designed to solve them."
          titleSize="large"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <div className="flex items-start gap-3">
              <AlertTriangle className={cn("h-5 w-5 shrink-0", brand.subtle)} />
              <div>
                <div className={cn("font-semibold", brand.text)}>Common problems</div>
                <ul className={cn("mt-3 text-sm", brand.muted)}>
                  {PROBLEMS.map((p) => (
                    <li key={p} className="mt-1">• {p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-3">
              <Check className={cn("h-5 w-5 shrink-0", brand.gold)} />
              <div>
                <div className={cn("font-semibold", brand.text)}>Our approach</div>
                <ul className={cn("mt-3 text-sm", brand.muted)}>
                  {SOLUTIONS.map((s) => (
                    <li key={s} className="mt-1">• {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
