"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ACCOUNT_TIERS, CHEETAH_PRODUCT_LIST } from "@/data/cheetah/products";
import { APP_CROPS, SAMPLE_NOTE, SCREENS } from "@/data/cheetah/screens";
import { Reveal } from "../shared/Reveal";
import { IPhone } from "./IPhone";
import { StepChoose, StepDownload, StepGrow, StepVerify } from "./art";

const STEPS = [
  { title: "Download Cheetah", body: "Get the app from the App Store or Google Play.", Icon: StepDownload, screen: SCREENS.home },
  { title: "Create and verify your account", body: "Register, add your details and complete identity verification. Your tier sets your limits, and you can step up when you're ready.", Icon: StepVerify, screen: SCREENS.home },
  { title: "Choose your savings plan", body: "Pick the plan that fits your goal, or use all four.", Icon: StepChoose, screen: SCREENS.home },
  { title: "Start saving and growing", body: "Add money, start saving and manage it all from the app.", Icon: StepGrow, screen: SCREENS.flex },
];

export function GettingStarted({ children }: { children?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.current.indexOf(entry.target as HTMLLIElement));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="start-heading" className="bg-stride-mist">
      <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <p className="eyebrow text-stride-deep">Getting started</p>
              <h2 id="start-heading" className="display-md mt-3">From download to saving, in four steps.</h2>
            </Reveal>
            <div className="relative mx-auto mt-8 hidden h-[29rem] w-[14.5rem] overflow-hidden lg:block">
              {[SCREENS.home, SCREENS.flex].map((screen) => (
                <IPhone
                  key={screen.src}
                  {...screen}
                  sizes="232px"
                  shadow={false}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ${STEPS[active].screen === screen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                />
              ))}
            </div>
            <p className="mt-4 hidden text-center text-xs text-stride-night/70 lg:block">{SAMPLE_NOTE}</p>
          </div>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden className="absolute top-3 bottom-16 left-[1.45rem] w-0.5 bg-stride/40" />
          {STEPS.map(({ title, body, Icon }, index) => (
            <li
              key={title}
              ref={(node) => {
                items.current[index] = node;
              }}
              className="relative grid grid-cols-[3rem_1fr] gap-x-5 pb-12 last:pb-0 lg:pb-16"
            >
              <span className={`relative z-10 grid size-12 place-items-center rounded-2xl transition-colors duration-300 ${active === index ? "bg-stride-night text-sun" : "bg-white text-stride-deep"}`}>
                <Icon className="size-7" />
              </span>
              <div>
                <p className="tabular text-xs font-bold text-stride-deep">Step {index + 1}</p>
                <h3 className="display-sm mt-1">{title}</h3>
                <p className="mt-2 max-w-md text-stride-night/80">{body}</p>
                {index === 0 && children ? <div className="mt-5">{children}</div> : null}
                {index === 1 && (
                  <>
                    <div className="mt-5 overflow-hidden rounded-3xl lg:hidden">
                      <Image src={APP_CROPS.tiers.src} width={APP_CROPS.tiers.width} height={APP_CROPS.tiers.height} alt={APP_CROPS.tiers.alt} sizes="90vw" className="h-auto w-full" />
                    </div>
                    <dl className="mt-5 divide-y divide-stride-night/15 border-y border-stride-night/15 text-sm">
                      {ACCOUNT_TIERS.map((tier) => (
                        <div key={tier.tier} className="grid gap-x-4 py-3 sm:grid-cols-[4rem_1fr]">
                          <dt className="font-display font-bold">{tier.tier}</dt>
                          <dd className="text-stride-night/80">
                            {tier.needs}.{" "}
                            <span className="font-medium text-stride-night">Per transaction: {tier.single}. Balance: {tier.balance}.</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}
                {index === 2 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {CHEETAH_PRODUCT_LIST.map((product) => (
                      <li key={product.slug}>
                        <Link href={product.href} className="flex min-h-11 items-center rounded-full bg-white px-4 font-display text-sm font-bold transition-colors hover:bg-stride-night hover:text-white">
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {index === 3 && (
                  <div className="mt-5 w-[60%] max-w-[13rem] lg:hidden">
                    <IPhone {...SCREENS.flex} sizes="208px" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
