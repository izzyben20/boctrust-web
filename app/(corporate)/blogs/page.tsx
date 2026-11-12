import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogExplorer } from "@/app/components/corporate/BlogExplorer";
import { Enter } from "@/app/components/shared/Enter";
import { ArrowRight } from "@/app/components/ui/icons";
import { formatPostDate, getAllPosts, getCategories, getFeaturedPost } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Blog and Insights",
  description: "Ideas on personal finance, saving and running a small business in Nigeria, from Boctrust Microfinance Bank.",
  path: "/blogs",
});

export default async function BlogsPage() {
  const [posts, categories, featured] = await Promise.all([getAllPosts(), getCategories(), getFeaturedPost()]);
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      {/* A publication's masthead */}
      <header className="wrap pt-12 lg:pt-16">
        <div className="flex items-end justify-between gap-4 border-b-2 border-navy pb-3">
          <p className="eyebrow text-navy">Boctrust Insights</p>
          <p className="eyebrow text-gold-deep">Money and enterprise</p>
        </div>
        <h1 className="display-hero py-5 text-navy lg:py-8">The Ledger.</h1>
      </header>

      <section aria-label="Featured article" className="wrap">
        <Enter>
          <article className="group grid border-y border-rule lg:grid-cols-12">
            <Link href={`/blog/${featured.slug}`} className="relative block aspect-[16/10] overflow-hidden lg:col-span-7 lg:my-6 lg:rounded-2xl">
              <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(max-width: 1024px) 96vw, 58vw" className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
            </Link>
            <div className="flex flex-col justify-center py-6 lg:col-span-4 lg:col-start-9">
              <p className="eyebrow text-gold-deep">Featured · {featured.category}</p>
              <h2 className="display-md mt-3 text-navy">
                <Link href={`/blog/${featured.slug}`} className="underline-offset-4 group-hover:underline">{featured.title}</Link>
              </h2>
              <p className="mt-3 text-ink-soft">{featured.excerpt}</p>
              <p className="mt-4 text-sm text-ink-soft">
                {formatPostDate(featured.publishedAt)} · {featured.readingMinutes} min read
              </p>
              <Link href={`/blog/${featured.slug}`} className="mt-4 flex min-h-11 w-fit items-center gap-2 font-display font-bold text-navy" aria-label={`Read: ${featured.title}`}>
                Read article <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        </Enter>
      </section>

      <section aria-label="All articles" className="wrap py-14 lg:py-20">
        <BlogExplorer posts={rest} categories={categories} />
      </section>
    </>
  );
}
