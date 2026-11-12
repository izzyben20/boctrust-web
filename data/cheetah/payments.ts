/** Payment services as they appear on the app's own Payments and Send Money screens. */
export const BILL_CATEGORIES = ["Airtime", "Data", "Water", "Electricity", "TV", "Education", "Internet"] as const;

export type BillCategory = (typeof BILL_CATEGORIES)[number];

export const SEND_ROUTES = [
  { title: "Move money", body: "Between your own Cheetah savings" },
  { title: "To BOCTrust", body: "To another BOCTrust user" },
  { title: "To another bank", body: "To any Nigerian bank account" },
] as const;

export const SCAN_TO_PAY = { title: "Scan to pay", body: "Pay a merchant with their QR code" } as const;
