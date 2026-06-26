/** Prefix for A/B variant routes — `/book/df-income/v/<slug>`. */
export const DF_INCOME_BOOK_VARIANT_PREFIX = "/book/df-income/v";

export const DF_INCOME_BOOK_VARIANTS = {
  target: {
    slug: "target",
    pageKey: "book-df-income-target",
    leadSignupSource: "book-df-income-target",
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
  targeted: "target",
};

export function resolveDfIncomeBookVariant(slug) {
  const normalized = String(slug ?? "").trim().toLowerCase();
  const legacy = LEGACY_VARIANT_REDIRECTS[normalized];
  const key = legacy ?? normalized;
  return DF_INCOME_BOOK_VARIANTS[key] ?? null;
}

export function listDfIncomeBookVariantSlugs() {
  return Object.keys(DF_INCOME_BOOK_VARIANTS);
}

export function buildDfIncomeBookVariantPath(slug) {
  return `${DF_INCOME_BOOK_VARIANT_PREFIX}/${slug}`;
}
