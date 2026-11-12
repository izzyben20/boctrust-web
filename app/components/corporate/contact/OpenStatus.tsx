"use client";

import { useSyncExternalStore } from "react";

const OPEN_HOUR = 9;
const CLOSE_HOUR = 17;

function currentStatus(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  const weekend = weekday === "Sat" || weekday === "Sun";
  if (!weekend && hour >= OPEN_HOUR && hour < CLOSE_HOUR) return "open";
  if (!weekend && hour < OPEN_HOUR) return "today";
  return weekend || weekday === "Fri" ? "monday" : "tomorrow";
}

const COPY: Record<string, string> = {
  open: "Our lines are open until 5pm",
  today: "Our lines open at 9am today",
  tomorrow: "Our lines open at 9am tomorrow",
  monday: "Our lines open at 9am on Monday",
};

const subscribe = (notify: () => void) => {
  const timer = setInterval(notify, 60_000);
  return () => clearInterval(timer);
};

/**
 * Worked out in Lagos time on the visitor's device, from the published hours.
 * It does not know about public holidays.
 */
export function OpenStatus({ className = "" }: { className?: string }) {
  const status = useSyncExternalStore(subscribe, currentStatus, () => null);
  return (
    <p className={`inline-flex min-h-10 items-center gap-2.5 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white ${className}`}>
      <span aria-hidden className="relative flex size-2.5">
        {status === "open" && <span className="absolute inset-0 animate-ping rounded-full bg-gold" />}
        <span className={`relative size-2.5 rounded-full ${status === "open" ? "bg-gold" : "bg-white/50"}`} />
      </span>
      {status ? COPY[status] : "Open 9am to 5pm, Monday to Friday"}
    </p>
  );
}
