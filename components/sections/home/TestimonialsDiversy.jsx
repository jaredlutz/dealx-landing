import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const defaultTestimonials = [
  { quote: "I didn't know what to expect, but the process was clear and easy to follow. I felt welcomed immediately.", authorName: "Tina R." },
  { quote: "The team was always available to answer my questions. That kind of support makes a big difference.", authorName: "Jason M." },
  { quote: "Joining a community of 900,000 members showed me I wasn't alone. I've found opportunities I never thought were possible.", authorName: "Mark R." },
  { quote: "DiversyFund's platform gave me access I never had before. It's opened up a world I didn't think was built for people like me.", authorName: "Sarah T." },
  { quote: "I felt informed every step of the way. The platform made it easy to get started and stay in control.", authorName: "Alex P." },
];

export default function TestimonialsDiversy({ content = {}, testimonials = [] }) {
  const eyebrow = content.testimonials_eyebrow ?? "TESTIMONIAL";
  const title = content.testimonials_title ?? "What Our Investors Say";
  const list = testimonials.length > 0 ? testimonials : defaultTestimonials;

  if (list.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 sm:py-20">
      <Container>
        <SectionTitle eyebrow={eyebrow} title={title} subtitle="" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
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
  );
}
