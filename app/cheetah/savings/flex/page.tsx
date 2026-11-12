import type { Metadata } from "next";
import { IPhone } from "@/app/components/cheetah/IPhone";
import { ProductSections } from "@/app/components/cheetah/ProductSections";
import { FlexCurrents } from "@/app/components/cheetah/scenes";
import { StoreButtons } from "@/app/components/cheetah/StoreButtons";
import { Enter } from "@/app/components/shared/Enter";
import { CHEETAH_PRODUCTS } from "@/data/cheetah/products";
import { SCREENS } from "@/data/cheetah/screens";
import { pageMeta } from "@/lib/seo";

const product = CHEETAH_PRODUCTS.flex;

export const metadata: Metadata = pageMeta({
  title: product.metaTitle,
  description: product.metaDescription,
  path: product.href,
  brand: "cheetah",
});

export default function FlexPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-flex-mist text-stride-night">
        <FlexCurrents lines={13} className="absolute inset-x-0 bottom-10 -z-10 h-64 w-full opacity-60 lg:right-0 lg:bottom-16 lg:left-auto lg:h-80 lg:w-[45%]" />
        <div className="wrap grid pt-28 lg:min-h-[38rem] lg:grid-cols-12 lg:items-center lg:pt-24">
          <Enter className="pb-10 lg:col-span-7">
            <p className="eyebrow text-flex-ink">{product.name}</p>
            <h1 className="display-hero mt-4">In and out, any day.</h1>
            <p className="lede mt-5 max-w-xl">{product.summary}</p>
            <StoreButtons className="mt-7" />
          </Enter>
          <Enter className="relative h-[21rem] sm:h-[26rem] lg:col-span-4 lg:col-start-9 lg:h-full lg:self-stretch" delay={0.12} y={60}>
            <IPhone {...SCREENS.flex} priority sizes="304px" className="absolute top-0 left-1/2 w-[60%] max-w-[17rem] -translate-x-1/2 rotate-[5deg] lg:top-10 lg:w-[19rem] lg:max-w-none" />
          </Enter>
        </div>
      </section>
      <ProductSections product={product} visual={<IPhone {...SCREENS.flex} className="mx-auto w-full max-w-[16rem]" sizes="256px" />} />
    </>
  );
}
