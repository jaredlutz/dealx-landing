import { describe, expect, it } from "bun:test";
import { DF_INCOME_OPPORTUNITY_BOOK_HREF } from "./dfIncomeOpportunityUrls";
import {
  investorCallDurationMinutes,
  parseLpInvestorCallBookingSource,
} from "./parseLpInvestorCallBookingSource";

describe("DF Income book CTA", () => {
  it("stamps NC bookingSource on the marketing-site button href", () => {
    expect(DF_INCOME_OPPORTUNITY_BOOK_HREF).toBe(
      "/book/investor-call?bookingSource=lp_df_income_booking",
    );
  });
});

describe("parseLpInvestorCallBookingSource", () => {
  it("keeps an explicit source", () => {
    expect(parseLpInvestorCallBookingSource("lp_df_income_booking", "/book/investor-call")).toBe(
      "lp_df_income_booking",
    );
  });

  it("infers NC from /incomeopportunity/book when the rewrite hides the query", () => {
    expect(parseLpInvestorCallBookingSource(null, "/incomeopportunity/book")).toBe(
      "lp_df_income_booking",
    );
  });

  it("does not treat bare /book/investor-call as NC", () => {
    expect(parseLpInvestorCallBookingSource(null, "/book/investor-call")).toBe(
      "lp_investment_interest_booking",
    );
  });
});

describe("investorCallDurationMinutes", () => {
  it("is 20 for NC and 30 otherwise", () => {
    expect(investorCallDurationMinutes("lp_df_income_booking")).toBe(20);
    expect(investorCallDurationMinutes("lp_premium_vsl")).toBe(30);
  });
});
