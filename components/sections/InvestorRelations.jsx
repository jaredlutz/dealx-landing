import { CheckCircle2, Lock, Mail } from "lucide-react";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

export default function InvestorRelations() {
  return (
    <section id="ir" className="pt-16 pb-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="Investor Relations"
              title="Access current income investments"
              subtitle="Eligibility review is required to access full offering documentation. Start here if you allocate meaningful capital and want defined terms."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className={cn("font-semibold", brand.text)}>Eligibility</div>
                    <p className={cn("mt-2 text-sm", brand.muted)}>
                      Confirm investor profile and access requirements to view documentation.
                    </p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-3">
                  <Lock className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className={cn("font-semibold", brand.text)}>Verification</div>
                    <p className={cn("mt-2 text-sm", brand.muted)}>
                      Compliance verification (KYC/AML) may be required based on jurisdiction and offering.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className={cn("mt-8 rounded-2xl border p-6", brand.border, brand.panel)}>
              <div className={cn("font-semibold", brand.text)}>Contact</div>
              <div className="mt-3 flex items-center gap-3">
                <Mail className={cn("h-4 w-4 shrink-0", brand.gold)} />
                <div>
                  <a
                    href="mailto:investorsupport@diversyfund.com"
                    className={cn("text-sm transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50 rounded px-2 -mx-2 py-1 inline-block", brand.text, "hover:opacity-80")}
                  >
                    investorsupport@diversyfund.com
                  </a>
                  <div className={cn("text-xs", brand.subtle)}>Investor support</div>
                </div>
              </div>
              <div className={cn("mt-5 text-xs", brand.subtle)}>
                This website is for informational purposes and does not constitute an offer to sell or a solicitation to buy securities.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className={cn("rounded-3xl border border-border bg-card p-6 text-card-foreground")}>
              <div className={cn("font-semibold text-lg", brand.text)}>Get started</div>
              <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                Create an account and complete eligibility review to access full offering documentation, onboarding, and platform access.
              </p>
              <div className="mt-6">
                <InvestCtaButton source="investor-relations">Start Eligibility Review</InvestCtaButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
