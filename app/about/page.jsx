import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  Handshake,
  Hourglass,
  Quote,
  RotateCcw,
  TrendingUp,
  Users,
} from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { brand, cn } from "@/lib/theme";
import { publicPageMetadata } from "@/lib/site-seo";

export const revalidate = 3600;

const PATH = "/about";

const DESCRIPTION =
  "About DiversyFund. Operating history, the five operating principles the firm runs on, and the founders behind the platform.";

export const metadata = publicPageMetadata({
  title: "About DiversyFund",
  description: DESCRIPTION,
  path: PATH,
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

const FIRM_STATS = [
  { value: "$300M+", label: "Real estate acquired", icon: TrendingUp },
  { value: "20+", label: "Properties", icon: Building2 },
  { value: "28,000+", label: "Investors", icon: Users },
  { value: "Since 2016", label: "Operating", icon: Clock },
];

const PRINCIPLES = [
  {
    icon: Handshake,
    title: "Acknowledge cost before frame.",
    desc:
      "When a development affects investor capital, the cost to investors is named first. The acknowledgment is not an apology. It is the recognition that any subsequent fact lands on people who are carrying the result.",
  },
  {
    icon: FileText,
    title: "State facts without rhetorical work.",
    desc:
      "Reports lead with the fact. Framing follows. Survivor comparisons, headline-yield language, and forward-looking promise constructions do not appear in firm communications.",
  },
  {
    icon: ClipboardCheck,
    title: "Promise actions, not outcomes.",
    desc:
      "Returns, market direction, and recovery timelines sit outside the firm's control and are not promised. Specific actions—a document by a date, a call by a deadline, a number reported on a cadence—sit inside the firm's control and are committed to.",
  },
  {
    icon: RotateCcw,
    title: "Concede small points without flinching.",
    desc:
      "When the firm was wrong about something, the firm says so plainly. The prior assumption and the current assumption are both shown. Compensating explanations are removed.",
  },
  {
    icon: Hourglass,
    title: "Speak in years, not quarters.",
    desc:
      "Private markets are long-duration. Narrative communications are measured in years and cycles. Quarterly framing is reserved for reporting cadence.",
  },
];

const JOURNEY = [
  {
    year: "Late 1990s",
    title: "Founding work in private-market vehicles",
    body:
      "The founding team begins structuring private-market investment vehicles. The documentation, duration design, and operator-selection decisions made then are tested through the contraction at the end of the cycle.",
  },
  {
    year: "2004–2015",
    title: "Pre-DiversyFund operating history",
    body:
      "More than one thousand syndicated transactions completed across residential, multifamily, and commercial real estate. Parallel work in corporate law and institutional fund management runs alongside.",
  },
  {
    year: "2016",
    title: "DiversyFund formed",
    body:
      "DiversyFund is formed and qualified by the SEC under Regulation A+. Capital is opened to a broader investor base on the same documentation standards used by institutional allocators.",
  },
  {
    year: "2018–2023",
    title: "Multifamily build-out",
    body:
      "More than $300 million in multifamily real estate is acquired and operated across more than 20 properties. The underwriting, operations, and reporting practices used here are the same practices the platform applies today.",
  },
  {
    year: "Today",
    title: "Current platform",
    body:
      "Multiple active offerings across real estate and adjacent private markets. An ongoing acquisition pipeline and a Premier program for accredited allocators. New products are added under the same operating framework.",
  },
];

const FOUNDERS = [
  {
    name: "Craig Cecilio",
    role: "Co-Founder & Chief Executive Officer",
    photo: "/about/craig-cecilio.png",
    based: "San Diego, California",
    stats: [
      { value: "$1B+", label: "Capital raised across his career" },
      { value: "1,000+", label: "Syndicated transactions" },
    ],
    bio: [
      "Craig has raised more than $1 billion in capital across his career. Prior to DiversyFund, he led CCFG Investments, where the team managed approximately $500M in assets and completed more than 1,000 syndicated transactions across residential, multifamily, and commercial real estate, beginning in the late 1990s.",
      "He founded DiversyFund to apply the documentation, underwriting, and reporting standards used by institutional allocators to a broader investor base, and to build a platform capable of carrying multiple private-market products under one operating framework.",
    ],
    mantra: "Relentless execution. Unbreakable vision.",
  },
  {
    name: "Alan Lewis",
    role: "Co-Founder & Chief Investment Officer",
    photo: "/migrated/content/meet_the_founders/img-2.png",
    based: "Corporate law & real estate private equity",
    stats: [
      { value: "$41B+", label: "Career transaction volume" },
      { value: "$6B fund", label: "Acquisitions & restructurings" },
    ],
    bio: [
      "Alan brings a Wall Street and corporate-law background, with a career spanning more than $41 billion in transactions—including acquisitions and portfolio restructurings for a $6 billion institutional real estate fund.",
      "At DiversyFund he leads investment policy, underwriting standards, and the documentation framework used to raise, deploy, and report on capital across every offering.",
    ],
  },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <section
        className={cn(
          "relative overflow-hidden border-b border-border bg-background",
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_100%_70%_at_88%_-15%,rgba(0,94,224,0.085),transparent_58%)]",
          "dark:before:bg-[radial-gradient(ellipse_90%_60%_at_92%_-8%,rgba(0,94,224,0.16),transparent_52%)]"
        )}
      >
        <Container className="py-14 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className={cn(eyebrow, "mb-3")}>About DiversyFund</p>
              <h1
                className={cn(
                  "text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl",
                  brand.text
                )}
              >
                Institutional discipline,
                <br className="hidden sm:inline" /> applied to private markets.
              </h1>
              <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", brand.muted)}>
                DiversyFund manages private-market investment offerings under the documentation,
                underwriting, and reporting standards used by institutional allocators. Every
                offering follows the same operating framework, regardless of asset class.
              </p>
              <div className={cn("mt-6 text-sm", brand.subtle)}>
                Operating since 2016 · $300M+ acquired across 20+ properties · 28,000+ investors
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <InvestCtaButton source="about-hero">Book appointment</InvestCtaButton>
                <Link
                  href="/#opps"
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-diversy-primary/40 px-4 py-3 text-sm font-semibold text-diversy-primary transition",
                    "hover:bg-diversy-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
                  )}
                >
                  Review current opportunities
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/migrated/home/home-1.jpg"
                  alt="DiversyFund team in portfolio review"
                  fill
                  quality={85}
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="object-cover object-[center_38%]"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                  aria-hidden
                />
                <figcaption className="absolute bottom-4 left-4 max-w-[80%] text-sm font-medium leading-snug text-white/95 sm:bottom-5 sm:left-6">
                  Operating private-market vehicles since the late 1990s.
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <section className={cn("relative bg-background py-16 sm:py-20", brand.sectionRule)}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className={cn(eyebrow, "mb-3")}>Posture</p>
              <h2
                className={cn(
                  "text-3xl font-semibold tracking-tight sm:text-4xl",
                  brand.text
                )}
              >
                What the firm is designed to do.
              </h2>
            </div>
            <div className="space-y-4 lg:col-span-7">
              <p className={cn("text-base leading-relaxed sm:text-lg", brand.muted)}>
                DiversyFund builds private-market investment offerings to a consistent operating
                standard. Each offering is documented before subscription. Terms, risks, and the
                conditions under which the structure performs—and the conditions under which it
                does not—are disclosed in writing.
              </p>
              <p className={cn("text-base leading-relaxed", brand.muted)}>
                Time horizons are measured in years and cycles. Investor reporting is delivered on
                a fixed cadence. When an underwriting assumption changes, both the prior
                assumption and the current assumption are reported.
              </p>
              <p className={cn("text-base leading-relaxed", brand.muted)}>
                The standard applies in calm conditions and in difficult ones. It does not change
                with the cycle.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={cn("relative bg-background py-16 sm:py-20", brand.sectionRule)}>
        <Container>
          <div className="max-w-3xl">
            <p className={cn(eyebrow, "mb-3")}>Track record</p>
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight sm:text-4xl",
                brand.text
              )}
            >
              What has been operated.
            </h2>
            <p className={cn("mt-3 text-base leading-relaxed", brand.muted)}>
              Cumulative figures across DiversyFund and predecessor investment vehicles operated
              by the founding team since the late 1990s. Past performance is not indicative of
              future results.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FIRM_STATS.map(({ value, label, icon: Icon }) => (
              <Card key={label} className="flex flex-col">
                <span className="inline-flex w-fit rounded-lg bg-diversy-primary/10 p-2 text-diversy-primary dark:bg-diversy-primary/20">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <p
                  className={cn(
                    "mt-4 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl",
                    brand.text
                  )}
                >
                  {value}
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs",
                    brand.muted
                  )}
                >
                  {label}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Operating under SEC Regulation A+ since 2016",
              "1,000+ syndicated transactions across predecessor vehicles",
              "Investor portal of record, updated on a published cadence",
              "Quarterly reporting on every active offering",
              "Defined duration disclosed before subscription",
              "Documented underwriting standards reviewed before each commitment",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className={cn("mt-0.5 h-5 w-5 shrink-0", brand.accent)} aria-hidden />
                <span className={cn("text-sm leading-relaxed", brand.text)}>{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={cn("relative bg-background py-16 sm:py-20", brand.sectionRule)}>
        <Container>
          <div className="max-w-3xl">
            <p className={cn(eyebrow, "mb-3")}>Operating principles</p>
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight sm:text-4xl",
                brand.text
              )}
            >
              Five principles, applied without exception.
            </h2>
            <p className={cn("mt-3 text-base leading-relaxed", brand.muted)}>
              How DiversyFund communicates, reports, and runs the business. The same principles
              apply in calm conditions and in difficult ones. They predate any single deal and
              continue across market cycles.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="flex flex-col">
                <span className="inline-flex w-fit rounded-lg bg-diversy-primary/10 p-2 text-diversy-primary dark:bg-diversy-primary/20">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className={cn("mt-4 text-base font-semibold", brand.text)}>{title}</h3>
                <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className={cn("relative bg-background py-16 sm:py-20", brand.sectionRule)}>
        <Container>
          <div className="max-w-3xl">
            <p className={cn(eyebrow, "mb-3")}>Operating history</p>
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight sm:text-4xl",
                brand.text
              )}
            >
              From the late 1990s to the current platform.
            </h2>
          </div>

          <ol className="relative mt-10 space-y-8 border-l border-border pl-8 sm:pl-10">
            {JOURNEY.map((step, idx) => (
              <li key={step.year} className="relative">
                <span
                  className="absolute -left-[37px] top-1.5 flex h-3.5 w-3.5 items-center justify-center sm:-left-[45px]"
                  aria-hidden
                >
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-diversy-primary bg-background" />
                </span>
                <div
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary"
                  )}
                >
                  {step.year}
                </div>
                <h3
                  className={cn(
                    "mt-2 text-lg font-semibold tracking-tight sm:text-xl",
                    brand.text
                  )}
                >
                  {step.title}
                </h3>
                <p className={cn("mt-2 max-w-3xl text-sm leading-relaxed sm:text-base", brand.muted)}>
                  {step.body}
                </p>
                {idx === JOURNEY.length - 1 && (
                  <p className={cn("mt-3 max-w-3xl text-xs", brand.subtle)}>
                    See <Link href="/#opps" className="text-diversy-primary underline-offset-4 hover:underline">current opportunities</Link>
                    {" "}or review the{" "}
                    <Link href="/offering-circular" className="text-diversy-primary underline-offset-4 hover:underline">offering circular</Link>.
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={cn("relative bg-background py-16 sm:py-20", brand.sectionRule)}>
        <Container>
          <div className="max-w-3xl">
            <p className={cn(eyebrow, "mb-3")}>Founders</p>
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight sm:text-4xl",
                brand.text
              )}
            >
              The operating team.
            </h2>
            <p className={cn("mt-3 text-base leading-relaxed", brand.muted)}>
              The founding team has operated through three full real estate cycles—the late-1990s
              contraction, 2008, and 2020. The standards used at DiversyFund today—underwriting,
              duration design, documentation, and reporting—are the operating practices each
              founder carried into the platform.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {FOUNDERS.map((f) => (
              <Card key={f.name} className="flex flex-col gap-5 p-6 sm:p-7">
                <div className="flex items-center gap-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted sm:h-24 sm:w-24">
                    <Image
                      src={f.photo}
                      alt={`${f.name} portrait`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className={cn("text-lg font-semibold tracking-tight sm:text-xl", brand.text)}>
                      {f.name}
                    </h3>
                    <p className={cn("mt-1 text-sm font-medium text-diversy-primary")}>{f.role}</p>
                    <p className={cn("mt-1 text-xs", brand.subtle)}>{f.based}</p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/50 p-4 dark:bg-muted">
                  {f.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-[0.14em]",
                          brand.subtle
                        )}
                      >
                        {stat.label}
                      </dt>
                      <dd
                        className={cn(
                          "mt-1 text-lg font-semibold tabular-nums sm:text-xl",
                          brand.text
                        )}
                      >
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="space-y-3">
                  {f.bio.map((p, i) => (
                    <p key={i} className={cn("text-sm leading-relaxed", brand.muted)}>
                      {p}
                    </p>
                  ))}
                  {f.mantra && (
                    <p className={cn("border-l-2 border-diversy-primary/40 pl-3 text-xs italic", brand.subtle)}>
                      Stated operating mantra: &ldquo;{f.mantra}&rdquo; — {f.name.split(" ")[0]}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <figure
            className={cn(
              "mt-10 flex flex-col gap-4 rounded-2xl border-l-4 border-diversy-primary bg-card p-6 sm:flex-row sm:gap-6 sm:p-8"
            )}
          >
            <Quote className="h-7 w-7 shrink-0 text-diversy-primary/70" aria-hidden />
            <div>
              <blockquote className={cn("text-lg font-medium leading-relaxed sm:text-xl", brand.text)}>
                &ldquo;What I can commit to investors are specific actions—a document by a date, a
                call by a deadline, a number reported on a cadence. Not outcomes the market
                controls. The standard does not change with the cycle.&rdquo;
              </blockquote>
              <figcaption className={cn("mt-3 text-xs uppercase tracking-[0.16em]", brand.subtle)}>
                Craig Cecilio · Co-Founder &amp; CEO
              </figcaption>
            </div>
          </figure>
        </Container>
      </section>

      <section
        className={cn(
          "relative overflow-hidden border-t border-border bg-background py-16 sm:py-20",
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,94,224,0.08),transparent_65%)]",
          "dark:before:bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,94,224,0.14),transparent_60%)]"
        )}
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className={cn(eyebrow, "mb-3")}>Next step</p>
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight sm:text-4xl",
                brand.text
              )}
            >
              Review the active offerings.
            </h2>
            <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", brand.muted)}>
              Active offerings, term ranges, and structure detail are reviewed with prospective
              investors in a short eligibility conversation. A team member responds within one
              business day.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <InvestCtaButton source="about-footer-cta">Book appointment</InvestCtaButton>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-diversy-primary/40 px-4 py-3 text-sm font-semibold text-diversy-primary transition",
                  "hover:bg-diversy-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
                )}
              >
                Talk to the team
              </Link>
            </div>
            <p className={cn("mt-6 text-xs leading-relaxed", brand.subtle)}>
              Investing involves risk, including loss of principal. This website is for informational
              purposes and does not constitute an offer to sell or a solicitation to buy securities.
            </p>
          </div>
        </Container>
      </section>
    </MarketingShell>
  );
}
