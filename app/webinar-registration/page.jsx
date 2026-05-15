import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  CircleDollarSign,
  FileText,
  ShieldCheck,
} from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import Container from "@/components/ui/Container";
import WebinarScorecardForm from "@/components/webinar/WebinarScorecardForm";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

const ROUTE_PATH = "/webinar-registration";

export async function generateMetadata() {
  return publicPageMetadata({
    title: "Fixed Income Webinar Registration",
    description:
      "Register for the DiversyFund fixed income briefing and complete the institutional readiness scorecard — supply, debt maturities, and refinancing pressure, framed for disciplined allocators.",
    path: ROUTE_PATH,
  });
}

const HIGHLIGHTS = [
  {
    icon: Building2,
    title: "Supply and demand reset",
    body:
      "Where permits, starts, and deliveries are signaling the next phase of the multifamily cycle.",
  },
  {
    icon: CalendarClock,
    title: "Debt wall and refinance pressure",
    body:
      "The 2024-2027 maturity profile and what it means for recapitalizations and sponsor behavior.",
  },
  {
    icon: CircleDollarSign,
    title: "Pricing and allocation implications",
    body:
      "How repriced markets favor disciplined underwriting over broad risk-on positioning.",
  },
];

const WHAT_YOU_GET = [
  {
    icon: BarChart3,
    title: "Live briefing access",
    body:
      "Branded market briefing reframed as an institutional narrative — supply, rents, debt maturities, refinancing signals.",
  },
  {
    icon: FileText,
    title: "Readiness snapshot",
    body:
      "A private fit snapshot comparing your goals, liquidity posture, and decision style with investors who typically engage our documented programs.",
  },
  {
    icon: ShieldCheck,
    title: "Document-grounded follow-up",
    body:
      "Educational context only — not investment advice or a suitability determination. Securities are offered solely by prospectus or PPM.",
  },
];

export default function WebinarRegistrationPage() {
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
        <Container className="py-10 sm:py-14 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary">
                Live webinar briefing · Accredited investors
              </p>
              <h1
                className={cn(
                  "mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl",
                  brand.text
                )}
              >
                Register for the Fixed Income Webinar
                <span className="mt-3 block text-base font-medium tracking-normal text-muted-foreground sm:text-lg">
                  Complete the scorecard so the team can match the briefing — and any follow-up — to where you
                  actually are in the cycle.
                </span>
              </h1>
              <p className={cn("mt-6 max-w-xl text-base leading-relaxed sm:text-lg", brand.muted)}>
                The same readiness scorecard our investor team uses internally. Sixteen short steps — your
                contact details plus fourteen scored questions and one open response. After you submit, you’ll
                receive the briefing access and a private readiness snapshot reflecting your answers.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-1">
                {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                      <div>
                        <p className="font-semibold text-foreground">{title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
                Already registered or curious about the deck?{" "}
                <Link
                  href="/fixed-income-webinar"
                  className="font-medium text-diversy-primary underline-offset-2 hover:underline"
                >
                  Open the briefing
                </Link>
                .
              </p>
            </div>

            <div className="lg:col-span-6">
              <div id="register" className="lg:sticky lg:top-8">
                <WebinarScorecardForm />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
            What you receive after submitting
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Briefing access plus a private readiness snapshot
          </h2>
          <p className={cn("mt-4 max-w-3xl text-base leading-relaxed sm:text-lg", brand.muted)}>
            The scorecard takes about three minutes and there is no fee. Your responses are private; the
            summary is directional only and tied to offering documents when relevant.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {WHAT_YOU_GET.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5">
                <Icon className="h-5 w-5 text-diversy-primary" aria-hidden />
                <p className="mt-3 font-semibold text-foreground">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-diversy-primary">
            Educational only · Not an offer
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Disclosures
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            This briefing and the readiness scorecard are educational context for accredited investors. They are
            not investment advice, a suitability determination, or any promise of access, approval, or
            performance. Securities, when offered, are made available solely by prospectus or private placement
            memorandum, which contains complete information including risk factors. By registering you agree we
            may contact you about this session and related materials.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
