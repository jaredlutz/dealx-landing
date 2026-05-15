import {
  getWorkOS,
  refreshSession,
  saveSession,
} from "@workos-inc/authkit-nextjs";

/**
 * Shared "finalize" plumbing for the WorkOS sign-up flows.
 *
 * Both `/api/insights-unlock` and `/api/lead-signup` need to do the same three
 * things after a fresh WorkOS user has been authenticated (either by password
 * straight away, or via the email-verification follow-up):
 *
 *   1. `userManagement.updateUser({ userId, metadata })` to bake the lead's
 *      answers (capital range, intent, social handle, etc.) into the WorkOS
 *      user metadata so the unlock survives across devices.
 *   2. Either `saveSession` (fresh sign-in) or `refreshSession` (visitor was
 *      already signed in) so the AuthKit cookie reflects the latest user
 *      snapshot.
 *   3. POST the lead to the CRM webhook (best-effort; metadata is the durable
 *      source of truth, sales can reconcile from WorkOS if the webhook
 *      drops).
 *
 * Returning `updatedUser` lets the calling route surface the freshest
 * `firstName/lastName/email` back to the client.
 */

/**
 * @typedef {{
 *   accessToken: string,
 *   refreshToken: string,
 *   user: { id: string, firstName?: string | null, lastName?: string | null, email: string, metadata?: Record<string, string> | null },
 *   impersonator?: any,
 * }} AuthResponse
 */

/**
 * Merge new metadata onto the existing snapshot via `updateUser`.
 *
 * @param {{
 *   userId: string,
 *   baseMetadata?: Record<string, string> | null,
 *   patch: Record<string, string | null | undefined>,
 * }} args
 */
export async function persistUserMetadata({ userId, baseMetadata, patch }) {
  /** @type {Record<string, string>} */
  const next = { ...(baseMetadata ?? {}) };
  for (const [key, value] of Object.entries(patch)) {
    if (value == null) continue;
    next[key] = value;
  }
  return getWorkOS().userManagement.updateUser({ userId, metadata: next });
}

/**
 * Sync the AuthKit session cookie to the post-metadata user snapshot.
 *
 * - When `authResponse` is non-null we have fresh tokens (just authenticated)
 *   and need to write the cookie via `saveSession`.
 * - When `authResponse` is null the visitor was already signed in (LinkedIn
 *   returner or cross-device returner) and we just refresh the existing
 *   cookie's user snapshot.
 *
 * @param {{
 *   request: Request,
 *   authResponse: AuthResponse | null,
 *   updatedUser: any,
 *   logTag: string,
 * }} args
 */
export async function syncAuthkitSession({ request, authResponse, updatedUser, logTag }) {
  if (authResponse) {
    await saveSession(
      {
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        user: updatedUser,
        impersonator: authResponse.impersonator,
      },
      request
    );
    return;
  }
  try {
    await refreshSession();
  } catch (e) {
    console.warn(`[${logTag}] refreshSession failed (non-fatal)`, e);
  }
}

/**
 * Best-effort fan-out to the CRM webhook. Failures are logged but never throw,
 * so the user's unlock flow still succeeds even if the CRM is briefly down.
 *
 * @param {{
 *   webhookEnv: { url?: string, secret?: string },
 *   payload: Record<string, any>,
 *   logTag: string,
 * }} args
 */
export async function forwardLeadWebhook({ webhookEnv, payload, logTag }) {
  if (!webhookEnv.url) {
    console.info(`[${logTag}] submission (configure webhook to forward)`, {
      ...payload,
      email: "[redacted]",
    });
    return;
  }
  let timer;
  try {
    const headers = { "Content-Type": "application/json" };
    if (webhookEnv.secret) {
      headers.Authorization = `Bearer ${webhookEnv.secret}`;
    }
    const ac = new AbortController();
    timer = setTimeout(() => ac.abort(), 12_000);
    const res = await fetch(webhookEnv.url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: ac.signal,
    });
    if (!res.ok) {
      console.error(
        `[${logTag}] Webhook failed`,
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch (e) {
    console.error(`[${logTag}] Webhook error`, e);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Pull the message off a thrown `GenericServerException` from `@workos-inc/node`.
 * Falls back to the supplied default when WorkOS doesn't expose a useful
 * `rawData.message`.
 */
export function workosErrorMessage(error, fallback) {
  const rawMessage =
    error?.rawData?.message ||
    error?.rawData?.error_description ||
    error?.message;
  if (typeof rawMessage === "string" && rawMessage.length > 0) return rawMessage;
  return fallback;
}

/**
 * Detect the WorkOS-Auth-Required-Email-Verification response shape so callers
 * can switch into the code-entry follow-up step.
 */
export function emailVerificationRequiredFromError(error) {
  const code = error?.rawData?.code;
  if (code !== "email_verification_required") return null;
  const pendingAuthenticationToken = error?.rawData?.pending_authentication_token;
  const emailVerificationId = error?.rawData?.email_verification_id;
  const email = error?.rawData?.email;
  if (typeof pendingAuthenticationToken !== "string" || pendingAuthenticationToken.length === 0) {
    return null;
  }
  return {
    pendingAuthenticationToken,
    emailVerificationId: typeof emailVerificationId === "string" ? emailVerificationId : null,
    email: typeof email === "string" ? email : null,
  };
}
