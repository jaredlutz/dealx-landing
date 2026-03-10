import Link from "next/link";
import { getContentBlock } from "@/lib/content";
import { brand, cn } from "@/lib/theme";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function InvestmentOpportunitiesPage() {
  const title = (await getContentBlock("investment_opportunities", "title")) ?? "Investment Opportunities";
  const body = (await getContentBlock("investment_opportunities", "body")) ?? "";
  const primaryImage = "/migrated/home/home-14.jpeg";

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
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/multifamily-investment-fund">
              Learn About Multifamily Fund
            </Button>
            <Button href="/invest-with-ira" variant="secondary">
              Invest with IRA
            </Button>
            <Button href="/investment-opportunities/fund-v-accredited" variant="secondary">
              Learn More About Fund V
            </Button>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
