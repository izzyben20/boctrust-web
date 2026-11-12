import type { CSSProperties, JSX } from "react";
import type { CheetahProductSlug } from "@/data/cheetah/products";
import { SCREENS } from "@/data/cheetah/screens";
import { RATE_GUIDE } from "@/lib/calculator/fixed-deposit";
import { IPhone } from "../../cheetah/IPhone";
import PadiSVG from "../../svg/PadiSVG";
import SmartSaveSVG from "../../svg/SmartSaveSVG";

/**
 * One original composition per plan, each drawn from what the plan actually does. Every drawing
 * shares a 400 x 400 stage and is `slice`-fitted, so it fills a tall column on wide cards and a
 * short band on narrow ones; focal elements sit inside the region both crops keep.
 * Hover motion is CSS transforms on the card's `group`; reduced motion turns it off globally.
 */

const f = (n: number) => Number(n.toFixed(1));
const FILL = "absolute inset-0 size-full";
/** Rotate an SVG group about a point on the 400 x 400 stage. */
const pivot = (x: number, y: number): CSSProperties => ({ transformBox: "view-box", transformOrigin: `${x}px ${y}px` });

/**
 * Boc Fixed Savings: the published rate guide as a staircase. One column per term band, each as
 * tall as that band's best published rate, climbing to 18% at 360 days and above. On hover the
 * columns rise in sequence.
 */
function FixedStaircase() {
  const best = RATE_GUIDE.tenorBands.map((band) => Math.max(...band.rates.map((r) => r ?? 0)));
  const terms = ["30d", "60d", "90d", "180d", "360d+"];
  const w = 44;
  const depth = { x: 14, y: -10 };
  // Kept inside x 66–340 and below y 150, the region every crop of the stage keeps.
  const cols = best.map((rate, i) => ({ rate, x: 66 + i * 54, top: 400 - (20 + rate * 10) }));
  const last = cols[cols.length - 1];

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMax slice" className={FILL} aria-hidden>
      <defs>
        <linearGradient id="fx-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-fixed)" />
          <stop offset="1" stopColor="var(--color-fixed-ink)" />
        </linearGradient>
      </defs>
      {[160, 220, 280, 340].map((y) => (
        <path key={y} d={`M0 ${y}H400`} stroke="white" strokeOpacity=".06" strokeDasharray="2 6" />
      ))}
      {cols.map(({ x, top }, i) => (
        <g
          key={x}
          className="transition-transform duration-700 ease-out-soft group-hover:-translate-y-3"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <path d={`M${x + w} ${top}l${depth.x} ${depth.y}V430h-${depth.x}Z`} fill="#2a2178" />
          <rect x={x} y={top} width={w} height={430 - top} fill="url(#fx-front)" />
          <path d={`M${x} ${top}l${depth.x} ${depth.y}h${w}l-${depth.x} ${-depth.y}Z`} fill="#cdc4ff" />
          <text x={x + w / 2} y={top + 24} textAnchor="middle" className="fill-white/75 font-display text-[12px] font-bold">
            {terms[i]}
          </text>
          {i === cols.length - 1 && (
            <>
              <circle cx={x + w / 2 + depth.x / 2} cy={top - 22} r="5" className="fill-gold" />
              <text x={x + w / 2 + depth.x / 2} y={top - 36} textAnchor="middle" className="fill-white font-display text-[26px] font-bold tracking-tight">
                {last.rate}%
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/**
 * Boc SmartSave: a goal target. Three rings, one per timeline (3, 6 and 12 months), each divided
 * into its months and filling towards the goal at the centre. On hover, every ring moves closer.
 */
function GoalRings() {
  const c = 200;
  const rings = [
    { months: 12, r: 138, p: 0.62, color: "var(--color-smart-ink)" },
    { months: 6, r: 100, p: 0.76, color: "var(--color-smart)" },
    { months: 3, r: 62, p: 0.88, color: "var(--color-smart-ink)" },
  ];
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={FILL} aria-hidden>
      {rings.map(({ months, r, p, color }, i) => {
        const len = 2 * Math.PI * r;
        return (
          <g key={months}>
            <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-smart)" strokeOpacity=".16" strokeWidth="20" />
            <g className="transition-[rotate] duration-700 ease-out-soft group-hover:rotate-16" style={{ ...pivot(c, c), transitionDelay: `${i * 70}ms` }}>
              <circle
                cx={c}
                cy={c}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${f(len * p)} ${f(len)}`}
                transform={`rotate(-90 ${c} ${c})`}
              />
            </g>
            {Array.from({ length: months }, (_, m) => {
              const a = (m / months) * Math.PI * 2 - Math.PI / 2;
              return (
                <circle key={m} cx={f(c + r * Math.cos(a))} cy={f(c + r * Math.sin(a))} r="2" fill="white" fillOpacity=".7" />
              );
            })}
            <text x={c - r} y={c + 4} textAnchor="middle" className="fill-smart-ink font-display text-[11px] font-bold">
              {months}m
            </text>
          </g>
        );
      })}
      <circle cx={c} cy={c} r="36" fill="white" />
      <SmartSaveSVG x={c - 17} y={c - 17} width="34" height="34" />
    </svg>
  );
}

/**
 * Boc Flex Savings: money that moves. Ribbons flow across the card, in and out, and the real Flex
 * screen rises out of them. On hover the phone straightens and lifts as the ribbons drift.
 */
function FlowRibbons() {
  return (
    <>
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={FILL} aria-hidden fill="none" strokeLinecap="round">
        <g className="transition-transform duration-1000 ease-out-soft group-hover:-translate-x-4">
          <path d="M-40 200C70 150 170 270 260 210S380 140 440 180" stroke="#a4e8ad" strokeWidth="10" />
          <path d="M-40 255C60 175 140 335 240 255S380 175 440 235" stroke="var(--color-flex)" strokeWidth="34" />
          <path d="M-40 305C80 245 160 365 260 295S400 235 440 285" stroke="var(--color-flex-ink)" strokeWidth="18" />
        </g>
      </svg>
      <div className="absolute top-[22%] left-1/2 w-[48%] max-w-44 -translate-x-1/2 -rotate-6 transition-[rotate,translate] duration-700 ease-out-soft group-hover:-translate-y-2 group-hover:-rotate-2">
        <IPhone {...SCREENS.flex} alt="" sizes="176px" />
      </div>
    </>
  );
}

/**
 * Boc Padi: the Ajo circle. Members, numbered in payout order, sit around the shared pool; the
 * white arc is the payout passing to whoever is next. On hover it moves on to the next member.
 */
function AjoCircle() {
  const c = 200;
  const r = 110;
  const members = 8;
  const palette = ["#f79256", "#fbd1a2", "#e5c367", "#fff5ef"];
  const at = (i: number, radius = r) => {
    const a = (i / members) * Math.PI * 2 - Math.PI / 2;
    return [f(c + radius * Math.cos(a)), f(c + radius * Math.sin(a))] as const;
  };
  const [sx, sy] = at(0, r + 36);
  const [ex, ey] = at(1, r + 36);

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={FILL} aria-hidden fill="none">
      <circle cx={c} cy={c} r={r} stroke="white" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="3 7" />
      {Array.from({ length: members }, (_, i) => {
        const [x, y] = at(i, r - 26);
        const [x2, y2] = at(i, 46);
        return <path key={i} d={`M${x} ${y}L${x2} ${y2}`} stroke="white" strokeOpacity=".22" strokeDasharray="2 5" />;
      })}
      <g className="transition-[rotate] duration-700 ease-out-soft group-hover:rotate-45" style={pivot(c, c)}>
        <path d={`M${sx} ${sy}A${r + 36} ${r + 36} 0 0 1 ${ex} ${ey}`} stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d={`M${ex} ${ey}l-12 -3m12 3-3 12`} stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {Array.from({ length: members }, (_, i) => {
        const [x, y] = at(i);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="22" fill={palette[i % palette.length]} />
            <circle cx={x} cy={f(y - 5)} r="6.5" fill="var(--color-padi-ink)" />
            <path d={`M${f(x - 11)} ${f(y + 12)}a11 9.5 0 0 1 22 0Z`} fill="var(--color-padi-ink)" />
            <text x={f(x + 17)} y={f(y - 13)} textAnchor="middle" className="fill-white font-display text-[11px] font-bold">
              {i + 1}
            </text>
          </g>
        );
      })}
      <circle cx={c} cy={c} r="40" fill="white" />
      <PadiSVG x={c - 21} y={c - 18} width="42" height="35" />
    </svg>
  );
}

export const PLAN_ARTWORK: Record<CheetahProductSlug, () => JSX.Element> = {
  fixed: FixedStaircase,
  smartsave: GoalRings,
  flex: FlowRibbons,
  padi: AjoCircle,
};
