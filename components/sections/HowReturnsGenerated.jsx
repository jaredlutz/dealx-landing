import { Building2, RefreshCw, TrendingUp, FileText } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const SOURCES = [
  { icon: Building2, title: "Multifamily property cash flow", desc: "Rental income from apartment communities." },
  { icon: RefreshCw, title: "Refinance events", desc: "Capital events when properties are refinanced." },
  { icon: TrendingUp, title: "Asset appreciation", desc: "Value growth over the hold period." },
  { icon: FileText, title: "Structured income instruments", desc: "Contractual distributions per documentation." },
];

export default function HowReturnsGenerated() {
  return (
    <section className="pt-20">
      <Container>
        <SectionTitle
          eyebrow="Mechanics"
          title="How income is generated"
          subtitle="Returns are distributed per defined documentation, typically on a quarterly cadence."
          titleSize="large"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOURCES.map((s) => (
            <Card key={s.title}>
              <div className="flex items-start gap-3">
                <s.icon className={cn("h-5 w-5 shrink-0", brand.gold)} />
                <div>
                  <div className={cn("font-semibold text-sm", brand.text)}>{s.title}</div>
                  <p className={cn("mt-1 text-xs", brand.muted)}>{s.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
