"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import { type ReactNode, useRef, useState } from "react";
import { BILL_CATEGORIES } from "@/data/cheetah/payments";
import { APP_CROPS, SAMPLE_NOTE, SCREENS } from "@/data/cheetah/screens";
import { BillIcon, StageArc } from "../art";
import { IPhone } from "../IPhone";

type Stop = {
  id: string;
  label: string;
  title: string;
  body: string;
  screen: { src: string; alt: string };
  /** Where the feature sits on the real screen: left, top, width, height, in percent. */
  spot: [number, number, number, number];
  companion: ReactNode;
};

const chips = (names: readonly (typeof BILL_CATEGORIES)[number][]) => (
  <ul className="grid grid-cols-3 gap-2">
    {names.map((name) => (
      <li key={name} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 text-[0.68rem] font-bold shadow-lg">
        <BillIcon name={name} className="size-6 text-stride-deep" />
        {name}
      </li>
    ))}
  </ul>
);

const STOPS: Stop[] = [
  {
    id: "send",
    label: "Send money",
    title: "Three ways to send.",
    body: "Move money between your own savings, send to another BOCTrust user, or send to any Nigerian bank account. Confirm with your transaction PIN, and an alert follows straight away.",
    screen: SCREENS.send,
    spot: [4, 14.5, 92, 28.5],
    companion: <Image src={APP_CROPS.receipt.src} width={APP_CROPS.receipt.width} height={APP_CROPS.receipt.height} alt="" sizes="200px" className="h-auto w-full drop-shadow-[0_24px_30px_rgb(16_31_51/0.35)]" />,
  },
  {
    id: "bills",
    label: "Pay bills",
    title: "Bills, side by side.",
    body: "Water, electricity, TV, education and internet sit together on one screen. Choose a category, enter your details and pay from your Cheetah account.",
    screen: SCREENS.payments,
    spot: [3.5, 38, 93, 20],
    companion: chips(["Water", "Electricity", "TV", "Education", "Internet"]),
  },
  {
    id: "airtime",
    label: "Airtime",
    title: "Top up any line.",
    body: "Buy airtime for yourself or someone else, straight from your account, whenever you're running low.",
    screen: SCREENS.payments,
    spot: [3.5, 38, 23, 10],
    companion: chips(["Airtime"]),
  },
  {
    id: "data",
    label: "Data",
    title: "Back online in moments.",
    body: "Choose a data plan for any phone number and pay from the same place you save.",
    screen: SCREENS.payments,
    spot: [27, 38, 23, 10],
    companion: chips(["Data"]),
  },
];

/** A marketing walkthrough of real screens. Nothing here connects to a payment system. */
export function PaymentWalkthrough() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stop = STOPS[active];
  const [left, top, width, height] = stop.spot;

  const move = (to: number) => {
    const next = (to + STOPS.length) % STOPS.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Everyday payments" aria-orientation="vertical" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1 lg:gap-0 lg:border-t lg:border-stride-night/15">
          {STOPS.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`walk-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`walk-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(e) => {
                  if (["ArrowDown", "ArrowRight"].includes(e.key)) { e.preventDefault(); move(index + 1); }
                  if (["ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); move(index - 1); }
                  if (e.key === "Home") { e.preventDefault(); move(0); }
                  if (e.key === "End") { e.preventDefault(); move(STOPS.length - 1); }
                }}
                className={`group relative flex min-h-12 items-center gap-3 rounded-full px-4 text-left font-display font-bold transition-colors lg:min-h-16 lg:rounded-none lg:border-b lg:border-stride-night/15 lg:px-0 lg:text-xl ${selected ? "bg-stride-night text-white lg:bg-transparent lg:text-stride-night" : "bg-stride-mist text-stride-night/70 hover:text-stride-night lg:bg-transparent"}`}
              >
                <span aria-hidden className="tabular hidden w-8 text-sm text-stride-deep lg:block">0{index + 1}</span>
                {item.label}
                <svg viewBox="0 0 40 8" aria-hidden className={`ml-auto hidden h-2 fill-stride-deep transition-all duration-500 lg:block ${selected ? "w-16 opacity-100" : "w-0 opacity-0"}`} preserveAspectRatio="none">
                  <path d="M0 4 38 0a4 4 0 0 1 0 8Z" />
                </svg>
              </button>
            );
          })}
        </div>
        <div id={`walk-panel-${stop.id}`} role="tabpanel" aria-labelledby={`walk-tab-${stop.id}`} className="mt-8 min-h-[11rem]">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={stop.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
              <h3 className="display-sm">{stop.title}</h3>
              <p className="mt-3 max-w-md text-stride-night/80">{stop.body}</p>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative mx-auto h-[30rem] w-full max-w-[30rem] sm:h-[34rem] lg:col-span-6 lg:col-start-7 lg:max-w-none">
        <StageArc stroke="var(--color-stride-mist)" width={46} className="absolute top-6 left-1/2 w-[28rem] max-w-none -translate-x-1/2 sm:w-[32rem]" />
        <div className="absolute top-0 left-1/2 w-[58%] max-w-[16rem] -translate-x-[62%]">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div key={stop.screen.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <IPhone src={stop.screen.src} alt={stop.screen.alt} sizes="256px">
                <span
                  aria-hidden
                  className="absolute rounded-2xl ring-[3px] ring-sun transition-all duration-500 ease-out-soft"
                  style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
                />
              </IPhone>
            </m.div>
          </AnimatePresence>
        </div>
        <div aria-hidden className="absolute right-0 bottom-8 w-[44%] max-w-[13rem] sm:right-[4%]">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={stop.id} initial={{ opacity: 0, x: 24, rotate: 6 }} animate={{ opacity: 1, x: 0, rotate: 3 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              {stop.companion}
            </m.div>
          </AnimatePresence>
        </div>
        <p className="absolute right-0 -bottom-2 text-xs text-stride-night/70">{SAMPLE_NOTE}</p>
      </div>
    </div>
  );
}
