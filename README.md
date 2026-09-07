# iwanbraun.dev — world 00

The portfolio at the working name iwanbraun.dev — live today at [portfolio-umber-tau-e3ljyjwuiq.vercel.app](https://portfolio-umber-tau-e3ljyjwuiq.vercel.app) until the domain is bought. It watches my other repos — and itself: every push lands on the site's live wire via webhook, and the authorship stat is recomputed from git history, never typed in.

**The claim this repo exists to prove:** AI agents write essentially every line I ship; I direct them and own the standard. Check it here the same way the site does — per repo, on its default branch, merges excluded, one line per commit carrying an agent co-author trailer:

```sh
git log --no-merges -i --grep='co-authored-by: claude' --oneline | wc -l
```

The site sums that count across the four monitored repos (ultraweb, hardmode, gtheme, this one) and shows each repo's own sub-total on the operator card, so every term of the headline is reproducible on its own checkout. The trailer is written by the tooling; it identifies which tool made a commit, not how hard the work was.

## The build ledger

This site was built by [ultraweb](https://github.com/blyatiful1/ultraweb) — my agent-driven design studio — under [hardmode](https://github.com/blyatiful1/hardmode) verification discipline. The whole process is in the open:

- `design/` — the studio's working memory: brief, direction, design system, sitemap, mockup rounds (two full rounds were rejected at review), QA ledger with every gate verdict verbatim
- `qa/visual/` — five rounds of screenshot evidence scored by an adversarial design-judge agent; `round-4/VERDICT.md` is a full verdict, unedited
- `qa/panel-findings.md` — a 16-persona review of the live site, every item checked by an independent verifier, and the fix list this repo works through
- `design/QA.md` — seven gates: code, anti-slop, content, responsive, accessibility, performance, visual — each with measured evidence

## Checks

```sh
npm ci
npm run check   # eslint · tsc · token contract · node --test
npm run build
```

`npm test` runs the `node --test` suite (no framework): the authorship classifier, the webhook signature path, the SSE cursor clamp, the contact schema bounds and the rate limiter. CI runs the same three commands on every push and pull request.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · Tailwind v4 · GitHub webhook → Postgres event store (Drizzle; PGlite dev / Neon prod) → SSE wire · Resend contact.

No analytics, no trackers. `robots.txt` reserves against AI-training crawls (UrhG §44b) while staying citable.

## Environment

`GITHUB_TOKEN` · `GITHUB_WEBHOOK_SECRET` · `DATABASE_URL` · `RESEND_API_KEY` · `CONTACT_FROM` · optional `NEXT_PUBLIC_SITE_URL` (the public origin; otherwise Vercel's production alias is used) · optional `NEXT_PUBLIC_BOOKING_URL` (adds a booking link beside the contact form) · `GITHUB_API_BASE` is a test seam for pointing the build at a fixture server — never set it in production.
