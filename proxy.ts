import { type NextRequest, NextResponse } from "next/server";
import { DEMO_POSTS } from "@/data/blog/demo-posts";

/**
 * Article pages are served from a prerendered shell, so a missing slug would otherwise answer
 * 200 with a noindex tag (a "soft 404"). This gives search engines a real 404.
 * When a CMS replaces the demo posts, read the slug list from it here.
 */
const KNOWN_SLUGS = new Set(DEMO_POSTS.map((post) => post.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (KNOWN_SLUGS.has(slug)) return NextResponse.next();
  // No route exists at this path, so it renders the site's not-found page.
  return NextResponse.rewrite(new URL("/article-not-found", request.url), { status: 404 });
}

export const config = { matcher: "/blog/:title" };
