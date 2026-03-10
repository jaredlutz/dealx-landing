import { Building2, FileText, Layers } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const items = [
  { icon: Building2, title: "Single-Asset Secured", desc: "Defined collateral. Defined exposure. Structured documentation before subscription." },
  { icon: FileText, title: "Instrument-Based Secured", desc: "Contractual protections structured up front with clarity on mechanics and terms." },
  { icon: Layers, title: "Multi-Asset Secured", desc: "Income supported across multiple real assets under a defined framework." },
];

export default function Structures() {
  return (
    <section className="pt-20">
      <Container>
        <SectionTitle
          eyebrow="Framework"
          title="Three fixed-income structures"
          subtitle="Different structures. One standard: disciplined terms, documentation, and execution."
          titleSize="large"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title}>
              <div className="flex items-start gap-3">
                <it.icon className={cn("h-5 w-5", brand.gold)} />
                <div>
                  <div className="text-white font-semibold">{it.title}</div>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{it.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={cn("mt-6 text-sm", brand.subtle)}>
          Each opportunity includes defined duration, income cadence, and risk disclosures.
        </div>
      </Container>
    </section>
  );
}
