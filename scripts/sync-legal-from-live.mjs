/**
 * Refreshes lib/legal/*.fragment.html from diversyfund.com (article inner HTML).
 * Run: bun scripts/sync-legal-from-live.mjs
 */
import * as cheerio from "cheerio";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const outDir = join(process.cwd(), "lib/legal");
mkdirSync(outDir, { recursive: true });

const urls = {
  privacy: "https://diversyfund.com/privacy-policy/",
  sms: "https://diversyfund.com/sms-terms/",
};

for (const [name, url] of Object.entries(urls)) {
  const html = await fetch(url).then((r) => r.text());
  const $ = cheerio.load(html);
  const entry = $(".entry-content").first();
  const inner = entry.length ? entry.html() ?? "" : $("article").first().html() ?? "";
  const out = join(outDir, `${name}.fragment.html`);
  writeFileSync(out, inner, "utf8");
  console.log("wrote", out, inner.length, "bytes");
}
