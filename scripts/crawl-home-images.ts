/**
 * Crawl diversyfund.com homepage: download every image in DOM order,
 * save to public/migrated/home/ for use in the rebuild.
 *
 * Run: bun run scripts/crawl-home-images.ts [--dry-run]
 */
import * as cheerio from "cheerio";
import type { Element } from "domhandler";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { BASE } from "./migrate-urls";

const DRY_RUN = process.argv.includes("--dry-run");
const HOME_URL = `${BASE}/`;
const SUBDIR = "home";
const PUBLIC_DIR = join(process.cwd(), "public", "migrated");
const OUT_DIR = join(PUBLIC_DIR, SUBDIR);

function resolveUrl(base: string, href: string): string {
  if (href.startsWith("data:") || !href.trim()) return "";
  if (href.startsWith("http")) return href;
  try {
    const u = new URL(href, base);
    return u.origin === "https://www.diversyfund.com" ? u.href : "";
  } catch {
    return "";
  }
}

function isSkipUrl(url: string): boolean {
  return (
    /\.(ico|svg)(\?|$)/i.test(url) ||
    /pixel|tracking|1x1|gravatar|logo.*small/i.test(url)
  );
}

function getPrimaryUrl($: cheerio.CheerioAPI, el: Element, pageUrl: string): string | null {
  const src = $(el).attr("src");
  if (src) {
    const abs = resolveUrl(pageUrl, src);
    if (abs && !isSkipUrl(abs)) return abs;
  }
  const srcset = $(el).attr("srcset");
  if (srcset) {
    const first = srcset.split(",")[0]?.trim().split(/\s+/)[0];
    if (first) {
      const abs = resolveUrl(pageUrl, first);
      if (abs && !isSkipUrl(abs)) return abs;
    }
  }
  return null;
}

function collectHomeImages($: cheerio.CheerioAPI, pageUrl: string): Array<{ url: string; alt?: string }> {
  const seen = new Set<string>();
  const out: Array<{ url: string; alt?: string }> = [];
  $("img").each((_, el) => {
    const url = getPrimaryUrl($, el, pageUrl);
    if (!url || seen.has(url)) return;
    seen.add(url);
    out.push({ url, alt: $(el).attr("alt") ?? undefined });
  });
  return out;
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "DiversyFundCrawl/1.0" },
  });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

async function downloadImage(
  imageUrl: string,
  index: number,
  dryRun: boolean
): Promise<string> {
  const ext = imageUrl.match(/\.(jpe?g|png|gif|webp)(\?|$)/i)?.[1] || "jpg";
  const filename = `home-${index}.${ext}`;
  const relPath = `/migrated/${SUBDIR}/${filename}`;
  if (dryRun) return relPath;
  await mkdir(OUT_DIR, { recursive: true });
  const res = await fetch(imageUrl, {
    headers: { "User-Agent": "DiversyFundCrawl/1.0" },
  });
  if (!res.ok) throw new Error(`${imageUrl} ${res.status}`);
  const buf = await res.arrayBuffer();
  await writeFile(join(OUT_DIR, filename), Buffer.from(buf));
  return relPath;
}

async function main() {
  console.log(DRY_RUN ? "DRY RUN – no downloads" : "Crawling diversyfund.com homepage images...");
  console.log("URL:", HOME_URL);

  const html = await fetchHtml(HOME_URL);
  const $ = cheerio.load(html);
  const images = collectHomeImages($, HOME_URL);

  console.log(`Found ${images.length} images in DOM order.`);

  const manifest: Array<{
    index: number;
    sourceUrl: string;
    localPath: string;
  }> = [];

  for (let i = 0; i < images.length; i++) {
    const { url } = images[i];
    let localPath: string;
    try {
      localPath = await downloadImage(url, i, DRY_RUN);
    } catch (e) {
      console.warn(`  [${i}] download failed:`, e instanceof Error ? e.message : url);
      manifest.push({ index: i, sourceUrl: url, localPath: "" });
      continue;
    }
    manifest.push({ index: i, sourceUrl: url, localPath });
    console.log(`  [${i}] → ${localPath}`);
  }

  if (!DRY_RUN && manifest.length > 0) {
    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(
      join(OUT_DIR, "manifest.json"),
      JSON.stringify({ homeUrl: HOME_URL, crawledAt: new Date().toISOString(), images: manifest }, null, 2)
    );
    console.log("\nWrote public/migrated/home/manifest.json");
  }

  console.log(DRY_RUN ? "\nDry run complete. Run without --dry-run to download." : "\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
