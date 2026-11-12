import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { StageArc } from "@/app/components/cheetah/art";
import { Enter } from "@/app/components/shared/Enter";
import { RegulatoryBanner } from "@/app/components/shared/RegulatoryBanner";
import { Reveal } from "@/app/components/shared/Reveal";
import {
  AlertIcon,
  ArrowRight,
  BellIcon,
  CheckIcon,
  ClockIcon,
  DevicesIcon,
  FingerprintIcon,
  IdCardIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
} from "@/app/components/ui/icons";
import { verifiedClaims } from "@/config/regulatory";
import { SITE } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Security: How Cheetah Protects Your Account",
  description:
    "How Cheetah by Boctrust protects your account with biometric sign-in, a transaction PIN, device management and alerts that stay on, plus practical tips for spotting scams and what to do if something looks wrong.",
  path: "/cheetah/security",
  brand: "cheetah",
});

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Every protection below restates the Cheetah FAQ and product specification (biometric sign-in,
 * transaction PIN, device list, alerts, BVN/NIN and selfie checks, tier limits). Nothing here claims
 * a certification, guarantee or capability the app does not have.
 */
const PROTECTIONS: { Icon: Icon; tag: string; title: string; body: string }[] = [
  {
    Icon: FingerprintIcon,
    tag: "Account protection",
    title: "Sign in with your fingerprint or face.",
    body: "Use fingerprint or Face ID to open the app, instead of typing your password where others can see it.",
  },
  {
    Icon: LockIcon,
    tag: "Authentication",
    title: "A PIN only you know.",
    body: "Set your transaction PIN, then reset or change it, and your password, from the Security section of Account Settings.",
  },
  {
    Icon: DevicesIcon,
    tag: "Account activity",
    title: "See every device signed in.",
    body: "Account Settings show which devices are logged in to your account, so a phone you don't recognise stands out.",
  },
  {
    Icon: BellIcon,
    tag: "Monitoring",
    title: "Alerts you can't switch off.",
    body: "Every debit and credit sends an alert in the app and by email, and by SMS for transfers, withdrawals and security codes. Debit and security alerts always stay on.",
  },
  {
    Icon: IdCardIcon,
    tag: "Verification",
    title: "Verified from the first day.",
    body: "Every account opens with BVN or NIN verification and a live selfie. Higher tiers add a government ID and proof of address, and each tier has its own limits.",
  },
];

const HABITS = [
  { title: "Keep your codes to yourself.", body: "Never share your password, transaction PIN or a one-time code with anyone, even someone who says they're from a bank." },
  { title: "Lock your phone.", body: "Use a screen lock on your phone, and keep fingerprint or Face ID sign-in switched on for Cheetah." },
  { title: "Install from the official stores.", body: "Download Cheetah only from Google Play or the App Store, using the links on this website." },
  { title: "Keep everything up to date.", body: "Install updates to the app and to your phone's software when they arrive." },
  { title: "Read before you confirm.", body: "Check the name and the amount on the confirmation screen every time, however you pay." },
  { title: "Look over your devices.", body: "Now and then, check the devices logged in to your account. Remove any doubt by changing your password and PIN." },
];

const WARNING_SIGNS = [
  { title: "You're asked for a PIN, password or code.", body: "No genuine request needs them, whoever it seems to come from." },
  { title: "You're told to act right now.", body: "Threats that your account will be blocked, or money lost, unless you do something immediately." },
  { title: "An offer sounds too good.", body: "Promises to double your money, or returns that are guaranteed and unusually high." },
  { title: "A link asks you to sign in.", body: "Texts, emails or chats with a link to “verify”, “unlock” or “update” your account." },
  { title: "A stranger wants money back.", body: "Someone says they sent you money by mistake and pushes you to return it quickly." },
  { title: "You're asked to install an app.", body: "Requests to install screen-sharing or remote-access apps so someone can “help” you." },
];

const IF_WRONG = [
  { title: "Change your password and PIN", body: "Do it straight away, in the Security section of Account Settings." },
  { title: "Check your devices", body: "Look at the devices logged in to your account for any you don't recognise." },
  { title: "Tell us immediately", body: "Contact Boctrust on the channels below. Keep any messages, numbers and transaction details." },
];

/** Shield at the centre of the hero ring, with three of the protections orbiting it. */
function SecurityEmblem() {
  const chips: { Icon: Icon; label: string; place: string; delay: string }[] = [
    { Icon: FingerprintIcon, label: "Fingerprint or Face ID", place: "top-[8%] left-0", delay: "" },
    { Icon: LockIcon, label: "Your transaction PIN", place: "top-[44%] right-0", delay: "[animation-delay:-2.5s]" },
    { Icon: BellIcon, label: "Alerts always on", place: "bottom-[8%] left-[6%]", delay: "[animation-delay:-5s]" },
  ];
  return (
    <div aria-hidden className="relative mx-auto mb-24 aspect-square w-full max-w-120 sm:mb-0">
      <StageArc stroke="var(--color-stride)" width={64} className="absolute inset-[12%] size-[76%]" />
      <svg viewBox="0 0 600 600" fill="none" className="absolute inset-[3%] size-[94%]">
        <circle cx="300" cy="300" r="296" stroke="var(--color-stride-night)" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" className="animate-flow" />
      </svg>
      <div className="absolute inset-[31%] grid place-items-center rounded-full bg-white shadow-[0_30px_60px_-24px_rgb(16_31_51/0.45)]">
        <ShieldIcon className="w-[46%] text-stride-deep" strokeWidth={1.6} />
      </div>
      {/* From sm up the chips orbit the ring; on phones they would cover the shield, so they sit below it. */}
      {chips.map(({ Icon, label, place, delay }) => (
        <div key={label} className={`absolute hidden sm:block ${place}`}>
          <Chip Icon={Icon} label={label} className={`animate-float ${delay}`} />
        </div>
      ))}
      <div className="absolute inset-x-0 top-full mt-2 flex flex-wrap justify-center gap-2 sm:hidden">
        {chips.map(({ Icon, label }) => (
          <Chip key={label} Icon={Icon} label={label} />
        ))}
      </div>
    </div>
  );
}

function Chip({ Icon, label, className = "" }: { Icon: Icon; label: string; className?: string }) {
  return (
    <p className={`flex items-center gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-1.5 font-display text-xs font-bold whitespace-nowrap text-stride-night shadow-[0_18px_40px_-18px_rgb(16_31_51/0.5)] sm:py-2 sm:pr-4 sm:pl-2 sm:text-sm ${className}`}>
      <span className="grid size-7 place-items-center rounded-full bg-sun sm:size-8">
        <Icon className="size-4" />
      </span>
      {label}
    </p>
  );
}

export default function SecurityPage() {
  const dataClaim = verifiedClaims().find((claim) => claim.id === "ndpc");
  const [primaryPhone, secondaryPhone] = SITE.contact.phones;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-stride-mist">
        <div className="wrap grid gap-10 pt-28 pb-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-32 lg:pb-20">
          <div className="lg:col-span-6">
            <Enter y={14}>
              <p className="eyebrow text-stride-deep">Security</p>
            </Enter>
            <Enter delay={0.05}>
              <h1 className="display-page mt-4 max-w-[16ch]">Your money moves only when you say so.</h1>
              <p className="lede mt-5 max-w-xl text-stride-night/80">
                Cheetah is built by {SITE.legalName}. Here is how the app protects your account, what you can do to keep it safe, and what to do if something doesn&apos;t look right.
              </p>
            </Enter>
            <Enter delay={0.12}>
              <ul className="mt-7 flex flex-wrap gap-3">
                <li>
                  <a href="#if-something-looks-wrong" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-stride-night px-5 font-display font-bold text-white transition-colors hover:bg-stride-deep">
                    <AlertIcon className="size-4 text-sun" /> If something looks wrong
                  </a>
                </li>
                <li>
                  <a href="#help" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-display font-bold ring-1 ring-stride-night/15 transition-colors hover:bg-sun">
                    Official support channels
                  </a>
                </li>
              </ul>
            </Enter>
          </div>
          <Enter delay={0.1} y={30} className="lg:col-span-6">
            <SecurityEmblem />
          </Enter>
        </div>
      </section>

      <section id="protection" aria-labelledby="protection-heading" className="wrap py-16 lg:py-24">
        <Reveal className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-stride-deep">How we protect you</p>
            <h2 id="protection-heading" className="display-md mt-3">Protection built into the app.</h2>
          </div>
          <p className="text-stride-night/80 lg:col-span-4 lg:col-start-9">The safeguards below are part of every Cheetah account. Most of them live in Account Settings, where you can see and change them.</p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* The lead card: the one rule that holds however you pay. */}
          <Reveal as="li" className="flex flex-col justify-between gap-8 rounded-[1.75rem] bg-stride-night p-7 text-white sm:col-span-2 sm:p-9">
            <div>
              <p className="eyebrow text-sun">Secure transactions</p>
              <h3 className="display-sm mt-3 max-w-[22ch]">Nothing moves until you confirm.</h3>
              <p className="mt-3 max-w-xl text-white/80">
                Scan a code, snap written details or send money: however you pay, the app shows you who you&apos;re paying and how much before you confirm.
              </p>
            </div>
            <ol aria-label="Every payment" className="flex flex-wrap items-center gap-2 font-display text-sm font-bold">
              {["Enter or scan", "Review the details", "You confirm"].map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  {i > 0 && <ArrowRight aria-hidden className="size-4 text-white/50" />}
                  <span className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 ${i === 2 ? "bg-sun text-stride-night" : "bg-white/10"}`}>
                    {i === 2 && <CheckIcon className="size-4" />}
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          {PROTECTIONS.map(({ Icon, tag, title, body }, index) => (
            <Reveal as="li" key={title} delay={0.04 * (index + 1)} className="rounded-[1.75rem] bg-white p-7 ring-1 ring-stride-night/10">
              <span className="grid size-12 place-items-center rounded-2xl bg-stride-mist text-stride-deep">
                <Icon className="size-6" />
              </span>
              <p className="eyebrow mt-6 text-stride-deep">{tag}</p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-stride-night/80">{body}</p>
            </Reveal>
          ))}

          <Reveal as="li" delay={0.24} className="flex flex-col gap-6 rounded-[1.75rem] bg-sun p-7 sm:col-span-2 sm:flex-row sm:items-center sm:p-9">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-stride-night">
              <ShieldIcon className="size-6" />
            </span>
            <div>
              <p className="eyebrow">Privacy</p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight">Your personal data, on record.</h3>
              <p className="mt-2 text-stride-night/85">
                {dataClaim ? `Boctrust is ${dataClaim.statement}. ` : ""}Our Privacy Policy sets out what we collect, why, and your rights.
              </p>
              <Link href="/privacy" className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-display font-bold underline decoration-2 underline-offset-4">
                Read the Privacy Policy <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </ul>
      </section>

      <section aria-labelledby="habits-heading" className="border-t border-stride-night/10">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-stride-deep">Staying safe with Cheetah</p>
            <h2 id="habits-heading" className="display-md mt-3">Six habits worth keeping.</h2>
            <p className="mt-4 max-w-sm text-stride-night/80">The app does its part. These take a minute, and they close the gaps scammers look for.</p>
          </Reveal>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {HABITS.map((habit, index) => (
              <Reveal as="li" key={habit.title} delay={index * 0.04} y={12} className="grid grid-cols-[2.75rem_1fr] gap-x-3 border-t border-stride-night/15 py-5">
                <span aria-hidden className="tabular font-display text-2xl leading-none font-bold text-stride">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-lg font-bold tracking-tight">{habit.title}</span>
                  <span className="mt-1 block text-stride-night/80">{habit.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="scams-heading" className="bg-stride-night text-white">
        <div className="wrap py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-sun">Recognising fraud and scams</p>
              <h2 id="scams-heading" className="display-md mt-3">Spot a scam before it costs you.</h2>
              <p className="mt-4 max-w-sm text-white/80">Scams work on urgency and trust. If you see any of these signs, stop, and check with us through an official channel.</p>
            </Reveal>
            <ul className="grid gap-px overflow-hidden rounded-[1.75rem] bg-white/15 sm:grid-cols-2 lg:col-span-8">
              {WARNING_SIGNS.map((sign, index) => (
                <Reveal as="li" key={sign.title} delay={index * 0.04} y={12} className="bg-stride-night p-6 sm:p-7">
                  <AlertIcon className="size-6 text-sun" />
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{sign.title}</h3>
                  <p className="mt-1 text-white/75">{sign.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div id="if-something-looks-wrong" className="mt-16 rounded-[1.75rem] bg-sun p-7 text-stride-night sm:p-10 lg:mt-20">
            <Reveal>
              <p className="eyebrow">If something looks wrong</p>
              <h2 className="display-sm mt-2">Act quickly, in this order.</h2>
            </Reveal>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {IF_WRONG.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.06} className="border-t-2 border-stride-night pt-4">
                  <span className="tabular font-display text-4xl leading-none font-bold">{index + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-1 text-stride-night/85">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <RegulatoryBanner variant="cheetah" />

      <section id="help" aria-labelledby="help-heading" className="wrap pb-16 lg:pb-24">
        <div className="grid gap-8 rounded-4xl bg-stride-mist p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-stride-deep">Need help?</p>
            <h2 id="help-heading" className="display-md mt-3">Talk to a real person.</h2>
            <p className="mt-4 max-w-md text-stride-night/80">
              Chat with Customer Support from Settings in the app, or reach Boctrust directly. Only trust contact details listed on this website.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/support" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-stride-night px-6 font-display font-bold text-white transition-colors hover:bg-stride-deep">
                Visit the help centre <ArrowRight className="size-4" />
              </Link>
              <Link href="/cheetah/faqs" className="inline-flex min-h-12 items-center rounded-full bg-white px-6 font-display font-bold ring-1 ring-stride-night/15 transition-colors hover:bg-sun">
                Read the FAQs
              </Link>
            </div>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {[
              { Icon: PhoneIcon, label: "Call us", value: primaryPhone.display, href: primaryPhone.href },
              { Icon: PhoneIcon, label: "Or call", value: secondaryPhone.display, href: secondaryPhone.href },
              { Icon: MailIcon, label: "Email", value: SITE.contact.email, href: `mailto:${SITE.contact.email}` },
            ].map(({ Icon, label, value, href }) => (
              <li key={value}>
                <a href={href} className="group flex min-h-20 items-center gap-4 rounded-2xl bg-white p-4 transition-colors hover:bg-sun">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-stride-mist text-stride-deep group-hover:bg-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-stride-night/70">{label}</span>
                    <span className="block font-display font-bold break-all">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex min-h-20 items-center gap-4 rounded-2xl bg-white p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-stride-mist text-stride-deep">
                <ClockIcon className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-stride-night/70">Opening hours</span>
                <span className="block font-display font-bold">{SITE.contact.hours}</span>
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
