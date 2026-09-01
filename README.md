# iwanbraun.dev — world 00

The portfolio at [iwanbraun.dev](https://iwanbraun.dev). It watches my other repos — and itself: every push lands on the site's live wire via webhook, and the authorship stat is recomputed from git history, never typed in.

**The claim this repo exists to prove:** AI agents write essentially every line I ship; I direct them and own the standard. Check it here the same way the site does:

```sh
git log --no-merges | grep -ci claude
```

## The build ledger

This site was built by [ultraweb](https://github.com/blyatiful1/ultraweb) — my agent-driven design studio — under [hardmode](https://github.com/blyatiful1/hardmode) verification discipline. The whole process is in the open:

- `design/` — the studio's working memory: brief, direction, design system, sitemap, mockup rounds (two full rounds were rejected at review), QA ledger with every gate verdict verbatim
- `qa/visual/` — five rounds of screenshot evidence scored by an adversarial design-judge agent; `round-4/VERDICT.md` is a full verdict, unedited
- `design/QA.md` — seven gates: code, anti-slop, content, responsive, accessibility, performance, visual — each with measured evidence

## Stack

Next.js 16 (App Router, Cache Components) · Tailwind v4 · GitHub webhook → Postgres event store (Drizzle; PGlite dev / Neon prod) → SSE wire · Resend contact.

No analytics, no trackers. `robots.txt` reserves against AI-training crawls (UrhG §44b) while staying citable.
