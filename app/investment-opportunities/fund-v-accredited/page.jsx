import { getContentBlock } from "@/lib/content";
import { brand, cn } from "@/lib/theme";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FundVPage() {
  const title = (await getContentBlock("fund_v", "title")) ?? "Fund V – Real Estate Accredited Investor Fund";
  const body = (await getContentBlock("fund_v", "body")) ?? "";
  const primaryImage = "/migrated/home/home-1.jpg";

  return (
    <SiteLayout>
      <div className="py-16 sm:py-20">
        <Container>
          {primaryImage && (
            <div className="mb-10 overflow-hidden rounded-2xl">
              <img
                src={primaryImage}
                alt=""
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold sm:text-4xl", brand.text)}>
            {title}
          </h1>
          {body && (
            <div
              className={cn("mt-6 whitespace-pre-line text-base leading-relaxed", brand.muted)}
            >
              {body}
            </div>
          )}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className={cn("text-xl font-semibold", brand.text)}>Investment Details</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Focused on long-term value creation and portfolio diversification.",
                "Targets distressed & value-add multifamily properties across the U.S.",
                "Accredited investors only, IRA Eligible",
                "Minimum: $100,000",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className={cn("mt-0.5 h-5 w-5 shrink-0", brand.accent)} />
                  <span className={cn("text-sm", brand.text)}>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="https://portal.diversyfund.com/investor-registration?offering=88" target="_blank" rel="noopener noreferrer">
                Invest Now
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
