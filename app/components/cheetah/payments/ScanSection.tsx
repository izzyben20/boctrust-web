import { SCREENS } from "@/data/cheetah/screens";
import { Reveal } from "../../shared/Reveal";
import { IPhone } from "../IPhone";
import { ScanToPay } from "./ScanToPay";

const STEPS = [
  { title: "Open Scan to pay", body: "It sits at the top of your Payments screen." },
  { title: "Point at the merchant's code", body: "Hold the QR code inside the frame." },
  { title: "Check, then pay", body: "Review the payment and confirm it yourself." },
];

/** The camera's view is the composition: a large merchant code, the real Payments screen beside it, one line joining them. */
export function ScanSection() {
  return (
    <section id="scan" aria-labelledby="scan-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-stride-mist">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="relative mx-auto h-[27rem] w-full max-w-[32rem] sm:h-[33rem] lg:col-span-7 lg:max-w-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 size-full" fill="none">
            <path d="M74 36C60 30 54 42 46 44" stroke="var(--color-stride-deep)" strokeWidth="1.5" strokeDasharray="1.5 3" strokeLinecap="round" className="animate-flow" vectorEffect="non-scaling-stroke" />
          </svg>
          <span aria-hidden className="absolute top-[8%] left-[4%] size-[60%] max-h-[24rem] max-w-[24rem] rounded-[3rem] border-2 border-dashed border-stride/40" />
          <Reveal y={40} className="absolute top-[12%] left-[8%] w-[54%] max-w-[20rem]">
            <ScanToPay className="-rotate-[5deg]" />
          </Reveal>
          <Reveal delay={0.12} y={60} className="absolute top-0 right-[2%] w-[42%] max-w-[15rem] sm:right-[6%]">
            <IPhone {...SCREENS.payments} sizes="240px" className="rotate-[5deg]">
              <span aria-hidden className="absolute rounded-xl ring-[3px] ring-sun" style={{ left: "3.5%", top: "22%", width: "93%", height: "9.5%" }} />
            </IPhone>
          </Reveal>
          <Reveal delay={0.24} y={20} className="absolute bottom-[4%] left-[14%] rounded-full bg-stride-night px-4 py-2 font-display text-sm font-bold text-white shadow-lg sm:bottom-[8%]">
            <span aria-hidden className="mr-2 inline-block size-2 animate-pulse rounded-full bg-sun align-middle" />
            Reading the code
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-stride-deep">Scan to pay</p>
            <h2 id="scan-heading" className="display-md mt-3">Pay at the counter with a glance.</h2>
            <p className="mt-4 max-w-md text-stride-night/80">When a merchant shows a Cheetah-compatible QR code, scan it instead of typing their details. You still see who you&apos;re paying before anything moves.</p>
          </Reveal>
          <ol className="mt-8">
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.title} delay={0.06 + index * 0.08} y={14} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-6 last:pb-0">
                {index < STEPS.length - 1 && <span aria-hidden className="absolute top-10 bottom-1 left-[1.2rem] w-px bg-stride-night/20" />}
                <span className="tabular grid size-10 place-items-center rounded-full bg-stride-night font-display text-sm font-bold text-sun">{index + 1}</span>
                <span className="pt-1.5">
                  <span className="block font-display text-lg font-bold tracking-tight">{step.title}</span>
                  <span className="block text-stride-night/75">{step.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
