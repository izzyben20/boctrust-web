import { LEGACY_APP_URL } from "./legacy-app";

/** The placeholder value for a destination that has not been supplied yet. */
export const PLACEHOLDER_LINK = "#";

/**
 * EVERY external app destination lives here. While a store URL is "#", its badge shows but does
 * not navigate. Replace the "#" with the real URL and every badge across Cheetah goes live.
 */
export const APP_LINKS = {
  cheetah: {
    googlePlay: PLACEHOLDER_LINK,
    appStore: PLACEHOLDER_LINK,
    /** Web login/signup are optional: Cheetah is app-first. Nothing renders while these are "#". */
    webLogin: PLACEHOLDER_LINK,
    webSignup: PLACEHOLDER_LINK,
  },
  boctrust: {
    login: `${LEGACY_APP_URL}/login`,
    staffLogin: `${LEGACY_APP_URL}/staff-login`,
    /** The live site's "Account Opening" and "Apply for Loan" links both lead to this form. */
    signup: `${LEGACY_APP_URL}/loan`,
    applyForLoan: `${LEGACY_APP_URL}/loan`,
    jobApplication: `${LEGACY_APP_URL}/jobs-application`,
  },
} as const;

export const isLiveLink = (href: string): boolean => href !== PLACEHOLDER_LINK && href.length > 0;
