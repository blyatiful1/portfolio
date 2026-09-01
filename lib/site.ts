// Single source for the site's absolute origin. Working name iwanbraun.dev is
// an assumed fact (BRIEF); Vercel preview/production URLs take over via env.
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
