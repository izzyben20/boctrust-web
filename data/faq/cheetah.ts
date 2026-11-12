import { verifiedClaims } from '@/config/regulatory';
import { SITE } from '@/config/site';
import { CHEETAH_PRODUCTS, type CheetahProductSlug } from '../cheetah/products';
import type { FaqItem } from './types';

const WHAT_IS_CHEETAH: FaqItem = {
  question: 'What is Cheetah?',
  answer:
    'Cheetah is the digital savings and payments app from Boctrust Microfinance Bank. It brings four ways to save together with everyday payments such as transfers, bills, airtime and data.',
};
const PRODUCTS_DIFFER: FaqItem = {
  question: 'How do the savings products differ?',
  answer:
    'Boc Flex Savings is for money you may need any day. Boc SmartSave automates contributions towards a goal over 3, 6 or 12 months. Boc Fixed Savings locks a sum for a set term to earn a higher return. Boc Padi lets a trusted group contribute to a shared pool that pays out to each member in turn.',
};
const CREATE_ACCOUNT: FaqItem = {
  question: 'What do I need to create an account?',
  answer:
    'Your basic details (name, date of birth, phone number and address), BVN or NIN verification, and a live selfie. That opens a Tier 1 account. You can add a government ID for Tier 2, and a recent utility bill for Tier 3.',
};
const ACCOUNT_LIMITS: FaqItem = {
  question: 'What are the account limits?',
  answer:
    'Tier 1 allows up to ₦50,000 per deposit or transaction and a ₦300,000 balance. Tier 2 allows up to ₦100,000 per deposit or transaction and a ₦500,000 balance. Tier 3 has no daily balance limit and higher, customisable transaction limits.',
};
const ONE_APP: FaqItem = {
  question: 'Can I save and make payments in one app?',
  answer:
    'Yes. Savings and payments are designed to sit side by side, so you can send money, pay a bill or top up a phone from the same app that holds your savings.',
};
const SECURED: FaqItem = {
  question: 'How is my account secured?',
  answer:
    'You can sign in with your fingerprint or Face ID, set and change a transaction PIN, and see which devices are logged in to your account. Every debit and credit triggers an alert, and debit and security alerts cannot be switched off.',
};
const DOWNLOAD: FaqItem = {
  question: 'Where can I download Cheetah?',
  answer:
    "Cheetah is available for download on the Google Play Store and Apple App Store. Simply visit your device's respective app store, search for Cheetah, and download the app to get started.",
};

export const CHEETAH_HOME_FAQS: FaqItem[] = [
  WHAT_IS_CHEETAH,
  PRODUCTS_DIFFER,
  CREATE_ACCOUNT,
  ACCOUNT_LIMITS,
  ONE_APP,
  SECURED,
  DOWNLOAD,
];

/** Reuses a product page's own answer. A renamed question fails the build rather than drifting. */
const fromProduct = (slug: CheetahProductSlug, question: string): FaqItem => {
  const item = CHEETAH_PRODUCTS[slug].faqs.find(
    (faq) => faq.question === question,
  );
  if (!item) throw new Error(`No "${question}" FAQ on ${slug}`);
  return item;
};

const about = (slug: CheetahProductSlug): FaqItem => ({
  question: `What is ${CHEETAH_PRODUCTS[slug].name}?`,
  answer: CHEETAH_PRODUCTS[slug].summary,
});

export type CheetahFaqCategoryId =
  | 'getting-started'
  | 'accounts-security'
  | 'savings-products'
  | 'deposits-withdrawals'
  | 'transfers-payments'
  | 'interest-earnings'
  | 'support-general';

export type CheetahFaqCategory = {
  id: CheetahFaqCategoryId;
  title: string;
  description: string;
  items: FaqItem[];
};

/**
 * Every answer restates the 27 July 2026 specification, the rate guide, the app's own screens or a
 * product page. Not documented, so left out until Boctrust confirms them: transfer and bill fees,
 * funding methods, Flex and SmartSave rates, and support response times.
 */
export const CHEETAH_FAQ_CATEGORIES: CheetahFaqCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'Downloading the app, signing up and getting verified.',
    items: [
      WHAT_IS_CHEETAH,
      DOWNLOAD,
      CREATE_ACCOUNT,
      {
        question: 'Do I have to agree to any terms when I register?',
        answer:
          'Yes. You tick a box to agree to our Terms and Privacy Policy before your account is created. You can read both at any time from the Settings page in the app.',
      },
      ONE_APP,
    ],
  },
  {
    id: 'accounts-security',
    title: 'Accounts and security',
    description: 'Tiers, identity checks and keeping your account safe.',
    items: [
      ACCOUNT_LIMITS,
      {
        question: 'Which ID can I use for Tier 2?',
        answer:
          "A valid government-issued ID: a Voter's Card, Driver's License, International Passport or NIN slip.",
      },
      {
        question: 'What do I need for Tier 3?',
        answer:
          'Everything required for Tier 2, plus a recent utility bill, such as an electricity bill under 3 months old, to prove where you live.',
      },
      {
        question: 'Can I ask for a higher limit?',
        answer:
          'Your Account Settings show your current tier and daily transfer limits, with a Request Limit Increase option. You can also upload upgraded KYC documents from your profile.',
      },
      SECURED,
      {
        question: 'How do I change my password or transaction PIN?',
        answer:
          'Both are in the Security section of Account Settings, where you can change your password and reset or change your transaction PIN.',
      },
      {
        question: 'Can I update my profile?',
        answer:
          'Yes. In Account Settings you can view and edit your personal details, update your profile picture and upload upgraded KYC documents.',
      },
      {
        question: 'Can I turn off notifications?',
        answer:
          'You can switch email, SMS and in-app notifications on or off for promotional and informational messages. Debit and security alerts always stay on.',
      },
    ],
  },
  {
    id: 'savings-products',
    title: 'Savings products',
    description:
      'Boc Fixed Savings, Boc SmartSave, Boc Flex Savings and Boc Padi.',
    items: [
      PRODUCTS_DIFFER,
      about('fixed'),
      about('smartsave'),
      about('flex'),
      about('padi'),
      fromProduct('smartsave', 'How long can a plan run?'),
      fromProduct('padi', 'How is the payout order decided?'),
      fromProduct('padi', 'How many people can join?'),
      fromProduct('padi', 'What happens at the end of a cycle?'),
    ],
  },
  {
    id: 'deposits-withdrawals',
    title: 'Deposits and withdrawals',
    description: 'Adding money, taking it out, and what happens at maturity.',
    items: [
      {
        question: 'How do I add money?',
        answer:
          "Use Add Money on your Cheetah home screen. Your account tier's limit on each deposit applies.",
      },
      fromProduct('flex', 'How often can I deposit?'),
      fromProduct('flex', 'Can I take money out whenever I want?'),
      fromProduct('smartsave', 'How often is money taken?'),
      fromProduct('smartsave', 'Can I stop before my target date?'),
      fromProduct('fixed', 'What happens if I need my money early?'),
      {
        question: 'What happens when my fixed deposit matures?',
        answer:
          'You receive your principal and earned interest together. If you took your interest upfront, your principal is returned when the term ends.',
      },
      {
        question: 'How do contributions work on Boc Padi?',
        answer:
          'Each member makes regular contributions, daily, weekly or monthly, into a shared pool. On your turn, you receive the full collection for that round.',
      },
    ],
  },
  {
    id: 'transfers-payments',
    title: 'Transfers and payments',
    description: 'Sending money, paying bills, airtime and data.',
    items: [
      {
        question: 'Who can I send money to?',
        answer:
          'You can move money between your own Cheetah savings, send to another BOCTrust user, or send to any Nigerian bank account.',
      },
      {
        question: 'Which bills can I pay?',
        answer:
          'The Payments screen covers airtime, data, water, electricity, TV, education and internet.',
      },
      {
        question: 'Can I buy airtime and data?',
        answer:
          'Yes. Both are on the Payments screen, alongside your other bill payments.',
      },
      {
        question: 'Can I pay a merchant with a QR code?',
        answer:
          "Yes. Use Scan to pay on the Payments screen to pay with a merchant's QR code.",
      },
      {
        question: 'Will I be told when money moves?',
        answer:
          'Yes, in three ways: a pop-up and a saved message in the app, an email for every debit and credit with the reference, amount, time, sender or receiver details and your updated balance, and an SMS for transfers, withdrawals and security codes.',
      },
      {
        question: 'Is there a limit on each transaction?',
        answer:
          'Yes, set by your account tier: up to ₦50,000 on Tier 1, up to ₦100,000 on Tier 2, and higher, customisable limits on Tier 3.',
      },
      {
        question: 'Can I make payments on this website?',
        answer:
          'No. This website is for information only. Payments happen in the Cheetah app.',
      },
    ],
  },
  {
    id: 'interest-earnings',
    title: 'Interest and earnings',
    description: 'Rates, returns and how your interest is paid.',
    items: [
      {
        question: 'How much can Boc Fixed Savings earn?',
        answer:
          'From 6% to 18% a year, depending on your amount and term. Deposits start at ₦100,000, and terms start at 30 days. Rates are subject to review.',
      },
      fromProduct('fixed', 'What rate will I get?'),
      fromProduct('fixed', 'What does taking interest upfront mean?'),
      fromProduct('fixed', 'Is there a rate above ₦25 million?'),
      {
        question: "Is the calculator's figure guaranteed?",
        answer:
          'No. The Fixed Savings calculator gives an estimate, not an offer or a guarantee. Final terms are confirmed by Boctrust when you make your deposit.',
      },
      fromProduct('flex', 'How is interest earned?'),
      {
        question: 'What interest does Boc SmartSave earn?',
        answer:
          "Interest accrues on your plan, but we don't publish a rate on this website. Leaving before your target date forfeits 20% of the interest accrued so far.",
      },
      {
        question: 'Does Boc Padi earn interest?',
        answer:
          "We don't publish an interest rate for Boc Padi on this website. Please check current terms in the app or ask Boctrust.",
      },
    ],
  },
  {
    id: 'support-general',
    title: 'Support and general questions',
    description: 'Getting help, and who stands behind Cheetah.',
    items: [
      {
        question: 'How do I reach customer support?',
        answer: `Chat with Customer Support from the app's Settings, call ${SITE.contact.phones[0].display} or ${SITE.contact.phones[1].display} (${SITE.contact.hours}), or email ${SITE.contact.email}.`,
      },
      {
        question: 'Where can I read your policies?',
        answer:
          'The Privacy Policy and Terms & Conditions are linked from the Settings page in the app and from the footer of this website.',
      },
      {
        question: 'Who is behind Cheetah?',
        answer: `Cheetah is a product of ${SITE.legalName}. ${verifiedClaims()
          .filter((claim) => claim.id !== 'ndpc')
          .map((claim) => `${claim.statement}.`)
          .join(' ')}`,
      },
    ],
  },
];
