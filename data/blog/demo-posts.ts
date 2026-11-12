import type { BlogPost } from "./types";

/**
 * DEMO CONTENT. These articles are placeholders written for the design and are not Boctrust
 * publications. They contain general guidance only, with no invented statistics or rates.
 * Replace them through lib/blog.ts when a CMS is connected.
 */
const IMG = "/images/corporate/scenes";
const AUTHOR = "Boctrust Insights (demo)";

export const DEMO_POSTS: BlogPost[] = [
  {
    slug: "the-three-pots-every-household-budget-needs",
    title: "The three pots every household budget needs",
    excerpt:
      "Money that has no job tends to disappear. Giving it three simple homes makes the month easier to plan and easier to survive.",
    category: "Personal Finance",
    author: AUTHOR,
    publishedAt: "2026-10-20",
    readingMinutes: 5,
    image: `${IMG}/two-women-tablet.jpg`,
    imageAlt: "Two women planning together with a tablet",
    featured: true,
    isDemo: true,
    body: [
      { type: "paragraph", text: "Most budgeting advice fails because it asks too much. Long spreadsheets are abandoned by the second week. A simpler question works better: where should this money live?" },
      { type: "heading", text: "Pot one: this month" },
      { type: "paragraph", text: "Rent, food, transport and bills belong here. Work out what a normal month costs, and move that amount aside as soon as income arrives. What remains is what you truly have to work with." },
      { type: "heading", text: "Pot two: just in case" },
      { type: "paragraph", text: "Emergencies are rarely a surprise in general, only in their timing. Keep this money somewhere you can reach quickly, but not so close that it gets spent by accident." },
      { type: "quote", text: "The goal of an emergency pot is not to earn the most. It is to be there on the day you need it." },
      { type: "heading", text: "Pot three: later" },
      { type: "paragraph", text: "School fees, a business idea, a home. This is money with a date on it, so it can be put somewhere that rewards you for leaving it alone." },
      { type: "list", items: ["Automate the transfers so the decision only happens once.", "Review the amounts when your income changes.", "Start small: the habit matters more than the size."] },
    ],
  },
  {
    slug: "reading-a-loan-offer-before-you-sign",
    title: "How to read a loan offer before you sign",
    excerpt:
      "The monthly repayment is only one line of the story. Here are the questions worth asking before you accept any credit.",
    category: "Personal Finance",
    author: AUTHOR,
    publishedAt: "2026-10-02",
    readingMinutes: 6,
    image: `${IMG}/woman-with-documents.jpg`,
    imageAlt: "A woman smiling while holding loan documents",
    isDemo: true,
    body: [
      { type: "paragraph", text: "A loan can be a useful tool, especially when it funds something that pays you back. But two offers with similar repayments can cost very different amounts overall." },
      { type: "heading", text: "Start with the total" },
      { type: "paragraph", text: "Multiply the repayment by the number of instalments, then compare that figure with what you are borrowing. The difference is the real price of the money." },
      { type: "heading", text: "Questions to ask" },
      { type: "list", items: ["Is the interest rate monthly or yearly?", "Are there fees on top of the interest?", "What happens if I repay early?", "What happens if I miss a payment?", "What security or guarantors are required?"] },
      { type: "heading", text: "Match the term to the purpose" },
      { type: "paragraph", text: "Short-term needs suit short-term credit. Stretching a small expense over a long period can leave you paying for something long after it has gone." },
      { type: "quote", text: "If you do not understand a term, ask before you sign. A good lender will explain it." },
    ],
  },
  {
    slug: "why-cash-flow-matters-more-than-profit",
    title: "Why small businesses should watch cash flow before profit",
    excerpt:
      "A business can look profitable on paper and still run out of money. A simple weekly habit can show you trouble while there is time to act.",
    category: "SME Advisory",
    author: AUTHOR,
    publishedAt: "2026-09-18",
    readingMinutes: 7,
    image: `${IMG}/advisor-two-customers.jpg`,
    imageAlt: "An advisor discussing business plans with two clients",
    isDemo: true,
    body: [
      { type: "paragraph", text: "Profit tells you whether your prices and costs make sense over time. Cash tells you whether you can pay your suppliers on Friday. A growing business needs both, but cash is what keeps the doors open." },
      { type: "heading", text: "The timing gap" },
      { type: "paragraph", text: "You may buy stock today, sell it next month and be paid the month after. Each of those gaps must be funded by something, and growth often makes them wider." },
      { type: "heading", text: "A simple weekly habit" },
      { type: "list", items: ["List what you expect to receive over the next four weeks.", "List what you must pay over the same period.", "Note the weeks when payments exceed receipts.", "Act early: chase invoices, adjust orders or arrange finance."] },
      { type: "quote", text: "The best time to arrange working capital is before you urgently need it." },
      { type: "paragraph", text: "Keep personal and business money apart as well. It is hard to see how a business is doing when the two are mixed." },
    ],
  },
  {
    slug: "a-practical-guide-to-buying-business-equipment",
    title: "Buy, lease or finance? A practical guide to business equipment",
    excerpt:
      "The right machine can transform your output. Before you spend, weigh what it earns against what it ties up.",
    category: "SME Advisory",
    author: AUTHOR,
    publishedAt: "2026-08-27",
    readingMinutes: 5,
    image: `${IMG}/careers-growth.jpg`,
    imageAlt: "Two business people reviewing figures on a tablet",
    isDemo: true,
    body: [
      { type: "paragraph", text: "Equipment decisions are rarely only about price. They are about what your working capital could be doing instead, and how quickly the asset begins to pay for itself." },
      { type: "heading", text: "Do the simple sums" },
      { type: "paragraph", text: "Estimate how much extra income or saved cost the equipment brings each month. Set that against its total cost, including insurance, maintenance and any financing." },
      { type: "heading", text: "Before you commit" },
      { type: "list", items: ["Can you service and insure it reliably?", "Is a good used model enough?", "How much of your working capital would it consume?", "What would you do if demand dropped for a few months?"] },
      { type: "paragraph", text: "Asset finance spreads the cost and preserves cash, while usually requiring a contribution from you and evidence of business activity. Ask about those requirements early." },
    ],
  },
  {
    slug: "how-ajo-went-digital",
    title: "Ajo is old. What changes when it goes digital?",
    excerpt:
      "Rotating savings have helped communities for generations. Technology does not replace the trust at the centre, but it can make the record-keeping far easier.",
    category: "Saving",
    author: AUTHOR,
    publishedAt: "2026-08-05",
    readingMinutes: 4,
    image: `${IMG}/careers-team.jpg`,
    imageAlt: "A group of colleagues gathered around a table",
    isDemo: true,
    body: [
      { type: "paragraph", text: "Ajo and Esusu rest on a simple idea: a group contributes regularly, and each member takes a turn collecting the full pot. A large sum arrives without a loan." },
      { type: "heading", text: "What stays the same" },
      { type: "paragraph", text: "Trust. Every member depends on the others to keep contributing after their own turn has passed. Choose your group with care, whatever tool you use." },
      { type: "heading", text: "What gets easier" },
      { type: "list", items: ["A shared record of who has paid.", "A clear, agreed payout order.", "Reminders that take the awkwardness out of asking.", "A defined end, once everyone has been paid."] },
      { type: "quote", text: "The technology is new. The promise between members is not." },
    ],
  },
  {
    slug: "fixed-or-flexible-where-should-savings-sit",
    title: "Fixed or flexible: where should your savings sit?",
    excerpt:
      "Higher returns usually ask for less access. The right mix depends on when you will need the money, not just on the rate.",
    category: "Saving",
    author: AUTHOR,
    publishedAt: "2026-07-14",
    readingMinutes: 4,
    image: `${IMG}/blog-finance.jpg`,
    imageAlt: "Stacks of coins resting on printed financial charts",
    isDemo: true,
    body: [
      { type: "paragraph", text: "It is tempting to chase the highest number on the page. But a rate only pays out if you can leave the money alone for the whole term." },
      { type: "heading", text: "Start with the date" },
      { type: "paragraph", text: "Ask when you will need this money. If the answer is any day now, access matters most. If it is next year, you can afford to commit." },
      { type: "heading", text: "Check the cost of changing your mind" },
      { type: "paragraph", text: "Fixed products often carry penalties for early withdrawal. Read them before you commit, and do not lock away money you may need for an emergency." },
      { type: "list", items: ["Keep emergency money flexible.", "Commit money with a known future date.", "Use several products: it does not have to be either-or."] },
    ],
  },
];
