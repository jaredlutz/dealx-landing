/**
 * Discover all internal URLs and images from diversyfund.com.
 * Run: bun run scripts/discover-urls.ts
 */
import * as cheerio from "cheerio";

const BASE = "https://www.diversyfund.com";
const ORIGIN = "https://www.diversyfund.com";

const START_URLS = [
  "/",
  "/about-us/",
  "/investment-opportunities/",
  "/investment-opportunities/fund-v-accredited/",
  "/contact/",
];

const seenUrls = new Set<string>();
const seenImages = new Set<string>();
const toVisit: string[] = [...START_URLS];

function resolveUrl(base: string, href: string): string | null {
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) return null;
  if (href.startsWith("http")) {
    if (href.startsWith(ORIGIN)) return href;
    return null;
  }
  try {
    const u = new URL(href, base);
    if (u.origin !== ORIGIN) return null;
    return u.pathname.endsWith("/") ? u.href : u.href.replace(/\/?$/, "/");
  } catch {
    return null;
  }
}

function isSkipPath(path: string): boolean {
  return (
    path.includes("/wp-") ||
    path.includes("/feed") ||
    path.includes("/category/") ||
    path.includes("/tag/") ||
    path.includes("/author/") ||
    path.includes("/blog/") ||
    path.includes("/page/") ||
    path.endsWith(".xml") ||
    path.endsWith(".pdf")
  );
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "DiversyFundCrawl/1.0" } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

async function main() {
  console.log("Discovering URLs from diversyfund.com...\n");

  while (toVisit.length > 0) {
    const path = toVisit.pop()!;
    const url = path.startsWith("http") ? path : BASE + path;
    if (seenUrls.has(url)) continue;
    seenUrls.add(url);

    try {
      const html = await fetchHtml(url);
      await new Promise((r) => setTimeout(r, 500));
      const $ = cheerio.load(html);

      $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        const resolved = resolveUrl(url, href ?? "");
        if (resolved && !isSkipPath(new URL(resolved).pathname)) {
          const pathname = new URL(resolved).pathname || "/";
          const full = resolved.endsWith("/") ? resolved : resolved + "/";
          if (!seenUrls.has(full)) toVisit.push(full);
        }
      });

      $("img[src]").each((_, el) => {
        const src = $(el).attr("src");
        if (!src || src.startsWith("data:")) return;
        try {
          const abs = new URL(src, url).href;
          if (abs.startsWith(ORIGIN) && !/\.(ico|svg)(\?|$)/i.test(abs)) {
            seenImages.add(abs);
          }
        } catch {
          // skip
        }
      });

      $("img[srcset]").each((_, el) => {
        const srcset = $(el).attr("srcset");
        if (!srcset) return;
        srcset.split(",").forEach((part) => {
          const u = part.trim().split(/\s+/)[0];
          if (u) {
            try {
              const abs = new URL(u, url).href;
              if (abs.startsWith(ORIGIN) && !/\.(ico|svg)(\?|$)/i.test(abs)) {
                seenImages.add(abs);
              }
            } catch {
              // skip
            }
          }
        });
      });

      console.log("  ", url);
    } catch (e) {
      console.warn("  FAILED:", url, e instanceof Error ? e.message : "");
    }
  }

  const urls = [...seenUrls].sort();
  const images = [...seenImages].sort();

  console.log("\n--- URLs (" + urls.length + ") ---");
  urls.forEach((u) => console.log(u));

  console.log("\n--- Images (" + images.length + ") ---");
  images.forEach((u) => console.log(u));

  const { writeFile } = await import("fs/promises");
  const { join } = await import("path");
  await writeFile(
    join(process.cwd(), "docs", "discovered-urls.json"),
    JSON.stringify({ urls, images, crawledAt: new Date().toISOString() }, null, 2)
  );
  console.log("\nWrote docs/discovered-urls.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
