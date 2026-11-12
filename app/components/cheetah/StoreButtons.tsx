/* eslint-disable @next/next/no-img-element -- Official vector badges: next/image would not optimise them */
import { APP_LINKS, isLiveLink } from "@/config/links";

const STORES = [
  { key: "appStore", href: APP_LINKS.cheetah.appStore, src: "/images/shared/stores/app-store.svg", alt: "Download on the App Store", width: 120, height: 40 },
  { key: "googlePlay", href: APP_LINKS.cheetah.googlePlay, src: "/images/shared/stores/google-play.svg", alt: "Get it on Google Play", width: 135, height: 40 },
] as const;

/** A placeholder URL renders as a non-navigating badge, so nobody lands on a broken page. */
export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {STORES.map(({ key, href, src, alt, width, height }) => {
        const badge = <img src={src} alt={alt} width={width} height={height} loading="lazy" className="h-12 w-auto sm:h-[3.25rem]" />;
        return (
          <li key={key}>
            {isLiveLink(href) ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform duration-300 hover:-translate-y-0.5">
                {badge}
              </a>
            ) : (
              <span data-store-badge={key} className="block">{badge}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
