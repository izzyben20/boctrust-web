import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeaderGrid } from "@/app/components/corporate/LeaderGrid";
import { Enter } from "@/app/components/shared/Enter";
import { Reveal } from "@/app/components/shared/Reveal";
import { ArrowRight } from "@/app/components/ui/icons";
import { BOARD } from "@/data/corporate/people";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Board of Directors",
  description:
    "Meet the Board of Directors guiding Boctrust Microfinance Bank with experience, integrity and a commitment to sustainable growth.",
  path: "/board",
});

export default function BoardPage() {
  const [chair, ...rest] = BOARD;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="wrap grid gap-10 pt-14 lg:grid-cols-12 lg:items-end lg:pt-20">
          <div className="pb-4 lg:col-span-7 lg:pb-20">
            <Enter>
              <p className="eyebrow text-gold">Board of Directors</p>
              <h1 className="display-page mt-4">The steady hands behind the bank.</h1>
              <p className="lede mt-6 max-w-2xl text-white/85">
                Meet the leadership team guiding Boctrust Microfinance Bank with experience, integrity and a commitment to sustainable growth.
              </p>
            </Enter>
          </div>
          <Enter className="lg:col-span-4 lg:col-start-9" delay={0.12}>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-navy-soft">
                <Image src={chair.photo} alt={`Portrait of ${chair.name}`} fill priority sizes="(max-width: 1024px) 92vw, 30vw" className="object-cover object-top" />
              </div>
              <figcaption className="flex items-baseline justify-between gap-3 bg-gold p-4 text-navy">
                <span className="font-display font-bold">{chair.name}</span>
                <span className="text-sm font-semibold">{chair.title}</span>
              </figcaption>
            </figure>
          </Enter>
        </div>
      </section>

      <section className="wrap py-16 lg:py-28">
        <Reveal className="grid gap-5 border-b border-rule pb-12 lg:grid-cols-12">
          <h2 className="eyebrow text-gold-deep lg:col-span-3">From the Chairman&apos;s record</h2>
          <p className="display-sm text-navy lg:col-span-9">{chair.bio[0]}</p>
        </Reveal>
        <div className="mt-14">
          <LeaderGrid people={BOARD.slice(0, 1).concat(rest)} />
        </div>
        <Link href="/management" className="mt-16 flex w-fit min-h-11 items-center gap-2 font-display text-lg font-bold text-navy underline-offset-4 hover:underline">
          Meet the Management Team <ArrowRight className="size-5" />
        </Link>
      </section>
    </>
  );
}
