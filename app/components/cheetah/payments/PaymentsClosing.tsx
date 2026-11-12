import Image from "next/image";
import Link from "next/link";
import { APP_CROPS } from "@/data/cheetah/screens";
import { CheetahGlyph } from "../../brand/CheetahMark";
import { Reveal } from "../../shared/Reveal";
import { ArrowRight } from "../../ui/icons";
import { ScanToPay } from "./ScanToPay";
import { SnapToPay } from "./SnapToPay";

/** The story closes where the hero opened: scan and snap on either side, the receipt as the result. */
export function PaymentsClosing() {
  return (
    <section aria-labelledby="closing-heading" className="relative isolate overflow-hidden bg-stride-night text-white">
      <CheetahGlyph className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[80rem] max-w-none -translate-x-1/2 -translate-y-1/2 text-white/[0.04]" />
      <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-[1fr_1.3fr_1fr] lg:py-24">
        <Reveal y={30} className="mx-auto w-48 -rotate-[8deg] max-lg:hidden" aria-hidden>
          <ScanToPay />
        </Reveal>
        <Reveal className="text-center">
          <Image src={APP_CROPS.receipt.src} width={APP_CROPS.receipt.width} height={APP_CROPS.receipt.height} alt="" aria-hidden sizes="144px" className="mx-auto h-auto w-32 rotate-[4deg] drop-shadow-[0_24px_30px_rgb(0_0_0/0.5)] sm:w-36" />
          <h2 id="closing-heading" className="display-md mt-8">Your next payment, a scan away.</h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">Get the app, choose your account tier, and pay the way that suits you.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/cheetah/get-app" className="inline-flex min-h-13 items-center gap-2 rounded-full bg-sun px-6 font-display font-bold text-stride-night transition-colors hover:bg-white">
              Get the app <ArrowRight className="size-5" />
            </Link>
            <Link href="/cheetah/faqs" className="inline-flex min-h-13 items-center rounded-full px-6 font-display font-bold ring-1 ring-white/40 transition-colors hover:bg-white/10">
              Read the FAQs
            </Link>
          </div>
        </Reveal>
        <Reveal y={30} delay={0.1} className="mx-auto w-48 rotate-[7deg] max-lg:hidden" aria-hidden>
          <SnapToPay />
        </Reveal>
      </div>
    </section>
  );
}
