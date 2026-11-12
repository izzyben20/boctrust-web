import Image from "next/image";
import Link from "next/link";
import { APP_LINKS } from "@/config/links";
import type { ProductPhoto, ProductStory } from "@/data/corporate/product-stories";
import { CATEGORY_LABELS, type CorporateProduct, productsByCategory } from "@/data/corporate/products";
import { Accordion } from "../../shared/Accordion";
import { ArrowRight, ArrowUpRight } from "../../ui/icons";

export function ProductCta({ product, skin }: { product: CorporateProduct; skin: string }) {
  const base = `inline-flex min-h-13 w-fit items-center gap-2 rounded-full px-6 font-display font-bold transition-colors ${skin}`;
  if (product.cta === "apply") {
    return (
      <a href={APP_LINKS.boctrust.applyForLoan} className={base}>
        Apply for a loan <ArrowUpRight className="size-5" />
      </a>
    );
  }
  if (product.cta === "cheetah") {
    return (
      <Link href="/cheetah/calculator" className={base}>
        Estimate your returns <ArrowRight className="size-5" />
      </Link>
    );
  }
  return (
    <Link href="/contact" className={base}>
      {product.cta === "advice" ? "Speak to an adviser" : "Open an account"} <ArrowRight className="size-5" />
    </Link>
  );
}

/**
 * A photograph filling its frame. The frame (shape, ratio, colour behind) comes from the caller, so
 * each category can art-direct its own. The hero passes `preload`; everything else loads lazily.
 */
export function ProductImage({ photo, sizes, preload, className = "" }: { photo: ProductPhoto; sizes: string; preload?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill preload={preload} sizes={sizes} className="object-cover" style={{ objectPosition: photo.position }} />
    </div>
  );
}

/** The words of the section built around the body photograph. */
export function StoryCopy({ story, id, tone = "light" }: { story: ProductStory["story"]; id: string; tone?: "light" | "dark" }) {
  return (
    <>
      <p className={`eyebrow ${tone === "dark" ? "text-gold" : "text-gold-deep"}`}>{story.eyebrow}</p>
      <h2 id={id} className="display-md mt-3">{story.title}</h2>
      <p className={`mt-5 max-w-xl text-lg leading-relaxed ${tone === "dark" ? "text-white/85" : "text-ink-soft"}`}>{story.body}</p>
    </>
  );
}

export function ProductFaq({ items }: { items?: ProductStory["faqs"] }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="product-faq" className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
      <h2 id="product-faq" className="display-md text-navy lg:col-span-4">Good to know.</h2>
      <div className="lg:col-span-7 lg:col-start-6">
        <Accordion items={items} />
      </div>
    </section>
  );
}

export function RelatedProducts({ product, dark }: { product: CorporateProduct; dark?: boolean }) {
  const siblings = productsByCategory(product.category).filter((p) => p.slug !== product.slug);
  const showCheetah = product.category === "savings" || product.category === "investments";
  const rule = dark ? "border-white/20" : "border-rule";
  return (
    <section aria-labelledby="related-heading" className={dark ? "bg-navy-deep text-white" : "bg-ivory text-navy"}>
      <div className="wrap grid gap-6 py-12 lg:grid-cols-12 lg:py-16">
        <h2 id="related-heading" className="display-sm lg:col-span-4">More in {CATEGORY_LABELS[product.category]}</h2>
        <ul className="lg:col-span-7 lg:col-start-6">
          {siblings.map((sibling) => (
            <li key={sibling.slug} className={`border-b ${rule}`}>
              <Link href={`/${sibling.slug}`} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                <span>
                  <span className="block font-display text-lg font-bold tracking-tight">{sibling.name}</span>
                  <span className="block text-sm opacity-80">{sibling.headline}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
          {showCheetah && (
            <li className={`border-b ${rule}`}>
              <Link href="/cheetah" className="group flex min-h-16 items-center justify-between gap-4 py-3">
                <span>
                  <span className="block font-display text-lg font-bold tracking-tight">Cheetah savings</span>
                  <span className="block text-sm opacity-80">Our digital savings app</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

export const TERMS_NOTE = "Rates, charges and eligibility are subject to review. Please confirm current terms with us.";
