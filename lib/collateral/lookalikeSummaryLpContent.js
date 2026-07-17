/**
 * /collateral/lookalike-summary — Persona Acquisition → Customers lookalike entry LP.
 * Same creative as Summary; distinct routeKey + documentSlug so views/downloads isolate.
 */

import { SUMMARY_LP } from "@/lib/collateral/summaryLpContent";

export const LOOKALIKE_SUMMARY_LP = {
  ...SUMMARY_LP,
  routeKey: "collateral-lookalike-summary",
  documentSlug: "lookalike-summary",
  pageTitle: "Investment Summary | DiversyFund",
  downloadFilename: "DiversyFund-DF-Income-Product-Deck.pdf",
};
