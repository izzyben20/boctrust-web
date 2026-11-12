"use client";

import * as m from "motion/react-m";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled, in px. */
  y?: number;
  as?: "div" | "li" | "section" | "article" | "figure" | "span";
};

/** Scroll-triggered entrance. With reduced motion on, content simply appears. */
export function Reveal({ children, className, delay = 0, y = 26, as = "div" }: RevealProps) {
  const Tag = m[as] as ElementType;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
