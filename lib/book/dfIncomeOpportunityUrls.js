/** Canonical DF Income booking LP — only `/incomeopportunity/v/1` is live. */
export const DF_INCOME_CANONICAL_VARIANT_SLUG = "1";

export const DF_INCOME_CANONICAL_LP_PATH = "/incomeopportunity/v/1";

export const DF_INCOME_CANONICAL_LP_URL = "https://diversyfund.com/incomeopportunity/v/1";

/** @deprecated Use DF_INCOME_CANONICAL_LP_PATH */
export const DF_INCOME_OPPORTUNITY_HREF = DF_INCOME_CANONICAL_LP_PATH;

/** Deck request anchor on the v/1 landing page. */
export const DF_INCOME_OPPORTUNITY_DECK_HREF = `${DF_INCOME_CANONICAL_LP_PATH}#reach`;

export const DF_INCOME_OPPORTUNITY_BOOK_HREF = "/incomeopportunity/book";

/** Canonical investor-call schedule URL with booking source. */
export const DF_INCOME_INVESTOR_CALL_HREF =
  "/book/investor-call?bookingSource=lp_df_income_booking";
