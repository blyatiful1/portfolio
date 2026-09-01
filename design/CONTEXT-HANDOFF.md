# Context handoff — what's load-bearing in the build session (2026-09-01)

## The original request, verbatim (compaction-preservation rule)
/ultraweb — "I want a dynamically updating the portfolio site that connects my profile and my github repo's; i dont want this to be a generic portfolio site like all the ones that are beeing generated, i want this to be truly special and have something that no one else ever implemented in their coding career, walk me through your ideas and design choices"

Written mid-session at the user's request: the state a future session (or a post-compaction continuation) needs that ISN'T already obvious from the other design/* artifacts. Read design/PROGRESS.md §Now first — it is the resume authority; this file carries the surrounding context.

## Where the build stands
- ultraweb FLAGSHIP build, STUDIO engagement, solo mode. Client: Iwan Braun (github blyatiful1). Site: iwanbraun.dev (working name), repo at ~/portfolio (git, main).
- Phase 11/12. Six gates PASS (code, antislop, content, responsive, accessibility, performance-with-recorded-residuals). gate-visual: rounds 1–3 complete (verdicts + fix trails in design/QA.md), **round 4 = FINAL judge round (flagship cap) — a design-judge subagent may still be running in the background when you resume; check for its result before re-judging. Whatever it says closes the gate: SHIP, or residuals quoted verbatim at CP6.**
- After the gate: CP6 acceptance (user reviews working site + gate summary + click-list), then Phase 12 ship.
- Checkpoint history: CP1 approved-with-notes (AI-native stance bold), CP2 approved round 3 (Four Worlds B3 + expand-on-scroll notes; two full mockup rounds rejected first — see MOCKUPS.md), CP3/CP4/CP5 approved round 1.

## Running processes / environment
- PRODUCTION server on :3001 — PID in `/tmp/claude-1000/-home-crocco/feaea3b6-66c3-484e-b9a3-4d7b07ff1c81/scratchpad/prod.pid` (scratchpad is volatile; if gone, just `PORT=3001 npm start`).
- Dev server DELIBERATELY STOPPED. Throwaway python http.servers may linger on :8931 (design/mockups) and :8932 (design/) — safe to kill.
- Playwright MCP browser works; Lighthouse needs `CHROME_PATH=~/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`.
- `.env` (gitignored) holds GITHUB_WEBHOOK_SECRET=dev-secret-for-local-testing and a GITHUB_TOKEN taken from `gh auth token`.
- Dev DB = PGlite at .data/pglite (gitignored); one test event (sha abc1234) sits in it — harmless, dev-only.

## Hard-won lessons THIS session (the expensive ones)
1. **Never run `npm run build` while `next dev` serves the same `.next`** — it corrupts the dev runtime (flaky hydration errors, stale module graphs that survive `rm -rf .next` in the browser's cache because dev chunk names aren't content-hashed). Protocol adopted: gates and all verification run against `npm start` prod; dev only for /studio authoring.
2. **shadcn 4.x is a RUNTIME dependency** — app/globals.css `@import "shadcn/tailwind.css"` (radix-nova preset). Uninstalling it breaks the build. Don't "clean it up" again.
3. **Playwright MCP browser caches stale dev chunks across builds.** Nuclear option: kill via `pgrep -f "[m]cp-chrome"` — and beware the pkill self-match trap: any pattern string that also appears in your own command line (paths!) kills your shell (exit 144).
4. **Cache Components (Next 16) rules that bit us:** `export const dynamic` is incompatible; `notFound()` must run BEFORE `await connection()` or a 200 shell streams first (that was the /studio-in-prod leak); `new Date()`/`Date.now()` only inside `'use cache'` scopes (TimeAgo is a client leaf for this reason; footer year via cached getYear()).
5. **`networkidle` never fires on this site** — the wire holds an open SSE connection. Playwright: always `waitUntil: "load"` + settle waits.
6. **Full-page screenshots freeze the scroll-timeline from-state** (`animation: … both` + view() never scrolled) — shoot with `page.emulateMedia({reducedMotion:"reduce"})` VERIFIED, scroll bottom→top, settle 600ms. That's the accepted gate-visual methodology (rounds 2–4).
7. **ch unit ≠ characters**: --container-prose is 55ch (the "0"-glyph unit) ≈ 70 real characters. Don't "fix" it back to 62.
8. **Reveal animations are SUBTRACTIVE** (content visible in SSR; hidden only under `html[data-js]` + no-preference; IO removes [data-pending]). The `motion` npm package was REMOVED as unused — reinstall per stack-lock only if a future feature needs springs/gestures. Never reintroduce initial-hidden SSR markup (blank-site-without-JS + hydration-mismatch class of bugs).
9. **The authorship stat is computed with `--no-merges` semantics** (merge commits excluded — matches the README's command). Never hardcode any number anywhere; the footer once carried a stale mockup "254/256" and the judge correctly called it fabricated-in-effect proof.
10. Light theme: chapter grounds are RE-DECIDED per theme with exactly one odd world per mode (dark: gtheme light; light: gtheme dark, hardmode = ink-on-hazard-paper). Chrome-facing world accents live in separate `--world-*-chrome` tokens.

## Ship-blocking items for CP6 / Phase 12 (ask the USER)
- **Impressum postal address** — `[Anschrift wird vor Veröffentlichung ergänzt]` in app/(legal)/impressum/page.tsx is the tracked material-unconfirmed marker; production ship is blocked until the user supplies it.
- Publish the portfolio repo (github.com/blyatiful1/portfolio or chosen name) — then repoint the two "build ledger ↗" links (footer + world-00 CTA) that currently target the profile, and the wire's self-monitoring goes live for real.
- Configure push webhooks (secret = GITHUB_WEBHOOK_SECRET) on ultraweb, hardmode, gtheme + the portfolio repo → /api/github/webhook.
- Production env: DATABASE_URL (Neon — run `npx drizzle-kit migrate`), GITHUB_TOKEN, GITHUB_WEBHOOK_SECRET, RESEND_API_KEY + CONTACT_FROM (verified domain; onboarding@resend.dev is dev-only).
- Reversible decision to surface: robots.ts blocks AI-TRAINING crawlers (UrhG §44b reservation) while staying citable — one line to flip (design/SEO.md).
- /studio must 404 in prod — verified this build; ship's smoke test re-checks.

## Perf residuals (recorded, honest — design/QA.md §gate-performance)
Simulated-mobile LCP 2.9s vs 2.5 target (bandwidth-bound; desktop 0.7s); cold scripts 160kB vs 140 budget (Next runtime dominates). Both recorded as residuals, not passes.
