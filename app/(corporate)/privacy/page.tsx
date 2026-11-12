import type { Metadata } from "next";
import { LegalDocument, type LegalBlock } from "@/app/components/corporate/LegalDocument";
import content from "@/data/legal/privacy.json";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Boctrust Microfinance Bank collects, uses and protects your personal data, and the rights you have over it.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" intro="We treat your privacy with the highest importance." blocks={content as LegalBlock[]} />;
}
