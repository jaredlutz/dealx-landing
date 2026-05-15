import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import Container from "@/components/ui/Container";
import BlogProse from "@/components/blog/BlogProse";
import ArticleGate from "@/components/blog/ArticleGate";
import Button from "@/components/ui/Button";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import EducationalPageToc from "@/components/strategies/EducationalPageToc";
import {
  extractMarkdownHeadings,
  formatBlogDate,
  getAllSlugs,
  getPostBySlug,
} from "@/lib/blog";
import { splitMarkdownForGate } from "@/lib/blog-gate";
import { publicPageMetadata, SITE_NAME } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

export const revalidate = 120;

const WINDOW_MISS_SLUG = "the-window-most-investors-miss";

const WINDOW_MISS_SECTION_HEADINGS = [
  "Where We Actually Are in the Cycle",
  "What This Phase Actually Looks Like",
  "Why Waiting Feels Right (And Is Wrong)",
  "What’s Actually Happening Beneath the Surface",
  "The Psychology That Stops Most Investors",
  "The Real Divide: Waiting vs Positioning",
  "Why This Cycle Is Different",
  "The Only Question That Matters",
  "Final Thought",
];

const WINDOW_MISS_PULL_QUOTES = [
  "Clarity comes after the opportunity. Not before it.",
  "Fear and opportunity peak at the same time.",
  "The market doesn’t announce opportunity. It hides it.",
];

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeArticleMarkdown(slug, body) {
  let next = body.replace(/\n?\s*⸻\s*\n?/g, "\n\n---\n\n");
  if (slug !== WINDOW_MISS_SLUG) return next;

  for (const heading of WINDOW_MISS_SECTION_HEADINGS) {
    const rx = new RegExp(`(^|\\n)${escapeRegex(heading)}(?=\\n|$)`, "g");
    next = next.replace(rx, `$1## ${heading}`);
  }

  for (const quote of WINDOW_MISS_PULL_QUOTES) {
    const rx = new RegExp(`(^|\\n)${escapeRegex(quote)}(?=\\n|$)`, "g");
    next = next.replace(rx, `$1> ${quote}`);
  }

  return next;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Not found" };

  const { meta } = post;
  const description =
    meta.description ||
    `Insight from ${SITE_NAME}: ${meta.title}. For informational purposes only.`;

  const base = publicPageMetadata({
    title: meta.title,
    description: description.length > 160 ? `${description.slice(0, 157)}…` : description,
    path: `/insights-education/${meta.slug}`,
  });

  const fullTitle = `${meta.title} | ${SITE_NAME}`;

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: meta.date || undefined,
      authors: meta.author ? [meta.author] : undefined,
      title: fullTitle,
    },
    twitter: {
      ...base.twitter,
      title: fullTitle,
    },
  };
}

function estimateReadingMinutes(markdown) {
  if (!markdown) return null;
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~\-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  if (!words) return null;
  return Math.max(1, Math.round(words / 220));
}

export default async function InsightPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const { meta, body } = post;
  const isWindowMostInvestorsMiss = meta.slug === WINDOW_MISS_SLUG;
  const normalizedBody = normalizeArticleMarkdown(meta.slug, body);
  const dek =
    isWindowMostInvestorsMiss ? "Most investors wait for clarity." : meta.description;
  const readingMinutes = estimateReadingMinutes(normalizedBody);
  const headings = extractMarkdownHeadings(normalizedBody);
  const tocSections = headings.map((h) => ({ id: h.id, label: h.text }));
  const hasToc = tocSections.length >= 2;
  const { teaser, gated } = splitMarkdownForGate(normalizedBody);
  const hasGate = Boolean(gated);

  return (
    <MarketingShell>
      <Container className="pb-20 pt-6 sm:pb-28 sm:pt-10">
        {/* Centered hero */}
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              <li>
                <Link
                  href="/insights-education"
                  className={cn(
                    "font-medium text-diversy-primary hover:underline",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40 rounded-sm"
                  )}
                >
                  Insights &amp; Education
                </Link>
              </li>
              <li className={cn("text-muted-foreground", brand.subtle)} aria-hidden>
                /
              </li>
              <li className={cn("truncate text-muted-foreground", brand.subtle)}>{meta.title}</li>
            </ol>
          </nav>

          <header className="mt-10 sm:mt-14">
            <div
              className={cn(
                "flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.22em]",
                brand.subtle
              )}
            >
              <span>Insights</span>
              <span aria-hidden className="text-border">·</span>
              <time dateTime={meta.date} className="font-medium tracking-[0.18em]">
                {formatBlogDate(meta.date)}
              </time>
              {readingMinutes ? (
                <>
                  <span aria-hidden className="text-border">·</span>
                  <span className="font-medium tracking-[0.18em]">{readingMinutes} min read</span>
                </>
              ) : null}
            </div>
            <h1
              className={cn(
                "mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-[3.25rem] sm:leading-[1.05]",
                brand.text
              )}
            >
              {meta.title}
            </h1>
            {dek ? (
              <p className="mt-5 max-w-2xl text-lg leading-[1.55] text-muted-foreground sm:text-xl">
                {dek}
              </p>
            ) : null}
            <p className={cn("mt-8 border-t border-border/60 pt-4 text-sm", brand.muted)}>
              <span className="text-muted-foreground">By </span>
              <span className="font-medium text-foreground">{meta.author}</span>
            </p>
          </header>
        </div>

        {/* Optional hero figure */}
        {isWindowMostInvestorsMiss ? (
          <figure className="mx-auto mt-10 max-w-4xl sm:mt-12">
            <Image
              src="/insights-education/the-window-most-investors-miss-hero.png"
              alt="The Window Most Investors Miss article visual"
              width={1536}
              height={768}
              priority
              className="h-auto w-full rounded-2xl object-cover ring-1 ring-border/60"
            />
          </figure>
        ) : null}

        {/* Two-column body */}
        <div
          className={cn(
            "mx-auto mt-12 max-w-6xl sm:mt-16",
            hasToc && "lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12"
          )}
        >
          {hasToc ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <EducationalPageToc sections={tocSections} />

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <p className={cn(eyebrow, "text-[10px]")}>Insights &amp; Education</p>
                  <p className={cn("mt-2 text-xs leading-relaxed", brand.muted)}>
                    Pair this read with the eligibility review when it speaks to the allocation you're weighing.
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <InvestCtaButton
                      source={`insights-${meta.slug}-sidebar`}
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
          ) : null}

          <div className="min-w-0">
            <article>
              <BlogProse markdown={teaser} />
              {hasGate ? (
                <ArticleGate slug={meta.slug} gatedMarkdown={gated} />
              ) : null}
            </article>

            {isWindowMostInvestorsMiss ? (
              <section
                aria-labelledby="eligibility-review-cta"
                className="mx-auto mt-16 max-w-3xl border-t border-border/70 pt-10 sm:mt-20"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
                  <div className="max-w-xl">
                    <h2
                      id="eligibility-review-cta"
                      className={cn(
                        "text-xl font-semibold leading-snug tracking-tight sm:text-2xl",
                        brand.text
                      )}
                    >
                      Want to understand whether this type of allocation fits your portfolio?
                    </h2>
                    <p className={cn("mt-3 text-sm leading-relaxed sm:text-base", brand.muted)}>
                      Start the eligibility review and our investor relations team will follow up with next steps.
                    </p>
                  </div>
                  <Button
                    href="https://crm.diversyfund.com/lp/vsl-todays-market/investor-quiz?contact_id=%7B%7Bcontact.id%7D%7D"
                    className="w-full shrink-0 sm:w-auto"
                  >
                    Book Appointment
                  </Button>
                </div>
              </section>
            ) : null}

            <footer className="mx-auto mt-16 max-w-3xl border-t border-border/70 pt-6 sm:mt-20">
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                This article is for general information only and does not constitute an offer to sell or a solicitation
                to buy securities. Investing involves risk, including loss of principal. Review offering documents and
                speak with qualified professionals before investing.
              </p>
              <Link
                href="/insights-education"
                className={cn(
                  "mt-6 inline-block text-sm font-medium text-diversy-primary hover:underline",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40 rounded-sm"
                )}
              >
                ← Back to Insights &amp; Education
              </Link>
            </footer>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
