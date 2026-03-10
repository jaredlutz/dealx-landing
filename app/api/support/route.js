import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";

    if (!name || !email || !message) {
      return NextResponse.redirect(new URL("/support?error=missing", request.url), 303);
    }

    // TODO: Wire to portal support API, email service, or CRM
    return NextResponse.redirect(new URL("/support?submitted=1", request.url), 303);
  } catch {
    return NextResponse.redirect(new URL("/support?error=1", request.url), 303);
  }
}
