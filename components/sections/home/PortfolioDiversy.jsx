import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const PORTFOLIO_IMAGES = [
  "/migrated/home/home-10.jpg",
  "/migrated/home/home-11.jpg",
  "/migrated/home/home-12.jpg",
  "/migrated/home/home-13.jpg",
];

export default function PortfolioDiversy({ content = {} }) {
  const properties = [1, 2, 3, 4]
    .map((i) => ({
      name: content[`portfolio_${i}_name`],
      description: content[`portfolio_${i}_desc`],
      units: content[`portfolio_${i}_units`],
      image: content[`portfolio_${i}_image`] || PORTFOLIO_IMAGES[i - 1],
    }))
    .filter((p) => p.name);

  if (properties.length === 0) return null;

  return (
    <section id="portfolio" className="py-16 sm:py-20">
      <Container>
        <SectionTitle title="Our Portfolio" subtitle="" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((p) => (
            <Card key={p.name}>
              {p.image && (
                <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-40 w-full object-cover"
                  />
                </div>
              )}
              <h3 className={cn("text-lg font-semibold", brand.text)}>{p.name}</h3>
              <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                {p.description}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className={cn("text-xs uppercase", brand.subtle)}>Unit Size</span>
                <span className={cn("font-semibold", brand.text)}>{p.units} Units</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
