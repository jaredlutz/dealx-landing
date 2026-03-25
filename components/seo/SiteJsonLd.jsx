import {
  SITE_NAME,
  SITE_ORG_NAME,
  getSiteUrl,
} from "@/lib/site-seo";

/**
 * Organization + WebSite JSON-LD for the public marketing site.
 */
export default function SiteJsonLd() {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: SITE_ORG_NAME,
        url: base,
        logo: `${base}/images/diversyfund-logo.svg`,
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: SITE_NAME,
        url: base,
        publisher: { "@id": `${base}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
