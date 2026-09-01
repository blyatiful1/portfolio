# SEO — iwanbraun.dev

## Canonical strategy
`metadataBase` from `lib/site.ts` (env NEXT_PUBLIC_SITE_URL → VERCEL_URL → localhost). Per-page `alternates.canonical` relative paths. Title template `%s · Iwan Braun`; home carries the default title. Legal pages `robots: noindex` and excluded from sitemap.

## AI-crawler policy: TRAINING DISALLOWED, fetchers allowed
robots.ts denies GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Applebot-Extended — the machine-readable Nutzungsvorbehalt under UrhG §44b (silence would read as consent to training). Live answer-engine fetchers (ChatGPT-User, PerplexityBot) stay allowed so the site remains citable in AI answers — the hireability goal wants discoverability, not uncompensated training reuse. NOTE the irony is understood (an AI-native portfolio blocking AI training); it protects the user's §44b rights and is one line to reverse — surfaced at CP6 as a reversible decision.

## OG
Root opengraph-image: brand card in real Space Grotesk 700 (instanced static TTF in assets/), void ground, live-dot mark, tri-color "Four worlds". Case pages inherit the root card (their titles/descriptions differ; per-route OG images deemed unnecessary at this site size). Favicon: monogram as app/icon.svg (create-next-app default favicon deleted). JSON-LD: schema.org Person on the root layout.
