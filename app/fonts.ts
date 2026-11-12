import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";

/** Headings. Self-hosted Satoshi from Fontshare (ITF Free Font License). */
export const satoshi = localFont({
  src: [
    { path: "../public/fonts/satoshi/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

/**
 * Body text. FH Oscar is the specified font, but it is a commercial typeface and no files were
 * supplied, so Instrument Sans stands in. To switch:
 *   1. Put the licensed files in public/fonts/fh-oscar/
 *   2. Replace this export with a localFont() call using variable "--font-body-fallback"
 * globals.css already lists "FH Oscar" first, so nothing else has to change.
 */
export const bodyFallback = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body-fallback",
  display: "swap",
});
