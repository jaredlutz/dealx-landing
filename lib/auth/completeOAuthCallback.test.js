import { describe, expect, it } from "bun:test";
import { decodeOAuthStateReturnPath } from "./decodeOAuthState.js";

describe("decodeOAuthStateReturnPath", () => {
  it("decodes AuthKit base64url state", () => {
    const state = btoa(JSON.stringify({ returnPathname: "/incomeopportunity/book" }))
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    expect(decodeOAuthStateReturnPath(state)).toBe("/incomeopportunity/book");
  });

  it("decodes dotted AuthKit state", () => {
    const internal = btoa(JSON.stringify({ returnPathname: "/book/investor-call" }))
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    expect(decodeOAuthStateReturnPath(`${internal}.custom`)).toBe("/book/investor-call");
  });
});
