import { Suspense } from "react";
import PremierProgramInvitation from "@/components/premier-program/PremierProgramInvitation";
import { getPremierCrmBookingUrl } from "@/lib/premier-crm";
import { SITE_NAME } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

const DESCRIPTION =
  "Premier Product — private invitation. Accredited investors: express interest for qualification. Not indexed for public search.";

export const metadata = {
  title: "Premier Product — Private invitation",
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: `${SITE_NAME} — Premier Product`,
    description: DESCRIPTION,
    url: "/premier-program/private-invitation",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Premier Product`,
    description: DESCRIPTION,
  },
};

export default async function PremierPrivateInvitationPage({ searchParams }) {
  const crmBookingCall = await getPremierCrmBookingUrl(searchParams ?? {}, "call");

  return (
    <Suspense
      fallback={
        <div className="premier-invitation-light min-h-screen bg-background" aria-busy="true" aria-label="Loading" />
      }
    >
      <PremierProgramInvitation crmBookingCall={crmBookingCall} />
    </Suspense>
  );
}
