# AGENTS.md

## Learned User Preferences

- When migrating a site from production, grab ALL images and use every one in the rebuilt UI
- Crawl must capture both `<img>` tags and `background-image` URLs from inline styles
- Content pages must match the original structure (e.g. About: Hero, Mission, Stats, Values, Journey, Testimonials), not generic title+body
- Site is public; only `/admin` requires auth
- Prefer internal links over external diversyfund.com URLs when we have the page
- Mariposa approach for site migration: URL mapping, content migration, image crawl, seed scripts

## Learned Workspace Facts

- Fixed-Note-LP uses bun, Next.js 14, Neon Postgres, Drizzle ORM
- WorkOS AuthKit protects admin; middleware must skip auth for public routes to avoid "Empty password" when env vars are unset
- Portal CTAs use NEXT_PUBLIC_PORTAL_URL and lib/portal.js (getSignUpUrl, getSignInUrl)
- DiversyFund branding: primary #005EE0, dark bg #0A0B0D, light/dark theme via next-themes
- Content in content_blocks; testimonials in testimonials table
- Migrated images: public/migrated/home and public/migrated/content/{pageId}
- migrate-urls.ts, crawl-home-images.ts, crawl-all-pages.ts, migrate-content-from-live.ts
- DATABASE_URL required for DB; WorkOS vars required only when using /admin
