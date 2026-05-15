import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileText,
  PiggyBank,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import GatedSection from "@/components/blog/GatedSection";
import EducationalPageToc from "@/components/strategies/EducationalPageToc";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

const PATH = "/insights-education/retirement-accounts";
const DESCRIPTION =
  "Self-directed retirement structures for private-market allocations: Solo 401(k), SEP IRA, SIMPLE IRA, the SDIRA, and the custodial framework that shapes the decision.";

export const metadata = publicPageMetadata({
  title: "Invest with retirement accounts",
  description: DESCRIPTION,
  path: PATH,
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

const TOC_SECTIONS = [
  { id: "structure", num: "01", label: "The structure" },
  { id: "account-types", num: "02", label: "Account types" },
  { id: "process", num: "03", label: "The process" },
  { id: "considerations", num: "04", label: "Considerations" },
  { id: "benefits-risks", num: "05", label: "Benefits & risks" },
  { id: "faq", num: "06", label: "Frequently asked" },
];

const STRUCTURE_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Account is the investor",
    body:
      "Subscription documents are issued in the name of the qualified retirement account — never the individual personally. The custodian signs on the account's behalf and titles the position accordingly.",
  },
  {
    icon: Compass,
    title: "Custodian-administered",
    body:
      "A self-directed custodian or plan trustee holds the account, processes funding, books distributions, and maintains the compliance record. Each custodian has its own paperwork and timing.",
  },
  {
    icon: Banknote,
    title: "Tax framework matters",
    body:
      "Traditional accounts grow tax-deferred and distributions are taxed as income. Roth accounts grow tax-free with qualified withdrawals. The framework changes the conversation about how each dollar performs over time.",
  },
];

const ACCOUNT_TYPES = [
  {
    icon: PiggyBank,
    title: "Self-directed IRA (SDIRA)",
    role: "Most common path for individuals",
    body:
      "A self-directed custodian holds the IRA and supports private investments. Traditional and Roth variants behave differently on contributions, deductions, and qualified distributions, but use the same allocation mechanics on the way in.",
    detail:
      "Contribution limits track the standard IRA caps; transfers and rollovers from existing IRAs or 401(k)s are common funding paths.",
  },
  {
    icon: Briefcase,
    title: "Solo 401(k)",
    role: "Self-employed / owner-only",
    body:
      "For self-employed individuals or single-member businesses with no full-time employees other than a spouse. Allows substantially higher annual contributions than an IRA when the plan document permits private investments.",
    detail:
      "Plan document and trustee structure matter — the plan must permit alternative assets, and the trustee (often the account holder) is responsible for compliance.",
  },
  {
    icon: Building2,
    title: "SEP IRA",
    role: "Self-employed / small business owner",
    body:
      "Simplified Employee Pension. Employer-funded, with contribution capacity meaningfully above a traditional IRA. Held with a self-directed custodian to support private placements.",
    detail:
      "Useful for years with variable income — the employer can adjust contribution amounts annually within the percentage and dollar limits.",
  },
  {
    icon: Users,
    title: "SIMPLE IRA",
    role: "Small employer",
    body:
      "Savings Incentive Match Plan for Employees. Lower contribution limits than a SEP or Solo 401(k); usable for private-market allocations when the holding custodian supports them.",
    detail:
      "Lower administrative burden than a 401(k); appropriate for very small organizations where the contribution caps fit the profile.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Choose the account framework",
    body:
      "Establish (or confirm) that the right vehicle is in place — SDIRA, Solo 401(k), SEP IRA, or SIMPLE IRA. Eligibility, employment structure, and contribution goals drive the selection. A qualified advisor can confirm fit.",
  },
  {
    n: "02",
    title: "Fund the account",
    body:
      "Move capital into the account via contribution (subject to annual limits), trustee-to-trustee transfer from another IRA, or direct rollover from an employer plan. The custodian provides forms and timing.",
  },
  {
    n: "03",
    title: "Direct the investment",
    body:
      "Review the offering documents, complete the custodian's investment instruction or direction-of-investment form, and forward the package to the issuer for subscription in the name of the account.",
  },
  {
    n: "04",
    title: "Subscribe in the name of the account",
    body:
      "The custodian executes subscription documents on behalf of the account. The position is titled to the account, not the individual; this is the line that preserves the tax framework.",
  },
  {
    n: "05",
    title: "Distributions return to the account",
    body:
      "All distributions, interest, and proceeds flow back to the custodian for credit to the account. Personal receipt of these funds outside the account compromises the tax-advantaged status.",
  },
];

const CONSIDERATIONS = [
  {
    icon: ShieldCheck,
    title: "Custodian fit",
    body:
      "Not every custodian supports every alternative asset, and processing timelines vary widely. Confirm support for the offering type before funding, and budget time for the custodian's review queue.",
  },
  {
    icon: Scale,
    title: "Contribution capacity & timing",
    body:
      "Annual limits and deadlines differ by account type and tax year. Coordinating a contribution, a rollover, and an investment in the same cycle requires sequencing the paperwork — particularly near year-end.",
  },
  {
    icon: ClipboardList,
    title: "IRS rules & prohibited transactions",
    body:
      "Disqualified-person rules and prohibited-transaction provisions apply to the account, not just the investor personally. Self-dealing, personal use, and related-party benefits are common triggers; counsel can confirm whether a fact pattern is clear.",
  },
  {
    icon: FileText,
    title: "Tax & estate planning",
    body:
      "Required minimum distributions (where applicable), beneficiary designations, and the interaction between account type and estate plan all warrant a conversation with a qualified tax or estate professional before allocating.",
  },
];

const BENEFITS = [
  "Allocates qualified retirement capital into structures it might not otherwise reach.",
  "Tax framework of the account is preserved — distributions return to the account, not personally.",
  "Diversifies the retirement portfolio across asset classes with different return drivers.",
  "Higher contribution vehicles (Solo 401(k), SEP) allow more capacity than an IRA when eligible.",
];

const RISKS = [
  "Private-market investments are typically illiquid and not redeemable on demand.",
  "Custodial fees, processing time, and paperwork add friction relative to public-market trades.",
  "Prohibited-transaction missteps can disqualify the account; the rules are unforgiving.",
  "Required minimum distributions may force timing decisions if the underlying asset is not liquid when needed.",
];

const FAQ = [
  {
    q: "Which account type is right for me?",
    a: "It depends on how the capital was earned and what contribution capacity is needed. Employees with rollover capital typically use an SDIRA. Self-employed investors often weigh Solo 401(k) versus SEP IRA based on income and structure. A qualified advisor can confirm the fit.",
  },
  {
    q: "Can I move an existing IRA or 401(k) into a self-directed structure?",
    a: "Most existing IRAs can transfer to a self-directed custodian via a trustee-to-trustee transfer. 401(k) accounts from a former employer can typically be rolled over to an SDIRA or Solo 401(k). Active-employer plans often have restrictions; check the plan document.",
  },
  {
    q: "Do I need to be accredited?",
    a: "Many private placements require investors (or the account) to meet accreditation standards under SEC Regulation D. Whether the account or the individual is tested depends on the offering's structure. The subscription documents specify which standard applies.",
  },
  {
    q: "Are there limits on how much I can invest in any single offering?",
    a: "No regulatory cap exists per offering inside a qualified account beyond the account's own balance, but prudent concentration and liquidity practices apply. Custodians do not typically advise on allocation; investors and their advisors do.",
  },
  {
    q: "What happens to distributions and interest payments?",
    a: "All payments flow to the custodian for credit to the account. Personal receipt of those payments — even by accident — can compromise the tax framework. Confirm the wire and check instructions on the offering's payment forms before subscribing.",
  },
  {
    q: "Does DiversyFund advise on retirement-account selection?",
    a: "No. DiversyFund issues subscription documents to qualified accounts and communicates with custodians on the account's behalf, but does not act as a tax, legal, or estate advisor and does not provide guidance on which account framework to use.",
  },
];

const sectionSpacing = "scroll-mt-24";
const sectionDivider = "border-t border-border/60 pt-12 mt-14";

export default function RetirementAccountsPage() {
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
            Investing with retirement accounts.
          </h1>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", brand.muted)}>
            Beyond the IRA, several retirement structures can hold private-market investments. The right one depends on
            how capital was earned, what contribution capacity is needed, and whether the custodial framework supports
            private placements. The mechanics below are the same conversation, repeated per vehicle.
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
                  Eligibility review handles the account type alongside the allocation.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <InvestCtaButton
                    source="insights-retirement-accounts-sidebar"
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
            <section id="structure" className={sectionSpacing}>
              <p className={eyebrow}>01 · The structure</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                What every qualified-account allocation has in common.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Different retirement vehicles answer different questions about who earned the money and how much fits
                each year. They share a single mechanic on the way into private markets: the account, not the individual,
                is the investor.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {STRUCTURE_FEATURES.map((f) => (
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

            <GatedSection slug="retirement-accounts">
            {/* 02 */}
            <section id="account-types" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>02 · Account types</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Four vehicles, one allocation discipline.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Each of these accounts can hold private-market investments when administered by a custodian that supports
                alternatives. The right one depends on how capital was earned, what contribution capacity is needed, and
                what the plan document or custodian permits.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                {ACCOUNT_TYPES.map((a) => (
                  <Card key={a.title} className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-start gap-3">
                      <a.icon className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                      <div>
                        <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{a.title}</h3>
                        <p className={cn("mt-0.5 text-[11px] uppercase tracking-[0.16em]", brand.subtle)}>{a.role}</p>
                      </div>
                    </div>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{a.body}</p>
                    <p className={cn("text-xs leading-relaxed", brand.subtle)}>{a.detail}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-diversy-primary/20 bg-diversy-primary/[0.04] p-6 sm:p-7 dark:bg-diversy-primary/[0.08]">
                <div className="flex items-start gap-3">
                  <Scale className={cn("mt-0.5 h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                  <div>
                    <p className={eyebrow}>Traditional vs Roth</p>
                    <h3 className={cn("mt-2 text-base font-semibold", brand.text)}>
                      The framework changes how each dollar performs over time.
                    </h3>
                    <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                      Traditional accounts contribute pre-tax, grow tax-deferred, and are taxed as ordinary income at
                      distribution. Roth accounts contribute after-tax, grow tax-free, and produce tax-free qualified
                      withdrawals. The same allocation can produce very different long-term outcomes depending on which
                      side of that line it sits on. This is a tax-strategy conversation with a qualified advisor — not a
                      product decision.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 03 */}
            <section id="process" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>03 · The process</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                Five steps, repeated for every vehicle.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                The mechanics are the same whether the account is an SDIRA, Solo 401(k), SEP IRA, or SIMPLE IRA. The
                paperwork is what varies — each custodian has its own forms and timing.
              </p>

              <ol className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                {PROCESS_STEPS.map((step) => (
                  <li key={step.n}>
                    <Card className="flex h-full flex-col gap-2.5 p-5">
                      <div className="flex items-baseline gap-3">
                        <span className={cn("text-xs font-semibold tracking-[0.16em]", brand.gold)}>{step.n}</span>
                        <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{step.title}</h3>
                      </div>
                      <p className={cn("text-sm leading-relaxed", brand.muted)}>{step.body}</p>
                    </Card>
                  </li>
                ))}
              </ol>

              <p
                className={cn(
                  "mt-6 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-relaxed",
                  brand.muted
                )}
              >
                <span className={cn("font-semibold", brand.text)}>A note on titling.</span> Every step is in the name of
                the account. Subscription documents, payment instructions, and reporting all reference the account, not
                the individual. The custodian signs and is copied on the file.
              </p>
            </section>

            {/* 04 */}
            <section id="considerations" className={cn(sectionSpacing, sectionDivider)}>
              <p className={eyebrow}>04 · Considerations</p>
              <h2 className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
                What to weigh before allocating.
              </h2>
              <p className={cn("mt-4 max-w-prose text-sm leading-relaxed", brand.muted)}>
                These are not reasons not to allocate. They are the parameters that frame the conversation with a
                qualified advisor and the custodian before the wire goes out.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
                {CONSIDERATIONS.map((c) => (
                  <Card key={c.title} className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-start gap-3">
                      <c.icon className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                      <h3 className={cn("text-sm font-semibold tracking-tight", brand.text)}>{c.title}</h3>
                    </div>
                    <p className={cn("text-sm leading-relaxed", brand.muted)}>{c.body}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* 05 */}
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
                Bring the account, the allocation, and the discipline together.
              </h2>
              <p className={cn("mt-3 max-w-prose text-sm leading-relaxed", brand.muted)}>
                Eligibility review handles the account type alongside the allocation — paperwork, custodian fit, and the
                offering documents in one conversation.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <InvestCtaButton source="insights-retirement-accounts-closing">
                  Book appointment
                </InvestCtaButton>
                <Link
                  href="/insights-education/ira"
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition",
                    "hover:border-diversy-primary/35 hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                  )}
                >
                  IRA basics
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
