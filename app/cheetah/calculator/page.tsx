import type { Metadata } from "next";
import Link from "next/link";
import { FixedDepositCalculator } from "@/app/components/cheetah/FixedDepositCalculator";
import { Enter } from "@/app/components/shared/Enter";
import { ArrowRight } from "@/app/components/ui/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Fixed Deposit Calculator",
  description:
    "Estimate your Boc Fixed Savings returns. Enter an amount, pick your dates, and see your rate, interest and maturity value.",
  path: "/cheetah/calculator",
  brand: "cheetah",
});

export default function CalculatorPage() {
  return (
    <>
      <section className="bg-fixed-mist">
        <div className="wrap grid gap-3 pt-28 pb-32 lg:grid-cols-12 lg:items-end lg:pt-32 lg:pb-36">
          <Enter className="lg:col-span-7">
            <p className="eyebrow text-fixed-ink">Boc Fixed Savings calculator</p>
            <h1 className="display-page mt-3">See what patience pays.</h1>
          </Enter>
          <Enter className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <Link href="/cheetah/savings/fixed" className="flex min-h-11 w-fit items-center gap-2 font-display font-bold text-fixed-ink lg:ml-auto">
              About Boc Fixed Savings <ArrowRight className="size-4" />
            </Link>
          </Enter>
        </div>
      </section>
      <section className="wrap -mt-24 pb-16 lg:pb-24">
        <FixedDepositCalculator />
      </section>
    </>
  );
}
