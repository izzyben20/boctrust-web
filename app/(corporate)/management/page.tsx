import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeaderGrid } from "@/app/components/corporate/LeaderGrid";
import { Enter } from "@/app/components/shared/Enter";
import { ArrowRight } from "@/app/components/ui/icons";
import { MANAGEMENT } from "@/data/corporate/people";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Management Team",
  description:
    "Meet the executive team leading Boctrust Microfinance Bank: experienced professionals committed to operational excellence, sound risk management and customer-centred growth.",
  path: "/management",
});

export default function ManagementPage() {
  const strip = MANAGEMENT.slice(0, 7);
  return (
    <>
      {/* A horizon of portraits rising from the headline */}
      <section className="overflow-hidden bg-ivory">
        <div className="wrap pt-14 lg:pt-20">
          <Enter>
            <p className="eyebrow text-gold-deep">Management Team</p>
            <h1 className="display-page mt-4 max-w-5xl text-navy">The people running the bank.</h1>
          </Enter>
          <Enter delay={0.1}>
            <p className="lede mt-6 max-w-3xl text-ink-soft">
              Meet the executive team leading Boctrust Microfinance Bank: experienced professionals committed to operational excellence, sound risk management and customer-centred growth.
            </p>
          </Enter>
        </div>
        <Enter delay={0.2} className="mt-10 flex items-end justify-center gap-2 px-2 sm:gap-3 lg:mt-14" y={50}>
          {strip.map((person, index) => {
            const h = [62, 74, 86, 100, 86, 74, 62][index];
            return (
              <div key={person.slug} className={`relative aspect-[3/5] w-[18vw] max-w-52 overflow-hidden rounded-t-full bg-navy-soft sm:w-[13vw] ${index === 0 || index === 6 ? "hidden sm:block" : ""}`} style={{ height: `auto`, transform: `scale(${h / 100})`, transformOrigin: "bottom" }}>
                <Image src={person.photo} alt="" fill sizes="20vw" className="object-cover object-top" />
              </div>
            );
          })}
        </Enter>
      </section>
      <section className="wrap py-16 lg:py-28">
        <LeaderGrid people={MANAGEMENT} columns={4} />
        <Link href="/board" className="mt-16 flex w-fit min-h-11 items-center gap-2 font-display text-lg font-bold text-navy underline-offset-4 hover:underline">
          Meet the Board of Directors <ArrowRight className="size-5" />
        </Link>
      </section>
    </>
  );
}
