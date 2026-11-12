import Image from "next/image";
import Link from "next/link";
import { verifiedClaims } from "@/config/regulatory";
import { LEGAL_ENTITY, SITE } from "@/config/site";
import { CHEETAH_PRODUCT_LIST } from "@/data/cheetah/products";
import { SAMPLE_NOTE, SCREENS } from "@/data/cheetah/screens";
import { CheetahLockup } from "../brand/CheetahMark";
import { CookiePreferencesButton } from "../shared/consent/CookiePreferencesButton";
import { socialIcons } from "../ui/icons";
import { StageArc } from "./art";
import { IPhone } from "./IPhone";
import { StoreButtons } from "./StoreButtons";

const LINK = "inline-block py-1.5 text-sm text-white/80 transition-colors hover:text-sun";

const COLUMNS = [
  {
    title: "Savings",
    links: CHEETAH_PRODUCT_LIST.map((product) => ({ label: product.name, href: product.href })),
  },
  {
    title: "Payments",
    links: [
      { label: "Send money", href: "/cheetah/payments#how" },
      { label: "Pay bills", href: "/cheetah/payments#how" },
      { label: "Airtime and data", href: "/cheetah/payments#how" },
      { label: "Your limits", href: "/cheetah/payments#limits" },
    ],
  },
  {
    title: "Cheetah",
    links: [
      { label: "About Cheetah", href: "/cheetah/about" },
      { label: "Security", href: "/cheetah/security" },
      { label: "Get the app", href: "/cheetah/get-app" },
      { label: "Fixed savings calculator", href: "/cheetah/calculator" },
      { label: "FAQs", href: "/cheetah/faqs" },
      { label: "Boctrust corporate site", href: "/" },
    ],
  },
];

export function CheetahFooter() {
  const claims = verifiedClaims();
  const { name, registrationNumber, address } = LEGAL_ENTITY;
  return (
    <footer id="get-the-app" className="scroll-mt-20 bg-stride-night text-white">
      <div className="wrap pt-10 lg:pt-14">
        <div className="relative isolate grid overflow-hidden rounded-[2rem] bg-sun text-stride-night md:grid-cols-[1.25fr_1fr]">
          <StageArc className="absolute -right-44 -bottom-72 -z-10 w-[40rem] max-w-none md:-right-24" />
          <div className="p-7 sm:p-10 lg:p-14">
            <h2 className="display-md">Your savings are about to get quicker on their feet.</h2>
            <StoreButtons className="mt-7" />
          </div>
          <div className="relative h-64 md:h-auto">
            <IPhone {...SCREENS.home} sizes="260px" className="absolute top-2 left-1/2 w-[15rem] -translate-x-1/2 md:top-10 lg:w-[16.5rem]" />
          </div>
        </div>
      </div>

      <div className="wrap pt-12 pb-6 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Link href="/cheetah" aria-label="Cheetah by Boctrust home" className="inline-block">
              <CheetahLockup tone="light" />
            </Link>
            <ul className="mt-5 flex gap-2">
              {SITE.socials.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <li key={social.id}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Boctrust on ${social.label}`} className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors hover:border-sun hover:bg-sun hover:text-stride-night">
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Cheetah footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-9">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="eyebrow text-sun">{column.title}</h2>
                <ul className="mt-3">
                  {column.links.map((link) => (
                    <li key={link.label}><Link href={link.href} className={LINK}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="eyebrow text-sun">Support</h2>
              <ul className="mt-3">
                <li><a href={SITE.contact.phones[0].href} className={LINK}>{SITE.contact.phones[0].display}</a></li>
                <li><a href={`mailto:${SITE.contact.email}`} className={`${LINK} break-all`}>{SITE.contact.email}</a></li>
                <li><Link href="/support" className={LINK}>Help centre</Link></li>
                <li><Link href="/contact" className={LINK}>Contact Boctrust</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-5 border-t border-white/15 pt-6 md:grid-cols-3">
          {claims.map((claim) => (
            <li key={claim.id} className="flex items-center gap-3">
              <span className="relative block h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image src={claim.logo.src} alt={claim.logo.alt} fill sizes="64px" className={claim.id === "ndpc" ? "object-cover object-top" : "object-contain p-1"} />
              </span>
              <span className="text-xs text-white/80">{claim.statement}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/70 [&>p]:max-w-4xl">
          <p>
            Cheetah is a digital savings and payments product of {name}
            {registrationNumber ? ` (RC ${registrationNumber})` : ""}, {address}. The content on this website is for information purposes only and is not a complete description of Cheetah&apos;s products and services. Terms, rates and limits are confirmed in the app or by Boctrust.
          </p>
          <p>
            By using this website, you accept our{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-sun">Terms &amp; Conditions</Link> and{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-sun">Privacy Policy</Link>. {SAMPLE_NOTE}
          </p>
          <p>App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</p>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5">
            <li><Link href="/terms" className="inline-block py-2 hover:text-sun">Terms</Link></li>
            <li><Link href="/privacy" className="inline-block py-2 hover:text-sun">Privacy</Link></li>
            <li><CookiePreferencesButton className="py-2 hover:text-sun" /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
