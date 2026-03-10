/**
 * Full-site image crawl for diversyfund.com.
 * Downloads images from home + all content pages to public/migrated/
 *
 * Run: bun run scripts/crawl-all-pages.ts [--dry-run]
 */
import * as cheerio from "cheerio";
import type { Element } from "domhandler";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { BASE, CONTENT_PAGES } from "./migrate-urls";

const DRY_RUN = process.argv.includes("--dry-run");
const THROTTLE_MS = 800;
const PUBLIC_DIR = join(process.cwd(), "public", "migrated");
const ORIGIN = "https://www.diversyfund.com";

const urlToLocal = new Map<string, string>();

function resolveUrl(base: string, href: string): string {
  if (href.startsWith("data:") || !href.trim()) return "";
  if (href.startsWith("http")) return href;
  try {
    const u = new URL(href, base);
    return u.origin === ORIGIN ? u.href : "";
  } catch {
    return "";
  }
}

function isSkipUrl(url: string): boolean {
  return (
    /\.(ico|svg)(\?|$)/i.test(url) ||
    /pixel|tracking|1x1|gravatar/i.test(url)
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

function extractBgUrls($: cheerio.CheerioAPI, pageUrl: string): string[] {
  const urls: string[] = [];
  $("[style]").each((_, el) => {
    const style = $(el).attr("style") || "";
    const matches = style.matchAll(/url\(['"]?([^'")]+)['"]?\)/g);
    for (const m of matches) {
      const href = m[1]!.trim();
      if (href.startsWith("data:") || !href) continue;
      const abs = resolveUrl(pageUrl, href);
      if (abs && !isSkipUrl(abs) && /\.(jpe?g|png|gif|webp)(\?|$)/i.test(abs)) {
        urls.push(abs);
      }
    }
  });
  return urls;
}

function collectImages($: cheerio.CheerioAPI, pageUrl: string): Array<{ url: string; alt?: string }> {
  const seen = new Set<string>();
  const out: Array<{ url: string; alt?: string }> = [];
  $("img").each((_, el) => {
    const url = getPrimaryUrl($, el, pageUrl);
    if (!url || seen.has(url)) return;
    seen.add(url);
    out.push({ url, alt: $(el).attr("alt") ?? undefined });
  });
  for (const u of extractBgUrls($, pageUrl)) {
    if (!seen.has(u)) {
      seen.add(u);
      out.push({ url: u });
    }
  }
  return out;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "DiversyFundCrawl/1.0" } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

async function downloadOnce(
  imageUrl: string,
  subdir: string,
  filename: string,
  dryRun: boolean
): Promise<string> {
  const existing = urlToLocal.get(imageUrl);
  if (existing) return existing;
  const ext = imageUrl.match(/\.(jpe?g|png|gif|webp)(\?|$)/i)?.[1] || "jpg";
  const safe = (filename.replace(/[^a-z0-9-_]/gi, "_") + "." + ext).slice(0, 80);
  const relPath = `/migrated/${subdir}/${safe}`;
  if (dryRun) {
    urlToLocal.set(imageUrl, relPath);
    return relPath;
  }
  const dir = join(PUBLIC_DIR, subdir);
  await mkdir(dir, { recursive: true });
  const res = await fetch(imageUrl, { headers: { "User-Agent": "DiversyFundCrawl/1.0" } });
  if (!res.ok) throw new Error(`${imageUrl} ${res.status}`);
  const buf = await res.arrayBuffer();
  await writeFile(join(dir, safe), Buffer.from(buf));
  urlToLocal.set(imageUrl, relPath);
  return relPath;
}

async function crawlPage(url: string, pageId: string, dryRun: boolean) {
  const html = await fetchHtml(url);
  await delay(THROTTLE_MS);
  const $ = cheerio.load(html);
  const images = collectImages($, url);
  const subdir = `content/${pageId}`;
  const localPaths: string[] = [];

  for (let i = 0; i < images.length; i++) {
    try {
      const rel = await downloadOnce(images[i].url, subdir, `img-${i}`, dryRun);
      localPaths.push(rel);
    } catch (e) {
      console.warn(`   [${i}] failed:`, e instanceof Error ? e.message : "");
    }
  }

  if (!dryRun && localPaths.length > 0) {
    await mkdir(join(PUBLIC_DIR, subdir), { recursive: true });
    await writeFile(
      join(PUBLIC_DIR, subdir, "manifest.json"),
      JSON.stringify(
        {
          pageUrl: url,
          pageId,
          crawledAt: new Date().toISOString(),
          images: images.slice(0, localPaths.length).map((img, i) => ({
            index: i,
            sourceUrl: img.url,
            localPath: localPaths[i] ?? "",
          })),
        },
        null,
        2
      )
    );
  }
  return localPaths.length;
}

async function main() {
  console.log(DRY_RUN ? "DRY RUN – no downloads" : "Full-site image crawl for diversyfund.com");
  if (!DRY_RUN) await mkdir(PUBLIC_DIR, { recursive: true });

  // 1. Home (use existing crawl or run it)
  console.log("\n1. Home page...");
  const homeUrl = `${BASE}/`;
  const homeHtml = await fetchHtml(homeUrl);
  await delay(THROTTLE_MS);
  const $home = cheerio.load(homeHtml);
  const homeImages = collectImages($home, homeUrl);
  const homeDir = join(PUBLIC_DIR, "home");
  let homeCount = 0;
  for (let i = 0; i < homeImages.length; i++) {
    try {
      await downloadOnce(homeImages[i].url, "home", `home-${i}`, DRY_RUN);
      homeCount++;
    } catch (_) {}
  }
  if (!DRY_RUN) {
    await mkdir(homeDir, { recursive: true });
    await writeFile(
      join(homeDir, "manifest.json"),
      JSON.stringify({
        homeUrl,
        crawledAt: new Date().toISOString(),
        imageCount: homeCount,
      }),
      null,
      2
    );
  }
  console.log(`   Found ${homeImages.length} images, saved ${homeCount}`);

  // 2. Content pages
  const entries = Object.entries(CONTENT_PAGES);
  console.log(`\n2. Content pages (${entries.length})...`);
  for (const [path, pageId] of entries) {
    const url = `${BASE}/${path}`.replace(/\/+/g, "/");
    try {
      const count = await crawlPage(url, pageId, DRY_RUN);
      console.log(`   ${pageId}: ${count} images`);
    } catch (e) {
      console.warn(`   ${pageId} FAILED:`, e instanceof Error ? e.message : e);
    }
  }

  console.log(DRY_RUN ? "\nDry run complete." : "\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
