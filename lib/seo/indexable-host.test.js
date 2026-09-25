import { describe, expect, it } from "bun:test";
import { isIndexableHost, requestHostname } from "./indexable-host.js";

describe("indexable hosts", () => {
  it("allows only the public production hosts", () => {
    expect(isIndexableHost("www.diversyfund.com")).toBe(true);
    expect(isIndexableHost("diversyfund.com")).toBe(true);
    expect(isIndexableHost("WWW.DiversyFund.com:443")).toBe(true);
    expect(isIndexableHost("staging-web.diversyfund.com")).toBe(false);
    expect(isIndexableHost("df-website-git-main.vercel.app")).toBe(false);
    expect(isIndexableHost("localhost:3000")).toBe(false);
    expect(isIndexableHost("")).toBe(false);
  });

  it("reads the forwarded host ahead of the internal host", () => {
    const request = new Request("https://internal.vercel.app/", {
      headers: {
        host: "internal.vercel.app",
        "x-forwarded-host": "staging-web.diversyfund.com",
      },
    });
    expect(requestHostname(request)).toBe("staging-web.diversyfund.com");
    expect(isIndexableHost(requestHostname(request))).toBe(false);
  });
});
