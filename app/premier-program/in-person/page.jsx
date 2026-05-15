import { Suspense } from "react";
import PremierProgramOfficeIntake from "@/components/premier-program/PremierProgramOfficeIntake";
import { getPremierCrmBookingUrl } from "@/lib/premier-crm";
import { SITE_NAME } from "@/lib/site-seo";

const DESCRIPTION =
  "Premier Program — invitation only (Southern California). Intake first, then schedule an in-person visit or call. Not indexed for public search.";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Premier Program · In person",
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: `${SITE_NAME} — Premier Program (in person)`,
    description: DESCRIPTION,
    url: "/premier-program/in-person",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Premier Program (in person)`,
    description: DESCRIPTION,
  },
};

export default async function PremierProgramInPersonPage({ searchParams }) {
  const sp = searchParams ?? {};
  const [crmBookingInPerson, crmBookingCall] = await Promise.all([
    getPremierCrmBookingUrl(sp, "in_person"),
    getPremierCrmBookingUrl(sp, "call"),
  ]);

  return (
    <Suspense
      fallback={<div className="min-h-screen bg-background" aria-busy="true" aria-label="Loading" />}
    >
      <PremierProgramOfficeIntake crmBookingInPerson={crmBookingInPerson} crmBookingCall={crmBookingCall} />
    </Suspense>
  );
}
