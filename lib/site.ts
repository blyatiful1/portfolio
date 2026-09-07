// Single source for the site's absolute origin. Working name iwanbraun.dev is
// an assumed fact (BRIEF); Vercel URLs take over via env.
//
// Order matters (panel I03): NEXT_PUBLIC_SITE_URL when the owner sets the
// public origin explicitly; then VERCEL_PROJECT_PRODUCTION_URL — the STABLE
// production alias; VERCEL_URL only after that, because it is the immutable
// per-deployment host, which sits behind Vercel SSO and made every canonical,
// og:image and sitemap entry point at a login wall.
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
