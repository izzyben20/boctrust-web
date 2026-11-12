import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  addDays,
  daysBetween,
  estimateFixedDeposit,
  findBandIndex,
  isEstimate,
  lookupRate,
  RATE_GUIDE,
  type Estimate,
} from "./fixed-deposit.ts";

const ok = (principal: number, days: number, payout: "maturity" | "upfront" = "maturity"): Estimate => {
  const r = estimateFixedDeposit(principal, days, payout);
  assert.ok(isEstimate(r), `expected an estimate for ${principal}/${days}`);
  return r;
};

test("every cell of the rate guide matches the document", () => {
  const doc: Record<number, (number | null)[]> = {
    30: [6, 7, 9, 10, null],
    60: [8, 10, 12, 14, null],
    90: [9, 12.5, 14.5, 15, null],
    180: [11, 14, 15.5, 16, null],
    360: [13.5, 15, 16.5, 18, null],
  };
  const amounts = [100_000, 500_000, 5_000_000, 15_000_000, 25_000_000];
  for (const band of RATE_GUIDE.tenorBands) {
    amounts.forEach((amount, i) => {
      const r = lookupRate(amount, band.days);
      if (doc[band.days][i] === null) assert.equal(r.kind, "negotiable");
      else {
        assert.equal(r.kind, "rate");
        if (r.kind === "rate") assert.equal(r.annualRate, doc[band.days][i]);
      }
    });
  }
});

test("amount tier boundaries", () => {
  assert.equal(lookupRate(99_999.99, 30).kind, "below-minimum");
  assert.equal(ok(100_000, 30).annualRate, 6);
  assert.equal(ok(499_000, 30).annualRate, 6);
  assert.equal(ok(499_999.99, 30).annualRate, 6, "gap after ₦499K stays in the lower tier");
  assert.equal(ok(500_000, 30).annualRate, 7);
  assert.equal(ok(4_990_000, 30).annualRate, 7);
  assert.equal(ok(4_999_999, 30).annualRate, 7);
  assert.equal(ok(5_000_000, 30).annualRate, 9);
  assert.equal(ok(14_999_999, 30).annualRate, 9);
  assert.equal(ok(15_000_000, 30).annualRate, 10);
  assert.equal(ok(24_999_999, 30).annualRate, 10);
  assert.equal(lookupRate(25_000_000, 30).kind, "negotiable");
  assert.equal(lookupRate(500_000_000, 400).kind, "negotiable");
});

test("tenor band boundaries", () => {
  assert.equal(findBandIndex(29), -1);
  assert.equal(lookupRate(100_000, 29).kind, "term-too-short");
  assert.equal(ok(100_000, 30).annualRate, 6);
  assert.equal(ok(100_000, 59).annualRate, 6);
  assert.equal(ok(100_000, 60).annualRate, 8);
  assert.equal(ok(100_000, 89).annualRate, 8);
  assert.equal(ok(100_000, 90).annualRate, 9);
  assert.equal(ok(100_000, 179).annualRate, 9);
  assert.equal(ok(100_000, 180).annualRate, 11);
  assert.equal(ok(100_000, 359).annualRate, 11);
  assert.equal(ok(100_000, 360).annualRate, 13.5);
  assert.equal(ok(100_000, 365).annualRate, 13.5);
  assert.equal(ok(100_000, 900).annualRate, 13.5);
});

test("interest is simple on actual/365", () => {
  assert.equal(ok(100_000, 30).interest, 493.15);
  assert.equal(ok(1_000_000, 180).interest, 69_041.1);
  assert.equal(ok(1_000_000, 365).interest, 150_000);
  assert.equal(ok(20_000_000, 360).interest, 3_550_684.93);
  assert.equal(ok(1_000_000, 180).paidAtMaturity, 1_069_041.1);
});

test("upfront interest pays at the start and returns the principal at maturity", () => {
  const r = ok(1_000_000, 180, "upfront");
  assert.equal(r.paidAtStart, 69_041.1);
  assert.equal(r.paidAtMaturity, 1_000_000);
  assert.equal(r.totalReceived, 1_069_041.1);
});

test("early exit forfeits interest and charges 5% on principal", () => {
  const atMaturity = ok(1_000_000, 180);
  assert.equal(atMaturity.earlyExit.penalty, 50_000);
  assert.equal(atMaturity.earlyExit.estimatedReturn, 950_000);
  const upfront = ok(1_000_000, 180, "upfront");
  assert.equal(upfront.earlyExit.estimatedReturn, 880_958.9);
});

test("date helpers are immune to daylight saving and handle leap years", () => {
  assert.equal(daysBetween(new Date(2028, 0, 1), new Date(2029, 0, 1)), 366);
  assert.equal(daysBetween(new Date(2026, 0, 1), new Date(2027, 0, 1)), 365);
  assert.equal(daysBetween(new Date(2026, 2, 28), new Date(2026, 2, 30)), 2);
  assert.equal(daysBetween(new Date(2026, 9, 24), new Date(2026, 9, 26)), 2);
  assert.equal(daysBetween(new Date(2026, 10, 7), addDays(new Date(2026, 10, 7), 180)), 180);
});
