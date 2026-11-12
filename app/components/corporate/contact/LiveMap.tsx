"use client";

import { useState } from "react";
import { SITE } from "@/config/site";
import { CloseIcon, PinIcon } from "../../ui/icons";

/**
 * Google Maps can set third-party cookies, so nothing loads from Google until the visitor asks.
 * The branded map underneath needs no third party at all.
 */
export function LiveMap() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute top-3 right-3 z-20 flex min-h-12 items-center gap-2 rounded-full bg-paper px-5 font-display text-sm font-bold text-navy shadow-xl transition-colors hover:bg-gold sm:top-auto sm:right-5 sm:bottom-5"
      >
        <PinIcon className="size-4" /> Explore the live map
      </button>
    );
  }

  return (
    <div className="absolute inset-0 z-30 bg-navy-deep">
      <iframe
        title={`Google Map showing ${SITE.name}, ${SITE.contact.address}`}
        src={SITE.contact.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute bottom-6 left-1/2 flex min-h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-navy px-5 font-display text-sm font-bold text-white shadow-xl"
      >
        <CloseIcon className="size-4" /> Close live map
      </button>
    </div>
  );
}
