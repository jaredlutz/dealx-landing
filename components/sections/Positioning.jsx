import { Layers, LineChart } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

export default function Positioning() {
  return (
    <section className="pt-14">
      <Container>
        <SectionTitle
          eyebrow="Positioning"
          title="Private markets without amateur structuring"
          subtitle="Most private investments are sold. Few are engineered. Built for investors who value structure, process, and execution over stories."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <div className="flex items-start gap-3">
              <Layers className={cn("h-5 w-5", brand.gold)} />
              <div>
                <div className={cn("font-semibold", brand.text)}>Structure before scale</div>
                <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                  Defined maturity mechanics, clear income cadence, and disclosed terms prior to subscription.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-3">
              <LineChart className={cn("h-5 w-5", brand.gold)} />
              <div>
                <div className={cn("font-semibold", brand.text)}>Execution is the brand</div>
                <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                  Professional reporting rhythm and operational consistency—built to perform through cycles.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className={cn("mt-8 rounded-2xl border p-6", brand.border, brand.panel)}>
          <div className={cn("font-semibold text-lg", brand.text)}>Capital demands discipline.</div>
          <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
            You're not here for excitement. You're here for clarity, downside awareness, and defined outcomes.
            That's what this platform is built to deliver.
          </p>
        </div>
      </Container>
    </section>
  );
}
