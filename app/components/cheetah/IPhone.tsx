import Image from "next/image";
import type { ReactNode } from "react";

type IPhoneProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  shadow?: boolean;
  /** Drawn over the screen, in the screen's own coordinates. */
  children?: ReactNode;
};

/**
 * A device frame sized for 390 x 844 screenshots. Every measure is in cqw, so the bezel, island and
 * buttons stay in proportion at any width. Set the width with `className`.
 */
export function IPhone({ src, alt, className = "", sizes = "(max-width: 768px) 62vw, 320px", priority, shadow = true, children }: IPhoneProps) {
  return (
    <div className={`@container ${className}`}>
      <div
        className="relative aspect-[100/208.5] bg-[linear-gradient(135deg,#d9dbde,#8f9297_22%,#e8e9eb_48%,#85888d_76%,#d2d4d7)]"
        style={{
          borderRadius: "15.5cqw",
          padding: "0.7cqw",
          boxShadow: shadow ? "0 2.5cqw 5cqw rgb(16 31 51 / 0.18), 0 14cqw 26cqw -7cqw rgb(16 31 51 / 0.55)" : undefined,
        }}
      >
        <SideButton side="left" top="17" height="5.5" />
        <SideButton side="left" top="26" height="10.5" />
        <SideButton side="left" top="39" height="10.5" />
        <SideButton side="right" top="30" height="16.5" />
        <div className="relative size-full bg-[#07090c]" style={{ borderRadius: "14.9cqw", padding: "2.7cqw" }}>
          <div className="relative size-full overflow-hidden bg-[#f4f3ee]" style={{ borderRadius: "12.2cqw" }}>
            <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
            {children}
            <span aria-hidden className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#07090c]" style={{ top: "2.6cqw", width: "28cqw", height: "8cqw" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SideButton({ side, top, height }: { side: "left" | "right"; top: string; height: string }) {
  return (
    <span
      aria-hidden
      className="absolute bg-[#8d9095]"
      style={{ [side]: "-0.55cqw", top: `${top}%`, height: `${height}%`, width: "0.8cqw", borderRadius: "0.4cqw" }}
    />
  );
}
