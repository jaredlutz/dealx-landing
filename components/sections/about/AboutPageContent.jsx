import { asc } from "drizzle-orm";
import { getContentBlocksForPage } from "@/lib/content";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { brand, cn } from "@/lib/theme";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const DEFAULT_ABOUT = {
  about_eyebrow: "ABOUT DIVERSYFUND",
  about_title: "The AI-Powered Multifamily Investment Platform",
  about_intro:
    "We believe multifamily real estate is the foundation of long-term wealth. DiversyFund gives accredited investors access to carefully curated multifamily funds, while our AI-driven platform makes the journey smarter, more personalized, and more transparent. From onboarding to portfolio insights, we're redefining how investors participate in one of America's most stable asset classes.",
  about_mission_title: "Our Mission",
  about_mission_body:
    "Our mission is to provide accredited investors—entrepreneurs, professionals, and wealth builders—with exclusive access to expertly managed multifamily real estate, while building an AI-powered investment platform designed to make the experience smarter, more transparent, and more informed. By combining proven real estate strategies with advanced technology, we aim to create lasting wealth and elevate how investors engage with private market opportunities.",
  about_results_title: "Proven Results. Trusted Experience.",
  stat_members: "0+",
  stat_investors: "0+",
  stat_aum: "$0 M+",
  about_values_title: "Our Values",
  value_1_title: "Integrity & Trust",
  value_1_body:
    "We operate with the highest standards of professionalism and transparency, ensuring investors can commit their capital with confidence.",
  value_2_title: "Innovation-Driven",
  value_2_body:
    "We are building an AI-powered platform that enhances decision-making, improves communication, and creates a smarter investment experience.",
  value_3_title: "Investor-Centric Transparency",
  value_3_body:
    "We believe informed investors make better investors—our commitment is to provide clarity, insights, and consistent visibility into multifamily opportunities.",
  value_4_title: "Long-Term Wealth Creation",
  value_4_body:
    "Our focus is on building lasting value through expertly managed multifamily real estate, helping investors grow and protect their wealth for the future.",
  about_journey_title: "Our Journey",
  journey_1_year: "2016",
  journey_1_title: "Company Founded",
  journey_1_body: "DiversyFund was established in San Diego, CA with a mission to make multifamily real estate more accessible.",
  journey_2_year: "2018",
  journey_2_title: "First Multifamily Fund Launched",
  journey_2_body: "Opened our first fund, giving accredited investors access to professionally managed multifamily assets.",
  journey_3_year: "2020",
  journey_3_title: "Geographic Expansion",
  journey_3_body: "Expanded portfolio holdings into Texas, South Carolina, and Florida.",
  journey_4_year: "2022",
  journey_4_title: "20,000+ Investors",
  journey_4_body: "Reached a major milestone with over 20,000 accredited investors on our platform.",
  journey_5_year: "2024",
  journey_5_title: "Mobile App Launch",
  journey_5_body: "Introduced a mobile app to help investors monitor their portfolios with ease and transparency.",
  journey_6_year: "2025",
  journey_6_title: "AI-Powered Platform Initiative",
  journey_6_body: "Announced our AI integration roadmap to create a smarter, more personalized investor experience.",
  testimonials_eyebrow: "TESTIMONIAL",
  testimonials_title: "What Our Investors Say",
};

const STAT_ICONS = ["/migrated/content/about/img-2.png", "/migrated/content/about/img-3.png", "/migrated/content/about/img-4.png"];
const VALUE_ICONS = ["/migrated/content/about/img-5.png", "/migrated/content/about/img-6.png", "/migrated/content/about/img-7.png", "/migrated/content/about/img-8.png"];
const STAT_LABELS = ["Members", "Investors", "AUM"];

export default async function AboutPageContent() {
  const blocks = await getContentBlocksForPage("about");
  const c = { ...DEFAULT_ABOUT, ...blocks };

  let testimonialList = [];
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));
    testimonialList = rows.map((t) => ({ quote: t.quote, authorName: t.authorName }));
  } catch {
    testimonialList = [
      { quote: "I didn't know what to expect, but the process was clear and easy to follow. I felt welcomed immediately.", authorName: "Tina R." },
      { quote: "The team was always available to answer my questions. That kind of support makes a big difference.", authorName: "Jason M." },
      { quote: "Joining a community of 900,000 members showed me I wasn't alone. I've found opportunities I never thought were possible.", authorName: "Mark R." },
      { quote: "DiversyFund's platform gave me access I never had before. It's opened up a world I didn't think was built for people like me.", authorName: "Sarah T." },
      { quote: "I felt informed every step of the way. The platform made it easy to get started and stay in control.", authorName: "Alex P." },
    ];
  }

  const stats = STAT_LABELS.map((label, i) => ({
    label,
    value: c[`stat_${label.toLowerCase()}`] ?? (i === 2 ? "$0 M+" : "0+"),
    icon: STAT_ICONS[i],
  }));

  const values = [1, 2, 3, 4].map((i) => ({
    title: c[`value_${i}_title`],
    body: c[`value_${i}_body`],
    icon: VALUE_ICONS[i - 1],
  }));

  const journey = [1, 2, 3, 4, 5, 6].map((i) => ({
    year: c[`journey_${i}_year`],
    title: c[`journey_${i}_title`],
    body: c[`journey_${i}_body`],
  })).filter((j) => j.year && j.title);

  return (
    <SiteLayout>
      <div className={cn("flex flex-col", brand.bg, brand.text)}>
        {/* Hero - full-width image + overlay text */}
        <section className="relative pt-20 sm:pt-24">
          <div className="relative h-64 w-full sm:h-80 md:h-96">
            <img
              src="/migrated/home/home-1.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <Container className="pb-10 sm:pb-14">
                <div className={cn("text-xs tracking-[0.18em] uppercase text-white/90", brand.accent)}>
                  {c.about_eyebrow}
                </div>
                <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                  {c.about_title}
                </h1>
              </Container>
            </div>
          </div>
          <Container className="mt-10 sm:mt-12">
            <p className={cn("max-w-3xl text-lg leading-relaxed", brand.muted)}>
              {c.about_intro}
            </p>
          </Container>
        </section>

        {/* Our Mission - two columns with team image */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className={cn("text-2xl font-semibold sm:text-3xl", brand.text)}>
                  {c.about_mission_title}
                </h2>
                <p className={cn("mt-6 text-base leading-relaxed", brand.muted)}>
                  {c.about_mission_body}
                </p>
              </div>
              <div className="order-first lg:order-last">
                <img
                  src="/migrated/content/about/img-2.png"
                  alt="DiversyFund team"
                  className="w-full max-w-md rounded-2xl object-contain"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Proven Results - Stats */}
        <section className="py-16 sm:py-20">
          <Container>
            <h2 className={cn("mb-12 text-center text-2xl font-semibold sm:text-3xl", brand.text)}>
              {c.about_results_title}
            </h2>
            <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <img src={s.icon} alt="" className="h-14 w-14 object-contain" aria-hidden />
                  <div className={cn("mt-3 text-2xl font-bold sm:text-3xl", brand.text)}>
                    {s.value}
                  </div>
                  <div className={cn("mt-1 text-sm", brand.muted)}>{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Our Values */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionTitle title={c.about_values_title} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <Card key={v.title}>
                  {v.icon && (
                    <img src={v.icon} alt="" className="h-12 w-12 object-contain" aria-hidden />
                  )}
                  <h3 className={cn("mt-4 text-lg font-semibold", brand.text)}>{v.title}</h3>
                  <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>{v.body}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Our Journey - Timeline */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionTitle title={c.about_journey_title} />
            <div className="mt-12 border-l-2 border-diversy-primary/40 pl-8 sm:pl-10">
              {journey.map((j) => (
                <div key={j.year} className="relative pb-12 last:pb-0">
                  <div
                    className="absolute -left-8 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-diversy-primary"
                    aria-hidden
                  />
                  <div className={cn("font-bold", brand.accent)}>{j.year}</div>
                  <h3 className={cn("mt-1 font-semibold", brand.text)}>{j.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{j.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonials */}
        {testimonialList.length > 0 && (
          <section className="py-16 sm:py-20">
            <Container>
              <SectionTitle eyebrow={c.testimonials_eyebrow} title={c.testimonials_title} />
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonialList.map((t, i) => (
                  <div
                    key={t.authorName ?? i}
                    className={cn("rounded-xl border p-6", brand.border, brand.panel)}
                  >
                    <p className={cn("text-sm leading-relaxed", brand.text)}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className={cn("mt-4 text-sm font-semibold", brand.accent)}>
                      {t.authorName}
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
