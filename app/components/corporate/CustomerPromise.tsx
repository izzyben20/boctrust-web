import type { CSSProperties, ReactNode } from "react";
import { COMPANY } from "@/data/corporate/company";
import { Reveal } from "../shared/Reveal";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 56 56" className="size-14 lg:size-16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {children}
  </svg>
);

const ACCENT = "var(--accent)";

/** Custom line icons with one accent per step, in the same family as the Our Values glyphs. */
const ICONS: Record<string, ReactNode> = {
  // A seal of approval arriving at speed.
  "Faster approvals": (
    <Icon>
      <path d="M3 19h11M1 28h9M3 37h11" />
      <circle cx="34" cy="28" r="18" />
      <path d="M26 28.500l5.500 5.500 10-11.500" stroke={ACCENT} strokeWidth="3" />
    </Icon>
  ),
  // A phone inside the turn of a full day.
  "24/7 digital banking": (
    <Icon>
      <path d="M28 4a24 24 0 0 1 0 48" stroke={ACCENT} strokeWidth="3" />
      <path d="M28 52A24 24 0 0 1 28 4" strokeDasharray="1 5" />
      <rect x="20" y="14" width="16" height="28" rx="3.500" />
      <path d="M26 37h4" />
    </Icon>
  ),
  // A percentage, stepping down.
  "Lower interest rates": (
    <Icon>
      <path d="M5 30L23 8" />
      <circle cx="7" cy="11" r="4" />
      <circle cx="21" cy="27" r="4" />
      <path d="M28 18h8v9h8v9h8" stroke={ACCENT} strokeWidth="3" />
      <path d="M47 32l5 4-5 4" stroke={ACCENT} strokeWidth="3" />
      <path d="M4 50h48" />
    </Icon>
  ),
  // A ribbon that bends to fit the calendar beneath it.
  "Flexible repayment terms": (
    <Icon>
      <path d="M16 12C8 12 4 17 4 21s4 9 12 9c11 0 13-18 24-18 8 0 12 5 12 9s-4 9-12 9c-11 0-13-18-24-18Z" />
      <circle cx="28" cy="21" r="4" fill={ACCENT} stroke="none" />
      <path d="M8 42h40M8 42v8M18 42v5M28 42v8M38 42v5M48 42v8" />
    </Icon>
  ),
  // Every line of the ledger, checked off the same way.
  "Reliable and consistent processing": (
    <Icon>
      <rect x="5" y="6" width="46" height="11" rx="2.500" />
      <rect x="5" y="22.500" width="46" height="11" rx="2.500" />
      <rect x="5" y="39" width="46" height="11" rx="2.500" />
      <path d="M10 11.500l2.500 2.500 4-5M10 28l2.500 2.500 4-5M10 44.500l2.500 2.500 4-5" stroke={ACCENT} strokeWidth="2.500" />
      <path d="M23 11.500h22M23 28h22M23 44.500h22" />
    </Icon>
  ),
  // A shield with a keyhole: closed to everyone but you.
  "Secure and private transactions": (
    <Icon>
      <path d="M28 4l20 7.500v14.500c0 12.500-8.500 21-20 26C16.500 47 8 38.500 8 26V11.500Z" />
      <circle cx="28" cy="23" r="5.500" fill={ACCENT} stroke="none" />
      <path d="M25.200 25l-2.700 13h11l-2.700-13Z" fill={ACCENT} stroke="none" />
    </Icon>
  ),
};

/* Colour deepens as the staircase climbs. Each step sets its own accent so icons stay legible. */
const STEPS: { skin: string; accent: string; number: string; height: string; width: string }[] = [
  { skin: "bg-paper text-navy", accent: "var(--color-gold-deep)", number: "text-gold-deep", height: "lg:h-[13rem]", width: "max-lg:w-[76%]" },
  { skin: "bg-gold-pale text-navy", accent: "var(--color-gold-deep)", number: "text-gold-deep", height: "lg:h-[16.5rem]", width: "max-lg:w-[81%]" },
  { skin: "bg-gold text-navy", accent: "var(--color-navy-deep)", number: "text-navy", height: "lg:h-[20rem]", width: "max-lg:w-[86%]" },
  { skin: "bg-navy-soft text-white", accent: "var(--color-gold)", number: "text-gold", height: "lg:h-[23.5rem]", width: "max-lg:w-[90%]" },
  { skin: "bg-navy text-white", accent: "var(--color-gold)", number: "text-gold", height: "lg:h-[27rem]", width: "max-lg:w-[95%]" },
  { skin: "bg-navy-deep text-white", accent: "var(--color-gold)", number: "text-gold", height: "lg:h-[30.5rem]", width: "max-lg:w-full" },
];

/** One solid staircase, climbing to the right. On phones the steps widen instead of rising. */
export function CustomerPromise() {
  return (
    <section aria-labelledby="promise-heading" className="bg-ivory">
      <div className="wrap relative pt-16 pb-20 lg:pt-44 lg:pb-32">
        <Reveal className="lg:absolute lg:top-24 lg:left-[clamp(1.1rem,4vw,3.5rem)] lg:z-10 lg:w-[calc((100%-2*clamp(1.1rem,4vw,3.5rem))/3)]">
          <p className="eyebrow text-gold-deep">Our customer promise</p>
          <h2 id="promise-heading" className="display-md mt-3 text-navy">Service, service, and service.</h2>
          <p className="mt-4 max-w-sm text-ink-soft">Dedicated customer service, on and offline.</p>
        </Reveal>
        <ol className="mt-10 flex flex-col gap-1.5 lg:mt-0 lg:grid lg:grid-cols-6 lg:items-end lg:gap-0">
          {COMPANY.promise.map((promise, index) => {
            const step = STEPS[index];
            return (
              <Reveal
                as="li"
                key={promise}
                delay={index * 0.06}
                y={36}
                className={`flex gap-4 p-5 max-lg:items-center lg:flex-col lg:gap-5 lg:p-6 ${step.skin} ${step.height} ${step.width}`}
              >
                <span className="shrink-0" style={{ "--accent": step.accent } as CSSProperties}>
                  {ICONS[promise]}
                </span>
                <span>
                  <span className={`tabular block text-xs font-bold ${step.number}`}>0{index + 1}</span>
                  <span className="mt-1 block font-display text-lg leading-snug font-bold tracking-tight xl:text-xl">{promise}</span>
                </span>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
