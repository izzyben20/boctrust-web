/**
 * Boc Fixed Savings estimator.
 *
 * SOURCE OF RATES: "FIXED DEPOSIT RATE GUIDE.docx", transcribed exactly below.
 * SOURCE OF RULES: "Technical Integration, Operational Specifications & Feedback" (27 July 2026), s.8.
 *
 * Neither document states the following. Each is an assumption and is disclosed to the user
 * in the calculator (see ASSUMPTIONS). Boctrust should confirm or correct them:
 *  1. Rates are per annum.
 *  2. Interest is simple, on an actual/365 day count.
 *  3. A tenor between two published bands earns the rate of the band it has reached.
 *  4. Tier gaps such as ₦499,000–₦500,000 belong to the lower tier.
 *  5. Upfront interest equals the at-maturity amount, with no discount.
 *  6. Taxes and charges are not deducted, because no document specifies any.
 */

export const RATE_GUIDE = {
  /** Upper bound is exclusive. `null` rates mean "Negotiable" in the guide. */
  amountTiers: [
    { id: "t1", label: "₦100K – ₦499K", min: 100_000, max: 500_000 },
    { id: "t2", label: "₦500K – ₦4.99M", min: 500_000, max: 5_000_000 },
    { id: "t3", label: "₦5M – ₦14.99M", min: 5_000_000, max: 15_000_000 },
    { id: "t4", label: "₦15M – ₦24.99M", min: 15_000_000, max: 25_000_000 },
    { id: "t5", label: "₦25M and above", min: 25_000_000, max: Number.POSITIVE_INFINITY },
  ],
  tenorBands: [
    { days: 30, label: "30 days", rates: [6, 7, 9, 10, null] },
    { days: 60, label: "60 days", rates: [8, 10, 12, 14, null] },
    { days: 90, label: "90 days", rates: [9, 12.5, 14.5, 15, null] },
    { days: 180, label: "180 days", rates: [11, 14, 15.5, 16, null] },
    { days: 360, label: "360 days and above", rates: [13.5, 15, 16.5, 18, null] },
  ],
} as const;

export const MIN_PRINCIPAL = RATE_GUIDE.amountTiers[0].min;
export const MIN_TENOR_DAYS = RATE_GUIDE.tenorBands[0].days;
export const NEGOTIABLE_FROM = RATE_GUIDE.amountTiers[4].min;
/** Documented early-exit penalty, charged on the principal. */
export const EARLY_EXIT_PENALTY_RATE = 0.05;
/** A limit on this tool only, to keep estimates sensible. Not a product rule. */
export const CALCULATOR_MAX_DAYS = 365 * 5;
export const DAY_COUNT_BASIS = 365;

export const ASSUMPTIONS = [
  "Rates are treated as yearly rates.",
  "Interest is simple, calculated on the actual number of days over a 365-day year.",
  "A term between two published bands earns the rate of the band it has reached, so 75 days uses the 60-day rate.",
  "Amounts between two published tiers, such as ₦499,500, use the lower tier.",
  "Upfront interest is shown at the same amount as interest paid at maturity.",
  "Taxes and charges are not deducted. The rate guide does not specify any.",
] as const;

export type PayoutOption = "maturity" | "upfront";

export type RateLookup =
  | { kind: "rate"; annualRate: number; tierIndex: number; bandIndex: number }
  | { kind: "below-minimum" }
  | { kind: "term-too-short"; tierIndex: number }
  | { kind: "negotiable"; tierIndex: number; bandIndex: number | null };

export function findTierIndex(principal: number): number {
  return RATE_GUIDE.amountTiers.findIndex((t) => principal >= t.min && principal < t.max);
}

/** The highest published band whose day count has been reached, or -1. */
export function findBandIndex(days: number): number {
  let index = -1;
  RATE_GUIDE.tenorBands.forEach((band, i) => {
    if (days >= band.days) index = i;
  });
  return index;
}

export function lookupRate(principal: number, days: number): RateLookup {
  if (!Number.isFinite(principal) || principal < MIN_PRINCIPAL) return { kind: "below-minimum" };
  const tierIndex = findTierIndex(principal);
  const bandIndex = findBandIndex(days);
  if (principal >= NEGOTIABLE_FROM) {
    return { kind: "negotiable", tierIndex, bandIndex: bandIndex === -1 ? null : bandIndex };
  }
  if (bandIndex === -1) return { kind: "term-too-short", tierIndex };
  const annualRate = RATE_GUIDE.tenorBands[bandIndex].rates[tierIndex] as number;
  return { kind: "rate", annualRate, tierIndex, bandIndex };
}

const roundKobo = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100;

export type Estimate = {
  principal: number;
  days: number;
  annualRate: number;
  tierIndex: number;
  bandIndex: number;
  payout: PayoutOption;
  interest: number;
  /** Paid when the deposit starts. Non-zero only for upfront interest. */
  paidAtStart: number;
  /** Paid on the maturity date. */
  paidAtMaturity: number;
  /** All money received over the term. */
  totalReceived: number;
  earlyExit: { penalty: number; interestForfeited: number; estimatedReturn: number };
};

export type EstimateResult = Estimate | Exclude<RateLookup, { kind: "rate" }>;

export const isEstimate = (r: EstimateResult): r is Estimate => !("kind" in r);

export function estimateFixedDeposit(
  principal: number,
  days: number,
  payout: PayoutOption = "maturity",
): EstimateResult {
  const lookup = lookupRate(principal, days);
  if (lookup.kind !== "rate") return lookup;
  const interest = roundKobo((principal * (lookup.annualRate / 100) * days) / DAY_COUNT_BASIS);
  const upfront = payout === "upfront";
  const penalty = roundKobo(principal * EARLY_EXIT_PENALTY_RATE);
  return {
    principal,
    days,
    annualRate: lookup.annualRate,
    tierIndex: lookup.tierIndex,
    bandIndex: lookup.bandIndex,
    payout,
    interest,
    paidAtStart: upfront ? interest : 0,
    paidAtMaturity: upfront ? principal : roundKobo(principal + interest),
    totalReceived: roundKobo(principal + interest),
    earlyExit: {
      penalty,
      interestForfeited: interest,
      // No interest is kept. Upfront interest already received comes back out of the principal.
      estimatedReturn: roundKobo(principal - penalty - (upfront ? interest : 0)),
    },
  };
}

/* ---------- calendar-safe date helpers (no time zone or daylight-saving drift) ---------- */

const toUtcDay = (d: Date): number => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

export const daysBetween = (start: Date, end: Date): number =>
  Math.round((toUtcDay(end) - toUtcDay(start)) / 86_400_000);

export const addDays = (d: Date, days: number): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);

export const formatNaira = (value: number, fractionDigits = 2): string =>
  `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;

export const formatLongDate = (d: Date): string =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
