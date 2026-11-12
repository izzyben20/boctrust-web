/**
 * The corporate decorative motif: a few fine vertical lines rising in steps, like window mullions
 * or a ledger's columns climbing. It supports a layout and is never the main attraction, so it
 * appears only in a few deliberately quiet places.
 */
const STEPS = [28, 44, 44, 64, 64, 84, 100];

export function Mullion({ className, accent = true }: { className?: string; accent?: boolean }) {
  const gap = 200 / (STEPS.length - 1);
  return (
    <svg viewBox="0 0 208 200" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1">
      {STEPS.map((height, index) => {
        const x = 4 + index * gap;
        return <path key={x} d={`M${x} 200V${200 - height * 2}`} vectorEffect="non-scaling-stroke" />;
      })}
      {accent && <rect x="200" y="0" width="8" height="8" fill="var(--color-gold)" stroke="none" />}
    </svg>
  );
}
