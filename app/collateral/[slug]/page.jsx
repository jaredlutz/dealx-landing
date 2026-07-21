import { Suspense } from "react";
import { notFound } from "next/navigation";
import SubstantiveCollateralLp from "@/components/collateral/SubstantiveCollateralLp";
import { BUSINESS_PLAN_LP } from "@/lib/collateral/businessPlanLpContent";
import { LOOKALIKE_SUMMARY_LP } from "@/lib/collateral/lookalikeSummaryLpContent";
import { DISTRESSED_INCOME_FUND_LP } from "@/lib/collateral/distressedIncomeFundLpContent";
import { SUMMARY_LP } from "@/lib/collateral/summaryLpContent";
import { IRA_LP } from "@/lib/collateral/iraLpContent";
import { MARKET_CYCLES_LP } from "@/lib/collateral/marketCyclesLpContent";

export const dynamic = "force-dynamic";

const SUBSTANTIVE_BY_SLUG = {
  summary: SUMMARY_LP,
  "lookalike-summary": LOOKALIKE_SUMMARY_LP,
  "distressed-income-fund": DISTRESSED_INCOME_FUND_LP,
  "investment-thesis": BUSINESS_PLAN_LP,
  ira: IRA_LP,
  "market-cycles": MARKET_CYCLES_LP,
};

export function generateStaticParams() {
  return Object.keys(SUBSTANTIVE_BY_SLUG).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = SUBSTANTIVE_BY_SLUG[params.slug];
  if (!content) return { title: "Collateral | DiversyFund" };
  return {
    title: content.pageTitle,
    description: content.heroSupport,
    robots: { index: false, follow: false },
  };
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9fafb] text-sm text-zinc-500">
      Loading…
    </div>
  );
}

export default function CollateralCampaignPage({ params }) {
  const content = SUBSTANTIVE_BY_SLUG[params.slug];
  if (!content) notFound();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <SubstantiveCollateralLp content={content} />
    </Suspense>
  );
}
