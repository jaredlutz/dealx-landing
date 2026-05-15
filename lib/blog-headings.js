/**
 * Pure helpers for slugifying markdown headings and pulling a table of contents
 * out of a markdown body. Kept in a separate module from `lib/blog.js` so the
 * client-side `BlogProse` component can import slugify without dragging in
 * `fs`/`gray-matter` (which are Node-only).
 */

/**
 * Stable slugifier shared by server-side heading extraction and the BlogProse
 * h2 override. Same input → same output, so anchor links resolve.
 * @param {string} value
 * @returns {string}
 */
export function slugifyHeading(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201C\u201D]/g, "")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Pull h2 headings out of a markdown body so we can render a sticky table of
 * contents. Ignores fenced code blocks, inline emphasis, links, and code spans.
 * Falls back to "section" if a heading slugifies to an empty string. Duplicate
 * slugs are suffixed `-2`, `-3`, …
 * @param {string} markdown
 * @returns {{ id: string, text: string }[]}
 */
export function extractMarkdownHeadings(markdown) {
  if (!markdown || typeof markdown !== "string") return [];
  const lines = markdown.split("\n");
  /** @type {{ id: string, text: string }[]} */
  const out = [];
  const seen = new Map();
  let inFence = false;
  for (const raw of lines) {
    const trimmed = raw.trimEnd();
    if (/^```/.test(trimmed)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = trimmed.match(/^##\s+(.+)$/);
    if (!match) continue;
    const cleaned = match[1]
      .replace(/`+([^`]*)`+/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();
    const base = slugifyHeading(cleaned) || "section";
    const seenCount = seen.get(base) || 0;
    const id = seenCount === 0 ? base : `${base}-${seenCount + 1}`;
    seen.set(base, seenCount + 1);
    out.push({ id, text: cleaned });
  }
  return out;
}
