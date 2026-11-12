import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/data/corporate/company";
import { CATEGORY_LABELS, type ProductCategory, productsByCategory } from "@/data/corporate/products";
import { Reveal } from "../shared/Reveal";
import { ArrowUpRight } from "../ui/icons";

type Plate = {
  category: ProductCategory;
  src: string;
  alt: string;
  /** Short line on the vertical tab beside the photograph. */
  tab: string;
  aspect: string;
  focus: string;
  /** Each photograph has its own silhouette. */
  shape: string;
  /** The colour panel layered over the photograph's lower edge. */
  panel: string;
  body: string;
  number: string;
  link: string;
  tabSkin: string;
  /** Placement in the 2-column grid. Source order stays 1 to 4 for phones and screen readers. */
  grid: string;
};

const PLATES: Plate[] = [
  {
    category: "savings",
    src: "/images/corporate/offerings/savings-fruit-trader.jpg",
    alt: "A young trader in a white hijab smiling at her fruit stall in a Nigerian market",
    tab: "Set aside",
    aspect: "aspect-[3/2]",
    focus: "object-[50%_28%]",
    shape: "rounded-tr-[7rem] rounded-bl-[2rem]",
    panel: "ml-auto w-[92%] bg-navy text-white sm:w-[82%]",
    body: "text-white/85",
    number: "text-gold",
    link: "decoration-gold",
    tabSkin: "bg-gold text-navy",
    grid: "lg:col-start-1 lg:row-start-2",
  },
  {
    category: "loans",
    src: "/images/corporate/offerings/loans-metal-workshop.jpg",
    alt: "A craftsman at work in his open-air metal workshop, surrounded by his tools and stock",
    tab: "Get moving",
    aspect: "aspect-[5/6]",
    focus: "object-[50%_60%]",
    shape: "rounded-tl-[9rem] rounded-br-[2rem]",
    panel: "mr-auto w-[92%] bg-ivory text-navy sm:w-[82%]",
    body: "text-ink-soft",
    number: "text-gold-deep",
    link: "decoration-gold-deep",
    tabSkin: "bg-navy text-white",
    grid: "lg:col-start-2 lg:row-span-2 lg:row-start-1",
  },
  {
    category: "investments",
    src: "/images/corporate/offerings/investments-lagos-skyline.jpg",
    alt: "The Lagos skyline across the lagoon, with passenger boats moored in the foreground",
    tab: "Build up",
    aspect: "aspect-[5/6]",
    focus: "object-[50%_40%]",
    shape: "stepped-frame",
    panel: "ml-auto w-[92%] bg-gold text-navy sm:w-[82%]",
    body: "text-navy",
    number: "text-navy",
    link: "decoration-navy",
    tabSkin: "bg-navy text-white",
    grid: "lg:col-start-1 lg:row-start-3",
  },
  {
    category: "advisory",
    src: "/images/corporate/offerings/advisory-consultation.jpg",
    alt: "An adviser in a suit going through paperwork with a client across his desk",
    tab: "Think ahead",
    aspect: "aspect-[4/3]",
    focus: "object-[50%_40%]",
    shape: "rounded-bl-[7rem] rounded-tr-[2rem]",
    panel: "mr-auto w-[92%] bg-navy-deep text-white sm:w-[82%]",
    body: "text-white/85",
    number: "text-gold",
    link: "decoration-gold",
    tabSkin: "bg-gold text-navy",
    grid: "lg:col-start-2 lg:row-start-3 lg:mt-32",
  },
];

/**
 * Four photographic plates in a staggered two-column grid, with the title occupying the first cell.
 * Each photograph has its own silhouette, and a colour panel overlaps its lower edge.
 */
export function OfferGallery() {
  return (
    <section aria-labelledby="products-heading" className="wrap pb-24 lg:pb-36">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20 xl:gap-x-24">
        <Reveal className="lg:col-start-1 lg:row-start-1 lg:self-start">
          <p className="eyebrow text-gold-deep">What we offer</p>
          <h2 id="products-heading" className="display-md mt-3 text-navy">Four ways we move you forward.</h2>
          <p className="mt-5 max-w-xl text-ink-soft">{COMPANY.products}</p>
        </Reveal>

        {PLATES.map((plate, index) => (
          <Reveal as="article" key={plate.category} delay={index * 0.05} className={`group lg:self-start ${plate.grid}`}>
            <div className="relative">
              <div className={`relative overflow-hidden bg-ivory ${plate.aspect} ${plate.shape}`}>
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  fill
                  sizes="(max-width: 1024px) 94vw, 46vw"
                  className={`object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-105 ${plate.focus}`}
                />
              </div>
              {/* A tab set into the photograph's edge, reading upward */}
              <span aria-hidden className={`absolute top-[12%] right-0 px-2 py-4 font-display text-xs font-bold tracking-[0.14em] uppercase [writing-mode:vertical-rl] ${plate.tabSkin}`}>
                {plate.tab}
              </span>
            </div>

            <div className={`relative -mt-16 p-6 sm:-mt-20 sm:p-8 ${plate.panel}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-sm">{CATEGORY_LABELS[plate.category]}</h3>
                <span aria-hidden className={`tabular font-display text-sm font-bold ${plate.number}`}>0{index + 1}</span>
              </div>
              <p className={`mt-2 text-sm ${plate.body}`}>{COMPANY.pillars.find((p) => p.slug === plate.category)?.body}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5">
                {productsByCategory(plate.category).map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/${product.slug}`}
                      className={`group/link inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline decoration-2 underline-offset-4 ${plate.link}`}
                    >
                      {product.name}
                      <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
