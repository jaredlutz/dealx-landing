import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const testimonials = [
  {
    quote:
      "Joining a community of 900,000 members showed me I wasn't alone. I've found opportunities I never thought were possible.",
    author: "Mark R.",
  },
  {
    quote:
      "DiversyFund's platform gave me access I never had before. It's opened up a world I didn't think was built for people like me.",
    author: "Sarah T.",
  },
  {
    quote:
      "I felt informed every step of the way. The platform made it easy to get started and stay in control.",
    author: "Alex P.",
  },
  {
    quote:
      "This service gave me clarity I never had. Now I feel confident making decisions that impact my future.",
    author: "Jessica L.",
  },
  {
    quote:
      "The insights I gained here transformed the way I approach my projects. Truly invaluable.",
    author: "Daniel W.",
  },
];

export default function Testimonials() {
  return (
    <section className="pt-20">
      <Container>
        <SectionTitle
          eyebrow="Testimonials"
          title="What Our Investors Say"
          titleSize="large"
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ quote, author }) => (
            <Card key={author}>
              <p className={cn("text-sm leading-relaxed", brand.muted)}>
                &ldquo;{quote}&rdquo;
              </p>
              <footer className={cn("mt-4 font-semibold", brand.gold)}>
                — {author}
              </footer>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
