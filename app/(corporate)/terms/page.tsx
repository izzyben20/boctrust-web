import type { Metadata } from "next";
import { LegalDocument, type LegalBlock } from "@/app/components/corporate/LegalDocument";
import content from "@/data/legal/terms.json";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms and Conditions",
  description: "The website access agreement that applies when you use the Boctrust Microfinance Bank website.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalDocument title="Terms & Conditions" intro="The agreement that applies when you use this website." blocks={content as LegalBlock[]} />;
}
