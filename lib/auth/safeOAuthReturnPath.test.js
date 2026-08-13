import { describe, expect, it } from "bun:test";
import { safeOAuthReturnPath } from "./safeOAuthReturnPath.js";

describe("safeOAuthReturnPath", () => {
  it("keeps book and incomeopportunity paths", () => {
    expect(safeOAuthReturnPath("/incomeopportunity/book", "/fallback")).toBe("/incomeopportunity/book");
    expect(safeOAuthReturnPath("/book/investor-call", "/fallback")).toBe("/book/investor-call");
  });

  it("keeps allowlisted query keys only", () => {
    expect(
      safeOAuthReturnPath(
        "/book/investor-call?bookingSource=lp_df_income_booking&evil=1",
        "/fallback"
      )
    ).toBe("/book/investor-call?bookingSource=lp_df_income_booking");
  });

  it("rejects protocol-relative and unknown paths", () => {
    expect(safeOAuthReturnPath("//evil.example/x", "/fallback")).toBe("/fallback");
    expect(safeOAuthReturnPath("/admin", "/fallback")).toBe("/fallback");
    expect(safeOAuthReturnPath("https://evil.example", "/fallback")).toBe("/fallback");
  });
});
