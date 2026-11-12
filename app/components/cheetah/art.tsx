import type { SVGProps } from "react";
import type { BillCategory } from "@/data/cheetah/payments";

type P = SVGProps<SVGSVGElement>;

const line = (p: P) => ({
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

/** The sweeping arc from Cheetah's store artwork, set behind the app as a stage. */
export function StageArc({ className, stroke = "var(--color-stride-night)", width = 74 }: { className?: string; stroke?: string; width?: number }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" aria-hidden className={className}>
      <circle cx="300" cy="300" r={300 - width / 2} stroke={stroke} strokeWidth={width} />
    </svg>
  );
}

export const StepDownload = (p: P) => (
  <svg {...line(p)}>
    <rect x="14" y="4" width="20" height="40" rx="5" />
    <path d="M24 13v14M18 21.5l6 6 6-6M20 37h8" />
  </svg>
);

export const StepVerify = (p: P) => (
  <svg {...line(p)}>
    <rect x="4" y="10" width="40" height="28" rx="5" />
    <circle cx="16" cy="21" r="4" />
    <path d="M9 32c1-4 3.700-6 7-6s6 2 7 6M29 20h9M29 27h5" />
  </svg>
);

export const StepChoose = (p: P) => (
  <svg {...line(p)}>
    <circle cx="24" cy="24" r="19" />
    <circle cx="24" cy="24" r="11" />
    <circle cx="24" cy="24" r="3" fill="currentColor" />
    <path d="M24 24 38 10M33 9h6v6" />
  </svg>
);

export const StepGrow = (p: P) => (
  <svg {...line(p)}>
    <path d="M7 41h34M12 41V30M24 41V22M36 41V13" />
    <path d="m8 21 11-9 7 5 13-12M32 5h7v7" />
  </svg>
);

const BILL_ICONS: Record<BillCategory, string> = {
  Airtime: "M15 6h6l3 9-4 3c2 4 5 7 9 9l3-4 9 3v6c0 3-2 5-5 5C21 37 11 27 10 11c0-3 2-5 5-5Z",
  Data: "M6 19c11-10 25-10 36 0M12 26c7-7 17-7 24 0M18 33c3.500-3.500 8.500-3.500 12 0M24 39v.1",
  Water: "M24 5s14 15 14 25a14 14 0 0 1-28 0C10 20 24 5 24 5ZM17 31a7 7 0 0 0 6 6",
  Electricity: "M27 4 11 27h11l-2 17 17-24H25l2-16Z",
  TV: "M6 15h36v24H6zM17 5l7 10 7-10M16 44h16",
  Education: "M4 18 24 8l20 10-20 10L4 18ZM12 23v11c6 5 18 5 24 0V23M44 18v13",
  Internet: "M24 5a19 19 0 1 0 0 38 19 19 0 0 0 0-38ZM5 24h38M24 5c6 5 8 12 8 19s-2 14-8 19c-6-5-8-12-8-19s2-14 8-19Z",
};

export function BillIcon({ name, ...p }: P & { name: BillCategory }) {
  return (
    <svg {...line(p)}>
      <path d={BILL_ICONS[name]} />
    </svg>
  );
}
