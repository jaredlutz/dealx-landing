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

export function parseLpInvestorCallBookingSource(raw, pathname) {
  if (raw && LP_INVESTOR_CALL_BOOKING_SOURCES.includes(raw)) {
    return raw;
  }
  // Rewrite `/incomeopportunity/book` → investor-call does not put bookingSource in the browser URL.
  if (typeof pathname === "string" && pathname.startsWith("/incomeopportunity/book")) {
    return "lp_df_income_booking";
  }
  return "lp_investment_interest_booking";
}

export const INVESTOR_CALL_DURATION_MINUTES_DEFAULT = 30;
export const INVESTOR_CALL_DURATION_MINUTES_NC = 20;

export function investorCallDurationMinutes(source) {
  return source === "lp_df_income_booking"
    ? INVESTOR_CALL_DURATION_MINUTES_NC
    : INVESTOR_CALL_DURATION_MINUTES_DEFAULT;
}
