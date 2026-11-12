# Boctrust Web

The marketing websites for **Boctrust Microfinance Bank** and its digital savings and payments app, **Cheetah by Boctrust**. Both are served from one Next.js application:

- **Corporate site** at `/`: the bank, its savings, loan, investment and advisory products, leadership, careers, blog, support and legal pages.
- **Cheetah site** at `/cheetah`: the app's savings plans, payments, security, about page, savings calculator and FAQs. It has its own layout, navigation and footer.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) with React 19 and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) with design tokens in `app/globals.css`
- `motion/react` for animation, `react-calendar`, `react-toastify` and `nextjs-toploader`
- ESLint (`eslint-config-next`) and the Node.js built-in test runner

> **Note:** Next.js 16 changes some APIs and conventions. Before you write Next.js code, read the guides in `node_modules/next/dist/docs/` (see `AGENTS.md`).

## Getting started

### Prerequisites

- Node.js 22.18 or later. `npm test` runs a `.ts` file directly, so it needs a Node version that strips TypeScript types without extra setup.
- npm

### Install and run

```bash
git clone https://github.com/izzyben20/boctrust-web.git
cd boctrust-web
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm start` | Serves the production build |
| `npm run lint` | Runs ESLint |
| `npm test` | Runs the fixed deposit calculator tests |

## Environment variables

`.env.example` lists every variable.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | The site's public origin. Canonical URLs, the sitemap and Open Graph tags use it. |
| `NEXT_PUBLIC_LEGACY_APP_URL` | Yes | Where the existing Boctrust application is hosted: login, dashboard, loan form, password reset and the NIBSS callback. |
| `NEXT_PUBLIC_GTM_ID` | No | The Google Tag Manager container ID. If it isn't set, no tags load. |

## Project structure

| Path | Purpose |
|---|---|
| `app/(corporate)/` | Corporate site pages, at their original URLs |
| `app/cheetah/` | Cheetah site pages: home, savings plans, payments, get the app, calculator, security, about, FAQs |
| `app/components/` | Components, grouped as `corporate/`, `cheetah/`, `shared/`, `brand/`, `ui/` and `svg/` (the product icons) |
| `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | SEO routes |
| `config/` | Links, navigation, regulatory claims, cookie consent, site facts and the legacy application's paths |
| `data/` | Products, product stories, FAQs, leadership, legal text and the demo blog posts |
| `lib/` | Savings calculator, blog data access (the CMS boundary) and SEO helpers |
| `proxy.ts` | Returns a real 404 for blog slugs that don't exist |
| `public/` | Fonts, logos and images |
| `docs/DISCOVERY.md` | Route inventory and the evidence behind regulatory claims |
| `docs/IMAGE-SOURCES.md` | Source and licence of every photograph |

## Common changes

| To change | Edit |
|---|---|
| App store, login and signup links | `config/links.ts` |
| Header and footer navigation | `config/navigation.ts` |
| Google Tag Manager container | `NEXT_PUBLIC_GTM_ID`, or `config/consent.ts` |
| A regulatory claim (set `status: "pending"` to remove it everywhere) | `config/regulatory.ts` |
| Fixed deposit rates and rules | `lib/calculator/fixed-deposit.ts` |
| Cheetah savings product names and copy | `data/cheetah/products.ts` |
| Corporate product page copy and photos | `data/corporate/product-stories.ts` |
| Connect a CMS to the blog | `lib/blog.ts` and the slug list in `proxy.ts` |
| Add the licensed FH Oscar font | `app/fonts.ts` (the steps are in the comment) |

## Content rules

- **Rates and claims:** Publish only rates, regulatory claims and security features that the bank has confirmed. Regulatory claims live in `config/regulatory.ts`.
- **Photography:** Use only images whose licence allows commercial use without visible credit, such as the Pexels License or CC0. Download each image into `public/images/` rather than hotlinking it, and record its source in `docs/IMAGE-SOURCES.md`. When you replace an image, give the new file a new name so the image optimiser's cache doesn't keep serving the old one.
- **Styling:** Use the design tokens in `app/globals.css`. The design uses no gradients.

## Before going live on boctrustmfb.com

The current boctrustmfb.com also runs the customer login, dashboard, loan application, password reset and NIBSS callback. This site doesn't reimplement any of them. It sends those paths to `NEXT_PUBLIC_LEGACY_APP_URL` with temporary redirects (the paths are listed in `config/legacy-app.ts`).

Do these before launch:

1. Move the application to its own host, for example `https://app.boctrustmfb.com`, and set `NEXT_PUBLIC_LEGACY_APP_URL` to that address.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
3. Confirm that the bank holds the rights to the images in `public/images/corporate/scenes/` and `public/images/corporate/contact/support-agent.png`, which came from the current site.
4. Ask Legal to approve the use of stock photos that show identifiable people (see `docs/IMAGE-SOURCES.md`).

## Licence

Proprietary. © Boctrust Microfinance Bank. All rights reserved.
