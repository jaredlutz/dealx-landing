import { redirect } from "next/navigation";
import { buildDfIncomeBookVariantPath } from "@/lib/book/dfIncomeBookVariants";

/** Legacy path → canonical A/B variant URL. */
export default function DfIncomeTargetedLegacyRedirectPage() {
  redirect(buildDfIncomeBookVariantPath("target"));
}
