/** Allowed `bookingSource` values for public investor-call availability + schedule APIs. */
export const LP_INVESTOR_CALL_BOOKING_SOURCES = [
  "webinar_replay",
  "lp_investment_interest_booking",
  "lp_df_income_booking",
  "lp_premium_vsl",
  "lp_vsl_todays_market",
  "lp_twelve_pct_fixed_income_webinar",
  "lp_vsl_investor_quiz",
];

export function parseLpInvestorCallBookingSource(raw) {
  if (raw && LP_INVESTOR_CALL_BOOKING_SOURCES.includes(raw)) {
    return raw;
  }
  return "lp_investment_interest_booking";
}
