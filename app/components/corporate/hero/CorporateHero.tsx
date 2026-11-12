import Link from "next/link";
import { APP_LINKS } from "@/config/links";
import { HERO_COPY, HERO_PORTRAITS } from "@/data/corporate/hero";
import { ArrowRight } from "../../ui/icons";
import { HeroPortraits } from "./HeroPortraits";

/**
 * The corporate homepage hero. The words never change; only the people beside them do.
 *
 * Wide screens: copy on the left; on the right, a solid ivory arch with a portrait standing on the
 * hero's bottom edge, head rising past the arch's crown. Narrow screens: the copy first, then the
 * arch and portrait at a fixed height. Solid colour throughout, no gradients.
 */
export function CorporateHero() {
  return (
    <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-paper">
      <div className="wrap grid lg:min-h-160 lg:grid-cols-12 lg:items-center xl:min-h-176">
        <div className="pt-8 pb-6 sm:pt-14 sm:pb-10 lg:col-span-6 lg:py-16 xl:col-span-5">
          <p className="eyebrow text-gold-deep">{HERO_COPY.eyebrow}</p>
          <h1 id="home-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] font-bold tracking-[-0.035em] text-navy">
            {HERO_COPY.headline}
          </h1>
          <p className="lede mt-5 max-w-[33rem] text-ink-soft sm:mt-6">{HERO_COPY.description}</p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
            <a
              href={APP_LINKS.boctrust.applyForLoan}
              className="flex min-h-14 items-center gap-2 rounded-full bg-navy px-5 font-display sm:px-7 font-bold text-white transition-colors hover:bg-gold hover:text-navy"
            >
              Apply for a loan <ArrowRight className="size-5" />
            </a>
            <Link
              href="/about"
              className="flex min-h-14 items-center rounded-full border border-navy px-5 font-display sm:px-7 font-bold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Meet the bank
            </Link>
          </div>
        </div>

        <div className="relative h-80 sm:h-120 lg:col-span-6 lg:h-full lg:self-stretch xl:col-span-6 xl:col-start-7">
          <div aria-hidden className="absolute inset-x-[8%] top-[14%] bottom-0 rounded-t-full bg-ivory sm:inset-x-[16%] lg:inset-x-[6%] lg:top-[12%] xl:inset-x-[10%]" />
          <HeroPortraits portraits={HERO_PORTRAITS} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 80vw" />
        </div>
      </div>
    </section>
  );
}
