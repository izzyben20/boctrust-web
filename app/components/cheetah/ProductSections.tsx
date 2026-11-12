import Link from "next/link";
import type { ReactNode } from "react";
import { CHEETAH_PRODUCTS, type CheetahProduct } from "@/data/cheetah/products";
import { SAMPLE_NOTE } from "@/data/cheetah/screens";
import { productJsonLd } from "@/lib/seo";
import { JsonLd } from "../shared/JsonLd";
import { Reveal } from "../shared/Reveal";
import { ArrowRight } from "../ui/icons";
import { CheetahFaq } from "./CheetahFaq";
import { StoreButtons } from "./StoreButtons";

const THEMES = {
  fixed: { ink: "text-fixed-ink", mist: "bg-fixed-mist", rule: "bg-fixed" },
  smartsave: { ink: "text-smart-ink", mist: "bg-smart-mist", rule: "bg-smart" },
  flex: { ink: "text-flex-ink", mist: "bg-flex-mist", rule: "bg-flex" },
  padi: { ink: "text-padi-ink", mist: "bg-padi-mist", rule: "bg-padi" },
} as const;

type ProductSectionsProps = {
  product: CheetahProduct;
  /** The product's own app visual, set beside its benefits. */
  visual: ReactNode;
  extra?: ReactNode;
};

/** The shared body of a savings page: one design language, with each product's colour as its accent. */
export function ProductSections({ product, visual, extra }: ProductSectionsProps) {
  const theme = THEMES[product.slug];
  return (
    <>
      <JsonLd data={productJsonLd({ name: product.name, description: product.metaDescription, path: product.href, category: "Savings" })} />

      <section aria-label={`${product.name} at a glance`} className="border-b border-stride-night/10">
        <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
          {product.features.map((feature) => (
            <div key={feature.label} className="py-5 pr-3 lg:py-7">
              <dt className="text-sm text-stride-night/70">{feature.label}</dt>
              <dd className="mt-0.5 font-display text-lg leading-tight font-bold tracking-tight sm:text-xl">{feature.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="display-md">Why you&apos;ll like it.</h2>
          </Reveal>
          <ul className="mt-8 border-t-2 border-stride-night">
            {product.benefits.map((benefit, index) => (
              <Reveal as="li" key={benefit.title} delay={index * 0.07} className="border-b border-stride-night/15 py-5">
                <h3 className="font-display text-xl font-bold tracking-tight">{benefit.title}</h3>
                <p className="mt-1 text-stride-night/80">{benefit.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          {visual}
          <p className="mt-4 text-center text-xs text-stride-night/70">{SAMPLE_NOTE}</p>
        </Reveal>
      </section>

      {extra}

      <section className={theme.mist}>
        <div className="wrap py-16 lg:py-24">
          <Reveal>
            <h2 className="display-md">How it works.</h2>
          </Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {product.steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.06}>
                <span aria-hidden className={`block h-1.5 rounded-full ${theme.rule}`} style={{ width: `${40 + index * 20}%` }} />
                <p className={`tabular mt-4 text-sm font-bold ${theme.ink}`}>Step {index + 1}</p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-stride-night/80">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:py-20">
        <h2 className="display-sm lg:col-span-4">The small print.</h2>
        <ul className="border-t-2 border-stride-night lg:col-span-7 lg:col-start-6">
          {product.conditions.map((condition) => (
            <li key={condition} className="border-b border-stride-night/15 py-4">{condition}</li>
          ))}
        </ul>
      </section>

      <CheetahFaq items={product.faqs} title={`${product.name}, explained.`} className="border-t border-stride-night/10" />

      <section className="wrap grid gap-8 border-t border-stride-night/10 py-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h2 className="display-sm">Ready when you are.</h2>
          <StoreButtons className="mt-5" />
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {product.related.map((slug) => {
            const related = CHEETAH_PRODUCTS[slug];
            return (
              <li key={slug} className="border-t border-stride-night/15">
                <Link href={related.href} className="group block py-4">
                  <span className="flex items-center justify-between gap-3 font-display text-lg font-bold tracking-tight">
                    {related.name} <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="mt-0.5 block text-sm text-stride-night/80">{related.tagline}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
