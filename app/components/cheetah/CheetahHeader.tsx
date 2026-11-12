"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useRef } from "react";
import { APP_LINKS, isLiveLink } from "@/config/links";
import { CHEETAH_NAV, type NavItem } from "@/config/navigation";
import { CHEETAH_PRODUCTS, type CheetahProductSlug } from "@/data/cheetah/products";
import { CheetahLockup } from "../brand/CheetahMark";
import { MobileMenu } from "../shared/navigation/MobileMenu";
import { focusSibling, useHoverMenu } from "../shared/navigation/useHoverMenu";
import FlexSVG from "../svg/FlexSVG";
import PadiSVG from "../svg/PadiSVG";
import SmartSaveSVG from "../svg/SmartSaveSVG";
import VaultIconSVG from "../svg/VaultSVG";
import { ArrowLeft, ArrowRight, ChevronDown } from "../ui/icons";

const PRODUCT_TILES: Record<CheetahProductSlug, { Icon: React.FC<React.SVGProps<SVGSVGElement>>; tile: string }> = {
  fixed: { Icon: VaultIconSVG, tile: "bg-fixed-mist" },
  smartsave: { Icon: SmartSaveSVG, tile: "bg-smart-mist" },
  flex: { Icon: FlexSVG, tile: "bg-flex-mist" },
  padi: { Icon: PadiSVG, tile: "bg-padi-mist" },
};

const hrefToSlug = (href = "") => href.split("/").pop() as CheetahProductSlug;

export function CheetahHeader() {
  const { open, setOpen, close, rootRef, handlePointerEnter, handlePointerLeave } = useHoverMenu<number>();
  const hasWebLogin = isLiveLink(APP_LINKS.cheetah.webLogin);
  const pathname = usePathname();

  return (
    <div className="sticky top-3 z-50 px-3">
      <header className="mx-auto flex h-17 max-w-352 items-center justify-between gap-4 rounded-full bg-white/90 pr-2.5 pl-4 shadow-[0_8px_34px_-12px_rgb(16_31_51/0.35)] ring-1 ring-stride-night/5 backdrop-blur-md sm:pl-5">
        <Link href="/cheetah" aria-label="Cheetah by Boctrust home" className="shrink-0">
          <CheetahLockup />
        </Link>

        <nav
          aria-label="Cheetah"
          ref={rootRef}
          className="hidden lg:block"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) close();
          }}
        >
          <ul className="flex items-center gap-1">
            {CHEETAH_NAV.map((item, index) =>
              item.children ? (
                <SavingsMenu
                  active={pathname.startsWith("/cheetah/savings")}
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
                  <Link
                    href={item.href ?? "#"}
                    aria-current={item.href === pathname ? "page" : undefined}
                    className="flex min-h-12 items-center rounded-full px-3.5 font-display font-bold whitespace-nowrap text-stride-night transition-colors hover:bg-stride-mist aria-[current=page]:bg-stride-mist aria-[current=page]:text-stride-deep xl:px-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/" className="flex min-h-12 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-stride-night hover:bg-stride-mist">
            <ArrowLeft className="size-4" /> Boctrust
          </Link>
          {hasWebLogin && (
            <a href={APP_LINKS.cheetah.webLogin} className="flex min-h-12 items-center rounded-full px-4 font-display font-bold text-stride-night hover:bg-stride-mist">
              Log in
            </a>
          )}
          <Link href="/cheetah/get-app" className="flex min-h-12 items-center rounded-full bg-stride-night px-6 font-display font-bold text-white transition-colors hover:bg-stride-deep">
            Get the app
          </Link>
        </div>

        <div className="lg:hidden">
          <MobileMenu
            items={[...CHEETAH_NAV, { label: "Boctrust corporate site", href: "/" }]}
            logo={<CheetahLockup />}
            theme={{
              panel: "bg-stride-mist text-stride-night",
              rule: "border-stride-night/15",
              muted: "text-stride-night/70",
              control: "bg-white text-stride-night",
              trigger: "bg-stride-night text-white",
            }}
            footer={
              <Link href="/cheetah/get-app" className="flex min-h-13 items-center justify-center rounded-full bg-stride-night font-display font-bold text-white">
                Get the app
              </Link>
            }
          />
        </div>
      </header>
    </div>
  );
}

type MenuProps = {
  item: NavItem;
  isOpen: boolean;
  /** The current page is one of this menu's destinations. */
  active: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  onPointerEnter: (e: React.PointerEvent) => void;
  onPointerLeave: (e: React.PointerEvent) => void;
};

function SavingsMenu({ item, active, isOpen, onToggle, onOpen, onClose, onPointerEnter, onPointerLeave }: MenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const onPanelKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusSibling(panel.current, e.target as Element, 1);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusSibling(panel.current, e.target as Element, -1);
    }
    if (e.key === "Escape") {
      onClose();
      trigger.current?.focus();
    }
  };

  return (
    <li className="relative" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <button
        ref={trigger}
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            onOpen();
            requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("[data-menu-item]")?.focus());
          }
          if (e.key === "Escape") onClose();
        }}
        className={`flex min-h-12 items-center gap-1 rounded-full px-3.5 font-display font-bold text-stride-night transition-colors xl:px-4 ${isOpen || active ? "bg-stride-mist" : "hover:bg-stride-mist"} ${active ? "text-stride-deep" : ""}`}
      >
        {item.label}
        <ChevronDown className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={panel}
            onKeyDown={onPanelKey}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 z-50 w-[42rem] origin-top -translate-x-1/2 pt-5"
          >
            <ul className="grid grid-cols-2 gap-2 rounded-[1.75rem] bg-white p-3 shadow-[0_30px_70px_-20px_rgb(16_31_51/0.45)] ring-1 ring-stride-night/5">
              {item.children?.map((child) => {
                const slug = hrefToSlug(child.href);
                const { Icon, tile } = PRODUCT_TILES[slug];
                return (
                  <li key={child.label}>
                    <Link data-menu-item href={child.href ?? "#"} onClick={onClose} className={`group flex items-center gap-3 rounded-2xl p-3 ${tile}`}>
                      <span className="grid size-13 shrink-0 place-items-center rounded-xl bg-white">
                        <Icon className="h-auto w-7" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display font-bold text-stride-night">{CHEETAH_PRODUCTS[slug].name}</span>
                        <span className="block text-sm text-stride-night/75">{child.description}</span>
                      </span>
                      <ArrowRight className="ml-auto size-4 shrink-0 text-stride-night opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}
