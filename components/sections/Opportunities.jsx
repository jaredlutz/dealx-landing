import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const opps = [
  {
    title: "Structured Income Opportunity",
    structure: "Single-Asset Secured",
    exampleAsset: "Class B multifamily – Phoenix, AZ",
    metrics: { yield: "7–10%", duration: "3–5 years", asset: "Multifamily", min: "$100K" },
    note: "Full documentation available after eligibility confirmation.",
  },
  {
    title: "Private Market Income Opportunity",
    structure: "Instrument-Based Secured",
    exampleAsset: "250-unit apartment community",
    metrics: { yield: "7–10%", duration: "3–5 years", asset: "Multifamily", min: "$100K" },
    note: "Security and risk summary disclosed pre-subscription.",
  },
  {
    title: "Diversified Collateral Opportunity",
    structure: "Multi-Asset Secured",
    exampleAsset: "Portfolio across multiple markets",
    metrics: { yield: "7–10%", duration: "3–5 years", asset: "Multifamily", min: "$100K" },
    note: "Operational reporting provided quarterly.",
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
            subtitle="Backed by multifamily real estate. Terms and ranges disclosed per offering."
            titleSize="large"
          />
          <Button href={getSignUpUrl()}>Review Current Opportunities</Button>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {opps.map((o) => (
            <Card key={o.title}>
              <div className={cn("font-semibold", brand.text)}>{o.title}</div>
              <div className={cn("mt-2 text-xs", brand.subtle)}>{o.structure}</div>
              <div className={cn("mt-3 text-xs", brand.muted)}>
                Example: {o.exampleAsset}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <span className={cn("shrink-0", brand.muted)}>Target yield</span>
                  <span className={cn("font-medium", brand.text)}>{o.metrics.yield}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className={cn("shrink-0", brand.muted)}>Duration</span>
                  <span className={cn("font-medium", brand.text)}>{o.metrics.duration}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className={cn("shrink-0", brand.muted)}>Asset type</span>
                  <span className={cn("font-medium", brand.text)}>{o.metrics.asset}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className={cn("shrink-0", brand.muted)}>Minimum</span>
                  <span className={cn("font-medium", brand.text)}>{o.metrics.min}</span>
                </div>
              </div>
              <div className={cn("mt-4 text-xs", brand.subtle)}>{o.note}</div>
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
