import { ArrowRight } from "lucide-react";
import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const opps = [
  {
    title: "Structured Income Opportunity",
    meta: ["Structure: Single-Asset Secured", "Cadence: Quarterly", "Term: Defined"],
    note: "Documentation available upon eligibility confirmation.",
  },
  {
    title: "Private Market Income Opportunity",
    meta: ["Structure: Instrument-Based Secured", "Cadence: Quarterly", "Term: Defined"],
    note: "Security and risk summary disclosed pre-subscription.",
  },
  {
    title: "Diversified Collateral Income Opportunity",
    meta: ["Structure: Multi-Asset Secured", "Cadence: Quarterly", "Term: Defined"],
    note: "Operational reporting rhythm provided quarterly.",
  },
];

export default function Opportunities() {
  return (
    <section id="opps" className="pt-24">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionTitle
            eyebrow="Opportunities"
            title="Current structured income opportunities"
            subtitle="Defined duration. Quarterly cadence. Documented structure."
            titleSize="large"
          />
          <Button href={getSignUpUrl()}>Access Documentation</Button>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {opps.map((o) => (
            <Card key={o.title}>
              <div className="text-white font-semibold">{o.title}</div>
              <div className={cn("mt-2 text-sm", brand.muted)}>
                {o.meta.map((m) => (
                  <div key={m} className="mt-1">• {m}</div>
                ))}
              </div>
              <div className={cn("mt-3 text-xs", brand.subtle)}>{o.note}</div>
              <div className="mt-5">
                <Button href={getSignUpUrl()} variant="secondary">
                  Review Documentation
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className={cn("mt-6 text-xs", brand.subtle)}>
          Offering availability and details may vary by eligibility and jurisdiction.
        </div>
      </Container>
    </section>
  );
}
