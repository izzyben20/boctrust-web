import type { ReactNode } from "react";

type EnterProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled, in px. */
  y?: number;
  as?: "div" | "span" | "section" | "figure";
};

/**
 * Entrance for content already on screen when the page loads. It is pure CSS, so the hero paints
 * immediately instead of waiting for JavaScript. That keeps Largest Contentful Paint fast.
 * Use <Reveal> for content further down the page.
 */
export function Enter({ children, className = "", delay = 0, y = 26, as: Tag = "div" }: EnterProps) {
  return (
    <Tag
      className={`enter ${className}`}
      style={{ animationDelay: `${delay}s`, "--enter-y": `${y}px` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
