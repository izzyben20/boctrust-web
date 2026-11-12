import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ValueSteps } from '@/app/components/corporate/ValueSteps';
import { RegulatoryBanner } from '@/app/components/shared/RegulatoryBanner';
import { Enter } from '@/app/components/shared/Enter';
import { Reveal } from '@/app/components/shared/Reveal';
import { ArrowRight, CheckIcon } from '@/app/components/ui/icons';
import { COMPANY } from '@/data/corporate/company';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'About Us: Who We Are',
  description:
    'Boctrust Microfinance Bank gives social and economic support to the lower middle class, working class and the economically active poor. Learn our vision, mission and values.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      {/* HERO: a solid navy banner hangs from the top, leaving the people in the photograph clear. */}
      <section
        aria-labelledby="about-title"
        className="relative isolate bg-navy lg:bg-transparent"
      >
        <figure className="relative aspect-4/3 w-full sm:aspect-video lg:aspect-auto lg:h-200 xl:h-216">
          <Image
            src="/images/corporate/editorial/about-lagos-team.jpg"
            alt="Colleagues in a meeting around a long table in a bright Lagos office"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[50%_88%] lg:object-bottom"
          />
        </figure>
        <div className="wrap lg:absolute lg:inset-x-0 lg:top-0">
          <Enter
            y={14}
            className="relative py-9 text-white lg:w-[min(50rem,64%)] lg:bg-navy lg:py-12 lg:pr-14 lg:pl-12"
          >
            <p className="eyebrow text-gold">Who we are</p>
            <h1 id="about-title" className="display-hero mt-4">
              Growing, together.
            </h1>
            <p className="lede mt-5 max-w-160 text-white/90">
              {COMPANY.whoWeAre}
            </p>
            <span
              aria-hidden
              className="absolute right-0 bottom-0 hidden size-8 translate-x-full bg-gold lg:block"
            />
          </Enter>
        </div>
      </section>

      {/* CHARTER: one statement leads, two follow */}
      <section className="wrap grid gap-10 pt-16 pb-4 lg:grid-cols-12 lg:pt-28">
        <Reveal className="lg:col-span-7">
          <h2 className="eyebrow text-gold-deep">Our vision</h2>
          <p className="display-md mt-4 text-navy">{COMPANY.vision}</p>
        </Reveal>
        <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
          {[
            ['Our mission', COMPANY.mission],
            ['Our goal', COMPANY.goal],
          ].map(([label, text], index) => (
            <Reveal
              key={label}
              delay={0.08 + index * 0.08}
              className="border-t border-navy pt-3"
            >
              <dt className="eyebrow text-navy">{label}</dt>
              <dd className="mt-2 text-ink-soft">{text}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <ValueSteps />

      {/* People */}
      <section className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-32">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-3/2 overflow-hidden rounded-r-[8rem] rounded-l-2xl bg-ivory">
            <Image
              src="/images/corporate/scenes/staff.jpg"
              alt="Members of the Boctrust team standing together"
              fill
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          <p className="eyebrow text-gold-deep">Our people</p>
          <h2 className="display-md mt-3 text-navy">
            Experience, on your side of the table.
          </h2>
          {COMPANY.people.map((paragraph) => (
            <p key={paragraph.slice(0, 30)} className="mt-4 text-ink-soft">
              {paragraph}
            </p>
          ))}
          <div className="mt-6 flex flex-wrap gap-x-6">
            {[
              ['Board of Directors', '/board'],
              ['Management Team', '/management'],
              ['Careers', '/careers'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="flex min-h-11 items-center gap-2 font-display font-bold text-navy underline-offset-4 hover:underline"
              >
                {label} <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Promise */}
      <section className="bg-gold-pale">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold-deep">Our customer promise</p>
            <h2 className="display-md mt-3 text-navy">
              Dedicated customer service, on and offline.
            </h2>
          </Reveal>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {COMPANY.promise.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-navy/20 py-4 font-display font-bold text-navy"
              >
                <CheckIcon className="size-5 shrink-0 text-gold-deep" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RegulatoryBanner variant="corporate" />
    </>
  );
}
