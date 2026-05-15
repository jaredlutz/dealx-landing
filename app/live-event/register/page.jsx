import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Globe2,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";
import Container from "@/components/ui/Container";
import WebinarScorecardForm from "@/components/webinar/WebinarScorecardForm";
import {
  formatLiveEventDurationLabel,
  formatLiveEventWhen,
  isRegistrationOpen,
  resolveLiveEvent,
} from "@/lib/live-events";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

const ROUTE_PATH = "/live-event/register";

export async function generateMetadata({ searchParams }) {
  const slug = typeof searchParams?.event === "string" ? searchParams.event : null;
  const event = resolveLiveEvent(slug);
  const title = event
    ? `Register · ${event.title}`
    : "Live event registration";
  const description = event?.summary
    ? `${event.summary} Complete the institutional readiness scorecard to reserve your seat.`
    : "Reserve your seat for the next DiversyFund live fixed-income briefing.";
  return publicPageMetadata({
    title,
    description,
    path: ROUTE_PATH,
  });
}

function FormatIcon({ format }) {
  if (format === "in_person") return MapPin;
  if (format === "hybrid") return Globe2;
  return Globe2;
}

export default function LiveEventRegisterPage({ searchParams }) {
  const slug = typeof searchParams?.event === "string" ? searchParams.event : null;
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
              No live session is currently scheduled
            </h1>
            <p className={cn("mt-3 text-sm leading-relaxed sm:text-base", brand.muted)}>
              You can still review the on-demand briefing or talk with our investor team.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/fixed-income-webinar"
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-diversy-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-diversy-primary-hover"
                )}
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

  const registrationOpen = isRegistrationOpen(event);
  const whenLabel = formatLiveEventWhen(event);
  const durationLabel = formatLiveEventDurationLabel(event);
  const VenueIcon = FormatIcon({ format: event.format });

  const redirectTo = `/live-event/registered?event=${encodeURIComponent(event.slug)}`;

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
                {event.eyebrow ?? "Live session · Accredited investors"}
              </p>
              <h1
                className={cn(
                  "mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl",
                  brand.text
                )}
              >
                {event.title}
              </h1>
              <p className={cn("mt-5 max-w-xl text-base leading-relaxed sm:text-lg", brand.muted)}>
                {event.summary}
              </p>

              <dl className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">
                    <CalendarClock className="h-4 w-4" aria-hidden />
                    When
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-snug text-foreground">{whenLabel}</dd>
                  {durationLabel ? (
                    <p className="mt-1 text-xs text-muted-foreground">Runs about {durationLabel}.</p>
                  ) : null}
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
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
                  <div className="rounded-xl border border-border bg-card p-4 sm:col-span-2">
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
                <div className="mt-7 rounded-2xl border border-border bg-card p-5">
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

              {event.seatLimit ? (
                <p className="mt-4 text-xs text-muted-foreground">
                  Seating is intentionally limited (≤ {event.seatLimit}) to keep the Q&A productive.
                </p>
              ) : null}
            </div>

            <div className="lg:col-span-6">
              <div id="register" className="lg:sticky lg:top-8">
                {registrationOpen ? (
                  <WebinarScorecardForm eventSlug={event.slug} redirectTo={redirectTo} />
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
                      Registration closed
                    </p>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      This live session is no longer accepting registrations
                    </h2>
                    <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                      The on-demand briefing covers the same market read at your own pace, and our investor
                      team is available for a private conversation when you’re ready.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {Array.isArray(event.whatYoullSee) && event.whatYoullSee.length > 0 ? (
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diversy-primary">
              What you’ll see in the session
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Institutional read, plain language
            </h2>
            <p className={cn("mt-4 max-w-3xl text-base leading-relaxed sm:text-lg", brand.muted)}>
              The scorecard takes about three minutes and there is no fee. Your responses are private; the
              readiness snapshot we email afterwards is directional only and tied to offering documents where
              relevant.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {event.whatYoullSee.map((line, i) => (
                <div key={line} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      ) : null}

      <Container className="pb-16 sm:pb-20">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-diversy-primary" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-diversy-primary">
                Educational only · Not an offer
              </p>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                This session and the readiness scorecard are educational context for accredited investors.
                They are not investment advice, a suitability determination, or any promise of access,
                approval, or performance. Securities, when offered, are made available solely by prospectus or
                private placement memorandum, which contains complete information including risk factors. By
                registering you agree we may contact you about this session and related materials.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
