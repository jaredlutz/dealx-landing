import { getSiteUrl } from "@/lib/site-seo";

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  const base = getSiteUrl();
  let host = "www.diversyfund.com";
  try {
    host = new URL(base).host;
  } catch {
    /* keep default */
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/callback",
        "/api/",
        "/premier-program",
        "/premier-program/in-person",
        "/premier-program/private-invitation",
        "/live-event/registered",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
    host,
  };
}
