import { getAllPostsMeta } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site-seo";

/** @returns {Promise<import("next").MetadataRoute.Sitemap>} */
export default async function sitemap() {
  const base = getSiteUrl();
  const posts = await getAllPostsMeta();
  const paths = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/insights-education", changeFrequency: "weekly", priority: 0.75 },
    ...posts.map((p) => ({
      path: `/insights-education/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.55,
    })),
    { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
    { path: "/support", changeFrequency: "monthly", priority: 0.85 },
    { path: "/documents", changeFrequency: "monthly", priority: 0.75 },
    { path: "/strategies", changeFrequency: "monthly", priority: 0.85 },
    { path: "/insights-education/income-vs-growth", changeFrequency: "monthly", priority: 0.7 },
    { path: "/insights-education/ira", changeFrequency: "monthly", priority: 0.7 },
    { path: "/insights-education/retirement-accounts", changeFrequency: "monthly", priority: 0.7 },
    { path: "/opportunities/distressed-income-fund", changeFrequency: "weekly", priority: 0.85 },
    { path: "/opportunities/df-income", changeFrequency: "weekly", priority: 0.7 },
    { path: "/webinar-registration", changeFrequency: "weekly", priority: 0.8 },
    { path: "/live-event/register", changeFrequency: "weekly", priority: 0.85 },
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
