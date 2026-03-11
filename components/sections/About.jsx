import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

export default function About() {
  return (
    <section id="about" className="pt-16">
      <Container>
        <SectionTitle
          eyebrow="Leadership"
          title="Built by operators"
          titleSize="large"
        />
        <p className={cn("mt-3 max-w-3xl text-base leading-relaxed", brand.muted)}>
          Craig Cecilio has spent over two decades structuring real estate investments through multiple market cycles.
        </p>
        <p className={cn("mt-2 max-w-3xl text-base leading-relaxed", brand.muted)}>
          DiversyFund reflects that experience—focusing on structures designed to perform across changing conditions.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card>
              <div className={cn("font-semibold text-lg", brand.text)}>Cycle-tested leadership</div>
              <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                DiversyFund leadership has structured and managed real estate investments across multiple market cycles since the late 1990s.
              </p>
              <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                Craig Cecilio began structuring income-focused real estate vehicles in the late 1990s. That experience informs how we approach risk, duration design, documentation, and execution cadence.
              </p>
              <div className={cn("mt-4 text-sm", brand.muted)}>
                • Markets fluctuate. Discipline compounds.
                <br />• Private markets reward structure over optimism.
              </div>
            </Card>
          </div>
          <div className="lg:col-span-5">
            <Card>
              <div className={cn("font-semibold text-lg", brand.text)}>What we are not</div>
              <div className={cn("mt-3 text-sm", brand.muted)}>
                <div className="mt-1">• Not retail speculation</div>
                <div className="mt-1">• Not &quot;yield marketing&quot;</div>
                <div className="mt-1">• Not trend-driven finance</div>
              </div>
              <div className={cn("mt-5 text-sm", brand.muted)}>
                We are structured private-market income—designed for capital that expects standards.
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
