import Image from "next/image";
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
    <section className={cn("relative bg-background pt-20 pb-16 sm:pb-20", brand.sectionRule)}>
      <Container>
        <SectionTitle
          eyebrow="DiversyFund Positioning"
          title="Investors ultimately allocate capital for returns."
          subtitle="But sophisticated investors want repeatable performance, not a lucky deal."
          titleSize="large"
        />

        <figure className="relative mt-10 aspect-[2.15/1] w-full max-h-[min(22rem,52vw)] overflow-hidden rounded-2xl border border-border sm:mt-12 sm:max-h-[24rem]">
          <Image
            src="/migrated/home/home-1.jpg"
            alt="Professional team in a governance and portfolio review session"
            fill
            quality={85}
            className="object-cover object-[center_38%]"
            sizes="(min-width: 1024px) 896px, 100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent dark:from-black/55 dark:via-black/25"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent dark:from-black/50"
            aria-hidden
          />
          <figcaption className="absolute bottom-4 left-4 max-w-md text-sm font-medium leading-snug text-white/95 sm:bottom-5 sm:left-6 sm:text-base">
            Cycle-tested leadership • Institutional standards
          </figcaption>
        </figure>

        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3">
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
