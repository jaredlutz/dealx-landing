# AGENTS.md

## Learned User Preferences

- When migrating a site from production, grab ALL images and use every one in the rebuilt UI
- Crawl must capture both `<img>` tags and `background-image` URLs from inline styles
- Content pages must match the original structure (e.g. About: Hero, Mission, Stats, Values, Journey, Testimonials), not generic title+body
- Site is public; only `/admin` requires auth
- Prefer internal links over external diversyfund.com URLs when we have the page
- Keep top nav minimal; avoid crowding with many menu items; no Portal login block in footer
- Mariposa approach for site migration: URL mapping, content migration, image crawl, seed scripts
- Default imagery work to one new or updated asset and one section per pass unless the user explicitly widens scope (e.g. hero-only means no other sections)
- Prefer scoped landing-section changes; broad restyles that edit shared UI primitives (Button, Card, SectionTitle, Badge) ripple across admin and other routes and have been reverted—confirm before repeating that pattern
- Do not reintroduce removed hero experiments (chat UI, scroll-docked sidebar) without an explicit ongoing product request
- Public landing should feel institutional and understated (serious private-markets, high-trust) rather than retail fintech, consumer growth funnels, or flashy marketing-page tropes; when a program or special route should match the home site, use MainSiteChrome and shared tokens rather than a standalone page-only palette
- Contact and support left columns should follow the same InstitutionalFormPage pattern (eyebrow, primary routing callout, icon highlights) and stay scannable; if CMS pastes extra copy into `contact` body, intro rendering truncates after the intended closing sentence—still clean the block in admin; for dedicated investor contact on program pages, use representative (not advisor) when the user directs

## Learned Workspace Facts

- This repo (Fixed-Note-LP) uses bun, Next.js 14, Neon Postgres, Drizzle ORM
- WorkOS AuthKit protects admin; middleware must skip auth for public routes to avoid "Empty password" when env vars are unset
- Portal CTAs use NEXT_PUBLIC_PORTAL_URL and lib/portal.js (getSignUpUrl, getSignInUrl)
- DiversyFund branding: primary #005EE0, dark bg #0A0B0D, light/dark theme via next-themes
- Content in content_blocks; testimonials in testimonials table; legal pages use lib/legal/*.fragment.html with `bun run legal:sync`; migrated images in public/migrated/home and public/migrated/content/{pageId} (migrate-urls.ts, crawl-home-images.ts, crawl-all-pages.ts, migrate-content-from-live.ts)
- DATABASE_URL required for DB; WorkOS vars only for /admin; Vercel/production installs from committed package.json—declare all admin/DB dependencies there
- Subtle global grain: `.df-page-grain` in app/layout.jsx and globals.css; section rhythm uses semantic tokens via lib/theme.js and globals CSS variables
- Main `/`: LandingPage sections Hero → Structures → Opportunities → Positioning → Testimonials; Allocation Profile at top of Structures; Hero two-column with HeroStatsBento on the right; TopNav is Home and Opportunities—use `/#home` and `/#opps` from pages outside `/`
- Public `/contact`, `/support`, `/documents` (lib/site-documents.js + public/documents/), `/privacy-policy`, `/sms-terms`, `/terms-of-service` (terms fragment), `/offering-circular` (lib/offering-circular-docs.js + public/documents/offering-circular/), `/premier-program`; MainSiteChrome; Footer Company links include Documents, Offering circular, Privacy, Terms of Service, SMS terms; Support links (Contact, Investor support, investorsupport mailto)
- Public marketing metadata: SITE_NAME is DiversyFund; default description/tagline in lib/site-seo.js; set NEXT_PUBLIC_APP_URL for metadataBase, sitemap, robots, and JSON-LD; default social image is public/images/og-diversyfund-share.png (`bun run og:share` to regenerate)
- `/api/investment-interest` (sticky CTA, Invest Now modal): set **`INVESTMENT_INTEREST_WEBHOOK_URL`** to the CRM/marketing ingest HTTPS path (optional **`INVESTMENT_INTEREST_WEBHOOK_SECRET`**); do not use WorkOS AuthKit or OAuth authorize URLs—if unset or wrong, submissions only hit **server logs**, not CRM/DB
- `/api/contact` forwards to df-crm public contact ingest (`CRM_CONTACT_FORM_URL` + `CRM_CONTACT_FORM_SECRET`); `/api/support` forwards to diversyfund-portal (`PORTAL_SUPPORT_FORM_URL` + `PORTAL_SUPPORT_FORM_SECRET`); Bearer secrets must match each target app; df-middleware handles HMAC-signed portal↔CRM sync and is not the path for these marketing forms unless new event contracts are added
