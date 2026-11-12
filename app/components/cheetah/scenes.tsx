import FlexSVG from "../svg/FlexSVG";
import PadiSVG from "../svg/PadiSVG";
import SmartSaveSVG from "../svg/SmartSaveSVG";
import VaultIconSVG from "../svg/VaultSVG";

const f = (n: number) => n.toFixed(1);

/** A bank-vault door: rings of numerals around the supplied VaultSVG. */
export function VaultDial({ className, spin }: { className?: string; spin?: boolean }) {
  return (
    <div className={`aspect-square ${className ?? ""}`} aria-hidden>
      <div className="relative size-full">
      <svg viewBox="0 0 600 600" className={`absolute inset-0 size-full ${spin ? "animate-orbit" : ""}`} fill="none">
        <circle cx="300" cy="300" r="292" stroke="var(--color-fixed)" strokeWidth="2" />
        <circle cx="300" cy="300" r="262" stroke="var(--color-fixed)" strokeOpacity=".45" strokeWidth="26" strokeDasharray="4 13.2" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={f(300 + 212 * Math.cos(a))} cy={f(300 + 212 * Math.sin(a))} r="10" fill="var(--color-fixed)" />;
        })}
        <circle cx="300" cy="300" r="178" stroke="var(--color-fixed)" strokeWidth="1.5" strokeDasharray="1 7" />
      </svg>
      <div className="absolute inset-[26%] grid place-items-center rounded-full bg-white shadow-[0_0_0_10px_rgb(147_129_255/0.25)]">
        <VaultIconSVG className="h-auto w-[46%]" />
      </div>
      </div>
    </div>
  );
}

/** A target, with rings that get filled in as the goal approaches, around SmartSaveSVG. */
export function GoalRings({ className }: { className?: string }) {
  const rings = [
    { r: 280, p: 0.28 },
    { r: 228, p: 0.55 },
    { r: 176, p: 0.82 },
  ];
  return (
    <div className={`aspect-square ${className ?? ""}`} aria-hidden>
      <div className="relative size-full">
      <svg viewBox="0 0 600 600" className="absolute inset-0 size-full -rotate-90" fill="none">
        {rings.map(({ r, p }) => {
          const c = 2 * Math.PI * r;
          return (
            <g key={r}>
              <circle cx="300" cy="300" r={r} stroke="var(--color-smart)" strokeOpacity=".2" strokeWidth="30" />
              <circle cx="300" cy="300" r={r} stroke="var(--color-smart)" strokeWidth="30" strokeLinecap="round" strokeDasharray={`${f(c * p)} ${f(c)}`} />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-[34%] grid place-items-center rounded-full bg-white shadow-lg">
        <SmartSaveSVG className="h-auto w-1/2" />
      </div>
      </div>
    </div>
  );
}

/** Rising and falling currents, for money that moves in and out. */
export function FlexCurrents({ className, lines = 9 }: { className?: string; lines?: number }) {
  const paths = Array.from({ length: lines }, (_, l) => {
    let d = "";
    for (let x = 0; x <= 1400; x += 14) {
      const y = 200 + (l - lines / 2) * 26 + Math.sin(x / 150 + l * 0.42) * 62 * Math.cos(x / 620 + l / 6);
      d += `${x === 0 ? "M" : "L"}${x} ${f(y)}`;
    }
    return d;
  });
  return (
    <svg viewBox="0 0 1400 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden fill="none" stroke="var(--color-flex)" strokeLinecap="round">
      {paths.map((d, i) => (
        <path key={d} d={d} strokeWidth={i % 3 === 0 ? 5 : 1.5} strokeOpacity={i % 3 === 0 ? 1 : 0.55} />
      ))}
    </svg>
  );
}

export function FlexBadge({ className }: { className?: string }) {
  return (
    <span className={`grid place-items-center rounded-[28%] bg-white shadow-md ${className ?? ""}`} aria-hidden>
      <FlexSVG className="h-auto w-3/5" />
    </span>
  );
}

const MEMBER_COLORS = ["#F79256", "#FBD1A2", "#7DCFB6", "#00B2CA", "#1D4E89", "#B47AEA", "#E2C36B", "#EE6C4D"];

/** The Ajo circle: members around a shared pot, with the payout passing from one to the next. */
export function PadiCircle({ className, members = 8, orbit }: { className?: string; members?: number; orbit?: boolean }) {
  return (
    <div className={`aspect-square ${className ?? ""}`} aria-hidden>
      <div className="relative size-full">
      <svg viewBox="0 0 600 600" className="absolute inset-0 size-full" fill="none">
        <circle cx="300" cy="300" r="222" stroke="var(--color-padi)" strokeWidth="2" strokeDasharray="4 12" />
        <g className={orbit ? "animate-orbit origin-center" : ""} style={{ transformBox: "view-box" }}>
          <path d="M300 78A222 222 0 0 1 457 143" stroke="var(--color-padi)" strokeWidth="14" strokeLinecap="round" />
          <circle cx="457" cy="143" r="16" fill="var(--color-padi)" />
        </g>
        {Array.from({ length: members }, (_, i) => {
          const a = (i / members) * Math.PI * 2 - Math.PI / 2;
          const x = 300 + 222 * Math.cos(a);
          const y = 300 + 222 * Math.sin(a);
          return (
            <g key={i}>
              <circle cx={f(x)} cy={f(y)} r="46" fill={MEMBER_COLORS[i % MEMBER_COLORS.length]} stroke="#fff" strokeWidth="6" />
              <circle cx={f(x)} cy={f(y - 10)} r="13" fill="#fff" />
              <path d={`M${f(x - 22)} ${f(y + 26)}a22 20 0 0 1 44 0`} fill="#fff" />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-[33%] grid place-items-center rounded-full bg-white shadow-lg">
        <PadiSVG className="h-auto w-3/5" />
      </div>
      </div>
    </div>
  );
}
