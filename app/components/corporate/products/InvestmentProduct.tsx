import { COMPANY } from "@/data/corporate/company";
import { INVESTMENT_COMPARE } from "@/data/corporate/product-compare";
import type { ProductStory } from "@/data/corporate/product-stories";
import type { CorporateProduct } from "@/data/corporate/products";
import { Enter } from "../../shared/Enter";
import { Reveal } from "../../shared/Reveal";
import { CompareLedger } from "./CompareLedger";
import { ProductCta, ProductImage, RelatedProducts, StoryCopy, TERMS_NOTE } from "./shared";

/**
 * Investments: a magazine feature. A ruled masthead, the headline over a ledger of the figures,
 * and the portrait set on an offset pale-gold block. Numbered chapters carry the benefits and terms;
 * the body photograph opens the chapter on how the product pays.
 */
export function InvestmentProduct({ product, story }: { product: CorporateProduct; story: ProductStory }) {
  const { hero, body } = story.photos;
  return (
    <>
      <section className="wrap pt-10 pb-16 text-navy lg:pt-14 lg:pb-24">
        <Enter y={10} className="flex items-baseline justify-between border-t-2 border-navy pt-3">
          <p className="eyebrow text-gold-deep">Investments · {product.name}</p>
          <p aria-hidden className="eyebrow hidden text-ink-soft sm:block">Boctrust Microfinance Bank</p>
        </Enter>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <Enter delay={0.05}>
              <h1 className="display-hero max-w-3xl">{product.headline}</h1>
              <p className="lede mt-6 max-w-2xl text-ink-soft">{product.intro}</p>
            </Enter>
            {story.figures && (
              <Enter delay={0.1}>
                <dl className="mt-10 grid border-y border-navy sm:grid-cols-3">
                  {story.figures.map((figure, index) => (
                    <div key={figure.label} className={`py-5 sm:px-5 sm:first:pl-0 ${index > 0 ? "border-t border-rule sm:border-t-0 sm:border-l" : ""}`}>
                      <dt className="text-sm text-ink-soft">{figure.label}</dt>
                      <dd className="tabular mt-1 font-display text-2xl font-bold tracking-tight">{figure.value}</dd>
                    </div>
                  ))}
                </dl>
              </Enter>
            )}
            <Enter delay={0.14} className="mt-9">
              <ProductCta product={product} skin="bg-navy text-white hover:bg-gold hover:text-navy" />
            </Enter>
          </div>

          <Enter delay={0.08} y={20} as="figure" className="relative mx-auto w-full max-w-104 pr-4 pb-4 lg:col-span-4 lg:col-start-9 lg:max-w-none">
            {/* A gold block offset behind the portrait gives it weight without a label or frame. */}
            <span aria-hidden className="absolute top-10 right-0 bottom-0 left-10 bg-gold-pale" />
            <ProductImage photo={hero} preload sizes="(max-width: 1024px) 26rem, 30vw" className="aspect-3/4 bg-rule" />
          </Enter>
        </div>
      </section>

      <section className="bg-ivory text-navy">
        <div className="wrap py-14 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Chapter number="I" title="Why it earns its place" items={product.benefits} />
            <Chapter number="II" title="The terms" items={product.features} />
          </div>
          <p className="mt-6 text-sm text-ink-soft">{TERMS_NOTE}</p>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="wrap grid gap-10 py-16 text-navy lg:grid-cols-12 lg:items-center lg:py-24">
        <Reveal as="figure" className="lg:col-span-5">
          <ProductImage photo={body} sizes="(max-width: 1024px) 92vw, 40vw" className="aspect-4/5 bg-ivory" />
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="font-display text-sm font-bold text-gold-deep">III</p>
          <Reveal>
            <StoryCopy story={story.story} id="story-heading" />
          </Reveal>
          <h3 className="display-sm mt-10">Before you commit.</h3>
          <ul className="mt-4 border-t-2 border-navy">
            {[
              "Your rate is fixed at the start, for the tenor you choose.",
              "Leaving before maturity costs you: check the early-exit terms for each product.",
              "Rates are subject to review, so confirm current terms with us before you invest.",
            ].map((line) => (
              <li key={line} className="border-b border-rule py-4 text-ink">{line}</li>
            ))}
          </ul>
          <blockquote className="mt-10 border-l-4 border-gold pl-5 font-display text-xl leading-snug font-bold tracking-tight">{COMPANY.pillars[2].body}</blockquote>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap py-16 text-navy lg:py-20">
          <CompareLedger table={INVESTMENT_COMPARE} current={product.slug} title="Fixed Deposit and Investment Note, compared." />
        </div>
      </section>

      <RelatedProducts product={product} />
    </>
  );
}

function Chapter({ number, title, items }: { number: string; title: string; items: string[] }) {
  return (
    <div>
      <Reveal>
        <p className="font-display text-sm font-bold text-gold-deep">{number}</p>
        <h2 className="display-md mt-1">{title}</h2>
      </Reveal>
      <ul className="mt-6">
        {items.map((item, index) => (
          <Reveal as="li" key={item} delay={index * 0.04} y={12} className="border-t border-rule py-3.5 text-ink">
            {item}
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
