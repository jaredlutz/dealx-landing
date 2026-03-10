/**
 * URL mapping for diversyfund.com migration.
 * Used by crawl scripts to fetch content and images from production.
 */

export const BASE = "https://www.diversyfund.com";

/** Content pages: path (no leading slash) -> page id for content_blocks */
export const CONTENT_PAGES: Record<string, string> = {
  "about-us/": "about",
  "investment-opportunities/": "investment_opportunities",
  "investment-opportunities/fund-v-accredited/": "fund_v",
  "multifamily-investment-fund/": "multifamily_fund",
  "invest-with-ira/": "invest_with_ira",
  "contact/": "contact",
  "contact-us/": "contact",
  "support/": "support",
  "privacy-policy/": "privacy_policy",
  "sms-terms/": "sms_terms",
};
