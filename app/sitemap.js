import { getSiteUrl } from "@/lib/site-seo";

/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
  const base = getSiteUrl();
  const paths = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
    { path: "/support", changeFrequency: "monthly", priority: 0.85 },
    { path: "/documents", changeFrequency: "monthly", priority: 0.75 },
    { path: "/premier-program", changeFrequency: "monthly", priority: 0.7 },
    { path: "/offering-circular", changeFrequency: "monthly", priority: 0.7 },
    { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.5 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.5 },
    { path: "/sms-terms", changeFrequency: "yearly", priority: 0.5 },
  ];

  const now = new Date();

  return paths.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${base}${path}` : `${base}/`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
