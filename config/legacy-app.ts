/**
 * The current boctrustmfb.com SPA is more than a brochure: it serves customer login,
 * the dashboard, the loan application, password resets and the NIBSS callback.
 * This marketing site does not reimplement any of that. Those paths redirect to wherever
 * the application is hosted.
 *
 * LAUNCH REQUIREMENT: before this site takes over boctrustmfb.com, the application must move
 * to its own host (for example https://app.boctrustmfb.com) and NEXT_PUBLIC_LEGACY_APP_URL
 * must point there. Until then the app stays reachable only on its current origin.
 */
export const LEGACY_APP_URL = (
  process.env.NEXT_PUBLIC_LEGACY_APP_URL ?? "https://boctrustmfb.com"
).replace(/\/$/, "");

/** Paths served by the application, not by this site. Temporary redirects (307). */
export const LEGACY_APP_PATHS = [
  "/login",
  "/staff-login",
  "/dashboard",
  "/dashboard/:path*",
  "/reset-password/:token",
  "/app/nibbs-login",
  "/nibss-callback",
  "/jobs-application",
  "/uploads/:path*",
] as const;
