/* eslint-disable @next/next/no-img-element -- SVG logos are served as-is; next/image adds nothing to a vector */

const FILES = {
  horizontal: { w: 226, h: 75 },
  stacked: { w: 165.6, h: 129.6 },
  mark: { w: 74, h: 75 },
} as const;

type Props = {
  variant?: keyof typeof FILES;
  /** "reverse" is a white-and-gold adaptation for dark backgrounds, derived from the supplied logo. */
  tone?: "brand" | "reverse";
  className?: string;
  decorative?: boolean;
};

export function BoctrustLogo({ variant = "horizontal", tone = "brand", className, decorative }: Props) {
  const { w, h } = FILES[variant];
  return (
    <img
      src={`/logos/boctrust-${variant}${tone === "reverse" ? "-reverse" : ""}.svg`}
      width={w}
      height={h}
      alt={decorative ? "" : "Boctrust Microfinance Bank Limited"}
      className={className}
      decoding="async"
    />
  );
}
