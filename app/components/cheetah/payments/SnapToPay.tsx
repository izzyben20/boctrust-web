/**
 * Snap to Pay: the camera captures written payment details, the app lays them out for review,
 * and nothing is paid until the customer confirms. Bars stand in for text, so no real details appear.
 */
export function SnapToPay({ className = "", steps = true }: { className?: string; steps?: boolean }) {
  return (
    <figure aria-hidden className={`rounded-[1.6rem] bg-white p-3 text-stride-night shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-stride-deep p-[12%]">
        <div className="relative -rotate-3 rounded-md bg-[#fbf6e8] p-[10%] shadow-lg">
          <span className="block h-1.5 w-1/3 rounded-full bg-stride-night/30" />
          <span className="mt-2 block h-2 w-5/6 rounded-full bg-stride-night/70" />
          <span className="mt-3 block h-1.5 w-1/4 rounded-full bg-stride-night/30" />
          <span className="mt-2 block h-2 w-2/3 rounded-full bg-stride-night/70" />
          <span className="mt-3 flex items-center gap-1.5">
            <span className="font-display text-sm font-bold leading-none">₦</span>
            <span className="block h-2.5 w-1/2 rounded-full bg-sun" />
          </span>
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-[5%] size-[90%]" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <path d="M2 18V2h16M82 2h16v16M98 82v16H82M18 98H2V82" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute inset-0 animate-flash bg-white" />
        <span className="absolute right-[7%] bottom-[7%] grid size-7 place-items-center rounded-full bg-white/90 ring-4 ring-white/30">
          <span className="size-3.5 rounded-full bg-stride-night" />
        </span>
      </div>
      <figcaption className="px-1.5 pt-2.5">
        <span className="block font-display text-xs font-bold sm:text-sm">Snap to pay</span>
        {/* The steps need about 12rem of card; narrower placements show the title alone. */}
        {steps && (
          <ol className="mt-1.5 flex items-center gap-1 text-[0.65rem] font-bold">
            {["Snap", "Review", "Pay"].map((step, i) => (
              <li key={step} className="flex items-center gap-1">
                {i > 0 && <span className="text-stride-night/40">→</span>}
                <span className={`rounded-full px-2 py-0.5 ${i === 2 ? "bg-stride-night text-white" : "bg-stride-mist"}`}>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </figcaption>
    </figure>
  );
}
