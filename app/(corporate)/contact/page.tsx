import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HqMap } from '@/app/components/corporate/contact/HqMap';
import { LiveMap } from '@/app/components/corporate/contact/LiveMap';
import { OpenStatus } from '@/app/components/corporate/contact/OpenStatus';
import { Enter } from '@/app/components/shared/Enter';
import { JsonLd } from '@/app/components/shared/JsonLd';
import { Reveal } from '@/app/components/shared/Reveal';
import {
  ArrowRight,
  ArrowUpRight,
  ClockIcon,
  socialIcons,
} from '@/app/components/ui/icons';
import { SITE } from '@/config/site';
import { CONTACT_ROUTES } from '@/data/corporate/contact';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Contact Us',
  description: `Contact Boctrust Microfinance Bank. Visit ${SITE.contact.address}, Lagos, call ${SITE.contact.phones[0].display}, or email ${SITE.contact.email}.`,
  path: '/contact',
});

export default function ContactPage() {
  const { contact } = SITE;
  const lines = [
    {
      tag: 'Call us',
      value: contact.phones[0].display,
      href: contact.phones[0].href,
    },
    {
      tag: 'Or call',
      value: contact.phones[1].display,
      href: contact.phones[1].href,
    },
    {
      tag: 'Write to us',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE.url}/contact`,
          mainEntity: {
            '@type': 'BankOrCreditUnion',
            '@id': `${SITE.url}/#organization`,
            name: SITE.legalName,
            email: contact.email,
            telephone: contact.phones[0].href.replace('tel:', ''),
            hasMap: contact.mapUrl,
            geo: { '@type': 'GeoCoordinates', ...contact.geo },
            address: {
              '@type': 'PostalAddress',
              streetAddress: `${contact.floor}, ${contact.street}`,
              addressLocality: contact.city,
              addressCountry: contact.country,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
              ],
              opens: '09:00',
              closes: '17:00',
            },
          },
        }}
      />

      <section className="wrap grid gap-10 pt-10 pb-16 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-14 lg:pb-24">
        <div className="lg:col-span-5">
          <Enter y={14}>
            <p className="eyebrow text-gold-deep">Contact Boctrust</p>
          </Enter>
          <Enter delay={0.05}>
            <h1 className="display-hero mt-4 text-navy">Let&apos;s talk.</h1>
            <p className="lede mt-4 max-w-md text-ink-soft">
              Pick up the phone, send us a note, or come and see us on Lagos
              Island.
            </p>
            <OpenStatus className="mt-5" />
          </Enter>
          <Enter delay={0.12}>
            <ul id="lines" className="mt-8 border-t-2 border-navy">
              {lines.map((line) => (
                <li key={line.href} className="border-b border-rule">
                  <a
                    href={line.href}
                    className="group flex min-h-18 items-center justify-between gap-4 py-3 text-navy"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm text-ink-soft">
                        {line.tag}
                      </span>
                      <span className="tabular block font-display text-xl font-bold tracking-tight wrap-break-word lg:text-2xl">
                        {line.value}
                      </span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
              <ClockIcon className="size-4 shrink-0 text-gold-deep" />{' '}
              {contact.hours}
            </p>
          </Enter>
        </div>

        <Enter delay={0.1} y={40} className="relative lg:col-span-7 lg:pl-6">
          <div className="stepped-frame relative aspect-4/3 overflow-hidden bg-ivory">
            <Image
              src="/images/corporate/contact/lagos-sunset-water.jpg"
              alt="The Lagos skyline at sunset, seen across the water"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 55vw"
              className="object-cover object-[50%_62%]"
            />
          </div>
          <div className="relative mt-[-34%] ml-3 w-[42%] max-w-68 overflow-hidden rounded-t-full shadow-[0_0_0_8px_var(--color-paper)] lg:ml-0 lg:-translate-x-6">
            <div className="relative aspect-4/5 bg-ivory">
              <Image
                src="/images/corporate/contact/support-agent.png"
                alt="A smiling man wearing headphones, working at a laptop"
                fill
                priority
                sizes="(max-width: 1024px) 42vw, 272px"
                className="object-cover object-[46%_50%]"
              />
            </div>
          </div>
        </Enter>
      </section>

      <section
        id="visit"
        aria-labelledby="visit-heading"
        className="relative isolate scroll-mt-24 bg-navy-deep text-white"
      >
        <div className="wrap lg:grid lg:min-h-152 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative z-10 py-12 lg:col-span-4 lg:py-16">
            <p className="eyebrow text-gold">Visit our head office</p>
            <h2 id="visit-heading" className="display-md mt-3">
              Find us in Onikan.
            </h2>
            <address className="mt-5 text-lg leading-snug not-italic text-white/90">
              {contact.floor},<br />
              {contact.street},<br />
              {contact.district}
            </address>
            <a
              href={contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-13 items-center gap-2 rounded-full bg-gold px-6 font-display font-bold text-navy transition-colors hover:bg-white"
            >
              Get directions <ArrowUpRight className="size-5" />
            </a>
          </Reveal>
        </div>
        <div className="relative h-96 overflow-hidden sm:h-120 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[64%]">
          <HqMap />
          <LiveMap />
        </div>
      </section>

      <section
        aria-labelledby="doors-heading"
        className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:items-start lg:py-24"
      >
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-gold-deep">Which door?</p>
            <h2 id="doors-heading" className="display-md mt-3 text-navy">
              Tell us why you&apos;re here.
            </h2>
          </Reveal>
          <ul className="mt-8 border-t-2 border-navy">
            {CONTACT_ROUTES.map((route) => {
              const inner = (
                <>
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-bold tracking-tight text-navy">
                      {route.label}
                    </span>
                    <span className="block text-sm wrap-break-word text-ink-soft">
                      {route.note}
                    </span>
                  </span>
                  {route.external ? (
                    <ArrowUpRight className="size-5 shrink-0 text-navy transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  ) : (
                    <ArrowRight className="size-5 shrink-0 text-navy transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </>
              );
              const cls =
                'group flex min-h-[4.5rem] items-center justify-between gap-4 border-b border-rule py-3';
              return (
                <li key={route.label}>
                  {route.external ? (
                    <a href={route.href} className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={route.href} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
            <h3
              id="social-heading"
              className="font-display font-bold text-navy"
            >
              Follow along
            </h3>
            <ul
              aria-labelledby="social-heading"
              className="flex flex-wrap gap-x-5"
            >
              {SITE.socials.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-2 text-sm text-navy underline-offset-4 hover:underline"
                    >
                      <Icon className="size-4 text-gold-deep" /> {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
          <div className="relative aspect-4/5 overflow-hidden rounded-t-full bg-ivory">
            <Image
              src="/images/corporate/contact/obalende-aerial.jpg"
              alt="Aerial view of Obalende on Lagos Island, its rooftops running down to the water"
              fill
              sizes="(max-width: 1024px) 92vw, 32vw"
              className="object-cover object-[45%_50%]"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
