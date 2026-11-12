import { DEMO_POSTS } from "@/data/blog/demo-posts";
import type { BlogPost } from "@/data/blog/types";

/**
 * THE CMS BOUNDARY. Pages only ever call these functions. To connect a headless CMS, fetch and
 * map to BlogPost here (add "use cache" and cacheLife); no page or component needs to change.
 */
const byNewest = (a: BlogPost, b: BlogPost) => b.publishedAt.localeCompare(a.publishedAt);

export async function getAllPosts(): Promise<BlogPost[]> {
  return [...DEMO_POSTS].sort(byNewest);
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return DEMO_POSTS.find((post) => post.slug === slug);
}

export async function getFeaturedPost(): Promise<BlogPost> {
  const posts = await getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const others = (await getAllPosts()).filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getCategories(): Promise<string[]> {
  return [...new Set((await getAllPosts()).map((p) => p.category))];
}

export const formatPostDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
