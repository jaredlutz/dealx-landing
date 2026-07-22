import MarketingShell from "@/components/layout/MarketingShell";
import BlogProse from "@/components/blog/BlogProse";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import OfferingDeckCarousel from "@/components/opportunities/OfferingDeckCarousel";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import {
  DISTRESSED_INCOME_FUND_DECK_SLIDES,
  DISTRESSED_INCOME_FUND_OFFERING_ID,
  DISTRESSED_INCOME_FUND_PRODUCT_DECK_PDF,
  getDistressedIncomeFundOfferingForPage,
} from "@/lib/distressed-income-fund";
import {
  MARKETING_PORTAL_DISTRESSED_INCOME_FUND_OFFERING_URL,
  marketingPortalSignUpUrl,
} from "@/lib/marketing-portal-offerings";
import { formatUsdFromCents, sponsorDisplayName } from "@/lib/portal-offering";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";
import { Check, Download, ExternalLink, FileText, Landmark } from "lucide-react";

const SCAN_BULLETS = [
  "Target: 12%–18% annual Target Rates by Class",
  "Strategy: Preferred equity into discounted multifamily acquisitions",
  "Structure: Distressed Income Fund, LLC Units (Reg D 506(c))",
];

const SIGNAL_ITEMS = ["$35M Target Raise", "Accredited Only", "Min: $100K", "Income Focused"];

export const revalidate = 300;

const path = "/opportunities/distressed-income-fund";

const PORTAL_OFFERING_PATH = `/offerings/${DISTRESSED_INCOME_FUND_OFFERING_ID}`;

function metaDescription(snapshot) {
  const raw = snapshot.description.replace(/\*\*/g, "").replace(/\n+/g, " ").trim();
  if (raw.length <= 165) return raw;
  return `${raw.slice(0, 162)}…`;
}

export async function generateMetadata() {
  const { snapshot } = await getDistressedIncomeFundOfferingForPage();
  return publicPageMetadata({
    title: snapshot.name,
    description: metaDescription(snapshot),
    path,
  });
}

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

const deckCarouselImages = DISTRESSED_INCOME_FUND_DECK_SLIDES.map(({ imageIndex, name, src }) => ({
  imageIndex,
  name,
  url: src,
}));

export default async function DistressedIncomeFundPage() {
  const { snapshot } = await getDistressedIncomeFundOfferingForPage();
  const offeringPortalUrl = MARKETING_PORTAL_DISTRESSED_INCOME_FUND_OFFERING_URL;
  const signUpForOffering = marketingPortalSignUpUrl(PORTAL_OFFERING_PATH);

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
          <div className="mx-auto max-w-4xl">
            <p className={cn(eyebrow, "mb-3")}>Opportunity</p>
            <p className={cn("mb-2 text-xs font-medium uppercase tracking-wide", brand.subtle)}>{snapshot.name}</p>
            <h1
              className={cn(
                "text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]",
                brand.text
              )}
            >
              Fixed Income backed by Distressed Multifamily Real Estate
            </h1>
            <p className={cn("mt-5 max-w-3xl text-base leading-relaxed sm:text-lg", brand.muted)}>
              Institutional-style income fund focused on preferred equity investments that finance acquisitions of
              multifamily and other real estate at a discount to market value.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm sm:text-base">
              {SCAN_BULLETS.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
                  <span className={cn("leading-relaxed", brand.muted)}>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={offeringPortalUrl}
                className={cn(
                  "inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition sm:flex-initial sm:min-w-[240px]",
                  "bg-diversy-primary text-white hover:bg-diversy-primary-hover",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
                )}
              >
                View Offering &amp; Verify Eligibility
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              </a>
              <a
                href={DISTRESSED_INCOME_FUND_PRODUCT_DECK_PDF.href}
                download={DISTRESSED_INCOME_FUND_PRODUCT_DECK_PDF.downloadFilename}
                className={cn(
                  "inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-border bg-background px-5 py-3 text-sm font-semibold transition sm:flex-initial sm:min-w-[240px]",
                  "hover:border-diversy-primary/35 hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                )}
              >
                <Download className="h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
                Download Investment Deck
              </a>
            </div>
            <p className={cn("mt-6 max-w-3xl text-xs leading-relaxed sm:text-sm", brand.subtle)}>
              Available to accredited investors under Regulation D, Rule 506(c).
            </p>
            {snapshot.rule === "506c" && (
              <details
                className={cn(
                  "mt-5 rounded-xl border border-border bg-muted/25 p-4 dark:bg-muted/15",
                  "open:border-diversy-primary/20"
                )}
              >
                <summary className="cursor-pointer text-sm font-medium text-foreground outline-none marker:text-diversy-primary">
                  Eligibility &amp; subscription requirements
                </summary>
                <p className={cn("mt-3 border-t border-border pt-3 text-sm leading-relaxed", brand.muted)}>
                  This placement is offered under Regulation D, Rule 506(c). Investors must be accredited and complete
                  identity and accreditation steps in the portal before subscribing.
                </p>
              </details>
            )}
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
          <div className="min-w-0 space-y-10 lg:col-span-7 xl:col-span-8">
            <section aria-labelledby="summary-heading-dif">
              <h2 id="summary-heading-dif" className={cn("text-lg font-semibold tracking-tight", brand.text)}>
                Offering summary
              </h2>
              <div className="mt-4">
                <BlogProse markdown={snapshot.description} />
              </div>
            </section>

            <div className="min-w-0 space-y-6 border-t border-border pt-10">
              <h2
                id="investor-presentation-heading-dif"
                className={cn("text-lg font-semibold tracking-tight", brand.text)}
              >
                Investor presentation
              </h2>
              <OfferingDeckCarousel images={deckCarouselImages} className="scroll-mt-24" />
            </div>

            <section aria-labelledby="sponsor-heading-dif">
              <h2 id="sponsor-heading-dif" className={cn("text-lg font-semibold tracking-tight", brand.text)}>
                Sponsor
              </h2>
              <div className={cn("mt-3 flex items-start gap-3 text-sm", brand.muted)}>
                <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
                <div>
                  <p className={cn("font-medium text-foreground")}>{sponsorDisplayName(snapshot.sponsor)}</p>
                  <p className="mt-1">
                    Manager: <span className="text-foreground">{snapshot.projectName}</span>
                  </p>
                  <p className="mt-1">
                    Issuer: <span className="text-foreground">Distressed Income Fund, LLC</span>
                  </p>
                </div>
              </div>
            </section>

            {snapshot.investorClasses.length > 0 && (
              <section aria-labelledby="classes-heading-dif">
                <h2 id="classes-heading-dif" className={cn("text-lg font-semibold tracking-tight", brand.text)}>
                  Classes
                </h2>
                <ul className="mt-4 space-y-3">
                  {snapshot.investorClasses.map((c) => (
                    <li key={c.id}>
                      <Card className="p-4 sm:p-5">
                        <p className={cn("font-semibold text-foreground")}>{c.name}</p>
                        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                          <div>
                            <dt className={cn("text-xs font-medium uppercase tracking-wide", brand.subtle)}>
                              Minimum investment
                            </dt>
                            <dd className={cn("mt-1 font-medium text-foreground")}>
                              {formatUsdFromCents(c.minimumInvestmentCents)}
                            </dd>
                          </div>
                          {c.preferredReturnPercentage != null && (
                            <div>
                              <dt className={cn("text-xs font-medium uppercase tracking-wide", brand.subtle)}>
                                Target Rate
                              </dt>
                              <dd className={cn("mt-1 font-medium text-foreground")}>
                                {c.preferredReturnPercentage}% annual (see PPM)
                              </dd>
                            </div>
                          )}
                        </dl>
                      </Card>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {snapshot.documents.length > 0 && (
              <section aria-labelledby="docs-heading-dif">
                <h2 id="docs-heading-dif" className={cn("text-lg font-semibold tracking-tight", brand.text)}>
                  Key documents
                </h2>
                <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                  Offering materials are hosted for download. The same documents are available in the portal
                  subscription flow.
                </p>
                <ul className="mt-4 space-y-2">
                  {snapshot.documents.map((doc) => {
                    const href = doc.url || "#";
                    return (
                      <li key={doc.id}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition",
                            "hover:border-diversy-primary/35 hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
                          )}
                        >
                          <FileText className="h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
                          <span className="min-w-0 flex-1 text-foreground">{doc.name}</span>
                          <ExternalLink
                            className="h-4 w-4 shrink-0 text-muted-foreground opacity-60 group-hover:opacity-100"
                            aria-hidden
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>

          <aside className="min-w-0 lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-24 lg:space-y-5">
              <Card className="space-y-4 p-5 sm:p-6">
                <h2 className={cn("text-base font-semibold", brand.text)}>Invest through the portal</h2>
                <p className={cn("text-sm leading-relaxed", brand.muted)}>
                  Confirm accreditation for Rule 506(c) and complete subscription documents for this offering in the
                  portal.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={offeringPortalUrl}
                    className={cn(
                      "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition",
                      "bg-diversy-primary text-white hover:bg-diversy-primary-hover",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
                    )}
                  >
                    View Offering &amp; Verify Eligibility
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href={signUpForOffering}
                    className={cn(
                      "inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-diversy-primary/40 px-4 py-3 text-sm font-semibold text-diversy-primary transition",
                      "hover:bg-diversy-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
                    )}
                  >
                    Invest Now
                  </a>
                </div>
              </Card>

              <Card className="space-y-3 p-5 sm:p-6">
                <h2 className={cn("text-base font-semibold", brand.text)}>Request a conversation</h2>
                <p className={cn("text-sm leading-relaxed", brand.muted)}>
                  Share your interest and our team will follow up. This does not constitute an offer or commitment.
                </p>
                <InvestCtaButton source="opportunities-distressed-income-fund" variant="secondary" className="w-full">
                  Book appointment
                </InvestCtaButton>
              </Card>
            </div>
          </aside>
        </div>
      </Container>
    </MarketingShell>
  );
}
