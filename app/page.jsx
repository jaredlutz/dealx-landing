import { asc } from "drizzle-orm";
import { getContentBlocksForPage } from "@/lib/content";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { homeFallbacks } from "@/lib/home-content";
import LandingPage from "@/components/LandingPage";

export const dynamic = "force-dynamic";

const defaultTestimonials = [
  { quote: "I didn't know what to expect, but the process was clear and easy to follow. I felt welcomed immediately.", authorName: "Tina R." },
  { quote: "The team was always available to answer my questions. That kind of support makes a big difference.", authorName: "Jason M." },
  { quote: "Joining a community of 900,000 members showed me I wasn't alone. I've found opportunities I never thought were possible.", authorName: "Mark R." },
  { quote: "DiversyFund's platform gave me access I never had before. It's opened up a world I didn't think was built for people like me.", authorName: "Sarah T." },
  { quote: "I felt informed every step of the way. The platform made it easy to get started and stay in control.", authorName: "Alex P." },
];

export default async function Home() {
  const blocks = await getContentBlocksForPage("home");
  const content = { ...homeFallbacks, ...blocks };

  let testimonialList = defaultTestimonials;
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));
    if (rows.length > 0) {
      testimonialList = rows.map((t) => ({
        quote: t.quote,
        authorName: t.authorName,
      }));
    }
  } catch {
    // use defaultTestimonials
  }

  return <LandingPage content={content} testimonials={testimonialList} />;
}
