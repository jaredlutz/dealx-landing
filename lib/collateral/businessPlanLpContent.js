/**
 * Page content for /collateral/business-plan — teaser from the DF 2026 Fixed Income business plan.
 * Full detail lives in the downloadable document; this page drives one CTA: download.
 */

export const BUSINESS_PLAN_LP = {
  routeKey: "collateral-business-plan",
  documentSlug: "business-plan",
  pageTitle: "DF Income Business Plan | DiversyFund",
  downloadLabel: "Download the business plan",
  downloadFilename: "DF-2026-Fixed-Income-Business-Plan.docx",
  eyebrow: "DF 2026 Fixed Income, LLC · Business plan",
  heroTitleBefore: "How the fund is built for",
  heroAccent: "today's dislocation",
  heroTitleAfter: ".",
  heroUrgent: "Download the full business plan.",
  heroSupport:
    "Closed-end structure, discounted multifamily lending strategy, share classes, target markets, and deployment mechanics — for accredited investors reviewing DF Income.",
  heroSub: "Instant download · No form · Accredited · Reg D 506(c)",
  trust: [
    { value: "$20M", label: "Target fund size" },
    { value: "10", label: "Growth markets" },
    { value: "2 yr", label: "Deployment period" },
    { value: "$0.50–$0.70", label: "Target acquisition basis" },
    { value: "Accredited", label: "Reg D 506(c)" },
  ],
  sections: [
    {
      kind: "snapshot",
      eyebrow: "Fund snapshot",
      title: "What the business plan covers at a glance.",
      intro:
        "High-level terms from the plan. Full mechanics, risks, and illustrations are in the download.",
      showDownload: true,
      items: [
        { label: "Fund type", value: "Closed-end private fund" },
        { label: "Strategy", value: "Lending for discounted multifamily acquisitions" },
        { label: "Target raise", value: "$20M" },
        { label: "Deployment", value: "2 years from final close" },
        { label: "Wind-down", value: "1–2 years after deployment" },
        { label: "Distributions", value: "Quarterly (deal-cycle dependent)" },
      ],
    },
    {
      kind: "pillars",
      eyebrow: "Market opportunity",
      title: "Four forces creating the window.",
      intro:
        "The plan starts with why this cycle produces discounted multifamily debt — not a generic market essay.",
      showDownload: true,
      items: [
        {
          title: "Rate shock, repriced assets",
          body: "The fastest tightening cycle in roughly four decades forced multifamily valuations down. Owners who bought or refinanced at the peak now face maturities and debt-service gaps the conventional market cannot clear.",
        },
        {
          title: "Oversupply now, undersupply next",
          body: "Deliveries peaked near the high of the last four decades, then construction starts collapsed. Near-term rent pressure accelerates distress; the forward path points to structural undersupply as the overhang clears.",
        },
        {
          title: "Bank lending freeze",
          body: "Regional banks pulled back from CRE. That removes a primary refinance path for stressed owners — and creates motivated note and REO sellers at discounts leveraged buyers cannot match.",
        },
        {
          title: "Forced sellers and note sales",
          body: "Mom-and-pop maturity defaults, bank REO, and discounted notes from banks and special servicers. Private all-cash capital can close in days — the structural advantage this plan is built around.",
        },
      ],
    },
    {
      kind: "pillars",
      eyebrow: "Investment strategy",
      title: "How capital is put to work.",
      intro: "Acquisition basis, execution edge, and underwriting discipline — before share-class economics.",
      items: [
        {
          title: "Acquisition basis",
          body: "Target purchase prices around $0.50–$0.70 on the dollar of underwritten intrinsic value — B/C multifamily in A/B locations, typically 50–500 units.",
        },
        {
          title: "All-cash execution",
          body: "The Buyer acquires without bank financing at close, funded by loans from the Fund. Speed and certainty are the pricing edge.",
        },
        {
          title: "Two exits underwritten",
          body: "Every deal needs at least two viable exits at acquisition basis — downside first, not hope.",
        },
      ],
    },
    {
      kind: "cards",
      id: "exits",
      eyebrow: "Exit paths",
      title: "Three ways capital comes back.",
      intro: "Each acquisition is underwritten with at least two viable exits at the acquisition basis.",
      showDownload: true,
      items: [
        {
          title: "Wholesale resale",
          hold: "Primary · ~60–180 days",
          body: "Acquire all-cash, then resell to a vetted operator who takes out with traditional financing. Certainty of close is the product operators pay for.",
        },
        {
          title: "Refinance and hold",
          hold: "Longer · variable",
          body: "Stabilize, refinance, recoup capital, and retain income where the basis supports it.",
        },
        {
          title: "Light reposition",
          hold: "Longer hold",
          body: "Modest value-add where underwriting supports a larger exit — still with a defined path back to loan repayment.",
        },
      ],
    },
    {
      kind: "split",
      eyebrow: "Structure & terms",
      title: "How the fund is structured.",
      intro:
        "Share classes, accrual mechanics, and reporting — complete economics and risks are in the plan and PPM.",
      terms: [
        {
          title: "Share classes",
          body: "Class A and Class B are pari passu. Preferred returns are stated as maximums (simple, non-compounding) — not guarantees. Minimums and full economics are in the plan and PPM.",
        },
        {
          title: "When return accrues",
          body: "Preferred return accrues only on capital loaned to the Buyer for an active transaction. Undeployed capital sits in a money-market account; that interest is passed through quarterly.",
        },
        {
          title: "No fund-level promote",
          body: "No sponsor promote, management fee, or carried interest at the Fund level. Complete terms are in the PPM and Operating Agreement.",
        },
        {
          title: "Reporting",
          body: "Quarterly portfolio and capital-account reporting, plus audited annual statements and tax reporting.",
        },
      ],
      panelTitle: "What's inside the download",
      whatsInside: [
        "Executive summary and fund snapshot",
        "Market opportunity — four forces creating the window",
        "Investment strategy, acquisition criteria, and exit paths",
        "Ten target growth markets and sourcing channels",
        "Fund structure, share classes, capital mechanics, and distributions",
        "Illustrative deal economics and team overview",
      ],
    },
    {
      kind: "markets",
      eyebrow: "Target markets",
      title: "Ten growth markets in the plan.",
      intro: "Geographic focus for sourcing discounted multifamily opportunities.",
      items: [
        "Florida",
        "Charleston, SC",
        "Raleigh / Charlotte, NC",
        "San Antonio, TX",
        "Houston, TX",
        "Dallas, TX",
        "Salt Lake City, UT",
        "Phoenix, AZ",
        "Las Vegas, NV",
        "San Diego, CA",
      ],
    },
  ],
  ctaBand: {
    titleLine1: "Get the full",
    titleLine2: "business plan.",
    body: "Instant download — no form. Illustrative only; not an offer. Complete terms and risks are in the PPM.",
  },
  footer:
    "DiversyFund offerings are available only to accredited investors under Regulation D, Rule 506(c). This page is for informational purposes and is not an offer to sell securities. Preferred returns are stated as maximums (simple, non-compounding) — not guarantees. Past performance is not indicative of future results. Investments involve risk, including possible loss of principal. Review the Private Placement Memorandum before investing.",
};
