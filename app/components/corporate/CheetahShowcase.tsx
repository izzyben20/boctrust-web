import Link from "next/link";
import { CHEETAH_PRODUCT_LIST } from "@/data/cheetah/products";
import { CheetahMark } from "../brand/CheetahMark";
import { ArrowUpRight } from "../ui/icons";
import { PlanCard } from "./cheetah-showcase/PlanCard";

/**
 * Cheetah, the sister app, on Boctrust navy. All four savings plans are on show at once, two to a
 * row from `md`, carried by type, spacing and hairlines rather than imagery.
 */
export function CheetahShowcase() {
  return (
    <section aria-labelledby="cheetah-heading" className="bg-navy text-white">
      <div className="wrap py-16 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <CheetahMark colorway="navyGold" className="size-10 rounded-lg ring-1 ring-white/15" title="Cheetah logo" />
            <h2 id="cheetah-heading" className="display-md mt-5">
              Cheetah, <span className="text-gold">by Boctrust</span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-white/75">
              Our digital savings and payments app: four ways to save, plus transfers, bills, airtime and data.
            </p>
            <Link
              href="/cheetah"
              className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-gold px-6 font-display font-bold text-gold transition-colors hover:bg-gold hover:text-navy"
            >
              Visit Cheetah <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-5">
          {CHEETAH_PRODUCT_LIST.map((product) => (
            <li key={product.slug}>
              <PlanCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
