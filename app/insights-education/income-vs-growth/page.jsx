import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  PiggyBank,
  Scale,
  Target,
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

const PATH = "/insights-education/income-vs-growth";
const DESCRIPTION =
  "Income vs growth as a framing question: what the choice changes about underwriting, duration, distributions, documentation, and the role the allocation plays in a portfolio.";

export const metadata = publicPageMetadata({
  title: "Income vs Growth",
  description: DESCRIPTION,
  path: PATH,
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

const TOC_SECTIONS = [
  { id: "framing", num: "01", label: "The framing question" },
  { id: "cashflow-shapes", num: "02", label: "Cash-flow shapes" },
  { id: "documents", num: "03", label: "What changes in the documents" },
  { id: "test", num: "04", label: "A simple test" },
  { id: "portfolio-role", num: "05", label: "Where each fits" },
  { id: "faq", num: "06", label: "Frequently asked" },
];

const FRAMING_FEATURES = [
  {
    icon: BadgeDollarSign,
    title: "Income — a coupon obligation",
    body:
      "The operator is contractually obligated to pay a stated coupon on a stated cadence. The instrument's primary economic feature is the periodic payment. Maturity returns principal.",
  },
  {
    icon: TrendingUp,
    title: "Growth — a realization obligation",
    body:
      "The operator's job is to realize value at exit — refinance, sale, or wind-down. Periodic distributions are episodic or modest; the bulk of the return arrives at the realization event.",
  },
  {
    icon: Scale,
    title: "Same firm, different instruments",
    body:
      "A single firm can issue both income instruments and growth vehicles. They share underwriting discipline but answer to different obligations and report on different cadences.",
  },
];

const INCOME_PROFILE = [
  "Contractual coupon is the primary economic feature.",
  "Distributions on a stated cadence (typically quarterly).",
  "Duration is defined; principal returns on a known schedule.",
  "Underwriting emphasizes covenants, lien position, and reporting.",
  "Reporting cadence is part of the package, not an extra.",
];

const GROWTH_PROFILE = [
  "Appreciation of the underlying asset is the primary economic feature.",
  "Distributions are episodic — at refinance, sale, or wind-down.",
  "Duration is open-ended within a defined hold expectation.",
  "Underwriting emphasizes market, operator, and basis.",
  "Reporting cadence varies; major moves are event-driven.",
];

const DOC_DIFFERENCES = [
  {
    icon: BadgeDollarSign,
    title: "Coupon language",
    body:
      "Income instruments state the rate, the cadence, and the accrual mechanics in the operative documents. Growth structures do not. If the offering pamphlet leads with a coupon, the documents should as well.",
  },
  {
    icon: BarChart3,
    title: "Distribution waterfalls",
    body:
      "Income structures distribute first against the coupon, with priority on the payment schedule. Growth structures distribute against return-of-capital tiers and promote thresholds — operator economics shift after thresholds are hit.",
  },
  {
    icon: Calendar,
    title: "Duration",
    body:
      "Income instruments mature on a defined date or within a defined window. Growth structures realize on an event-driven schedule — the operator targets a hold, but exit timing is not contractual.",
  },
  {
    icon: ClipboardList,
    title: "Reporting cadence",
    body:
      "Both produce reports. Income reporting emphasizes interest paid, coverage, and lien standing. Growth reporting emphasizes NOI, leasing progress, and capital improvements that build toward realization.",
  },
];

const TEST_INCOME_SIGNS = [
  "The headline number is a percentage rate — coupon, dividend, or yield.",
  "Documents quote distribution cadence and per-class minimums.",
  "Maturity or wind-down is a date or a defined window.",
  "Reports lead with interest paid, lien position, and coverage.",
];

const TEST_GROWTH_SIGNS = [
  "The headline number is a multiple or IRR target on capital.",
  "Documents emphasize promote thresholds and waterfalls.",
  "Hold period is described in years, not maturity dates.",
  "Reports lead with NOI, leasing, or value-add execution.",
];

const PORTFOLIO_ROLES = [
  {
    title: "Income's role",
    body:
      "Generate contractual cash flow on a known schedule. Serves capital that has a payment obligation (distribution, living expense, reinvestment cadence) or that values predictability over upside.",
  },
  {
    title: "Growth's role",
    body:
      "Compound capital toward a future realization event. Serves capital with no near-term payment obligation, willing to trade interim cash flow for higher potential at exit.",
  },
  {
    title: "Common mistake — mixing the role",
    body:
      "Capital with a near-term cash need allocated to a growth vehicle. Capital with no cash need allocated to income (and paying tax on the coupon when reinvestment would have served better). Role first, then vehicle.",
  },
];

const FAQ = [
  {
    q: "Is income or growth better?",
    a: "Neither, in the abstract. The right answer depends on what the capital has to do over the next few years — pay distributions, reinvest, or compound. The wrong vehicle for the right role underperforms.",
  },
  {
    q: "Can a single offering give both income and growth?",
    a: "Sometimes. Hybrid structures pay a current coupon and participate in upside at realization. The documents will describe both mechanics; if only one is described, treat the other as marketing language.",
  },
  {
    q: "What about REITs?",
    a: "Public REITs are largely on the income side and trade with public-market volatility. Private real-estate income structures share the income obligation but trade liquidity for documentation, duration discipline, and underwriting visibility.",
  },
  {
    q: "Where does DiversyFund operate?",
    a: "The structures DiversyFund offers today are written for the income side of this framing — promissory notes with stated annual rates, defined duration, and quarterly distributions per the operative documents.",
  },
  {
    q: "How do taxes differ between income and growth?",
    a: "Income is typically taxed as ordinary income in the year received (subject to investor circumstances). Growth realized at exit is typically taxed as capital gain. Discuss specifics with a qualified tax professional.",
  },
  {
    q: "Should I split capital across both?",
    a: "Many institutional allocations do. The split is driven by the obligation profile of the capital — distributions due, reinvestment cadence, time horizon — not by a fixed ratio.",
  },
];

const sectionSpacing = "scroll-mt-24";
const sectionDivider = "border-t border-border/60 pt-12 mt-14";

export default function IncomeVsGrowthPage() {
  return (
    <MarketingShell>
      <Container className="py-12 sm:py-16 lg:py-20">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Insights & Education</p>
          <h1
            className={cn(
              "mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem]",
              brand.text
            )}
          >
            Income vs growth — what the choice actually changes.
          </h1>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", brand.muted)}>
            Income and growth are not the same allocation in different clothing. They imply different documentation,
            different distribution mechanics, and different conversations with the operator. The question is which one
            the capital has to do.
          </p>
        </div>

        {/* Two-column body */}
        <div className="mx-auto mt-14 max-w-6xl lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          {/* Sticky left rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <EducationalPageToc sections={TOC_SECTIONS} />

              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <p className={cn(eyebrow, "text-[10px]")}>Take action</p>
                <p className={cn("mt-2 text-xs leading-relaxed", brand.muted)}>
                  Eligibility review pairs the allocation with the structure that fits.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <InvestCtaButton
                    source="insights-income-vs-growth-sidebar"
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

          {/* Content */}
          <div className="min-w-0">
            {/* 01 */}
            <section id="framing" className={sectionSpacing}>
              <p className={eyebrow}>01 · The framing question</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Income and growth are different obligations on the operator.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                The first question is not which is better. The first question is what the capital has to do. The answer
                points at one of two contractual relationships — the operator either owes a coupon on a schedule, or
                they owe a realization at exit. Those are not interchangeable.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {FRAMING_FEATURES.map((f) => (
                  <Card key={f.title} className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-start gap-3">
                      <f.icon className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                      <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{f.title}</h3>
                    </div>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{f.body}</p>
                  </Card>
                ))}
              </div>
            </section>

            <GatedSection slug="income-vs-growth">
            {/* 02 */}
            <section id="cashflow-shapes" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>02 · Cash-flow shapes</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Two profiles, side by side.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                The clearest way to feel the difference is to look at how the cash arrives. Income pays through the
                hold; growth concentrates at the exit. Both can be appropriate. Neither is the other in disguise.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                <Card className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-2.5">
                    <BadgeDollarSign className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                    <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>Income-oriented</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {INCOME_PROFILE.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-diversy-primary/70" aria-hidden />
                        <span className={cn("text-sm leading-relaxed", brand.muted)}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                    <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>Growth-oriented</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {GROWTH_PROFILE.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/70" aria-hidden />
                        <span className={cn("text-sm leading-relaxed", brand.muted)}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

            {/* 03 */}
            <section id="documents" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>03 · What changes in the documents</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Where the framing actually lives.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Two offerings that look similar in the headline can carry very different obligations. The operative
                documents are where the difference shows. Four sections do most of the work.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                {DOC_DIFFERENCES.map((d) => (
                  <Card key={d.title} className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-start gap-3">
                      <d.icon className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                      <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{d.title}</h3>
                    </div>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{d.body}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* 04 */}
            <section id="test" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>04 · A simple test</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Coupon curve, or realization spike?
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Sketch the cash-flow profile on one page. Does it look like a steady coupon curve through maturity, or a
                line of modest distributions ending in a realization spike? The shape names the side. The signs below
                help.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                <Card className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-2.5">
                    <Target className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                    <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>Signs you're looking at income</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {TEST_INCOME_SIGNS.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", brand.gold)} aria-hidden />
                        <span className={cn("text-sm leading-relaxed", brand.muted)}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-2.5">
                    <PiggyBank className="h-5 w-5 shrink-0 text-amber-500 dark:text-amber-400" aria-hidden />
                    <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>Signs you're looking at growth</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {TEST_GROWTH_SIGNS.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" aria-hidden />
                        <span className={cn("text-sm leading-relaxed", brand.muted)}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <p
                className={cn(
                  "mt-6 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-relaxed",
                  brand.muted
                )}
              >
                <span className={cn("font-semibold", brand.text)}>Useful prompt.</span> If you cannot identify which
                shape the offering produces after reading the materials, that itself is the answer — keep reading until
                the documents tell you.
              </p>
            </section>

            {/* 05 */}
            <section id="portfolio-role" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>05 · Where each fits in a portfolio</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Role first, then vehicle.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                The cleanest way to allocate is to name the role the capital must play, and then pick the structure
                that's written for that role. Reversing the order — picking the vehicle that sounds attractive and then
                hoping the role fits — is the source of most mismatches.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
                {PORTFOLIO_ROLES.map((r) => (
                  <Card key={r.title} className="flex h-full flex-col gap-3 p-5">
                    <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{r.title}</h3>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{r.body}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-diversy-primary/20 bg-diversy-primary/[0.04] p-6 sm:p-7 dark:bg-diversy-primary/[0.08]">
                <div className="flex items-start gap-3">
                  <FileText className={cn("mt-0.5 h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                  <div>
                    <p className={eyebrow}>Where DiversyFund operates</p>
                    <h3 className={cn("mt-2 text-base font-semibold", brand.text)}>
                      Today's structures sit on the income side of this framing.
                    </h3>
                    <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                      Promissory notes with stated annual rates, defined duration, and quarterly distributions per the
                      operative documents. Underwriting emphasizes covenants, lien position, basis, and reporting
                      discipline. The growth view is honored as a separate decision — appropriate, but made in the right
                      vehicle with its own framing.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 06 */}
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

            {/* Closing */}
            <div className={cn("mt-14 rounded-3xl border border-border bg-card p-6 sm:p-8")}>
              <p className={eyebrow}>Next step</p>
              <h2 className={cn("mt-2 text-lg font-semibold", brand.text)}>
                Name the role, then choose the structure.
              </h2>
              <p className={cn("mt-3 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Eligibility review begins with the obligation profile of the capital — distributions due, reinvestment
                cadence, time horizon — and from there frames which structures fit.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <InvestCtaButton source="insights-income-vs-growth-closing">
                  Book appointment
                </InvestCtaButton>
                <Link
                  href="/insights-education"
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition",
                    "hover:border-diversy-primary/35 hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                  )}
                >
                  More insights
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

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
