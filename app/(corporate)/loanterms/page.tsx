import type { Metadata } from "next";
import { LegalDocument, type LegalBlock } from "@/app/components/corporate/LegalDocument";
import content from "@/data/legal/loanterms.json";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Loan Terms and Conditions",
  description: "The terms and conditions that regulate credit facilities advanced by Boctrust Microfinance Bank.",
  path: "/loanterms",
});

export default function LoanTermsPage() {
  return <LegalDocument title="Loan Terms & Conditions" intro="The terms that regulate credit facilities from Boctrust." blocks={content as LegalBlock[]} />;
}
