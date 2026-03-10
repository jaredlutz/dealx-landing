import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const WHY_KEYS = [
  ["why_1_title", "why_1_body", "/migrated/home/home-5.png"],
  ["why_2_title", "why_2_body", "/migrated/home/home-6.png"],
  ["why_3_title", "why_3_body", "/migrated/home/home-7.png"],
  ["why_4_title", "why_4_body", "/migrated/home/home-8.png"],
  ["why_5_title", "why_5_body", "/migrated/home/home-9.png"],
];

export default function WhyInvest({ content = {} }) {
  const items = WHY_KEYS.map(([titleKey, bodyKey, defaultIcon]) => ({
    title: content[titleKey] ?? "",
    body: content[bodyKey] ?? "",
    icon: content[`${titleKey.replace("_title", "_icon")}`] || defaultIcon,
  })).filter((i) => i.title || i.body);

  if (items.length === 0) return null;

  return (
    <section id="why" className="py-16 sm:py-20">
      <Container>
        <SectionTitle title="Why Invest With Us" subtitle="" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title}>
              {item.icon && (
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden
                  className="h-12 w-12 object-contain"
                />
              )}
              <h3 className={cn("mt-3 text-lg font-semibold", brand.text)}>{item.title}</h3>
              <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                {item.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
