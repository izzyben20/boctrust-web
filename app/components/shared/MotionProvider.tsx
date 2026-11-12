"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Keeps the motion bundle small and honours the visitor's reduced-motion setting everywhere. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
