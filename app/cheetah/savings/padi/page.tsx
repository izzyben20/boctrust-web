import type { Metadata } from "next";
import { IPhone } from "@/app/components/cheetah/IPhone";
import { PadiRounds } from "@/app/components/cheetah/PadiRounds";
import { ProductSections } from "@/app/components/cheetah/ProductSections";
import { PadiCircle } from "@/app/components/cheetah/scenes";
import { StoreButtons } from "@/app/components/cheetah/StoreButtons";
import { Enter } from "@/app/components/shared/Enter";
import { CHEETAH_PRODUCTS } from "@/data/cheetah/products";
import { SCREENS } from "@/data/cheetah/screens";
import { pageMeta } from "@/lib/seo";

const product = CHEETAH_PRODUCTS.padi;

export const metadata: Metadata = pageMeta({
  title: product.metaTitle,
  description: product.metaDescription,
  path: product.href,
  brand: "cheetah",
});

export default function PadiPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-padi-mist text-stride-night">
        <div className="wrap pt-28 text-center lg:pt-32">
          <Enter>
            <p className="eyebrow text-padi-ink">{product.name}</p>
            <h1 className="display-hero mx-auto mt-4 max-w-[16ch]">Ajo, in your pocket.</h1>
            <p className="lede mx-auto mt-5 max-w-2xl">{product.summary}</p>
            <StoreButtons className="mt-6 justify-center" />
          </Enter>
        </div>
        <Enter delay={0.12} y={60} className="relative mx-auto mt-10 h-[24rem] w-full max-w-3xl sm:h-[28rem]">
          <PadiCircle orbit className="absolute top-4 left-1/2 w-[34rem] max-w-none -translate-x-1/2 sm:w-[44rem]" />
          <IPhone {...SCREENS.padi} priority sizes="272px" className="absolute top-0 left-1/2 w-[56%] max-w-[17rem] -translate-x-1/2" />
        </Enter>
      </section>
      <ProductSections
        product={product}
        visual={<IPhone {...SCREENS.padi} className="mx-auto w-full max-w-[16rem]" sizes="256px" />}
        extra={
          <section className="bg-stride-night text-white">
            <div className="wrap py-16 lg:py-24">
              <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
                <h2 className="display-md lg:col-span-7">Watch a cycle play out.</h2>
                <p className="text-white/85 lg:col-span-4 lg:col-start-9">An example group of five, each paying ₦10,000 a round. Real contributions are set by your group.</p>
              </div>
              <div className="mt-10">
                <PadiRounds />
              </div>
            </div>
          </section>
        }
      />
    </>
  );
}
