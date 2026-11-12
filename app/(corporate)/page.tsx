import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/app/components/corporate/ArticleCard";
import { Mullion } from "@/app/components/corporate/Mullion";
import { CorporateHero } from "@/app/components/corporate/hero/CorporateHero";
import { CheetahShowcase } from "@/app/components/corporate/CheetahShowcase";
import { CustomerPromise } from "@/app/components/corporate/CustomerPromise";
import { OfferGallery } from "@/app/components/corporate/OfferGallery";
import { JsonLd } from "@/app/components/shared/JsonLd";
import { RegulatoryBanner } from "@/app/components/shared/RegulatoryBanner";
import { Reveal } from "@/app/components/shared/Reveal";
import { ArrowRight } from "@/app/components/ui/icons";
import { APP_LINKS } from "@/config/links";
import { COMPANY } from "@/data/corporate/company";
import { BOARD, MANAGEMENT } from "@/data/corporate/people";
import { getAllPosts } from "@/lib/blog";
import { organizationJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Boctrust Microfinance Bank Limited | Banking for Growth",
  absoluteTitle: true,
  description:
    "Boctrust Microfinance Bank Limited offers personal loans, business loans, salary advances, savings, fixed deposits and advisory services to individuals and businesses in Nigeria.",
  path: "/",
});

const ENTRY_POINTS = [
  { label: "Save", href: "/regular-savings", note: "Accounts and goal plans" },
  { label: "Borrow", href: "/loan", note: "Personal and business credit" },
  { label: "Invest", href: "/fixed-investment", note: "Deposits and notes" },
  { label: "Get advice", href: "/financial-advisory", note: "Expertise on your side" },
];

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 3);
  const chairman = BOARD[0];
  const md = MANAGEMENT[0];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* HERO: four chapters of one story, told in photographs (see CorporateHero) */}
      <CorporateHero />

      {/* A ledger index as the threshold into the page */}
      <nav aria-label="What would you like to do?" className="relative bg-navy text-white">
        <ul className="wrap grid grid-cols-2 lg:grid-cols-4">
          {ENTRY_POINTS.map((entry, index) => (
            <li key={entry.label} className={`border-white/25 ${index % 2 === 0 ? "border-r" : ""} lg:border-r lg:last:border-r-0 ${index < 2 ? "border-b lg:border-b-0" : ""}`}>
              <Link href={entry.href} className="group flex h-full flex-col gap-1 p-4 transition-colors hover:bg-gold hover:text-navy sm:p-6">
                <span className="tabular text-xs font-bold text-gold group-hover:text-navy">0{index + 1}</span>
                <span className="display-sm">{entry.label}</span>
                <span className="text-sm text-white/75 group-hover:text-navy">{entry.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* INTRO: broadsheet statement */}
      <section className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-32">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow border-t-2 border-navy pt-3 text-navy">Who we are</p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal>
            <p className="display-md text-navy">
              {COMPANY.belief} <span className="text-gold-deep">That is why we provide an avenue for saving, access to credit and advice</span> to individuals and enterprises across Nigeria.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-t-[12rem] rounded-b-2xl bg-ivory">
                <Image src="/images/corporate/scenes/advisor-two-customers.jpg" alt="A Boctrust advisor speaking with two customers" fill sizes="(max-width: 768px) 92vw, 45vw" className="object-cover" />
              </figure>
            </Reveal>
            <Reveal className="flex flex-col justify-end gap-5 md:col-span-5" delay={0.1}>
              <p className="text-ink-soft">{COMPANY.whoWeAre}</p>
              <p className="text-ink-soft">{COMPANY.explore}</p>
              <Link href="/about" className="group flex w-fit min-h-11 items-center gap-2 font-display font-bold text-navy">
                Read our story
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OFFERINGS: four photographic plates in a staggered grid */}
      <OfferGallery />

      {/* CHEETAH: the sister brand, with its plans hanging over the section edge */}
      <CheetahShowcase />

      {/* PROMISE: one solid staircase */}
      <CustomerPromise />

      <RegulatoryBanner variant="corporate" />

      {/* LEADERSHIP */}
      <section className="wrap grid gap-10 pb-20 lg:grid-cols-12 lg:pb-32">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-gold-deep">Leadership</p>
          <h2 className="display-md mt-3 text-navy">Seasoned hands, on the ledger.</h2>
          <p className="mt-5 text-ink-soft">{COMPANY.people[0]}</p>
          <div className="mt-6 flex flex-wrap gap-x-6">
            <Link href="/board" className="flex min-h-11 items-center gap-2 font-display font-bold text-navy underline-offset-4 hover:underline">
              Board of Directors <ArrowRight className="size-4" />
            </Link>
            <Link href="/management" className="flex min-h-11 items-center gap-2 font-display font-bold text-navy underline-offset-4 hover:underline">
              Management Team <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
          {[chairman, md].map((person, i) => (
            <Reveal key={person.slug} delay={i * 0.1} className={i === 1 ? "mt-10 lg:mt-20" : ""}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl bg-ivory">
                  <Image src={person.photo} alt={`Portrait of ${person.name}`} fill sizes="(max-width: 1024px) 46vw, 24vw" className="object-cover object-top" />
                </div>
                <figcaption className="mt-3">
                  <span className="block font-display font-bold text-navy">{person.name}</span>
                  <span className="block text-sm text-ink-soft">{person.title}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="border-t-2 border-navy bg-paper">
        <div className="wrap py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <p className="eyebrow text-gold-deep">Insights</p>
              <h2 className="display-md mt-3 text-navy">Notes on money and enterprise.</h2>
            </Reveal>
            <Link href="/blogs" className="flex min-h-11 items-center gap-2 font-display font-bold text-navy underline-offset-4 hover:underline">
              All articles <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal as="li" key={post.slug} delay={index * 0.08}>
                <ArticleCard post={post} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CONVERSION */}
      <section className="relative isolate overflow-hidden bg-gold text-navy">
        <Mullion accent={false} className="pointer-events-none absolute right-[4%] bottom-0 -z-10 h-[85%] text-navy/35 max-lg:hidden" />
        <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
          <h2 className="display-md lg:col-span-8">Let&apos;s grow, together.</h2>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <a href={APP_LINKS.boctrust.applyForLoan} className="flex min-h-14 items-center rounded-full bg-navy px-7 font-display font-bold text-white transition-colors hover:bg-navy-deep">
              Apply for a loan
            </a>
            <Link href="/contact" className="flex min-h-14 items-center rounded-full border-2 border-navy px-7 font-display font-bold transition-colors hover:bg-navy hover:text-white">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
