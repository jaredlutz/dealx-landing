import { Suspense } from "react";
import PremierProgramIntake from "@/components/premier-program/PremierProgramIntake";
import { getPremierCrmBookingUrl } from "@/lib/premier-crm";
import { SITE_NAME } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

const DESCRIPTION =
  "Premier Program — invitation only. Accredited investors: request a seat for qualification. Not indexed for public search.";

export const metadata = {
  title: "Premier Program",
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: `${SITE_NAME} — Premier Program`,
    description: DESCRIPTION,
    url: "/premier-program",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Premier Program`,
    description: DESCRIPTION,
  },
};

export default async function PremierProgramPage({ searchParams }) {
  const crmBookingCall = await getPremierCrmBookingUrl(searchParams ?? {}, "call");

  return (
    <Suspense
      fallback={<div className="min-h-screen bg-background" aria-busy="true" aria-label="Loading" />}
    >
      <PremierProgramIntake crmBookingCall={crmBookingCall} />
    </Suspense>
  );
}
