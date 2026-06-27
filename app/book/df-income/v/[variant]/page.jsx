import { notFound, redirect } from "next/navigation";
import DfIncomeTargetVariantRoute from "@/components/book/dfIncomeBookVariants/target/DfIncomeTargetVariantRoute";
import {
  buildDfIncomeBookVariantPath,
  DF_INCOME_CANONICAL_VARIANT,
  isRetiredDfIncomeBookVariant,
  listDfIncomeBookVariantSlugs,
  resolveDfIncomeBookVariant,
} from "@/lib/book/dfIncomeBookVariants";

export function generateStaticParams() {
  return listDfIncomeBookVariantSlugs().map((variant) => ({ variant }));
}

export async function generateMetadata({ params }) {
  const { variant } = params;
  const config = resolveDfIncomeBookVariant(variant);
  if (!config) return {};
  return {
    title: config.title,
    description: config.description,
    openGraph: config.openGraph,
  };
}

export default function DfIncomeBookVariantPage({ params }) {
  const normalized = String(params.variant ?? "").trim().toLowerCase();

  if (isRetiredDfIncomeBookVariant(normalized)) {
    redirect(buildDfIncomeBookVariantPath(DF_INCOME_CANONICAL_VARIANT));
  }

  const config = resolveDfIncomeBookVariant(params.variant);
  if (!config) notFound();

  return <DfIncomeTargetVariantRoute config={config} />;
}
