import Image from "next/image";
import { Building2, FileText, Layers, ArrowDown, CheckCircle2 } from "lucide-react";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
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
    <section className={cn("relative bg-background pt-20 pb-16 sm:pb-24", brand.sectionRule)}>
      <Container>
        <div className={cn("mb-14 rounded-3xl border border-border bg-card p-6 sm:p-8")}>
          <div className={cn("text-xs tracking-[0.18em] uppercase", brand.subtle)}>Allocation Profile</div>
          <div className={cn("mt-3 text-xl font-semibold", brand.text)}>Designed for $100K–$1M allocators</div>
          <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
            If you allocate meaningful capital and expect defined terms, disciplined operations, and professional reporting—this platform is
            built for you.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Defined duration", "Quarterly distributions", "Risk disclosure before commitment", "Investor dashboard & quarterly reporting"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <CheckCircle2 className={cn("h-5 w-5 shrink-0", brand.gold)} />
                <div className={cn("text-sm", brand.text)}>{t}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <InvestCtaButton source="structures-allocation">Start Eligibility Review</InvestCtaButton>
          </div>

          <div className={cn("mt-6 text-xs", brand.subtle)}>Investing involves risk, including loss of principal.</div>
        </div>

        <figure className="relative mb-14 aspect-[2.4/1] min-h-[11rem] w-full max-h-[min(22rem,42vw)] overflow-hidden rounded-2xl border border-border sm:rounded-3xl sm:max-h-[20rem] lg:max-h-[22rem]">
          <Image
            src="/migrated/home/home-11.jpg"
            alt="Contemporary multifamily residential architecture"
            fill
            quality={85}
            className="object-cover object-[center_22%]"
            sizes="(min-width: 1024px) 896px, 100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/10 to-transparent dark:from-black/60 dark:via-black/15 dark:to-transparent"
            aria-hidden
          />
          <figcaption
            className={cn(
              "absolute bottom-4 left-4 max-w-[min(20rem,70%)] text-xs font-semibold uppercase tracking-[0.14em] sm:bottom-5 sm:left-6",
              "text-gray-900/90 dark:text-foreground"
            )}
          >
            Collateral you can see
          </figcaption>
        </figure>

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
              <div className="mt-5 rounded-lg border border-border bg-muted/60 p-3 dark:bg-muted">
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
