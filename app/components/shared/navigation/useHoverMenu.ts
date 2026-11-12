"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const CLOSE_DELAY_MS = 180;

/**
 * Desktop menu behaviour shared by both websites:
 * opens on mouse hover and on click; a short close delay stops flicker as the pointer crosses
 * from trigger to panel; touch pointers are ignored here, so taps act as plain clicks.
 */
export function useHoverMenu<T extends string | number>() {
  const [open, setOpen] = useState<T | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  const cancelClose = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(null), CLOSE_DELAY_MS);
  }, [cancelClose]);

  const close = useCallback(() => {
    cancelClose();
    setOpen(null);
  }, [cancelClose]);

  // Close when clicking elsewhere.
  useEffect(() => {
    if (open === null) return;
    const onDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, close]);

  // A kept-alive route must not reappear with its menu open (Cache Components uses <Activity>).
  useLayoutEffect(() => () => close(), [close]);

  const handlePointerEnter = useCallback(
    (event: React.PointerEvent, key: T) => {
      if (event.pointerType !== "mouse") return;
      cancelClose();
      setOpen(key);
    },
    [cancelClose],
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      scheduleClose();
    },
    [scheduleClose],
  );

  return { open, setOpen, close, rootRef, handlePointerEnter, handlePointerLeave };
}

/** Moves focus through the links and buttons inside a panel with the arrow keys. */
export function focusSibling(container: HTMLElement | null, current: Element | null, step: 1 | -1) {
  if (!container) return;
  const items = [...container.querySelectorAll<HTMLElement>("[data-menu-item]")];
  if (!items.length) return;
  const index = items.indexOf(current as HTMLElement);
  items[(index + step + items.length) % items.length]?.focus();
}
