const SIZE = 21;

/** A decorative QR pattern: three finder squares and deterministic modules. It encodes nothing. */
const MODULES = (() => {
  const cells: [number, number][] = [];
  let seed = 7;
  const next = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!inFinder(x, y) && next() > 0.52) cells.push([x, y]);
    }
  }
  return cells;
})();

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x + 0.5} y={y + 0.5} width="6" height="6" rx="1.4" fill="none" stroke="var(--color-stride-night)" strokeWidth="1" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.6" fill="var(--color-stride-night)" />
    </g>
  );
}

/** Scan to Pay: a merchant code inside the camera's focus brackets, with the scan line sweeping it. */
export function ScanToPay({ className = "", label = true }: { className?: string; label?: boolean }) {
  return (
    <figure aria-hidden className={`rounded-[1.6rem] bg-white p-3 text-stride-night shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-stride-mist p-[14%]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block w-full" shapeRendering="crispEdges">
          {MODULES.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--color-stride-night)" />
          ))}
          <Finder x={0} y={0} />
          <Finder x={14} y={0} />
          <Finder x={0} y={14} />
          <rect x="8.5" y="8.5" width="4" height="4" rx="1" fill="var(--color-sun)" />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-[6%] size-[88%]" fill="none" stroke="var(--color-sun)" strokeWidth="4" strokeLinecap="round">
          <path d="M2 20V2h18M80 2h18v18M98 80v18H80M20 98H2V80" />
        </svg>
        <span className="absolute inset-x-[8%] top-[8%] block h-0.5 animate-scan rounded-full bg-sun shadow-[0_0_14px_3px_rgb(226_195_107/0.75)]" />
      </div>
      {label && (
        <figcaption className="flex items-center justify-between gap-2 px-1.5 pt-2.5 font-display text-xs font-bold sm:text-sm">
          Scan to pay
          <span className="rounded-full bg-sun px-2 py-0.5 text-[0.65rem]">QR</span>
        </figcaption>
      )}
    </figure>
  );
}
