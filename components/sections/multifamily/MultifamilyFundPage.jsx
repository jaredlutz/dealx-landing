import Link from "next/link";
import { getContentBlocksForPage } from "@/lib/content";
import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const BENEFIT_ICONS = [
  "/migrated/content/multifamily_fund/img-1.png",
  "/migrated/content/multifamily_fund/img-2.png",
  "/migrated/content/multifamily_fund/img-3.png",
  "/migrated/content/multifamily_fund/img-4.png",
];
const LIFECYCLE_ICONS = [
  "/migrated/content/multifamily_fund/img-5.png",
  "/migrated/content/multifamily_fund/img-6.png",
  "/migrated/content/multifamily_fund/img-7.png",
  "/migrated/content/multifamily_fund/img-8.png",
  "/migrated/content/multifamily_fund/img-9.png",
  "/migrated/content/multifamily_fund/img-10.png",
];
const STAT_LABELS = ["Investors since inception.", "Multifamily Assets acquired and managed.", "Units in portfolio history.", "Community Members nationwide."];

export default async function MultifamilyFundPage() {
  const blocks = await getContentBlocksForPage("multifamily_fund");
  const c = (key, fallback) => blocks[key] ?? fallback;

  const benefits = [1, 2, 3, 4].map((i) => ({
    title: c(`benefit_${i}_title`, ""),
    body: c(`benefit_${i}_body`, ""),
    icon: BENEFIT_ICONS[i - 1],
  }));
  const lifecycle = [1, 2, 3, 4, 5, 6].map((i) => ({
    title: c(`lifecycle_${i}_title`, ""),
    body: c(`lifecycle_${i}_body`, ""),
    icon: LIFECYCLE_ICONS[i - 1],
  }));
  const thesis = [1, 2, 3, 4].map((i) => ({
    title: c(`thesis_${i}_title`, ""),
    body: c(`thesis_${i}_body`, ""),
  }));
  const stats = [
    c("stat_investors", "0+"),
    c("stat_assets", "0"),
    c("stat_units", "0"),
    c("stat_members", "0+"),
  ];
  const payments = [1, 2, 3].map((i) => ({
    title: c(`payments_${i}_title`, ""),
    body: c(`payments_${i}_body`, ""),
  }));
  const perks = [1, 2, 3, 4, 5].map((i) => ({
    title: c(`perk_${i}_title`, ""),
    body: c(`perk_${i}_body`, ""),
  }));

  return (
    <SiteLayout>
      <div className={cn("flex flex-col", brand.bg, brand.text)}>
        {/* Hero */}
        <section className="py-16 sm:py-20">
          <Container>
            <h1 className={cn("text-3xl font-bold sm:text-4xl md:text-5xl", brand.text)}>
              Multifamily Investment Fund
            </h1>
            <h2 className={cn("mt-6 text-xl font-semibold", brand.text)}>
              Key Benefits of Multifamily Investment Fund
            </h2>
            <p className={cn("mt-4 text-base leading-relaxed", brand.muted)}>
              {c("intro", "A multifamily investment fund is a professionally managed pool of capital dedicated to acquiring, improving, and managing apartment buildings. By investing in the fund, you gain exposure to a portfolio of multifamily properties—without the responsibility of direct ownership.")}
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <Card key={b.title}>
                  {b.icon && <img src={b.icon} alt="" className="h-12 w-12 object-contain" aria-hidden />}
                  <h3 className={cn("mt-4 text-lg font-semibold", brand.text)}>{b.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{b.body}</p>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button href={getSignUpUrl()}>Check Available Funds</Button>
            </div>
          </Container>
        </section>

        {/* Investment Strategy */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionTitle title="Investment Strategy" />
            <ul className={cn("mt-6 grid gap-4 sm:grid-cols-2", brand.muted)}>
              <li>Diversification across multiple properties in different markets to balance risk.</li>
              <li>Diversification away from the stock market, offering stability and inflation protection.</li>
              <li>Distressed acquisition opportunities, leveraging rare market conditions to buy undervalued assets.</li>
              <li>Value-add renovations to drive property appreciation over time.</li>
            </ul>
            <div className="mt-8">
              <Button href={getSignUpUrl()}>Check Available Funds</Button>
            </div>
          </Container>
        </section>

        {/* Fund Lifecycle */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionTitle eyebrow="HOW IT WORKS" title="Multifamily Investment Fund Lifecycle" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lifecycle.map((l, i) => (
                <Card key={l.title}>
                  {l.icon && <img src={l.icon} alt="" className="h-14 w-14 object-contain" aria-hidden />}
                  <div className={cn("mt-3 text-sm font-bold", brand.accent)}>0{i + 1}</div>
                  <h3 className={cn("mt-1 font-semibold", brand.text)}>{l.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{l.body}</p>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button href={getSignUpUrl()}>Check Available Funds</Button>
            </div>
          </Container>
        </section>

        {/* Investment Thesis */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionTitle title="Investment Thesis" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {thesis.map((t) => (
                <Card key={t.title}>
                  <h3 className={cn("font-semibold", brand.text)}>{t.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{t.body}</p>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button href={getSignUpUrl()}>Check Available Funds</Button>
            </div>
          </Container>
        </section>

        {/* Track Records */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionTitle title="Track Records" />
            <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-16">
              {stats.map((val, i) => (
                <div key={i} className="text-center">
                  <div className={cn("text-2xl font-bold sm:text-3xl", brand.text)}>{val}</div>
                  <div className={cn("mt-1 max-w-[140px] text-sm", brand.muted)}>{STAT_LABELS[i]}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Payments & Returns */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionTitle title="Payments & Returns" />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {payments.map((p) => (
                <Card key={p.title}>
                  <h3 className={cn("font-semibold", brand.text)}>{p.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{p.body}</p>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button href={getSignUpUrl()}>Check Available Funds</Button>
            </div>
          </Container>
        </section>

        {/* Available Funds */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionTitle title="Available Funds" />
            <Card className="mt-10">
              <h3 className={cn("text-xl font-semibold", brand.text)}>Fund V – Real Estate Accredited Investor Fund</h3>
              <ul className={cn("mt-4 space-y-2 text-sm", brand.muted)}>
                <li>Minimum: $100,000</li>
                <li>Accredited investors only, IRA Eligible</li>
                <li>Targets distressed & value-add multifamily properties across the U.S.</li>
                <li>Focused on long-term value creation and portfolio diversification.</li>
              </ul>
              <div className="mt-6">
                <Button href="/investment-opportunities/fund-v-accredited">Learn More</Button>
              </div>
            </Card>
          </Container>
        </section>

        {/* Community Perks */}
        <section className="py-16 sm:py-20">
          <Container>
            <h2 className={cn("text-2xl font-semibold", brand.text)}>Not sure which fund is right for you?</h2>
            <p className={cn("mt-3 text-base", brand.muted)}>
              Join our growing community of 28,000+ investors and discover how DiversyFund can help you diversify, grow, and protect your wealth.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map((p) => (
                <Card key={p.title}>
                  <h3 className={cn("font-semibold", brand.text)}>{p.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{p.body}</p>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button href={getSignUpUrl()}>Become a Member</Button>
            </div>
            <p className={cn("mt-4 text-sm", brand.subtle)}>Free to sign up. No commitments required.</p>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className={cn("rounded-2xl border bg-gradient-to-b from-diversy-primary/5 to-transparent p-10 text-center", brand.border)}>
              <h2 className={cn("text-2xl font-semibold", brand.text)}>Join 900,000+ Members and Stay Ahead of New Opportunities</h2>
              <p className={cn("mt-3 text-base", brand.muted)}>
                Get early access to new funds, updates on our platform, and insights from the DiversyFund team—no investment required.
              </p>
              <div className="mt-6">
                <Button href={getSignUpUrl()}>Get Started</Button>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </SiteLayout>
  );
}
