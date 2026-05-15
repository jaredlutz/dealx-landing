import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import Container from "@/components/ui/Container";
import { getAllPostsMeta, formatBlogDate } from "@/lib/blog";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

export const revalidate = 120;

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";

export function generateMetadata() {
  return publicPageMetadata({
    title: "Insights & Education",
    description:
      "Perspectives on private-market allocation, offering documentation, and investor resources from DiversyFund—not investment advice.",
    path: "/insights-education",
  });
}

function CoverPlate({ post }) {
  if (post.cover) {
    return (
      <Image
        src={post.cover}
        alt={post.coverAlt || post.title}
        width={1024}
        height={640}
        className="h-full w-full object-cover"
        sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
      />
    );
  }
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-end p-5",
        "bg-[linear-gradient(135deg,rgba(0,94,224,0.18)_0%,rgba(0,94,224,0.04)_55%,transparent_100%)]",
        "dark:bg-[linear-gradient(135deg,rgba(0,94,224,0.32)_0%,rgba(0,94,224,0.08)_55%,transparent_100%)]"
      )}
    >
      <div className="pointer-events-none absolute left-5 top-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-diversy-primary">
          {post.category}
        </span>
      </div>
      <p
        className={cn(
          "max-w-[18ch] text-balance text-lg font-semibold leading-snug tracking-tight sm:text-xl",
          brand.text
        )}
      >
        {post.title}
      </p>
    </div>
  );
}

function InsightCard({ post }) {
  const hasCover = Boolean(post.cover);
  return (
    <Link
      href={`/insights-education/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition",
        "hover:border-diversy-primary/35 hover:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40"
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted">
        <CoverPlate post={post} />
      </div>
      <div className="flex h-full flex-col p-6">
        {hasCover ? (
          <>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className={cn("text-[11px] font-semibold uppercase tracking-[0.16em]", brand.subtle)}>
                {post.category}
              </span>
              {post.date ? (
                <time
                  dateTime={post.date}
                  className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {formatBlogDate(post.date)}
                </time>
              ) : null}
            </div>
            <h2 className={cn("mt-3 text-lg font-semibold leading-snug tracking-tight sm:text-xl", brand.text)}>
              {post.title}
            </h2>
          </>
        ) : null}
        {post.description ? (
          <p
            className={cn(
              "line-clamp-4 flex-1 text-sm leading-relaxed sm:text-[15px]",
              hasCover ? "mt-3" : "mt-0",
              brand.muted
            )}
          >
            {post.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-diversy-primary">
          <span
            className={cn(
              "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-sm",
              "bg-foreground text-background transition group-hover:bg-diversy-primary group-hover:text-white"
            )}
            aria-hidden
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </span>
          Read insight
        </span>
      </div>
    </Link>
  );
}

export default async function InsightsEducationIndexPage() {
  const posts = await getAllPostsMeta();
  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <MarketingShell>
      <div>
        <div
          className={cn(
            "relative overflow-hidden border-b border-border bg-background",
            "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_100%_70%_at_88%_-15%,rgba(0,94,224,0.085),transparent_58%)]",
            "dark:before:bg-[radial-gradient(ellipse_90%_60%_at_92%_-8%,rgba(0,94,224,0.16),transparent_52%)]"
          )}
        >
          <Container className="py-8 sm:py-12">
            <div className="mx-auto max-w-3xl">
              <p className={cn(eyebrow, "mb-3")}>Insights &amp; Education</p>
              <h1 className={cn("text-3xl font-semibold tracking-tight sm:text-4xl", brand.text)}>
                Perspective for serious private-market investors
              </h1>
              <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", brand.muted)}>
                Commentary, process notes, and practical guides—alongside the documents and tools you need to evaluate
                our programs. Not personalized advice; always read offering materials and consult your professionals.
              </p>
            </div>
          </Container>
        </div>

        <Container className="py-10 sm:py-14">
          {featured.length === 0 ? (
            <p className={cn("text-sm", brand.muted)}>No insights published yet.</p>
          ) : (
            <>
              <h2 className={cn("text-lg font-semibold tracking-tight", brand.text)}>Featured</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((post) => (
                  <InsightCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </Container>

        <Container className="border-b border-border py-3">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link
              href="/documents"
              className={cn(
                "inline-flex items-center gap-1 font-medium text-foreground hover:text-diversy-primary",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40 rounded-sm"
              )}
            >
              <span className="text-diversy-primary" aria-hidden>
                ›
              </span>
              Documents library
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-1 font-medium text-foreground hover:text-diversy-primary",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40 rounded-sm"
              )}
            >
              <span className="text-diversy-primary" aria-hidden>
                ›
              </span>
              Contact
            </Link>
          </div>
        </Container>

        <Container className="pb-16 pt-12 sm:pb-20">
          {rest.length > 0 ? (
            <>
              <h2 className={cn("text-lg font-semibold tracking-tight", brand.text)}>More insights</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <InsightCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : null}
        </Container>
      </div>
    </MarketingShell>
  );
}
