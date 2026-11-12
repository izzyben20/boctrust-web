import Link from "next/link";
import type { FaqItem } from "@/data/faq/types";
import { ArrowRight } from "../ui/icons";
import { Accordion } from "../shared/Accordion";
import { JsonLd } from "../shared/JsonLd";

export function CheetahFaq({ items, id, title = "Good to know", className = "", moreLink = false }: { items: FaqItem[]; id?: string; title?: string; className?: string; moreLink?: boolean }) {
  return (
    <section id={id} className={`wrap grid scroll-mt-24 gap-8 py-16 lg:grid-cols-12 lg:py-28 ${className}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <div className="lg:col-span-4">
        <h2 className="display-md">{title}</h2>
        {moreLink && (
          <Link href="/cheetah/faqs" className="mt-4 inline-flex min-h-11 items-center gap-2 font-display font-bold">
            See all questions <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <Accordion
          items={items}
          itemClassName="mb-2 rounded-2xl bg-stride-mist px-5"
          questionClassName="font-display text-lg font-bold tracking-tight"
          answerClassName="pb-5 pr-6 text-stride-night/80"
          iconClassName="size-9 bg-white border-transparent"
        />
      </div>
    </section>
  );
}
