const FLAT = "/images/corporate/snapshot";
const CROPS = "/images/cheetah/app";

/** Real app screens, unedited. The data on them is sample data from the app's design files. */
export const SCREENS = {
  home: { src: `${FLAT}/cheetah_home_app.png`, alt: "Cheetah home screen with wallet balance, quick actions, goals and transactions" },
  fixed: { src: `${FLAT}/cheetah_fixed_savings.png`, alt: "Locked deposit screen showing the balance, rate, lock period, interest payout and maturity date" },
  flex: { src: `${FLAT}/cheetah_flex_savings.png`, alt: "Boc Flex Savings screen with balance, Add Money and Withdraw buttons, and interest history" },
  padi: { src: `${FLAT}/Cheetah_boc_padi.png`, alt: "Group savings screen showing the amount saved together and each member's share" },
  payments: { src: `${FLAT}/cheetah_Paymentp.png`, alt: "Payments screen with scan to pay, bill payment categories and transaction history" },
  send: { src: `${FLAT}/cheetah_send_money.png`, alt: "Send Money screen with options to move money, send to a BOCTrust user or to another bank" },
} as const;

export const APP_CROPS = {
  save: { src: `${CROPS}/save-screen.png`, width: 1400, height: 1873, alt: "Cheetah Save screen on an iPhone, listing total savings, Boc Flex Savings, savings plans and goals" },
  tiers: { src: `${CROPS}/tiers-screen.png`, width: 1400, height: 1855, alt: "Cheetah Account Tiers screen on an iPhone, listing what each of the three tiers needs" },
  receipt: { src: `${CROPS}/receipt.png`, width: 900, height: 970, alt: "A Cheetah transfer receipt marked successful" },
} as const;

export const SAMPLE_NOTE = "";
