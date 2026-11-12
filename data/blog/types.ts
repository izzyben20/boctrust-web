/** A renderer-neutral shape, so a headless CMS can map onto it later without touching any UI. */
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  /** ISO date. */
  publishedAt: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  featured?: boolean;
  /** Demo posts are excluded from the sitemap and marked noindex. */
  isDemo: boolean;
  body: BlogBlock[];
};
