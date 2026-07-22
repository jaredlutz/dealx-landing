import {
  MARKETING_PORTAL_DISTRESSED_INCOME_FUND_OFFERING_URL,
  marketingPortalOfferingDocumentsUrl,
} from "@/lib/marketing-portal-offerings";
import { DISTRESSED_INCOME_FUND_OFFERING_ID } from "@/lib/distressed-income-fund";
import { DISTRESSED_INCOME_FUND_V2 } from "@/lib/opportunities/distressedIncomeFundV2Content";
import { publicPageMetadata } from "@/lib/site-seo";

export const DISTRESSED_INCOME_FUND_LP_CONTENT = DISTRESSED_INCOME_FUND_V2;

export function distressedIncomeFundLpUrls() {
  return {
    investHref: MARKETING_PORTAL_DISTRESSED_INCOME_FUND_OFFERING_URL,
    ppmHref: marketingPortalOfferingDocumentsUrl(DISTRESSED_INCOME_FUND_OFFERING_ID),
  };
}

export function distressedIncomeFundLpMetadata(options = {}) {
  const variant = options.variant ?? "2";
  const path = `/opportunities/distressed-income-fund/v/${variant}`;

  return publicPageMetadata({
    title: "Distressed Income Fund",
    description: DISTRESSED_INCOME_FUND_V2.hero.body,
    path,
  });
}
