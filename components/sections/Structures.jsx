import { CheckCircle2 } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Structures() {
  return (
    <section className={cn("relative bg-background pt-20 pb-16 sm:pb-24", brand.sectionRule)}>
      <Container>
        <div className={cn("rounded-3xl border border-border bg-card p-6 sm:p-8")}>
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
            <Button href="/about" className="self-start">Learn More</Button>
          </div>

          <div className={cn("mt-6 text-xs", brand.subtle)}>Investing involves risk, including loss of principal.</div>
        </div>
      </Container>
    </section>
  );
}
