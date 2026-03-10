/**
 * Seed about page content blocks.
 * Run: bun run scripts/seed-about.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { and, eq } from "drizzle-orm";
import { getDb } from "../lib/db/index.js";
import { contentBlocks } from "../lib/db/schema.js";

const aboutBlocks = [
  { page: "about", blockKey: "about_eyebrow", content: "ABOUT DIVERSYFUND" },
  { page: "about", blockKey: "about_title", content: "The AI-Powered Multifamily Investment Platform" },
  {
    page: "about",
    blockKey: "about_intro",
    content:
      "We believe multifamily real estate is the foundation of long-term wealth. DiversyFund gives accredited investors access to carefully curated multifamily funds, while our AI-driven platform makes the journey smarter, more personalized, and more transparent. From onboarding to portfolio insights, we're redefining how investors participate in one of America's most stable asset classes.",
  },
  { page: "about", blockKey: "about_mission_title", content: "Our Mission" },
  {
    page: "about",
    blockKey: "about_mission_body",
    content:
      "Our mission is to provide accredited investors—entrepreneurs, professionals, and wealth builders—with exclusive access to expertly managed multifamily real estate, while building an AI-powered investment platform designed to make the experience smarter, more transparent, and more informed. By combining proven real estate strategies with advanced technology, we aim to create lasting wealth and elevate how investors engage with private market opportunities.",
  },
  { page: "about", blockKey: "about_results_title", content: "Proven Results. Trusted Experience." },
  { page: "about", blockKey: "stat_members", content: "0+" },
  { page: "about", blockKey: "stat_investors", content: "0+" },
  { page: "about", blockKey: "stat_aum", content: "$0 M+" },
  { page: "about", blockKey: "about_values_title", content: "Our Values" },
  {
    page: "about",
    blockKey: "value_1_title",
    content: "Integrity & Trust",
  },
  {
    page: "about",
    blockKey: "value_1_body",
    content:
      "We operate with the highest standards of professionalism and transparency, ensuring investors can commit their capital with confidence.",
  },
  {
    page: "about",
    blockKey: "value_2_title",
    content: "Innovation-Driven",
  },
  {
    page: "about",
    blockKey: "value_2_body",
    content:
      "We are building an AI-powered platform that enhances decision-making, improves communication, and creates a smarter investment experience.",
  },
  {
    page: "about",
    blockKey: "value_3_title",
    content: "Investor-Centric Transparency",
  },
  {
    page: "about",
    blockKey: "value_3_body",
    content:
      "We believe informed investors make better investors—our commitment is to provide clarity, insights, and consistent visibility into multifamily opportunities.",
  },
  {
    page: "about",
    blockKey: "value_4_title",
    content: "Long-Term Wealth Creation",
  },
  {
    page: "about",
    blockKey: "value_4_body",
    content:
      "Our focus is on building lasting value through expertly managed multifamily real estate, helping investors grow and protect their wealth for the future.",
  },
  { page: "about", blockKey: "about_journey_title", content: "Our Journey" },
  { page: "about", blockKey: "journey_1_year", content: "2016" },
  { page: "about", blockKey: "journey_1_title", content: "Company Founded" },
  {
    page: "about",
    blockKey: "journey_1_body",
    content: "DiversyFund was established in San Diego, CA with a mission to make multifamily real estate more accessible.",
  },
  { page: "about", blockKey: "journey_2_year", content: "2018" },
  { page: "about", blockKey: "journey_2_title", content: "First Multifamily Fund Launched" },
  {
    page: "about",
    blockKey: "journey_2_body",
    content: "Opened our first fund, giving accredited investors access to professionally managed multifamily assets.",
  },
  { page: "about", blockKey: "journey_3_year", content: "2020" },
  { page: "about", blockKey: "journey_3_title", content: "Geographic Expansion" },
  {
    page: "about",
    blockKey: "journey_3_body",
    content: "Expanded portfolio holdings into Texas, South Carolina, and Florida.",
  },
  { page: "about", blockKey: "journey_4_year", content: "2022" },
  { page: "about", blockKey: "journey_4_title", content: "20,000+ Investors" },
  {
    page: "about",
    blockKey: "journey_4_body",
    content: "Reached a major milestone with over 20,000 accredited investors on our platform.",
  },
  { page: "about", blockKey: "journey_5_year", content: "2024" },
  { page: "about", blockKey: "journey_5_title", content: "Mobile App Launch" },
  {
    page: "about",
    blockKey: "journey_5_body",
    content: "Introduced a mobile app to help investors monitor their portfolios with ease and transparency.",
  },
  { page: "about", blockKey: "journey_6_year", content: "2025" },
  { page: "about", blockKey: "journey_6_title", content: "AI-Powered Platform Initiative" },
  {
    page: "about",
    blockKey: "journey_6_body",
    content: "Announced our AI integration roadmap to create a smarter, more personalized investor experience.",
  },
  { page: "about", blockKey: "testimonials_eyebrow", content: "TESTIMONIAL" },
  { page: "about", blockKey: "testimonials_title", content: "What Our Investors Say" },
];

async function upsert(db: any, b: { page: string; blockKey: string; content: string }) {
  const existing = await db
    .select()
    .from(contentBlocks)
    .where(and(eq(contentBlocks.page, b.page), eq(contentBlocks.blockKey, b.blockKey)))
    .limit(1);
  if (existing[0]) {
    await db
      .update(contentBlocks)
      .set({ content: b.content, updatedAt: new Date() })
      .where(eq(contentBlocks.id, existing[0].id));
  } else {
    await db.insert(contentBlocks).values(b);
  }
}

async function main() {
  const db = getDb();
  console.log("Seeding about page content blocks...");
  for (const b of aboutBlocks) {
    await upsert(db, b);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
