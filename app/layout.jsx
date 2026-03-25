import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import SiteJsonLd from "@/components/seo/SiteJsonLd";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { InvestmentInterestProvider } from "@/contexts/investment-interest-context";
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE_PATH,
  SITE_ORG_NAME,
  getMetadataBase,
} from "@/lib/site-seo";
import "./globals.css";

export const metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [{ url: SITE_OG_IMAGE_PATH, alt: `${SITE_ORG_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [SITE_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <SiteJsonLd />
        <div className="df-page-grain" aria-hidden />
        <ThemeProvider>
          <AuthKitProvider>
            <InvestmentInterestProvider>{children}</InvestmentInterestProvider>
          </AuthKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
