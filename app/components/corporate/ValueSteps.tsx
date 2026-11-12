import type { ReactNode } from "react";
import { COMPANY } from "@/data/corporate/company";
import { Reveal } from "../shared/Reveal";

const Glyph = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 56 56" className="size-16 text-navy" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
    {children}
  </svg>
);

/** A single line drawing for each value: nothing filled except one small gold accent. */
const GLYPHS: Record<string, ReactNode> = {
  // A new idea: one point opening out along four axes.
  Innovation: (
    <Glyph>
      <path d="M28 4c1.500 13.500 8.500 22 24 24-15.500 2-22.500 10.500-24 24-1.500-13.500-8.500-22-24-24 15.500-2 22.500-10.500 24-24Z" />
      <circle cx="28" cy="28" r="3" fill="var(--color-gold)" stroke="none" />
    </Glyph>
  ),
  // Two equal circles, each making room for the other.
  Respect: (
    <Glyph>
      <circle cx="20" cy="28" r="15.500" />
      <circle cx="36" cy="28" r="15.500" />
      <path d="M28 14.700c-3 3.300-4.800 8-4.800 13.300s1.800 10 4.800 13.300c3-3.300 4.800-8 4.800-13.300s-1.800-10-4.800-13.300Z" fill="var(--color-gold)" stroke="none" />
    </Glyph>
  ),
  // Attention held around a person: arcs gathered around a single point.
  "Customer Service": (
    <Glyph>
      <path d="M8 40a24 24 0 1 1 40 0" />
      <path d="M16 35.500a14.500 14.500 0 1 1 24 0" />
      <circle cx="28" cy="28" r="4.500" fill="var(--color-gold)" stroke="none" />
      <path d="M4 48h48" />
    </Glyph>
  ),
  // A plumb line: true whichever way you look at it.
  Integrity: (
    <Glyph>
      <path d="M8 6h40" />
      <path d="M28 6v32" />
      <path d="M28 38l7 8-7 6-7-6 7-8Z" fill="var(--color-gold)" stroke="none" />
      <path d="M12 52h9M35 52h9" />
    </Glyph>
  ),
};

const RISE = ["lg:pt-72", "lg:pt-48", "lg:pt-24", "lg:pt-0"];

/**
 * Four columns climbing left to right on fine rules, like an architect's elevation. The title sits
 * in the open space the first steps leave behind.
 */
export function ValueSteps() {
  return (
    <section aria-labelledby="values-heading" className="wrap relative py-16 lg:py-28">
      <Reveal className="lg:absolute lg:top-28 lg:left-[clamp(1.1rem,4vw,3.5rem)] lg:z-10 lg:w-[38%] lg:pl-6">
        <p className="eyebrow text-gold-deep">What guides us</p>
        <h2 id="values-heading" className="display-md mt-3 text-navy">Our values</h2>
      </Reveal>
      <ol className="mt-10 grid grid-cols-1 border-b border-navy sm:grid-cols-2 lg:mt-0 lg:grid-cols-4">
        {COMPANY.values.map((value, index) => (
          <Reveal as="li" key={value.title} delay={index * 0.08} className={`relative border-t border-rule py-8 sm:border-t-0 sm:border-l sm:pr-4 sm:pl-6 lg:pr-6 lg:pb-10 ${RISE[index]}`}>
            {index > 0 && <span aria-hidden className="absolute top-0 -left-px hidden h-px w-8 bg-navy lg:block" />}
            <span className="block">{GLYPHS[value.title]}</span>
            <h3 className="mt-6 font-display text-[1.75rem] leading-tight font-bold tracking-tight text-navy">{value.title}</h3>
            <p className="mt-3 max-w-xs text-ink-soft">{value.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
