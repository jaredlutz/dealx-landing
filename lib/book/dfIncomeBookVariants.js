import {
  DF_INCOME_CANONICAL_VARIANT_SLUG,
  DF_INCOME_CANONICAL_LP_PATH,
} from "@/lib/book/dfIncomeOpportunityUrls";

/** Public A/B variant routes — only v/1 is live; others redirect in next.config. */
export const DF_INCOME_BOOK_VARIANT_PREFIX = "/incomeopportunity/v";

export const DF_INCOME_CANONICAL_VARIANT = DF_INCOME_CANONICAL_VARIANT_SLUG;

export const DF_INCOME_BOOK_VARIANTS = {
  "1": {
    slug: "1",
    pageKey: "book-df-income-v1",
    leadSignupSource: "book-df-income-v1",
    theme: "consistent-blue",
    title:
      "DF Income — Target 12–18% Annual Income, Backed by Distressed Multifamily Debt | DiversyFund",
    description:
      "An institutional-style fixed income strategy for accredited investors. Target 12–18% annual income backed by discounted multifamily debt, run by a team that has operated through multiple market cycles. Book a private call.",
    openGraph: {
      title: "DF Income — Target 12–18% Annual Income | DiversyFund",
      description:
        "Promissory notes under Reg D 506(c). Target 12–18% annual income backed by distressed multifamily debt. Accredited investors only.",
    },
  },
};

const LEGACY_VARIANT_REDIRECTS = {
  targeted: DF_INCOME_CANONICAL_VARIANT_SLUG,
  target: DF_INCOME_CANONICAL_VARIANT_SLUG,
  "2": DF_INCOME_CANONICAL_VARIANT_SLUG,
  "3": DF_INCOME_CANONICAL_VARIANT_SLUG,
  "4": DF_INCOME_CANONICAL_VARIANT_SLUG,
};

export function resolveDfIncomeBookVariant(slug) {
  const normalized = String(slug ?? "").trim().toLowerCase();
  const legacy = LEGACY_VARIANT_REDIRECTS[normalized];
  const key = legacy ?? normalized;
  return DF_INCOME_BOOK_VARIANTS[key] ?? null;
}

export function listDfIncomeBookVariantSlugs() {
  return [DF_INCOME_CANONICAL_VARIANT_SLUG];
}

export function buildDfIncomeBookVariantPath(slug = DF_INCOME_CANONICAL_VARIANT_SLUG) {
  return `${DF_INCOME_BOOK_VARIANT_PREFIX}/${slug}`;
}

export function isRetiredDfIncomeBookVariant(slug) {
  const normalized = String(slug ?? "").trim().toLowerCase();
  return normalized !== DF_INCOME_CANONICAL_VARIANT_SLUG;
}

export { DF_INCOME_CANONICAL_LP_PATH };
