import { BarChart3, RefreshCw, Target } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const pillars = [
  {
    icon: BarChart3,
    title: "Consistent performance",
    desc: "Opportunities designed to generate double-digit returns.",
  },
  {
    icon: RefreshCw,
    title: "Strong returns through cycles",
    desc: "Capital deployed into structured real asset investments.",
  },
  {
    icon: Target,
    title: "Disciplined investment strategy",
    desc: "Investments designed with defined timelines and measurable outcomes.",
  },
];

export default function Positioning() {
  return (
    <section className="pt-20">
      <Container>
        <SectionTitle
          eyebrow="DiversyFund Positioning"
          title="Investors ultimately allocate capital for returns."
          subtitle="But sophisticated investors want repeatable performance, not a lucky deal."
          titleSize="large"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="flex flex-col">
              <Icon className={cn("h-5 w-5 shrink-0", brand.gold)} />
              <div className={cn("mt-4 font-semibold", brand.text)}>{title}</div>
              <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
