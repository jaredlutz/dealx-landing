"use server";

import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";

export async function saveContentBlock(page, blockKey, content) {
  const db = getDb();
  const existing = await db
    .select()
    .from(contentBlocks)
    .where(
      and(eq(contentBlocks.page, page), eq(contentBlocks.blockKey, blockKey))
    )
    .limit(1);
  if (existing[0]) {
    await db
      .update(contentBlocks)
      .set({ content, updatedAt: new Date() })
      .where(eq(contentBlocks.id, existing[0].id));
  } else {
    await db.insert(contentBlocks).values({
      page,
      blockKey,
      content,
    });
  }
}
