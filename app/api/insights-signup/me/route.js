import { NextResponse } from "next/server";
import { getWorkOS, withAuth } from "@workos-inc/authkit-nextjs";

export const dynamic = "force-dynamic";

const UNLOCK_METADATA_KEY = "insightsUnlocked";

/**
 * GET /api/insights-signup/me
 *
 * Returns the current Insights & Education sign-up state derived from the
 * WorkOS session that AuthKit middleware sets on `/insights-education/*` and
 * `/api/insights-signup/*`:
 *
 *   - `none`     — no WorkOS session; the gate UI shows the "Sign up to continue
 *                  reading" CTA which redirects to the AuthKit hosted sign-up UI.
 *   - `partial`  — WorkOS session exists but the capital question hasn't been
 *                  answered yet (`user.metadata.insightsUnlocked !== "true"`).
 *   - `unlocked` — WorkOS session exists and the user's metadata flag is set.
 *
 * The AuthKit session cookie is the snapshot from sign-up time, so when it
 * reports `insightsUnlocked !== "true"` we do a single fresh `getUser()` fetch
 * to catch the cross-device case where another session already finalized the
 * unlock — the client then writes its localStorage fast-path and future page
 * loads short-circuit before calling this route.
 */
export async function GET() {
  let auth;
  try {
    auth = await withAuth({ ensureSignedIn: false });
  } catch (e) {
    console.error("[insights-signup/me] withAuth failed", e);
    return NextResponse.json({ status: "none" });
  }

  const user = auth?.user;
  if (!user) {
    return NextResponse.json({ status: "none" });
  }

  const sessionMetadata = user.metadata ?? {};
  let unlocked = sessionMetadata[UNLOCK_METADATA_KEY] === "true";

  // The session cookie holds a snapshot taken at sign-up time. If the snapshot
  // doesn't show "unlocked", do a fresh WorkOS read so cross-device returns
  // resolve correctly without forcing the user back through the capital form.
  if (!unlocked) {
    try {
      const fresh = await getWorkOS().userManagement.getUser(user.id);
      unlocked = fresh?.metadata?.[UNLOCK_METADATA_KEY] === "true";
    } catch (e) {
      console.warn("[insights-signup/me] fresh getUser failed; falling back to session snapshot", e);
    }
  }

  return NextResponse.json({
    status: unlocked ? "unlocked" : "partial",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email,
  });
}
