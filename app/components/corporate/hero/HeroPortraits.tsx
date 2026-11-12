"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { HeroPortrait } from "@/data/corporate/hero";

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const list = window.matchMedia(REDUCED);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
};
const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};
const no = () => false;

/**
 * A count of completed turns. The portrait on show is `turn % count`; the furthest one reached is
 * `min(turn, count - 1)`. It stands still for reduced motion and while the tab is hidden.
 */
function useTurn(count: number, interval: number) {
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, no);
  const hidden = useSyncExternalStore(subscribeVisibility, () => document.hidden, no);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (reduced || hidden || count < 2) return;
    const timer = window.setInterval(() => setTurn((t) => t + 1), interval);
    return () => window.clearInterval(timer);
  }, [reduced, hidden, count, interval]);

  return { active: turn % count, reach: Math.min(turn, count - 1) };
}

type Props = {
  portraits: readonly HeroPortrait[];
  /** Time each portrait stays, in ms. */
  interval?: number;
  /** `sizes` for the cutouts, matching the stage's rendered width. */
  sizes: string;
};

/**
 * Portraits that take turns, standing on the stage's bottom edge. They crossfade in place inside a
 * stage of fixed size, so nothing around them moves. The first is preloaded; each later one is
 * mounted a turn ahead, so it has loaded before it shows. They are illustrative, so they are
 * hidden from assistive technology and nothing is announced as they change.
 */
export function HeroPortraits({ portraits, interval = 6000, sizes }: Props) {
  const { active, reach } = useTurn(portraits.length, interval);

  return (
    <div aria-hidden className="absolute inset-0">
      {portraits.map((portrait, index) => {
        if (index > reach + 1) return null;
        const shown = index === active;
        return (
          <Image
            key={portrait.src}
            src={portrait.src}
            alt=""
            width={portrait.width}
            height={portrait.height}
            preload={index === 0}
            fetchPriority={index === 0 ? "high" : "low"}
            sizes={sizes}
            draggable={false}
            style={{ height: `${portrait.fit.height}%`, translate: `calc(-50% + ${portrait.fit.x}%) 0` }}
            className={`absolute bottom-0 left-1/2 w-auto max-w-none select-none transition-opacity duration-1000 ease-out-soft ${
              shown ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}
