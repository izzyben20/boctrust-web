# Boctrust corporate website and Cheetah

Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, `motion/react`, `react-calendar`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm test         # fixed deposit calculator
```

## Where things live

| Path | Purpose |
|---|---|
| `app/(corporate)/` | The corporate site, at its original URLs |
| `app/cheetah/` | The Cheetah site, with its own layout, navigation and footer |
| `app/components/` | `corporate/`, `cheetah/`, `shared/`, `brand/`, `ui/`, and the product icons in `svg/` |
| `config/` | Links, navigation, regulatory claims, consent, site facts |
| `data/` | Products, FAQs, leadership, legal text, demo blog posts |
| `lib/` | Calculator, blog data access (the CMS boundary), SEO helpers |
| `docs/DISCOVERY.md` | Route inventory and evidence for regulatory claims |

## Common changes

| To change | Edit |
|---|---|
| App store, login and signup links | `config/links.ts` |
| Google Tag Manager container | `NEXT_PUBLIC_GTM_ID`, or `config/consent.ts` |
| A regulatory claim (set `status: "pending"` to remove it everywhere) | `config/regulatory.ts` |
| Fixed deposit rates and rules | `lib/calculator/fixed-deposit.ts` |
| Savings product names and copy | `data/cheetah/products.ts` |
| Connect a CMS to the blog | `lib/blog.ts` and the slug list in `proxy.ts` |
| Add the licensed FH Oscar font | `app/fonts.ts` (steps are in the comment) |

## Before going live on boctrustmfb.com

The current site also runs the customer login, dashboard, loan application, password reset and NIBSS callback. Move that application to its own host and set `NEXT_PUBLIC_LEGACY_APP_URL` first (see `.env.example`). Until then those routes have nowhere to go.
