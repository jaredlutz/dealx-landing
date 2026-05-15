import MainSiteChrome from "@/components/layout/MainSiteChrome";

/** Server wrapper around the public marketing chrome (header, footer, sticky CTA). */
export default function MarketingShell({ children }) {
  return <MainSiteChrome>{children}</MainSiteChrome>;
}
