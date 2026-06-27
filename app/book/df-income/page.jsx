import { redirect } from "next/navigation";
import { DF_INCOME_CANONICAL_LP_PATH } from "@/lib/book/dfIncomeOpportunityUrls";

/** Legacy control path — canonical public URL is `/incomeopportunity/v/1`. */
export default function DfIncomeBookLegacyRedirectPage() {
  redirect(DF_INCOME_CANONICAL_LP_PATH);
}
