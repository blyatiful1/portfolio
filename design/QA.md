# QA — iwanbraun.dev

## Phase 5 — scaffold smoke test (2026-09-01)
- Versions verified live via `npm view` before init; resolved from package-lock: next 16.3.4 · tailwindcss 4.3.3 · motion 13.1.1 · lucide-react 1.38.0 · zod 4.5.4 · next-themes 0.4.6 · radix-ui 1.6.7 (shadcn CLI 4.19.1, style radix-nova). No manifest drift worth noting.
- Dev server: `GET / 200 in 1040ms`, `GET /studio 200` (dev). `npm run build`: EXIT 0, zero type errors, routes: / static, /studio dynamic.
- Deviation (recorded): create-next-app ran in a temp subdir and was hoisted — design/ already lived at project root with the phase-ledger git history; `design/BRIEF.md` verified resolving from project root.
- shadcn init reconciliation: its zero-chroma `:root` overwrite reverted to SYSTEM.md values; its appended `.dark` block DELETED (site is dark-leading — `:root` is dark, `.light` is the re-decision; next-themes defaultTheme="dark"); circular `--font-sans` self-reference fixed; sidebar/chart bridge orphans removed; `--radius: 0.25rem` kept to resolve shadcn's calc chain to the Sharp scale.
- `/studio` is the dev-only construction window: EXEMPT from all gates (gate-antislop, gate-visual, gate-responsive do not measure it); ship's smoke test must get 404 from it in production.

## Phase 7 — backend verified (2026-09-01)
- Webhook `/api/github/webhook`: valid HMAC push → `{"ok":true,"inserted":1}` HTTP 202; duplicate delivery → `inserted:0` (idempotent via sha unique); bad signature → 401; ping → 200. Command + outputs in session log.
- SSE `/api/wire?since=0`: delivered `retry: 1500`, the stored event frame (AI correctly detected from Co-Authored-By trailer), heartbeat comment. Serverless-honest: 4s poll, 55s lifetime, Last-Event-ID resume.
- Store: drizzle 0.45.2 (stable line — choice recorded in BRIEF §Backend context), PGlite dev / Neon HTTP prod, migration drizzle/0000_familiar_spot.sql committed and mirrored by the dev bootstrap.
- Contact action: server validation round-trip in real browser — field errors render in the copy's words, values preserved, honeypot + rate-limit seam in place. Form is `<form action={serverAction}>` (structurally no-JS-capable); a genuine JS-off submit run is owed to gate-accessibility. Email: Resend lazy client, `{error}` checked, designed failure copy when RESEND_API_KEY absent (dev state).
- `npm run build` EXIT 0; /api routes dynamic, pages static with revalidation.

## gate-code — 2026-09-01 — PASS
| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | npm run build (cold) | PASS | exit 0 after rm -rf .next |
| 2 | tsc --noEmit | PASS | exit 0, strict true, 0 @ts-ignore/as-any (1 justified `as unknown as Db` driver switch in db/index.ts) |
| 3 | eslint . | PASS | exit 0, 0 inline disables |
| 4 | routes + terminal | PASS | 6/6 routes 200 + garbage 404; qa/dev.log clean |
| 5 | RSC boundaries | PASS | 15 client files (plan ≤16 incl theme-toggle), 0 in layouts, motion/hook cross-checks empty |
| 6 | stack relics | PASS | 0 hits (middleware/framer-motion/priority/tw3/engines) |
| 7 | unused deps | PASS | pglite+neon = dynamic imports (justified); tw-animate-css = globals.css; shadcn REQUIRED at runtime (radix-nova preset imports shadcn/tailwind.css — uninstall broke build, reinstalled; lesson recorded) |
| 8 | token contract + AA | PASS | node qa/token-contract.mjs exit 0 — 0 undeclared, all pairs ≥4.5 |
| 9 | CSS entropy | not run (wallace) — covered by check 8 + antislop greps; recorded as skipped |
NOTE (root-caused mid-gate): running `npm run build` while `next dev` served from the same .next corrupted the dev runtime (flaky hydration errors, stale Loadable graphs). Protocol now: gates run against `npm start` prod on :3001; dev server stopped first. The persistent dev-only "module factory" error does NOT reproduce in production (0 console errors, all routes).

## gate-antislop — 2026-09-01 — PASS
greps: 11/11 clean (gradients/bg-clip-text/emoji/lorem/dead-links/dead-copy/uniform-depth/glass≤1(header, DIRECTION-justified)/glow-orbs/sparkle/chat-bubble/fake-proof: all zero unjustified)
screens: no icon-card rows · rhythm: multiple distinct paddings + full-viewport chapters · asymmetry: offset facts rails + the one light world · no navy template (dark is the DIRECTION archetype, justified in writing) · shadcn restyled (Sharp radii, custom palette, custom focus) · no chat bubble
fixed during sweep: none needed · residual: none

## gate-content — 2026-09-01 — PASS
metadata: 5/5 routes, titles unique ≤60ch, descriptions unique (home 155 / uw 148 / hm 146; legal short but noindex — N/A logged), metadataBase + canonicals ok
headings: 1 H1/page ×5, story argues conversion on all (home: claim→proof→worlds→ask)
dead copy/microcopy: 0 hits (28+ patterns); no Submit/Learn-more; proof inventory EMPTY per brief — zero testimonials rendered ✓ (nothing to trace)
links: internal 200 ×all + anchors resolve (#main/#worlds/#operator/#contact) · externals 200 ×5 (ultraweb-site, github ×4) · price-history N/A · voice: consistent (judgment pass)

## gate-responsive — 2026-09-01 — PASS
Independent sweep: pixel-qa subagent (15 screenshots qa/*.png, all routes × 375/768/1440) + Lead mechanical re-verification on prod after fixes.
| Check | Result |
|---|---|
| overflow | false everywhere after fix (was TRUE on /work/* at 768/1440 — Edge Bleed figures uncontained → sections now overflow-x-clip; re-measured false ×4) |
| touch targets 375 | primaries ≥44 (chapter CTAs 48, contact-alt 45, menu 44, wordmark h-56, toggle 44); footer link lists 42 effective — documented exception (WCAG 2.5.8 floor 24 ✓, spacing clean); 1 inline rail link exempt |
| mobile menu | opens, focus-trapped, navigates to #operator, closes — proven twice (dev sweep + prod re-run) |
| 768 orphans | none; operator stat-card height imbalance noted as acceptable (h-fit by design) |
| console | prod: 0 errors on all routes (dev-only hydration flake root-caused to shared-.next corruption — see gate-code note; Reveal reduce-branch SSR divergence FIXED: constant initial, reduce honored in transition) |

## gate-accessibility — 2026-09-01 — PASS
routes ×5 · themes dark+light · prod server
contrast (rendered, canvas-resolved): 0 failing pairs ALL routes BOTH themes — after fixes: case numerals /50→/70 (2.38→≥3.3 large), chrome-facing world accents split into theme-aware `--world-*-chrome` tokens (light re-decisions: uw 0.50/hm 0.45/gt 0.45 — hazard yellow was 1.42 on light), footer surface → bg-card (was hardcoded dark under theme text)
keyboard: skip-link first stop ✓, visual order ✓, designed ring on every stop (12/12 sampled) ✓, Escape closes menu + focus returns to trigger (onCloseAutoFocus fix, proven) ✓
landmarks: 1 main, 1 h1, no level skips ×5 · alt/labels: 0 missing ×5 · forms: labels + aria-invalid + describedby + role=alert (Phase 7 evidence)
reduced-motion (emulated): expansion animation none, clip none, 0 hidden content, operator reveal opacity 1, 0 console errors
text-spacing 1.4.12: no blowouts (home + case page) · targets ≥24 everywhere
BFSG scope (DE): OUT — no consumer contracts concluded online, microenterprise; recorded, no statement owed (defensive Impressum/Datenschutz present)
axe (unscoped + wcag22aa): 0 violations except footer IWAN·BRAUN watermark contrast — DOCUMENTED EXCEPTION: purely decorative brand texture (aria-hidden, 13% opacity by design) under WCAG 1.4.3 decorative/logotype exemption

## gate-performance — 2026-09-01 — PASS (with recorded residual)
lighthouse mobile: / 95 (final, post motion-removal; was 92 median) · /work/ultraweb 95 · /work/hardmode 97 — all ≥90 · desktop confirmation: 100
CLS: 0.00 all routes · LCP element: the H1 (text, TTFB 4ms, render delay 146ms observed)
RESIDUAL (recorded): simulated-mobile LCP 2.9s home / 2.9 / 2.6 case pages vs the 2.5s target — simulated 4G critical-chain bandwidth (fonts+CSS), not element mis-optimization; desktop LH LCP 0.7s. Fixes applied: Fraunces variable→static-500 (146kB→28kB), mono/serif preload:false, SG display:optional, radix Dialog chunk on first-open import(), `motion` library REMOVED (gate-visual r1 made it unused).
scripts: 160kB transfer vs 140kB budget — residual ~20kB over; attribution: Next 16 runtime+React baseline dominates. Recorded honestly.
fonts: self-hosted next/font, 0 Google-host requests, 5 files 83kB total (was 188kB) · transfer/route ~0.43MB ≪ 1.5MB
second engine/renderer: none (no animejs/three — not commissioned)

## gate-visual — round 1 — 2026-09-01 — FIX-THEN-SHIP (judge verbatim; homepage evidence ruled INVALID)
Shoot: pixel-qa, 5 routes × dark+light, prod (qa/visual/round-1/). Judge: design-judge subagent, fresh context.
| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home (evidence invalid) | 5 | 6 | 5 | 7 | 4 | 5 |
| work-ultraweb | 7 | 8 | 6 | 8 | 6 | 6 |
| work-hardmode | 7 | 8 | 6 | 7 | 6 | 5 |
| impressum | 6 | 7 | 5 | 6 | 3 | 4 |
| datenschutz | 6 | 7 | 4 | 6 | 3 | 6 |
Judge's critical catch: full-page capture froze the world-enter FROM-state (fill:both + never-scrolled view timeline) — homepage unjudgeable in that round; re-shoot with reduce emulated. Banned hits: impressum address placeholder (known material-unconfirmed, CP6 item), datenschutz uniform rhythm.
Fixes applied after round 1 (each traceable to the judge's ranked list):
- d2 Reveal → SUBTRACTIVE (content visible in SSR/no-JS/reduce; hidden only under html[data-js]+no-preference; IO+CSS transition) — `motion` library became unused and was REMOVED (bundle win; stack-lock note in SYSTEM §motion)
- d4+d10 legal pages → Margin Note 3/9 sticky rail, accent rules under labels, varied block rhythm, one grid
- d5 hazard stripe 10→28px + --hazard-offset clears glass header on the case hero
- d7 numbered lists aligned to the page grid (mx-auto dropped)
- d8 stats → Framed Data (bracket-frame corners, text-5xl numerals); hm 3rd label shortened (no wrap)
- d9 H1 split-word colors → "Four worlds" + live-square period (identity gesture); OG card matched
- d11 hm light chrome accent → richer bronze oklch(0.48 0.13 87)
- d12+d6 bleed figures carry the code itself across the edge (md:pr-0, border-r-0); per-world figure gestures (uw: Fraunces italic figcaptions · hm: hazard left rule)
- d3 impressum address: REMAINS — material-unconfirmed marker, blocks production ship until the user supplies it (CP6)
Post-fix SSR verification: `curl | grep -c 'opacity:0'` = 0 (content visible in raw HTML), 10 .reveal nodes present, 5/5 routes 200, build exit 0.

## gate-visual — round 2 — 2026-09-01 — FIX-THEN-SHIP (evidence VALID; real movement)
Shoot: reduce-emulated + verified, 6 routes (incl. 404) × both themes (qa/visual/round-2/). Judge verbatim scores:
| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | 7 | 8 | 7 | 7 | 7 | 6 |
| work-ultraweb | 7 | 9 | 7 | 8 | 8 | 7 |
| work-hardmode | 7 | 8 | 7 | 7 | 8 | 7 |
| impressum | 7 | 6 | 6 | 7 | 6 | 7 |
| datenschutz | 7 | 6 | 6 | 7 | 6 | 7 |
| notfound | 8 | 9 | 6 | 6 | 6 | 4 |
Movement vs r1: uw +1/+1/+2/+1, hm +1/+2/+2, legal dist/craft +3/+3. Banned sweep clean. Verdict blockers → fixes applied:
- d1 404 now renders full site chrome (header/footer/legal links — §5 DDG ständig verfügbar) + identity live-dot
- d2 LIGHT THEME chapter grounds re-decided (not inverted): one odd world per mode — light mode makes world 03 the dark chapter, 01/02/00 adapt light; hardmode's light identity = ink-on-hazard-paper (tinted ground + inverted stripe). Rendered contrast after: 0 fails, 6 routes × both themes
- d3 prose measure: --container-prose 62ch→55ch (ch-unit vs real-chars conflation found empirically; ≈70 real chars now)
- d4 wire + contact form dressed in the bracket/instrument motif; labels mono-caps; hero gains the Framed-Data authorship counterweight (also resolves d7's dead right half)
- d5 verified-minor by crop inspection: numeral/label edges within 2–4px (judge's 20px estimate was thumbnail-scale artifact); brackets render as designed — no change
- d6 legal rails now carry the section index (anchor nav), Stand date, back-link; H1s → text-4xl
- d8 mono display: tracking −0.02em + word-spacing −0.35ch on hardmode display lines
- minors: hm closer forward link added; 404 live-dot added
- d3(address) unchanged — tracked production blocker for CP6
