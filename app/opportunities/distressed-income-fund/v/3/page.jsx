import SubstantiveOfferingLp from "@/components/opportunities/SubstantiveOfferingLp";
import {
  DISTRESSED_INCOME_FUND_LP_CONTENT,
  distressedIncomeFundLpMetadata,
  distressedIncomeFundLpUrls,
} from "@/lib/opportunities/distressedIncomeFundLpPage";

export const metadata = distressedIncomeFundLpMetadata({ variant: "3" });

export default function DistressedIncomeFundV3Page() {
  const { investHref, ppmHref } = distressedIncomeFundLpUrls();

  return (
    <SubstantiveOfferingLp
      heroVariant="light"
      content={DISTRESSED_INCOME_FUND_LP_CONTENT}
      investHref={investHref}
      ppmHref={ppmHref}
    />
  );
}
