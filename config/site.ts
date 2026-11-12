/**
 * Single source of truth for institutional facts.
 * Contact details mirror https://boctrustmfb.com/api/settings/siteDetails (audited Nov 2026).
 */
export const SITE = {
  name: "Boctrust Microfinance Bank",
  shortName: "Boctrust MFB",
  legalName: "Boctrust Microfinance Bank Limited",
  tagline: "Growing. Together.",
  heroLine: "Banking for growth",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://boctrustmfb.com").replace(/\/$/, ""),
  description:
    "Boctrust Microfinance Bank Limited offers savings, loans, investment and financial advisory services to individuals and micro, small and medium enterprises in Nigeria.",
  contact: {
    address: "2nd floor, 26 Moloney Street, Onikan",
    city: "Lagos",
    country: "NG",
    phones: [
      { display: "+234 906 464 1439", href: "tel:+2349064641439" },
      { display: "0703 973 9086", href: "tel:+2347039739086" },
    ],
    email: "info@boctrustmfb.com",
    privacyEmail: "privacy@boctrustmfb.com",
    hours: "9am – 5pm, Monday – Friday",
    floor: "2nd floor",
    street: "26 Moloney Street",
    district: "Onikan, Lagos Island",
    /** Google's geocode of the address used on the previous contact page. */
    geo: { latitude: 6.4479607, longitude: 3.4056994 },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=26+Moloney+Street+Onikan+Lagos",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=26+Moloney+Street+Onikan+Lagos",
    mapEmbedUrl:
      "https://maps.google.com/maps?hl=en&q=2nd+floor%2C+26+Moloney+street%2C+Onikan+%28Boctrust+Microfinance+Bank%29&z=17&output=embed",
  },
  socials: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/pages/Boctrust%20Microfinance%20Bank/1188460931185967/",
    },
    { id: "x", label: "X (Twitter)", href: "https://www.twitter.com/boctrustmfb" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/boctrustmfb/",
    },
  ],
} as const;

/**
 * Details for Cheetah's legal disclosure.
 * APPROVAL NEEDED: no RC number appears in any supplied source, so none is shown. Set it here and
 * it appears in the footer. The NDIC directory lists a different address (32 Lawson Street), so
 * Legal should also confirm which address is registered.
 */
export const LEGAL_ENTITY = {
  name: SITE.legalName,
  registrationNumber: null as string | null,
  address: `${SITE.contact.address}, ${SITE.contact.city}`,
};

export const CHEETAH = {
  name: "Cheetah",
  byline: "by Boctrust",
  fullName: "Cheetah by Boctrust",
  description:
    "Cheetah by Boctrust is a digital savings and payments app: fixed, goal-based, flexible and group savings, plus transfers, bills, airtime and data, in one place.",
} as const;
