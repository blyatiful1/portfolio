# SEO — iwanbraun.dev

## Canonical strategy
`metadataBase` from `lib/site.ts` (env NEXT_PUBLIC_SITE_URL → VERCEL_PROJECT_PRODUCTION_URL → VERCEL_URL → localhost). CORRECTED 2026-09-07 (panel I03): the per-deployment VERCEL_URL sits behind Vercel SSO, so canonicals, og:image and the sitemap pointed at a login wall; the stable production alias comes first now. The Person JSON-LD carries city/region (Bochum, NRW) for regional search — no street. Per-page `alternates.canonical` relative paths. Title template `%s · Iwan Braun`; home carries the default title. Legal pages `robots: noindex` and excluded from sitemap.

## AI-crawler policy: TRAINING DISALLOWED, fetchers allowed
robots.ts denies GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Applebot-Extended — the machine-readable Nutzungsvorbehalt under UrhG §44b (silence would read as consent to training). Live answer-engine fetchers (ChatGPT-User, PerplexityBot) stay allowed so the site remains citable in AI answers — the hireability goal wants discoverability, not uncompensated training reuse. NOTE the irony is understood (an AI-native portfolio blocking AI training); it protects the user's §44b rights and is one line to reverse — surfaced at CP6 as a reversible decision.

## OG
Root opengraph-image: brand card in real Space Grotesk 700 (instanced static TTF in assets/), void ground, live-dot mark, tri-color "Four worlds". Case pages inherit the root card (their titles/descriptions differ; per-route OG images deemed unnecessary at this site size). Favicon: monogram as app/icon.svg (create-next-app default favicon deleted). JSON-LD: schema.org Person on the root layout.

## Security headers (2026-09-07, panel I43)
`next.config.ts` sets on every route: `Content-Security-Policy` (default-src self · script/style self + inline — the Cache-Components static shell cannot carry nonces and the Next runtime's RSC payload is inline · img self+data (the texture kit is data-URI CSS) · font/connect self · frame-ancestors none · base-uri self · form-action self · object-src none), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. HSTS stays Vercel's. Verified: zero CSP violations in the console on all routes, both themes (gate-code re-run).

## 404 title
`app/not-found.tsx` exports its own metadata — "No such world · Iwan Braun", `robots: noindex` — so the document title says the address was wrong (WCAG 2.4.2, panel I19).
