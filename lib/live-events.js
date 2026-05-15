/**
 * Live event registrations (live webinars + in-person briefings).
 *
 * The registration URL is `/live-event/register?event=<slug>`; the
 * post-submission confirmation is `/live-event/registered?event=<slug>&...`.
 * Both routes look up the active event by slug here. To roll the next session
 * forward, set `active: false` on the previous event and add (or flip `active`
 * on) the next one — no page changes required.
 *
 * Format choices:
 * - "online" → Zoom / live stream; `location` is the platform name
 * - "in_person" → physical address goes in `location`
 * - "hybrid"   → both; render the location verbatim
 */

export const LIVE_EVENTS = [
  {
    slug: "fixed-income-q1-2026",
    active: true,
    title: "Fixed Income Webinar — Q1 2026 Market Briefing",
    eyebrow: "Live session for accredited investors",
    summary:
      "A live walkthrough of the current fixed income market: supply and demand reset, the 2024-2027 debt maturity wall, refinance pressure, and what disciplined fixed-income strategies are pricing right now.",
    /** ISO with timezone offset; `formatLiveEventWhen` re-renders in `timezone`. */
    startAt: "2026-05-20T21:00:00.000Z",
    durationMinutes: 60,
    timezone: "America/Los_Angeles",
    format: "online",
    location: "Online — Zoom",
    locationDetail: "Join link delivered to the email used at registration.",
    host: {
      name: "DiversyFund CEO",
      title: "Craig Cecilio",
    },
    agenda: [
      "Supply and demand reset — permits, starts, deliveries",
      "Debt maturity wall and refinance pressure into 2027",
      "Pricing and allocation implications for fixed-income capital",
      "Live Q&A with Craig Cecilio",
    ],
    /** Surfaced on register + registered pages; keep institutional. */
    whatYoullSee: [
      "How current supply signals are reshaping multifamily fundamentals",
      "Why coupon resets are forcing recapitalizations and where that creates basis-sensitive opportunity",
      "How DiversyFund underwrites structure, collateral, and priority of payment",
    ],
    /** Optional registration close (ISO). When past, registration is closed. */
    registrationCloseAt: "2026-05-20T20:30:00.000Z",
    /** Optional seat ceiling for messaging; not enforced. */
    seatLimit: 100,
    /** Resource links shown on the registered page. */
    resources: [
      { label: "Open the on-demand briefing deck", href: "/fixed-income-webinar" },
      { label: "Review offering circular", href: "/offering-circular" },
    ],
  },
];

export function getLiveEventBySlug(slug) {
  if (!slug || typeof slug !== "string") return null;
  return LIVE_EVENTS.find((e) => e.slug === slug.trim()) ?? null;
}

/**
 * Default event for the register / registered routes when no slug is provided:
 * the soonest upcoming `active` event whose `startAt` is in the future.
 * Falls back to the soonest upcoming event regardless of `active`, then to the
 * first event in `LIVE_EVENTS` so the page always renders something.
 */
export function getActiveLiveEvent(now = new Date()) {
  const ms = now.getTime();
  const upcoming = LIVE_EVENTS.filter((e) => new Date(e.startAt).getTime() >= ms);
  const active = upcoming.filter((e) => e.active);
  if (active.length > 0) {
    return active.sort((a, b) => new Date(a.startAt) - new Date(b.startAt))[0];
  }
  if (upcoming.length > 0) {
    return upcoming.sort((a, b) => new Date(a.startAt) - new Date(b.startAt))[0];
  }
  return LIVE_EVENTS[0] ?? null;
}

export function resolveLiveEvent(slug) {
  return getLiveEventBySlug(slug) ?? getActiveLiveEvent();
}

export function isRegistrationOpen(event, now = new Date()) {
  if (!event) return false;
  if (event.registrationCloseAt) {
    if (new Date(event.registrationCloseAt).getTime() <= now.getTime()) return false;
  }
  return new Date(event.startAt).getTime() >= now.getTime();
}

function partsFromDate(date, timezone) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
    timeZone: timezone,
  }).formatToParts(date);
}

function getPart(parts, type) {
  return parts.find((p) => p.type === type)?.value ?? "";
}

/**
 * Render the event window in its timezone, e.g.
 * `Wednesday, May 20, 2026 · 2:00 – 3:00 PM PDT`.
 */
export function formatLiveEventWhen(event) {
  if (!event) return "";
  const start = new Date(event.startAt);
  const end = new Date(start.getTime() + (event.durationMinutes ?? 60) * 60_000);
  const startParts = partsFromDate(start, event.timezone);
  const endParts = partsFromDate(end, event.timezone);

  const date =
    `${getPart(startParts, "weekday")}, ` +
    `${getPart(startParts, "month")} ${getPart(startParts, "day")}, ${getPart(startParts, "year")}`;
  const startTime = `${getPart(startParts, "hour")}:${getPart(startParts, "minute")} ${getPart(
    startParts,
    "dayPeriod"
  )}`;
  const endTime = `${getPart(endParts, "hour")}:${getPart(endParts, "minute")} ${getPart(
    endParts,
    "dayPeriod"
  )}`;
  const tz = getPart(endParts, "timeZoneName");
  return `${date} · ${startTime} – ${endTime} ${tz}`;
}

export function formatLiveEventDurationLabel(event) {
  if (!event?.durationMinutes) return "";
  const m = event.durationMinutes;
  if (m % 60 === 0) {
    const h = m / 60;
    return `${h} hour${h === 1 ? "" : "s"}`;
  }
  return `${m} minutes`;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function icsUtc(date) {
  const d = new Date(date);
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function googleCalUtc(date) {
  return icsUtc(date);
}

function escapeIcs(value) {
  if (!value) return "";
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Site origin for ICS URL / UID. Caller can pass an override. */
function siteOrigin(siteUrl) {
  if (siteUrl && typeof siteUrl === "string") return siteUrl.replace(/\/$/, "");
  const env = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (env) return env.replace(/\/$/, "");
  return "https://www.diversyfund.com";
}

export function buildLiveEventIcs(event, { siteUrl } = {}) {
  if (!event) return "";
  const origin = siteOrigin(siteUrl);
  const start = new Date(event.startAt);
  const end = new Date(start.getTime() + (event.durationMinutes ?? 60) * 60_000);
  const url = `${origin}/live-event/register?event=${encodeURIComponent(event.slug)}`;
  const description = [event.summary, "", "Agenda:", ...event.agenda.map((a) => `- ${a}`)]
    .filter(Boolean)
    .join("\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DiversyFund//Live Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:live-event-${event.slug}@diversyfund.com`,
    `DTSTAMP:${icsUtc(new Date())}`,
    `DTSTART:${icsUtc(start)}`,
    `DTEND:${icsUtc(end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(event.location ?? "")}`,
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Returns data URI (base64) so callers can render `<a href download>` without
 * a separate API route. Safe to embed server-side.
 */
export function buildLiveEventIcsDataUrl(event, opts) {
  const body = buildLiveEventIcs(event, opts);
  if (!body) return "";
  const b64 = Buffer.from(body, "utf8").toString("base64");
  return `data:text/calendar;charset=utf-8;base64,${b64}`;
}

export function buildLiveEventCalendarLinks(event, { siteUrl } = {}) {
  if (!event) return null;
  const origin = siteOrigin(siteUrl);
  const start = new Date(event.startAt);
  const end = new Date(start.getTime() + (event.durationMinutes ?? 60) * 60_000);
  const url = `${origin}/live-event/register?event=${encodeURIComponent(event.slug)}`;

  const description = [event.summary, "", `Register / details: ${url}`]
    .filter(Boolean)
    .join("\n");

  const google = new URL("https://www.google.com/calendar/render");
  google.searchParams.set("action", "TEMPLATE");
  google.searchParams.set("text", event.title);
  google.searchParams.set("dates", `${googleCalUtc(start)}/${googleCalUtc(end)}`);
  google.searchParams.set("details", description);
  if (event.location) google.searchParams.set("location", event.location);

  const outlook = new URL("https://outlook.live.com/calendar/0/deeplink/compose");
  outlook.searchParams.set("path", "/calendar/action/compose");
  outlook.searchParams.set("rru", "addevent");
  outlook.searchParams.set("subject", event.title);
  outlook.searchParams.set("body", description);
  outlook.searchParams.set("startdt", start.toISOString());
  outlook.searchParams.set("enddt", end.toISOString());
  if (event.location) outlook.searchParams.set("location", event.location);

  const yahoo = new URL("https://calendar.yahoo.com/");
  yahoo.searchParams.set("v", "60");
  yahoo.searchParams.set("title", event.title);
  yahoo.searchParams.set("st", googleCalUtc(start));
  yahoo.searchParams.set("dur", "0100");
  yahoo.searchParams.set("desc", description);
  if (event.location) yahoo.searchParams.set("in_loc", event.location);

  return {
    google: google.toString(),
    outlook: outlook.toString(),
    yahoo: yahoo.toString(),
    ics: buildLiveEventIcsDataUrl(event, { siteUrl: origin }),
  };
}
