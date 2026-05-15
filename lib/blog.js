import fs from "fs";
import path from "path";
import matter from "gray-matter";

export { slugifyHeading, extractMarkdownHeadings } from "./blog-headings";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** ISR / `next: { revalidate }` when loading from df-crm. */
export const INSIGHTS_EDUCATION_REVALIDATE_SECONDS = 120;

function listMarkdownFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

function slugFromFile(filename, data) {
  if (data.slug && typeof data.slug === "string") return data.slug.trim();
  return filename.replace(/\.md$/i, "");
}

/**
 * True when `INSIGHTS_EDUCATION_FEED_URL` and `INSIGHTS_EDUCATION_FEED_SECRET` load from df-crm.
 * @returns {boolean}
 */
export function isCrmInsightsFeedConfigured() {
  const url = process.env.INSIGHTS_EDUCATION_FEED_URL?.trim();
  const secret = process.env.INSIGHTS_EDUCATION_FEED_SECRET?.trim();
  return Boolean(url && secret);
}

/**
 * @returns {Promise<{ posts: BlogPostMeta[] } | null>}
 */
async function fetchCrmInsightsList() {
  const url = process.env.INSIGHTS_EDUCATION_FEED_URL?.trim().replace(/\/$/, "");
  const secret = process.env.INSIGHTS_EDUCATION_FEED_SECRET?.trim();
  if (!url || !secret) return null;
  try {
    const res = await fetch(`${url}`, {
      headers: { Authorization: `Bearer ${secret}` },
      next: { revalidate: INSIGHTS_EDUCATION_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !Array.isArray(data.posts)) return null;
    return { posts: data.posts };
  } catch {
    return null;
  }
}

/**
 * @param {string} slug
 * @returns {Promise<{ post: { slug: string, title: string, date: string, description: string, author: string, category: string, body: string } } | null>}
 */
async function fetchCrmInsightBySlug(slug) {
  const base = process.env.INSIGHTS_EDUCATION_FEED_URL?.trim().replace(/\/$/, "");
  const secret = process.env.INSIGHTS_EDUCATION_FEED_SECRET?.trim();
  if (!base || !secret) return null;
  const enc = encodeURIComponent(slug);
  try {
    const res = await fetch(`${base}/${enc}`, {
      headers: { Authorization: `Bearer ${secret}` },
      next: { revalidate: INSIGHTS_EDUCATION_REVALIDATE_SECONDS },
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.post?.slug) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * @typedef {{ slug: string, title: string, date: string, description: string, author: string, category: string, cover?: string, coverAlt?: string }} BlogPostMeta
 */

/**
 * Pull the first markdown image `![alt](src "title")` from a body so post cards can use it as a cover.
 * @param {string} body
 * @returns {{ src: string, alt: string } | null}
 */
function extractFirstMarkdownImage(body) {
  if (!body) return null;
  const match = body.match(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  if (!match) return null;
  const alt = match[1]?.trim() ?? "";
  const src = match[2]?.trim() ?? "";
  if (!src) return null;
  return { src, alt };
}

/**
 * @param {Record<string, unknown>} data — frontmatter object
 * @param {string} body — markdown body
 * @returns {{ cover?: string, coverAlt?: string }}
 */
function resolveCoverFields(data, body) {
  const explicit = typeof data.cover === "string" ? data.cover.trim() : "";
  if (explicit) {
    const altRaw =
      typeof data.coverAlt === "string"
        ? data.coverAlt
        : typeof data.cover_alt === "string"
        ? data.cover_alt
        : "";
    return { cover: explicit, coverAlt: altRaw.trim() };
  }
  const fromBody = extractFirstMarkdownImage(body);
  if (fromBody) {
    return { cover: fromBody.src, coverAlt: fromBody.alt };
  }
  return {};
}

/**
 * Sync resolve from content/blog only (no CRM). Used before remote fetch so local drafts work offline
 * and optional feeds do not log connection errors when the markdown exists.
 * @param {string} slug
 * @returns {{ meta: BlogPostMeta, body: string } | null}
 */
function getLocalPostBySlugSync(slug) {
  const files = listMarkdownFiles();
  for (const filename of files) {
    const full = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const fileSlug = slugFromFile(filename, data);
    if (fileSlug !== slug) continue;
    const title = typeof data.title === "string" ? data.title : fileSlug;
    const date = typeof data.date === "string" ? data.date : "";
    const description = typeof data.description === "string" ? data.description : "";
    const author = typeof data.author === "string" ? data.author : "DiversyFund";
    const category =
      typeof data.category === "string" && data.category.trim()
        ? data.category.trim().toUpperCase()
        : "INSIGHTS";
    const body = content.trim();
    const { cover, coverAlt } = resolveCoverFields(data, body);
    return {
      meta: { slug: fileSlug, title, date, description, author, category, cover, coverAlt },
      body,
    };
  }
  return null;
}

/** @returns {BlogPostMeta[]} */
export function getLocalPostsMeta() {
  const files = listMarkdownFiles();
  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const slug = slugFromFile(filename, data);
    const title = typeof data.title === "string" ? data.title : slug;
    const date = typeof data.date === "string" ? data.date : "";
    const description = typeof data.description === "string" ? data.description : "";
    const author = typeof data.author === "string" ? data.author : "DiversyFund";
    const category =
      typeof data.category === "string" && data.category.trim()
        ? data.category.trim().toUpperCase()
        : "INSIGHTS";
    const { cover, coverAlt } = resolveCoverFields(data, content);
    return { slug, title, date, description, author, category, cover, coverAlt };
  });

  return posts.sort((a, b) => {
    const ta = Date.parse(a.date) || 0;
    const tb = Date.parse(b.date) || 0;
    return tb - ta;
  });
}

/**
 * List posts: df-crm feed when configured and reachable; otherwise local markdown.
 * When both exist, entries in `content/blog` override the same slug from CRM and fill in slugs missing from the feed.
 * @returns {Promise<BlogPostMeta[]>}
 */
export async function getAllPostsMeta() {
  const local = getLocalPostsMeta();
  if (isCrmInsightsFeedConfigured()) {
    const remote = await fetchCrmInsightsList();
    if (remote !== null) {
      /** @type {Map<string, BlogPostMeta>} */
      const bySlug = new Map(
        remote.posts.map((p) => [
          String(p.slug),
          {
            slug: String(p.slug),
            title: String(p.title ?? p.slug),
            date: String(p.date ?? ""),
            description: typeof p.description === "string" ? p.description : "",
            author: typeof p.author === "string" ? p.author : "DiversyFund",
            category:
              typeof p.category === "string" && p.category.trim()
                ? p.category.trim().toUpperCase()
                : "INSIGHTS",
            cover: typeof p.cover === "string" ? p.cover : undefined,
            coverAlt:
              typeof p.coverAlt === "string"
                ? p.coverAlt
                : typeof p.cover_alt === "string"
                ? p.cover_alt
                : undefined,
          },
        ])
      );
      for (const l of local) {
        bySlug.set(l.slug, l);
      }
      return Array.from(bySlug.values()).sort((a, b) => {
        const ta = Date.parse(a.date) || 0;
        const tb = Date.parse(b.date) || 0;
        return tb - ta;
      });
    }
  }
  return local;
}

/** @returns {Promise<string[]>} */
export async function getAllSlugs() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => p.slug);
}

/**
 * @param {string} slug
 * @returns {Promise<{ meta: BlogPostMeta, body: string } | null>}
 */
export async function getPostBySlug(slug) {
  const local = getLocalPostBySlugSync(slug);
  if (local) return local;

  if (isCrmInsightsFeedConfigured()) {
    const remote = await fetchCrmInsightBySlug(slug);
    if (remote?.post) {
      const p = remote.post;
      const body = typeof p.body === "string" ? p.body.trim() : "";
      const { cover, coverAlt } = resolveCoverFields(
        {
          cover: typeof p.cover === "string" ? p.cover : undefined,
          coverAlt:
            typeof p.coverAlt === "string"
              ? p.coverAlt
              : typeof p.cover_alt === "string"
              ? p.cover_alt
              : undefined,
        },
        body
      );
      return {
        meta: {
          slug: String(p.slug),
          title: String(p.title ?? p.slug),
          date: String(p.date ?? ""),
          description: typeof p.description === "string" ? p.description : "",
          author: typeof p.author === "string" ? p.author : "DiversyFund",
          category:
            typeof p.category === "string" && p.category.trim() ? p.category.trim().toUpperCase() : "INSIGHTS",
          cover,
          coverAlt,
        },
        body,
      };
    }
  }

  return null;
}

export function formatBlogDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
