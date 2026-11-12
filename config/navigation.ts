export type NavItem = {
  label: string;
  href?: string;
  description?: string;
  /** Marks a link that leaves this site. */
  external?: boolean;
  /** Renders with the highlighted treatment. */
  featured?: boolean;
  children?: NavItem[];
};

export const CORPORATE_NAV: NavItem[] = [
  {
    label: "Our Products",
    children: [
      {
        label: "Savings",
        description: "Build the habit, fund the goal",
        children: [
          { label: "Regular Savings", href: "/regular-savings", description: "Save and withdraw at any time" },
          { label: "Target Savings", href: "/target-savings", description: "Save towards a specific project" },
          { label: "Ajo Plus Account", href: "/ajo-plus-account", description: "Daily contributions, set by you" },
        ],
      },
      {
        label: "Loans",
        description: "Credit for personal and business needs",
        children: [
          { label: "Apply for a Loan", href: "/loan", description: "How it works, in three steps" },
          { label: "Personal Loan", href: "/personal-loan", description: "For when bills stack up" },
          { label: "Salary Advance", href: "/salary-advance", description: "For staff of partner employers" },
          { label: "SME Loan", href: "/sme-loan", description: "Working capital for business" },
          { label: "Asset Backed Financing", href: "/asset-backed-financing", description: "Buy equipment and assets" },
        ],
      },
      {
        label: "Investments",
        description: "Put idle money to work",
        children: [
          { label: "Fixed Deposit", href: "/fixed-investment", description: "Lock a sum for a set term" },
          { label: "Investment Note", href: "/investment-note", description: "A short-term investment" },
        ],
      },
      {
        label: "Advisory",
        description: "Expertise, as well as capital",
        children: [
          { label: "Financial Advisory", href: "/financial-advisory", description: "Plan with experienced hands" },
          { label: "Small Business Advisory", href: "/small-business-advisory", description: "Grow from where you are" },
          { label: "Micro Insurance Advisory", href: "/micro-insurance-advisory", description: "Protect what you build" },
        ],
      },
      {
        label: "Cheetah",
        href: "/cheetah",
        description: "Our digital savings and payments app",
        featured: true,
      },
    ],
  },
  {
    label: "Business Banking",
    children: [
      { label: "SME Loan", href: "/sme-loan", description: "Working capital and expansion finance" },
      { label: "Asset Backed Financing", href: "/asset-backed-financing", description: "Acquire income-generating equipment" },
      { label: "Small Business Advisory", href: "/small-business-advisory", description: "Planning, analysis and market research" },
      { label: "Financial Advisory", href: "/financial-advisory", description: "Strategic, operational and capital needs" },
    ],
  },
  {
    label: "About Boctrust",
    children: [
      { label: "Who We Are", href: "/about", description: "Our vision, mission and values" },
      { label: "Board of Directors", href: "/board", description: "The people guiding the bank" },
      { label: "Management Team", href: "/management", description: "The people running it" },
      { label: "Careers", href: "/careers", description: "Why join us" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog & Insights", href: "/blogs", description: "Ideas on money and enterprise" },
      { label: "Support", href: "/support", description: "Answers and how to reach us" },
      { label: "Loan Terms", href: "/loanterms", description: "Terms for our credit facilities" },
      { label: "Privacy Policy", href: "/privacy", description: "How we treat your data" },
      { label: "Terms & Conditions", href: "/terms", description: "Using this website" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const CHEETAH_NAV: NavItem[] = [
  {
    label: "Savings",
    children: [
      { label: "Boc Fixed Savings", href: "/cheetah/savings/fixed", description: "Lock it. Earn more." },
      { label: "Boc SmartSave", href: "/cheetah/savings/smartsave", description: "Automate a goal." },
      { label: "Boc Flex Savings", href: "/cheetah/savings/flex", description: "Save and withdraw daily." },
      { label: "Boc Padi", href: "/cheetah/savings/padi", description: "Save with your people." },
    ],
  },
  { label: "Payments", href: "/cheetah/payments" },
  { label: "Calculator", href: "/cheetah/calculator" },
  { label: "About Us", href: "/cheetah/about" },
  { label: "FAQs", href: "/cheetah/faqs" },
];

export const CORPORATE_FOOTER: { title: string; links: NavItem[] }[] = [
  {
    title: "Save & invest",
    links: [
      { label: "Regular Savings", href: "/regular-savings" },
      { label: "Target Savings", href: "/target-savings" },
      { label: "Ajo Plus Account", href: "/ajo-plus-account" },
      { label: "Fixed Deposit", href: "/fixed-investment" },
      { label: "Investment Note", href: "/investment-note" },
      { label: "Cheetah app", href: "/cheetah" },
    ],
  },
  {
    title: "Borrow & grow",
    links: [
      { label: "Apply for a Loan", href: "/loan" },
      { label: "Personal Loan", href: "/personal-loan" },
      { label: "Salary Advance", href: "/salary-advance" },
      { label: "SME Loan", href: "/sme-loan" },
      { label: "Asset Backed Financing", href: "/asset-backed-financing" },
      { label: "Financial Advisory", href: "/financial-advisory" },
      { label: "Small Business Advisory", href: "/small-business-advisory" },
      { label: "Micro Insurance Advisory", href: "/micro-insurance-advisory" },
    ],
  },
  {
    title: "The bank",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Board of Directors", href: "/board" },
      { label: "Management Team", href: "/management" },
      { label: "Careers", href: "/careers" },
      { label: "Blog & Insights", href: "/blogs" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Loan Terms", href: "/loanterms" },
];
