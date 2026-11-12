import Link from "next/link";
import type { ReactNode } from "react";
import { ACCOUNT_TIERS } from "@/data/cheetah/products";
import { Reveal } from "../../shared/Reveal";
import { ArrowRight, BellIcon, LockIcon, MailIcon, PhoneIcon } from "../../ui/icons";

type Statement = { kicker: string; title: string; body: string; detail: ReactNode; align: "start" | "end" };

const STATEMENTS: Statement[] = [
  {
    kicker: "Choice",
    title: "Scan, snap or tap.",
    body: "A merchant's QR code, a photo of written details, or a few taps on the Payments screen. Pick whatever is quickest for the payment in front of you.",
    align: "start",
    detail: (
      <ul className="flex gap-2">
        {["Scan", "Snap", "Tap"].map((word, i) => (
          <li key={word} className={`grid size-16 place-items-center rounded-2xl font-display font-bold ${["bg-sun text-stride-night", "bg-stride-deep text-white", "bg-stride-night text-white"][i]}`}>{word}</li>
        ))}
      </ul>
    ),
  },
  {
    kicker: "Control",
    title: "You always have the last word.",
    body: "Scanned or snapped, a payment shows its details first. Transfers are confirmed with your transaction PIN.",
    align: "end",
    detail: <span className="grid size-16 place-items-center rounded-2xl bg-stride-night text-sun"><LockIcon className="size-7" /></span>,
  },
  {
    kicker: "Visibility",
    title: "Every naira leaves a trail.",
    body: "Each debit and credit sends an alert: a pop-up and inbox message in the app, an email with the reference, amount, time, sender or receiver and your new balance, and an SMS for transfers, withdrawals and security codes.",
    align: "start",
    detail: (
      <ul className="flex gap-2 text-stride-deep">
        {[BellIcon, MailIcon, PhoneIcon].map((Icon, i) => (
          <li key={i} className="grid size-16 place-items-center rounded-2xl bg-white shadow-sm"><Icon className="size-6" /></li>
        ))}
      </ul>
    ),
  },
];

/** Typography carries this section: three statements staggered across the page, then the limits ledger. */
export function WhyPayments() {
  return (
    <section aria-labelledby="why-heading" className="bg-stride-mist">
      <div className="wrap py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow text-stride-deep">Why Cheetah payments</p>
          <h2 id="why-heading" className="display-md mt-3 max-w-2xl">Built for the way you actually pay.</h2>
        </Reveal>

        <ol className="mt-12">
          {STATEMENTS.map((statement, index) => (
            <Reveal as="li" key={statement.title} delay={0.04} className={`grid gap-5 border-t-2 border-stride-night py-8 lg:w-[78%] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:py-10 ${statement.align === "end" ? "lg:ml-auto" : ""}`}>
              <div>
                <p className="tabular text-sm font-bold text-stride-deep">0{index + 1} · {statement.kicker}</p>
                <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold tracking-tight">{statement.title}</h3>
                <p className="mt-3 max-w-xl text-stride-night/80">{statement.body}</p>
              </div>
              <div aria-hidden>{statement.detail}</div>
            </Reveal>
          ))}
        </ol>

        <div id="limits" className="mt-6 scroll-mt-24 rounded-[2rem] bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="tabular text-sm font-bold text-stride-deep">04 · Room to grow</p>
              <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold tracking-tight">Your limits grow with your tier.</h3>
            </div>
            <Link href="/cheetah/faqs" className="flex min-h-11 items-center gap-2 font-display text-sm font-bold">
              Questions about tiers <ArrowRight className="size-4" />
            </Link>
          </div>
          <div tabIndex={0} role="region" aria-label="Account tier limits" className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left">
              <caption className="sr-only">Transaction and balance limits by account tier</caption>
              <thead className="font-display text-sm">
                <tr className="border-b-2 border-stride-night">
                  <th scope="col" className="py-3 pr-4">Tier</th>
                  <th scope="col" className="p-3">What you need</th>
                  <th scope="col" className="p-3">Per deposit or transaction</th>
                  <th scope="col" className="p-3">Balance</th>
                </tr>
              </thead>
              <tbody>
                {ACCOUNT_TIERS.map((tier, index) => (
                  <tr key={tier.tier} className="border-b border-stride-night/15 last:border-b-0">
                    <th scope="row" className="py-4 pr-4 font-display font-bold">
                      <span className="flex items-center gap-2 whitespace-nowrap">
                        <span aria-hidden className="flex items-end gap-0.5">
                          {[0, 1, 2].map((bar) => (
                            <span key={bar} className={`w-1.5 rounded-sm ${bar <= index ? "bg-sun" : "bg-stride-night/15"}`} style={{ height: `${8 + bar * 5}px` }} />
                          ))}
                        </span>
                        {tier.tier}
                      </span>
                    </th>
                    <td className="p-3 text-stride-night/80">{tier.needs}</td>
                    <td className="tabular p-3 font-semibold">{tier.single}</td>
                    <td className="tabular p-3 font-semibold">{tier.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
