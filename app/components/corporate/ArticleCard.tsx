import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog/types";
import { formatPostDate } from "@/lib/blog";

export function ArticleCard({ post, sizes = "(max-width: 768px) 92vw, 30vw" }: { post: BlogPost; sizes?: string }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ivory">
          <Image src={post.image} alt="" fill sizes={sizes} className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
        </div>
        <p className="eyebrow mt-4 text-gold-deep">{post.category}</p>
        <h3 className="display-sm mt-2 text-navy underline-offset-4 group-hover:underline">{post.title}</h3>
        <p className="mt-2 text-sm text-ink-soft">
          {formatPostDate(post.publishedAt)} · {post.readingMinutes} min read
        </p>
      </Link>
    </article>
  );
}
