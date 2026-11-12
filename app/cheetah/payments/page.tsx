import type { Metadata } from "next";
import { PaymentsClosing } from "@/app/components/cheetah/payments/PaymentsClosing";
import { PaymentsHero } from "@/app/components/cheetah/payments/PaymentsHero";
import { PaymentWalkthrough } from "@/app/components/cheetah/payments/PaymentWalkthrough";
import { ScanSection } from "@/app/components/cheetah/payments/ScanSection";
import { SnapSection } from "@/app/components/cheetah/payments/SnapSection";
import { WhyPayments } from "@/app/components/cheetah/payments/WhyPayments";
import { Reveal } from "@/app/components/shared/Reveal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Payments: Scan, Snap, Transfers, Bills, Airtime and Data",
  description:
    "Scan to pay, snap to pay, send money, pay bills and buy airtime and data with Cheetah by Boctrust, with instant alerts each time money moves in or out of your account.",
  path: "/cheetah/payments",
  brand: "cheetah",
});

export default function PaymentsPage() {
  return (
    <>
      <PaymentsHero />
      <ScanSection />
      <SnapSection />
      <section id="how" aria-labelledby="how-heading" className="wrap scroll-mt-24 overflow-x-clip py-16 lg:py-24">
        <Reveal className="mb-10 max-w-2xl lg:mb-14">
          <p className="eyebrow text-stride-deep">Everyday payments</p>
          <h2 id="how-heading" className="display-md mt-3">Everything else, on one screen.</h2>
        </Reveal>
        <PaymentWalkthrough />
      </section>
      <WhyPayments />
      <PaymentsClosing />
    </>
  );
}
