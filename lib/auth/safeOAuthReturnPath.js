/**
 * Sanitize `from` on Google/LinkedIn OAuth start so AuthKit always returns
 * to a public marketing path (never `/admin` fallback from a bad state).
 */

const ALLOWED_PREFIXES = [
  "/incomeopportunity",
  "/book",
  "/insights-education",
  "/collateral",
  "/opportunities",
  "/lp",
];

const ALLOWED_QUERY_KEYS = new Set(["bookingSource", "tid", "slug"]);

/**
 * @param {string | null | undefined} fromRaw
 * @param {string} fallback
 * @returns {string}
 */
export function safeOAuthReturnPath(fromRaw, fallback) {
  const raw = typeof fromRaw === "string" ? fromRaw.trim() : "";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) {
    return fallback;
  }

  let url;
  try {
    url = new URL(raw, "https://diversyfund.com");
  } catch {
    return fallback;
  }

  const pathname = url.pathname;
  if (!ALLOWED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return fallback;
  }

  const kept = new URLSearchParams();
  for (const [key, value] of url.searchParams.entries()) {
    if (ALLOWED_QUERY_KEYS.has(key) && value) kept.set(key, value);
  }
  const qs = kept.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
