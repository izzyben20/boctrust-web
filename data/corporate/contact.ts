import { APP_LINKS } from "@/config/links";
import { SITE } from "@/config/site";

/** Where to send people for common needs, in place of a general enquiry form. */
export const CONTACT_ROUTES = [
  { label: "I want to borrow", note: "Start a loan application", href: APP_LINKS.boctrust.applyForLoan, external: true },
  { label: "I have a question", note: "Browse answers in the help centre", href: "/support", external: false },
  { label: "I want to save digitally", note: "Meet Cheetah, our savings app", href: "/cheetah", external: false },
  { label: "I want to work with you", note: "See why people join us", href: "/careers", external: false },
  { label: "I have a data request", note: SITE.contact.privacyEmail, href: `mailto:${SITE.contact.privacyEmail}`, external: true },
] as const;

/**
 * Attribution required by each licence. CC BY-SA 4.0 also requires saying the image was changed
 * and sharing adaptations under the same licence.
 */
export const CONTACT_CREDITS = [
  {
    work: "Lagos centre from the Continental hotel",
    author: "FrankvEck",
    source: "https://commons.wikimedia.org/wiki/File:Lagos-centre-from-executive-lounge-Continental-hotel-2026-IMG_7970.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    note: "cropped",
  },
  {
    work: "Aerial view of Lagos Island",
    author: "Ei'eke",
    source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Lagos_Island.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    note: "cropped",
  },
] as const;
