"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CONSENT_CATEGORIES,
  GTM_ID,
  isGtmConfigured,
  type OptionalCategory,
  TAWK_EMBED_URL,
} from "@/config/consent";
import { CloseIcon } from "../../ui/icons";
import {
  ALL_DENIED,
  ALL_GRANTED,
  clearOptionalCookies,
  type ConsentChoices,
  getConsent,
  saveConsent,
  subscribeConsent,
} from "./consent-store";

export const OPEN_PREFERENCES_EVENT = "boctrust:open-cookie-preferences";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Google's consent API reads the raw `arguments` object, so the declared parameters go unused.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

const signals = (c: ConsentChoices) => ({
  analytics_storage: c.analytics ? "granted" : "denied",
  ad_storage: c.marketing ? "granted" : "denied",
  ad_user_data: c.marketing ? "granted" : "denied",
  ad_personalization: c.marketing ? "granted" : "denied",
  functionality_storage: c.functional ? "granted" : "denied",
});

function loadScriptOnce(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

const getServerConsent = () => null;

export function ConsentManager() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  // Stays false on the server and during hydration, so the banner never flashes for returning visitors.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const pathname = usePathname();
  const cheetah = pathname?.startsWith("/cheetah") ?? false;
  const [dialogOpen, setDialogOpen] = useState(false);
  const gtmLoaded = useRef(false);

  useEffect(() => {
    const open = () => setDialogOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  // No optional tag is requested until the matching consent exists.
  useEffect(() => {
    if (!consent) return;
    if (consent.analytics || consent.marketing) {
      if (isGtmConfigured() && !gtmLoaded.current) {
        gtag("consent", "default", signals(ALL_DENIED));
        gtag("consent", "update", signals(consent));
        window.dataLayer?.push({ "gtm.start": Date.now(), event: "gtm.js" });
        loadScriptOnce("gtm-script", `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
        gtmLoaded.current = true;
      } else if (gtmLoaded.current) {
        gtag("consent", "update", signals(consent));
      }
    }
    if (consent.functional) loadScriptOnce("tawk-script", TAWK_EMBED_URL);
  }, [consent]);

  const commit = (choices: ConsentChoices) => {
    const previous = getConsent();
    const withdrew =
      previous &&
      ((previous.analytics && !choices.analytics) ||
        (previous.marketing && !choices.marketing) ||
        (previous.functional && !choices.functional));
    if (gtmLoaded.current) gtag("consent", "update", signals(choices));
    if (withdrew) clearOptionalCookies();
    saveConsent(choices);
    setDialogOpen(false);
    // A running third-party script cannot be unloaded, so withdrawing needs a clean page.
    const scriptRunning = document.getElementById("gtm-script") || document.getElementById("tawk-script");
    if (withdrew && scriptRunning) window.location.reload();
  };

  const showBanner = hydrated && !consent && !dialogOpen;
  const theme = cheetah
    ? {
        panel: "bg-stride-night text-white",
        primary: "bg-sun text-stride-night hover:bg-white",
        secondary: "border-white/40 text-white hover:bg-white/10",
        link: "text-sun",
      }
    : {
        panel: "bg-navy text-white",
        primary: "bg-gold text-navy hover:bg-white",
        secondary: "border-white/40 text-white hover:bg-white/10",
        link: "text-gold",
      };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <m.section
            aria-label="Cookie consent"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-x-3 bottom-3 z-[70] max-h-[70dvh] overflow-y-auto rounded-3xl p-5 shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-[30rem] sm:p-7 ${theme.panel}`}
          >
            <h2 className="font-display text-xl font-bold tracking-tight">Your cookies, your call</h2>
            <p className="mt-2 text-sm text-white/80">
              We use necessary cookies to run this site. With your permission, we also use optional
              ones for live chat, analytics and marketing. Read our{" "}
              <Link href="/privacy" className={`underline underline-offset-2 ${theme.link}`}>
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-5 grid gap-2 xs:grid-cols-2">
              <button
                type="button"
                onClick={() => commit(ALL_GRANTED)}
                className={`min-h-12 rounded-full px-5 font-display text-sm font-bold transition-colors ${theme.primary}`}
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => commit(ALL_DENIED)}
                className={`min-h-12 rounded-full border px-5 font-display text-sm font-bold transition-colors ${theme.secondary}`}
              >
                Reject optional
              </button>
            </div>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className={`mt-3 min-h-11 w-full text-sm font-semibold underline underline-offset-2 ${theme.link}`}
            >
              Manage preferences
            </button>
          </m.section>
        )}
      </AnimatePresence>
      {dialogOpen && (
        <PreferencesDialog
          initial={consent ?? ALL_DENIED}
          cheetah={cheetah}
          onSave={commit}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
}

function PreferencesDialog({
  initial,
  cheetah,
  onSave,
  onClose,
}: {
  initial: ConsentChoices;
  cheetah: boolean;
  onSave: (c: ConsentChoices) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [choices, setChoices] = useState<ConsentChoices>({
    functional: initial.functional,
    analytics: initial.analytics,
    marketing: initial.marketing,
  });

  // showModal() supplies the focus trap, Esc handling and focus restoration.
  useEffect(() => {
    ref.current?.showModal();
  }, []);

  const on = cheetah ? "bg-stride-deep" : "bg-navy";

  return (
    <dialog
      ref={ref}
      aria-labelledby="cookie-title"
      onCancel={onClose}
      className="m-auto w-[calc(100vw-1.5rem)] max-w-xl rounded-3xl bg-paper p-0 text-ink shadow-2xl"
    >
      <div className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="cookie-title" className="display-sm text-navy">
              Cookie preferences
            </h2>
            <p className="mt-1 text-sm text-ink-soft">Change these whenever you like from the site footer.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cookie preferences"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-rule"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
        <ul className="mt-5 divide-y divide-rule border-y border-rule">
          {CONSENT_CATEGORIES.map((category) => {
            const required = !!category.required;
            const checked = required || choices[category.id as OptionalCategory];
            return (
              <li key={category.id} className="flex items-start justify-between gap-5 py-4">
                <div>
                  <label htmlFor={`consent-${category.id}`} className="font-display font-bold text-navy">
                    {category.label}
                  </label>
                  <p className="text-sm text-ink-soft">{category.description}</p>
                </div>
                <span className="relative mt-1 inline-flex shrink-0">
                  <input
                    id={`consent-${category.id}`}
                    type="checkbox"
                    role="switch"
                    checked={checked}
                    disabled={required}
                    onChange={(e) =>
                      setChoices((c) => ({ ...c, [category.id]: e.target.checked }))
                    }
                    className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  />
                  <span
                    aria-hidden
                    className={`flex h-7 w-12 items-center rounded-full p-1 transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy ${checked ? on : "bg-[#8a94a0]"} ${required ? "opacity-60" : ""}`}
                  >
                    <span
                      className={`size-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`}
                    />
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => onSave(choices)}
            className="min-h-12 rounded-full bg-navy px-4 font-display text-sm font-bold text-white sm:order-last"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={() => onSave(ALL_GRANTED)}
            className="min-h-12 rounded-full border border-navy px-4 font-display text-sm font-bold text-navy"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => onSave(ALL_DENIED)}
            className="min-h-12 rounded-full border border-navy px-4 font-display text-sm font-bold text-navy"
          >
            Reject optional
          </button>
        </div>
      </div>
    </dialog>
  );
}
