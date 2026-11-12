import type { Metadata } from "next";
import Link from "next/link";
import { FaqExplorer } from "@/app/components/cheetah/FaqExplorer";
import { Reveal } from "@/app/components/shared/Reveal";
import { ArrowRight, ClockIcon, MailIcon, PhoneIcon } from "@/app/components/ui/icons";
import { SITE } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FAQs and Help Centre",
  description: "Answers on getting started with Cheetah by Boctrust, account tiers and security, savings products, deposits and withdrawals, transfers, payments and interest.",
  path: "/cheetah/faqs",
  brand: "cheetah",
});

export default function CheetahFaqsPage() {
  const { phones, email, hours } = SITE.contact;
  return (
    <>
      <FaqExplorer />
      <section aria-labelledby="support-heading" className="bg-stride-mist">
        <div className="wrap grid gap-8 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
          <Reveal className="lg:col-span-5">
            <h2 id="support-heading" className="display-md">Still need a hand?</h2>
            <p className="mt-3 max-w-md text-stride-night/80">Talk to the Boctrust team, or chat with Customer Support from the app&apos;s Settings.</p>
            <Link href="/contact" className="mt-6 inline-flex min-h-13 items-center gap-2 rounded-full bg-stride-night px-6 font-display font-bold text-white transition-colors hover:bg-stride-deep">
              Contact Boctrust <ArrowRight className="size-5" />
            </Link>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t-2 border-stride-night">
              <li className="border-b border-stride-night/15">
                <a href={phones[0].href} className="flex min-h-16 items-center gap-4 py-3 font-display text-lg font-bold tracking-tight">
                  <PhoneIcon className="size-5 shrink-0 text-stride-deep" /> {phones[0].display}
                </a>
              </li>
              <li className="border-b border-stride-night/15">
                <a href={`mailto:${email}`} className="flex min-h-16 items-center gap-4 py-3 font-display text-lg font-bold tracking-tight break-all">
                  <MailIcon className="size-5 shrink-0 text-stride-deep" /> {email}
                </a>
              </li>
              <li className="flex min-h-16 items-center gap-4 border-b border-stride-night/15 py-3 text-stride-night/80">
                <ClockIcon className="size-5 shrink-0 text-stride-deep" /> {hours}
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
