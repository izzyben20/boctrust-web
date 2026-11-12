"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { type ReactNode, useId, useState } from "react";
import type { FaqItem } from "@/data/faq/types";
import { PlusIcon } from "../ui/icons";

type AccordionProps = {
  items: FaqItem[];
  /** Colour handling is inherited, so each experience can restyle the same behaviour. */
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  iconClassName?: string;
  defaultOpen?: number | null;
  /** Keeps closed answers in the HTML, so search engines can read a whole help centre. */
  keepMounted?: boolean;
  renderText?: (text: string) => ReactNode;
};

const TRANSITION = { duration: 0.32, ease: [0.22, 1, 0.36, 1] } as const;
const OPEN = { height: "auto", opacity: 1 };
const CLOSED = { height: 0, opacity: 0 };

export function Accordion({
  items,
  itemClassName = "border-b border-rule",
  questionClassName = "font-display text-lg font-bold tracking-tight sm:text-xl",
  answerClassName = "pb-6 pr-10 text-ink-soft",
  iconClassName = "size-9",
  defaultOpen = 0,
  keepMounted = false,
  renderText = (text) => text,
}: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <div>
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${id}-q-${index}`;
        const panelId = `${id}-a-${index}`;
        const answer = <p className={answerClassName}>{renderText(item.answer)}</p>;
        return (
          <div key={item.question} className={itemClassName}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className={`flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left ${questionClassName}`}
              >
                <span>{renderText(item.question)}</span>
                <span
                  aria-hidden
                  className={`grid shrink-0 place-items-center rounded-full border border-current transition-transform duration-300 ${iconClassName} ${expanded ? "rotate-45" : ""}`}
                >
                  <PlusIcon className="size-4" />
                </span>
              </button>
            </h3>
            {keepMounted ? (
              <m.div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!expanded}
                initial={false}
                animate={expanded ? OPEN : CLOSED}
                transition={TRANSITION}
                className="overflow-hidden"
              >
                {answer}
              </m.div>
            ) : (
              <AnimatePresence initial={false}>
                {expanded && (
                  <m.div id={panelId} role="region" aria-labelledby={buttonId} initial={CLOSED} animate={OPEN} exit={CLOSED} transition={TRANSITION} className="overflow-hidden">
                    {answer}
                  </m.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}
