/**
 * Migrate content from diversyfund.com into content_blocks.
 * Run: bun run scripts/migrate-content-from-live.ts [--dry-run]
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import * as cheerio from "cheerio";
import { and, eq } from "drizzle-orm";
import { getDb } from "../lib/db/index.js";
import { contentBlocks } from "../lib/db/schema.js";
import { BASE, CONTENT_PAGES } from "./migrate-urls";

const DRY_RUN = process.argv.includes("--dry-run");
const THROTTLE_MS = 1000;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "DiversyFundMigration/1.0" } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

function getTitle($: cheerio.CheerioAPI): string {
  const h1 = $("h1").first().text().trim();
  if (h1) return h1;
  return $("title").text().replace(/\s*[-|]\s*DiversyFund.*$/i, "").trim();
}

function getBody($: cheerio.CheerioAPI): string {
  $("script, iframe, noscript, style").remove();
  const container = $(".entry-content").first().length ? $(".entry-content").first()
    : $("main").first().length ? $("main").first()
    : $("article").first();
  if (!container.length) return $("body").text().replace(/\s+/g, " ").trim().slice(0, 15000);
  const paragraphs = container.find("p").map((_, el) => $(el).text().trim()).get();
  return paragraphs.filter(Boolean).join("\n\n").slice(0, 15000);
}

async function upsertBlock(db: any, page: string, blockKey: string, content: string) {
  if (DRY_RUN) {
    console.log(`  [block] ${page}.${blockKey} = ${content.slice(0, 50)}...`);
    return;
  }
  const existing = await db
    .select()
    .from(contentBlocks)
    .where(and(eq(contentBlocks.page, page), eq(contentBlocks.blockKey, blockKey)))
    .limit(1);
  if (existing[0]) {
    await db.update(contentBlocks).set({ content, updatedAt: new Date() }).where(eq(contentBlocks.id, existing[0].id));
  } else {
    await db.insert(contentBlocks).values({ page, blockKey, content });
  }
}

async function main() {
  const db = getDb();
  console.log(DRY_RUN ? "DRY RUN – no DB writes" : "Migrating content from diversyfund.com...");

  for (const [path, pageId] of Object.entries(CONTENT_PAGES)) {
    const url = `${BASE}/${path}`.replace(/\/+/g, "/");
    try {
      const html = await fetchHtml(url);
      await delay(THROTTLE_MS);
      const $ = cheerio.load(html);
      const title = getTitle($);
      const body = getBody($);
      await upsertBlock(db, pageId, "title", title || pageId);
      await upsertBlock(db, pageId, "body", body || "Content from diversyfund.com");
      console.log(`  ${pageId} ok`);
    } catch (e) {
      console.warn(`  ${pageId} failed:`, e instanceof Error ? e.message : e);
    }
  }

  console.log(DRY_RUN ? "\nDry run complete." : "\nMigration complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
