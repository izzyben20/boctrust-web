import type { Metadata } from "next";
import Link from "next/link";
import { CheetahMark } from "@/app/components/brand/CheetahMark";
import { StageArc } from "@/app/components/cheetah/art";
import { CheetahFaq } from "@/app/components/cheetah/CheetahFaq";
import { GettingStarted } from "@/app/components/cheetah/GettingStarted";
import { IPhone } from "@/app/components/cheetah/IPhone";
import { PaymentsBand } from "@/app/components/cheetah/PaymentsBand";
import { ProductShowcase } from "@/app/components/cheetah/ProductShowcase";
import { StoreButtons } from "@/app/components/cheetah/StoreButtons";
import { Enter } from "@/app/components/shared/Enter";
import { RegulatoryBanner } from "@/app/components/shared/RegulatoryBanner";
import { Reveal } from "@/app/components/shared/Reveal";
import FlexSVG from "@/app/components/svg/FlexSVG";
import PadiSVG from "@/app/components/svg/PadiSVG";
import SmartSaveSVG from "@/app/components/svg/SmartSaveSVG";
import VaultIconSVG from "@/app/components/svg/VaultSVG";
import { ArrowRight, BellIcon, DevicesIcon, FingerprintIcon, LockIcon } from "@/app/components/ui/icons";
import { CHEETAH } from "@/config/site";
import { CHEETAH_PRODUCTS } from "@/data/cheetah/products";
import { SCREENS } from "@/data/cheetah/screens";
import { CHEETAH_HOME_FAQS } from "@/data/faq/cheetah";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Cheetah by Boctrust | Digital Savings and Payments",
  absoluteTitle: true,
  description: CHEETAH.description,
  path: "/cheetah",
  brand: "cheetah",
});

const SECURITY = [
  { Icon: FingerprintIcon, title: "Biometric login", body: "Sign in with your fingerprint or Face ID." },
  { Icon: LockIcon, title: "Your transaction PIN", body: "Set, reset and change the PIN behind your payments." },
  { Icon: DevicesIcon, title: "Device management", body: "See which devices are logged in to your account." },
  { Icon: BellIcon, title: "Alerts that stay on", body: "Debit and security alerts can't be switched off." },
];

const HERO_PLANS = [
  { product: CHEETAH_PRODUCTS.fixed, Icon: VaultIconSVG },
  { product: CHEETAH_PRODUCTS.smartsave, Icon: SmartSaveSVG },
  { product: CHEETAH_PRODUCTS.flex, Icon: FlexSVG },
  { product: CHEETAH_PRODUCTS.padi, Icon: PadiSVG },
];

function PlanLink({ plan }: { plan: (typeof HERO_PLANS)[number] }) {
  return (
    <Link href={plan.product.href} className="group flex min-h-11 items-center gap-2.5 font-display text-sm font-bold">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white transition-transform duration-300 group-hover:-translate-y-0.5">
        <plan.Icon className="h-auto w-5" aria-hidden />
      </span>
      {plan.product.name}
    </Link>
  );
}

export default function CheetahHome() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-sun text-stride-night">
        <div className="wrap grid pt-28 lg:min-h-168 lg:grid-cols-12 lg:items-center lg:pt-24">
          <div className="pb-10 lg:col-span-6 lg:pb-14">
            <Enter y={14}>
              <p className="flex items-center gap-2.5 font-display text-sm font-bold">
                <CheetahMark colorway="navyGold" className="size-7" />
                Digital savings and payments, by Boctrust
              </p>
            </Enter>
            <h1 className="display-page mt-5">
              <Enter as="span" className="block" delay={0.05}>Quick on payments.</Enter>
              <Enter as="span" className="block" delay={0.12}>Patient with savings.</Enter>
            </h1>
            <Enter delay={0.2}>
              <p className="lede mt-5 max-w-lg lg:max-w-100 xl:max-w-lg">Four ways to grow your money and an easy way to move it, all in one app.</p>
            </Enter>
            <Enter delay={0.26}>
              <StoreButtons className="mt-7" />
            </Enter>
          </div>

          <div className="relative h-[27rem] sm:h-[32rem] lg:col-span-6 lg:h-full lg:self-stretch">
            <StageArc className="absolute top-8 left-1/2 w-[34rem] max-w-none -translate-x-1/2 sm:w-[42rem] lg:top-10 lg:left-[58%] lg:w-[36rem] xl:top-2 xl:left-[44%] xl:w-[46rem]" />
            <Enter y={50} delay={0.12} className="absolute top-3 left-[7%] w-[46%] -rotate-[9deg] sm:left-[14%] sm:w-[15rem] lg:top-24 lg:left-0 lg:w-[14rem] xl:w-[16rem]">
              <IPhone {...SCREENS.flex} sizes="256px" shadow={false} priority />
            </Enter>
            <Enter y={70} delay={0.04} className="absolute top-0 left-[38%] w-[54%] sm:left-[40%] sm:w-[18rem] lg:top-8 lg:left-[28%] lg:w-[16rem] xl:w-[19rem]">
              <IPhone {...SCREENS.home} sizes="(max-width: 1024px) 54vw, 304px" priority />
            </Enter>
          </div>
        </div>
      </section>

      <nav aria-label="Savings plans" className="border-b border-stride-night/10">
        <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-1 py-3 md:grid-cols-4">
          {HERO_PLANS.map((plan) => (
            <li key={plan.product.slug}><PlanLink plan={plan} /></li>
          ))}
        </ul>
      </nav>

      <section aria-labelledby="save-heading" className="wrap py-16 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-stride-deep">Four ways to save</p>
            <h2 id="save-heading" className="display-md mt-3">Every naira deserves a plan.</h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <p className="text-stride-night/80">Money you need tomorrow and money you need next year shouldn&apos;t sit in the same place.</p>
          </Reveal>
        </div>
        <Reveal className="mt-10">
          <ProductShowcase />
        </Reveal>
      </section>

      <PaymentsBand />

      <GettingStarted>
        <StoreButtons />
      </GettingStarted>

      <section aria-labelledby="security-heading" className="wrap py-16 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-stride-deep">Security</p>
          <h2 id="security-heading" className="display-md mt-3">Fast doesn&apos;t mean careless.</h2>
          <p className="mt-4 text-stride-night/80">Whenever money moves in or out of your account, you hear about it in the app, by email and, for transfers and withdrawals, by SMS.</p>
          <Link href="/cheetah/security" className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-display font-bold text-stride-deep underline decoration-2 underline-offset-4 hover:text-stride-night">
            How Cheetah protects you <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <ul className="mt-10 grid border-t-2 border-stride-night sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY.map(({ Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.06} className="border-b border-stride-night/15 py-6 sm:px-5 lg:border-b-0 lg:first:pl-0">
              <Icon className="size-7 text-stride-deep" />
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{title}</h3>
              <p className="mt-1 text-sm text-stride-night/80">{body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <RegulatoryBanner variant="cheetah" />
      <CheetahFaq items={CHEETAH_HOME_FAQS} id="faqs" title="Questions, answered." moreLink />
    </>
  );
}
