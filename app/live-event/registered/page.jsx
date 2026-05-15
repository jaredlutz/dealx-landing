import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  ChevronRight,
  Download,
  Globe2,
  MapPin,
  Mail,
  UsersRound,
} from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import Container from "@/components/ui/Container";
import {
  buildLiveEventCalendarLinks,
  formatLiveEventDurationLabel,
  formatLiveEventWhen,
  resolveLiveEvent,
} from "@/lib/live-events";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

const ROUTE_PATH = "/live-event/registered";

export async function generateMetadata({ searchParams }) {
  const slug = typeof searchParams?.event === "string" ? searchParams.event : null;
  const event = resolveLiveEvent(slug);
  return {
    ...publicPageMetadata({
      title: event ? `You're registered · ${event.title}` : "You're registered for the live event",
      description: "Confirmation, calendar add, and what to expect for the live DiversyFund fixed-income briefing.",
      path: ROUTE_PATH,
    }),
    robots: { index: false, follow: false },
  };
}

function tierLabel(tier) {
  if (tier === "high") return "Ready to move";
  if (tier === "medium") return "Engaged — clarifying";
  return "Research stage";
}

function tierBlurb(tier) {
  if (tier === "high") {
    return "Your timeline and intent match investors who typically progress directly to document review.";
  }
  if (tier === "medium") {
    return "You’re past casual research — the live session plus a focused follow-up can map our structure to your constraints.";
  }
  return "Education-first paths are completely valid. The live session and replay both cover the same market read.";
}

function parseQueryParam(searchParams, key) {
  if (!searchParams) return null;
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" ? value : null;
}

function parseScore(value) {
  const n = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(100, n));
}

function parseTier(value) {
  return value === "high" || value === "medium" || value === "low" ? value : null;
}

function FormatIcon({ format }) {
  if (format === "in_person") return MapPin;
  return Globe2;
}

export default function LiveEventRegisteredPage({ searchParams }) {
  const slug = parseQueryParam(searchParams, "event");
  const event = resolveLiveEvent(slug);

  if (!event) {
    return (
      <MarketingShell>
        <Container className="py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
              Live event
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              We couldn’t find that session
            </h1>
            <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
              Open the briefing replay or get in touch with our investor team.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/fixed-income-webinar"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-diversy-primary-hover"
              >
                Open the briefing
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:border-diversy-primary/35 hover:bg-muted/30"
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

  const firstName = (parseQueryParam(searchParams, "name") ?? "").trim().slice(0, 80);
  const scorePct = parseScore(parseQueryParam(searchParams, "score"));
  const tier = parseTier(parseQueryParam(searchParams, "tier"));
  const qualified = parseQueryParam(searchParams, "qualified") === "1";
  const hasSnapshot = scorePct != null && tier != null;

  const whenLabel = formatLiveEventWhen(event);
  const durationLabel = formatLiveEventDurationLabel(event);
  const VenueIcon = FormatIcon({ format: event.format });
  const cal = buildLiveEventCalendarLinks(event);
  const icsFileName = `diversyfund-${event.slug}.ics`;

  const greeting = firstName ? `${firstName}, you’re registered.` : "You’re registered.";

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
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              Registered
            </div>
            <h1
              className={cn(
                "mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl",
                brand.text
              )}
            >
              {greeting}
            </h1>
            <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", brand.muted)}>
              Your seat for <span className="font-medium text-foreground">{event.title}</span> is confirmed.
              We just emailed the join details to the address you used. Add the session to your calendar below
              so the link is one click away when it starts.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-3xl gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
              Live session details
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {event.title}
            </h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">
                  <CalendarClock className="h-4 w-4" aria-hidden />
                  When
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-foreground">{whenLabel}</dd>
                {durationLabel ? (
                  <p className="mt-1 text-xs text-muted-foreground">Runs about {durationLabel}.</p>
                ) : null}
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">
                  <VenueIcon className="h-4 w-4" aria-hidden />
                  Where
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                  {event.location}
                </dd>
                {event.locationDetail ? (
                  <p className="mt-1 text-xs text-muted-foreground">{event.locationDetail}</p>
                ) : null}
              </div>
              {event.host?.name ? (
                <div className="rounded-xl border border-border bg-background p-4 sm:col-span-2">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">
                    <UsersRound className="h-4 w-4" aria-hidden />
                    Hosted by
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                    {event.host.name}
                    {event.host.title ? (
                      <span className="font-normal text-muted-foreground"> · {event.host.title}</span>
                    ) : null}
                  </dd>
                </div>
              ) : null}
            </dl>

            {Array.isArray(event.agenda) && event.agenda.length > 0 ? (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
                  Agenda
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground">
                  {event.agenda.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
              <CalendarPlus className="h-4 w-4" aria-hidden />
              Add to your calendar
            </p>
            <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
              Pick the calendar you actually use. The .ics download works with Apple Calendar, Outlook
              desktop, and any RFC-compliant client.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <CalendarLink href={cal?.google} label="Add to Google Calendar" external />
              <CalendarLink href={cal?.outlook} label="Add to Outlook (web)" external />
              <CalendarLink href={cal?.yahoo} label="Add to Yahoo Calendar" external />
              <CalendarLink href={cal?.ics} label="Download .ics file" download={icsFileName} />
            </div>
          </div>

          {hasSnapshot ? (
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary">
                Readiness snapshot
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Where your responses land today
              </h3>
              <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                Educational context only — not investment advice, a suitability determination, or any promise
                of access, approval, or performance.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-6">
                <div className="rounded-xl border border-border bg-muted/30 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Readiness index
                  </p>
                  <p className="mt-1 text-4xl font-semibold tabular-nums tracking-tight text-foreground">
                    {scorePct}
                    <span className="ml-0.5 text-xl text-muted-foreground">%</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">
                    {tierLabel(tier)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tierBlurb(tier)}</p>
                </div>
              </div>

              {qualified ? (
                <p className="mt-4 rounded-xl border border-diversy-primary/30 bg-diversy-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground">
                  Your responses qualify for a private review with our investor team. We’ll reach out
                  individually after the live session.
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
              Before the session
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Useful context to skim
            </h3>
            <ul className="mt-4 space-y-3">
              {(event.resources?.length
                ? event.resources
                : [
                    { label: "Open the on-demand briefing deck", href: "/fixed-income-webinar" },
                    { label: "Review offering circular", href: "/offering-circular" },
                  ]
              ).map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:border-diversy-primary/35 hover:bg-muted/30"
                  >
                    <span>{r.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:text-diversy-primary" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
              <span>
                Didn’t get the confirmation email? Check spam, then{" "}
                <Link
                  href="/contact"
                  className="font-medium text-diversy-primary underline-offset-2 hover:underline"
                >
                  reach out to the investor team
                </Link>{" "}
                and we’ll resend it.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}

function CalendarLink({ href, label, external, download }) {
  if (!href) return null;
  const className = cn(
    "inline-flex min-h-[44px] w-full items-center justify-between gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition",
    "hover:border-diversy-primary/35 hover:bg-muted/30"
  );
  const icon = download ? (
    <Download className="h-4 w-4 text-muted-foreground" aria-hidden />
  ) : (
    <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
  );
  if (download) {
    return (
      <a href={href} download={download} className={className}>
        <span>{label}</span>
        {icon}
      </a>
    );
  }
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      <span>{label}</span>
      {icon}
    </a>
  );
}
