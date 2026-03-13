import Container from "@/components/ui/Container";

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

export default function WebinarTestimonials() {
  return (
    <section className="border-t border-gray-200 bg-white py-16 sm:py-24">
      <Container>
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Testimonials
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-gray-600">
          What Our Investors Say
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ quote, author }) => (
            <blockquote
              key={author}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <p className="text-gray-700">&ldquo;{quote}&rdquo;</p>
              <footer className="mt-4 font-semibold text-diversy-primary">
                — {author}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
