import { notFound, redirect } from "next/navigation";
import DfIncomeTargetVariantRoute from "@/components/book/dfIncomeBookVariants/target/DfIncomeTargetVariantRoute";
import {
  buildDfIncomeBookVariantPath,
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

  if (normalized === "targeted") {
    redirect(buildDfIncomeBookVariantPath("target"));
  }

  const config = resolveDfIncomeBookVariant(params.variant);
  if (!config) notFound();

  if (config.slug === "target") {
    return <DfIncomeTargetVariantRoute config={config} />;
  }

  notFound();
}
