import { NextResponse } from "next/server";
import { getWorkOS } from "@workos-inc/authkit-nextjs";
import { workosErrorMessage } from "@/lib/insights-finalize";

export const dynamic = "force-dynamic";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * POST /api/insights-unlock/resend
 *
 * Re-send the email verification code for a user that's currently mid-flow on
 * the Insights & Education sign-up gate. The client supplies the WorkOS
 * `userId` it received from the prior `/api/insights-unlock` call.
 *
 * Body shape: `{ userId }`
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const { userId } = body || {};
  if (!isNonEmptyString(userId)) {
    return NextResponse.json(
      { ok: false, message: "Missing user reference. Please start sign-up again." },
      { status: 400 }
    );
  }

  try {
    await getWorkOS().userManagement.sendVerificationEmail({ userId: userId.trim() });
  } catch (e) {
    console.warn("[insights-unlock/resend] sendVerificationEmail failed", e);
    const message = workosErrorMessage(
      e,
      "We couldn't resend the code. Please try again in a moment."
    );
    return NextResponse.json({ ok: false, message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
