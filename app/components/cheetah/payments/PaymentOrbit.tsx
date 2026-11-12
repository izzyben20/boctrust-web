import type { ReactNode } from "react";
import { BillIcon } from "../art";

const f = (n: number) => n.toFixed(2);

const SendIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M43 5 5 20l15 6 6 15L43 5ZM20 26 43 5" />
  </svg>
);

const STOPS: { label: string; icon: ReactNode; tone: string }[] = [
  { label: "Transfers", icon: <SendIcon className="size-1/2" />, tone: "bg-sun text-stride-night" },
  { label: "Airtime", icon: <BillIcon name="Airtime" className="size-1/2" />, tone: "bg-white text-stride-night" },
  { label: "Data", icon: <BillIcon name="Data" className="size-1/2" />, tone: "bg-stride text-white" },
  { label: "Electricity", icon: <BillIcon name="Electricity" className="size-1/2" />, tone: "bg-white text-stride-night" },
  { label: "TV", icon: <BillIcon name="TV" className="size-1/2" />, tone: "bg-stride text-white" },
  { label: "Internet", icon: <BillIcon name="Internet" className="size-1/2" />, tone: "bg-white text-stride-night" },
  { label: "Education", icon: <BillIcon name="Education" className="size-1/2" />, tone: "bg-sun text-stride-night" },
];

/** The payment circuit: services sit on the upper arc while a pulse travels the ring, the way money moves. */
export function PaymentOrbit({ className = "" }: { className?: string }) {
  const start = 213;
  const end = 327;
  return (
    <div aria-hidden className={`relative aspect-square ${className}`}>
      <svg viewBox="0 0 600 600" className="absolute inset-0 size-full" fill="none">
        <circle cx="300" cy="300" r="276" stroke="var(--color-sun)" strokeOpacity=".5" strokeWidth="2" strokeDasharray="3 12" strokeLinecap="round" />
        <circle cx="300" cy="300" r="226" stroke="#fff" strokeOpacity=".07" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="176" stroke="#fff" strokeOpacity=".05" strokeWidth="1.5" />
        <g className="origin-center animate-orbit [animation-duration:20s]" style={{ transformBox: "view-box" }}>
          <path d="M300 24A276 276 0 0 1 495 105" stroke="var(--color-sun)" strokeWidth="9" strokeLinecap="round" />
          <circle cx="495" cy="105" r="12" fill="var(--color-sun)" />
        </g>
      </svg>
      {STOPS.map((stop, i) => {
        const a = ((start + ((end - start) * i) / (STOPS.length - 1)) * Math.PI) / 180;
        return (
          <span key={stop.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: `${f(50 + 46 * Math.cos(a))}%`, top: `${f(50 + 46 * Math.sin(a))}%` }}>
            <span className={`grid size-10 place-items-center rounded-full ring-4 ring-stride-night sm:size-13 ${stop.tone}`}>{stop.icon}</span>
            <span className="hidden text-xs font-bold whitespace-nowrap text-white/85 md:block">{stop.label}</span>
          </span>
        );
      })}
    </div>
  );
}
