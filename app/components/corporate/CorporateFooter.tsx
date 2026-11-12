import Link from "next/link";
import { APP_LINKS } from "@/config/links";
import { CORPORATE_FOOTER, LEGAL_LINKS } from "@/config/navigation";
import { verifiedClaims } from "@/config/regulatory";
import { SITE } from "@/config/site";
import { BoctrustLogo } from "../brand/BoctrustLogo";
import { CookiePreferencesButton } from "../shared/consent/CookiePreferencesButton";
import { socialIcons } from "../ui/icons";

export function CorporateFooter() {
  const claims = verifiedClaims();
  return (
    <footer className="bg-navy-deep text-white">

      <div className="wrap pt-14 pb-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BoctrustLogo tone="reverse" className="h-20 w-auto" />
            <address className="mt-8 grid gap-3 not-italic text-white/80">
              <p>
                {SITE.contact.address}, {SITE.contact.city}
              </p>
              <p className="flex flex-col">
                {SITE.contact.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="w-fit py-1 hover:text-gold">
                    {phone.display}
                  </a>
                ))}
              </p>
              <a href={`mailto:${SITE.contact.email}`} className="w-fit hover:text-gold">
                {SITE.contact.email}
              </a>
            </address>
            <ul className="mt-6 flex gap-2">
              {SITE.socials.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Boctrust on ${social.label}`}
                      className="grid size-12 place-items-center rounded-full border border-white/25 transition-colors hover:border-gold hover:bg-gold hover:text-navy"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
            {CORPORATE_FOOTER.map((column) => (
              <div key={column.title}>
                <h2 className="eyebrow text-gold">{column.title}</h2>
                <ul className="mt-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} className="inline-block py-1.5 text-white/85 transition-colors hover:text-gold">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href ?? "#"} className="inline-block py-1.5 text-white/85 transition-colors hover:text-gold">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p aria-hidden className="mt-14 font-display leading-none font-bold tracking-[-0.04em] text-gold text-[clamp(2.25rem,5vw,4.5rem)] lg:mt-20">
          Growing. <span className="text-white">Together.</span>
        </p>

        {claims.length > 0 && (
          <p className="mt-10 border-t border-white/15 pt-6 text-sm text-white/70">
            {claims.map((c) => `${c.statement}.`).join(" ")}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {SITE.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href ?? "#"} className="inline-block py-2 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookiePreferencesButton className="py-2 hover:text-gold" />
            </li>
            <li>
              <a href={APP_LINKS.boctrust.login} className="inline-block py-2 hover:text-gold">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
