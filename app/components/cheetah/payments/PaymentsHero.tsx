import { SCREENS } from "@/data/cheetah/screens";
import { Enter } from "../../shared/Enter";
import { IPhone } from "../IPhone";
import { StoreButtons } from "../StoreButtons";
import { PaymentOrbit } from "./PaymentOrbit";
import { ScanToPay } from "./ScanToPay";
import { SnapToPay } from "./SnapToPay";

/** Same family as the Padi hero: centred story, a ring, and the real app at its heart. */
export function PaymentsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-stride-night text-white">
      <div className="wrap pt-28 text-center lg:pt-32">
        <Enter y={14}>
          <p className="eyebrow text-sun">Cheetah payments</p>
        </Enter>
        <Enter delay={0.05}>
          <h1 className="display-hero mx-auto mt-4 max-w-[18ch]">Scan it. Snap it. Send it.</h1>
          <p className="lede mx-auto mt-5 max-w-2xl text-white/85">
            Pay a merchant from their QR code, photograph written payment details instead of typing them, or send money and pay bills in a few taps. Nothing leaves your account until you confirm.
          </p>
        </Enter>
        <Enter delay={0.12}>
          <StoreButtons className="mt-6 justify-center" />
        </Enter>
      </div>

      <div className="relative mx-auto mt-8 h-[25rem] w-full max-w-5xl sm:mt-10 sm:h-[31rem] lg:h-[34rem]">
        <Enter delay={0.1} y={40} className="absolute top-12 left-1/2 w-[34rem] -translate-x-1/2 sm:top-8 sm:w-[48rem] lg:w-[56rem]">
          <PaymentOrbit />
        </Enter>
        <Enter delay={0.04} y={70} className="absolute top-24 left-1/2 w-[46%] max-w-[17rem] -translate-x-1/2 sm:top-28">
          <IPhone {...SCREENS.payments} priority sizes="(max-width: 640px) 46vw, 272px" />
        </Enter>
        <Enter delay={0.24} y={40} className="absolute top-[46%] left-[2%] w-[29%] max-w-[12.5rem] sm:left-[9%] lg:left-[15%]">
          <div className="-rotate-[8deg] animate-float">
            <ScanToPay />
          </div>
        </Enter>
        <Enter delay={0.32} y={40} className="absolute top-[54%] right-[2%] w-[29%] max-w-[12.5rem] sm:right-[9%] lg:right-[15%]">
          <div className="rotate-[7deg] animate-float [animation-delay:-3s]">
            <SnapToPay />
          </div>
        </Enter>
      </div>
    </section>
  );
}
