import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/app/components/corporate/ArticleCard";
import { JsonLd } from "@/app/components/shared/JsonLd";
import { Enter } from "@/app/components/shared/Enter";
import { ArrowLeft } from "@/app/components/ui/icons";
import { SITE } from "@/config/site";
import type { BlogBlock } from "@/data/blog/types";
import { formatPostDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ title: string }> };

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ title: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title } = await params;
  const post = await getPost(title);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.image,
    noindex: post.isDemo,
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="!my-10 border-l-4 border-gold py-1 pl-5 font-display text-2xl leading-snug font-bold tracking-tight text-navy sm:text-3xl">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function ArticlePage({ params }: Props) {
  const { title } = await params;
  const post = await getPost(title);
  if (!post) notFound();
  const related = await getRelatedPosts(post);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          image: absoluteUrl(post.image),
          author: { "@type": "Organization", name: SITE.legalName },
          publisher: { "@type": "Organization", name: SITE.legalName },
        }}
      />
      <header className="wrap pt-10 lg:pt-16">
        <Link href="/blogs" className="flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-navy">
          <ArrowLeft className="size-4" /> All articles
        </Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="eyebrow text-gold-deep">{post.category}</p>
            <h1 className="display-page mt-3 text-navy">{post.title}</h1>
          </div>
          <dl className="text-sm text-ink-soft lg:col-span-3">
            <dt className="sr-only">Written by</dt>
            <dd className="font-semibold text-navy">{post.author}</dd>
            <dt className="sr-only">Published</dt>
            <dd>{formatPostDate(post.publishedAt)}</dd>
            <dt className="sr-only">Reading time</dt>
            <dd>{post.readingMinutes} min read</dd>
          </dl>
        </div>
      </header>
      <Enter className="wrap mt-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-ivory lg:aspect-[21/9]">
          <Image src={post.image} alt={post.imageAlt} fill priority sizes="96vw" className="object-cover" />
        </div>
      </Enter>
      <div className="wrap grid gap-8 py-12 lg:grid-cols-12 lg:py-20">
        <div className="prose-ledger text-lg lg:col-span-7 lg:col-start-3">
          <p className="font-display text-2xl leading-snug font-medium tracking-tight text-navy">{post.excerpt}</p>
          {post.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </div>
      <aside aria-labelledby="related" className="border-t-2 border-navy bg-ivory">
        <div className="wrap py-14 lg:py-20">
          <h2 id="related" className="display-md text-navy">Keep reading</h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ArticleCard post={item} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </article>
  );
}
