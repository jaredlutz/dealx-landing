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
    pageTitle: "DF Income Summary | DiversyFund",
    eyebrow: "DF Income · Investor summary",
    /** React nodes built in component from these parts */
    heroLead: "The DF Income",
    heroAccent: "summary",
    heroTail: "— offering overview for accredited investors.",
    heroUrgent: "Download the investor deck.",
    heroSub: "Instant download · No form · Accredited · Reg D 506(c)",
    downloadLabel: "Download the summary",
    downloadFilename: "DiversyFund-DF-Income-Product-Deck.pdf",
    supportLine:
      "Rate classes, structure, and strategy context — the same summary our team walks through on investor calls.",
  },
  "business-plan": {
    routeKey: "collateral-business-plan",
    path: "/collateral/business-plan",
    documentSlug: "business-plan",
    pageTitle: "DF Income Business Plan | DiversyFund",
    eyebrow: "DF Income · Business plan",
    heroLead: "The 2026 fixed income",
    heroAccent: "business plan",
    heroTail: "— structure, economics, and deployment.",
    heroUrgent: "Download the full business plan.",
    heroSub: "Instant download · No form · Accredited · Reg D 506(c)",
    downloadLabel: "Download the business plan",
    downloadFilename: "DF-2026-Fixed-Income-Business-Plan.docx",
    supportLine:
      "How the fund is built for this market — for accredited investors evaluating DF Income.",
  },
  ira: {
    routeKey: "collateral-ira",
    path: "/collateral/ira",
    documentSlug: "ira-investing",
    pageTitle: "Invest with IRA | DiversyFund",
    eyebrow: "DF Income · IRA investing",
    heroLead: "Invest with an",
    heroAccent: "IRA",
    heroTail: "— private real-estate income inside a self-directed account.",
    heroUrgent: "Download the IRA guide.",
    heroSub: "Instant download · No form · Educational only · Not tax advice",
    downloadLabel: "Download the IRA guide",
    downloadFilename: "DiversyFund-IRA-Investing-Overview.pdf",
    supportLine:
      "Custodian mechanics, funding paths, and eligibility for accredited investors considering DF Income through an IRA.",
  },
  "market-cycles": {
    routeKey: "collateral-market-cycles",
    path: "/collateral/market-cycles",
    documentSlug: "market-cycles",
    pageTitle: "Reading Real Estate Market Cycles | DiversyFund",
    eyebrow: "DF Income · Market education",
    heroLead: "Reading real estate",
    heroAccent: "market cycles",
    heroTail: "— context for this income window.",
    heroUrgent: "Download the market cycles brief.",
    heroSub: "Instant download · No form · Educational · Not an offer",
    downloadLabel: "Download the market cycles brief",
    downloadFilename: "DiversyFund-Reading-Real-Estate-Market-Cycles.pdf",
    supportLine:
      "How rate, credit, and supply cycles create acquisition windows — for accredited investors evaluating DF Income.",
  },
};

export const RETARGET_COLLATERAL_LP_VIEWED = "retarget_collateral_lp_viewed";
export const RETARGET_COLLATERAL_DOWNLOADED = "retarget_collateral_downloaded";

export function getCollateralCampaign(slug) {
  return COLLATERAL_CAMPAIGNS[slug] ?? null;
}
