/**
 * Seed content_blocks and testimonials for diversyfund homepage.
 * Run: bun run db:seed
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { getDb } from "../lib/db/index.js";
import { contentBlocks, testimonials } from "../lib/db/schema.js";
import { and, eq } from "drizzle-orm";

const homeBlocks = [
  { page: "home", blockKey: "hero_eyebrow", content: "Invest in Real Estate with DiversyFund" },
  { page: "home", blockKey: "hero_title", content: "Invest Smarter in Expert-Managed Multifamily Real Estate with an AI-Powered Platform" },
  { page: "home", blockKey: "hero_image_url", content: "/migrated/home/home-1.jpg" },
  { page: "home", blockKey: "about_eyebrow", content: "ABOUT DIVERSYFUND" },
  { page: "home", blockKey: "about_title", content: "The AI-Powered Multifamily Investment Platform" },
  { page: "home", blockKey: "about_subtitle", content: "We believe multifamily real estate is the foundation of long-term wealth. DiversyFund gives accredited investors access to carefully curated multifamily funds, while our AI-driven platform makes the journey smarter, more personalized, and more transparent. From onboarding to portfolio insights, we're redefining how investors participate in one of America's most stable asset classes." },
  { page: "home", blockKey: "about_cta_label", content: "About Us" },
  { page: "home", blockKey: "about_cta_url", content: "/#" },
  { page: "home", blockKey: "stat_members", content: "0+" },
  { page: "home", blockKey: "stat_investors", content: "0+" },
  { page: "home", blockKey: "stat_aum", content: "$0 M+" },
  { page: "home", blockKey: "why_1_title", content: "Exclusive Multifamily Access" },
  { page: "home", blockKey: "why_1_body", content: "Invest directly in carefully selected multifamily real estate funds, an asset class known for stability, resilience, and long-term value creation." },
  { page: "home", blockKey: "why_2_title", content: "Trusted Track Record" },
  { page: "home", blockKey: "why_2_body", content: "With over $300M in assets under management and thousands of investors onboard, DiversyFund has a proven history of performance in multifamily investing." },
  { page: "home", blockKey: "why_3_title", content: "Expert Management" },
  { page: "home", blockKey: "why_3_body", content: "Every fund is professionally managed, with acquisitions, operations, and strategies designed to maximize returns while protecting investor capital." },
  { page: "home", blockKey: "why_4_title", content: "Growing Investor Community" },
  { page: "home", blockKey: "why_4_body", content: "Join a nationwide network of 900,000+ members and 28,000+ active investors who trust DiversyFund to help them build wealth." },
  { page: "home", blockKey: "why_5_title", content: "Innovation Ahead" },
  { page: "home", blockKey: "why_5_body", content: "Our AI-powered platform is designed to make investing smarter, more transparent, and more personalized—coming soon as part of the next evolution of DiversyFund." },
  { page: "home", blockKey: "portfolio_1_name", content: "Avalon 1" },
  { page: "home", blockKey: "portfolio_1_desc", content: "Charming garden-style property featuring spacious duplex-style homes in a quiet suburban setting. Ideal for long-term tenants seeking stability and value." },
  { page: "home", blockKey: "portfolio_1_units", content: "145" },
  { page: "home", blockKey: "portfolio_2_name", content: "Azul" },
  { page: "home", blockKey: "portfolio_2_desc", content: "Modern three-story apartment complex with sleek design and private balconies. Prime location with strong tenant demand and premium rental rates." },
  { page: "home", blockKey: "portfolio_2_units", content: "49" },
  { page: "home", blockKey: "portfolio_3_name", content: "Mission Villas" },
  { page: "home", blockKey: "portfolio_3_desc", content: "Two-story multifamily complex with central stair access and open-air walkways. High-density layout ideal for workforce housing in strong rental markets." },
  { page: "home", blockKey: "portfolio_3_units", content: "176" },
  { page: "home", blockKey: "portfolio_4_name", content: "The France" },
  { page: "home", blockKey: "portfolio_4_desc", content: "Iconic mid-rise buildings with Mediterranean architecture and lush landscape. Well-positioned for luxury rental or senior living conversion." },
  { page: "home", blockKey: "portfolio_4_units", content: "30" },
  { page: "home", blockKey: "fund_title", content: "Fund V – Real Estate Accredited Investor Fund" },
  { page: "home", blockKey: "fund_bullets", content: "Focused on long-term value creation and portfolio diversification.\nTargets distressed & value-add multifamily properties across the U.S.\nAccredited investors only, IRA Eligible\nMinimum: $100,000" },
  { page: "home", blockKey: "fund_cta_label", content: "Learn More" },
  { page: "home", blockKey: "fund_cta_url", content: "/#opps" },
  { page: "home", blockKey: "testimonials_eyebrow", content: "TESTIMONIAL" },
  { page: "home", blockKey: "testimonials_title", content: "What Our Investors Say" },
  { page: "home", blockKey: "mobile_title", content: "Invest From Anywhere With Our Mobile App" },
  { page: "home", blockKey: "mobile_subtitle", content: "Download the App Now" },
  { page: "home", blockKey: "app_store_url", content: "#" },
  { page: "home", blockKey: "google_play_url", content: "#" },
];

const testimonialSeeds = [
  { quote: "I didn't know what to expect, but the process was clear and easy to follow. I felt welcomed immediately.", authorName: "Tina R.", sortOrder: 0 },
  { quote: "The team was always available to answer my questions. That kind of support makes a big difference.", authorName: "Jason M.", sortOrder: 1 },
  { quote: "Joining a community of 900,000 members showed me I wasn't alone. I've found opportunities I never thought were possible.", authorName: "Mark R.", sortOrder: 2 },
  { quote: "DiversyFund's platform gave me access I never had before. It's opened up a world I didn't think was built for people like me.", authorName: "Sarah T.", sortOrder: 3 },
  { quote: "I felt informed every step of the way. The platform made it easy to get started and stay in control.", authorName: "Alex P.", sortOrder: 4 },
];

async function main() {
  const db = getDb();

  const existingBlocks = await db.select().from(contentBlocks).where(eq(contentBlocks.page, "home")).limit(1);
  if (existingBlocks.length === 0) {
    for (const b of homeBlocks) {
      await db.insert(contentBlocks).values(b);
    }
    console.log("Seeded content_blocks for home.");
  } else {
    // Fix hero image if it points to logo instead of hero
    const heroBlock = await db
      .select()
      .from(contentBlocks)
      .where(and(eq(contentBlocks.page, "home"), eq(contentBlocks.blockKey, "hero_image_url")))
      .limit(1);
    if (heroBlock[0]?.content === "/migrated/home/home-0.png") {
      await db
        .update(contentBlocks)
        .set({ content: "/migrated/home/home-1.jpg", updatedAt: new Date() })
        .where(and(eq(contentBlocks.page, "home"), eq(contentBlocks.blockKey, "hero_image_url")));
      console.log("Updated hero_image_url to home-1.jpg.");
    }
  }

  const existingTestimonials = await db.select().from(testimonials).limit(1);
  if (existingTestimonials.length === 0) {
    await db.insert(testimonials).values(testimonialSeeds);
    console.log("Seeded testimonials.");
  } else {
    console.log("Testimonials already exist, skipping.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
