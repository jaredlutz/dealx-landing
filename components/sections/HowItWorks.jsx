import { CheckCircle2, Lock, FileText, CalendarClock, LineChart, Shield } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const steps = [
  { icon: CheckCircle2, title: "1) Eligibility review", desc: "Confirm investor profile and access requirements." },
  { icon: Lock, title: "2) Verification & compliance", desc: "KYC/AML verification and platform onboarding." },
  { icon: FileText, title: "3) Documentation access", desc: "Review defined terms, cadence, and risk disclosures." },
  { icon: CalendarClock, title: "4) Subscription execution", desc: "Structured subscription flow with defined mechanics." },
  { icon: LineChart, title: "5) Quarterly cycle", desc: "Reporting cadence aligned with distributions and transparency." },
  { icon: Shield, title: "6) Defined maturity event", desc: "Term completion mechanics disclosed up front." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="pt-16">
      <Container>
        <SectionTitle
          eyebrow="Process"
          title="A defined capital process"
          subtitle="No ambiguity. No moving goalposts. Private markets require clarity—and a professional operational rhythm."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.title}>
              <div className="flex items-start gap-3">
                <s.icon className={cn("h-5 w-5", brand.gold)} />
                <div>
                  <div className="text-white font-semibold">{s.title}</div>
                  <p className={cn("mt-2 text-sm", brand.muted)}>{s.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
