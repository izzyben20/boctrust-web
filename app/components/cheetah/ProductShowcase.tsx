'use client';

import Link from 'next/link';
import { type ComponentType, type SVGProps, useState } from 'react';
import {
  CHEETAH_PRODUCT_LIST,
  type CheetahProductSlug,
} from '@/data/cheetah/products';
import { SCREENS } from '@/data/cheetah/screens';
import FlexSVG from '../svg/FlexSVG';
import PadiSVG from '../svg/PadiSVG';
import SmartSaveSVG from '../svg/SmartSaveSVG';
import VaultIconSVG from '../svg/VaultSVG';
import { ArrowRight } from '../ui/icons';
import { IPhone } from './IPhone';
import { FlexCurrents, GoalRings, PadiCircle, VaultDial } from './scenes';

type Look = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  panel: string;
  body: string;
  label: string;
  fact: string;
  factLabel: string;
};

const LOOKS: Record<CheetahProductSlug, Look> = {
  smartsave: {
    Icon: SmartSaveSVG,
    panel: 'bg-smart-mist text-stride-night',
    body: 'text-stride-night/80',
    label: 'text-smart-ink',
    fact: '3, 6 or 12',
    factLabel: 'month timelines',
  },
  fixed: {
    Icon: VaultIconSVG,
    panel: 'bg-fixed-night text-white',
    body: 'text-white/85',
    label: 'text-fixed',
    fact: '6% – 18%',
    factLabel: 'a year, by amount and term',
  },
  flex: {
    Icon: FlexSVG,
    panel: 'bg-flex-mist text-stride-night',
    body: 'text-stride-night/80',
    label: 'text-flex-ink',
    fact: 'Daily',
    factLabel: 'withdrawals and interest accrual',
  },
  padi: {
    Icon: PadiSVG,
    panel: 'bg-padi-mist text-stride-night',
    body: 'text-stride-night/80',
    label: 'text-padi-ink',
    fact: 'Ajo / Esusu',
    factLabel: 'with people you trust',
  },
};

const PHONE =
  'absolute max-lg:top-0 max-lg:left-1/2 max-lg:w-56 max-lg:-translate-x-1/2 lg:right-[12%] lg:-bottom-[38%] lg:w-[68%] lg:max-w-[17rem]';

function PlanArt({ slug }: { slug: CheetahProductSlug }) {
  if (slug === 'fixed') {
    return (
      <>
        <VaultDial className="absolute -right-24 -bottom-24 w-[26rem] opacity-40" />
        <IPhone {...SCREENS.fixed} className={PHONE} />
      </>
    );
  }
  if (slug === 'smartsave') {
    return (
      <>
        <GoalRings className="absolute -right-20 -bottom-20 w-[24rem] opacity-70" />
        <IPhone {...SCREENS.home} className={PHONE} />
      </>
    );
  }
  if (slug === 'flex') {
    return (
      <>
        <FlexCurrents className="absolute inset-x-[-20%] top-[28%] h-56 w-[140%] max-w-none" />
        <IPhone {...SCREENS.flex} className={PHONE} />
      </>
    );
  }
  return (
    <>
      <PadiCircle className="absolute -right-16 -bottom-14 w-[24rem] opacity-60" />
      <IPhone {...SCREENS.padi} className={PHONE} />
    </>
  );
}

/** Four panels share one stage: the plan you point at opens up and the others step aside. */
export function ProductShowcase() {
  const [active, setActive] = useState<CheetahProductSlug>('fixed');
  return (
    <ul className="flex flex-col gap-3 lg:h-152 lg:flex-row">
      {CHEETAH_PRODUCT_LIST.map((product) => {
        const look = LOOKS[product.slug];
        const open = active === product.slug;
        return (
          <li
            key={product.slug}
            onPointerEnter={() => setActive(product.slug)}
            onFocus={() => setActive(product.slug)}
            className={`relative min-w-0 overflow-hidden rounded-4xl transition-[flex-grow] duration-700 ease-out-soft lg:basis-0 ${look.panel} ${open ? 'lg:grow-[4.2]' : 'lg:grow'}`}
          >
            <Link
              href={product.href}
              className="group relative flex h-full flex-col p-6 lg:p-7"
            >
              <span className="relative z-10 flex size-13 shrink-0 items-center justify-center rounded-2xl bg-white">
                <look.Icon className="h-auto w-7" aria-hidden />
              </span>

              <span
                aria-hidden={open ? undefined : true}
                className={`relative z-10 mt-5 flex flex-col transition-opacity duration-500 lg:w-60 xl:w-68 ${open ? 'opacity-100 lg:delay-200' : 'lg:pointer-events-none lg:opacity-0'}`}
              >
                <span className="display-sm">{product.name}</span>
                <span className={`mt-2 text-sm ${look.body}`}>
                  {product.cardLine}
                </span>
                <span className="mt-5 block">
                  <span
                    className={`block font-display text-2xl font-bold tracking-tight ${look.label}`}
                  >
                    {look.fact}
                  </span>
                  <span className={`block text-xs ${look.body}`}>
                    {look.factLabel}
                  </span>
                </span>
                <span className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 font-display text-sm font-bold">
                  {product.cta}{' '}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>

              {/* The collapsed state on large screens: the name reads up the panel. */}
              <span
                aria-hidden
                className={`absolute bottom-7 left-7 hidden font-display text-xl font-bold tracking-tight whitespace-nowrap transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 lg:block ${open ? 'opacity-0' : 'opacity-100'}`}
              >
                {product.name}
              </span>

              <span
                className={`pointer-events-none relative -mx-6 -mb-6 mt-5 block h-[17rem] overflow-hidden transition-opacity duration-500 lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:h-auto lg:w-[calc(100%-17rem)] xl:w-[calc(100%-20rem)] ${open ? 'opacity-100 lg:delay-200' : 'lg:opacity-0'}`}
              >
                <PlanArt slug={product.slug} />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
