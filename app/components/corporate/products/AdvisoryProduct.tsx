import Link from "next/link";
import { COMPANY } from "@/data/corporate/company";
import type { ProductStory } from "@/data/corporate/product-stories";
import { type CorporateProduct, productsByCategory } from "@/data/corporate/products";
import { Enter } from "../../shared/Enter";
import { Reveal } from "../../shared/Reveal";
import { ArrowRight } from "../../ui/icons";
import { ProductCta, ProductImage, StoryCopy } from "./shared";

/**
 * Advisory: consultative rather than salesy. The conversation leads: a portrait on the left on an
 * offset navy block, the words beside it. The body photograph sits with how the work runs, then
 * the service's published scope as a numbered list and the three services as one practice.
 */
export function AdvisoryProduct({ product, story }: { product: CorporateProduct; story: ProductStory }) {
  const services = productsByCategory("advisory");
  const { hero, body } = story.photos;
  return (
    <>
      <section className="overflow-hidden bg-paper text-navy">
        <div className="wrap grid gap-12 pt-10 pb-16 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-20">
          <Enter delay={0.06} y={20} as="figure" className="relative mr-5 ml-0 sm:mx-auto sm:w-full sm:max-w-[28rem] lg:col-span-5 lg:mr-0 lg:max-w-none">
            <div className="relative">
              <span aria-hidden className="absolute top-8 -right-5 -bottom-5 left-8 rounded-tr-[6rem] bg-navy sm:-right-8 sm:-bottom-8" />
              <ProductImage photo={hero} preload sizes="(max-width: 1024px) 28rem, 38vw" className="aspect-4/5 rounded-tr-[6rem] bg-rule" />
            </div>
          </Enter>

          <div className="lg:col-span-6 lg:col-start-7">
            <Enter y={14}>
              <p className="eyebrow text-gold-deep">Advisory · {product.name}</p>
            </Enter>
            <Enter delay={0.05}>
              <h1 className="display-page mt-4">{product.headline}</h1>
              <p className="lede mt-5 max-w-xl text-ink-soft">{product.intro}</p>
            </Enter>
            <Enter delay={0.12}>
              <p className="mt-8 max-w-lg border-l-4 border-gold pl-5">
                <span className="block font-display text-xl font-bold tracking-tight">{story.highlight.value}</span>
                <span className="mt-1 block text-ink-soft">{story.highlight.label}</span>
              </p>
              <div className="mt-8">
                <ProductCta product={product} skin="bg-navy text-white hover:bg-gold hover:text-navy" />
              </div>
            </Enter>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="bg-ivory text-navy">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
          <Reveal className="lg:col-span-5">
            <StoryCopy story={story.story} id="story-heading" />
            <blockquote className="mt-8 border-t border-rule pt-5 text-ink-soft">{COMPANY.experience}</blockquote>
          </Reveal>
          <Reveal as="figure" delay={0.08} className="lg:col-span-7">
            <ProductImage photo={body} sizes="(max-width: 1024px) 92vw, 54vw" className="aspect-3/2 rounded-bl-[6rem] bg-rule" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="scope-heading" className="bg-navy text-white">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-gold">The scope</p>
            <h2 id="scope-heading" className="display-md mt-3">What we work through with you.</h2>
          </Reveal>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-gold/60" />
            {product.features.map((feature, index) => (
              <Reveal as="li" key={feature} delay={index * 0.05} y={12} className="relative grid grid-cols-[2.5rem_1fr] items-center gap-x-5 py-3">
                <span className="tabular grid size-10 place-items-center rounded-full bg-navy font-display text-sm font-bold text-gold ring-2 ring-gold">{index + 1}</span>
                <span className="font-display text-lg font-bold tracking-tight">{feature}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="wrap grid gap-10 py-16 text-navy lg:grid-cols-12 lg:py-24">
        <h2 id="benefits-heading" className="display-md lg:col-span-4">What it gives you.</h2>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="columns-1 gap-10 sm:columns-2">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="mb-5 break-inside-avoid border-t-2 border-navy pt-3 text-ink">{benefit}</li>
            ))}
          </ul>
          <div className="mt-6">
            <ProductCta product={product} skin="bg-navy text-white hover:bg-gold hover:text-navy" />
          </div>
        </div>
      </section>

      <section aria-labelledby="practice-heading" className="bg-ivory">
        <div className="wrap py-16 lg:py-20">
          <h2 id="practice-heading" className="display-md text-navy">One advisory practice, three focuses.</h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-rule md:grid-cols-3">
            {services.map((service) => {
              const here = service.slug === product.slug;
              const inner = (
                <>
                  <span className="font-display text-xl font-bold tracking-tight">{service.name}</span>
                  <span className={`mt-2 block text-sm ${here ? "text-white/80" : "text-ink-soft"}`}>{service.headline}</span>
                  {!here && <ArrowRight className="mt-6 size-5 transition-transform duration-300 group-hover:translate-x-1" />}
                  {here && <span className="mt-6 block text-xs font-bold text-gold">You&apos;re here</span>}
                </>
              );
              return (
                <li key={service.slug} className={here ? "bg-navy p-7 text-white" : "bg-paper text-navy"}>
                  {here ? (
                    <div aria-current="page">{inner}</div>
                  ) : (
                    <Link href={`/${service.slug}`} className="group block h-full p-7 transition-colors hover:bg-gold-pale">{inner}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
