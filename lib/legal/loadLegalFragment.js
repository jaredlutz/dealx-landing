import { readFileSync } from "fs";
import { join } from "path";
import * as cheerio from "cheerio";

/**
 * Loads synced HTML from lib/legal/{name}.fragment.html (see scripts/sync-legal-from-live.mjs).
 * Rewrites diversyfund.com legal URLs to this site and normalizes internal link targets.
 */
export function loadLegalFragment(name) {
  const filePath = join(process.cwd(), "lib/legal", `${name}.fragment.html`);
  const raw = readFileSync(filePath, "utf8");
  const $ = cheerio.load(raw, null, false);

  const localizeHref = (href) => {
    if (!href) return href;
    let next = href
      .replace(/^https:\/\/diversyfund\.com\/privacy-policy\/?/i, "/privacy-policy")
      .replace(/^https:\/\/diversyfund\.com\/sms-terms\/?/i, "/sms-terms");
    return next;
  };

  $("a[href]").each((_, el) => {
    const $a = $(el);
    const href = $a.attr("href");
    const next = localizeHref(href);
    if (next !== href) $a.attr("href", next);
    if (
      next.startsWith("/privacy-policy") ||
      next.startsWith("/sms-terms")
    ) {
      $a.removeAttr("target");
    }
  });

  return $.root().html() ?? raw;
}
