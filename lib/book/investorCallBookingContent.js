/** Public investor-call booking chrome — institutional, not CEO-by-name on LPs. */
export const INVESTOR_CALL_REP_DISPLAY_NAME = "Senior executive team member";

export const INVESTOR_CALL_PAGE_TITLE = "Book a call with a senior executive team member";

export const INVESTOR_CALL_PAGE_DESCRIPTION =
  "Schedule a live conversation with a senior executive team member. Times shown reflect our executive team calendar.";

/** Sidebar PDFs for `/book/investor-call` — matches curated LP one-pagers that link here. */
export const INVESTOR_CALL_BOOKING_DOWNLOADS = [
  {
    href: "/documents/df-fixed-income-fund.pdf",
    title: "DF Fixed Income Fund",
    line: "Discount-acquisition mechanics and two clean exit paths",
    downloadFilename: "DF-Fixed-Income-Fund.pdf",
  },
  {
    href: "/documents/fixed-income-instrument-capital-stack.pdf",
    title: "Fixed Income Instrument & Capital Stack",
    line: "Yield mechanics, accrual layers, and seniority in the waterfall",
    downloadFilename: "DiversyFund-Fixed-Income-Instrument-Capital-Stack.pdf",
  },
];

export const INVESTOR_CALL_PRIMARY_DOWNLOAD = INVESTOR_CALL_BOOKING_DOWNLOADS[0];

export const INVESTOR_CALL_BEFORE_CALL_BLURB =
  "Download the fixed income one-pagers—the same materials referenced on our investor pages and in outreach.";
