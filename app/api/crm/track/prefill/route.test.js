import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

// `server-only` is a Next.js build-time marker with no runtime export; stub it so the
// route module graph loads under Bun's test runner.
mock.module("server-only", () => ({}));

const realFetch = globalThis.fetch;

const crmPrefill = mock(async () => ({ ok: true, status: 200, data: { prefill: null } }));

mock.module("@/lib/crm-proxy", () => ({
  proxyCrmPublicJson: crmPrefill,
}));

const { GET } = await import("./route.js");

const url = (tid) =>
  `https://diversyfund.com/api/crm/track/prefill?tid=${encodeURIComponent(tid)}&slug=ira`;

beforeEach(() => {
  crmPrefill.mockClear();
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

describe("crm/track/prefill", () => {
  it("resolves SendEdge sp1 tokens via send-plane and returns contactId", async () => {
    globalThis.fetch = mock(async () => ({
      ok: true,
      json: async () => ({
        prefill: {
          contactId: "22222222-2222-4222-8222-222222222222",
          email: "jmlutz85@gmail.com",
          firstName: "Jared",
          lastName: "Lutz",
          phoneE164: "+15551234567",
        },
      }),
    }));

    const res = await GET(new Request(url("sp1.11111111-1111-4111-8111-111111111111.999.sig")));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.prefill.contactId).toBe("22222222-2222-4222-8222-222222222222");
    expect(body.prefill.email).toBe("jmlutz85@gmail.com");
    // sp1 must not fall through to the CRM replay-token path.
    expect(crmPrefill).not.toHaveBeenCalled();
  });

  it("returns prefill:null when send-plane resolution fails", async () => {
    globalThis.fetch = mock(async () => ({ ok: false, json: async () => ({}) }));
    const res = await GET(new Request(url("sp1.11111111-1111-4111-8111-111111111111.999.sig")));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ prefill: null });
  });

  it("never throws when send-plane is unreachable", async () => {
    globalThis.fetch = mock(async () => {
      throw new Error("ECONNREFUSED");
    });
    const res = await GET(new Request(url("sp1.11111111-1111-4111-8111-111111111111.999.sig")));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ prefill: null });
  });

  it("routes legacy (non-sp1) tokens to the CRM replay path", async () => {
    globalThis.fetch = mock(async () => {
      throw new Error("should not be called for legacy tokens");
    });
    const res = await GET(new Request(url("legacy-replay-token")));
    expect(crmPrefill).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
  });
});
