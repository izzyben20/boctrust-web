import type { NextConfig } from "next";
import { LEGACY_APP_PATHS, LEGACY_APP_URL } from "./config/legacy-app";

const legacyHost = new URL(LEGACY_APP_URL).host;
const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://boctrustmfb.com").host;

if (process.env.NODE_ENV === "production" && legacyHost === siteHost) {
  console.warn(
    `\n[boctrust] NEXT_PUBLIC_LEGACY_APP_URL and NEXT_PUBLIC_SITE_URL share the host "${legacyHost}".\n` +
      "That is fine for previews, but before this site goes live on that host the login, dashboard and loan\n" +
      "application must move to their own host, or those routes will have nowhere to go. See .env.example.\n",
  );
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The two posts live today are CMS test entries ("Job D", "Enjoy your self").
      { source: "/blog/Job-D", destination: "/blogs", permanent: true },
      { source: "/blog/Financial-Inclusion", destination: "/blogs", permanent: true },
      // An empty test page on the legacy site.
      { source: "/test", destination: "/", permanent: true },
      // Application routes. The host condition stops a redirect loop if both hosts ever match.
      ...LEGACY_APP_PATHS.map((source) => ({
        source,
        destination: `${LEGACY_APP_URL}${source}`,
        permanent: false,
        missing: [{ type: "host" as const, value: legacyHost }],
      })),
    ];
  },
};

export default nextConfig;
