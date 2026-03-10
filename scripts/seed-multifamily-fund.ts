/**
 * Seed multifamily fund page content blocks.
 * Run: bun run scripts/seed-multifamily-fund.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { and, eq } from "drizzle-orm";
import { getDb } from "../lib/db/index.js";
import { contentBlocks } from "../lib/db/schema.js";

const blocks = [
  { page: "multifamily_fund", blockKey: "intro", content: "A multifamily investment fund is a professionally managed pool of capital dedicated to acquiring, improving, and managing apartment buildings. By investing in the fund, you gain exposure to a portfolio of multifamily properties—without the responsibility of direct ownership." },
  { page: "multifamily_fund", blockKey: "benefit_1_title", content: "Diversification" },
  { page: "multifamily_fund", blockKey: "benefit_1_body", content: "Invest across multiple properties and markets." },
  { page: "multifamily_fund", blockKey: "benefit_2_title", content: "Value Creation" },
  { page: "multifamily_fund", blockKey: "benefit_2_body", content: "Benefit from renovations, repositioning, and operational improvements." },
  { page: "multifamily_fund", blockKey: "benefit_3_title", content: "Long-Term Growth Potential" },
  { page: "multifamily_fund", blockKey: "benefit_3_body", content: "Designed to capture appreciation through improved operations and market expansion over time." },
  { page: "multifamily_fund", blockKey: "benefit_4_title", content: "Professional Management" },
  { page: "multifamily_fund", blockKey: "benefit_4_body", content: "All acquisitions, renovations, and operations are handled by experts." },
  { page: "multifamily_fund", blockKey: "lifecycle_1_title", content: "Capital Raise" },
  { page: "multifamily_fund", blockKey: "lifecycle_1_body", content: "The fund opens for investments, and capital is committed by investors. Proceeds are used to begin acquiring assets. This phase typically lasts 6–12 months." },
  { page: "multifamily_fund", blockKey: "lifecycle_2_title", content: "Acquisition" },
  { page: "multifamily_fund", blockKey: "lifecycle_2_body", content: "Multifamily properties are added to the portfolio. In many cases, acquisitions begin before the capital raise phase fully closes." },
  { page: "multifamily_fund", blockKey: "lifecycle_3_title", content: "Value-Add" },
  { page: "multifamily_fund", blockKey: "lifecycle_3_body", content: "Acquired properties undergo strategic improvements—renovated interiors, exterior upgrades, landscaping, and professional property management." },
  { page: "multifamily_fund", blockKey: "lifecycle_4_title", content: "Appreciation" },
  { page: "multifamily_fund", blockKey: "lifecycle_4_body", content: "As projects stabilize, the portfolio is positioned for long-term value growth driven by improved operations and favorable market dynamics." },
  { page: "multifamily_fund", blockKey: "lifecycle_5_title", content: "Liquidation" },
  { page: "multifamily_fund", blockKey: "lifecycle_5_body", content: "Assets are sold when market conditions are favorable. Timing is flexible, and this phase may overlap with earlier stages." },
  { page: "multifamily_fund", blockKey: "lifecycle_6_title", content: "Profit Distribution" },
  { page: "multifamily_fund", blockKey: "lifecycle_6_body", content: "Proceeds from sales are distributed to investors as cash or reinvested into new opportunities." },
  { page: "multifamily_fund", blockKey: "thesis_1_title", content: "Uncertain Times Create Buying Opportunities" },
  { page: "multifamily_fund", blockKey: "thesis_1_body", content: "Our fund targets undervalued apartment buildings where sellers are distressed or undercapitalized, creating strong entry points." },
  { page: "multifamily_fund", blockKey: "thesis_2_title", content: "Multifamily Poised for Growth" },
  { page: "multifamily_fund", blockKey: "thesis_2_body", content: "With rising interest rates cooling demand, the multifamily sector is entering a more balanced market, creating attractive buying conditions." },
  { page: "multifamily_fund", blockKey: "thesis_3_title", content: "Resilient Asset Class" },
  { page: "multifamily_fund", blockKey: "thesis_3_body", content: "Multifamily historically outperforms other property types during periods of uncertainty, supported by consistent renter demand and constrained housing supply." },
  { page: "multifamily_fund", blockKey: "thesis_4_title", content: "Capturing Today's Opportunities" },
  { page: "multifamily_fund", blockKey: "thesis_4_body", content: "We aim to acquire undervalued or distressed multifamily properties and execute a value-add strategy to generate appreciation over a 5–10 year hold." },
  { page: "multifamily_fund", blockKey: "stat_investors", content: "0+" },
  { page: "multifamily_fund", blockKey: "stat_assets", content: "0" },
  { page: "multifamily_fund", blockKey: "stat_units", content: "0" },
  { page: "multifamily_fund", blockKey: "stat_members", content: "0+" },
  { page: "multifamily_fund", blockKey: "payments_1_title", content: "Real Estate Works Over Time" },
  { page: "multifamily_fund", blockKey: "payments_1_body", content: "Returns are generated from both forced appreciation (via renovations and improvements) and natural market growth." },
  { page: "multifamily_fund", blockKey: "payments_2_title", content: "Reap the Rewards of Patience" },
  { page: "multifamily_fund", blockKey: "payments_2_body", content: "Profits are distributed at the end of the fund's 5–10 year lifecycle, when properties are sold. Investors can choose to receive payouts or reinvest into new opportunities." },
  { page: "multifamily_fund", blockKey: "payments_3_title", content: "True Growth Isn't Always Immediate" },
  { page: "multifamily_fund", blockKey: "payments_3_body", content: "Unlike stocks, real estate value is realized at the time of sale, providing patient investors with meaningful long-term gains." },
  { page: "multifamily_fund", blockKey: "perk_1_title", content: "Exclusive Access to New Opportunities" },
  { page: "multifamily_fund", blockKey: "perk_1_body", content: "Be the first to hear about new funds, private offerings, and limited-time investment windows before they fill up." },
  { page: "multifamily_fund", blockKey: "perk_2_title", content: "Ongoing Project Updates" },
  { page: "multifamily_fund", blockKey: "perk_2_body", content: "Stay connected with your portfolio — receive progress reports and performance insights on active real estate projects." },
  { page: "multifamily_fund", blockKey: "perk_3_title", content: "Invitations to Investor Webinars & Events" },
  { page: "multifamily_fund", blockKey: "perk_3_body", content: "Gain insider knowledge through live webinars, Q&A sessions, and expert insights on market trends and wealth-building strategies." },
  { page: "multifamily_fund", blockKey: "perk_4_title", content: "Community & Network Perks" },
  { page: "multifamily_fund", blockKey: "perk_4_body", content: "Join a growing network of 28,000+ like-minded investors building wealth through alternatives." },
  { page: "multifamily_fund", blockKey: "perk_5_title", content: "Smarter Platform with AI (Coming Soon)" },
  { page: "multifamily_fund", blockKey: "perk_5_body", content: "Experience a more personalized investing journey as our AI integration delivers sharper insights and streamlined tools." },
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
  console.log("Seeded multifamily_fund content blocks.");
}

main().catch((e) => { console.error(e); process.exit(1); });
