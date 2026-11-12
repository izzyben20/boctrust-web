import type { Metadata } from "next";
import { CHEETAH, SITE } from "@/config/site";
import { verifiedClaims } from "@/config/regulatory";
import type { FaqItem } from "@/data/faq/types";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  brand?: "boctrust" | "cheetah";
  /** Use the title exactly as given, without the brand suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  image?: string;
  type?: "website" | "article";
};

export function pageMeta({
  title,
  description,
  path,
  brand = "boctrust",
  absoluteTitle,
  noindex,
  image,
  type = "website",
}: MetaInput): Metadata {
  const suffix = brand === "cheetah" ? CHEETAH.fullName : SITE.shortName;
  const fullTitle = absoluteTitle ? title : `${title} | ${suffix}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type,
      siteName: brand === "cheetah" ? CHEETAH.fullName : SITE.name,
      locale: "en_NG",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(image ? { images: [image] } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const absoluteUrl = (path: string): string => `${SITE.url}${path}`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BankOrCreditUnion",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: absoluteUrl("/logos/boctrust-stacked.svg"),
    slogan: SITE.tagline,
    description: SITE.description,
    email: SITE.contact.email,
    telephone: SITE.contact.phones[0].href.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.contact.address,
      addressLocality: SITE.contact.city,
      addressCountry: SITE.contact.country,
    },
    sameAs: SITE.socials.map((s) => s.href),
    hasCredential: verifiedClaims().map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.statement,
      recognizedBy: { "@type": "GovernmentOrganization", name: c.authority },
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function productJsonLd({
  name,
  description,
  path,
  category,
}: {
  name: string;
  description: string;
  path: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name,
    description,
    url: absoluteUrl(path),
    category,
    provider: { "@id": `${SITE.url}/#organization`, "@type": "BankOrCreditUnion", name: SITE.legalName },
  };
}
