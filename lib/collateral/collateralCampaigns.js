/**
 * DF Income collateral mini-campaign LPs on diversyfund.com.
 * Always ungated download. Visual language matches /incomeopportunity/v/1.
 * Secondary / retarget destination = canonical booking LP.
 */

import { DF_INCOME_CANONICAL_LP_PATH } from "@/lib/book/dfIncomeOpportunityUrls";

/** Canonical LP for Book CTAs and Meta retarget destinations. */
export const COLLATERAL_BOOK_LP_PATH = DF_INCOME_CANONICAL_LP_PATH;

export const COLLATERAL_CAMPAIGNS = {
  summary: {
    routeKey: "collateral-summary",
    path: "/collateral/summary",
    documentSlug: "product-deck",
    pageTitle: "Investment Summary | DiversyFund",
    eyebrow: "",
    /** React nodes built in component from these parts */
    heroLead: "Investment",
    heroAccent: "Summary",
    heroTail: ".",
    heroUrgent: "",
    heroSub: "Instant download · No form · Accredited · Reg D 506(c)",
    downloadLabel: "Download the summary",
    downloadFilename: "DiversyFund-DF-Income-Product-Deck.pdf",
    supportLine:
      "Structure, rate classes, and how capital deploys — in one download for accredited investors.",
  },
  "lookalike-summary": {
    routeKey: "collateral-lookalike-summary",
    path: "/collateral/lookalike-summary",
    documentSlug: "lookalike-summary",
    pageTitle: "Investment Summary | DiversyFund",
    eyebrow: "",
    heroLead: "Investment",
    heroAccent: "Summary",
    heroTail: ".",
    heroUrgent: "",
    heroSub: "Instant download · No form · Accredited · Reg D 506(c)",
    downloadLabel: "Download the summary",
    downloadFilename: "DiversyFund-DF-Income-Product-Deck.pdf",
    supportLine:
      "Structure, rate classes, and how capital deploys — in one download for accredited investors.",
  },
  "investment-thesis": {
    routeKey: "collateral-business-plan",
    path: "/collateral/investment-thesis",
    documentSlug: "business-plan",
    pageTitle: "Investment Thesis | DiversyFund",
    eyebrow: "",
    heroLead: "The",
    heroAccent: "investment thesis",
    heroTail: " for today's market.",
    heroUrgent: "",
    heroSub: "Instant download · No form · Accredited · Reg D 506(c)",
    downloadLabel: "Download the investment thesis",
    downloadFilename: "DF-2026-Fixed-Income-Business-Plan.docx",
    supportLine:
      "Structure, economics, and deployment mechanics — for accredited investors evaluating the approach.",
  },
  ira: {
    routeKey: "collateral-ira",
    path: "/collateral/ira",
    documentSlug: "ira-investing",
    pageTitle: "Invest with an IRA | DiversyFund",
    eyebrow: "",
    heroLead: "Invest with an",
    heroAccent: "IRA",
    heroTail: ".",
    heroUrgent: "",
    heroSub: "Instant download · No form · Educational only · Not tax advice",
    downloadLabel: "Download the IRA guide",
    downloadFilename: "DiversyFund-IRA-Investing-Overview.pdf",
    supportLine:
      "Custodian mechanics, funding paths, and eligibility — for accredited investors considering private real estate through a self-directed account.",
  },
  "market-cycles": {
    routeKey: "collateral-market-cycles",
    path: "/collateral/market-cycles",
    documentSlug: "market-cycles",
    pageTitle: "Reading Real Estate Market Cycles | DiversyFund",
    eyebrow: "",
    heroLead: "Reading real estate",
    heroAccent: "market cycles",
    heroTail: ".",
    heroUrgent: "",
    heroSub: "Instant download · No form · Educational · Not an offer",
    downloadLabel: "Download the market cycles brief",
    downloadFilename: "DiversyFund-Reading-Real-Estate-Market-Cycles.pdf",
    supportLine:
      "How rate, credit, and supply cycles create acquisition windows — and why private capital can act when banks cannot.",
  },
};

export const RETARGET_COLLATERAL_LP_VIEWED = "retarget_collateral_lp_viewed";
export const RETARGET_COLLATERAL_DOWNLOADED = "retarget_collateral_downloaded";

export function getCollateralCampaign(slug) {
  return COLLATERAL_CAMPAIGNS[slug] ?? null;
}
