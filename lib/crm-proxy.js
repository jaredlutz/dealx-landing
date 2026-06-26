import "server-only";

function getCrmApiBase() {
  const base =
    process.env.CRM_API_BASE_URL?.trim() ||
    process.env.CRM_CONTACT_FORM_URL?.replace(/\/api\/public\/marketing-site\/contact\/?$/, "") ||
    "https://crm.diversyfund.com";
  return base.replace(/\/$/, "");
}

function getProxySecret() {
  return (
    process.env.CRM_BOOK_PROXY_SECRET?.trim() ||
    process.env.DF_INCOME_DECK_SIGNUP_WEBHOOK_SECRET?.trim() ||
    ""
  );
}

export async function proxyCrmJson(path, { method = "GET", body, query } = {}) {
  const secret = getProxySecret();
  if (!secret) {
    return { ok: false, status: 503, data: { error: "CRM_BOOK_PROXY_SECRET not configured" } };
  }

  const url = new URL(`${getCrmApiBase()}${path.startsWith("/") ? path : `/${path}`}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null && String(v).trim()) url.searchParams.set(k, String(v));
    }
  }

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 15_000);
  try {
    const res = await fetch(url.toString(), {
      method,
      headers: {
        Authorization: `Bearer ${secret}`,
        ...(body != null ? { "Content-Type": "application/json" } : {}),
      },
      body: body != null ? JSON.stringify(body) : undefined,
      signal: ac.signal,
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    console.error("[crm-proxy]", path, e);
    return { ok: false, status: 502, data: { error: "crm_unreachable" } };
  } finally {
    clearTimeout(timer);
  }
}

/** Proxy to public CRM book APIs (no bearer — same-origin from LP server). */
export async function proxyCrmPublicJson(path, { method = "GET", body, query } = {}) {
  const url = new URL(`${getCrmApiBase()}${path.startsWith("/") ? path : `/${path}`}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null && String(v).trim()) url.searchParams.set(k, String(v));
    }
  }

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 15_000);
  try {
    const res = await fetch(url.toString(), {
      method,
      headers: body != null ? { "Content-Type": "application/json" } : {},
      body: body != null ? JSON.stringify(body) : undefined,
      signal: ac.signal,
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    console.error("[crm-proxy-public]", path, e);
    return { ok: false, status: 502, data: { error: "crm_unreachable" } };
  } finally {
    clearTimeout(timer);
  }
}
