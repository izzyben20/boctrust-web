import Link from "next/link";
import { LOAN_PAGE } from "@/data/corporate/company";
import { LOANS_COMPARE } from "@/data/corporate/product-compare";
import type { ProductStory } from "@/data/corporate/product-stories";
import type { CorporateProduct } from "@/data/corporate/products";
import { Enter } from "../../shared/Enter";
import { Reveal } from "../../shared/Reveal";
import { CheckIcon } from "../../ui/icons";
import { CompareLedger } from "./CompareLedger";
import { ProductCta, ProductFaq, ProductImage, RelatedProducts, StoryCopy } from "./shared";

/**
 * Loans: confident and direct. Navy, with the borrower's portrait running the full height of the
 * hero to the right edge behind a solid gold rule. The body photograph sits on an offset gold
 * block beside what the money is for, then three steps and the terms.
 */
export function LoanProduct({ product, story }: { product: CorporateProduct; story: ProductStory }) {
  const { hero, body } = story.photos;
  return (
    <>
      <section className="relative isolate bg-navy text-white">
        <Enter delay={0.06} y={0} as="figure" className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[44%]">
          <ProductImage photo={hero} preload sizes="(max-width: 1024px) 100vw, 44vw" className="aspect-5/4 bg-navy-soft sm:aspect-video lg:absolute lg:inset-0 lg:aspect-auto" />
          <span aria-hidden className="absolute inset-y-0 left-0 hidden w-2 bg-gold lg:block" />
        </Enter>

        <div className="wrap lg:flex lg:min-h-[38rem] lg:items-center">
          <div className="py-12 lg:w-[50%] lg:py-20 lg:pr-10">
            <Enter y={14}>
              <p className="eyebrow text-gold">Loans · {product.name}</p>
            </Enter>
            <Enter delay={0.05}>
              <h1 className="display-page mt-4">{product.headline}</h1>
            </Enter>
            <Enter delay={0.12}>
              <p className="mt-8 border-l-4 border-gold pl-5">
                <span className="block font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none font-bold tracking-tight text-gold">{story.highlight.value}</span>
                <span className="mt-2 block text-white/85">{story.highlight.label}</span>
              </p>
              <div className="mt-9">
                <ProductCta product={product} skin="bg-gold text-navy hover:bg-white" />
              </div>
            </Enter>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="wrap grid gap-12 py-16 text-navy lg:grid-cols-12 lg:items-center lg:py-28">
        <Reveal as="figure" className="relative mb-4 sm:mb-6 lg:col-span-6">
          <span aria-hidden className="absolute -bottom-4 -left-4 h-3/4 w-3/4 bg-gold sm:-bottom-6 sm:-left-6" />
          <ProductImage photo={body} sizes="(max-width: 1024px) 92vw, 46vw" className="aspect-4/3 bg-rule" />
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <StoryCopy story={story.story} id="story-heading" />
          </Reveal>
          {story.uses && (
            <>
              <h3 className="eyebrow mt-10 text-gold-deep">When it helps</h3>
              <ul className="mt-3">
                {story.uses.map((use, index) => (
                  <Reveal as="li" key={use} delay={index * 0.05} y={12} className="border-t border-rule py-3.5 font-display text-lg font-bold tracking-tight last:border-b">
                    {use}
                  </Reveal>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="path-heading" className="bg-navy text-white">
        <div className="wrap py-16 lg:py-24">
          <Reveal>
            <h2 id="path-heading" className="display-md">Three steps to your money.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-10 border-t border-white/20 pt-10 lg:grid-cols-3">
            {LOAN_PAGE.steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.1}>
                <span className="tabular grid size-12 place-items-center rounded-full bg-gold font-display text-lg font-bold text-navy">{index + 1}</span>
                <h3 className="display-sm mt-5">{step.title}</h3>
                <p className="mt-2 max-w-sm text-white/85">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="wrap grid gap-12 py-16 text-navy lg:grid-cols-2 lg:py-24">
        <div>
          <h2 id="benefits-heading" className="display-md">Why it works.</h2>
          <ul className="mt-6 grid gap-3">
            {product.benefits.map((benefit, index) => (
              <Reveal as="li" key={benefit} delay={index * 0.03} y={12} className="flex gap-3 text-ink">
                <CheckIcon className="mt-1 size-5 shrink-0 text-gold-deep" /> {benefit}
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="border-t-4 border-gold bg-ivory p-6 sm:p-9">
          <h2 className="display-sm">What you&apos;ll need to know.</h2>
          <ul className="mt-4">
            {product.features.map((feature) => (
              <li key={feature} className="border-b border-rule py-3 text-sm text-ink last:border-b-0">{feature}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-soft">
            See our <Link href="/loanterms" className="underline underline-offset-2">loan terms</Link>.
          </p>
        </div>
      </section>

      <section className="bg-navy-deep text-white">
        <div className="wrap py-16 lg:py-20">
          <CompareLedger table={LOANS_COMPARE} current={product.slug} title="Our loans, side by side." dark />
        </div>
      </section>

      <ProductFaq items={story.faqs} />

      <section className="bg-gold text-navy">
        <div className="wrap flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center">
          <h2 className="display-sm">Ready when you are.</h2>
          <ProductCta product={product} skin="bg-navy text-white hover:bg-white hover:text-navy" />
        </div>
      </section>
      <RelatedProducts product={product} dark />
    </>
  );
}
