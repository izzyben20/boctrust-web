import { SITE } from "@/config/site";
import type { FaqItem } from "./types";

/** Every answer restates something published on the current Boctrust website. */
export const CORPORATE_FAQS: FaqItem[] = [
  {
    question: "What does Boctrust offer?",
    answer:
      "Four kinds of service: savings accounts, loans, investments and advisory. They are designed for individuals, cooperative societies, and micro, small and medium enterprises.",
  },
  {
    question: "How much can I borrow through the loan application?",
    answer:
      "The online loan application covers amounts from ₦50,000 to ₦500,000 for government employees, private employees and business owners. SME Loans are a separate product, ranging from ₦500,000 to ₦10 million.",
  },
  {
    question: "What is a Salary Advance?",
    answer:
      "An exclusive programme for employees of organisations that have signed a Memorandum of Understanding with Boctrust. Eligible staff can borrow up to 35% of their net monthly income, payable against the following month's salary.",
  },
  {
    question: "What do I need to open a Regular Savings account?",
    answer:
      "A minimum opening balance of ₦1,000 to ₦5,000. You can save and withdraw at any time, and account holders get an ATM card, mobile and online banking access, and SMS alerts on every transaction.",
  },
  {
    question: "What is the minimum for a Fixed Deposit?",
    answer:
      "₦100,000, for a minimum term of 30 days. The rate depends on your amount and term. You can estimate your returns with our Fixed Savings calculator.",
  },
  {
    question: "Do you only provide financial products?",
    answer:
      "No. We also advise businesses on their strategic, operational, financial and capital needs, and help customers choose suitable micro-insurance. See our advisory products for details.",
  },
  {
    question: "How do I reach customer support?",
    answer: `Call ${SITE.contact.phones[0].display} or ${SITE.contact.phones[1].display} (${SITE.contact.hours}), email ${SITE.contact.email}, or visit us at ${SITE.contact.address}.`,
  },
  {
    question: "How can I ask about my personal data?",
    answer: `Email ${SITE.contact.privacyEmail}. Our Privacy Policy explains what we collect, how it is used, and the rights you have over it.`,
  },
];
