"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Person } from "@/data/corporate/people";
import { CloseIcon, PlusIcon } from "../ui/icons";

/** A staggered portrait wall. Each portrait opens the person's full biography in a modal. */
export function LeaderGrid({ people, columns = 3 }: { people: Person[]; columns?: 3 | 4 }) {
  const [active, setActive] = useState<Person | null>(null);

  return (
    <>
      <ul className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 ${columns === 4 ? "lg:grid-cols-4" : "md:grid-cols-3"}`}>
        {people.map((person, index) => (
          <li key={person.slug} className={index % 2 === 1 ? "mt-10 md:mt-0" : ""} style={{ marginTop: undefined }}>
            <button type="button" onClick={() => setActive(person)} className={`group block w-full text-left ${(index % columns) % 2 === 1 ? "md:mt-16" : ""}`} aria-haspopup="dialog">
              <span className="relative block aspect-[4/5] overflow-hidden rounded-t-[50%] rounded-b-2xl bg-ivory">
                <Image
                  src={person.photo}
                  alt={`Portrait of ${person.name}`}
                  fill
                  sizes="(max-width: 768px) 46vw, 30vw"
                  className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-105"
                />
                <span aria-hidden className="absolute right-3 bottom-3 grid size-11 place-items-center rounded-full bg-gold text-navy transition-transform duration-300 group-hover:rotate-90">
                  <PlusIcon className="size-5" />
                </span>
              </span>
              <span className="mt-4 block font-display text-lg leading-tight font-bold tracking-tight text-navy sm:text-xl">{person.name}</span>
              <span className="mt-1 block text-sm text-ink-soft">{person.title}</span>
              {person.qualifications && <span className="mt-1 block text-xs text-gold-deep">{person.qualifications}</span>}
            </button>
          </li>
        ))}
      </ul>
      {active && <BioDialog person={active} onClose={() => setActive(null)} />}
    </>
  );
}

function BioDialog({ person, onClose }: { person: Person; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="bio-name"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-4xl overflow-hidden rounded-3xl bg-paper p-0 text-ink"
    >
      <div className="grid max-h-[92dvh] overflow-y-auto md:grid-cols-5">
        <div className="relative h-72 md:sticky md:top-0 md:col-span-2 md:h-full md:min-h-[30rem]">
          <Image src={person.photo} alt="" fill sizes="(max-width: 768px) 96vw, 340px" className="object-cover object-top" />
        </div>
        <div className="p-6 sm:p-10 md:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="bio-name" className="display-sm text-navy">{person.name}</h2>
              <p className="mt-1 text-sm font-semibold text-gold-deep">{person.title}</p>
              {person.qualifications && <p className="mt-1 text-xs text-ink-soft">{person.qualifications}</p>}
            </div>
            <button type="button" onClick={onClose} aria-label={`Close ${person.name}'s biography`} className="grid size-11 shrink-0 place-items-center rounded-full border border-rule">
              <CloseIcon className="size-4" />
            </button>
          </div>
          <div className="mt-6 grid gap-4 text-ink-soft">
            {person.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}
