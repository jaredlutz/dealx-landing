/**
 * Seed invest_with_ira page content blocks.
 * Run: bun run scripts/seed-invest-ira.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { and, eq } from "drizzle-orm";
import { getDb } from "../lib/db/index.js";
import { contentBlocks } from "../lib/db/schema.js";

const blocks = [
  { page: "invest_with_ira", blockKey: "eyebrow", content: "Build Your Future With" },
  { page: "invest_with_ira", blockKey: "title", content: "Invest in DiversyFund with your Self-Directed IRA" },
  { page: "invest_with_ira", blockKey: "subtitle", content: "Simplify Your Retirement & Back It with Real Assets" },
  { page: "invest_with_ira", blockKey: "bullets", content: "Benefit from Long-Term Asset Appreciation\nNo Need to Withdraw Funds from Your IRA\nInvestment Backed by Real Assets" },
  { page: "invest_with_ira", blockKey: "body", content: "If you have an existing IRA, you may be eligible to self-direct all or part of it into DiversyFund's real estate investment opportunities. Check with your current IRA custodian to see if they allow self-directed investments. If they do, contact our Investor Relations Team and we'll connect you with one of our trusted custodians to help you start investing in real estate through your IRA." },
];

async function upsert(db: any, b: { page: string; blockKey: string; content: string }) {
  const existing = await db.select().from(contentBlocks).where(and(eq(contentBlocks.page, b.page), eq(contentBlocks.blockKey, b.blockKey))).limit(1);
  if (existing[0]) {
    await db.update(contentBlocks).set({ content: b.content, updatedAt: new Date() }).where(eq(contentBlocks.id, existing[0].id));
  } else {
    await db.insert(contentBlocks).values(b);
  }
}

async function main() {
  const db = getDb();
  for (const b of blocks) await upsert(db, b);
  console.log("Seeded invest_with_ira content blocks.");
}

main().catch((e) => { console.error(e); process.exit(1); });
