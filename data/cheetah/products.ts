import type { FaqItem } from "../faq/types";

export type CheetahProductSlug = "fixed" | "smartsave" | "flex" | "padi";

export type CheetahProduct = {
  slug: CheetahProductSlug;
  /**
   * Display names. "Boc Fixed Savings" follows the project brief; the July 2026 specification's
   * approved list says "Boctrust Fixed Deposit". Change a name here and it changes everywhere.
   */
  name: string;
  href: string;
  tagline: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  /** A concise line for cards. */
  cardLine: string;
  cta: string;
  benefits: { title: string; body: string }[];
  features: { label: string; value: string }[];
  steps: { title: string; body: string }[];
  conditions: string[];
  faqs: FaqItem[];
  related: CheetahProductSlug[];
};

/**
 * All product facts come from section 8 of "Technical Integration, Operational Specifications &
 * Feedback" (27 July 2026) and the Fixed Deposit Rate Guide. Where they are silent, this copy is
 * silent too: no rates are given for Flex or SmartSave, and no interest is claimed for Padi.
 */
export const CHEETAH_PRODUCTS: Record<CheetahProductSlug, CheetahProduct> = {
  fixed: {
    slug: "fixed",
    name: "Boc Fixed Savings",
    href: "/cheetah/savings/fixed",
    tagline: "Lock it away. Let it earn.",
    summary:
      "Choose a sum and a term, then leave it alone. The bigger the amount and the longer the term, the higher your rate. Take your interest upfront, or collect it all at maturity.",
    metaTitle: "Boc Fixed Savings: Fixed Deposit Rates from 6% to 18%",
    metaDescription:
      "Lock away ₦100,000 or more from 30 days and earn from 6% to 18% a year, depending on amount and term. Take interest upfront or at maturity with Cheetah by Boctrust.",
    cardLine: "Lock a sum from ₦100,000 for 30 days or more. Earn from 6% to 18% a year.",
    cta: "See your returns",
    benefits: [
      { title: "A rate you know upfront", body: "Your rate is set by your amount and term, so you can see it before you commit." },
      { title: "Your interest, your timing", body: "Collect everything together at maturity, or take your interest at the very start." },
      { title: "Commitment that pays", body: "Longer terms and larger sums earn higher rates, as far as 18% a year." },
    ],
    features: [
      { label: "Minimum deposit", value: "₦100,000" },
      { label: "Shortest term", value: "30 days" },
      { label: "Rate range", value: "6% – 18%" },
      { label: "₦25M and above", value: "Negotiable" },
    ],
    steps: [
      { title: "Pick your amount", body: "Start from ₦100,000. Your amount is one of the two things that set your rate." },
      { title: "Set your term", body: "Terms start at 30 days, with higher rates at 60, 90, 180 and 360 days and above." },
      { title: "Choose your payout", body: "Interest at maturity alongside your principal, or upfront at the start of the deposit." },
      { title: "Collect at maturity", body: "When the term ends, your money comes back to you." },
    ],
    conditions: [
      "If you withdraw before maturity, you forfeit the interest earned and pay a 5% penalty on the principal.",
      "Interest forfeited on early withdrawal is deducted from the principal, which includes interest you took upfront.",
      "Deposits of ₦25 million and above are priced by negotiation.",
      "Your account tier's limits apply when you fund a deposit.",
    ],
    faqs: [
      {
        question: "What happens if I need my money early?",
        answer:
          "You can withdraw early, but you lose the interest earned and pay a 5% penalty on the principal. Interest you already took upfront is deducted from your principal.",
      },
      {
        question: "What does taking interest upfront mean?",
        answer:
          "Instead of waiting for maturity, you receive your interest at the start of the deposit. Your principal is then returned when the term ends.",
      },
      {
        question: "What rate will I get?",
        answer:
          "It depends on your amount and term. For example, ₦1 million for 180 days sits at 14% a year in the rate guide. Try the calculator to see your own estimate.",
      },
      {
        question: "Is there a rate above ₦25 million?",
        answer: "Yes, but it is negotiated with Boctrust rather than listed in the guide.",
      },
    ],
    related: ["smartsave", "flex"],
  },
  smartsave: {
    slug: "smartsave",
    name: "Boc SmartSave",
    href: "/cheetah/savings/smartsave",
    tagline: "Name the goal. Automate the getting there.",
    summary:
      "Set a target amount and a timeline of 3, 6 or 12 months. Cheetah then moves money towards it on the daily, weekly or monthly schedule you choose, so saving happens without you having to remember.",
    metaTitle: "Boc SmartSave: Automated Goal Savings over 3, 6 or 12 Months",
    metaDescription:
      "Set a savings goal and automate it with daily, weekly or monthly debits over 3, 6 or 12 months. Boc SmartSave from Cheetah by Boctrust.",
    cardLine: "Set a target, pick 3, 6 or 12 months, and let automatic debits do the work.",
    cta: "Explore SmartSave",
    benefits: [
      { title: "Saving on autopilot", body: "Automated direct debits mean your plan keeps moving, even on busy days." },
      { title: "Built around your goal", body: "You choose the target amount and the timeline, so every naira has a purpose." },
      { title: "A nudge towards discipline", body: "Leaving early costs part of your interest, which makes it easier to stay the course." },
    ],
    features: [
      { label: "Timelines", value: "3, 6 or 12 months" },
      { label: "Schedules", value: "Daily, weekly, monthly" },
      { label: "How it funds", value: "Automated debit" },
      { label: "Leaving early", value: "20% of interest forfeited" },
    ],
    steps: [
      { title: "Name your target", body: "Decide what you are saving for and how much it will take." },
      { title: "Pick your timeline", body: "Choose 3, 6 or 12 months." },
      { title: "Set your rhythm", body: "Daily, weekly or monthly, whichever matches how your money comes in." },
      { title: "Reach your date", body: "Debits run on schedule until your target date arrives." },
    ],
    conditions: [
      "Liquidating before your target date forfeits 20% of the interest accrued so far.",
      "Timelines are 3, 6 or 12 months.",
    ],
    faqs: [
      {
        question: "How often is money taken?",
        answer: "On the schedule you choose: daily, weekly or monthly.",
      },
      {
        question: "Can I stop before my target date?",
        answer: "Yes, but early liquidation forfeits 20% of the interest you have accrued up to that point.",
      },
      {
        question: "How long can a plan run?",
        answer: "You can set a plan for 3, 6 or 12 months.",
      },
    ],
    related: ["fixed", "padi"],
  },
  flex: {
    slug: "flex",
    name: "Boc Flex Savings",
    href: "/cheetah/savings/flex",
    tagline: "Your money, in and out, any day.",
    summary:
      "The everyday savings pot. Pay in whenever you want, as often as you want, withdraw daily, and earn interest that accrues every day your money is there.",
    metaTitle: "Boc Flex Savings: Deposit Any Time, Withdraw Daily, Earn Daily Interest",
    metaDescription:
      "Boc Flex Savings from Cheetah by Boctrust lets you deposit at any time, withdraw daily and accrue interest every day, at standard savings yields.",
    cardLine: "Deposit any time. Withdraw daily. Interest accrues every day.",
    cta: "Explore Flex",
    benefits: [
      { title: "No waiting to get started", body: "Add money at any time, with no cap on the number of deposits." },
      { title: "Access when you need it", body: "Daily withdrawals keep your savings close for life's surprises." },
      { title: "Earning, even while idle", body: "Interest accrues daily at standard savings yields." },
    ],
    features: [
      { label: "Deposits", value: "Unlimited, any time" },
      { label: "Withdrawals", value: "Daily" },
      { label: "Interest", value: "Accrues daily" },
      { label: "Yield", value: "Standard savings yield" },
    ],
    steps: [
      { title: "Open Flex", body: "Start your Flex pot in the Cheetah app." },
      { title: "Pay in freely", body: "Top up whenever you have something to set aside." },
      { title: "Watch it accrue", body: "Interest builds daily at standard savings yields." },
      { title: "Withdraw when needed", body: "Your money stays within reach, day after day." },
    ],
    conditions: [
      "Interest accrues at standard savings yields, which are confirmed in the app.",
      "Your account tier's transaction and balance limits apply.",
    ],
    faqs: [
      {
        question: "How often can I deposit?",
        answer: "As often as you like. Deposits are unlimited and permitted at any time, within your account tier's limits.",
      },
      {
        question: "Can I take money out whenever I want?",
        answer: "Boc Flex Savings supports daily withdrawals.",
      },
      {
        question: "How is interest earned?",
        answer: "Interest accrues daily, based on standard savings yields.",
      },
    ],
    related: ["smartsave", "fixed"],
  },
  padi: {
    slug: "padi",
    name: "Boc Padi",
    href: "/cheetah/savings/padi",
    tagline: "Ajo, for your people, in your pocket.",
    summary:
      "Boc Padi takes the Ajo and Esusu tradition digital. Your trusted group pays into a shared pool on a set schedule, and each member takes a turn collecting the full amount until everyone has been paid.",
    metaTitle: "Boc Padi: Digital Ajo and Esusu Group Savings",
    metaDescription:
      "Save with your trusted group on Boc Padi. Daily, weekly or monthly contributions into a shared pool, with rotating payouts, from Cheetah by Boctrust.",
    cardLine: "Your group pays into one pool. Everyone takes a turn to collect it all.",
    cta: "Explore Padi",
    benefits: [
      { title: "A tradition you already trust", body: "The Ajo and Esusu model you know, now run on a clear, agreed schedule." },
      { title: "A lump sum when it is your turn", body: "On your turn, you receive the full collection for that round." },
      { title: "Everyone's turn, in order", body: "Payouts go to members one after another, until the whole group has been paid." },
    ],
    features: [
      { label: "Model", value: "Ajo / Esusu" },
      { label: "Contributions", value: "Daily, weekly, monthly" },
      { label: "Group size", value: "Fixed per cycle" },
      { label: "Payouts", value: "Rotational" },
    ],
    steps: [
      { title: "Gather your group", body: "A cycle begins once its fixed group size is met." },
      { title: "Agree the schedule", body: "Choose daily, weekly or monthly contributions and the order of payouts." },
      { title: "Contribute together", body: "Every member pays into the shared pool on schedule." },
      { title: "Take your turn", body: "Each member receives the full collection in sequence." },
    ],
    conditions: [
      "A cycle needs a fixed group size before it can start.",
      "Payouts follow the agreed order, one member at a time.",
      "The cycle closes automatically once the final member is paid.",
      "Save only with people you trust: everyone relies on each other to contribute.",
    ],
    faqs: [
      {
        question: "How is the payout order decided?",
        answer: "Payouts go to individual members one after another, based on the schedule the group agrees.",
      },
      {
        question: "How many people can join?",
        answer: "Each cycle requires a fixed group size, and it starts once that group is complete.",
      },
      {
        question: "What happens at the end of a cycle?",
        answer: "The savings cycle closes automatically once the final member has received their payout.",
      },
    ],
    related: ["flex", "smartsave"],
  },
};

export const CHEETAH_PRODUCT_LIST: CheetahProduct[] = [
  CHEETAH_PRODUCTS.fixed,
  CHEETAH_PRODUCTS.smartsave,
  CHEETAH_PRODUCTS.flex,
  CHEETAH_PRODUCTS.padi,
];

export const ACCOUNT_TIERS = [
  {
    tier: "Tier 1",
    needs: "Basic details, BVN or NIN verification, and a live selfie",
    single: "₦50,000",
    balance: "₦300,000",
  },
  {
    tier: "Tier 2",
    needs: "Everything in Tier 1, plus a valid government-issued ID",
    single: "₦100,000",
    balance: "₦500,000",
  },
  {
    tier: "Tier 3",
    needs: "Everything in Tier 2, plus a utility bill under 3 months old",
    single: "Higher, customisable",
    balance: "No daily balance limit",
  },
] as const;
