import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  Compass,
  Layers,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import GatedSection from "@/components/blog/GatedSection";
import EducationalPageToc from "@/components/strategies/EducationalPageToc";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

const PATH = "/insights-education/ira";
const DESCRIPTION =
  "Understanding real estate investments inside a self-directed IRA: structure, process, benefits, risks, and the considerations that matter before allocating.";

export const metadata = publicPageMetadata({
  title: "Invest with an IRA",
  description: DESCRIPTION,
  path: PATH,
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

const TOC_SECTIONS = [
  { id: "structure", num: "01", label: "The structure" },
  { id: "rationale", num: "02", label: "The rationale" },
  { id: "process", num: "03", label: "The process" },
  { id: "considerations", num: "04", label: "Considerations" },
  { id: "benefits-risks", num: "05", label: "Benefits & risks" },
  { id: "faq", num: "06", label: "Frequently asked" },
];

const SDIRA_FEATURES = [
  {
    icon: Compass,
    title: "Flexibility",
    body:
      "Hold assets that align with the investor's expertise or market view — including real estate, private equity, and other alternatives beyond publicly traded securities.",
  },
  {
    icon: Banknote,
    title: "Tax-deferred growth",
    body:
      "Gains inside the IRA grow tax-deferred. Taxes are owed on withdrawal, typically in retirement, rather than as gains are realized.",
  },
  {
    icon: ShieldCheck,
    title: "Custodial oversight",
    body:
      "A specialized custodian holds and administers the assets, ensuring compliance with IRS regulations governing alternative investments.",
  },
];

const ACCREDITED_DEFINITION = [
  "Annual income above $200,000 (individual) or $300,000 (joint) for the last two years, with the same expected this year, or",
  "Net worth above $1,000,000, excluding the value of a primary residence, or",
  "Other categories as defined by SEC Regulation D.",
];

const WHY_REAL_ESTATE = [
  {
    icon: Layers,
    title: "Diversification",
    body:
      "Real estate often moves independently of stock and bond markets, reducing concentration in a single asset class.",
  },
  {
    icon: TrendingUp,
    title: "Inflation hedge",
    body:
      "Property values and rental income have historically risen with inflation, helping preserve purchasing power over multi-year holds.",
  },
  {
    icon: Building2,
    title: "Tangible asset",
    body:
      "Physical properties offer intrinsic value backed by an identifiable asset, not only an entry in a securities ledger.",
  },
  {
    icon: ArrowRight,
    title: "Growth potential",
    body:
      "Strategic improvements, market dynamics, or operator execution can drive appreciation over the holding period.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Choose a custodian",
    body:
      "Select a custodian that permits alternative-asset investments. Not every IRA provider holds real estate or private placements; confirm support before transferring funds.",
  },
  {
    title: "Fund the IRA",
    body:
      "Ensure sufficient funds are available — through transfer from an existing IRA, rollover from a 401(k), or contribution within annual limits — to meet the offering's minimum.",
  },
  {
    title: "Research opportunities",
    body:
      "Identify investments that align with the investor's goals and time horizon, whether direct property purchases or private real estate offerings.",
  },
  {
    title: "Direct the investment",
    body:
      "Instruct the custodian to allocate IRA funds to the chosen asset. Subscription documents and the wire originate from the custodian on behalf of the IRA.",
  },
  {
    title: "Maintain compliance",
    body:
      "Avoid personal use of property held by the IRA and transactions with disqualified persons (family members, certain entities). Income — rent, interest, sale proceeds — flows back into the IRA, preserving tax-deferred status.",
  },
];

const CONSIDERATIONS = [
  {
    title: "Custodian fees",
    body:
      "Custodians typically charge setup fees, transaction fees, and annual fees based on asset value or account complexity. Review the fee schedule against the expected hold.",
  },
  {
    title: "Liquidity constraints",
    body:
      "Real estate is illiquid. Allocations are commonly multi-year commitments; capital cannot be redeemed on demand and access to funds may be restricted until the offering's defined events.",
  },
  {
    title: "Due diligence",
    body:
      "Evaluate property quality, market conditions, sponsor track record, and the operator's management expertise. Documentation is where the work happens.",
  },
  {
    title: "IRS regulations",
    body:
      "Prohibited transactions — personal use of the property, dealings with disqualified persons — can lead to penalties or disqualification of the IRA. The custodian helps administer, but compliance is the IRA owner's responsibility.",
  },
];

const BENEFITS = [
  "Diversification away from public-market volatility.",
  "Tax-deferred growth on income and gains until withdrawal.",
  "Control to leverage the investor's own real-estate knowledge.",
  "Stability of a physical asset alongside paper investments.",
];

const RISKS = [
  "Market risk: property values and rental income fluctuate with economic and local conditions.",
  "Illiquidity: capital is typically tied up for multiple years; flexibility is limited.",
  "Management oversight: even with third-party operators, performance must be monitored.",
  "No guaranteed returns: returns depend on market and execution; losses are possible.",
];

const FAQ = [
  {
    q: "What is a self-directed IRA?",
    a: "A retirement account that allows investments in alternative assets — including real estate, private equity, and commodities — administered by a custodian that supports those asset types.",
  },
  {
    q: "Who can use a self-directed IRA?",
    a: "Most investors with an existing IRA can move to a self-directed structure, subject to custodian acceptance. Private real-estate offerings often require accredited investor status under SEC rules.",
  },
  {
    q: "Can I use my existing IRA?",
    a: "Yes, if the existing custodian permits self-directed investments. Otherwise, a transfer to a custodian that supports alternatives is required before allocating.",
  },
  {
    q: "What are the tax benefits?",
    a: "Gains inside the IRA grow tax-deferred. Income tax is owed only upon withdrawal, typically in retirement and at the rate applicable at that time.",
  },
  {
    q: "What are the main risks?",
    a: "Illiquidity, market fluctuations, and compliance obligations. Returns are not guaranteed, and prohibited transactions can disqualify the IRA.",
  },
  {
    q: "What is the typical investment period?",
    a: "Real-estate allocations are commonly held for multiple years. Specific offerings define their own duration; review the operative documents for the holding period that applies.",
  },
];

const sectionSpacing = "scroll-mt-24";
const sectionDivider = "border-t border-border/60 pt-12 mt-14";

export default function InvestWithIraPage() {
  return (
    <MarketingShell>
      <Container className="py-12 sm:py-16 lg:py-20">
        {/* Hero — centered, narrow */}
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Insights & Education</p>
          <h1
            className={cn(
              "mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem]",
              brand.text
            )}
          >
            Real estate investments inside a self-directed IRA.
          </h1>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", brand.muted)}>
            A self-directed Individual Retirement Account (SDIRA) can hold real estate alongside the more familiar
            stocks and bonds. This page covers what an SDIRA is, why investors consider real estate inside one, the
            process for allocating, and the considerations that decide whether the structure fits the capital.
          </p>
        </div>

        {/* Two-column editorial body */}
        <div className="mx-auto mt-14 max-w-6xl lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          {/* Sticky left rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <EducationalPageToc sections={TOC_SECTIONS} />

              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <p className={cn(eyebrow, "text-[10px]")}>Take action</p>
                <p className={cn("mt-2 text-xs leading-relaxed", brand.muted)}>
                  Eligibility review confirms whether the SDIRA structure fits the allocation.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <InvestCtaButton
                    source="insights-ira-sidebar"
                    className="w-full px-3 py-2.5 text-xs"
                    showArrow={false}
                  >
                    Book appointment
                  </InvestCtaButton>
                  <Link
                    href="/insights-education"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-diversy-primary underline-offset-4 hover:underline"
                  >
                    Browse all insights
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Content column */}
          <div className="min-w-0">
            {/* 01 · The structure */}
            <section id="structure" className={sectionSpacing}>
              <p className={eyebrow}>01 · The structure</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                What a self-directed IRA actually is.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                A self-directed IRA is a retirement account that permits investments in a wider range of assets than a
                conventional IRA — including real estate, private equity, and commodities. The investor directs the
                allocation; a qualified custodian holds and administers the assets on the IRA's behalf.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {SDIRA_FEATURES.map((f) => (
                  <Card key={f.title} className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-start gap-3">
                      <f.icon className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                      <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{f.title}</h3>
                    </div>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{f.body}</p>
                  </Card>
                ))}
              </div>

              {/* Accredited callout — sits inside Section 01 */}
              <div className="mt-10 rounded-2xl border border-diversy-primary/20 bg-diversy-primary/[0.04] p-6 sm:p-7 dark:bg-diversy-primary/[0.08]">
                <div className="flex items-start gap-3">
                  <Scale className={cn("mt-0.5 h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                  <div>
                    <p className={eyebrow}>Eligibility</p>
                    <h3 className={cn("mt-2 text-base font-semibold", brand.text)}>
                      Most private real-estate offerings require accredited investor status.
                    </h3>
                    <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                      Under SEC rules, an accredited investor is generally defined as having:
                    </p>
                    <ul className="mt-3 space-y-2">
                      {ACCREDITED_DEFINITION.map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", brand.gold)} aria-hidden />
                          <span className={cn("text-sm leading-relaxed", brand.muted)}>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <GatedSection slug="ira">
            {/* 02 · The rationale */}
            <section id="rationale" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>02 · The rationale</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Why investors consider real estate inside an SDIRA.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Real estate behaves differently from publicly traded securities. Held inside an IRA, the rationale is
                the same as outside one — with the tax-deferral wrapper added to the picture.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                {WHY_REAL_ESTATE.map((w) => (
                  <Card key={w.title} className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-start gap-3">
                      <w.icon className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                      <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{w.title}</h3>
                    </div>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{w.body}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* 03 · The process */}
            <section id="process" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>03 · The process</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                How an SDIRA real-estate allocation comes together.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Five steps, in order. The eligibility review confirms the specifics for any given offering.
              </p>

              <ol className="mt-8 space-y-5">
                {PROCESS_STEPS.map((step, i) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-diversy-primary/30 bg-diversy-primary/10 text-sm font-semibold text-diversy-primary"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className={cn("text-base font-semibold tracking-tight", brand.text)}>{step.title}</h3>
                      <p className={cn("mt-1.5 text-sm leading-relaxed", brand.muted)}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className={cn("mt-6 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-relaxed", brand.muted)}>
                <span className={cn("font-semibold", brand.text)}>Important.</span> Income from the investment — rent,
                interest, sale proceeds — flows back into the IRA. Personal receipt of those funds would compromise the
                account's tax-deferred status.
              </p>
            </section>

            {/* 04 · Considerations */}
            <section id="considerations" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>04 · Considerations</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                What to weigh before allocating.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                These are not reasons not to allocate. They are the parameters that frame the conversation with a
                qualified advisor and the custodian.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                {CONSIDERATIONS.map((c) => (
                  <Card key={c.title} className="flex h-full flex-col gap-3 p-5">
                    <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{c.title}</h3>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{c.body}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* 05 · Benefits & risks */}
            <section id="benefits-risks" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>05 · Benefits &amp; risks</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Two sides of the same allocation.
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                <Card className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                    <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>Benefits</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {BENEFITS.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-diversy-primary/70" aria-hidden />
                        <span className={cn("text-sm leading-relaxed", brand.muted)}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 dark:text-amber-400" aria-hidden />
                    <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>Risks</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {RISKS.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/70" aria-hidden />
                        <span className={cn("text-sm leading-relaxed", brand.muted)}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

            {/* 06 · FAQ */}
            <section id="faq" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>06 · Frequently asked</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Questions investors typically ask first.
              </h2>

              <div className="mt-8 divide-y divide-border/60 border-y border-border/60">
                {FAQ.map((item) => (
                  <details key={item.q} className="group py-4">
                    <summary
                      className={cn(
                        "flex cursor-pointer items-start justify-between gap-4 text-left text-sm font-semibold outline-none",
                        "marker:hidden [&::-webkit-details-marker]:hidden",
                        brand.text
                      )}
                    >
                      <span className="leading-snug">{item.q}</span>
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-base leading-none transition group-open:rotate-45",
                          brand.subtle
                        )}
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <p className={cn("mt-3 pr-9 text-sm leading-relaxed", brand.muted)}>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Closing block — serves mobile users who never see the sidebar */}
            <div className={cn("mt-14 rounded-3xl border border-border bg-card p-6 sm:p-8")}>
              <p className={eyebrow}>Next step</p>
              <h2 className={cn("mt-2 text-lg font-semibold", brand.text)}>
                Bring the structure to the eligibility conversation.
              </h2>
              <p className={cn("mt-3 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Strategy frames the question; eligibility review confirms the fit. Bring the SDIRA custodian name (or
                the gap if there isn't one yet), the funding path, and the allocation in mind.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <InvestCtaButton source="insights-ira-closing">
                  Book appointment
                </InvestCtaButton>
                <Link
                  href="/insights-education/retirement-accounts"
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition",
                    "hover:border-diversy-primary/35 hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                  )}
                >
                  Other retirement accounts
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Disclosure */}
            <p className={cn("mt-10 text-xs leading-relaxed", brand.subtle)}>
              This page is for educational purposes and does not constitute investment, tax, or legal advice. Investors
              should consult qualified financial and tax professionals before making investment decisions. Offerings are
              described in their official offering documents and are available only where lawfully offered.
            </p>
            </GatedSection>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
