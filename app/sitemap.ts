import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { CHEETAH_PRODUCT_LIST } from "@/data/cheetah/products";
import { CORPORATE_PRODUCTS } from "@/data/corporate/products";
import { getAllPosts } from "@/lib/blog";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/board",
  "/management",
  "/careers",
  "/contact",
  "/support",
  "/blogs",
  "/loan",
  "/loanterms",
  "/privacy",
  "/terms",
  "/cheetah",
  "/cheetah/payments",
  "/cheetah/calculator",
  "/cheetah/get-app",
  "/cheetah/faqs",
  "/cheetah/security",
  "/cheetah/about",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const paths = [
    ...STATIC_ROUTES,
    ...CORPORATE_PRODUCTS.map((p) => `/${p.slug}`),
    ...CHEETAH_PRODUCT_LIST.map((p) => p.href),
    // Demo articles stay out of search until real content replaces them.
    ...posts.filter((p) => !p.isDemo).map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE.url}${path === "/" ? "" : path}` }));
}
