import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/app/components/shared/Accordion";
import { JsonLd } from "@/app/components/shared/JsonLd";
import { Enter } from "@/app/components/shared/Enter";
import { ArrowRight, MailIcon, PhoneIcon } from "@/app/components/ui/icons";
import { LEGAL_LINKS } from "@/config/navigation";
import { SITE } from "@/config/site";
import { CORPORATE_FAQS } from "@/data/faq/corporate";
import { faqJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Support and Help Centre",
  description:
    "Find answers about Boctrust savings, loans, fixed deposits and advisory services, or reach our support team by phone or email.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(CORPORATE_FAQS)} />
      <section className="relative isolate overflow-hidden bg-gold-pale">
        <div className="wrap py-16 lg:py-24">
          <Enter>
            <p className="eyebrow text-gold-deep">Help centre</p>
            <h1 className="display-page mt-4 max-w-4xl text-navy">How can we help you today?</h1>
            <p className="lede mt-5 max-w-2xl text-ink-soft">Browse common questions, or reach us directly if you need personal support.</p>
          </Enter>
        </div>
      </section>
      <section className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <h2 className="display-md text-navy">Common questions</h2>
          <div className="mt-8 border-t-2 border-navy">
            <Accordion items={CORPORATE_FAQS} />
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="sticky top-32 grid gap-4">
            <div className="rounded-3xl bg-navy p-6 text-white">
              <h2 className="display-sm">Talk to a person</h2>
              <p className="mt-2 text-sm text-white/75">{SITE.contact.hours}</p>
              <ul className="mt-4 grid gap-1">
                {SITE.contact.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className="flex min-h-11 items-center gap-3 font-display font-bold hover:text-gold">
                      <PhoneIcon className="size-5 text-gold" /> {phone.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${SITE.contact.email}`} className="flex min-h-11 items-center gap-3 font-display font-bold break-all hover:text-gold">
                    <MailIcon className="size-5 shrink-0 text-gold" /> {SITE.contact.email}
                  </a>
                </li>
              </ul>
              <Link href="/contact" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold font-display font-bold text-navy">
                Contact us <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-rule p-6">
              <h2 className="display-sm text-navy">Policies</h2>
              <ul className="mt-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href ?? "#"} className="flex min-h-11 items-center justify-between border-b border-rule font-medium text-navy hover:underline">
                      {link.label} <ArrowRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
