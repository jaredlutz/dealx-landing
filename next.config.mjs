/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/icon.svg" },
      { source: "/incomeopportunity", destination: "/book/df-income" },
      { source: "/incomeopportunity/how", destination: "/book/df-income/how-it-works" },
      {
        source: "/incomeopportunity/book",
        destination: "/book/investor-call?bookingSource=lp_df_income_booking",
      },
    ];
  },
  async redirects() {
    return [
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
