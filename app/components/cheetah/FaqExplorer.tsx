"use client";

import * as m from "motion/react-m";
import Link from "next/link";
import { type ReactNode, useMemo, useRef, useState } from "react";
import { CHEETAH_FAQ_CATEGORIES, type CheetahFaqCategoryId } from "@/data/faq/cheetah";
import { CheetahGlyph } from "../brand/CheetahMark";
import { Accordion } from "../shared/Accordion";
import { Enter } from "../shared/Enter";
import { CloseIcon, SearchIcon } from "../ui/icons";

type Filter = CheetahFaqCategoryId | "all";

const SUGGESTIONS = ["interest", "withdraw", "limit", "airtime"];
const TOTAL = CHEETAH_FAQ_CATEGORIES.reduce((sum, category) => sum + category.items.length, 0);

const tokenize = (query: string) => query.toLowerCase().split(/\s+/).filter(Boolean);
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function highlighter(tokens: string[]) {
  if (!tokens.length) return (text: string): ReactNode => text;
  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
  return (text: string): ReactNode =>
    text.split(pattern).map((part, index) =>
      index % 2 ? <mark key={index} className="rounded-sm bg-sun/70 text-inherit">{part}</mark> : part,
    );
}

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const input = useRef<HTMLInputElement>(null);
  const results = useRef<HTMLDivElement>(null);

  const tokens = useMemo(() => tokenize(query), [query]);
  const matches = useMemo(
    () =>
      CHEETAH_FAQ_CATEGORIES.map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const text = `${item.question} ${item.answer}`.toLowerCase();
          return tokens.every((token) => text.includes(token));
        }),
      })),
    [tokens],
  );
  const matchCount = matches.reduce((sum, category) => sum + category.items.length, 0);
  const visible = matches.filter((category) => category.items.length > 0 && (filter === "all" || filter === category.id));
  const renderText = useMemo(() => highlighter(tokens), [tokens]);

  const search = (value: string) => {
    setQuery(value);
    setFilter("all");
  };

  const choose = (next: Filter) => {
    setFilter(next);
    const top = results.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) results.current?.scrollIntoView({ block: "start" });
  };

  const options: { id: Filter; title: string; count: number }[] = [
    { id: "all", title: "All questions", count: matchCount },
    ...matches.map((category) => ({ id: category.id, title: category.title, count: category.items.length })),
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-stride-night text-white">
        <CheetahGlyph className="pointer-events-none absolute top-1/2 -right-[6%] -z-10 w-[58rem] max-w-none -translate-y-1/2 text-white/[0.05] max-lg:hidden" />
        <div className="wrap pt-28 pb-12 lg:pt-32 lg:pb-16">
          <Enter y={14}>
            <p className="eyebrow text-sun">Help centre</p>
          </Enter>
          <Enter delay={0.05}>
            <h1 className="display-page mt-3">Quick answers. Patient support.</h1>
            <p className="lede mt-3 max-w-xl text-white/85">Search {TOTAL} answers on signing up, saving, moving money and more.</p>
          </Enter>
          <Enter delay={0.12}>
            <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mt-7 max-w-2xl text-stride-night">
              <label htmlFor="faq-search" className="sr-only">Search questions and answers</label>
              <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-stride-deep" />
              <input
                ref={input}
                id="faq-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(e) => search(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") search("");
                }}
                placeholder="Try “Tier 2” or “withdraw”"
                className="min-h-15 w-full rounded-full bg-white pr-14 pl-13 text-lg outline-none placeholder:text-stride-night/65 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-sun [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    search("");
                    input.current?.focus();
                  }}
                  className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full hover:bg-stride-mist"
                >
                  <CloseIcon className="size-4" />
                </button>
              )}
            </form>
          </Enter>
        </div>
      </section>

      <div className="wrap grid grid-cols-1 gap-6 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-14 lg:pb-24">
        <nav aria-label="FAQ topics" className="sticky top-[5.25rem] z-30 -mx-[clamp(1.1rem,4vw,3.5rem)] min-w-0 self-start bg-white px-[clamp(1.1rem,4vw,3.5rem)] py-3 lg:top-24 lg:col-span-3 lg:mx-0 lg:bg-transparent lg:p-0">
          <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible">
            {options.map((option) => {
              const active = filter === option.id;
              return (
                <li key={option.id} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={active}
                    disabled={option.count === 0}
                    onClick={() => choose(option.id)}
                    className={`group flex min-h-11 w-full items-center justify-between gap-3 rounded-full px-4 text-left font-display text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 lg:min-h-12 lg:rounded-none lg:border-b lg:border-stride-night/15 lg:px-0 ${active ? "bg-stride-night text-white lg:bg-transparent lg:text-stride-night" : "bg-stride-mist lg:bg-transparent"}`}
                  >
                    <span className="flex items-center whitespace-nowrap lg:whitespace-normal">
                      <svg viewBox="0 0 24 8" aria-hidden className={`hidden h-2 shrink-0 fill-stride-deep transition-all duration-300 lg:block ${active ? "mr-2 w-6" : "w-0"}`} preserveAspectRatio="none">
                        <path d="M0 4 22 0a4 4 0 0 1 0 8Z" />
                      </svg>
                      {option.title}
                    </span>
                    <span className="tabular text-xs font-medium opacity-75">{option.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div ref={results} className="min-w-0 scroll-mt-40 lg:col-span-8 lg:col-start-5 lg:scroll-mt-28">
          <p role="status" className="min-h-6 text-sm text-stride-night/75">
            {tokens.length ? `${matchCount} ${matchCount === 1 ? "answer" : "answers"} for “${query.trim()}”` : ""}
          </p>

          {visible.length === 0 ? (
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-t-2 border-stride-night py-10">
              <h2 className="display-sm">We couldn&apos;t find that one.</h2>
              <p className="mt-2 max-w-md text-stride-night/80">Try a shorter word, pick a suggestion below, or get in touch and we&apos;ll help directly.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((word) => (
                  <li key={word}>
                    <button type="button" onClick={() => search(word)} className="min-h-11 rounded-full bg-stride-mist px-4 font-display text-sm font-bold transition-colors hover:bg-stride-sky">{word}</button>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center font-display text-sm font-bold underline underline-offset-4">Contact Boctrust</Link>
            </m.div>
          ) : (
            visible.map((category) => (
              <m.section
                key={category.id}
                aria-labelledby={`faq-${category.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12 border-t-2 border-stride-night pt-5 last:mb-0 lg:mb-16"
              >
                <h2 id={`faq-${category.id}`} className="display-sm">{category.title}</h2>
                <p className="mt-1 text-stride-night/75">{category.description}</p>
                <div className="mt-3">
                  <Accordion
                    key={tokens.join(" ")}
                    items={category.items}
                    defaultOpen={null}
                    keepMounted
                    renderText={renderText}
                    itemClassName="border-b border-stride-night/15"
                    questionClassName="font-display text-lg font-bold tracking-tight"
                    answerClassName="max-w-2xl pr-10 pb-5 text-stride-night/80"
                    iconClassName="size-9 border-stride-night/30"
                  />
                </div>
              </m.section>
            ))
          )}
        </div>
      </div>
    </>
  );
}
