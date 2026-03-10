import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const signInUrl = await getSignInUrl({
    organizationId: process.env.WORKOS_ORGANIZATION_ID ?? undefined,
    redirectUri:
      process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI ??
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/callback`,
  });
  redirect(signInUrl);
}
