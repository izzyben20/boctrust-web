"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import Calendar from "react-calendar";
import {
  addDays,
  ASSUMPTIONS,
  CALCULATOR_MAX_DAYS,
  daysBetween,
  estimateFixedDeposit,
  formatLongDate,
  formatNaira,
  isEstimate,
  MIN_PRINCIPAL,
  MIN_TENOR_DAYS,
  NEGOTIABLE_FROM,
  type PayoutOption,
  RATE_GUIDE,
} from "@/lib/calculator/fixed-deposit";
import { ChevronRight } from "../ui/icons";

const noop = () => () => {};
const midnight = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
};

/** "Today" must come from the visitor's device, never from a prerendered build. */
const useToday = () => useSyncExternalStore(noop, midnight, () => null);

const SLIDER_STEPS = 1000;
const toSlider = (amount: number) =>
  Math.round((Math.log(Math.min(Math.max(amount, MIN_PRINCIPAL), NEGOTIABLE_FROM) / MIN_PRINCIPAL) / Math.log(NEGOTIABLE_FROM / MIN_PRINCIPAL)) * SLIDER_STEPS);
const fromSlider = (step: number) => {
  const raw = MIN_PRINCIPAL * Math.pow(NEGOTIABLE_FROM / MIN_PRINCIPAL, step / SLIDER_STEPS);
  return Math.round(raw / 10_000) * 10_000;
};

const QUICK_TERMS = RATE_GUIDE.tenorBands.map((b) => b.days);
const PAYOUTS = [
  ["maturity", "at maturity"],
  ["upfront", "upfront"],
] as const;

export function FixedDepositCalculator() {
  const today = useToday();
  return today === null ? <CalculatorSkeleton /> : <Calculator today={new Date(today)} />;
}

function CalculatorSkeleton() {
  return <div className="min-h-[36rem] animate-pulse rounded-[2rem] bg-fixed-mist" aria-label="Loading calculator" role="status" />;
}

function Calculator({ today }: { today: Date }) {
  const [amount, setAmount] = useState(1_000_000);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(() => addDays(today, 180));
  const [editing, setEditing] = useState<"start" | "end" | null>(null);
  const [payout, setPayout] = useState<PayoutOption>("maturity");

  const days = daysBetween(start, end);
  const result = useMemo(() => estimateFixedDeposit(amount, days, payout), [amount, days, payout]);

  const onDate = (value: unknown) => {
    if (!(value instanceof Date)) return;
    if (editing === "start") {
      setStart(value);
      setEnd(addDays(value, days));
    } else {
      setEnd(value);
    }
  };

  const minDate = editing === "start" ? today : addDays(start, MIN_TENOR_DAYS);
  const maxDate = editing === "start" ? addDays(today, 365) : addDays(start, CALCULATOR_MAX_DAYS);

  return (
    <div className="grid overflow-hidden rounded-[2rem] ring-1 ring-stride-night/10 lg:grid-cols-[1.25fr_1fr]">
      <div className="bg-white p-6 sm:p-10">
        <label htmlFor="fd-amount" className="font-display text-xl font-bold tracking-tight text-stride-night/70">I want to lock away</label>
        <div className="mt-2 flex items-baseline gap-1.5 border-b-2 border-fixed pb-1.5 focus-within:border-fixed-ink">
          <span aria-hidden className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight font-bold text-fixed-ink">₦</span>
          <input
            id="fd-amount"
            inputMode="numeric"
            autoComplete="off"
            value={amount ? amount.toLocaleString("en-NG") : ""}
            onChange={(e) => setAmount(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
            aria-describedby="fd-amount-help"
            className="tabular w-full min-w-0 bg-transparent font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight font-bold tracking-tight outline-none"
          />
        </div>
        <input
          type="range"
          aria-label="Adjust investment amount"
          aria-valuetext={formatNaira(amount, 0)}
          min={0}
          max={SLIDER_STEPS}
          value={toSlider(amount)}
          onChange={(e) => setAmount(fromSlider(Number(e.target.value)))}
          className="amount-range mt-2"
          style={{ "--fill": `${(toSlider(amount) / SLIDER_STEPS) * 100}%` } as React.CSSProperties}
        />
        <p id="fd-amount-help" className="flex justify-between text-xs text-stride-night/70">
          <span>₦100,000 minimum</span>
          <span>₦25M+ is negotiated</span>
        </p>

        <fieldset className="mt-8">
          <legend className="font-display text-xl font-bold tracking-tight text-stride-night/70">for</legend>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {QUICK_TERMS.map((term) => (
              <button
                key={term}
                type="button"
                aria-pressed={days === term}
                onClick={() => {
                  setEnd(addDays(start, term));
                  setEditing(null);
                }}
                className={`min-h-11 rounded-full px-4 font-display text-sm font-bold transition-colors ${days === term ? "bg-fixed-night text-white" : "bg-fixed-mist hover:bg-fixed/30"}`}
              >
                {term} days
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {(["start", "end"] as const).map((field) => (
            <button
              key={field}
              type="button"
              aria-expanded={editing === field}
              onClick={() => setEditing(editing === field ? null : field)}
              className="flex min-h-11 items-center gap-1.5 text-left"
            >
              <span className="text-stride-night/70">{field === "start" ? "From" : "Until"}</span>
              <span className="font-display font-bold underline decoration-fixed decoration-2 underline-offset-4">{formatLongDate(field === "start" ? start : end)}</span>
            </button>
          ))}
          <p className="tabular flex min-h-11 items-center text-stride-night/70">{days} days</p>
        </div>

        {editing && (
          <div className="mt-2 max-w-sm rounded-2xl p-2 ring-1 ring-stride-night/10">
            <Calendar
              key={editing}
              className="stride-calendar"
              locale="en-GB"
              value={editing === "start" ? start : end}
              onChange={onDate}
              minDate={minDate}
              maxDate={maxDate}
              minDetail="decade"
              prev2Label={null}
              next2Label={null}
              tileClassName={({ date, view }) => {
                if (view !== "month") return null;
                const fromStart = daysBetween(start, date);
                const toEnd = daysBetween(date, end);
                if (fromStart === 0 || toEnd === 0) return "term-edge";
                if (fromStart > 0 && toEnd > 0) return "in-term";
                return null;
              }}
            />
          </div>
        )}

        <fieldset className="mt-8">
          <legend className="font-display text-xl font-bold tracking-tight text-stride-night/70">and take my interest</legend>
          <div className="mt-2 inline-grid grid-cols-2 gap-1 rounded-full bg-fixed-mist p-1">
            {PAYOUTS.map(([value, label]) => (
              <label key={value} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full px-5 font-display text-sm font-bold transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-fixed-ink ${payout === value ? "bg-fixed-night text-white" : ""}`}>
                <input type="radio" name="payout" value={value} checked={payout === value} onChange={() => setPayout(value)} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div aria-live="polite" className="flex flex-col bg-fixed-night p-6 text-white sm:p-10">
        {isEstimate(result) ? (
          <>
            <p className="text-sm text-white/80">{payout === "upfront" ? "Estimated total you receive" : "Estimated maturity value"}</p>
            <p className="tabular mt-1 font-display text-[clamp(2.1rem,4vw,3.25rem)] leading-none font-bold tracking-tight">{formatNaira(result.totalReceived)}</p>
            <p className="mt-3 font-display text-lg font-bold text-fixed">+{formatNaira(result.interest)} <span className="font-sans text-sm font-normal text-white/80">estimated interest</span></p>

            <dl className="mt-8 border-t border-white/20 text-sm">
              <Row label="Rate" value={`${result.annualRate}% a year`} />
              <Row label="Principal" value={formatNaira(result.principal)} />
              <Row label="Term" value={`${result.days} days`} />
              {payout === "upfront" && <Row label={`Paid at start, ${formatLongDate(start)}`} value={formatNaira(result.paidAtStart)} />}
              <Row label={`Paid at maturity, ${formatLongDate(end)}`} value={formatNaira(result.paidAtMaturity)} />
            </dl>

            <details className="group mt-4 text-sm">
              <summary className="flex min-h-11 cursor-pointer items-center gap-2 font-display font-bold marker:content-none">
                <ChevronRight className="size-4 transition-transform group-open:rotate-90" /> What if I withdraw early?
              </summary>
              <dl className="mt-1">
                <Row label="Interest forfeited" value={formatNaira(result.earlyExit.interestForfeited)} />
                <Row label="5% penalty on principal" value={formatNaira(result.earlyExit.penalty)} />
                <Row label="Principal you'd get back" value={formatNaira(result.earlyExit.estimatedReturn)} />
              </dl>
              {payout === "upfront" && <p className="mt-2 text-white/75">With upfront interest, the interest you already received is deducted from your principal.</p>}
            </details>
          </>
        ) : (
          <NotEstimable kind={result.kind} amount={amount} />
        )}
        <p className="mt-auto pt-6 text-xs text-white/70">This is an estimate, not an offer or a guarantee. Final terms are confirmed by Boctrust when you make your deposit.</p>
      </div>

      <details className="group bg-fixed-mist p-6 text-sm sm:px-10 lg:col-span-2">
        <summary className="flex min-h-11 cursor-pointer items-center gap-2 font-display font-bold marker:content-none">
          <ChevronRight className="size-4 transition-transform group-open:rotate-90" /> How this estimate works
        </summary>
        <p className="mt-2 max-w-2xl text-stride-night/80">Rates come from the Boctrust Fixed Deposit Rate Guide. The guide does not spell out every detail of the calculation, so we have made these assumptions:</p>
        <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
          {ASSUMPTIONS.map((assumption) => (
            <li key={assumption} className="border-b border-stride-night/15 py-3">{assumption}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/20 py-2.5">
      <dt className="text-white/80">{label}</dt>
      <dd className="tabular shrink-0 text-right font-display font-bold">{value}</dd>
    </div>
  );
}

function NotEstimable({ kind, amount }: { kind: "below-minimum" | "term-too-short" | "negotiable"; amount: number }) {
  if (kind === "negotiable") {
    return (
      <>
        <p className="text-sm text-white/80">₦25 million and above</p>
        <p className="display-sm mt-2">This rate is negotiable.</p>
        <p className="mt-3 text-white/85">The rate guide doesn&apos;t list a figure for {formatNaira(amount, 0)}, so we won&apos;t guess one. Talk to us and we&apos;ll work it out with you.</p>
        <Link href="/contact" className="mt-5 inline-flex min-h-12 w-fit items-center rounded-full bg-white px-6 font-display font-bold text-fixed-night">Talk to Boctrust</Link>
      </>
    );
  }
  if (kind === "below-minimum") {
    return (
      <>
        <p className="text-sm text-white/80">Just a little more</p>
        <p className="display-sm mt-2">The minimum is ₦100,000.</p>
        <p className="mt-3 text-white/85">Enter ₦100,000 or more to see your estimate. For smaller sums, take a look at Boc Flex Savings.</p>
        <Link href="/cheetah/savings/flex" className="mt-4 inline-flex min-h-11 w-fit items-center font-display font-bold underline underline-offset-4">Explore Boc Flex Savings</Link>
      </>
    );
  }
  return (
    <>
      <p className="text-sm text-white/80">A little longer</p>
      <p className="display-sm mt-2">The shortest term is 30 days.</p>
      <p className="mt-3 text-white/85">Choose a maturity date at least 30 days after your start date.</p>
    </>
  );
}
