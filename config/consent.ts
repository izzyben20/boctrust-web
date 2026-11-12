/**
 * Replace the placeholder (or set NEXT_PUBLIC_GTM_ID) when the production container exists.
 * While it is a placeholder, no Google Tag Manager request is ever made.
 */
export const GTM_PLACEHOLDER = "GTM-XXXXXXX";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? GTM_PLACEHOLDER;
export const isGtmConfigured = (id: string = GTM_ID): boolean =>
  id !== GTM_PLACEHOLDER && /^GTM-[A-Z0-9]+$/.test(id);

/** The Tawk.to live-chat property the current site loads. It runs only with "functional" consent. */
export const TAWK_EMBED_URL = "https://embed.tawk.to/5e74e6aeeec7650c33217ad9/default";

export const CONSENT_COOKIE = "boctrust_consent";
/** Bump to ask everyone again, for example when a new category is added. */
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180;

export type OptionalCategory = "functional" | "analytics" | "marketing";

export const CONSENT_CATEGORIES: {
  id: "necessary" | OptionalCategory;
  label: string;
  description: string;
  required?: boolean;
}[] = [
  {
    id: "necessary",
    label: "Strictly necessary",
    description: "Keep the site working and remember this choice. These cannot be switched off.",
    required: true,
  },
  {
    id: "functional",
    label: "Functional",
    description: "Turn on extras such as the live support chat, which is provided by a third party.",
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Help us understand which pages are useful so we can improve them.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Help us measure campaigns and show more relevant messages on other platforms.",
  },
];
