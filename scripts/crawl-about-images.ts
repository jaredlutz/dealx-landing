/**
 * Crawl diversyfund.com/about-us and list all image URLs.
 * Run: bun run scripts/crawl-about-images.ts
 */
import * as cheerio from "cheerio";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { BASE } from "./migrate-urls";

const URL = `${BASE}/about-us/`;
const PUBLIC_DIR = join(process.cwd(), "public", "migrated", "content", "about");

function resolveUrl(base: string, href: string): string {
  if (href.startsWith("data:") || !href.trim()) return "";
  if (href.startsWith("http")) return href;
  try {
    const u = new URL(href, base);
    return u.href;
  } catch {
    return "";
  }
}

function collectAllImageUrls($: cheerio.CheerioAPI, pageUrl: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];

  $("img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src");
    const srcset = $(el).attr("srcset");
    const url = src || (srcset ? srcset.split(",")[0]?.trim().split(/\s+/)[0] : "");
    const abs = url ? resolveUrl(pageUrl, url) : "";
    if (abs && !seen.has(abs) && !abs.includes("pixel") && !abs.includes("gravatar")) {
      seen.add(abs);
      out.push(abs);
    }
  });

  $("[style]").each((_, el) => {
    const style = $(el).attr("style") || "";
    const match = style.match(/url\(['"]?([^'")]+)['"]?\)/g);
    if (match) {
      for (const m of match) {
        const url = m.replace(/url\(['"]?|['"]?\)/g, "").trim();
        const abs = resolveUrl(pageUrl, url);
        if (abs && !seen.has(abs) && /\.(jpe?g|png|gif|webp)/i.test(abs)) {
          seen.add(abs);
          out.push(abs);
        }
      }
    }
  });

  return out;
}

async function main() {
  console.log("Fetching", URL);
  const res = await fetch(URL, { headers: { "User-Agent": "DiversyFundCrawl/1.0" } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const urls = collectAllImageUrls($, URL);

  console.log("Found", urls.length, "image URLs");
  urls.forEach((u, i) => console.log(`  [${i}] ${u}`));

  await mkdir(PUBLIC_DIR, { recursive: true });
  const manifest = { pageUrl: URL, crawledAt: new Date().toISOString(), urls };
  await writeFile(join(PUBLIC_DIR, "crawl-result.json"), JSON.stringify(manifest, null, 2));
  console.log("\nWrote crawl-result.json");
}

main().catch(console.error);
