import type { FaqItem } from "../faq/types";

type License = { name: string; url: string };

export type ProductPhoto = {
  src: string;
  alt: string;
  author: string;
  source: string;
  license: License;
  /** object-position for the crop. */
  position?: string;
};

export type ProductStory = {
  /** Two photographs per page: the hero sets the product's identity, the body shows it in use. */
  photos: { hero: ProductPhoto; body: ProductPhoto };
  /** The section built around the body photograph. Restates products.ts; adds no new terms. */
  story: { eyebrow: string; title: string; body: string };
  /** The one fact to see first. Taken from the product's published terms in products.ts. */
  highlight: { value: string; label: string };
  steps?: { title: string; body: string }[];
  uses?: string[];
  figures?: { label: string; value: string }[];
  faqs?: FaqItem[];
};

const SRC = "/images/corporate/products";
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;
const pexels = (path: string) => `https://www.pexels.com/photo/${path}/`;

const PEXELS: License = { name: "Pexels License", url: "https://www.pexels.com/license/" };
const CC0: License = { name: "CC0", url: "https://creativecommons.org/publicdomain/zero/1.0/" };

/**
 * Presentation for each product page. Every figure and condition restates products.ts or the
 * current site's copy; nothing here adds a new term.
 *
 * Photographs: every licence here allows use without visible credit, so author and source are kept
 * as a record rather than shown. Pexels photographs (Pexels License) allow commercial use and
 * editing but must not imply that the people shown endorse the bank; the one Wikimedia Commons
 * photograph is CC0. No licence covers the consent of people shown to appear in bank advertising.
 * Files are resized to 2000px on the long side.
 */
export const PRODUCT_STORIES: Record<string, ProductStory> = {
  "regular-savings": {
    photos: {
      hero: { src: `${SRC}/savings/regular-savings-hero-phone.jpg`, alt: "A woman in an orange blazer smiling at her phone outside a bookshop", author: "Pexels user 906320510", source: pexels("19863396"), license: PEXELS, position: "30% 40%" },
      body: { src: `${SRC}/savings/regular-savings-body-stall.jpg`, alt: "A young trader laughing as she leans on the counter of her stall in Osun, Nigeria", author: "David Iloba", source: pexels("13417078"), license: PEXELS, position: "50% 32%" },
    },
    story: {
      eyebrow: "Who it's for",
      title: "For money that moves every day.",
      body: "Regular Savings is for individuals, micro enterprises and cooperative societies. Save and withdraw at any time, pay cash in at our correspondent banks, and see every transaction by SMS. When you need more, the account gives you easy access to loans and can serve as collateral.",
    },
    highlight: { value: "1.5%", label: "interest per annum" },
    steps: [
      { title: "Open your account", body: "Start with a minimum opening balance of ₦1,000 to ₦5,000." },
      { title: "Save and withdraw", body: "Pay in and take money out at any time, with SMS alerts on every transaction." },
      { title: "Keep earning", body: "Interest is paid when withdrawals stay at three or fewer in a month." },
    ],
    faqs: [
      { question: "What do I need to open a Regular Savings account?", answer: "A minimum opening balance of ₦1,000 to ₦5,000." },
      { question: "When can I withdraw?", answer: "You can save and withdraw at any time. Interest will not be paid if withdrawals exceed three in a month." },
      { question: "Can my savings help me get a loan?", answer: "Yes. The account offers easy access to loans and can serve as collateral for loans." },
    ],
  },
  "target-savings": {
    photos: {
      hero: { src: `${SRC}/savings/target-savings-hero.jpg`, alt: "A smiling couple holding up the keys to their new home", author: "Kindel Media", source: pexels("7579200"), license: PEXELS, position: "60% 35%" },
      body: { src: `${SRC}/savings/target-savings-body.jpg`, alt: "A woman working through a plan at her desk, with charts and notes spread out", author: "RDNE Stock project", source: pexels("5915200"), license: PEXELS, position: "50% 40%" },
    },
    story: {
      eyebrow: "Plan it",
      title: "Name the goal. Pick the pace.",
      body: "Target Savings is built around a specific project or event. Choose daily, weekly or monthly savings, start from ₦1,000 and commit for at least 90 days. There is no monthly maintenance charge, and holding to maturity is what earns your 10% a year.",
    },
    highlight: { value: "10%", label: "interest per annum" },
    steps: [
      { title: "Set your target", body: "Save towards a specific project or event, starting with ₦1,000." },
      { title: "Choose your rhythm", body: "Save daily, weekly or monthly, for at least 90 days." },
      { title: "Hold to maturity", body: "Ending before maturity means interest is not paid." },
    ],
    faqs: [
      { question: "How long does a plan run?", answer: "The minimum duration is 90 days." },
      { question: "Are there monthly charges?", answer: "There is no monthly maintenance charge." },
      { question: "What if I stop early?", answer: "Termination before maturity attracts non-payment of interest." },
    ],
  },
  "ajo-plus-account": {
    photos: {
      hero: { src: `${SRC}/savings/ajo-plus-account-hero.jpg`, alt: "A woman in a patterned wrapper and gele standing at her stall in a Lagos market", author: "D Flamez", source: pexels("38909249"), license: PEXELS, position: "50% 25%" },
      body: { src: `${SRC}/savings/ajo-plus-account-body-market.jpg`, alt: "A busy Lagos market street, with traders and shoppers under coloured umbrellas", author: "David Iloba", source: pexels("16155217"), license: PEXELS, position: "50% 60%" },
    },
    story: {
      eyebrow: "The daily habit",
      title: "The contribution you already make, kept safe.",
      body: "Ajo Plus is for people who want to contribute daily for a number of months. You set the minimum daily amount, there is no limit to what you put in, and you can pay in at any of our correspondent bank branches. Withdraw when the need arises.",
    },
    highlight: { value: "Daily", label: "contributions, set by you" },
    steps: [
      { title: "Set your contribution", body: "You decide the minimum daily amount, and there is no limit to contributions." },
      { title: "Save where it suits you", body: "Pay in at any of our correspondent bank branches." },
      { title: "Withdraw when needed", body: "Take your money out when the need arises." },
    ],
    faqs: [
      { question: "How much do I have to contribute?", answer: "You set the minimum daily contribution yourself, and there is no limit." },
      { question: "What does the bank charge?", answer: "The bank's monthly commission is one day's contribution." },
    ],
  },
  "personal-loan": {
    photos: {
      hero: { src: `${SRC}/loans/personal-loan-hero-cake.jpg`, alt: "A family gathered in their kitchen around a birthday cake, the mother holding it as the children look on", author: "August de Richelieu", source: pexels("4262412"), license: PEXELS, position: "68% 30%" },
      body: { src: `${SRC}/loans/personal-loan-body-family.jpg`, alt: "Parents and their children smiling together on the sofa in their living room", author: "Monstera Production", source: pexels("7114420"), license: PEXELS, position: "50% 50%" },
    },
    story: {
      eyebrow: "What it's for",
      title: "For the things that matter at home.",
      body: "A Personal Loan can be used for many purposes, from bills to repairs to something special for your family. No collateral is required, repayments are monthly on a fixed schedule, and the amount you can borrow is based on your eligibility after a credit assessment.",
    },
    highlight: { value: "No collateral", label: "required" },
    uses: ["When bills stack up", "When the car breaks down", "When home remodelling is on the agenda", "When you want to do something special for your family"],
    faqs: [
      { question: "How much can I borrow?", answer: "Your loan amount is based on eligibility. The online application covers amounts from ₦50,000 to ₦500,000." },
      { question: "Do I need collateral?", answer: "No collateral is required. A credit assessment is." },
    ],
  },
  "salary-advance": {
    photos: {
      hero: { src: `${SRC}/loans/salary-advance-hero.jpg`, alt: "A smiling young professional in a grey suit working at a laptop", author: "Yan Krukau", source: pexels("7794033"), license: PEXELS, position: "50% 30%" },
      body: { src: `${SRC}/loans/salary-advance-body.jpg`, alt: "Three colleagues reviewing a document together in a bright office", author: "Monstera Production", source: pexels("9487241"), license: PEXELS, position: "50% 35%" },
    },
    story: {
      eyebrow: "Through your employer",
      title: "Arranged with the organisation you work for.",
      body: "Salary Advance is an exclusive programme for employees of organisations that have signed a Memorandum of Understanding with Boctrust. Borrow up to 35% of your net monthly income and repay it against the following month's salary, often through deductions from your pay.",
    },
    highlight: { value: "Up to 35%", label: "of net monthly income" },
    uses: ["When an unexpected expense comes up", "When a bill is due before payday", "When an essential purchase can't wait"],
    faqs: [
      { question: "Who can apply?", answer: "Employees of organisations that have signed a Memorandum of Understanding with Boctrust." },
      { question: "How is it repaid?", answer: "It is payable against the following month's salary." },
    ],
  },
  "sme-loan": {
    photos: {
      hero: { src: `${SRC}/loans/sme-loan-hero-shop.jpg`, alt: "A smiling shopkeeper behind the counter of his well-stocked grocery store in Abuja, Nigeria", author: "Muhammad-Taha Ibrahim", source: pexels("30020992"), license: PEXELS, position: "45% 62%" },
      body: { src: `${SRC}/loans/sme-loan-body-stock.jpg`, alt: "A smiling worker in a hi-vis vest among high stacks of boxed stock in a Lagos warehouse", author: "Lagos Food Bank Initiative", source: pexels("8069547"), license: PEXELS, position: "50% 45%" },
    },
    story: {
      eyebrow: "Every sector",
      title: "For the job in hand, and the next one.",
      body: "SME Loans are for businessmen and women from all sectors of the economy: working capital, finance against expected receivables, the execution of a job, or expansion. Borrow ₦500,000 to ₦10 million for 60 to 180 days, secured by a motor vehicle, a C of O or stock hypothecation.",
    },
    highlight: { value: "₦500k – ₦10M", label: "for 60 to 180 days" },
    uses: ["Working capital", "Finance against expected receivables", "Executing a job", "Business expansion"],
    faqs: [
      { question: "How much can my business borrow?", answer: "Between ₦500,000 and ₦10 million, for a tenure of between 60 and 180 days." },
      { question: "What security is accepted?", answer: "A motor vehicle, the C of O of landed property, or stock hypothecation." },
    ],
  },
  "asset-backed-financing": {
    photos: {
      hero: { src: `${SRC}/loans/asset-backed-financing-hero.jpg`, alt: "A smiling mechanic in a cap at work on an engine in an open-air workshop", author: "Aliyu jooney", source: pexels("31928799"), license: PEXELS, position: "50% 30%" },
      body: { src: `${SRC}/loans/asset-backed-financing-body.jpg`, alt: "Two mechanics in overalls working under the open bonnet of a pickup in Nigeria", author: "Abasiakan", source: pexels("12555012"), license: PEXELS, position: "50% 45%" },
    },
    story: {
      eyebrow: "What it buys",
      title: "Equipment that earns. Assets that last.",
      body: "Asset Backed Financing is for business owners and salary earners buying income-generating equipment or household assets, new or used. You contribute 20–40% of the asset's worth, the asset is bought in the bank's name and insured, and the tenure runs for up to 12 months.",
    },
    highlight: { value: "12 months", label: "maximum tenure" },
    uses: ["Equipment that boosts your income", "Household items that improve your standard of living", "New or used assets"],
    faqs: [
      { question: "How much do I contribute?", answer: "20–40% of the asset's worth." },
      { question: "Whose name is the asset in?", answer: "Assets are bought in the name of Boctrust Microfinance Bank." },
    ],
  },
  "fixed-investment": {
    photos: {
      hero: { src: `${SRC}/investments/fixed-investment-hero-signing.jpg`, alt: "An older couple smiling together as they sign documents at a desk", author: "Kampus Production", source: pexels("8441866"), license: PEXELS, position: "50% 40%" },
      body: { src: `${SRC}/investments/fixed-investment-body.jpg`, alt: "A woman reviewing documents at a desk beside her laptop and a stack of books", author: "Mizuno K", source: pexels("12911745"), license: PEXELS, position: "50% 35%" },
    },
    story: {
      eyebrow: "How it pays",
      title: "Your choice of when the interest arrives.",
      body: "A Fixed Deposit locks a sum away for a set time, from 30 days and ₦100,000. Take your principal and interest together at maturity, or your interest upfront at the start. Larger sums and longer terms earn higher rates, a certificate is issued, and the deposit can serve as collateral for a loan.",
    },
    highlight: { value: "6% – 18%", label: "a year, by amount and tenor" },
    figures: [
      { label: "Minimum amount", value: "₦100,000" },
      { label: "Minimum tenor", value: "30 days" },
      { label: "Rates a year", value: "6% – 18%" },
    ],
  },
  "investment-note": {
    photos: {
      hero: { src: `${SRC}/investments/investment-note-hero.jpg`, alt: "A young man in a black suit reading a document on a clipboard", author: "Mikhail Nilov", source: pexels("8730855"), license: PEXELS, position: "50% 30%" },
      body: { src: `${SRC}/investments/investment-note-body.jpg`, alt: "Two colleagues discussing notes across a desk in a high-rise office", author: "Antoni Shkraba", source: pexels("5583974"), license: PEXELS, position: "40% 40%" },
    },
    story: {
      eyebrow: "In short",
      title: "Ninety days, one rate, one certificate.",
      body: "The Investment Note is a short-term investment from ₦100,000 to ₦1,000,000 at 12% per annum, with a minimum tenor of 90 days. Funds stay invested until maturity, when you present your certificate to liquidate. Liquidating early attracts a 20% penalty on accrued interest.",
    },
    highlight: { value: "12%", label: "per annum" },
    figures: [
      { label: "Interest", value: "12% per annum" },
      { label: "Invest", value: "₦100,000 – ₦1,000,000" },
      { label: "Minimum tenor", value: "90 days" },
    ],
  },
  "financial-advisory": {
    photos: {
      hero: { src: `${SRC}/advisory/financial-advisory-hero.jpg`, alt: "A young man explaining a point across a table during a meeting", author: "Pavel Danilyuk", source: pexels("8152731"), license: PEXELS, position: "60% 35%" },
      body: { src: `${SRC}/advisory/financial-advisory-body.jpg`, alt: "Two professionals working through figures together on a laptop", author: "Yemi Festus", source: commons("Celebrating_International_Women%27s_day_60.jpg"), license: CC0, position: "50% 35%" },
    },
    story: {
      eyebrow: "How we work",
      title: "An assessment first, then a plan that keeps up.",
      body: "We start with a comprehensive assessment of your finances, build a plan and investment strategy around your circumstances, then monitor and adjust it with you. Support continues from qualified professionals, including retirement, pension and estate planning.",
    },
    highlight: { value: "SMEs and individuals", label: "strategic, operational, financial and capital needs" },
  },
  "small-business-advisory": {
    photos: {
      hero: { src: `${SRC}/advisory/small-business-advisory-hero.jpg`, alt: "A business owner and an adviser going through papers together across a desk", author: "Gustavo Fring", source: pexels("6285097"), license: PEXELS, position: "38% 35%" },
      body: { src: `${SRC}/advisory/small-business-advisory-body-vendor.jpg`, alt: "A trader at her roadside produce stall of peppers and tomatoes beside a busy Lagos street", author: "Godiva Omoruyi", source: pexels("23490764"), license: PEXELS, position: "55% 50%" },
    },
    story: {
      eyebrow: "Why small business",
      title: "The backbone of the economy deserves a plan.",
      body: "Our aim is to help you move your business from its present state to the state you want. We work with you on business planning, financial analysis and market research, support you on risk and operational efficiency, and open up networks and resources for growth.",
    },
    highlight: { value: "Planning, analysis, research", label: "plus support in risk management and operational efficiency" },
  },
  "micro-insurance-advisory": {
    photos: {
      hero: { src: `${SRC}/advisory/micro-insurance-advisory-hero.jpg`, alt: "A smiling farmer in a woven cap sitting in his field", author: "2xman Yef", source: pexels("33993456"), license: PEXELS, position: "50% 30%" },
      body: { src: `${SRC}/advisory/micro-insurance-advisory-body-farmer.jpg`, alt: "A smiling farmer holding freshly picked tomatoes in a green field in Kaduna, Nigeria", author: "Achor David", source: pexels("34705724"), license: PEXELS, position: "50% 40%" },
    },
    story: {
      eyebrow: "What cover is for",
      title: "Protection, priced for the risk you carry.",
      body: "Micro-insurance protects low-income earners against specific perils in exchange for regular premiums in proportion to the risk. We assess your needs and risk profile, explain the terms, conditions and exclusions, help you compare plans and choose the right cover, and stand with you through claims.",
    },
    highlight: { value: "Affordable cover", label: "explained, compared and supported through claims" },
  },
};
