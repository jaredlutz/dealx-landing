/** Hosts that may appear in Google. Every other host is a preview or alias. */
export const INDEXABLE_HOSTS = new Set(["diversyfund.com", "www.diversyfund.com"]);

export const NON_INDEXABLE_ROBOTS_TXT = "User-agent: *\nDisallow: /\n";

/** @param {string | null | undefined} value */
export function hostnameFromHostHeader(value) {
  if (!value) return "";
  return value.split(",")[0].trim().split(":")[0].toLowerCase();
}

/** @param {string | null | undefined} host */
export function isIndexableHost(host) {
  return INDEXABLE_HOSTS.has(hostnameFromHostHeader(host));
}

/**
 * Public hostname for this request. Prefer the forwarded host so an internal
 * Vercel host cannot decide indexing for a custom domain.
 * @param {Request} request
 */
export function requestHostname(request) {
  return hostnameFromHostHeader(
    request.headers.get("x-forwarded-host") || request.headers.get("host"),
  );
}
