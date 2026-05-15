import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingShell from "@/components/layout/MarketingShell";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";
import { ArrowRight, Check, ChevronRight, ExternalLink, Layers, MessageCircle } from "lucide-react";

export const revalidate = 300;

const path = "/opportunities/platform-infrastructure";
const PLATFORM_INFRASTRUCTURE_PAGE_ENABLED = process.env.NEXT_PUBLIC_SHOW_PLATFORM_INFRASTRUCTURE_PAGE === "true";

const OPPORTUNITY_QUESTIONS_EMAIL = "invest@diversyfund.com";

const SIGNAL_ITEMS = [
  "Platform-level opportunity",
  "Accredited investors",
  "Infrastructure & data",
  "Scalable execution",
];

const PLATFORM_LAYERS = [
  {
    title: "Capital Execution Layer",
    items: ["CRM + workflow engine", "Automated investor routing", "Deal flow orchestration"],
  },
  {
    title: "Investor & Capital Management",
    items: ["Onboarding, subscriptions", "Capital calls and distributions", "Investor communications"],
  },
  {
    title: "Asset & Property Management",
    items: ["Real-time asset performance", "Operational data integration", "Portfolio-level insights"],
  },
  {
    title: "Ownership Infrastructure",
    items: ["Digital ownership records", "Cap table automation", "Transfer and transaction tracking"],
  },
  {
    title: "Secondary Market Enablement",
    items: ["Liquidity for private investments", "Investor-to-investor transfers", "Pricing and matching systems"],
  },
];

export async function generateMetadata() {
  return publicPageMetadata({
    title: "Platform Investment Opportunity — Technology & Infrastructure Expansion",
    description:
      "A vertically integrated platform combining capital execution, asset management, and investor intelligence — built on proprietary workflow infrastructure and a unified data layer.",
    path,
  });
}

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

function ContentSection({ id, title, children, className }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className={cn("scroll-mt-24", className)}>
      <h2 id={id ? `${id}-heading` : undefined} className={cn("text-lg font-semibold tracking-tight", brand.text)}>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">{children}</div>
    </section>
  );
}

export default function PlatformInfrastructurePage() {
  if (!PLATFORM_INFRASTRUCTURE_PAGE_ENABLED) {
    notFound();
  }

  return (
    <MarketingShell>
      <div
        className={cn(
          "relative overflow-hidden bg-background",
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_100%_70%_at_88%_-15%,rgba(0,94,224,0.085),transparent_58%)]",
          "dark:before:bg-[radial-gradient(ellipse_90%_60%_at_92%_-8%,rgba(0,94,224,0.16),transparent_52%)]"
        )}
      >
        <Container className="py-8 sm:py-12 lg:py-14">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            <div className="min-w-0 lg:col-span-6 xl:col-span-6">
              <p className={cn(eyebrow, "mb-3")}>Opportunity</p>
              <p className={cn("mb-2 text-xs font-medium uppercase tracking-wide", brand.subtle)}>
                Technology &amp; Infrastructure Expansion Offering
              </p>
              <h1
                className={cn(
                  "text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.4rem] lg:leading-[1.12] xl:text-[2.65rem] xl:leading-[1.12]",
                  brand.text
                )}
              >
                Invest in the Infrastructure Powering the Next Generation of Private Markets
              </h1>
              <p className={cn("mt-5 max-w-xl text-base leading-relaxed sm:text-lg", brand.muted)}>
                A vertically integrated platform combining capital execution, asset management, and investor
                intelligence — built on proprietary workflow infrastructure and a unified data layer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <InvestCtaButton
                  source="opportunities-platform-infrastructure"
                  className="inline-flex min-h-[44px] w-full flex-1 px-5 py-3 sm:min-w-[200px] sm:max-w-xs sm:flex-initial"
                >
                  Request Access
                </InvestCtaButton>
                <a
                  href="#why-opportunity"
                  className={cn(
                    "inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-border bg-background px-5 py-3 text-sm font-semibold transition sm:min-w-[220px] sm:max-w-xs sm:flex-initial",
                    "hover:border-diversy-primary/35 hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                  )}
                >
                  View Opportunity Overview
                  <ChevronRight className="h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
                </a>
              </div>
              <p className={cn("mt-6 max-w-xl text-xs leading-relaxed sm:text-sm", brand.subtle)}>
                Platform investment opportunity for qualified participants. This page is for informational purposes and
                does not constitute an offer to sell or a solicitation to buy securities. Availability and terms are
                described in formal offering materials when and if an offering is made.
              </p>
            </div>

            <div className="min-w-0 lg:col-span-6">
              <figure className="mx-auto w-full max-w-lg lg:ml-auto lg:max-w-none">
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-2xl border border-border shadow-[0_12px_48px_-8px_rgba(0,0,0,0.12)]",
                    "dark:shadow-[0_16px_60px_-12px_rgba(0,0,0,0.5)]"
                  )}
                >
                  <div className="relative aspect-[4/3] w-full min-h-[12rem] sm:aspect-[5/3] sm:min-h-0">
                    <Image
                      src="/opportunities/platform-infrastructure/observability-dark-ui.png"
                      alt="DiversyFund observability dashboard with real-time metrics for calls, SMS, emails, and task runs (dark theme UI)"
                      fill
                      className="object-cover object-top dark:hidden"
                      priority
                      sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 100vw"
                    />
                    <Image
                      src="/opportunities/platform-infrastructure/observability-light-ui.png"
                      alt="DiversyFund observability dashboard with real-time metrics for calls, SMS, emails, and task runs (light theme UI)"
                      fill
                      className="hidden object-cover object-top dark:block"
                      priority
                      sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 100vw"
                    />
                  </div>
                </div>
                <figcaption
                  className={cn("mt-3 text-center text-[11px] font-medium leading-snug sm:text-left lg:max-w-sm lg:text-left", brand.subtle)}
                >
                  Internal observability: live metrics across comms, workflows, and infrastructure
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-b border-border bg-muted/35 dark:bg-muted/25">
        <Container className="py-3 sm:py-4">
          <ul className="flex flex-wrap items-center justify-center gap-2 sm:justify-between sm:gap-3">
            {SIGNAL_ITEMS.map((label) => (
              <li
                key={label}
                className={cn(
                  "rounded-full border-2 border-diversy-primary/55 bg-diversy-primary/[0.07] px-3 py-1.5 text-center text-xs font-semibold tracking-wide",
                  "text-foreground shadow-sm shadow-diversy-primary/10 ring-1 ring-diversy-primary/20",
                  "dark:border-diversy-primary/60 dark:bg-diversy-primary/15 dark:ring-diversy-primary/25",
                  "sm:flex-1 sm:min-w-0 sm:px-4 sm:text-[13px]"
                )}
              >
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 space-y-12 lg:col-span-7 xl:col-span-8">
            <ContentSection id="why-opportunity" title="Why This Opportunity Exists">
              <p className={cn(brand.muted)}>Private markets are one of the largest and least optimized segments of the financial system.</p>
              <p className={cn("font-medium text-foreground")}>Today:</p>
              <ul className="space-y-2.5">
                {[
                  "Capital raising is manual",
                  "Investor data is fragmented",
                  "Asset performance is disconnected from capital decisions",
                  "There is no unified system managing the lifecycle of investments",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                    <span className={cn(brand.muted)}>{line}</span>
                  </li>
                ))}
              </ul>
              <p className={cn(brand.muted)}>This creates inefficiency at every level.</p>
              <p className={cn(brand.muted)}>We are solving this by building:</p>
              <p className={cn("rounded-xl border border-diversy-primary/20 bg-diversy-primary/[0.06] px-4 py-3 text-foreground dark:bg-diversy-primary/10")}>
                A single platform that unifies capital, assets, and investors into one system
              </p>
            </ContentSection>

            <ContentSection id="the-platform" title="The Platform">
              <p className={cn(brand.muted)}>
                This investment supports the expansion of DiversyFund&apos;s core platform across five layers:
              </p>
              <ol className="space-y-4">
                {PLATFORM_LAYERS.map((layer, i) => (
                  <li key={layer.title}>
                    <Card className="p-4 sm:p-5">
                      <p className="flex items-center gap-2 font-semibold text-foreground">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-diversy-primary/15 text-xs font-bold text-diversy-primary">
                          {i + 1}
                        </span>
                        {layer.title}
                      </p>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm sm:text-base text-muted-foreground">
                        {layer.items.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </Card>
                  </li>
                ))}
              </ol>
            </ContentSection>

            <ContentSection id="moat" title="Execution Is the Moat">
              <p className={cn(brand.muted)}>Most platforms manage data.</p>
              <p className={cn(brand.muted)}>We manage execution.</p>
              <p className={cn(brand.muted)}>At the core of the system is a proprietary workflow engine that:</p>
              <ul className="space-y-2.5">
                {[
                  "Automates capital flows",
                  "Orchestrates investor interactions",
                  "Drives deal conversion",
                  "Logs every action for audit and optimization",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                    <span className={cn(brand.muted)}>{line}</span>
                  </li>
                ))}
              </ul>
              <p className={cn(brand.muted)}>This creates a system that is:</p>
              <ul className="grid gap-2 sm:grid-cols-3">
                {["Deterministic", "Scalable", "Continuously improving"].map((word) => (
                  <li
                    key={word}
                    className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-center text-sm font-medium text-foreground"
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </ContentSection>

            <ContentSection id="data-flywheel" title="A Compounding Data Flywheel">
              <p className={cn(brand.muted)}>The platform aggregates data across:</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {["Sponsors", "Investors", "Assets", "Transactions"].map((w) => (
                  <li key={w} className="flex items-center gap-2 text-foreground">
                    <Layers className="h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
                    {w}
                  </li>
                ))}
              </ul>
              <p className={cn(brand.muted)}>Each interaction improves:</p>
              <ul className="space-y-2.5">
                {[
                  "Capital matching",
                  "Investor targeting",
                  "Asset selection",
                  "Execution efficiency",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                    <span className={cn(brand.muted)}>{line}</span>
                  </li>
                ))}
              </ul>
              <p className={cn("font-medium text-foreground")}>The more the platform is used, the stronger it becomes.</p>
            </ContentSection>

            <ContentSection id="use-of-capital" title="How Capital Is Deployed">
              <p className={cn(brand.muted)}>Funds from this offering are allocated to:</p>
              <ul className="space-y-2.5">
                {[
                  "Platform engineering and infrastructure",
                  "Workflow engine expansion",
                  "Asset and property management integrations",
                  "Compliance and data systems",
                  "Go-to-market and sponsor onboarding",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                    <span className={cn(brand.muted)}>{line}</span>
                  </li>
                ))}
              </ul>
              <p className={cn(brand.muted)}>This is not funding a single deal.</p>
              <p className={cn("font-medium text-foreground")}>This is funding the system that powers all deals</p>
            </ContentSection>

            <ContentSection id="revenue" title="Multiple Revenue Streams">
              <p className={cn(brand.muted)}>The platform generates revenue through:</p>
              <ul className="space-y-2.5">
                {[
                  "SaaS subscriptions (sponsors)",
                  "Transaction fees (capital movement)",
                  "Data and analytics products",
                  "Secondary market activity",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                    <span className={cn(brand.muted)}>{line}</span>
                  </li>
                ))}
              </ul>
              <p className={cn(brand.muted)}>This creates a diversified, scalable revenue base.</p>
            </ContentSection>

            <ContentSection id="timing" title="Market Timing">
              <ul className="space-y-2.5">
                {[
                  "Capital is harder to raise → sponsors need infrastructure",
                  "Compliance costs are rising → demand for integrated systems",
                  "Private markets are growing → need for better tools",
                  "Technology is converging → enabling unified platforms",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                    <span className={cn(brand.muted)}>{line}</span>
                  </li>
                ))}
              </ul>
              <p className={cn("font-medium text-foreground")}>This is the inflection point.</p>
            </ContentSection>

            <ContentSection id="investor-profile" title="Who This Is For">
              <p className={cn(brand.muted)}>This opportunity is designed for:</p>
              <ul className="space-y-2.5">
                {["Accredited investors", "Operators and sponsors", "Individuals seeking exposure to platform-level upside"].map(
                  (line) => (
                    <li key={line} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                      <span className={cn(brand.muted)}>{line}</span>
                    </li>
                  )
                )}
              </ul>
            </ContentSection>

            <ContentSection id="vision" title="The End State" className="!space-y-4">
              <p className={cn(brand.muted)}>A platform where:</p>
              <ul className="space-y-2.5">
                {["Capital is raised", "Assets are managed", "Investors are served", "Ownership is transferable"].map(
                  (line) => (
                    <li key={line} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                      <span className={cn(brand.muted)}>{line}</span>
                    </li>
                  )
                )}
              </ul>
              <p className={cn("text-base font-medium text-foreground sm:text-lg")}>All in one system.</p>
            </ContentSection>

            <section
              id="access-cta"
              aria-labelledby="access-cta-heading"
              className="scroll-mt-24 rounded-2xl border border-diversy-primary/25 bg-diversy-primary/[0.06] p-6 sm:p-8 dark:bg-diversy-primary/10"
            >
              <h2
                id="access-cta-heading"
                className={cn("text-center text-xl font-semibold tracking-tight sm:text-2xl", brand.text)}
              >
                Access the Platform Investment Opportunity
              </h2>
              <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
                <InvestCtaButton
                  source="opportunities-platform-infrastructure-bottom"
                  className="w-full min-h-[48px] px-6 sm:min-w-[200px] sm:max-w-xs"
                >
                  Request Access
                </InvestCtaButton>
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border-2 border-diversy-primary/40 bg-background px-6 text-sm font-semibold text-diversy-primary transition sm:min-w-[200px] sm:max-w-xs",
                    "hover:bg-diversy-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
                  )}
                >
                  Speak With Our Team
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </div>
            </section>
          </div>

          <aside className="min-w-0 lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-24 lg:space-y-5">
              <Card className="space-y-4 p-5 sm:p-6">
                <h2 className={cn("text-base font-semibold", brand.text)}>Request access</h2>
                <p className={cn("text-sm leading-relaxed", brand.muted)}>
                  Share your interest in the platform investment opportunity. Our team will follow up with next steps
                  and, when available, access to offering materials. This does not constitute an offer or commitment.
                </p>
                <InvestCtaButton
                  source="opportunities-platform-infrastructure-rail"
                  className="w-full"
                >
                  Request access
                </InvestCtaButton>
                <a
                  href={`mailto:${OPPORTUNITY_QUESTIONS_EMAIL}`}
                  className={cn(
                    "inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border-2 border-border bg-transparent px-4 py-3 text-sm font-semibold text-foreground transition",
                    "hover:border-diversy-primary/35 hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                  )}
                >
                  Email the team
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
                <p className={cn("text-xs leading-relaxed", brand.subtle)}>
                  Questions:{" "}
                  <a
                    className="font-medium text-diversy-primary underline-offset-4 hover:underline"
                    href={`mailto:${OPPORTUNITY_QUESTIONS_EMAIL}`}
                  >
                    {OPPORTUNITY_QUESTIONS_EMAIL}
                  </a>
                </p>
              </Card>

              <Card className="space-y-3 p-5 sm:p-6">
                <h2 className={cn("text-base font-semibold", brand.text)}>Opportunity overview</h2>
                <p className={cn("text-sm leading-relaxed", brand.muted)}>Jump to a section of this page.</p>
                <nav aria-label="On this page" className="flex flex-col gap-1.5 text-sm">
                  {[
                    ["Why this opportunity", "#why-opportunity"],
                    ["The platform (five layers)", "#the-platform"],
                    ["Execution is the moat", "#moat"],
                    ["Data flywheel", "#data-flywheel"],
                    ["Use of capital", "#use-of-capital"],
                    ["Revenue streams", "#revenue"],
                    ["Market timing", "#timing"],
                    ["Who this is for", "#investor-profile"],
                    ["The vision", "#vision"],
                  ].map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      className={cn(
                        "group flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 font-medium text-diversy-primary",
                        "hover:bg-diversy-primary/10"
                      )}
                    >
                      {label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                    </a>
                  ))}
                </nav>
              </Card>

              <p className={cn("text-center text-xs leading-relaxed lg:text-left", brand.subtle)}>
                <Link
                  href="/opportunities/df-income"
                  className="text-diversy-primary underline-offset-4 hover:underline"
                >
                  Distressed multifamily notes
                </Link>
                {" · "}
                <Link href="/documents" className="text-diversy-primary underline-offset-4 hover:underline">
                  Firm documents
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </MarketingShell>
  );
}
