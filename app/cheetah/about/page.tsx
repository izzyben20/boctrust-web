import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { CheetahMark } from "@/app/components/brand/CheetahMark";
import { StageArc } from "@/app/components/cheetah/art";
import { IPhone } from "@/app/components/cheetah/IPhone";
import { StoreButtons } from "@/app/components/cheetah/StoreButtons";
import { Enter } from "@/app/components/shared/Enter";
import { Reveal } from "@/app/components/shared/Reveal";
import FlexSVG from "@/app/components/svg/FlexSVG";
import PadiSVG from "@/app/components/svg/PadiSVG";
import SmartSaveSVG from "@/app/components/svg/SmartSaveSVG";
import VaultIconSVG from "@/app/components/svg/VaultSVG";
import { ArrowRight, BellIcon, CheckIcon } from "@/app/components/ui/icons";
import { verifiedClaims } from "@/config/regulatory";
import { SITE } from "@/config/site";
import { COMPANY } from "@/data/corporate/company";
import { CHEETAH_PRODUCTS, type CheetahProductSlug } from "@/data/cheetah/products";
import { SCREENS } from "@/data/cheetah/screens";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Cheetah: Savings and Payments from Boctrust",
  description:
    "Cheetah is the digital savings and payments app from Boctrust Microfinance Bank: four ways to grow your money and an easy way to move it, backed by a bank licensed by the Central Bank of Nigeria.",
  path: "/cheetah/about",
  brand: "cheetah",
});

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Every statement restates the Cheetah product specification, the Cheetah FAQ, the bank's own
 * published copy (data/corporate/company.ts) or a verified regulatory record. No customer numbers,
 * founding dates or awards are claimed because none has been supplied.
 */
const FACTS = [
  { value: "4", label: "ways to save, in one app" },
  { value: "6% – 18%", label: "a year on Boc Fixed Savings" },
  { value: "3", label: "account tiers, from your phone" },
];

const BELIEFS = [
  { title: "Every naira deserves a plan.", body: "Money you need tomorrow and money you need next year shouldn't sit in the same place, so each gets its own." },
  { title: "You stay in control.", body: "However you pay, you see the details and confirm before any money moves." },
  { title: "You always know.", body: "Every debit and credit sends an alert, and debit and security alerts can't be switched off." },
  { title: "Saving is better together.", body: "Boc Padi brings ajo into the app: your group pays into one pool, and everyone takes a turn to collect it all." },
];

/** The four plans, ordered by how soon the money is needed. */
const HORIZON: { slug: CheetahProductSlug; when: string; Icon: Icon; tile: string; ink: string }[] = [
  { slug: "flex", when: "Any day", Icon: FlexSVG, tile: "bg-flex-mist", ink: "text-flex-ink" },
  { slug: "smartsave", when: "In 3, 6 or 12 months", Icon: SmartSaveSVG, tile: "bg-smart-mist", ink: "text-smart-ink" },
  { slug: "fixed", when: "From 30 days, locked", Icon: VaultIconSVG, tile: "bg-fixed-mist", ink: "text-fixed-ink" },
  { slug: "padi", when: "Together, in turns", Icon: PadiSVG, tile: "bg-padi-mist", ink: "text-padi-ink" },
];

const EXPERIENCE = [
  { title: "Open an account from your phone", body: "Your basic details, BVN or NIN verification and a live selfie open a Tier 1 account." },
  { title: "Save and pay in the same place", body: "Send money, pay a bill or top up a phone from the app that holds your savings." },
  { title: "Scan it, snap it or send it", body: "Pay a merchant's QR code, photograph written payment details, or send to any Nigerian bank." },
  { title: "See your returns before you commit", body: "The Fixed Savings calculator estimates what a deposit could earn for your amount and term." },
];

export default function CheetahAboutPage() {
  const claims = verifiedClaims().filter((claim) => claim.id !== "ndpc");

  return (
    <>
      {/* HERO: the words on the left; on the right a portrait in an arch with the real app laid over its edge. */}
      <section className="relative isolate overflow-hidden bg-white">
        <div className="wrap grid gap-12 pt-28 pb-16 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-32 lg:pb-24">
          <div className="lg:col-span-6">
            <Enter y={14}>
              <p className="flex items-center gap-2.5 font-display text-sm font-bold">
                <CheetahMark colorway="navyGold" className="size-7" />
                About Cheetah
              </p>
            </Enter>
            <Enter delay={0.05}>
              <h1 className="display-page mt-5 max-w-[15ch]">A bank&apos;s patience, at an app&apos;s speed.</h1>
              <p className="lede mt-5 max-w-xl text-stride-night/80">
                Cheetah is the digital savings and payments app from {SITE.name}. It puts four ways to grow your money and an easy way to move it in one place.
              </p>
            </Enter>
            <Enter delay={0.12}>
              <dl className="mt-9 grid max-w-xl grid-cols-3 border-t-2 border-stride-night">
                {FACTS.map((fact, index) => (
                  <div key={fact.label} className={`pt-4 pr-3 ${index > 0 ? "border-l border-stride-night/15 pl-3 sm:pl-5" : ""}`}>
                    <dt className="sr-only">{fact.label}</dt>
                    <dd>
                      <span className="tabular block font-display text-[clamp(1.2rem,2.6vw,1.85rem)] leading-none whitespace-nowrap font-bold tracking-tight">{fact.value}</span>
                      <span className="mt-2 block text-sm text-stride-night/75">{fact.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Enter>
          </div>

          <Enter delay={0.08} y={30} className="relative mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8 lg:max-w-none">
            <span aria-hidden className="absolute top-[14%] -right-4 bottom-[-6%] left-[18%] rounded-t-full bg-sun sm:-right-8" />
            <div className="relative ml-auto aspect-4/5 w-[86%] overflow-hidden rounded-t-full bg-stride-mist">
              <Image
                src="/images/cheetah/about/woman-smiling-at-phone.jpg"
                alt="A young woman in a cap smiling down at her phone outdoors"
                fill
                preload
                sizes="(max-width: 1024px) 24rem, 34vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <div className="absolute bottom-[-8%] left-0 w-[38%] max-w-44">
              <IPhone {...SCREENS.home} sizes="176px" />
            </div>
          </Enter>
        </div>
      </section>

      {/* OUR STORY */}
      <section aria-labelledby="story-heading" className="bg-stride-mist">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-stride-deep">Our story</p>
            <h2 id="story-heading" className="display-md mt-3">Why Cheetah exists.</h2>
            <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-stride-night/85">
              <p>{COMPANY.whoWeAre}</p>
              <p>
                Cheetah carries that work onto your phone. It gives the money you need any day, the money you&apos;re building towards a goal and the money you can leave alone each a plan of its own, and keeps everyday payments right beside them.
              </p>
              <p>Behind the app is the bank itself: {claims.map((claim) => claim.statement.charAt(0).toLowerCase() + claim.statement.slice(1)).join(", and ")}.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08} as="figure" className="relative lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] rounded-br-[7rem] bg-white">
              <Image
                src="/images/cheetah/about/friends-sharing-phone.jpg"
                alt="Two friends in Lagos laughing together over something on a phone"
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <blockquote className="relative -mt-10 mr-8 ml-4 rounded-2xl bg-stride-night p-6 text-white sm:mr-16 sm:ml-8">
              <p className="font-display text-xl leading-snug font-bold tracking-tight">“{COMPANY.belief}”</p>
              <footer className="mt-2 text-sm text-white/75">{SITE.name}</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE BELIEVE: four principles as one ruled statement block, not four boxes. */}
      <section aria-labelledby="beliefs-heading" className="wrap py-16 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-stride-deep">What we believe</p>
          <h2 id="beliefs-heading" className="display-md mt-3">Four ideas behind every screen.</h2>
        </Reveal>
        <ol className="mt-10 border-t-2 border-stride-night">
          {BELIEFS.map((belief, index) => (
            <Reveal
              as="li"
              key={belief.title}
              delay={index * 0.05}
              y={12}
              className="group grid gap-2 border-b border-stride-night/15 py-6 md:grid-cols-12 md:items-baseline md:gap-6 lg:py-8"
            >
              <span aria-hidden className="tabular font-display text-sm font-bold text-stride-deep md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-tight font-bold tracking-tight md:col-span-6">{belief.title}</h3>
              <p className="text-stride-night/80 md:col-span-5">{belief.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* BUILT AROUND YOUR GOALS: the four plans on one horizon, from "any day" to "together". */}
      <section aria-labelledby="goals-heading" className="border-t border-stride-night/10 bg-white">
        <div className="wrap py-16 lg:py-24">
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-stride-deep">Built around your financial goals</p>
              <h2 id="goals-heading" className="display-md mt-3">One app, for every horizon.</h2>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
              <p className="text-stride-night/80">Pick a plan by when you&apos;ll need the money, then let the app keep you to it.</p>
            </Reveal>
          </div>

          <ol className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {/* The horizon line the four plans sit on (wide screens). */}
            <span aria-hidden className="absolute top-6 right-0 left-0 hidden h-0.5 bg-stride-night/15 lg:block" />
            {HORIZON.map(({ slug, when, Icon, tile, ink }, index) => {
              const product = CHEETAH_PRODUCTS[slug];
              return (
                <Reveal as="li" key={slug} delay={index * 0.06} className="relative flex flex-col">
                  <span aria-hidden className="relative hidden size-12 place-items-center rounded-full bg-white ring-2 ring-stride-night lg:grid">
                    <span className="size-3 rounded-full bg-sun" />
                  </span>
                  <p className={`eyebrow lg:mt-5 ${ink}`}>{when}</p>
                  <Link href={product.href} className={`group mt-3 flex min-h-56 flex-1 flex-col rounded-[1.75rem] p-6 transition-transform duration-300 hover:-translate-y-1 ${tile}`}>
                    <span className="grid size-12 place-items-center rounded-xl bg-white">
                      <Icon className="h-auto w-7" aria-hidden />
                    </span>
                    <span className="mt-5 block font-display text-xl font-bold tracking-tight">{product.name}</span>
                    <span className="mt-1 block text-sm text-stride-night/80">{product.cardLine}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-display text-sm font-bold">
                      Explore {product.name.replace("Boc ", "")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* THE CHEETAH EXPERIENCE: a portrait and the payments screen, beside what using the app is like. */}
      <section aria-labelledby="experience-heading" className="relative isolate overflow-hidden bg-stride-night text-white">
        <div className="wrap grid gap-14 py-16 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-24">
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <StageArc stroke="var(--color-stride-deep)" width={56} className="absolute top-[-8%] left-[-18%] -z-10 w-[86%]" />
            <div className="relative aspect-3/4 w-[78%] overflow-hidden rounded-[1.75rem] rounded-tl-[8rem] bg-stride-deep">
              <Image
                src="/images/cheetah/about/woman-on-the-move.jpg"
                alt="A young woman checking her phone as she walks along a sunny street in Abuja"
                fill
                sizes="(max-width: 1024px) 22rem, 30vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <div className="absolute right-0 bottom-[-6%] w-[42%] max-w-48">
              <IPhone {...SCREENS.payments} sizes="192px" />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-sun">The Cheetah experience</p>
              <h2 id="experience-heading" className="display-md mt-3">Quick on payments. Patient with savings.</h2>
            </Reveal>
            <ul className="mt-8 border-t border-white/20">
              {EXPERIENCE.map((item, index) => (
                <Reveal as="li" key={item.title} delay={index * 0.05} y={12} className="flex gap-4 border-b border-white/20 py-5">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-sun text-stride-night">
                    <CheckIcon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold tracking-tight">{item.title}</span>
                    <span className="mt-1 block text-white/75">{item.body}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.25} className="mt-6 flex items-center gap-3 text-sm text-white/80">
              <BellIcon className="size-5 shrink-0 text-sun" />
              <p>
                Want the details on keeping your account safe?{" "}
                <Link href="/cheetah/security" className="font-semibold text-white underline decoration-sun decoration-2 underline-offset-4">See how Cheetah protects you</Link>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section aria-labelledby="closing-heading" className="wrap py-16 lg:py-24">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="closing-heading" className="display-md">Find the plan that fits, then let it run.</h2>
            <p className="mt-4 max-w-xl text-stride-night/80">Compare the four savings plans, or check what a fixed deposit could earn for your amount and term.</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <Link href="/cheetah#save-heading" className="inline-flex min-h-13 items-center gap-2 rounded-full bg-stride-night px-6 font-display font-bold text-white transition-colors hover:bg-stride-deep">
                Explore the savings plans <ArrowRight className="size-5" />
              </Link>
              <Link href="/cheetah/calculator" className="inline-flex min-h-13 items-center rounded-full px-6 font-display font-bold ring-1 ring-stride-night/20 transition-colors hover:bg-sun hover:ring-sun">
                Try the calculator
              </Link>
            </div>
            <StoreButtons />
          </div>
        </Reveal>
      </section>
    </>
  );
}
