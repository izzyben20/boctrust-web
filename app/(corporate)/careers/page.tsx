import type { Metadata } from "next";
import Image from "next/image";
import { Enter } from "@/app/components/shared/Enter";
import { Reveal } from "@/app/components/shared/Reveal";
import { ArrowUpRight, MailIcon } from "@/app/components/ui/icons";
import { APP_LINKS } from "@/config/links";
import { SITE } from "@/config/site";
import { CAREERS } from "@/data/corporate/company";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description:
    "Our success is our people. Discover why talented, committed people choose a career at Boctrust Microfinance Bank, and how to join us.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <section className="wrap grid gap-8 pt-12 pb-16 lg:grid-cols-12 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-7">
          <Enter>
            <p className="eyebrow text-gold-deep">Careers at Boctrust</p>
            <h1 className="display-hero mt-4 text-navy">
              Our success <span className="text-gold-deep">is our people.</span>
            </h1>
          </Enter>
          <Enter delay={0.1}>
            <p className="lede mt-8 max-w-2xl text-ink-soft">{CAREERS.intro}</p>
            <p className="mt-4 max-w-2xl text-ink-soft">{CAREERS.development}</p>
          </Enter>
        </div>
        {/* An overlapping collage, rather than one stock image */}
        <Enter className="relative min-h-[28rem] lg:col-span-5" delay={0.15}>
          <div className="absolute top-0 right-0 aspect-[4/5] w-[68%] overflow-hidden rounded-t-full bg-ivory">
            <Image src="/images/corporate/scenes/careers-impact.jpg" alt="A smiling young professional at his laptop" fill priority sizes="(max-width: 1024px) 62vw, 28vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 aspect-square w-[55%] overflow-hidden rounded-2xl border-8 border-paper bg-ivory">
            <Image src="/images/corporate/scenes/careers-team.jpg" alt="Colleagues working around a table" fill sizes="(max-width: 1024px) 50vw, 22vw" className="object-cover" />
          </div>
        </Enter>
      </section>

      <section className="bg-navy text-white">
        <div className="wrap py-16 lg:py-28">
          <Reveal>
            <h2 className="display-md max-w-4xl">Seven reasons to join us.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {CAREERS.reasons.map((reason, index) => (
              <Reveal as="li" key={reason.title} delay={(index % 3) * 0.07} className={`flex flex-col gap-8 bg-navy p-6 lg:p-8 ${index === 6 ? "lg:col-span-3" : ""}`}>
                <span className="tabular font-display text-4xl font-bold text-gold">{index + 1}</span>
                <div>
                  <h3 className="display-sm">{reason.title}</h3>
                  <p className="mt-2 text-white/75">{reason.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap py-16 lg:py-24">
        <div className="grid gap-8 rounded-[2rem] bg-gold-pale p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14">
          <div className="lg:col-span-7">
            <h2 className="display-md text-navy">Vacancies</h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              There are no open roles listed here at the moment. You can still submit an application, or write to us to tell us what you would bring.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <a href={APP_LINKS.boctrust.jobApplication} className="flex min-h-13 items-center gap-2 rounded-full bg-navy px-6 font-display font-bold text-white">
              Job application <ArrowUpRight className="size-4" />
            </a>
            <a href={`mailto:${SITE.contact.email}?subject=Career%20enquiry`} className="flex min-h-13 items-center gap-2 rounded-full border-2 border-navy px-6 font-display font-bold text-navy">
              <MailIcon className="size-4" /> Email us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
