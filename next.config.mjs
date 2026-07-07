/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const crmBase =
      process.env.CRM_API_BASE_URL?.trim()?.replace(/\/$/, "") ||
      "https://crm.diversyfund.com";
    return [
      { source: "/favicon.ico", destination: "/icon.svg" },
      { source: "/incomeopportunity/v/1", destination: "/book/df-income/v/1" },
      {
        source: "/incomeopportunity/book",
        destination: "/book/investor-call?bookingSource=lp_df_income_booking",
      },
      // Deck delivery emails baked crm track URLs onto diversyfund.com before CRM fix — proxy to CRM.
      {
        source: "/api/track/df-income-doc",
        destination: `${crmBase}/api/track/df-income-doc`,
      },
      {
        source: "/api/track/df-income-doc/download",
        destination: `${crmBase}/api/track/df-income-doc/download`,
      },
    ];
  },
  async redirects() {
    const v1 = "/incomeopportunity/v/1";
    return [
      { source: "/incomeopportunity", destination: v1, permanent: true },
      { source: "/incomeopportunity/v/target", destination: v1, permanent: true },
      { source: "/incomeopportunity/v/targeted", destination: v1, permanent: true },
      { source: "/incomeopportunity/v/2", destination: v1, permanent: true },
      { source: "/incomeopportunity/v/3", destination: v1, permanent: true },
      { source: "/incomeopportunity/v/4", destination: v1, permanent: true },
      { source: "/book/df-income", destination: v1, permanent: true },
      { source: "/book/df-income/v/:variant", destination: v1, permanent: true },
      { source: "/book/df-income/targeted", destination: v1, permanent: true },
      {
        source: "/incomeopportunity/how",
        destination: v1,
        permanent: false,
      },
      { source: "/blog", destination: "/insights-education", permanent: true },
      { source: "/blog/:slug", destination: "/insights-education/:slug", permanent: true },
      {
        source: "/opportunities/distressed-multifamily-notes",
        destination: "/opportunities/df-income",
        permanent: true,
      },
      // Retired strategies subpages — fold back into the Strategies hub.
      { source: "/strategies/structures", destination: "/strategies", permanent: true },
      { source: "/strategies/by-goal", destination: "/strategies", permanent: true },
      { source: "/strategies/by-product", destination: "/strategies", permanent: true },
      // By-goal educational pages moved under /insights-education.
      {
        source: "/strategies/by-goal/income-vs-growth",
        destination: "/insights-education/income-vs-growth",
        permanent: true,
      },
      {
        source: "/strategies/by-goal/ira",
        destination: "/insights-education/ira",
        permanent: true,
      },
      {
        source: "/strategies/by-goal/retirement-accounts",
        destination: "/insights-education/retirement-accounts",
        permanent: true,
      },
      // Retired Insights blog posts whose slugs are now the educational pages above.
      {
        source: "/insights-education/invest-with-ira",
        destination: "/insights-education/ira",
        permanent: true,
      },
      {
        source: "/insights-education/invest-with-retirement-accounts",
        destination: "/insights-education/retirement-accounts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
