import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_VERSION,
  type OptionalCategory,
} from "@/config/consent";

export type ConsentChoices = Record<OptionalCategory, boolean>;
export type ConsentRecord = ConsentChoices & { v: number; at: string };

export const ALL_GRANTED: ConsentChoices = { functional: true, analytics: true, marketing: true };
export const ALL_DENIED: ConsentChoices = { functional: false, analytics: false, marketing: false };

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedRecord: ConsentRecord | null = null;

function readCookie(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  return match ? match[1] : null;
}

/** A stored choice from an older consent version counts as no choice. */
export function getConsent(): ConsentRecord | null {
  const raw = readCookie();
  if (raw === cachedRaw) return cachedRecord;
  cachedRaw = raw;
  cachedRecord = null;
  if (raw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(raw)) as ConsentRecord;
      if (parsed.v === CONSENT_VERSION) cachedRecord = parsed;
    } catch {
      /* A corrupt cookie is treated as no choice. */
    }
  }
  return cachedRecord;
}

export function saveConsent(choices: ConsentChoices): void {
  const record: ConsentRecord = { ...choices, v: CONSENT_VERSION, at: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}; Path=/; Max-Age=${
    CONSENT_MAX_AGE_DAYS * 86_400
  }; SameSite=Lax${secure}`;
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Removes cookies set by analytics and marketing tags once permission is withdrawn. */
export function clearOptionalCookies(): void {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0];
    if (/^(_ga|_gid|_gat|_gcl|_fbp|_fbc|_uet|__utm|TawkConnectionTime|twk_)/.test(name)) {
      for (const domain of domains) {
        document.cookie = `${name}=; Path=/; Max-Age=0${domain ? `; Domain=${domain}` : ""}`;
      }
    }
  }
}
