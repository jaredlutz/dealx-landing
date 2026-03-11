import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const articles = [
  { title: "Private-market fixed income vs. equity", desc: "How duration, distributions, and risk differ in private markets." },
  { title: "How quarterly income structures work", desc: "What cadence means, how reporting aligns, and what to look for." },
  { title: "Defined terms and maturity mechanics", desc: "Why terms matter and how maturity is documented." },
  { title: "Security-first: collateral and documentation", desc: "What protections may exist and how to evaluate the framework." },
  { title: "How to evaluate private-market opportunities responsibly", desc: "A disciplined checklist for serious allocators." },
];

export default function Resources() {
  const [firstFour, featured] = [articles.slice(0, 4), articles[4]];

  return (
    <section id="resources" className="pt-16">
      <Container>
        <SectionTitle
          eyebrow="Resources"
          title="Education for disciplined allocation"
          subtitle="Clear, direct explanations built for investors who want to understand structure—not marketing."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {firstFour.map((a) => (
            <Card key={a.title}>
              <div className={cn("font-semibold", brand.text)}>{a.title}</div>
              <p className={cn("mt-2 text-sm", brand.muted)}>{a.desc}</p>
              <div className="mt-4">
                <a
                  href="#"
                  className={cn("text-sm font-semibold rounded px-2 -mx-2 py-2 inline-flex items-center min-h-[44px] transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50", brand.accent, "hover:underline")}
                >
                  Read →
                </a>
              </div>
            </Card>
          ))}
        </div>

        {featured && (
          <div className="mt-4 flex justify-center">
            <Card className="w-full max-w-2xl">
              <div className={cn("font-semibold", brand.text)}>{featured.title}</div>
              <p className={cn("mt-2 text-sm", brand.muted)}>{featured.desc}</p>
              <div className="mt-4">
                <a
                  href="#"
                  className={cn("text-sm font-semibold rounded px-2 -mx-2 py-2 inline-flex items-center min-h-[44px] transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50", brand.accent, "hover:underline")}
                >
                  Read →
                </a>
              </div>
            </Card>
          </div>
        )}
      </Container>
    </section>
  );
}
