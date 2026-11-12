import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Enter } from "@/app/components/shared/Enter";
import { Reveal } from "@/app/components/shared/Reveal";
import { ArrowRight, ArrowUpRight } from "@/app/components/ui/icons";
import { APP_LINKS } from "@/config/links";
import { LOAN_PAGE } from "@/data/corporate/company";
import { productsByCategory } from "@/data/corporate/products";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Quick and Easy Loans for Anyone",
  description:
    "Take care of your personal needs or grow your small business. Apply online for a Boctrust loan from ₦50,000 to ₦500,000 as a government employee, private employee or business owner.",
  path: "/loan",
});

export default function LoanPage() {
  return (
    <>
      {/* Navy, with the borrower's portrait between the words and the answer to "how much?" */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="wrap grid gap-10 py-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <Enter>
              <p className="eyebrow text-gold">Apply for a loan</p>
              <h1 className="display-page mt-4">Quick and easy loans for anyone.</h1>
              <p className="lede mt-5 max-w-xl text-white/85">Take care of your personal needs or grow your small business with our quick loans.</p>
            </Enter>
          </div>
          <Enter delay={0.06} y={20} as="figure" className="relative mx-auto w-full max-w-[24rem] lg:col-span-4 lg:max-w-none">
            <span aria-hidden className="absolute -top-4 -right-4 h-2/3 w-2/3 bg-gold" />
            <div className="relative aspect-4/5 overflow-hidden bg-navy-soft">
              <Image
                src="/images/corporate/products/loans/loan-hero-shoe-shop.jpg"
                alt="A smiling shop owner standing behind the counter of her shoe shop, its shelves full of stock"
                fill
                preload
                sizes="(max-width: 1024px) 24rem, 30vw"
                className="object-cover object-[50%_32%]"
              />
            </div>
          </Enter>
          {/* The hero's focal point: the actual answer to "how much?" */}
          <Enter className="lg:col-span-4" delay={0.12}>
            <div className="rounded-3xl bg-paper p-6 text-navy sm:p-8">
              <p className="eyebrow text-gold-deep">Loan amount range</p>
              <p className="tabular mt-2 font-display text-[clamp(1.9rem,4vw,3rem)] leading-none font-black tracking-tight">{LOAN_PAGE.range}</p>
              <p className="mt-6 font-display font-bold">For every kind of earner</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {LOAN_PAGE.applicants.map((applicant) => (
                  <li key={applicant} className="rounded-full bg-ivory px-3 py-1.5 text-sm font-medium">{applicant}</li>
                ))}
              </ul>
              <a href={APP_LINKS.boctrust.applyForLoan} className="mt-7 flex min-h-14 items-center justify-center gap-2 rounded-full bg-navy font-display font-bold text-white transition-colors hover:bg-gold hover:text-navy">
                Apply now <ArrowUpRight className="size-5" />
              </a>
              <p className="mt-3 text-center text-xs text-ink-soft">
                Subject to credit assessment. See our <Link href="/loanterms" className="underline">loan terms</Link>.
              </p>
            </div>
          </Enter>
        </div>
      </section>

      <section className="wrap py-16 lg:py-28">
        <Reveal>
          <h2 className="display-md max-w-3xl text-navy">Three steps to your money.</h2>
        </Reveal>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {LOAN_PAGE.steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.08} className={`border-t-2 border-navy pt-4 ${["", "md:mt-14", "md:mt-28"][index]}`}>
              <span className="tabular font-display text-4xl font-bold text-gold-deep">{index + 1}</span>
              <h3 className="display-sm mt-5 text-navy">{step.title}</h3>
              <p className="mt-2 text-ink-soft">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-ivory">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-4/3 overflow-hidden rounded-t-[10rem] rounded-b-2xl bg-rule">
              <Image
                src="/images/corporate/products/loans/loan-options-couple.jpg"
                alt="A couple at their kitchen table going through documents together with a laptop open"
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover object-[50%_45%]"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="display-md text-navy">Looking for something specific?</h2>
            <ul className="mt-6 border-t-2 border-navy">
              {productsByCategory("loans").map((product) => (
                <li key={product.slug} className="border-b border-rule">
                  <Link href={`/${product.slug}`} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                    <span>
                      <span className="block font-display text-xl font-bold tracking-tight text-navy">{product.name}</span>
                      <span className="block text-sm text-ink-soft">{product.headline}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
