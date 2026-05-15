import Link from "next/link";
import { ArrowRight, Banknote, BookOpen, Building2, Compass, PiggyBank, Scale } from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import Container from "@/components/ui/Container";
import EducationalPageToc from "@/components/strategies/EducationalPageToc";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

const PATH = "/strategies";
const DESCRIPTION =
  "The Premier Product investment thesis: acquiring multifamily real estate at discounts to fair market value and below replacement cost, through relationship-driven access while the current dislocation persists.";

export const metadata = publicPageMetadata({
  title: "Investment Thesis",
  description: DESCRIPTION,
  path: PATH,
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

const TOC_SECTIONS = [
  { id: "premise", num: "01", label: "The premise" },
  { id: "acquire", num: "02", label: "What we acquire" },
  { id: "window", num: "03", label: "Why this window" },
  { id: "signal", num: "04", label: "Market signal" },
  { id: "disclosures", num: "05", label: "Disclosures" },
];

const MARKET_SIGNAL_QUOTES = [
  {
    quote:
      "The distress in commercial real estate is real, it is ongoing, and it is creating opportunities that experienced operators have not seen since 2010.",
    attribution: "Morgan Stanley Real Estate Research",
    date: "October 2024",
  },
  {
    quote:
      "Regional banks, the traditional backbone of multifamily lending, have significantly tightened underwriting standards and we do not anticipate a return to prior lending levels before 2027.",
    attribution: "Federal Reserve Financial Stability Report",
    date: "November 2024",
  },
  {
    quote:
      "Distressed and troubled commercial real estate loans reached $94 billion in 2024, with multifamily representing the fastest-growing segment.",
    attribution: "Mortgage Bankers Association",
    date: "Annual Report 2024",
  },
];

const CONTINUE_LINKS = [
  {
    href: "/insights-education/income-vs-growth",
    icon: Scale,
    title: "Income vs growth",
    description: "The framing question — what the choice actually changes in documentation, duration, and reporting.",
  },
  {
    href: "/insights-education/ira",
    icon: PiggyBank,
    title: "Investing with an IRA",
    description: "Real-estate allocations inside a self-directed IRA — structure, process, and considerations.",
  },
  {
    href: "/insights-education/retirement-accounts",
    icon: BookOpen,
    title: "Retirement accounts",
    description: "Solo 401(k), SEP IRA, SIMPLE IRA, and the custodial framework around private-market allocations.",
  },
];

const sectionSpacing = "scroll-mt-24";
const sectionDivider = "border-t border-border/60 pt-12 mt-14";

export default function StrategiesPage() {
  return (
    <MarketingShell>
      <Container className="py-12 sm:py-16 lg:py-20">
        {/* Hero — centered, narrow */}
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Investment Thesis · Premier Product</p>
          <h1
            className={cn(
              "mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem]",
              brand.text
            )}
          >
            Multifamily real estate, acquired below market — while the window is open.
          </h1>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", brand.muted)}>
            The Premier Product is built around the acquisition of apartment communities at discounts to fair market
            value and below replacement cost. We are acquiring assets now, in the current market, through relationships
            the founding team has spent decades building.
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
                  Eligibility review confirms whether the Premier Product structure fits the allocation.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <InvestCtaButton
                    source="strategies-hub-sidebar"
                    className="w-full px-3 py-2.5 text-xs"
                    showArrow={false}
                  >
                    Book appointment
                  </InvestCtaButton>
                  <Link
                    href="/opportunities/df-income"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-diversy-primary underline-offset-4 hover:underline"
                  >
                    View current offering
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Content column */}
          <div className="min-w-0">
            {/* 01 · The premise */}
            <section id="premise" className={sectionSpacing}>
              <p className={eyebrow}>01 · The premise</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Our edge is access, not algorithm.
              </h2>
              <p className={cn("mt-5 max-w-prose text-[1.02rem] leading-[1.75]", brand.muted)}>
                This distinction matters. Our edge is not a fund structure or a proprietary algorithm. It is access —
                relationships with distressed owners, overleveraged operators, and motivated sellers who call our
                founders directly because of decades of trust. These acquisitions do not reach brokers or the open
                market.
              </p>
              <p className={cn("mt-4 max-w-prose text-[1.02rem] leading-[1.75]", brand.muted)}>
                The conditions that make this possible are specific to this moment. The Premier Product is designed to
                move through that window now, while it remains open.
              </p>
            </section>

            {/* 02 · What we acquire */}
            <section id="acquire" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>02 · What we acquire — and why now</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Apartment communities in markets we know, at prices motivated sellers cannot refuse.
              </h2>
              <p className={cn("mt-5 max-w-prose text-[1.02rem] leading-[1.75]", brand.muted)}>
                Multifamily real estate — apartment communities across the US in ten markets we have bought, operated,
                or sold — acquired below market value from motivated sellers who cannot refinance, cannot find
                institutional buyers, and need to close.
              </p>
              <p className={cn("mt-4 max-w-prose text-[1.02rem] leading-[1.75]", brand.muted)}>
                Banks have tightened lending standards significantly since 2023. Regional and community banks — which
                have historically funded the majority of multifamily transactions — have largely stepped back. Owners
                who leveraged aggressively in 2020–2022 cannot refinance at current rates. The result is a motivated
                seller environment that experienced operators have not seen since 2010.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
                <Stat
                  icon={Building2}
                  value="10"
                  label="US markets where the team has bought, operated, or sold"
                />
                <Stat
                  icon={Banknote}
                  value="Below"
                  label="Replacement cost — and at discounts to fair market value"
                />
                <Stat
                  icon={Compass}
                  value="Off-market"
                  label="Relationships with sellers, not brokers or auctions"
                />
              </div>
            </section>

            {/* 03 · Why this window will not last */}
            <section id="window" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>03 · Why this window will not last</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                The Fed has signaled 2027. We are designed to move through this window now.
              </h2>
              <p className={cn("mt-5 max-w-prose text-[1.02rem] leading-[1.75]", brand.muted)}>
                The Federal Reserve has signaled that meaningful normalization of commercial real estate lending
                standards is unlikely before 2027. That is the window. Once banks re-enter the market, institutional
                capital will return, competition will increase, and below-market acquisition prices will compress.
              </p>
              <p className={cn("mt-4 max-w-prose text-[1.02rem] leading-[1.75]", brand.muted)}>
                The Premier Product is built to deploy disciplined capital across this dislocation — at speed where the
                seller needs it, and on terms grounded in underwriting rather than narrative.
              </p>
            </section>

            {/* 04 · Market signal */}
            <section id="signal" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>04 · Market signal</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                What independent research is saying.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Not our characterization — three of the most-cited sources in institutional credit research.
              </p>

              <div className="mt-8 space-y-6">
                {MARKET_SIGNAL_QUOTES.map((q) => (
                  <figure
                    key={q.attribution}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7"
                  >
                    <blockquote
                      className={cn(
                        "border-l-2 border-diversy-primary/70 pl-5 text-lg italic leading-[1.6] sm:text-xl",
                        brand.text
                      )}
                    >
                      “{q.quote}”
                    </blockquote>
                    <figcaption
                      className={cn(
                        "mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                        brand.subtle
                      )}
                    >
                      <span className={brand.text}>{q.attribution}</span>
                      <span aria-hidden className="text-border">
                        ·
                      </span>
                      <span>{q.date}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Continue exploring */}
            <section className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>Continue</p>
              <h2 className={cn("mt-2 text-xl font-semibold tracking-tight sm:text-2xl", brand.text)}>
                Where the thesis meets the offering.
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
                {CONTINUE_LINKS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className={cn(
                      "group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition",
                      "hover:border-diversy-primary/35 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                    )}
                  >
                    <c.icon className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                    <p className={cn("text-base font-semibold tracking-tight", brand.text)}>{c.title}</p>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{c.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-diversy-primary">
                      Open
                      <ArrowRight
                        className="h-3 w-3 transition group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Closing CTA */}
            <div className={cn("mt-14 rounded-3xl border border-border bg-card p-6 sm:p-8")}>
              <p className={eyebrow}>Next step</p>
              <h2 className={cn("mt-2 text-lg font-semibold", brand.text)}>
                Bring the thesis to the eligibility conversation.
              </h2>
              <p className={cn("mt-3 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Strategy frames the question; eligibility review confirms the fit and routes you to the appropriate
                offering documents.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <InvestCtaButton source="strategies-hub-closing">Book appointment</InvestCtaButton>
                <Link
                  href="/opportunities/df-income"
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition",
                    "hover:border-diversy-primary/35 hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                  )}
                >
                  View the current offering
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/* 05 · Disclosures */}
            <section id="disclosures" className={cn(sectionSpacing, "mt-14")}>
              <p className={cn(eyebrow, "text-[10px]")}>05 · Disclosures</p>
              <div
                className={cn(
                  "mt-3 rounded-2xl border border-border bg-muted/30 p-5 text-xs leading-relaxed sm:p-6 sm:text-[13px]",
                  brand.subtle
                )}
              >
                <p>
                  <span className={cn("font-semibold", brand.muted)}>Informational purposes only.</span> This
                  presentation is provided for informational and discussion purposes only. It does not constitute, and
                  shall not be construed as, an offer to sell or a solicitation of an offer to buy any securities,
                  interests, or instruments. Any such offer or solicitation will be made only to qualified investors
                  pursuant to a Confidential Private Placement Memorandum and the definitive subscription and governing
                  documents, which will contain material information not included herein, including risk factors and
                  conflicts of interest.
                </p>
                <p className="mt-3">
                  <span className={cn("font-semibold", brand.muted)}>Risk of loss.</span> Investments in the notes
                  involve risk, including potential loss of principal. Interest is not guaranteed and may accrue without
                  current payment; repayment depends on the timing and success of underlying asset dispositions. There
                  can be no assurance that the investment program will acquire assets at targeted discounts or at all.
                </p>
                <p className="mt-3">
                  <span className={cn("font-semibold", brand.muted)}>Forward-looking statements.</span> Statements
                  regarding strategy, returns, market conditions, and outcomes are forward-looking and based on current
                  beliefs and assumptions. Actual results may differ materially. Any examples or illustrations are
                  hypothetical.
                </p>
                <p className="mt-3">
                  <span className={cn("font-semibold", brand.muted)}>No assurance of returns.</span> Interest rates are
                  objectives, not guarantees. Past performance is not indicative of future results. There can be no
                  assurance that the investment program will achieve its objectives or that investors will receive any
                  return of capital.
                </p>
                <p className="mt-3">
                  <span className={cn("font-semibold", brand.muted)}>Confidentiality.</span> This document is
                  confidential and is intended solely for the recipient. It may not be reproduced, distributed, or
                  disclosed in whole or in part without the prior written consent of DiversyFund, Inc.
                </p>
                <p className="mt-3">
                  Prospective investors should consult their own legal, tax, and financial advisors before considering
                  any investment in the Notes.
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <Icon className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
      <p className={cn("mt-3 text-2xl font-semibold tracking-tight", brand.text)}>{value}</p>
      <p className={cn("mt-2 text-xs leading-relaxed", brand.muted)}>{label}</p>
    </div>
  );
}
