import type { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { ConsentManager } from "@/app/components/shared/consent/ConsentManager";
import { MotionProvider } from "@/app/components/shared/MotionProvider";
import { SITE } from "@/config/site";
import { bodyFallback, satoshi } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.legalName} | ${SITE.heroLine}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.shortName,
  authors: [{ name: SITE.legalName }],
  openGraph: { siteName: SITE.name, locale: "en_NG", type: "website" },
  twitter: { card: "summary_large_image", site: "@boctrustmfb" },
};

export const viewport: Viewport = {
  themeColor: "#142b45",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // globals.css sets `scroll-behavior: smooth` for in-page anchors. Since Next 16 the router no
    // longer suspends it on navigation unless this attribute is present, so a new page would open at
    // the old offset and glide up (and stop partway if interrupted). With it, route changes jump
    // straight to the top while #anchor links stay smooth.
    <html lang="en-NG" data-scroll-behavior="smooth" className={`${satoshi.variable} ${bodyFallback.variable}`}>
      <body>
        {/* Without JavaScript, entrance animations never run, so content must not start hidden. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only rounded-full bg-gold px-5 py-3 font-semibold text-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <NextTopLoader color="#E5C367" height={3} showSpinner={false} shadow={false} />
        <MotionProvider>{children}</MotionProvider>
        <Suspense fallback={null}>
          <ConsentManager />
        </Suspense>
      </body>
    </html>
  );
}
