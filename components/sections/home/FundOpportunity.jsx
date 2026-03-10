import { CheckCircle2 } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const DEFAULT_BULLETS = [
  "Focused on long-term value creation and portfolio diversification.",
  "Targets distressed & value-add multifamily properties across the U.S.",
  "Accredited investors only, IRA Eligible",
  "Minimum: $100,000",
];

export default function FundOpportunity({ content = {} }) {
  const title = content.fund_title ?? "Fund V – Real Estate Accredited Investor Fund";
  const bulletsText = content.fund_bullets;
  const bullets = bulletsText
    ? bulletsText.split("\n").filter(Boolean)
    : DEFAULT_BULLETS;
  const ctaLabel = content.fund_cta_label ?? "Learn More";
  const ctaUrl = content.fund_cta_url ?? "/investment-opportunities/fund-v-accredited";
  const fundImage = content.fund_image_url || "/migrated/home/home-14.jpeg";

  return (
    <section id="opps" className="py-16 sm:py-20">
      <Container>
        <SectionTitle
          title="Investment Opportunities"
          subtitle=""
        />

        <div className={cn("mt-10 overflow-hidden rounded-2xl border transition", brand.border, brand.panel, "hover:border-diversy-primary/20")}>
          {fundImage && (
            <div className="aspect-video w-full">
              <img
                src={fundImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="p-6 sm:p-8">
          <h3 className={cn("text-xl font-semibold sm:text-2xl", brand.text)}>
            {title}
          </h3>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className={cn("mt-0.5 h-5 w-5 shrink-0", brand.accent)} />
                <span className={cn("text-sm leading-relaxed", brand.text)}>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={ctaUrl}>
              {ctaLabel}
            </Button>
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
