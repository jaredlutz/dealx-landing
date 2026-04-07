# DiversyFund Corporate Site

diversyfund.com homepage rebuild. Built with Next.js, Neon Postgres, and WorkOS AuthKit.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Neon Postgres + Drizzle ORM
- **Auth:** WorkOS AuthKit (admin-only)
- **Package manager:** Bun
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Development

```bash
bun install
```

1. Copy `.env.example` to `.env.local` and set:
   - `DATABASE_URL` — Neon connection string
   - `WORKOS_API_KEY`, `WORKOS_CLIENT_ID` — from [WorkOS Dashboard](https://dashboard.workos.com/)
   - `WORKOS_COOKIE_PASSWORD` — min 32 chars (`openssl rand -base64 32`)
   - `NEXT_PUBLIC_WORKOS_REDIRECT_URI` — `http://localhost:3000/callback`
   - **Public forms (production / staging):** see `.env.example`. In particular:
     - **`INVESTMENT_INTEREST_WEBHOOK_URL`** (and optional **`INVESTMENT_INTEREST_WEBHOOK_SECRET`**) — where **Investment interest** modal submissions (`/api/investment-interest`) are POSTed. If unset, the API still returns success but leads are **only logged** on the server, not stored or forwarded.
     - **`CRM_CONTACT_FORM_URL`** / **`CRM_CONTACT_FORM_SECRET`** — `/contact` → df-crm ingest
     - **`PORTAL_SUPPORT_FORM_URL`** / **`PORTAL_SUPPORT_FORM_SECRET`** — `/support` → portal ingest
   - **`NEXT_PUBLIC_APP_URL`**, **`NEXT_PUBLIC_PORTAL_URL`** — SEO/canonical URLs and portal CTAs

2. Push database schema:

```bash
bun run db:push
bun run db:seed
```

3. In WorkOS Dashboard → Redirects: add `http://localhost:3000/callback`

4. Run dev server:

```bash
bun run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin) (sign in with WorkOS)

## Deploy to Vercel

1. Push this repo to GitHub (e.g. `your-org/fixed-note-lp`)
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the repo and deploy (zero config required)

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Admin

- **Content blocks** — Edit hero, about, why invest, portfolio, fund, testimonials section, mobile app copy
- **Testimonials** — Add, edit, reorder investor quotes

All changes appear on the homepage immediately.

## Scripts

- `bun run dev` — Start dev server
- `bun run db:push` — Push Drizzle schema to Neon
- `bun run db:seed` — Seed content blocks and testimonials
- `bun run crawl:home` — Download images from diversyfund.com homepage to `public/migrated/home/`

## Structure

- `app/` — Next.js App Router (layout, page, admin, callback)
- `app/admin/` — CMS (content blocks, testimonials)
- `components/sections/home/` — Homepage sections
- `lib/db/` — Drizzle schema and DB client
- `lib/content.js` — Content block helpers
