/**
 * The homepage hero: one standing message, and four portraits that take turns beside it.
 *
 * Portraits are Pexels photographs (https://www.pexels.com/license/): free for commercial use and
 * for modification, attribution not required. The licence does not allow implying that the people
 * shown endorse the bank, so the portraits carry no names, quotes or captions.
 *
 * Each was cut out of its studio backdrop (IS-Net segmentation, @imgly/background-removal 1.4.5),
 * its alpha levelled so the person is fully opaque and stray specks are cleared, trimmed to the
 * subject and saved as transparent WebP at 1400px tall.
 */
export const HERO_COPY = {
  eyebrow: "Boctrust Microfinance Bank",
  headline: "Banking for the work you’re building.",
  description:
    "Savings, loans, investments and financial advice for individuals and growing businesses across Nigeria, from managers with over two decades of banking experience.",
} as const;

export type HeroPortrait = {
  src: string;
  width: number;
  height: number;
  photographer: string;
  source: string;
  /**
   * Fine-tuning so every person reads at the same size: the share of the stage's height the
   * cutout fills, and a horizontal nudge in % of the stage width (positive moves right).
   */
  fit: { height: number; x: number };
};

const PEXELS = "Pexels License";

export const HERO_PORTRAITS: readonly (HeroPortrait & { license: typeof PEXELS })[] = [
  {
    src: "/images/corporate/hero/businesswoman-red-dress.webp",
    width: 933,
    height: 1400,
    photographer: "RDNE Stock project",
    source: "https://www.pexels.com/photo/woman-holding-a-plastic-folder-10375978/",
    license: PEXELS,
    fit: { height: 84, x: 0 },
  },
  {
    src: "/images/corporate/hero/man-in-agbada.webp",
    width: 903,
    height: 1400,
    photographer: "Thirdman",
    source: "https://www.pexels.com/photo/man-in-black-and-white-dress-shirt-6109284/",
    license: PEXELS,
    fit: { height: 94, x: 0 },
  },
  {
    src: "/images/corporate/hero/entrepreneur-orange-blazer.webp",
    width: 741,
    height: 1400,
    photographer: "Em Batsari",
    source: "https://www.pexels.com/photo/confident-african-businesswoman-smiling-in-orange-jacket-37357477/",
    license: PEXELS,
    fit: { height: 95, x: 0 },
  },
  {
    src: "/images/corporate/hero/professional-navy-suit.webp",
    width: 726,
    height: 1400,
    photographer: "António Ribeiro",
    source: "https://www.pexels.com/photo/man-in-smart-clothes-17362827/",
    license: PEXELS,
    fit: { height: 97, x: 0 },
  },
];
