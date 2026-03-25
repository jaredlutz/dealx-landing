/**
 * Server-only POST helper for forwarding form payloads to portal / CRM / middleware.
 */
export async function postJsonWebhook(url, secret, payload) {
  if (!url || typeof url !== "string") {
    return { ok: true, skipped: true };
  }

  const headers = { "Content-Type": "application/json" };
  if (secret) {
    headers.Authorization = `Bearer ${secret}`;
  }

  const ac = new AbortController();
  let timer;
  try {
    timer = setTimeout(() => ac.abort(), 12_000);
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: ac.signal,
    });
    return { ok: res.ok, status: res.status, skipped: false };
  } catch (e) {
    console.error("[forward-webhook]", e);
    return { ok: false, skipped: false };
  } finally {
    if (timer) clearTimeout(timer);
  }
}
