import SubstantiveOfferingLp from "@/components/opportunities/SubstantiveOfferingLp";
import {
  DISTRESSED_INCOME_FUND_LP_CONTENT,
  distressedIncomeFundLpMetadata,
  distressedIncomeFundLpUrls,
} from "@/lib/opportunities/distressedIncomeFundLpPage";

export const metadata = distressedIncomeFundLpMetadata({ variant: "2" });

export default function DistressedIncomeFundV2Page() {
  const { investHref, ppmHref } = distressedIncomeFundLpUrls();

  return (
    <SubstantiveOfferingLp
      content={DISTRESSED_INCOME_FUND_LP_CONTENT}
      investHref={investHref}
      ppmHref={ppmHref}
    />
  );
}
