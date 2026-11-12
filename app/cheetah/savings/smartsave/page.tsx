import type { Metadata } from "next";
import Image from "next/image";
import { IPhone } from "@/app/components/cheetah/IPhone";
import { ProductSections } from "@/app/components/cheetah/ProductSections";
import { GoalRings } from "@/app/components/cheetah/scenes";
import { StoreButtons } from "@/app/components/cheetah/StoreButtons";
import { Enter } from "@/app/components/shared/Enter";
import { CHEETAH_PRODUCTS } from "@/data/cheetah/products";
import { APP_CROPS, SCREENS } from "@/data/cheetah/screens";
import { pageMeta } from "@/lib/seo";

const product = CHEETAH_PRODUCTS.smartsave;

export const metadata: Metadata = pageMeta({
  title: product.metaTitle,
  description: product.metaDescription,
  path: product.href,
  brand: "cheetah",
});

const SCHEDULES = [
  { label: "Daily", ticks: 30 },
  { label: "Weekly", ticks: 8 },
  { label: "Monthly", ticks: 3 },
];

export default function SmartSavePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-smart-mist text-stride-night">
        <div className="wrap grid gap-6 pt-28 lg:min-h-[38rem] lg:grid-cols-12 lg:items-center lg:pt-24">
          <Enter className="lg:col-span-5 lg:pb-10">
            <p className="eyebrow text-smart-ink">{product.name}</p>
            <h1 className="display-hero mt-4">Name the goal. Automate the rest.</h1>
            <p className="lede mt-5 max-w-lg text-stride-night/85">{product.summary}</p>
            <StoreButtons className="mt-7" />
          </Enter>
          <Enter className="relative h-[24rem] sm:h-[30rem] lg:col-span-7 lg:h-full lg:self-stretch" delay={0.12} y={50}>
            <GoalRings className="absolute top-2 left-1/2 w-[24rem] -translate-x-1/2 sm:w-[30rem] lg:top-[8%] lg:w-[34rem]" />
            <IPhone {...SCREENS.home} priority sizes="288px" className="absolute top-8 left-1/2 w-[60%] max-w-[16rem] -translate-x-1/2 sm:max-w-[18rem] lg:top-[12%]" />
          </Enter>
        </div>
      </section>
      <ProductSections
        product={product}
        visual={
          <div className="overflow-hidden rounded-[2rem]">
            <Image src={APP_CROPS.save.src} width={APP_CROPS.save.width} height={APP_CROPS.save.height} alt={APP_CROPS.save.alt} sizes="(max-width: 1024px) 92vw, 40vw" className="h-auto w-full" />
          </div>
        }
        extra={
          <section className="bg-stride-night text-white">
            <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
              <h2 className="display-md lg:col-span-5">Pick a rhythm that matches your money.</h2>
              <ul className="lg:col-span-6 lg:col-start-7">
                {SCHEDULES.map((schedule) => (
                  <li key={schedule.label} className="grid grid-cols-[5rem_1fr] items-end gap-4 border-b border-white/20 py-4">
                    <h3 className="font-display text-lg font-bold tracking-tight">{schedule.label}</h3>
                    <div aria-hidden className="flex h-10 items-end gap-[3px]">
                      {Array.from({ length: schedule.ticks }, (_, i) => (
                        <span key={i} className="flex-1 rounded-t-sm bg-smart" style={{ height: `${((i + 1) / schedule.ticks) * 100}%` }} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        }
      />
    </>
  );
}
