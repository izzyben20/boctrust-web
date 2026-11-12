import type { Metadata } from "next";
import Link from "next/link";
import { IPhone } from "@/app/components/cheetah/IPhone";
import { ProductSections } from "@/app/components/cheetah/ProductSections";
import { VaultDial } from "@/app/components/cheetah/scenes";
import { StoreButtons } from "@/app/components/cheetah/StoreButtons";
import { Enter } from "@/app/components/shared/Enter";
import { ArrowRight } from "@/app/components/ui/icons";
import { CHEETAH_PRODUCTS } from "@/data/cheetah/products";
import { SCREENS } from "@/data/cheetah/screens";
import { pageMeta } from "@/lib/seo";

const product = CHEETAH_PRODUCTS.fixed;

export const metadata: Metadata = pageMeta({
  title: product.metaTitle,
  description: product.metaDescription,
  path: product.href,
  brand: "cheetah",
});

export default function FixedPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-fixed-night text-white">
        <div className="wrap grid gap-10 pt-28 lg:min-h-[38rem] lg:grid-cols-12 lg:items-center lg:pt-24">
          <Enter className="lg:col-span-6 lg:pb-10">
            <p className="eyebrow text-fixed">{product.name}</p>
            <h1 className="display-hero mt-4">Lock it. Let it earn.</h1>
            <p className="lede mt-5 max-w-xl text-white/90">{product.summary}</p>
            <Link href="/cheetah/calculator" className="mt-7 inline-flex min-h-13 items-center gap-2 rounded-full bg-fixed px-6 font-display font-bold text-fixed-night transition-colors hover:bg-white">
              Calculate your returns <ArrowRight className="size-5" />
            </Link>
            <StoreButtons className="mt-5" />
          </Enter>
          <Enter className="relative h-[27rem] sm:h-[32rem] lg:col-span-5 lg:col-start-8 lg:h-full lg:self-stretch" delay={0.12} y={50}>
            <VaultDial className="absolute top-6 left-1/2 w-[30rem] -translate-x-1/2 opacity-70 sm:w-[38rem] lg:top-[6%] lg:w-[40rem]" />
            <IPhone {...SCREENS.fixed} priority sizes="(max-width: 1024px) 62vw, 320px" className="absolute top-0 left-1/2 w-[64%] max-w-[18rem] -translate-x-1/2 lg:top-8 lg:w-[20rem] lg:max-w-none" />
          </Enter>
        </div>
      </section>
      <ProductSections product={product} visual={<IPhone {...SCREENS.home} className="mx-auto w-full max-w-[16rem]" sizes="256px" />} />
    </>
  );
}
