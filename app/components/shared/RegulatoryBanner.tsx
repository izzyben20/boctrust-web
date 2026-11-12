import Image from "next/image";
import { type RegulatoryClaim, verifiedClaims } from "@/config/regulatory";
import { SITE } from "@/config/site";

/**
 * Only claims marked "verified" in config/regulatory.ts render; with none, nothing renders at all.
 * Both variants are informational only, with no links out to the regulators.
 */
export function RegulatoryBanner({ variant }: { variant: "corporate" | "cheetah" }) {
  const claims = verifiedClaims();
  if (!claims.length) return null;

  if (variant === "cheetah") {
    return (
      <section aria-labelledby="trust-heading" className="border-t border-stride-night/10">
        <div className="wrap grid gap-8 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-4">
            <h2 id="trust-heading" className="display-md">Fast app. Regulated bank.</h2>
            <p className="mt-3 text-stride-night/80">Cheetah is built by {SITE.legalName}.</p>
          </div>
          <ul className="grid divide-y divide-stride-night/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-7 lg:col-start-6">
            {claims.map((claim) => (
              <li key={claim.id} className="flex flex-col gap-4 py-5 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0">
                <span className="flex h-16 items-center"><RegisterMark claim={claim} /></span>
                <p className="font-display leading-snug font-bold tracking-tight">{claim.statement}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="trust-heading" className="wrap py-14 lg:py-24">
      <div className="grid gap-4 border-t-2 border-navy pt-5 lg:grid-cols-12 lg:items-baseline">
        <h2 id="trust-heading" className="display-sm text-navy lg:col-span-5">A matter of record.</h2>
        <p className="text-ink-soft lg:col-span-6 lg:col-start-7">Boctrust&apos;s standing with Nigeria&apos;s financial and data protection regulators.</p>
      </div>
      {/* One joined register rather than three separate cards: a shared white plate for the marks, then the statements on one baseline. */}
      <ul className="mt-8 grid border border-rule md:grid-cols-[1.1fr_1fr_1.15fr]">
        {claims.map((claim, index) => (
          <li key={claim.id} className={`grid grid-rows-[7rem_auto] ${index > 0 ? "border-t border-rule md:border-t-0 md:border-l" : ""}`}>
            <div className="flex items-center border-b border-rule bg-white px-6 lg:px-8">
              <RegisterMark claim={claim} />
            </div>
            <div className="p-6 lg:p-8">
              <h3 className="font-display text-xl leading-snug font-bold tracking-tight text-navy lg:text-[1.4rem]">{claim.statement}</h3>
              <p className="mt-2 text-sm text-ink-soft">{claim.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RegisterMark({ claim }: { claim: RegulatoryClaim }) {
  // The trustmark artwork is a full sheet: show its shield and QR panel, which read at this size.
  if (claim.id === "ndpc") {
    return (
      <span className="relative block h-16 w-32 overflow-hidden lg:h-20 lg:w-40">
        <Image src={claim.logo.src} alt={claim.logo.alt} fill sizes="160px" className="object-cover object-top" />
      </span>
    );
  }
  return <Image src={claim.logo.src} alt={claim.logo.alt} width={claim.logo.width} height={claim.logo.height} sizes="200px" className="h-14 w-auto max-w-full object-contain object-left lg:h-16" />;
}
