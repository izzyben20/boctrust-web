'use client';

import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useRef, useState } from 'react';
import type { NavItem } from '@/config/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  CloseIcon,
  MenuIcon,
} from '../../ui/icons';

type Theme = {
  /** Panel surface and text */
  panel: string;
  /** Hairlines between rows */
  rule: string;
  /** Muted descriptive text */
  muted: string;
  /** Round control buttons */
  control: string;
  trigger: string;
};

type Props = {
  items: NavItem[];
  theme: Theme;
  logo: ReactNode;
  footer?: ReactNode;
};

/**
 * A touch-first drill-down menu built with the native <dialog>, which supplies the focus trap, Esc
 * and focus return. Levels slide in rather than expand. A tap outside can never dismiss it.
 */
export function MobileMenu({ items, theme, logo, footer }: Props) {
  const [open, setOpen] = useState(false);
  const [trail, setTrail] = useState<NavItem[]>([]);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const openMenu = () => {
    setOpen(true);
    dialog.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
  };
  const close = () => {
    setOpen(false);
    setTrail([]);
    dialog.current?.close();
    document.documentElement.style.overflow = '';
  };
  const forward = (item: NavItem) => {
    setDirection(1);
    setTrail((t) => [...t, item]);
  };
  const back = () => {
    setDirection(-1);
    setTrail((t) => t.slice(0, -1));
  };

  const level = trail.at(-1);
  const rows = level?.children ?? items;
  const key = trail.map((t) => t.label).join('/') || 'root';

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open menu"
        onClick={openMenu}
        className={`grid size-12 place-items-center rounded-full ${theme.trigger}`}
      >
        <MenuIcon className="size-6" />
      </button>

      <dialog
        ref={dialog}
        aria-label="Site menu"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        className={`fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden p-0 ${theme.panel}`}
      >
        {open && (
          <div className="flex h-full flex-col">
            <div
              className={`flex items-center justify-between gap-3 border-b px-5 py-3 ${theme.rule}`}
            >
              {level ? (
                <button
                  type="button"
                  onClick={back}
                  className={`flex min-h-12 items-center gap-2 rounded-full pr-4 pl-3 font-display font-bold ${theme.control}`}
                >
                  <ArrowLeft className="size-5" /> Back
                </button>
              ) : (
                <span onClick={close}>{logo}</span>
              )}
              <button
                type="button"
                aria-label="Close menu"
                onClick={close}
                className={`grid size-12 shrink-0 place-items-center rounded-full ${theme.control}`}
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <nav
              aria-label={level?.label ?? 'Main'}
              className="relative flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <m.div
                  key={key}
                  initial={{ x: direction * 44, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction * -44, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 pt-4 pb-8"
                >
                  {level && (
                    <h2 className="mb-2 font-display text-3xl font-black tracking-tight">
                      {level.label}
                    </h2>
                  )}
                  <ul>
                    {rows.map((item) => (
                      <li key={item.label} className={`border-b ${theme.rule}`}>
                        {item.children ? (
                          <button
                            type="button"
                            onClick={() => forward(item)}
                            className="flex min-h-16 w-full items-center justify-between gap-4 py-3 text-left"
                          >
                            <RowText item={item} muted={theme.muted} />
                            <ChevronRight className="size-5 shrink-0" />
                          </button>
                        ) : item.external ? (
                          <a
                            href={item.href}
                            onClick={close}
                            className="flex min-h-16 items-center justify-between gap-4 py-3"
                          >
                            <RowText item={item} muted={theme.muted} />
                            <ArrowUpRight className="size-5 shrink-0" />
                          </a>
                        ) : (
                          <Link
                            href={item.href ?? '#'}
                            onClick={close}
                            aria-current={
                              item.href === pathname ? 'page' : undefined
                            }
                            className="flex min-h-16 items-center justify-between gap-4 py-3"
                          >
                            <RowText item={item} muted={theme.muted} />
                            {item.href === pathname && (
                              <span
                                aria-hidden
                                className="size-2.5 shrink-0 rounded-full bg-current"
                              />
                            )}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </m.div>
              </AnimatePresence>
            </nav>

            {/* The footer is passed in by each header, so its links carry no close handler of their own. */}
            {footer && (
              <div
                onClick={(e) => {
                  if ((e.target as Element).closest('a')) close();
                }}
                className={`border-t px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] ${theme.rule}`}
              >
                {footer}
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

function RowText({ item, muted }: { item: NavItem; muted: string }) {
  return (
    <span>
      <span className="block font-display text-xl font-bold tracking-tight">
        {item.label}
      </span>
      {item.description && (
        <span className={`block text-sm ${muted}`}>{item.description}</span>
      )}
    </span>
  );
}
