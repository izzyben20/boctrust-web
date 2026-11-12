import Link from "next/link";
import type { ReactNode } from "react";
import { SCREENS } from "@/data/cheetah/screens";
import { Reveal } from "../shared/Reveal";
import { ArrowRight, CheckIcon } from "../ui/icons";
import { BillIcon, StageArc } from "./art";
import { IPhone } from "./IPhone";
import { ScanToPay } from "./payments/ScanToPay";
import { SnapToPay } from "./payments/SnapToPay";

const WAYS: { title: string; body: string; icon: ReactNode }[] = [
  { title: "Scan to pay", body: "A merchant's QR code", icon: <QrGlyph /> },
  { title: "Snap to pay", body: "Photograph the details, review, confirm", icon: <CameraGlyph /> },
  { title: "Send money", body: "Any Nigerian bank or BOCTrust user", icon: <SendGlyph /> },
  { title: "Bills, airtime, data", body: "Power, TV, water, education and more", icon: <BillIcon name="Electricity" className="size-5" /> },
];

function SendGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
      <path d="M21 3 3 10.5l7.5 3 3 7.5L21 3ZM10.5 13.5 21 3" />
    </svg>
  );
}

function QrGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="size-5">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v7h-4M14 18v3" />
    </svg>
  );
}

function CameraGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden className="size-5">
      <path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

/**
 * A preview of the payments story, set asymmetrically. One upright phone on the payments screen
 * leads, offset right inside the same heavy ring as the Cheetah hero. Scan to Pay and Snap to Pay
 * step down the left edge towards it, and nothing competes with the screen.
 */
export function PaymentsBand() {
  return (
    <section aria-labelledby="payments-heading" className="relative isolate overflow-hidden bg-stride-night text-white">
      <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-24">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-sun">Payments</p>
            <h2 id="payments-heading" className="display-md mt-3">Move money without slowing down.</h2>
            <p className="mt-4 max-w-md text-white/80">Point, snap or tap. However you pay, you see the details and confirm before any money moves.</p>
          </Reveal>
          <ul className="mt-8 border-t border-white/20">
            {WAYS.map((way, i) => (
              <Reveal as="li" key={way.title} delay={0.05 + i * 0.05} y={12} className="flex items-center gap-4 border-b border-white/20 py-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sun">{way.icon}</span>
                <span className="min-w-0">
                  <span className="block font-display font-bold tracking-tight">{way.title}</span>
                  <span className="block text-sm text-white/75">{way.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-8">
            <Link href="/cheetah/payments" className="inline-flex min-h-13 items-center gap-2 rounded-full bg-sun px-6 font-display font-bold text-stride-night transition-colors hover:bg-white">
              See how payments work <ArrowRight className="size-5" />
            </Link>
          </Reveal>
        </div>

        <div className="relative mx-auto h-124 w-full max-w-136 sm:h-148 lg:col-span-7 lg:max-w-none">
          {/* The stage, offset right behind the phone: the hero's heavy ring inside a thin dotted orbit. */}
          <div aria-hidden className="absolute top-1/2 right-[-14%] aspect-square w-[92%] -translate-y-1/2 sm:right-[-6%] sm:w-[84%]">
            <StageArc stroke="var(--color-stride-deep)" width={56} className="absolute inset-[10%] size-[80%]" />
            <svg viewBox="0 0 600 600" fill="none" className="absolute inset-0 size-full">
              <circle cx="300" cy="300" r="296" stroke="var(--color-sun)" strokeWidth="2.5" strokeDasharray="2 12" strokeLinecap="round" className="animate-flow" />
            </svg>
          </div>

          {/* The one screen that matters, upright and at full size. */}
          <Reveal y={40} className="absolute top-[3%] right-[2%] z-10 w-[50%] max-w-62 sm:right-[16%] lg:right-[18%]">
            <IPhone {...SCREENS.payments} sizes="(max-width: 640px) 50vw, 248px" />
          </Reveal>

          {/* Two ways in, stepping down the left edge towards the screen. */}
          <Reveal delay={0.14} y={24} className="absolute top-[6%] left-0 z-20 w-[40%] max-w-50 sm:left-[4%] sm:w-[36%]">
            <div className="-rotate-6 animate-float">
              <ScanToPay />
            </div>
          </Reveal>

          <Reveal delay={0.22} y={24} className="absolute bottom-[14%] left-[3%] z-20 w-[40%] max-w-50 sm:bottom-[12%] sm:left-[14%] sm:w-[36%]">
            <div className="rotate-[4deg] animate-float [animation-delay:-3.5s]">
              <SnapToPay steps={false} className="sm:hidden" />
              <SnapToPay className="hidden sm:block" />
            </div>
          </Reveal>

          <Reveal delay={0.3} y={12} className="absolute right-[2%] bottom-[3%] z-20 hidden sm:block lg:right-[8%]">
            <p className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-display text-sm font-bold text-stride-night shadow-[0_18px_40px_-16px_rgb(0_0_0/0.6)]">
              <span className="grid size-6 place-items-center rounded-full bg-sun">
                <CheckIcon className="size-3.5" />
              </span>
              You confirm every payment
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
