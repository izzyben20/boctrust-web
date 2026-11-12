# Discovery record

Audited 7 November 2026 by rendering every route of https://boctrustmfb.com/ in a browser. The site is a client-rendered SPA: every URL returns the same HTML shell with a 200 status, and its `robots.txt` and `sitemap.xml` return that shell too, so routes were taken from its JavaScript router.

## Legacy route inventory

| Legacy path | Type | Status in this build |
|---|---|---|
| `/` | Marketing | Rebuilt |
| `/about`, `/board`, `/management`, `/careers` | Corporate | Rebuilt |
| `/contact`, `/support` | Corporate | Rebuilt |
| `/blogs`, `/blog/:title` | Blog | Rebuilt with demo data |
| `/privacy`, `/terms`, `/loanterms` | Legal | Rebuilt, text preserved |
| `/loan` | Marketing and start of application | Marketing page rebuilt; "Apply" goes to the application |
| `/regular-savings`, `/target-savings`, `/ajo-plus-account` | Product | Rebuilt |
| `/personal-loan`, `/salary-advance`, `/sme-loan`, `/asset-backed-financing` | Product | Rebuilt |
| `/fixed-investment`, `/investment-note` | Product | Rebuilt |
| `/financial-advisory`, `/small-business-advisory`, `/micro-insurance-advisory` | Product | Rebuilt |
| `/login`, `/staff-login`, `/dashboard/*` | **Application** | 307 to `NEXT_PUBLIC_LEGACY_APP_URL` |
| `/reset-password/:token` | **Application** | 307 to `NEXT_PUBLIC_LEGACY_APP_URL` |
| `/app/nibbs-login`, `/nibss-callback` | **Application** | 307, query string kept |
| `/jobs-application` | **Application** (file upload) | 307 to `NEXT_PUBLIC_LEGACY_APP_URL` |
| `/uploads/*` | Media | 307 to `NEXT_PUBLIC_LEGACY_APP_URL` |
| `/test` | Empty test page | 308 to `/` |
| `/blog/Job-D`, `/blog/Financial-Inclusion` | CMS test posts | 308 to `/blogs` |

## Regulatory evidence

| Claim shown | Official source | What the source says |
|---|---|---|
| Licensed by the Central Bank of Nigeria | [CBN microfinance directory](https://www.cbn.gov.ng/Supervision/Inst-MF.html) | Entry 3316, "BOCTRUST MFB". No licence category or date, so none is claimed. |
| Listed by the NDIC as an insured institution | [NDIC directory](https://ndic.gov.ng/insured-banks?type=microfinance) | "BOCTRUST Microfinance Bank Limited", 32 Lawson Street, Lagos Island. No coverage limit is claimed. |
| NDPR Audit Compliant, audit year 2024 | [NDPC record](https://services.ndpc.gov.ng/portal/?page=verify-c&d=ang39005873774&id=22208&sn=b6e21df3ddde2eba0b50d4caaf578864&t=audit_filing&tp=nwp_audit), from the QR code on the bank's trustmark | Reg. no. NDPC/AUDIT/19975, audit year 2024, DPCO Floliz Nigeria Limited, approved 19 May 2025. |

"NDPE" in the brief is not the designation. The record and trustmark say NDPC and NDPR.

## Live-site content deliberately not carried over

- CMS test strings: "Toooooooooor", "With others oooo", the knowledge base ("How do i make money" / "Just stop doing lazy"), an "Engineer" vacancy reading "Something for you".
- Loan-page testimonials (John Smith and others): their photos are generic shortened links and could not be confirmed as real customers.
- The homepage loan calculator: its rate (4.06% a month) is not in any supplied document.

## Sources

- `FIXED DEPOSIT RATE GUIDE`: rates, transcribed in `lib/calculator/fixed-deposit.ts`.
- `Technical Integration, Operational Specifications & Feedback` (27 July 2026): product rules, tiers, security features.
- Logos: `Boctrust Original Logo.pdf`, and the Cheetah artwork from the admin dashboard, matching the supplied colourway sheet.

## Contact page assets

- City photos: Pexels (Pexels License, no credit required). See `docs/IMAGE-SOURCES.md`.
- Headset portrait: from the current Boctrust site (`/images/loanimage.png`). Its original licence is not recorded.
- Street map: drawn from OpenStreetMap data (ODbL, credited on the page) through the Overpass API.
- Pin: 6.4479607, 3.4056994, Google's geocode of the address query used on the current contact page.

## Reference sites

new-jollof, PiggyVest, Credit Direct and FairMoney were captured at desktop and phone widths. **moniepoint.com blocked automated access (403)**, so neither Moniepoint page was studied directly; the Cheetah pattern work follows the brief's description and original concepts.

## Corporate hero photography

Homepage hero: four Pexels portraits (`data/corporate/hero.ts`). About hero: a Pexels photograph of a Lagos office team. See `docs/IMAGE-SOURCES.md`.

## What We Offer photography

All four are Pexels photographs, shown without visible credit as the Pexels License allows. See `docs/IMAGE-SOURCES.md`. No licence covers the consent of people shown to appear in bank advertising.
