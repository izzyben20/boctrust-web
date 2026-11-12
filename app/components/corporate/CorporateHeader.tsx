"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { type KeyboardEvent, useLayoutEffect, useRef, useState } from "react";
import { APP_LINKS } from "@/config/links";
import { CORPORATE_NAV, type NavItem } from "@/config/navigation";
import { verifiedClaims } from "@/config/regulatory";
import { SITE } from "@/config/site";
import { BoctrustLogo } from "../brand/BoctrustLogo";
import { CheetahMark } from "../brand/CheetahMark";
import { MobileMenu } from "../shared/navigation/MobileMenu";
import { focusSibling, useHoverMenu } from "../shared/navigation/useHoverMenu";
import { ArrowRight, ChevronDown, ChevronRight } from "../ui/icons";

const LIST_W = 320;
const FLY_W = 340;
const GUTTER = 16;
const SUB_HOVER_DELAY_MS = 110;

export function CorporateHeader() {
  const { open, setOpen, close, rootRef, handlePointerEnter, handlePointerLeave } = useHoverMenu<number>();
  const cbn = verifiedClaims().find((c) => c.id === "cbn");

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-md">
      <div className="hidden bg-navy text-[0.8rem] text-white/85 lg:block">
        <div className="wrap flex h-9 items-center justify-between">
          <span>{cbn ? `${SITE.legalName}. ${cbn.statement}.` : SITE.legalName}</span>
          <span className="flex items-center gap-6">
            <a href={SITE.contact.phones[0].href} className="hover:text-gold">{SITE.contact.phones[0].display}</a>
            <a href={`mailto:${SITE.contact.email}`} className="hover:text-gold">{SITE.contact.email}</a>
          </span>
        </div>
      </div>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-3 xl:gap-6">
        <Link href="/" aria-label="Boctrust home" className="shrink-0">
          <BoctrustLogo className="h-11 w-auto sm:h-12 lg:h-10 xl:h-12" decorative />
        </Link>

        <nav
          aria-label="Main"
          ref={rootRef}
          className="hidden lg:block"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) close();
          }}
        >
          <ul className="flex items-center gap-1 xl:gap-2">
            {CORPORATE_NAV.map((item, index) =>
              item.children ? (
                <DesktopGroup
                  key={item.label}
                  item={item}
                  isOpen={open === index}
                  onToggle={() => setOpen(open === index ? null : index)}
                  onOpen={() => setOpen(index)}
                  onClose={close}
                  onPointerEnter={(e) => handlePointerEnter(e, index)}
                  onPointerLeave={handlePointerLeave}
                />
              ) : (
                <li key={item.label}>
                  <Link href={item.href ?? "#"} className="flex min-h-12 items-center rounded-full px-2.5 font-display text-sm font-bold whitespace-nowrap text-navy transition-colors hover:bg-ivory xl:px-4 xl:text-base">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={APP_LINKS.boctrust.login} className="flex min-h-12 items-center rounded-full px-3 font-display text-sm font-bold whitespace-nowrap text-navy transition-colors hover:bg-ivory xl:px-4 xl:text-base">
            Login
          </a>
          <a href={APP_LINKS.boctrust.signup} className="flex min-h-12 items-center gap-2 rounded-full bg-navy px-4 font-display text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-gold hover:text-navy xl:px-5 xl:text-base">
            Get started
          </a>
        </div>

        <div className="lg:hidden">
          <MobileMenu
            items={CORPORATE_NAV}
            logo={<BoctrustLogo className="h-10 w-auto" />}
            theme={{
              panel: "bg-paper text-navy",
              rule: "border-rule",
              muted: "text-ink-soft",
              control: "bg-ivory text-navy",
              trigger: "bg-navy text-white",
            }}
            footer={
              <div className="grid grid-cols-2 gap-2">
                <a href={APP_LINKS.boctrust.login} className="flex min-h-13 items-center justify-center rounded-full border border-navy font-display font-bold">
                  Login
                </a>
                <a href={APP_LINKS.boctrust.signup} className="flex min-h-13 items-center justify-center rounded-full bg-navy font-display font-bold text-white">
                  Get started
                </a>
              </div>
            }
          />
        </div>
      </div>
    </header>
  );
}

type GroupProps = {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  onPointerEnter: (e: React.PointerEvent) => void;
  onPointerLeave: (e: React.PointerEvent) => void;
};

function DesktopGroup({ item, isOpen, onToggle, onOpen, onClose, onPointerEnter, onPointerLeave }: GroupProps) {
  const liRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const intentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeSub, setActiveSub] = useState<number | null>(null);
  const [layout, setLayout] = useState<{ left: number; flip: boolean }>({ left: 0, flip: false });
  const hasFlyouts = item.children?.some((c) => c.children);
  const panelWidth = hasFlyouts ? LIST_W + FLY_W : LIST_W;

  /** Keeps the panel inside the viewport: open right if it fits, else flip the flyout left, else shift. */
  useLayoutEffect(() => {
    if (!isOpen || !liRef.current) return;
    const place = () => {
      const li = liRef.current?.getBoundingClientRect();
      if (!li) return;
      const vw = document.documentElement.clientWidth;
      const fitsRight = li.left + panelWidth <= vw - GUTTER;
      if (fitsRight) return setLayout({ left: 0, flip: false });
      // Keep the list under the trigger and open the flyout towards the free side.
      if (hasFlyouts && li.right - panelWidth >= GUTTER) {
        return setLayout({ left: li.width - panelWidth, flip: true });
      }
      setLayout({ left: Math.min(0, vw - GUTTER - panelWidth - li.left), flip: false });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [isOpen, panelWidth, hasFlyouts]);

  const focusFirst = () =>
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[data-menu-item]")?.focus());

  const onTriggerKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onOpen();
      focusFirst();
    }
    if (e.key === "Escape") onClose();
  };

  const onPanelKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const inFlyout = (e.target as HTMLElement).closest("[data-flyout]");
    const scope = inFlyout ?? panelRef.current?.querySelector("[data-list]");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      focusSibling(scope as HTMLElement, e.target as Element, e.key === "ArrowDown" ? 1 : -1);
    }
    if (e.key === "Escape") {
      e.stopPropagation();
      if (inFlyout) {
        const parent = panelRef.current?.querySelector<HTMLElement>(`[data-sub="${activeSub}"]`);
        setActiveSub(null);
        parent?.focus();
      } else {
        onClose();
        triggerRef.current?.focus();
      }
    }
    if (e.key === "ArrowLeft" && inFlyout) {
      e.preventDefault();
      const parent = panelRef.current?.querySelector<HTMLElement>(`[data-sub="${activeSub}"]`);
      setActiveSub(null);
      parent?.focus();
    }
  };

  /** The flyout mounts after the previous one animates out, so wait for it before moving focus. */
  const focusFlyout = (label: string, frames = 40) => {
    const el = panelRef.current?.querySelector<HTMLElement>(`[data-flyout="${label}"] [data-menu-item]`);
    if (el) el.focus();
    else if (frames > 0) requestAnimationFrame(() => focusFlyout(label, frames - 1));
  };

  /** A short delay stops a diagonal path to the flyout from switching to the rows it crosses. */
  const hoverSub = (index: number | null) => {
    if (intentTimer.current) clearTimeout(intentTimer.current);
    intentTimer.current = setTimeout(() => setActiveSub(index), activeSub === null ? 0 : SUB_HOVER_DELAY_MS);
  };
  const holdFlyout = () => {
    if (intentTimer.current) clearTimeout(intentTimer.current);
  };

  const openSub = activeSub === null ? null : item.children?.[activeSub];

  return (
    <li ref={liRef} className="relative" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={onTriggerKey}
        className={`flex min-h-12 items-center gap-1 rounded-full px-2.5 font-display text-sm font-bold whitespace-nowrap text-navy transition-colors xl:px-4 xl:text-base ${isOpen ? "bg-ivory" : "hover:bg-ivory"}`}
      >
        {item.label}
        <ChevronDown className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence onExitComplete={() => setActiveSub(null)}>
        {isOpen && (
          // The top padding is an invisible bridge from trigger to panel, so hovering never drops.
          <m.div
            ref={panelRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ left: layout.left }}
            onKeyDown={onPanelKey}
            className="absolute top-full z-50 pt-3"
          >
            <div className={`flex overflow-hidden rounded-3xl border border-rule bg-paper shadow-[0_30px_70px_-20px_rgb(12_28_47/0.4)] ${layout.flip ? "flex-row-reverse" : ""}`}>
              <ul data-list style={{ width: LIST_W }} className="shrink-0 p-3">
                {item.children?.map((child, i) => (
                  <li key={child.label}>
                    <PanelEntry
                      item={child}
                      subIndex={i}
                      active={activeSub === i}
                      onHoverLeaf={() => hoverSub(null)}
                      onActivate={() => setActiveSub(activeSub === i ? null : i)}
                      onHover={() => hoverSub(i)}
                      onEnterFlyout={() => {
                        setActiveSub(i);
                        focusFlyout(child.label);
                      }}
                      onNavigate={onClose}
                    />
                  </li>
                ))}
              </ul>
              {hasFlyouts && (
                <div style={{ width: FLY_W }} onPointerEnter={holdFlyout} className="shrink-0 bg-ivory">
                  <AnimatePresence mode="wait" initial={false}>
                    {openSub?.children ? (
                      <m.div
                        key={openSub.label}
                        data-flyout={openSub.label}
                        initial={{ opacity: 0, x: layout.flip ? 12 : -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="p-3"
                      >
                        <p className="eyebrow px-3 pt-2 pb-3 text-gold-deep">{openSub.label}</p>
                        <ul>
                          {openSub.children.map((leaf) => (
                            <li key={leaf.label}>
                              <Link
                                data-menu-item
                                href={leaf.href ?? "#"}
                                onClick={onClose}
                                className="block rounded-2xl px-3 py-2.5 transition-colors hover:bg-paper focus-visible:bg-paper"
                              >
                                <span className="block font-display font-bold text-navy">{leaf.label}</span>
                                <span className="block text-sm text-ink-soft">{leaf.description}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </m.div>
                    ) : (
                      <m.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col justify-end p-6">
                        <p className="display-sm text-navy">{SITE.tagline}</p>
                        <p className="mt-1 text-sm text-ink-soft">Point at a category to see what is inside.</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

type EntryProps = {
  item: NavItem;
  subIndex: number;
  active: boolean;
  onHover: () => void;
  onHoverLeaf: () => void;
  onActivate: () => void;
  onEnterFlyout: () => void;
  onNavigate: () => void;
};

function PanelEntry({ item, subIndex, active, onHover, onHoverLeaf, onActivate, onEnterFlyout, onNavigate }: EntryProps) {
  if (item.children) {
    return (
      <button
        type="button"
        data-menu-item
        data-sub={subIndex}
        aria-expanded={active}
        onClick={onActivate}
        onPointerEnter={(e) => e.pointerType === "mouse" && onHover()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onEnterFlyout();
          }
        }}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${active ? "bg-ivory" : "hover:bg-ivory"}`}
      >
        <span>
          <span className="block font-display font-bold text-navy">{item.label}</span>
          <span className="block text-sm text-ink-soft">{item.description}</span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-navy" />
      </button>
    );
  }
  if (item.featured) {
    return (
      <Link
        data-menu-item
        href={item.href ?? "#"}
        onClick={onNavigate}
        onPointerEnter={(e) => e.pointerType === "mouse" && onHoverLeaf()}
        className="group mt-2 flex items-center gap-3 rounded-2xl bg-navy p-3 text-white"
      >
        <CheetahMark colorway="navyGold" className="size-11 shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block font-display font-bold">{item.label}</span>
          <span className="block text-sm text-white/75">{item.description}</span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
      </Link>
    );
  }
  return (
    <Link
      data-menu-item
      href={item.href ?? "#"}
      onClick={onNavigate}
      onPointerEnter={(e) => e.pointerType === "mouse" && onHoverLeaf()}
      className="block rounded-2xl px-3 py-2.5 transition-colors hover:bg-ivory focus-visible:bg-ivory"
    >
      <span className="block font-display font-bold text-navy">{item.label}</span>
      <span className="block text-sm text-ink-soft">{item.description}</span>
    </Link>
  );
}
