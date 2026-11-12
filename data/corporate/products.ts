/**
 * Every legacy product URL is preserved at its original root path.
 * Copy comes from the live product pages, with grammar corrected and these deliberate changes:
 *  - Fixed Deposit: the live description is a copy of the Ajo Plus text, and its "8%-15%" and
 *    "20% penalty on accrued interest" conflict with the July 2026 specification and rate guide.
 *    The newer documents are used here.
 *  - "Guaranteed returns" softened to describe a fixed rate.
 *  - Savings and investment pages no longer offer "Apply for Loan".
 */
export type ProductCategory = "savings" | "loans" | "investments" | "advisory";

export type CorporateProduct = {
  slug: string;
  name: string;
  category: ProductCategory;
  headline: string;
  intro: string;
  metaDescription: string;
  benefits: string[];
  features: string[];
  cta: "apply" | "account" | "advice" | "cheetah";
  image: string;
  imageAlt: string;
};

const IMG = "/images/corporate/scenes";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  savings: "Savings",
  loans: "Loans",
  investments: "Investments",
  advisory: "Advisory",
};

export const CORPORATE_PRODUCTS: CorporateProduct[] = [
  {
    slug: "regular-savings",
    name: "Regular Savings",
    category: "savings",
    headline: "Saving made a habit.",
    intro:
      "This encourages individuals, micro enterprises and cooperative societies to grow their savings and ease their transactions.",
    metaDescription:
      "A Boctrust Regular Savings account for individuals, micro enterprises and cooperatives. Save and withdraw at any time, with an ATM card, mobile banking and SMS alerts.",
    benefits: [
      "Easy and convenient",
      "Easy access to loans",
      "Can serve as collateral for loans",
      "ATM cards for all account holders",
      "Access to mobile banking and online banking",
      "SMS alerts on every transaction",
      "Easy cash deposits at our correspondent banks",
    ],
    features: [
      "Minimum opening balance of ₦1,000 to ₦5,000",
      "Save and withdraw from your account at any time",
      "Minimum account balance of ₦0 to ₦500",
      "1.5% interest per annum (savings account only)",
      "Interest will not be paid if withdrawals exceed three in a month",
    ],
    cta: "account",
    image: `${IMG}/two-women-tablet.jpg`,
    imageAlt: "Two women reviewing information together on a tablet",
  },
  {
    slug: "target-savings",
    name: "Target Savings",
    category: "savings",
    headline: "A date, a goal, a plan.",
    intro:
      "A high-interest account that encourages financial discipline through savings. It is designed to help micro-clients save towards specific projects or events with ease.",
    metaDescription:
      "Boctrust Target Savings helps you save towards a project or event, with daily, weekly or monthly savings and a minimum duration of 90 days.",
    benefits: [
      "Goal-oriented savings for specific financial targets",
      "Develops financial discipline and good saving habits",
      "Provides peace of mind and security",
      "Offers flexibility and control over your savings",
      "Enables planning for long-term financial goals",
    ],
    features: [
      "Minimum opening balance of ₦1,000",
      "Interest at 10% per annum",
      "Minimum duration of 90 days",
      "No monthly maintenance charge",
      "Termination before maturity attracts non-payment of interest",
      "Daily, weekly and monthly saving options",
    ],
    cta: "account",
    image: `${IMG}/woman-with-documents.jpg`,
    imageAlt: "A business owner smiling while holding documents",
  },
  {
    slug: "ajo-plus-account",
    name: "Ajo Plus Account",
    category: "savings",
    headline: "A little, every day.",
    intro:
      "For those who want to contribute daily for a number of months, with the option to withdraw when the need arises.",
    metaDescription:
      "The Boctrust Ajo Plus Account is for daily contributions set by you, with convenient withdrawals and cash deposits at our correspondent banks.",
    benefits: [
      "Easy and convenient deposits",
      "Convenient withdrawal system",
      "Easy cash deposits at our correspondent banks",
    ],
    features: [
      "Minimum daily contribution set by you",
      "No limit to contributions",
      "Save at any of our correspondent bank branches",
      "The bank's monthly commission is one day's contribution",
    ],
    cta: "account",
    image: `${IMG}/careers-team.jpg`,
    imageAlt: "Colleagues working together around a table",
  },
  {
    slug: "personal-loan",
    name: "Personal Loan",
    category: "loans",
    headline: "When life won't wait for payday.",
    intro:
      "A good way to make ends meet when bills stack up, the car breaks down or home remodelling is on the agenda. Or go ahead and add some spice to life by doing something special for your family.",
    metaDescription:
      "A Boctrust Personal Loan offers quick access to funds, a fixed repayment schedule and no collateral requirement. Apply online.",
    benefits: [
      "Flexible use for various purposes",
      "Quick access to funds",
      "Fixed repayment schedule",
      "Lower interest rates compared with other forms of credit",
      "Positive impact on credit score",
      "No collateral required",
    ],
    features: [
      "Loan amount based on eligibility",
      "Fixed or variable interest rates",
      "Monthly repayment options",
      "Credit assessment required",
      "Application covers personal and financial information",
    ],
    cta: "apply",
    image: `${IMG}/woman-with-documents.jpg`,
    imageAlt: "A customer smiling while holding her approved documents",
  },
  {
    slug: "salary-advance",
    name: "Salary Advance",
    category: "loans",
    headline: "Payday, a little earlier.",
    intro:
      "An exclusive lending programme for employees of organisations that have signed a Memorandum of Understanding with us. Employees of partner organisations can borrow up to 35% of their net monthly income, payable against the following month's salary.",
    metaDescription:
      "Staff of Boctrust partner organisations can borrow up to 35% of net monthly income with a Salary Advance, payable against the following month's salary.",
    benefits: [
      "Immediate access to funds before your regular payday",
      "Helps cover unexpected expenses or emergencies",
      "Avoids relying on high-interest loans or credit cards",
      "Allows timely bill payments and essential purchases",
      "Can be repaid through automatic deductions from future pay",
      "Minimises the need to borrow from friends or family",
      "Helps maintain financial stability and peace of mind",
    ],
    features: [
      "Available to employees with a regular income",
      "Quick and convenient application process",
      "Flexible repayment, often deducted from future pay",
      "Loan amounts based on salary and eligibility",
      "Short term, typically repaid within weeks or months",
      "Use it for expenses, bills or emergencies",
    ],
    cta: "apply",
    image: `${IMG}/blog-sme.jpg`,
    imageAlt: "A professional at his desk holding a tablet",
  },
  {
    slug: "sme-loan",
    name: "SME Loan",
    category: "loans",
    headline: "Capital for the next contract.",
    intro:
      "For businessmen and women from all sectors of the economy. This loan is geared towards working capital, raising finance against expected receivables, or the execution of jobs, and is extended to economically active individuals and small and medium scale entrepreneurs for business expansion.",
    metaDescription:
      "Boctrust SME Loans from ₦500,000 to ₦10 million, for 60 to 180 days, for working capital, receivables and business expansion.",
    benefits: [
      "Access to capital for small and medium enterprises",
      "Funds for expansion, equipment or working capital",
      "Helps SMEs seize growth opportunities",
      "Supports hiring, technology and new products",
      "Boosts cash flow and manages seasonal fluctuations",
      "Builds business credit history",
      "Enhances financial stability and sustainability",
    ],
    features: [
      "Loan amount between ₦500,000 and ₦10 million",
      "Tenure between 60 and 180 days",
      "Interest rate of 4%",
      "Securities: motor vehicle, C of O of landed property, or stock hypothecation",
      "Financial statement (for corporate customers)",
      "Company profile",
      "LPO finance customers: the LPO will be confirmed, and domiciliation of payment pursued if possible",
    ],
    cta: "apply",
    image: `${IMG}/advisor-two-customers.jpg`,
    imageAlt: "A banking advisor speaking with two customers",
  },
  {
    slug: "asset-backed-financing",
    name: "Asset Backed Financing",
    category: "loans",
    headline: "Own the tool that earns.",
    intro:
      "For the direct purchase of assets, both income-generating assets and household items, by business owners and salary earners. The objective is to help customers acquire equipment that boosts their income, or assets that improve their standard of living.",
    metaDescription:
      "Boctrust Asset Backed Financing helps business owners and salary earners buy equipment and assets, with tenure of up to 12 months.",
    benefits: [
      "Access to funds for purchasing or leasing essential assets",
      "Preserves working capital for other business needs",
      "Acquire equipment without large upfront costs",
      "Improves productivity and efficiency with modern assets",
      "Can be used for both new and used assets",
    ],
    features: [
      "Assets are bought in the name of Boctrust Microfinance Bank",
      "Customisable loan terms and repayment schedules",
      "20–40% of the asset's worth contributed by the customer",
      "Post-dated cheques from the beneficiary",
      "Two guarantors' cheques",
      "Equipment location or installation verification",
      "Beneficiary active in business for at least one year",
      "Asset must be insured",
      "Letter of undertaking not to dispose of the asset without clearance",
      "Interest rate of 4% per month",
      "Securities: motor vehicle, C of O of landed property, or stock hypothecation",
      "Tenure: maximum of 12 months",
    ],
    cta: "apply",
    image: `${IMG}/careers-growth.jpg`,
    imageAlt: "Two business people in conversation, reviewing a tablet",
  },
  {
    slug: "fixed-investment",
    name: "Fixed Deposit",
    category: "investments",
    headline: "Lock it. Let it earn.",
    intro:
      "Lock away a fixed sum for a set time to earn higher interest. Receive your principal and earned interest together at maturity, or take your interest upfront at the start of the deposit.",
    metaDescription:
      "A Boctrust Fixed Deposit from ₦100,000 and 30 days, earning from 6% to 18% a year depending on amount and term. Estimate your returns online.",
    benefits: [
      "A fixed rate, agreed at the start",
      "Flexible investment tenor",
      "Choose interest at maturity or upfront",
      "Larger sums and longer terms earn higher rates",
      "Can be used as collateral for loans",
    ],
    features: [
      "Certificate issued to investors",
      "Minimum tenor of 30 days",
      "Minimum amount of ₦100,000",
      "Rates from 6% to 18% a year, by amount and tenor; negotiable from ₦25 million",
      "Early withdrawal forfeits earned interest, plus a 5% penalty on the principal",
    ],
    cta: "cheetah",
    image: `${IMG}/blog-finance.jpg`,
    imageAlt: "Stacks of coins on financial charts beside a calculator",
  },
  {
    slug: "investment-note",
    name: "Investment Note",
    category: "investments",
    headline: "Short term. Serious intent.",
    intro:
      "A short-term investment product that encourages deposits from high-net-worth individuals and customers with pocket-sized deposits alike, earning higher rates than a normal savings account.",
    metaDescription:
      "The Boctrust Investment Note is a short-term investment from ₦100,000 to ₦1,000,000, with a minimum tenor of 90 days at 12% per annum.",
    benefits: [
      "Potential for higher returns than traditional savings accounts",
      "Flexibility in investment duration and amount",
      "Lower minimum investment than many other options",
      "Potential for passive income generation",
    ],
    features: [
      "Certificate issued to investors",
      "Minimum tenor of 90 days",
      "Funds are not accessible until maturity",
      "Interest of 12% per annum",
      "Minimum investment of ₦100,000; maximum of ₦1,000,000",
      "Certificate should be presented before liquidation",
      "Liquidation before maturity attracts a 20% penalty on accrued interest",
    ],
    cta: "account",
    image: `${IMG}/careers-tech.jpg`,
    imageAlt: "A person reviewing figures on a laptop at home",
  },
  {
    slug: "financial-advisory",
    name: "Financial Advisory",
    category: "advisory",
    headline: "Sharper decisions, with company.",
    intro:
      "Our expertise is anchored on extensive business knowledge and technical know-how. We help customers with the strategic, operational, financial and capital needs of their businesses, and advise on the full spectrum of financial and transactional challenges that can hold SMEs back.",
    metaDescription:
      "Boctrust Financial Advisory supports SMEs and individuals on strategic, operational, financial and capital needs, with planning and ongoing support.",
    benefits: [
      "Expert guidance for financial planning and wealth management",
      "Assistance in setting and achieving financial goals",
      "Improved understanding of investment options and risk",
      "Objective recommendations based on your circumstances",
      "Help optimising tax strategies and returns",
      "Confidence in making informed financial decisions",
    ],
    features: [
      "Comprehensive financial assessment and analysis",
      "Customised planning and investment strategies",
      "Regular monitoring and adjustment of plans",
      "Access to a range of investment products",
      "Retirement planning and pension advice",
      "Estate planning and wealth transfer guidance",
      "Ongoing support from qualified professionals",
    ],
    cta: "advice",
    image: `${IMG}/advisor-two-customers.jpg`,
    imageAlt: "An advisor discussing plans with two clients",
  },
  {
    slug: "small-business-advisory",
    name: "Small Business Advisory",
    category: "advisory",
    headline: "From where you are, to where you're headed.",
    intro:
      "Small business is the backbone of the economy, hence our commitment to its growth, expansion and sustained development. Our aim is to help clients move their businesses from their present state to their desired state.",
    metaDescription:
      "Boctrust Small Business Advisory offers guidance on business planning, financial analysis, market research, risk management and operational efficiency.",
    benefits: [
      "Strategic direction and improved decision-making",
      "Enhanced financial performance and profitability",
      "Accelerated growth and market expansion",
      "Reduced risks and avoidance of common pitfalls",
      "Professional development and mentoring",
      "Solutions tailored to your business",
      "Increased competitiveness and market positioning",
    ],
    features: [
      "Expert guidance across various business areas",
      "Help with business planning, financial analysis and market research",
      "Support in risk management and operational efficiency",
      "Access to networks and resources for growth",
    ],
    cta: "advice",
    image: `${IMG}/careers-impact.jpg`,
    imageAlt: "A smiling young professional at his laptop",
  },
  {
    slug: "micro-insurance-advisory",
    name: "Micro Insurance Advisory",
    category: "advisory",
    headline: "Protect what you've built.",
    intro:
      "Every business needs protection through appropriate insurance. We provide timely advisory services on micro-insurance policies, with which low-income earners are protected against specific perils in exchange for regular premium payments proportionate to the likelihood and cost of the risk involved.",
    metaDescription:
      "Boctrust Micro Insurance Advisory helps you choose affordable cover, understand policy terms and get support through the claims process.",
    benefits: [
      "Access to affordable insurance options for low-income individuals",
      "Protection against unforeseen risks and losses",
      "Guidance in selecting suitable micro-insurance products",
      "Improved understanding of terms and coverage",
      "Assistance in filing claims",
    ],
    features: [
      "Expert advice on micro-insurance products and providers",
      "Evaluation of individual needs and risk profiles",
      "Education on insurance principles and policies",
      "Help determining appropriate coverage levels",
      "Support comparing and selecting plans",
      "Help understanding terms, conditions and exclusions",
      "Assistance during claims settlement",
    ],
    cta: "advice",
    image: `${IMG}/staff.jpg`,
    imageAlt: "A group of Boctrust professionals standing together",
  },
];

export const getCorporateProduct = (slug: string) => CORPORATE_PRODUCTS.find((p) => p.slug === slug);

export const productsByCategory = (category: ProductCategory) =>
  CORPORATE_PRODUCTS.filter((p) => p.category === category);
