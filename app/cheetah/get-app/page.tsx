import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheetahGlyph, CheetahMark } from "@/app/components/brand/CheetahMark";
import { GettingStarted } from "@/app/components/cheetah/GettingStarted";
import { IPhone } from "@/app/components/cheetah/IPhone";
import { StoreButtons } from "@/app/components/cheetah/StoreButtons";
import { Enter } from "@/app/components/shared/Enter";
import { Reveal } from "@/app/components/shared/Reveal";
import { ArrowRight } from "@/app/components/ui/icons";
import { APP_CROPS, SAMPLE_NOTE, SCREENS } from "@/data/cheetah/screens";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Get the Cheetah App",
  description: "Download Cheetah by Boctrust from the App Store or Google Play. Save four ways, send money, pay bills, and buy airtime and data in one app.",
  path: "/cheetah/get-app",
  brand: "cheetah",
});

export default function GetAppPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-stride-deep text-white">
        <CheetahGlyph className="pointer-events-none absolute top-[58%] left-1/2 -z-10 w-[92rem] max-w-none -translate-x-1/2 -translate-y-1/2 text-white/[0.07]" />
        <div className="wrap pt-28 text-center lg:pt-32">
          <Enter y={14}>
            <CheetahMark colorway="navyGold" className="mx-auto size-16 rounded-2xl" title="Cheetah logo" />
          </Enter>
          <Enter delay={0.06}>
            <h1 className="display-hero mt-5">Get Cheetah.</h1>
            <p className="lede mx-auto mt-3 max-w-xl text-white/90">Save, send and pay from one app, built by Boctrust Microfinance Bank.</p>
          </Enter>
          <Enter delay={0.14}>
            <StoreButtons className="mt-7 justify-center" />
          </Enter>
        </div>
        <div className="relative mx-auto mt-10 h-[23rem] max-w-3xl sm:h-[28rem] lg:mt-12 lg:h-[30rem]">
          <Enter y={70} delay={0.18} className="absolute top-14 left-[3%] w-[39%] -rotate-[8deg] sm:left-[8%] sm:w-[14rem]">
            <IPhone {...SCREENS.padi} sizes="224px" shadow={false} />
          </Enter>
          <Enter y={70} delay={0.18} className="absolute top-14 right-[3%] w-[39%] rotate-[8deg] sm:right-[8%] sm:w-[14rem]">
            <IPhone {...SCREENS.send} sizes="224px" shadow={false} />
          </Enter>
          <Enter y={80} delay={0.08} className="absolute top-0 left-1/2 w-[48%] -translate-x-1/2 sm:w-[17rem]">
            <IPhone {...SCREENS.home} sizes="272px" priority />
          </Enter>
        </div>
      </section>

      <section aria-labelledby="why-heading" className="wrap py-16 lg:py-24">
        <Reveal>
          <h2 id="why-heading" className="display-md max-w-2xl">One app, three good habits.</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="relative flex flex-col overflow-hidden rounded-[2rem] bg-sun lg:col-span-7">
            <div className="p-7 sm:p-9">
              <h3 className="display-sm">Save your way</h3>
              <p className="mt-2 max-w-md">Lock it, automate it, keep it flexible, or save with your people.</p>
            </div>
            <div className="relative min-h-[22rem] flex-1 sm:min-h-[28rem]">
              <Image src={APP_CROPS.save.src} alt={APP_CROPS.save.alt} fill sizes="(max-width: 1024px) 92vw, 55vw" className="object-cover object-[50%_18%]" />
            </div>
          </Reveal>
          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={0.08} className="relative overflow-hidden rounded-[2rem] bg-stride-night p-7 text-white sm:p-9">
              <h3 className="display-sm">Move money fast</h3>
              <p className="mt-2 max-w-[15rem] text-white/85">Transfers, bills, airtime and data, with a receipt for every one.</p>
              <Image src={APP_CROPS.receipt.src} width={APP_CROPS.receipt.width} height={APP_CROPS.receipt.height} alt={APP_CROPS.receipt.alt} sizes="280px" className="mx-auto mt-6 h-auto w-[72%] max-w-[17rem] -rotate-3" />
            </Reveal>
            <Reveal delay={0.14} className="overflow-hidden rounded-[2rem] bg-stride-mist">
              <div className="p-7 sm:p-9">
                <h3 className="display-sm">Grow your limits</h3>
                <p className="mt-2 text-stride-night/80">Three account tiers. Verify more as you need more.</p>
                <Link href="/cheetah/payments" className="mt-3 flex min-h-11 w-fit items-center gap-2 font-display text-sm font-bold">
                  See the limits <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="relative h-56">
                <Image src={APP_CROPS.tiers.src} alt={APP_CROPS.tiers.alt} fill sizes="(max-width: 1024px) 92vw, 40vw" className="object-cover object-[50%_14%]" />
              </div>
            </Reveal>
          </div>
        </div>
        <p className="mt-4 text-xs text-stride-night/70">{SAMPLE_NOTE}</p>
      </section>

      <GettingStarted>
        <StoreButtons />
      </GettingStarted>
    </>
  );
}
