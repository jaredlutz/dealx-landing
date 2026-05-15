import LandingPage from "@/components/LandingPage";
import { SITE_DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/site-seo";

const homeOgTitle = `${SITE_NAME} — ${SITE_DEFAULT_DESCRIPTION}`;

export const metadata = {
  title: {
    absolute: SITE_NAME,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeOgTitle,
    description: SITE_DEFAULT_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: homeOgTitle,
    description: SITE_DEFAULT_DESCRIPTION,
  },
};

export default function Home() {
  return <LandingPage />;
}
