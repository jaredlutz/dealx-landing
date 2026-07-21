/**
 * /collateral/distressed-income-fund — Persona Acquisition → Customers Distressed Income Fund LP.
 * Same creative as Summary; distinct routeKey + documentSlug so views/downloads isolate.
 */

import { SUMMARY_LP } from "@/lib/collateral/summaryLpContent";

export const DISTRESSED_INCOME_FUND_LP = {
  ...SUMMARY_LP,
  routeKey: "collateral-distressed-income-fund",
  documentSlug: "distressed-income-fund",
  pageTitle: "Distressed Income Fund Summary | DiversyFund",
  downloadFilename: "DiversyFund-Distressed-Income-Fund-Investment-Summary.pdf",
};
