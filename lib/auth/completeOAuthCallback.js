import { NextResponse } from "next/server";
import { getWorkOS, saveSession } from "@workos-inc/authkit-nextjs";
import { decodeOAuthStateReturnPath } from "@/lib/auth/decodeOAuthState";
import {
  organizationSelectionRequiredFromError,
  workosErrorMessage,
} from "@/lib/insights-finalize";
import { safeOAuthReturnPath } from "@/lib/auth/safeOAuthReturnPath";

function resolveReturnPath(state) {
  const raw = decodeOAuthStateReturnPath(state);
  if (raw === "/admin" || (typeof raw === "string" && raw.startsWith("/admin/"))) {
    return "/admin";
  }
  return safeOAuthReturnPath(raw, "/incomeopportunity/book");
}

function redirectOAuthError(request, returnPath, reason) {
  const url = request.nextUrl.clone();
  const parsed = new URL(returnPath, "https://diversyfund.com");
  url.pathname = parsed.pathname;
  url.search = parsed.search;
  url.searchParams.set("oauthError", reason);
  return NextResponse.redirect(url);
}

async function finishSession(request, auth, returnPath) {
  await saveSession(auth, request);
  const url = request.nextUrl.clone();
  const parsed = new URL(returnPath, "https://diversyfund.com");
  url.pathname = parsed.pathname;
  url.search = parsed.search;
  url.searchParams.delete("code");
  url.searchParams.delete("state");
  return NextResponse.redirect(url);
}

function pickOrganizationId(organizations) {
  const preferred = process.env.WORKOS_ORGANIZATION_ID?.trim();
  if (preferred && organizations.some((org) => org.id === preferred)) {
    return preferred;
  }
  return organizations[0]?.id ?? null;
}

/**
 * Exchange the WorkOS OAuth code, auto-complete org selection for multi-org
 * staff accounts, and redirect to a safe return path (never raw JSON).
 * @param {import("next/server").NextRequest} request
 */
export async function completeOAuthCallback(request) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const returnPath = resolveReturnPath(state);
  const clientId = process.env.WORKOS_CLIENT_ID;

  if (!code || !clientId) {
    return redirectOAuthError(request, returnPath, "missing_code");
  }

  const workos = getWorkOS();

  try {
    const auth = await workos.userManagement.authenticateWithCode({ clientId, code });
    return finishSession(request, auth, returnPath);
  } catch (error) {
    const orgSel = organizationSelectionRequiredFromError(error);
    if (orgSel) {
      const organizationId = pickOrganizationId(orgSel.organizations);
      if (organizationId) {
        try {
          const auth = await workos.userManagement.authenticateWithOrganizationSelection({
            clientId,
            organizationId,
            pendingAuthenticationToken: orgSel.pendingAuthenticationToken,
          });
          return finishSession(request, auth, returnPath);
        } catch (orgError) {
          console.error(
            "[callback] organization selection failed",
            workosErrorMessage(orgError, "org_select")
          );
          return redirectOAuthError(request, returnPath, "org_select");
        }
      }
    }

    console.error("[callback] authenticateWithCode", workosErrorMessage(error, "auth failed"));
    return redirectOAuthError(request, returnPath, "auth");
  }
}
