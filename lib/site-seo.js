/**
 * Public site branding and canonical URL for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_APP_URL in production (e.g. https://www.diversyfund.com).
 */

export const SITE_NAME = "DiversyFund";

export const SITE_ORG_NAME = "DiversyFund";

/** Default meta description when a page does not override (public tagline). */
export const SITE_DEFAULT_DESCRIPTION =
  "Institutional fixed income platform for disciplined private-market allocation.";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://www.diversyfund.com";
}

export function getMetadataBase() {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL("https://www.diversyfund.com");
  }
}

/** Default Open Graph / Twitter image — logo on brand background (see scripts/generate-og-share.mjs). */
export const SITE_OG_IMAGE_PATH = "/images/og-diversyfund-share.png";

/**
 * Per-route metadata for public marketing pages (title uses root `template`).
 * @param {{ title: string, description: string, path: string }} opts
 */
export function publicPageMetadata({ title, description, path }) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
