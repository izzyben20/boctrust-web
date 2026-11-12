import { SAVINGS_COMPARE } from "@/data/corporate/product-compare";
import type { ProductStory } from "@/data/corporate/product-stories";
import type { CorporateProduct } from "@/data/corporate/products";
import { Enter } from "../../shared/Enter";
import { Reveal } from "../../shared/Reveal";
import { CompareLedger } from "./CompareLedger";
import { ProductCta, ProductFaq, ProductImage, RelatedProducts, StoryCopy, TERMS_NOTE } from "./shared";

/**
 * Savings: warm and approachable. A portrait under an arch (the homepage's shape) on a pale-gold
 * block, with the product's headline fact as a navy tab on its edge. The body photograph opens out
 * to a wide frame for "who it's for", and the steps read as a ledger timeline.
 */
export function SavingsProduct({ product, story }: { product: CorporateProduct; story: ProductStory }) {
  const { hero, body } = story.photos;
  return (
    <>
      <section className="overflow-hidden bg-ivory text-navy">
        <div className="wrap grid gap-12 pt-10 pb-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-20">
          <div className="lg:col-span-6 lg:pr-6">
            <Enter y={14}>
              <p className="eyebrow text-gold-deep">Savings · {product.name}</p>
            </Enter>
            <Enter delay={0.05}>
              <h1 className="display-page mt-4">{product.headline}</h1>
              <p className="lede mt-5 max-w-xl text-ink-soft">{product.intro}</p>
            </Enter>
            <Enter delay={0.12} className="mt-8">
              <ProductCta product={product} skin="bg-navy text-white hover:bg-gold hover:text-navy" />
            </Enter>
          </div>

          <Enter delay={0.08} y={24} as="figure" className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:col-start-8 lg:max-w-none">
            <span aria-hidden className="absolute top-[12%] -right-[12%] bottom-[-8%] left-[22%] rounded-t-full bg-gold-pale" />
            <ProductImage photo={hero} preload sizes="(max-width: 1024px) 26rem, 36vw" className="aspect-4/5 rounded-t-full bg-rule" />
            <p className="absolute bottom-8 -left-3 bg-navy px-5 py-4 text-white sm:-left-8">
              <span className="block font-display text-3xl leading-none font-bold tracking-tight text-gold">{story.highlight.value}</span>
              <span className="mt-1 block text-sm text-white/85">{story.highlight.label}</span>
            </p>
          </Enter>
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
        <Reveal className="lg:col-span-4">
          <h2 id="benefits-heading" className="display-md text-navy">What you get.</h2>
          <p className="mt-3 max-w-xs text-ink-soft">Every benefit below comes with the account as standard.</p>
        </Reveal>
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
          {product.benefits.map((benefit, index) => (
            <Reveal as="li" key={benefit} delay={index * 0.04} y={14} className="flex items-start gap-4 border-b border-rule py-4">
              <span aria-hidden className="tabular mt-1 font-display text-sm font-bold text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-display text-lg font-medium tracking-tight text-navy">{benefit}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The body photograph: wide, with the story set on a paper panel that overlaps it. */}
      <section aria-labelledby="story-heading" className="wrap pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 lg:items-end">
          <Reveal as="figure" className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
            <ProductImage photo={body} sizes="(max-width: 1024px) 92vw, 62vw" className="aspect-3/2 rounded-3xl bg-rule" />
          </Reveal>
          <Reveal delay={0.1} className="relative mt-6 bg-paper p-7 text-navy ring-1 ring-rule sm:p-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0 lg:mb-16">
            <StoryCopy story={story.story} id="story-heading" />
          </Reveal>
        </div>
      </section>

      {story.steps && (
        <section aria-labelledby="how-heading" className="bg-navy text-white">
          <div className="wrap py-16 lg:py-24">
            <Reveal>
              <h2 id="how-heading" className="display-md">How it works.</h2>
            </Reveal>
            <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
              {story.steps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.1} className="border-t-2 border-gold pt-6">
                  <p className="tabular font-display text-5xl leading-none font-bold text-gold">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="display-sm mt-5">{step.title}</h3>
                  <p className="mt-2 max-w-sm text-white/85">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section aria-labelledby="terms-heading" className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
        <Reveal className="lg:col-span-4">
          <h2 id="terms-heading" className="display-md text-navy">The details.</h2>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">{TERMS_NOTE}</p>
          <div className="mt-6">
            <ProductCta product={product} skin="bg-navy text-white hover:bg-gold hover:text-navy" />
          </div>
        </Reveal>
        <dl className="border-t-2 border-navy lg:col-span-7 lg:col-start-6">
          {product.features.map((feature, index) => (
            <div key={feature} className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-4">
              <dt className="tabular font-display text-sm font-bold text-gold-deep">{String(index + 1).padStart(2, "0")}</dt>
              <dd className="text-ink">{feature}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-paper">
        <div className="wrap border-t border-rule py-16 text-navy lg:py-20">
          <CompareLedger table={SAVINGS_COMPARE} current={product.slug} title="Three ways to save with Boctrust." />
        </div>
      </section>

      <ProductFaq items={story.faqs} />
      <RelatedProducts product={product} />
    </>
  );
}
