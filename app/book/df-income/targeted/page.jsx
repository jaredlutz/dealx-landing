import { redirect } from "next/navigation";
import { buildDfIncomeBookVariantPath } from "@/lib/book/dfIncomeBookVariants";

/** Legacy path → canonical v/1 URL. */
export default function DfIncomeTargetedLegacyRedirectPage() {
  redirect(buildDfIncomeBookVariantPath("1"));
}
