/**
 * Server-only: resolve booking URL from df-crm (same auth as premier-program ingest).
 * @param {Record<string, string | string[] | undefined>} searchParams Next.js `searchParams` shape
 * @param {"in_person" | "call"} variant in_person = visit workflow; call = phone / investor-call path
 * @returns {Promise<string>} booking URL or empty string if not configured / request failed
 */
export async function getPremierCrmBookingUrl(searchParams = {}, variant = "in_person") {
  const webhook =
    process.env.PREMIER_PROGRAM_WEBHOOK_URL?.trim() || process.env.PREMIER_SEAT_REQUEST_WEBHOOK_URL?.trim();
  const secret =
    process.env.PREMIER_PROGRAM_WEBHOOK_SECRET?.trim() ||
    process.env.PREMIER_SEAT_REQUEST_WEBHOOK_SECRET?.trim();
  if (!webhook || !secret) return "";

  let bookingBase;
  try {
    const u = new URL(webhook);
    u.pathname = u.pathname.replace(/\/premier-program\/?$/i, "/premier-booking-url");
    bookingBase = u.toString().replace(/\/$/, "");
  } catch {
    return "";
  }

  const params = new URLSearchParams();
  params.set("variant", variant === "call" ? "call" : "in_person");
  for (const key of ["utm_campaign", "utm_source", "utm_medium"]) {
    const raw = searchParams[key];
    const v = Array.isArray(raw) ? raw[0] : raw;
    if (typeof v === "string" && v.trim()) params.set(key, v.trim().slice(0, 120));
  }

  const qs = params.toString();
  const url = `${bookingBase}?${qs}`;

  try {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 12_000);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${secret}` },
      signal: ac.signal,
      cache: "no-store",
    });
    clearTimeout(timer);
    if (!res.ok) return "";
    const data = await res.json().catch(() => ({}));
    if (typeof data.bookingUrl !== "string" || !data.bookingUrl.trim()) return "";
    return data.bookingUrl.trim();
  } catch {
    return "";
  }
}
