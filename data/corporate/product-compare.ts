/**
 * Side-by-side summaries for each product category. Every cell restates a term already published in
 * products.ts; nothing here is new. Update the product first, then the line that summarises it.
 */
export type CompareTable = { columns: string[]; rows: Record<string, string[]> };

export const SAVINGS_COMPARE: CompareTable = {
  columns: ["To start", "Rate or charge", "Getting your money"],
  rows: {
    "regular-savings": ["₦1,000 to ₦5,000 opening balance", "1.5% a year", "Any time. More than three withdrawals in a month means no interest that month"],
    "target-savings": ["₦1,000 opening balance", "10% a year", "At least 90 days. Ending early means no interest"],
    "ajo-plus-account": ["A daily amount you set", "A monthly commission of one day's contribution", "Withdraw when the need arises"],
  },
};

export const LOANS_COMPARE: CompareTable = {
  columns: ["How much", "How long", "What it needs"],
  rows: {
    "personal-loan": ["Based on eligibility", "Monthly repayments", "No collateral. Credit assessment required"],
    "salary-advance": ["Up to 35% of net monthly income", "Repaid from the following month's salary", "Employment with a partner organisation"],
    "sme-loan": ["₦500,000 to ₦10 million", "60 to 180 days", "Motor vehicle, C of O, or stock hypothecation"],
    "asset-backed-financing": ["The asset, with you contributing 20–40%", "Up to 12 months", "Security, insurance, and two guarantors' cheques"],
  },
};

export const INVESTMENT_COMPARE: CompareTable = {
  columns: ["Minimum", "Tenor", "Rate", "Leaving early"],
  rows: {
    "fixed-investment": ["₦100,000", "From 30 days", "6% to 18% a year", "Earned interest forfeited, plus a 5% penalty on the principal"],
    "investment-note": ["₦100,000, up to ₦1,000,000", "From 90 days", "12% a year", "A 20% penalty on accrued interest"],
  },
};
