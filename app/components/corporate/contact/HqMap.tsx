/* eslint-disable @next/next/no-img-element -- A vector file: next/image would not optimise it */
import { HQ_MAP } from "@/data/corporate/hq-map";

const MAJOR_LABELS = ["Awolowo Road", "Broad Street", "Force Road"];
const MINOR_LABELS = ["Igbosere Road", "Onikan Road", "Campbell Street", "Simpson Street"];

/**
 * Real Lagos Island streets, redrawn from OpenStreetMap in Boctrust's colours. The base is a
 * static file, so it needs no JavaScript, API key or third-party request. Labels sit in a
 * matching overlay so they can use the site's own fonts.
 */
export function HqMap() {
  const { width, height, moloney, pin, roads } = HQ_MAP;
  const roadPaths = roads as Record<string, string>;
  return (
    <>
      <img src="/images/corporate/contact/hq-map.svg" alt="" width={width} height={height} loading="lazy" className="absolute inset-0 size-full object-cover" />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Street map of Onikan on Lagos Island, with a pin on Moloney Street marking the Boctrust head office"
        className="absolute inset-0 size-full"
      >
        <defs>
          {[...MAJOR_LABELS, ...MINOR_LABELS].map((name) =>
            roadPaths[name] ? <path key={name} id={`road-${name.replace(/\s/g, "-")}`} d={roadPaths[name]} /> : null,
          )}
        </defs>

        {/* Moloney Street, drawn twice for the glow */}
        <path d={moloney} fill="none" stroke="var(--color-gold)" strokeOpacity=".25" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
        <path d={moloney} fill="none" stroke="var(--color-gold)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

        <g fill="#c6d3e0" fontFamily="var(--font-sans)" textAnchor="middle" className="max-sm:hidden">
          {MAJOR_LABELS.map((name) => (
            <text key={name} fontSize="21" fontWeight="600" letterSpacing="1" dy="-11">
              {/* Awolowo Road runs off the crop at its midpoint, so its label sits further along. */}
              <textPath href={`#road-${name.replace(/\s/g, "-")}`} startOffset={name === "Awolowo Road" ? "30%" : "50%"}>{name}</textPath>
            </text>
          ))}
          {MINOR_LABELS.map((name) =>
            roadPaths[name] ? (
              <text key={name} fontSize="16" fillOpacity=".8" dy="-8">
                <textPath href={`#road-${name.replace(/\s/g, "-")}`} startOffset="50%">{name}</textPath>
              </text>
            ) : null,
          )}
        </g>

        {/* The pin. It scales up on phones, where the map is cropped much tighter. */}
        <g transform={`translate(${pin.x} ${pin.y})`}>
          <g className="origin-center [transform-box:fill-box] max-sm:scale-[2.1]">
            <circle r="26" fill="var(--color-gold)" className="origin-center animate-ping [transform-box:fill-box] [animation-duration:2.4s]" opacity=".55" />
            <path d="M0 0C-5-15-27-28-27-52a27 27 0 1 1 54 0C27-28 5-15 0 0Z" fill="var(--color-gold)" stroke="var(--color-navy-deep)" strokeWidth="3" />
            <circle cy="-52" r="10" fill="var(--color-navy-deep)" />
          </g>
          <g transform="translate(40 -60)" className="max-sm:hidden">
            <rect width="262" height="62" rx="14" fill="var(--color-paper)" />
            <text x="18" y="27" fontFamily="var(--font-display)" fontWeight="800" fontSize="19" fill="var(--color-navy)">Boctrust head office</text>
            <text x="18" y="48" fontFamily="var(--font-sans)" fontSize="15" fill="var(--color-ink-soft)">26 Moloney Street</text>
          </g>
        </g>
      </svg>
    </>
  );
}
