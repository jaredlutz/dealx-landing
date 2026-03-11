import { Shield, FileText, CalendarClock } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const blocks = [
  {
    icon: Shield,
    title: "Underwriting discipline",
    points: [
      "Asset fundamentals review",
      "Duration alignment and maturity design",
      "Downside considerations and structural protections",
    ],
  },
  {
    icon: FileText,
    title: "Documentation standards",
    points: [
      "Offering documents and subscription agreements",
      "Defined payment schedules and maturity mechanics",
      "Risk disclosures and investor communications",
    ],
  },
  {
    icon: CalendarClock,
    title: "Reporting cadence",
    points: [
      "Quarterly reporting rhythm",
      "Distribution tracking and platform access",
      "Structured updates designed to reduce ambiguity",
    ],
  },
];

export default function Governance() {
  return (
    <section id="gov" className="pt-16">
      <Container>
        <SectionTitle
          eyebrow="Security & Governance"
          title="Governance. Structure. Discipline."
          subtitle="Serious capital expects disclosed terms, defined mechanics, and consistent reporting."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {blocks.map((b) => (
            <Card key={b.title}>
              <div className="flex items-start gap-3">
                <b.icon className={cn("h-5 w-5", brand.gold)} />
                <div>
                  <div className={cn("font-semibold", brand.text)}>{b.title}</div>
                  <div className={cn("mt-3 text-sm", brand.muted)}>
                    {b.points.map((p) => (
                      <div key={p} className="mt-1">• {p}</div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={cn("mt-8 rounded-2xl border p-6 max-w-4xl", brand.border, brand.panel)}>
          <div className={cn("font-semibold", brand.text)}>Risk statement</div>
          <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
            Investing involves risk, including loss of principal. Private-market investments may be illiquid. Terms and maturity are defined by each offering&apos;s documentation.
          </p>
        </div>
      </Container>
    </section>
  );
}
