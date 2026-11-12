import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/login", "/staff-login", "/reset-password", "/app/", "/nibss-callback", "/jobs-application"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
