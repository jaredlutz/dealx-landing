import { getDb } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function getContentBlock(page, blockKey) {
  try {
    const db = getDb();
    const rows = await db
      .select({ content: contentBlocks.content })
      .from(contentBlocks)
      .where(
        and(
          eq(contentBlocks.page, page),
          eq(contentBlocks.blockKey, blockKey)
        )
      )
      .limit(1);
    return rows[0]?.content ?? null;
  } catch {
    return null;
  }
}

export async function getContentBlocksForPage(page) {
  try {
    const db = getDb();
    const rows = await db
      .select({ blockKey: contentBlocks.blockKey, content: contentBlocks.content })
      .from(contentBlocks)
      .where(eq(contentBlocks.page, page));
    const out = {};
    for (const r of rows) {
      out[r.blockKey] = r.content;
    }
    return out;
  } catch {
    return {};
  }
}
