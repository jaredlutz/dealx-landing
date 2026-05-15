import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";
import MarketingShell from "@/components/layout/MarketingShell";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SlideChartFactory from "@/components/webinar/SlideChartFactory";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  CircleDollarSign,
  Handshake,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const ROUTE_PATH = "/fixed-income-webinar";

const CHART_CONTENT = {
  1: {
    title: "Housing permits (new construction indicator)",
    insight: "Permits trend lower after 2022, signaling a thinner forward pipeline for new supply.",
    body: "This chart shows U.S. housing permits peaking around 2021-2022 and then declining into 2025. Permits are a leading indicator of future construction, so this downward trend signals that new supply will slow in the coming years. That reduction in pipeline is critical for understanding where the market is heading next.",
    source: "Census / HUD",
  },
  2: {
    title: "National rent and supply growth",
    insight: "Supply growth cools while rent growth stabilizes, suggesting tightening pressure can build into 2026.",
    body: "National supply growth is tapering from post-pandemic highs while rent growth appears to be re-stabilizing. This relationship is important because moderating new deliveries can shift pricing power back toward existing inventory over time.",
    source: "CoStar / BLS / Gray Capital Analysis",
  },
  3: {
    title: "Housing permits trend context",
    insight: "A second permits view reinforces the message: fewer starts today can improve tomorrow's fundamentals.",
    body: "A second view of the permits cycle confirms the same conclusion: future construction volume is likely to decelerate from peak levels. For investors, that means near-term softness can transition into tighter supply conditions later in the cycle.",
    source: "Census / HUD",
  },
  4: {
    title: "Multifamily maturity wall and refinancing pressure",
    insight: "Near-term loan maturities remain elevated and refinancing friction creates dislocation opportunities.",
    body: "Refinancing risk in multifamily and broader CRE remains elevated as a large block of maturities rolls through 2025-2027. Even with extensions, the volume of debt coming due creates pressure that can produce attractive debt-basis opportunities.",
    source: "Buchanan Street Partners / Kaplan Group",
  },
  5: {
    title: "Building permits vs starts",
    insight: "Starts can bounce quarter-to-quarter while permits still point to slower development ahead.",
    body: "Recent data shows starts can jump while permits remain weak. That divergence matters because permits are the cleaner leading indicator of future supply, and they still suggest a slower construction pipeline ahead.",
    source: "Census / HUD",
  },
  6: {
    title: "Multifamily market size outlook",
    insight: "Long-term apartment demand trends remain constructive despite short-term capital market stress.",
    body: "The multifamily housing construction market remains large and on a long-term growth trajectory, even with cyclical volatility. That backdrop supports sustained capital demand for projects and refinancing solutions across the sector.",
    source: "Business Research Company",
  },
  7: {
    title: "CRE vacancy by sector",
    insight: "Office stress remains distinct while multifamily and industrial dynamics are comparatively healthier.",
    body: "Sector dispersion remains wide in CRE: office vacancy is structurally elevated while multifamily and industrial fundamentals are more resilient. This split reinforces why asset selection and underwriting specificity are critical.",
    source: "CBRE / Federal Reserve / NAR",
  },
  8: {
    title: "National rent growth cycle",
    insight: "Recent moderation appears late-cycle, with potential for reacceleration as supply normalizes.",
    body: "National rent growth cooled sharply after the 2021-2022 peak, but recent stabilization suggests the market may be nearing a base. Historically, this phase often precedes reacceleration once new supply pressures fade.",
    source: "National rent trend series",
  },
  9: {
    title: "National median rent levels",
    insight: "Rent has pulled back from peak but remains structurally above pre-2021 levels.",
    body: "Median asking rent has declined from the peak, but remains materially above early-cycle levels. That persistence signals that the reset is normalization, not a full reversion, which matters for income durability assumptions.",
    source: "Apartment List / Rentec Direct",
  },
  10: {
    title: "Overall vacancy and asking rent",
    insight: "Vacancy and rent curves point to a market transitioning toward normalization rather than collapse.",
    body: "Vacancy has risen from cycle lows while asking rent growth has moderated, reflecting a balancing market rather than systemic deterioration. As deliveries roll off, these indicators can improve together.",
    source: "Cushman & Wakefield",
  },
  11: {
    title: "Recovery timeline by high-supply market",
    insight: "Several high-delivery metros show a path from oversupply toward balanced conditions over time.",
    body: "High-delivery metros are on different timelines, but many show a clear transition path from oversupply and negative rent growth toward stabilization. Timing dispersion creates opportunity for selective market exposure.",
    source: "CBRE",
  },
  12: {
    title: "Commercial real estate maturity wall ($950B in 2024, peak in 2027)",
    insight: "The maturity stack extends over multiple years, supporting a sustained opportunity window.",
    body: "The maturity wall is not a single-year event. With very large balances maturing through 2027, refinancing pressure remains durable and supports a multi-year deployment window for private fixed-income capital.",
    source: "S&P Global Market Intelligence",
  },
  13: {
    title: "Nearly half of property debt maturing by 2026",
    insight: "Loan maturity concentration across lender types supports a broad need for recapitalization.",
    body: "A substantial share of CRE debt matures by 2026 across property and lender categories. This concentration increases the probability of recapitalizations, modifications, and restructuring transactions.",
    source: "CoStar / Mortgage Bankers Association",
  },
  14: {
    title: "Refinancing rate gap: maturing vs newly originated loans",
    insight: "Higher replacement coupons continue to strain borrower economics and debt service coverage.",
    body: "Newly originated CRE mortgage rates remain meaningfully above rates on maturing loans. That spread reset compresses DSCR and can force sponsors to inject equity, accept lower proceeds, or seek alternative financing.",
    source: "S&P Global Market Intelligence",
  },
  15: {
    title: "Cumulative CRE price change since peak",
    insight: "Transaction-based marks show drawdowns that can reset entry basis for disciplined debt capital.",
    body: "Price resets across appraisal and transaction-based measures indicate the repricing process has already occurred in many pockets of CRE. Lower basis can improve risk-adjusted outcomes when paired with conservative structures.",
    source: "FS Investments",
  },
  16: {
    title: "CRE mortgage maturities (clean-view version)",
    insight: "A clearer maturity profile underscores the size and timing of the refinance overhang.",
    body: "The cleaned maturity profile reinforces the same core dynamic: large annual refinancing needs persist for years. This overhang is a structural driver of financing demand, not a transient headline.",
    source: "S&P Global Market Intelligence",
  },
  17: {
    title: "Multifamily supply wave and vacancy",
    insight: "The supply wave appears near or past peak, while vacancy normalization is gradual.",
    body: "The multifamily supply boom appears to have peaked, while vacancy is still normalizing. This combination can create short-term noise but often sets the stage for improved rent trajectories in later periods.",
    source: "Fannie Mae / Apartment List / Census",
  },
  18: {
    title: "Debt exposure by lender cohort (Bloomberg)",
    insight: "Banks remain central to CRE credit, with implications for workout pace and refinancing terms.",
    body: "Bank balance sheets continue to carry significant CRE exposure across upcoming maturities. Lender positioning affects extension behavior, disposition velocity, and the terms available in refinancing negotiations.",
    source: "Bloomberg / Trepp / Federal Reserve",
  },
  19: {
    title: "Value of U.S. commercial real estate",
    insight: "The asset class scale remains substantial, supporting long-duration institutional capital demand.",
    body: "Despite cycle volatility, U.S. commercial real estate remains one of the largest institutional asset classes globally. Scale and capital intensity support long-run demand for debt and structured capital solutions.",
    source: "The Real Estate Roundtable",
  },
  20: {
    title: "Multifamily deliveries: oversupply narrative",
    insight: "Delivery peaks explain weaker rent prints; the setup improves as the pipeline cools.",
    body: "The recent oversupply narrative is largely explained by a historic delivery surge in 2023-2024. As new deliveries decelerate, the market can absorb excess units and re-balance into a healthier rent environment.",
    source: "Multifamily deliveries trend",
  },
  21: {
    title: "Office share of maturing CRE debt",
    insight: "Office headline risk is material but does not define all CRE debt opportunities.",
    body: "Office risk remains a meaningful component of maturing debt, but it is only one part of the broader maturity stack. Sector-level differentiation is essential when assessing refinancing and credit outcomes.",
    source: "S&P Global Market Intelligence",
  },
  22: {
    title: "Mortgage payment vs multifamily rent multiplier",
    insight: "Ownership affordability pressure supports renter demand across many major markets.",
    body: "Across many metro areas, owning remains significantly more expensive than renting on a monthly basis. This affordability gap supports renter demand and can sustain multifamily occupancy through cyclical transitions.",
    source: "CBRE",
  },
  23: {
    title: "CRE mortgage spreads vs U.S. Treasury",
    insight: "Wider spreads indicate tighter risk pricing and selective, basis-driven financing conditions.",
    body: "CRE mortgage spreads have widened versus Treasuries, reflecting tighter risk pricing and higher financing costs. For disciplined lenders, spread expansion can improve return potential on well-underwritten deals.",
    source: "S&P Global Market Intelligence",
  },
  24: {
    title: "First American transaction and pricing snapshot",
    insight: "Transaction activity and pricing suggest a market stabilizing after repricing.",
    body: "Transaction and pricing indicators from major market datasets suggest stabilization is emerging after the repricing phase. While uneven by segment, this pattern often marks the early stage of a new deployment cycle.",
    source: "First American / MSCI",
  },
  25: {
    title: "Marcus & Millichap supply and demand trends",
    insight: "New completions trend down while absorption and vacancy dynamics move toward balance.",
    body: "Completions are rolling over from elevated levels while demand and vacancy indicators trend toward equilibrium. As this process continues, asset-level cash flow visibility can improve for new capital entries.",
    source: "Marcus & Millichap",
  },
  26: {
    title: "Average monthly multifamily rent vs new home mortgage payment",
    insight: "Rent-vs-own economics continue to favor rental demand in many urban markets.",
    body: "The projected path of mortgage payments versus multifamily rent continues to favor renting in many markets. That spread acts as a demand tailwind for apartments and supports long-duration rental fundamentals.",
    source: "CBRE",
  },
  27: {
    title: "Multifamily housing starts",
    insight: "Starts surged in the low-rate era, then rolled over as financing costs increased.",
    body: "Multifamily starts surged during the low-interest-rate environment and peaked shortly after 2021. Since then, starts have declined as financing costs increased. This indicates that developers are pulling back, which will reduce future apartment supply after the current wave is delivered.",
    source: "Multifamily starts trend",
  },
};

/**
 * PPTX-validated topic order from:
 * /Users/diversyfundcto/Downloads/Charts For Webinar - Multiple Examples.pptx
 * Keys = slide position on page, values = chart template/content key.
 */
const PPTX_TOPIC_ORDER = {
  1: 1,
  2: 5,
  3: 27,
  4: 9,
  5: 8,
  6: 7,
  7: 6,
  8: 4,
  9: 2,
  10: 25,
  11: 26,
  12: 11,
  13: 22,
  14: 12,
  15: 14,
  16: 23,
  17: 21,
  18: 20,
  19: 17,
  20: 13,
  21: 18,
  22: 24,
  23: 19,
  24: 16,
  25: 15,
  26: 10,
};

const CHAPTERS = [
  {
    label: "Chapter 01",
    title: "Supply and demand reset",
    range: [1, 11],
    articleHref: "/insights-education/the-supply-wave-is-cresting",
    articleLabel: "The supply wave is cresting",
  },
  {
    label: "Chapter 02",
    title: "Debt wall and refinance pressure",
    range: [12, 19],
    articleHref: "/insights-education/the-maturity-wall-size-shape-tempo",
    articleLabel: "The maturity wall",
  },
  {
    label: "Chapter 03",
    title: "Pricing and allocation implications",
    range: [20, 26],
    articleHref: "/insights-education/the-coupon-reset-and-the-refinancing-math",
    articleLabel: "The coupon reset",
  },
];

const COMPANION_ARTICLES = [
  {
    href: "/insights-education/the-supply-wave-is-cresting",
    eyebrow: "Supply",
    title: "The supply wave is cresting",
    description:
      "Permits, starts, and deliveries all point the same direction. The forward pipeline is thinning.",
  },
  {
    href: "/insights-education/where-rents-go-from-here",
    eyebrow: "Rents",
    title: "Where rents go from here",
    description:
      "Rent growth cooled sharply from the peak, but the level reset is not the same as a collapse.",
  },
  {
    href: "/insights-education/the-maturity-wall-size-shape-tempo",
    eyebrow: "Debt",
    title: "The maturity wall — size, shape, tempo",
    description:
      "Not a single-year event. A multi-year stack of refinancing obligations with a 2027 peak.",
  },
  {
    href: "/insights-education/the-coupon-reset-and-the-refinancing-math",
    eyebrow: "Refinancing",
    title: "The coupon reset and the refinancing math",
    description:
      "Rate gap, credit spread, and basis reset — the math that determines how this cycle clears.",
  },
  {
    href: "/insights-education/why-renting-is-winning-the-affordability-math",
    eyebrow: "Demand",
    title: "Why renting is winning the affordability math",
    description:
      "The cost to own moved decisively above the cost to rent. A structural tailwind for multifamily demand.",
  },
  {
    href: "/insights-education/commercial-real-estate-is-not-one-market",
    eyebrow: "Dispersion",
    title: "Commercial real estate is not one market",
    description:
      "At the asset-class level, CRE is one of the largest pools in the world. At the sector level, it splits into very different cycles.",
  },
];

export async function generateMetadata() {
  return publicPageMetadata({
    title: "Fixed Income Webinar Briefing",
    description:
      "DiversyFund fixed income webinar market briefing: supply, rents, debt maturities, and refinancing signals.",
    path: ROUTE_PATH,
    noIndex: true,
  });
}

function parseSlideNumber(fileName) {
  const match = fileName.match(/chart-(\d+)-/i);
  return match ? Number(match[1]) : Number.NaN;
}

async function getWebinarSlides() {
  const slidesDir = path.join(process.cwd(), "public/images/fixed-income-webinar");
  const files = await fs.readdir(slidesDir);

  return files
    .filter((file) => file.startsWith("DF-Fixed_Income-webinar-chart-") && file.endsWith(".png"))
    .map((file) => {
      const number = parseSlideNumber(file);
      const templateNumber = PPTX_TOPIC_ORDER[number] ?? number;
      const content = CHART_CONTENT[templateNumber] ?? {
        title: `Market briefing chart ${number}`,
        insight: "Reference chart for live webinar discussion.",
        body: "Reference chart for live webinar discussion.",
        source: "Webinar source deck",
      };

      return {
        number,
        templateNumber,
        file,
        src: `/images/fixed-income-webinar/${file}`,
        title: content.title,
        insight: content.insight,
        body: content.body ?? content.insight,
        source: content.source,
      };
    })
    .filter((slide) => Number.isFinite(slide.number))
    .sort((a, b) => a.number - b.number);
}

function getChapterForSlide(number) {
  return CHAPTERS.find((chapter) => number >= chapter.range[0] && number <= chapter.range[1]) ?? CHAPTERS[0];
}

function getSlideWhyItMatters(number) {
  if (number <= 11) {
    return "Why it matters: Fundamental supply pressure is easing, which can improve multifamily income durability.";
  }
  if (number <= 19) {
    return "Why it matters: A prolonged maturity wall can force recapitalizations, creating select fixed-income entry points.";
  }
  return "Why it matters: Repriced markets favor disciplined underwriting over broad risk-taking.";
}

export default async function FixedIncomeWebinarPage() {
  const slides = await getWebinarSlides();

  return (
    <MarketingShell>
      <div
        className={cn(
          "relative overflow-hidden border-b border-border bg-background",
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_95%_68%_at_88%_-6%,rgba(0,94,224,0.13),transparent_55%)]",
          "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(ellipse_80%_52%_at_15%_4%,rgba(0,94,224,0.08),transparent_58%)]",
          "dark:before:bg-[radial-gradient(ellipse_95%_68%_at_88%_-6%,rgba(0,94,224,0.22),transparent_52%)]"
        )}
      >
        <Container className="py-10 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary">Live webinar briefing</p>
            <h1 className={cn("mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl", brand.text)}>
              Fixed Income Webinar
              <span className="mt-2 block text-lg font-medium tracking-normal text-muted-foreground sm:text-xl">
                Built as a branded market briefing page for tonight&apos;s board walkthrough
              </span>
            </h1>
            <p className={cn("mt-5 max-w-4xl text-base leading-relaxed sm:text-lg", brand.muted)}>
              This page reframes the uploaded deck into an institutional narrative: what the market is signaling now, where the
              refinance pressure is concentrated, and why fixed-income strategies can be selective in this cycle.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#briefing-thesis"
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-diversy-primary-hover",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/60"
                )}
              >
                <BarChart3 className="h-4 w-4" aria-hidden />
                Start briefing
              </a>
              <Link
                href="/opportunities/df-income"
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition",
                  "hover:border-diversy-primary/35 hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                )}
              >
                <TrendingUp className="h-4 w-4 text-diversy-primary" aria-hidden />
                Open related opportunity page
                <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container id="briefing-thesis" className="py-10">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">Executive readout</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            What this briefing says in plain language
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-5 w-5 text-diversy-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Construction pipeline is cooling</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Permits and supply signals indicate the wave that pressured rents is likely behind us.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 h-5 w-5 text-diversy-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Debt maturities are not a one-quarter event</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    The maturity wall extends into 2027+, creating an elongated period of refinancing pressure.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-start gap-3">
                <CircleDollarSign className="mt-0.5 h-5 w-5 text-diversy-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Coupon reset changes borrower behavior</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Higher replacement rates force recapitalizations and open up basis-sensitive debt opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-diversy-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Positioning favors structured fixed income</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Selectivity, collateral quality, and structure matter more than broad market beta right now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-4">
        <div className="grid gap-3 rounded-2xl border border-border bg-muted/20 p-4 sm:grid-cols-3 sm:p-5">
          {CHAPTERS.map((section) => (
            <div
              key={section.label}
              className={cn(
                "flex flex-col rounded-xl border border-border bg-card px-4 py-3 text-sm transition",
                "hover:border-diversy-primary/35"
              )}
            >
              <a
                href={`#slide-${section.range[0]}`}
                className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">{section.label}</p>
                <p className="mt-1 font-semibold text-foreground">{section.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Slides {section.range[0]}-{section.range[1]}
                </p>
              </a>
              <Link
                href={section.articleHref}
                className={cn(
                  "mt-3 inline-flex items-center gap-1.5 self-start rounded-md text-xs font-medium text-diversy-primary",
                  "hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                )}
              >
                Read: {section.articleLabel}
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      </Container>

      <Container id="briefing-deck" className="pb-14 pt-8">
        <div className="space-y-12">
          {slides.map((slide, index) => {
            const isTextLeft = index % 2 === 0;
            const chapter = getChapterForSlide(slide.number);

            return (
              <section key={slide.file} id={`slide-${slide.number}`} className="border-t border-border pt-10 sm:pt-12">
                <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className={cn("lg:col-span-5", isTextLeft ? "lg:order-1" : "lg:order-2")}>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">
                      {chapter.label} · Slide {slide.number}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                      {slide.title}
                    </h3>
                    <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", brand.muted)}>{slide.body}</p>
                    <p className={cn("mt-4 rounded-xl border border-border bg-card px-4 py-3 text-sm leading-relaxed", brand.muted)}>
                      {getSlideWhyItMatters(slide.number)}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">Source: {slide.source}</p>
                  </div>

                  <div className={cn("lg:col-span-7", isTextLeft ? "lg:order-2" : "lg:order-1")}>
                    <SlideChartFactory slideNumber={slide.templateNumber} title={slide.title} source={slide.source} />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </Container>

      <Container id="companion-articles" className="pb-12 pt-2">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-diversy-primary">Continue the briefing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Six companion articles — one per theme
          </h2>
          <p className={cn("mt-3 max-w-3xl text-sm leading-relaxed sm:text-base", brand.muted)}>
            Each piece picks up where the live walkthrough ends, with the longer-form view of the underwriting and the
            allocation implication.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COMPANION_ARTICLES.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className={cn(
                  "group flex h-full flex-col rounded-xl border border-border bg-background p-5 transition",
                  "hover:border-diversy-primary/35 hover:bg-muted/30",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                )}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-diversy-primary">
                  {article.eyebrow}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {article.title}
                </h3>
                <p className={cn("mt-2 flex-1 text-sm leading-relaxed", brand.muted)}>{article.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-diversy-primary">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-diversy-primary">Closing narrative</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Strategic implication for fixed-income allocations
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            If supply decelerates while refinance stress remains elevated, the market can produce selective credit
            opportunities with better structural protections than broad risk-on positioning. The objective is not to predict a
            perfect turn; it is to underwrite durable cash flow, covenant strength, and basis discipline while the repricing
            cycle is still in motion.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/opportunities/df-income"
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-diversy-primary-hover",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/60"
              )}
            >
              <Handshake className="h-4 w-4" aria-hidden />
              Review opportunity details
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition",
                "hover:border-diversy-primary/35 hover:bg-muted/30"
              )}
            >
              Talk with the investor team
              <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
