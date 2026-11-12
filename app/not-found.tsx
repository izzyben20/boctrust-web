import type { Metadata } from "next";
import Link from "next/link";
import { BoctrustLogo } from "./components/brand/BoctrustLogo";
import { Mullion } from "./components/corporate/Mullion";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-dvh flex-col justify-between overflow-hidden bg-navy p-6 text-white sm:p-12">
      <Mullion className="pointer-events-none absolute right-[6%] bottom-0 -z-10 h-[70%] text-white/30 max-sm:hidden" />
      <Link href="/" aria-label="Boctrust home" className="w-fit">
        <BoctrustLogo tone="reverse" className="h-16 w-auto" decorative />
      </Link>
      <div>
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="display-hero mt-3">This entry isn&apos;t in the ledger.</h1>
        <p className="lede mt-5 max-w-xl text-white/80">The page may have moved. Let&apos;s get you somewhere useful.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="flex min-h-14 items-center rounded-full bg-gold px-7 font-display font-bold text-navy">Boctrust home</Link>
          <Link href="/cheetah" className="flex min-h-14 items-center rounded-full border border-white/40 px-7 font-display font-bold">Visit Cheetah</Link>
        </div>
      </div>
    </main>
  );
}
