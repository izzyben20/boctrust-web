/**
 * Copy from the current site's public CMS (/api/site-content/content), lightly corrected for
 * grammar. Test strings live there today ("Toooooooooor", "With others oooo") and are excluded.
 */
export const COMPANY = {
  whoWeAre:
    "Boctrust Microfinance Bank is a financial institution licensed by the Central Bank of Nigeria to give social and economic support to the lower middle class, working class and the economically active poor.",
  mission:
    "We are committed to offering the highest level of professionalism and service with integrity to our partners and customers, while ensuring profitable returns to our shareholders.",
  vision: "To be the Number 1 Microfinance Bank in terms of customer service, profitability and returns on investment.",
  goal: "To provide an avenue for saving, access to credit and financial advisory services to individuals and micro, small and medium enterprises, with competitive advantages.",
  belief: "We believe in growing together with our customers.",
  explore:
    "We are committed to delivering excellent services, which we constantly aim to improve as a means of achieving optimum customer satisfaction. We maintain confidentiality in all our dealings with our customers.",
  experience:
    "With managers who have over two decades of banking experience across various sectors, we use our expertise to help you attain a better financial position and discover investment opportunities.",
  products:
    "We have different classes of banking products designed to meet your personal and business needs. As a bank for the economically active poor and young MSMEs, our products are convenient, efficient and streamlined, with the turnaround time to meet your immediate needs.",
  people: [
    "Our Board of Directors, comprising seasoned administrators and Chief Executives with commitment, strategic focus and leadership, is ably supported by a Management team with distinguished, diverse backgrounds in banking, innovative services and risk management, among others.",
    "We ensure quality with state-of-the-art information technology and extraordinary human capital committed to the highest standards in financial services. Our primary focus is service, service, and service.",
    "Our staff are well experienced in banking operations, with friendly customer service. With us, your needs and requests are best handled by a dynamic, skilled workforce.",
  ],
  promise: [
    "Faster approvals",
    "24/7 digital banking",
    "Lower interest rates",
    "Flexible repayment terms",
    "Reliable and consistent processing",
    "Secure and private transactions",
  ],
  values: [
    { title: "Innovation", body: "Creativity in our product development, leveraging robust information technology." },
    { title: "Respect", body: "Demonstrating respect for all individuals." },
    { title: "Customer Service", body: "We are committed to providing excellent customer service." },
    { title: "Integrity", body: "Honesty and honourable competition." },
  ],
  pillars: [
    {
      slug: "savings",
      title: "Savings",
      body: "Encouraging individuals, micro enterprises and cooperative societies to grow their savings and ease their transactions.",
    },
    {
      slug: "loans",
      title: "Loans",
      body: "Helping you cater to pressing needs, from personal purchases to the working capital that moves a business forward.",
    },
    {
      slug: "investments",
      title: "Investments",
      body: "Helping you secure the future by building up investment towards a target, at attractive interest rates.",
    },
    {
      slug: "advisory",
      title: "Advisory",
      body: "Expertise anchored on extensive business knowledge and technical know-how, for individuals and SMEs.",
    },
  ],
} as const;

/** From the current /careers page. */
export const CAREERS = {
  intro:
    "Our success is our people. We are very proud of those who work for us: talented, committed and resourceful. We are keen to discover more people who are equally good and share the same desire for quality and pride in what they do.",
  development:
    "With continuous training and development programmes, and professional courses from the best hands within and outside the country, we are out to maintain our standard of service to both our external and internal customers.",
  reasons: [
    {
      title: "Social impact",
      body: "We believe in the power of financial inclusion to transform lives. Join us and you help bring financial services to unbanked and underserved communities.",
    },
    {
      title: "Professional growth",
      body: "A dynamic, supportive environment that encourages creativity, collaboration and continuous learning, whether you are starting out or seeking new challenges.",
    },
    {
      title: "Entrepreneurial spirit",
      body: "We value innovative ideas and encourage you to take initiative, think differently and implement solutions with a real impact.",
    },
    {
      title: "Team culture",
      body: "Colleagues from diverse backgrounds, bringing a wealth of experiences and perspectives, in an environment where every voice is heard and valued.",
    },
    {
      title: "Technology-driven innovation",
      body: "Work with modern tools and systems, and help shape the future of financial services.",
    },
    {
      title: "Compensation and benefits",
      body: "A competitive package including salary, performance-based incentives, health insurance and retirement plans.",
    },
    {
      title: "Ethical, responsible practice",
      body: "Integrity is at the core of what we do. We hold ourselves to standards of governance that ensure transparency, fairness and accountability.",
    },
  ],
} as const;

/** From the current /loan page. */
export const LOAN_PAGE = {
  range: "₦50,000 – ₦500,000",
  applicants: ["Government Employee", "Private Employee", "Business Owner"],
  steps: [
    {
      title: "Enter your information",
      body: "Our application form asks for everything needed to complete your application online, including loan details, personal information and employer information.",
    },
    {
      title: "Get your credit assessment",
      body: "In line with industry best practice, our in-house team checks your application to see whether you qualify. If you do, we send you a message confirming your application.",
    },
    {
      title: "Receive your money",
      body: "Once your application is approved, we contact you and disburse your loan. We also offer financial advisory services to help you better manage your finances.",
    },
  ],
} as const;
