import Link from "next/link";
import type { ComponentType, CSSProperties, SVGProps } from "react";
import type { CheetahProduct, CheetahProductSlug } from "@/data/cheetah/products";
import FlexSVG from "../../svg/FlexSVG";
import PadiSVG from "../../svg/PadiSVG";
import SmartSaveSVG from "../../svg/SmartSaveSVG";
import VaultIconSVG from "../../svg/VaultSVG";
import { ArrowRight } from "../../ui/icons";
import { PLAN_ARTWORK } from "./artwork";

type PosterTheme = {
  /** The plan's original icon, as used in the Cheetah app and site. */
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** What kind of plan this is, in plain words drawn from its own description. */
  kind: string;
  /** Colour field and base text colour. Deep and pale fields alternate across the grid. */
  surface: string;
  muted: string;
  /** The kind label and benefit marks. */
  accent: string;
  cta: string;
  /** Focus outline that reads on this surface. */
  ring: string;
  /** Which side the artwork takes on a wide card. On a narrow card it always leads. */
  artSide: "start" | "end";
};

const THEMES: Record<CheetahProductSlug, PosterTheme> = {
  fixed: {
    Icon: VaultIconSVG,
    kind: "Fixed deposit",
    surface: "bg-fixed-night text-white",
    muted: "text-white/75",
    accent: "var(--color-fixed)",
    cta: "bg-white text-fixed-night group-hover:bg-fixed group-hover:text-white",
    ring: "white",
    artSide: "end",
  },
  smartsave: {
    Icon: SmartSaveSVG,
    kind: "Goal savings",
    surface: "bg-smart-mist text-stride-night",
    muted: "text-stride-night/75",
    accent: "var(--color-smart-ink)",
    cta: "bg-smart-ink text-white group-hover:bg-stride-night",
    ring: "var(--color-stride-night)",
    artSide: "start",
  },
  flex: {
    Icon: FlexSVG,
    kind: "Everyday savings",
    surface: "bg-flex-mist text-stride-night",
    muted: "text-stride-night/75",
    accent: "var(--color-flex-ink)",
    cta: "bg-flex-ink text-white group-hover:bg-stride-night",
    ring: "var(--color-stride-night)",
    artSide: "start",
  },
  padi: {
    Icon: PadiSVG,
    kind: "Group savings",
    surface: "bg-padi-ink text-white",
    muted: "text-white/85",
    accent: "var(--color-gold)",
    cta: "bg-white text-padi-ink group-hover:bg-gold group-hover:text-navy",
    ring: "white",
    artSide: "end",
  },
};

/**
 * One plan as a small campaign poster: a colour field, an original drawing of how the plan works,
 * and the plan's own words. A container query decides the composition: side by side once the card
 * is 36rem wide, otherwise the artwork becomes a band over the copy. The CTA covers the card.
 */
export function PlanCard({ product }: { product: CheetahProduct }) {
  const theme = THEMES[product.slug];
  const Artwork = PLAN_ARTWORK[product.slug];
  const headingId = `cheetah-plan-${product.slug}`;

  return (
    <div className="@container h-full">
      <article
        aria-labelledby={headingId}
        style={{ "--accent": theme.accent, "--focus-ring": theme.ring } as CSSProperties}
        className={`group relative isolate grid h-full grid-rows-[15rem_1fr] overflow-hidden rounded-3xl @xl:grid-rows-1 @xl:grid-cols-2 ${theme.surface}`}
      >
        <div className={`relative order-first overflow-hidden ${theme.artSide === "end" ? "@xl:order-last" : ""}`}>
          <Artwork />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white">
              <theme.Icon className="h-auto w-6" aria-hidden />
            </span>
            <span className="eyebrow text-(--accent)">{theme.kind}</span>
          </div>

          <h3 id={headingId} className="mt-5 font-display text-[clamp(1.6rem,2.3vw,2.1rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {product.name}
          </h3>
          <p className={`mt-3 text-[0.95rem] leading-relaxed ${theme.muted}`}>{product.cardLine}</p>

          <ul className="mt-5 grid gap-2 text-sm font-medium">
            {product.benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-center gap-2.5">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-(--accent)" />
                {benefit.title}
              </li>
            ))}
          </ul>

          <Link
            href={product.href}
            aria-describedby={headingId}
            className="mt-auto w-fit rounded-full pt-7 after:absolute after:inset-0 after:rounded-3xl"
          >
            <span className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-display text-[0.95rem] font-bold transition-colors duration-300 ${theme.cta}`}>
              {product.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </article>
    </div>
  );
}
