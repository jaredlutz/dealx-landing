import { Building2, FileText, Layers, ArrowDown } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const structures = [
  {
    icon: Building2,
    title: "Single-Asset Secured",
    flowLabel: "Collateralized note structure",
    desc: "Defined collateral. Defined exposure. Terms disclosed before subscription.",
    flow: ["Investor Capital", "Income Note", "Single Apartment Property"],
  },
  {
    icon: FileText,
    title: "Instrument-Based Secured",
    flowLabel: "Portfolio-backed instrument",
    desc: "Contractual protections and mechanics structured up front.",
    flow: ["Investor Capital", "Income Instrument", "Secured Asset(s)"],
  },
  {
    icon: Layers,
    title: "Multi-Asset Secured",
    flowLabel: "Multi-property vehicle",
    desc: "Income supported across multiple properties under one framework.",
    flow: ["Investor Capital", "Structured Vehicle", "Portfolio of Properties"],
  },
];

export default function Structures() {
  return (
    <section className="pt-20">
      <Container>
        <SectionTitle
          eyebrow="Framework"
          title="Three fixed-income structures"
          subtitle="Different structures. One standard: disciplined terms and execution."
          titleSize="large"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {structures.map((s) => (
            <Card key={s.title} className="flex flex-col">
              <div className="flex items-start gap-3">
                <s.icon className={cn("h-5 w-5 shrink-0", brand.gold)} />
                <div>
                  <div className={cn("font-semibold", brand.text)}>{s.title}</div>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{s.desc}</p>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50/50 p-3 dark:border-white/10 dark:bg-white/5">
              <div className={cn("mb-2 text-center text-[10px] uppercase tracking-wider", brand.subtle)}>
                {s.flowLabel}
              </div>
                <div className="flex flex-col items-center gap-1">
                  {s.flow.map((step, i) => (
                    <div key={step} className="flex flex-col items-center gap-1">
                      <span className={cn("text-center text-xs font-medium", brand.text)}>{step}</span>
                      {i < s.flow.length - 1 && (
                        <ArrowDown className={cn("h-3 w-3", brand.subtle)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
