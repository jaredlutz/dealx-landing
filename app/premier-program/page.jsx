import { CalendarDays, CircleDollarSign, UsersRound } from "lucide-react";
import MainSiteChrome from "@/components/layout/MainSiteChrome";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { getPortalUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import { SITE_NAME } from "@/lib/site-seo";

const DESCRIPTION =
  "Trust is earned through honesty, access, and consistency. What we stand for and what you can expect from DiversyFund at every stage of our partnership.";

export const metadata = {
  title: "Built for the Long Game",
  description: DESCRIPTION,
  alternates: { canonical: "/premier-program" },
  openGraph: {
    title: `${SITE_NAME} — Built for the Long Game`,
    description: DESCRIPTION,
    url: "/premier-program",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Built for the Long Game`,
    description: DESCRIPTION,
  },
};

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";
const body = cn("text-base leading-relaxed text-muted-foreground");
const strong = "font-semibold text-foreground";

function SectionHeader({ num, label }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className={eyebrow}>
        {num} — {label}
      </span>
      <div className="h-px max-w-[60px] flex-1 bg-border" aria-hidden />
    </div>
  );
}

export default function PremierProgramPage() {
  const portalUrl = getPortalUrl();
  const portalHost = (() => {
    try {
      return new URL(portalUrl).host;
    } catch {
      return "portal.diversyfund.com";
    }
  })();

  return (
    <MainSiteChrome>
      <div
        className={cn(
          "relative overflow-hidden border-b border-border bg-background",
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_100%_70%_at_88%_-15%,rgba(0,94,224,0.085),transparent_58%)]",
          "dark:before:bg-[radial-gradient(ellipse_90%_60%_at_92%_-8%,rgba(0,94,224,0.16),transparent_52%)]"
        )}
      >
        <Container className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex flex-col gap-3 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
              <p className={cn(eyebrow, "mb-0")}>Premier Program</p>
              <p className={cn("text-right text-[11px] font-medium uppercase leading-relaxed tracking-[0.12em] sm:max-w-xs", brand.muted)}>
                Accredited Investors
                <br />
                Confidential
              </p>
            </div>

            <section className="mb-10" aria-labelledby="premier-hero-heading">
              <p className={cn(eyebrow, "mb-4")}>Our Promise to You</p>
              <h1
                id="premier-hero-heading"
                className={cn("text-4xl font-semibold tracking-tight sm:text-5xl", brand.text)}
              >
                Real estate wealth,
                <br />
                built <em className="not-italic text-diversy-primary">with</em> you —
                <br />
                not around you.
              </h1>
              <p className={cn("mt-5 text-lg leading-relaxed", brand.muted)}>
                Trust is earned through honesty, access, and consistency. Here is exactly what we stand for — and what
                you can expect from us at every stage of our partnership.
              </p>
            </section>
          </div>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div
            className={cn(
              "rounded-2xl border border-diversy-primary/25 bg-diversy-primary/[0.04] py-7 pl-5 pr-6 dark:bg-diversy-primary/[0.08]",
              "border-l-4 border-l-diversy-primary"
            )}
          >
            <p className={cn(eyebrow, "mb-3")}>A New Frontier — Just Like the Early Internet</p>
            <p className={body}>
              We live in a moment of genuine technological transformation. Integrating AI and advanced digital platforms
              into investing is <strong className={strong}>new territory for everyone</strong> — including us. Remember
              the early days of the internet? Websites crashed. Online banking felt uncertain. Email was strange. And
              yet, that era produced the most significant wealth-creation opportunities in modern history.
            </p>
            <p className={cn(body, "mt-4")}>
              We are at the same inflection point with AI-powered investing platforms today.{" "}
              <strong className={strong}>We&apos;re not Nvidia, Google, or a billion-dollar tech giant</strong> with
              armies of engineers. We are a focused investment firm building something real — and like any new frontier,
              there will be hiccups. That is not a red flag.{" "}
              <strong className={strong}>That is the nature of building something that has never been built before.</strong>{" "}
              What sets us apart is that we own it, communicate through it, and keep improving because of your feedback.
            </p>
          </div>

          <section className="mt-12 border-t border-border pt-12" aria-labelledby="premier-s1">
            <SectionHeader num="01" label="Transparency" />
            <h2 id="premier-s1" className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
              You will always know where things stand
            </h2>
            <p className={cn(body, "mt-4")}>
              Your investment is never in a black box. As a Premier Program member, you receive{" "}
              <strong className={strong}>monthly portfolio updates</strong> and a dedicated seat at{" "}
              <strong className={strong}>quarterly investment committee meetings</strong> — where our leadership walks
              through asset performance, market conditions, and strategy. Our investor portal gives you a live view of your
              position at any time, and our internal records are always complete regardless of any tech interface issues.
            </p>
          </section>

          <section className="mt-12 border-t border-border pt-12" aria-labelledby="premier-s2">
            <SectionHeader num="02" label="Technology" />
            <h2 id="premier-s2" className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
              We&apos;re building this platform alongside you
            </h2>
            <p className={cn(body, "mt-4")}>
              The portal is a <strong className={strong}>multi-year build-out</strong>, and we are transparent about
              that. Every piece of feedback you give us makes it better, faster, and more useful. Your investment and your
              internal records are never dependent on the platform — they exist independently.{" "}
              <strong className={strong}>A tech hiccup is a product problem, not an investment problem.</strong> And like
              every great tech company that started rough — Amazon, PayPal, early online banking — what matters is the
              commitment to keep building it right.
            </p>
          </section>

          <div className="mt-12 grid gap-6 md:grid-cols-3" role="list">
            <Card className="flex flex-col" role="listitem">
              <CalendarDays className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
              <h3 className={cn("mt-4 font-semibold", brand.text)}>Monthly Updates</h3>
              <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                Written performance summaries every month — no chasing, no guessing.
              </p>
            </Card>
            <Card className="flex flex-col" role="listitem">
              <UsersRound className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
              <h3 className={cn("mt-4 font-semibold", brand.text)}>Quarterly Meetings</h3>
              <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                Direct access to the investment committee — ask questions, hear strategy, see the numbers.
              </p>
            </Card>
            <Card className="flex flex-col" role="listitem">
              <CircleDollarSign className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
              <h3 className={cn("mt-4 font-semibold", brand.text)}>Regular Payments</h3>
              <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                Consistent distributions on schedule — your returns should never require follow-up.
              </p>
            </Card>
          </div>

          <section className="mt-12 border-t border-border pt-12" aria-labelledby="premier-s3">
            <SectionHeader num="03" label="Exclusivity" />
            <h2 id="premier-s3" className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
              The Premier Program is intentionally limited
            </h2>
            <p className={cn(body, "mt-4")}>
              We&apos;ve capped the Premier Program at <strong className={strong}>100 accredited investors</strong> —
              not as a sales tactic, but because that is the number we can serve with the level of attention this
              partnership deserves. Fewer investors means more direct access, tighter communication, and a team that
              genuinely knows your situation. <strong className={strong}>This is a relationship, not a product.</strong>
            </p>
          </section>

          <blockquote className="mt-12 border-l-4 border-l-diversy-primary py-1 pl-6">
            <p className={cn("text-xl font-medium italic leading-snug sm:text-2xl", brand.text)}>
              &ldquo;The early adopters of the internet didn&apos;t wait for perfection — they recognized a{" "}
              <span className="not-italic text-diversy-primary">generational opportunity</span> and moved with
              conviction.&rdquo;
            </p>
            <footer className={cn("mt-4 text-xs font-medium uppercase tracking-[0.12em]", brand.muted)}>
              DiversyFund — Premier Program Philosophy
            </footer>
          </blockquote>

          <section className="mt-12 border-t border-border pt-12" aria-labelledby="premier-s4">
            <SectionHeader num="04" label="Our Commitment" />
            <h2 id="premier-s4" className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
              What we ask — and what we give in return
            </h2>
            <p className={cn(body, "mt-4")}>
              We ask for your patience as we build, and your honest feedback when something isn&apos;t working. In
              return, we offer <strong className={strong}>complete transparency into your investment</strong>, regular
              access to our leadership, a clear path to answers when you need them, and a genuine commitment to your
              long-term outcomes. We are in this with you — not just at the start, but for the full journey. Real estate
              is a long game. We built DiversyFund to play it the right way.
            </p>
          </section>

          <Card className="mt-12 border-diversy-primary/25 bg-muted/40 dark:bg-muted/20">
            <p className={cn(eyebrow, "mb-3")}>Ready to Take the Next Step?</p>
            <h2 className={cn("text-2xl font-semibold tracking-tight sm:text-[1.65rem]", brand.text)}>
              Your team is ready to walk you through it personally.
            </h2>
            <ul className="mt-6 flex flex-col gap-2 text-sm font-medium text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-diversy-primary" aria-hidden>
                  →
                </span>
                <span>
                  Investor Portal:{" "}
                  <a
                    href={portalUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-diversy-primary underline decoration-diversy-primary/35 underline-offset-2 hover:opacity-90"
                  >
                    {portalHost}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-diversy-primary" aria-hidden>
                  →
                </span>
                <span>Premier Program: 100 spots — accredited investors only</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-diversy-primary" aria-hidden>
                  →
                </span>
                <span>Questions: Reach your dedicated representative directly</span>
              </li>
            </ul>
          </Card>

          <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
            <p className={cn("text-[11px] font-normal uppercase leading-relaxed tracking-[0.08em]", brand.muted)}>
              DiversyFund
              <br />
              Premier Investor Program
              <br />
              Confidential
            </p>
            <p
              className={cn(
                "text-[11px] font-normal uppercase leading-relaxed tracking-[0.08em] sm:text-right",
                brand.muted
              )}
            >
              Accredited Investors Only
              <br />
              Past performance does not
              <br />
              guarantee future results
            </p>
          </div>
        </div>
      </Container>
    </MainSiteChrome>
  );
}
