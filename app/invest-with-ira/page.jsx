import { CheckCircle2 } from "lucide-react";
import { getContentBlocksForPage } from "@/lib/content";
import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";

const DEFAULT = {
  eyebrow: "Build Your Future With",
  title: "Invest in DiversyFund with your Self-Directed IRA",
  subtitle: "Simplify Your Retirement & Back It with Real Assets",
  bullets: "Benefit from Long-Term Asset Appreciation\nNo Need to Withdraw Funds from Your IRA\nInvestment Backed by Real Assets",
  body: "If you have an existing IRA, you may be eligible to self-direct all or part of it into DiversyFund's real estate investment opportunities. Check with your current IRA custodian to see if they allow self-directed investments. If they do, contact our Investor Relations Team and we'll connect you with one of our trusted custodians to help you start investing in real estate through your IRA.",
};

export default async function InvestWithIraPage() {
  const blocks = await getContentBlocksForPage("invest_with_ira");
  const c = (key) => blocks[key] ?? DEFAULT[key];
  const bullets = (c("bullets") || DEFAULT.bullets).split("\n").filter(Boolean);

  return (
    <SiteLayout>
      <div className={cn("py-16 sm:py-20", brand.bg, brand.text)}>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src="/migrated/home/home-1.jpg"
              alt=""
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white dark:from-diversy-dark/95 dark:via-diversy-dark/90 dark:to-diversy-dark" />
          </div>
          <Container className="pt-24 pb-16 sm:pt-32 sm:pb-20">
            <div className="max-w-3xl">
              <div className={cn("mb-3 text-xs tracking-[0.18em] uppercase", brand.accent)}>
                {c("eyebrow")}
              </div>
              <h1 className={cn("text-3xl font-bold sm:text-4xl md:text-5xl", brand.text)}>
                {c("title")}
              </h1>
              <p className={cn("mt-4 text-xl", brand.muted)}>
                {c("subtitle")}
              </p>
              <ul className="mt-8 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className={cn("mt-0.5 h-5 w-5 shrink-0", brand.accent)} />
                    <span className={cn("text-base", brand.text)}>{b}</span>
                  </li>
                ))}
              </ul>
              <p className={cn("mt-10 text-base leading-relaxed", brand.muted)}>
                {c("body")}
              </p>
              <div className="mt-10">
                <Button href={getSignUpUrl()}>Get Started</Button>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </SiteLayout>
  );
}
