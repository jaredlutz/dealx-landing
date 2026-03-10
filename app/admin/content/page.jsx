import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";
import ContentBlockEditor from "./ContentBlockEditor";

export const dynamic = "force-dynamic";

const PAGES = [{ id: "home", label: "Home" }];

const HOME_BLOCK_GROUPS = [
  { label: "Hero", keys: ["hero_eyebrow", "hero_title", "hero_image_url"] },
  {
    label: "About",
    keys: [
      "about_eyebrow",
      "about_title",
      "about_subtitle",
      "about_cta_label",
      "about_cta_url",
    ],
  },
  {
    label: "Stats",
    keys: ["stat_members", "stat_investors", "stat_aum"],
  },
  {
    label: "Why Invest (1–5)",
    keys: [
      "why_1_title", "why_1_body",
      "why_2_title", "why_2_body",
      "why_3_title", "why_3_body",
      "why_4_title", "why_4_body",
      "why_5_title", "why_5_body",
    ],
  },
  {
    label: "Portfolio (1–4)",
    keys: [
      "portfolio_1_name", "portfolio_1_desc", "portfolio_1_units",
      "portfolio_2_name", "portfolio_2_desc", "portfolio_2_units",
      "portfolio_3_name", "portfolio_3_desc", "portfolio_3_units",
      "portfolio_4_name", "portfolio_4_desc", "portfolio_4_units",
    ],
  },
  {
    label: "Fund",
    keys: ["fund_title", "fund_bullets", "fund_cta_label", "fund_cta_url"],
  },
  {
    label: "Testimonials section",
    keys: ["testimonials_eyebrow", "testimonials_title"],
  },
  {
    label: "Mobile App",
    keys: ["mobile_title", "mobile_subtitle", "app_store_url", "google_play_url"],
  },
];

export default async function AdminContentPage() {
  const db = getDb();
  const blocks = await db.select().from(contentBlocks).where(eq(contentBlocks.page, "home"));
  const byKey = Object.fromEntries(blocks.map((b) => [b.blockKey, b]));

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Content blocks</h1>
      <p className="mt-1 text-stone-600">
        Edit homepage copy. Changes appear on the site immediately.
      </p>
      <div className="mt-8 space-y-8">
        {HOME_BLOCK_GROUPS.map(({ label, keys }) => (
          <section
            key={label}
            className="rounded-lg border border-stone-200 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-stone-900">{label}</h2>
            <ContentBlockEditor
              page="home"
            blocks={keys.map((blockKey) => ({
              blockKey,
              content: byKey[blockKey]?.content ?? "",
            }))}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
