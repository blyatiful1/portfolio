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

## gate-visual — round 3 — 2026-09-01 — FIX-THEN-SHIP (new sectional/narrow evidence surfaced new findings; two r2 wins confirmed)
Shoot: 31 captures (full ×2 themes, home sectionals, 375/768) — qa/visual/round-3/. Judge verbatim:
| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | 7 | 7 | 6 | 7 | 7 | 6 |
| work-ultraweb | 8 | 8 | 7 | 7 | 8 | 6 |
| work-hardmode | 8 | 8 | 7 | 7 | 8 | 6 |
| impressum | 6 | 6 | 6 | 7 | 6 | 6 |
| datenschutz | 6 | 6 | 6 | 7 | 6 | 6 |
| notfound | 8 | 8 | 6 | 6 | 6 | 7 |
Judge: "the light-mode world inversion is the most award-grade decision in the whole build"; drops are new-evidence findings, not regressions. Two banned hits: the FOOTER'S HARDCODED 254/256 (fabricated-in-effect proof — mockup leftover while the site renders live 225/227) and the tracked Impressum placeholder.
Fixes applied (committed e470915):
- d1 footer stat now rendered from the same live getAuthorship() as hero/operator — the two-numbers defect is dead
- d2 min-w-0 on the chapter rail + commit lines — repairs the 1440 rail-x drift, the 41px overhang, and the 768 ~30ch measure collapse in one class
- d3 worlds dressed for min-h-svh: chapter titles → text-5xl, per-world ghost numerals at clamp(14rem,32vw,30rem) bleeding the right edge (Type as the Image + the recurring Edge Bleed SYSTEM promised)
- d4 evidence-panel bleed md:→lg: — 768 renders panels in-container, unclipped
- d5 legal 375: content first in DOM, rail md:order-first — H1 leads on mobile, tab order natural
- d6 chrome tuning now VISIBLE: header CTA bg-tuned/text-tuned-fg + live-chip border takes the tuned mix (color change fires under reduce too; no-JS renders rest chrome — recorded)
- d7 ONE Framed-Data moment: operator card → bracket grammar, big number mobile-only (hero owns it at lg), verify command whitespace-nowrap in overflow-x-auto
- d8 light re-decisions: .light .plus-grid dark mark; case-page mains keep world temperature in light (light:bg world-paper)
- d9 language bar: <1% segments dropped (no more "SHELL 0%" with a painted segment), dominant segment takes the world accent, widths sum true
- d10 craft batch: legal index links get underline affordance; GitHub ghost aligned to form fields; mailto reads as link; hero label one-line; 404 text-pretty; w0 streaming dot in --live; chip h-8
Round 4 (final within flagship cap 5) shoots the judge's named evidence gaps: light sectionals, 375 sectionals, 404 narrow, home light 375.

## gate-visual — round 4 (FINAL, declared cap) — 2026-09-01 — CLOSED: FIX-THEN-SHIP, residuals recorded
NOT a PASS. Round 4 was the declared final round (4 of the flagship hard cap 5); per the recorded protocol its verdict closes the gate and residuals go verbatim to CP6. Full verbatim judge report: qa/visual/round-4/VERDICT.md · evidence: qa/visual/round-4/ (32 captures).
| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | 7 | 8 | 7 | 8 | 8 | 6 |
| work-ultraweb | 8 | 9 | 7 | 8 | 8 | 7 |
| work-hardmode | 8 | 8 | 7 | 8 | 8 | 7 |
| impressum | 7 | 6 | 6 | 7 | 6 | 7 |
| datenschutz | 7 | 6 | 6 | 7 | 6 | 7 |
| notfound | 8 | 8 | 6 | 6 | 6 | 7 |
Verdict verbatim: "FIX-THEN-SHIP. The gate's bar (≥7 on all six axes, every page) is not met: home craft 6; impressum and datenschutz type/space/dist 6; notfound space/color/dist 6. Movement since round 3 is real and positive — home type/space/color/dist +1 each, uw type/color/craft +1, hm color/craft +1, legal hier/craft +1, notfound flat — and no round-3 fix regressed."
Banned sweep: clean; r3's fabricated-proof hit confirmed dead in pixels (225/227 from one source everywhere). Only remaining hit = the tracked Impressum placeholder (material blocker, not design).
R3 fix verification: d1/d2@1440/d3/d6/d7/d8/d9 + most of d10 confirmed in pixels. Not landed: d10's ghost-button alignment (new defect 4). Unverifiable this round for lack of captures: d2@768, d4, d5.
Ranked defects (one line each; full text in VERDICT.md):
1. Wire drops message text at 375 — core mechanic renders as content-free rows (usability-class)
2. Operator right half dead at 1440; framed note captions an off-screen number
3. Chrome tuning latches on last-visited world at operator/footer (light mode exposes it)
4. Ghost "GitHub" button breaks the left edge at 375 (~42px indent)
5. Case-page evidence panels bleed as empty slabs (~330–370px blank before the edge)
6. Legal prose measure ~76–83 chars vs SYSTEM's ≈70 ceiling (9-col width, not --container-prose)
7. Ghost numeral collides with chapter CTA at 375 (AA evidence doesn't cover the rendered pair)
8. Footer collapses 2+1 at 375, link labels wrap mid-phrase
9. World 00's facts rail thinnest of the four (no language bar/commits on the self-monitoring chapter)
10. WHAT I DON'T CLAIM label wraps; 404 is the only centered page, no site move
Judge's conversion path: defect 1 alone lifts home/uw/hm over the bar; defect 6 + one distinctive legal gesture lifts both legal pages; defect 10's 404 half lifts notfound. Round 5 remains available inside the flagship cap if the user commissions it at CP6.
Residuals (verbatim, quotable at acceptance — full wording also in VERDICT.md §Residuals): Impressum address placeholder (§5 DDG blocker); wire shows no commit message at 375; legal measure ~80 chars; impressum/datenschutz/404 dist 6 (no site moves in the corners); 404 centered vs site's left-aligned grammar; light-mode CTA stays terracotta at operator/footer; operator right half empty ~730px at 1440.
Evidence gaps (judge): 768 home/case unshot this round (r3 d2/d4 unverified there); 375 legal unshot (r3 d5 unverified); light chapter interiors w02/03/00 only in downscaled full-page.

## gate-visual — round 5 (LAST, user-commissioned at CP6) — 2026-09-01 — FIX-THEN-SHIP, blockers fixed post-round → gate CLOSED
Verdict verbatim: "FIX-THEN-SHIP — one defect from SHIP. The bar (≥7 on all six axes, every page, zero banned-list hits) is met on 35 of 36 cells and the banned sweep is clean for the first time in five rounds. The single blocker is datenschutz craft 6." Full verbatim report: qa/visual/round-5/VERDICT.md · evidence: qa/visual/round-5/ (41 captures + postfix-datenschutz-375.png).
| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | 8 | 8 | 7 | 8 | 8 | 7 |
| work-ultraweb | 8 | 9 | 8 | 8 | 8 | 8 |
| work-hardmode | 8 | 8 | 8 | 8 | 8 | 8 |
| impressum | 8 | 7 | 7 | 7 | 7 | 7 |
| datenschutz | 8 | 7 | 7 | 7 | 7 | 6 |
| notfound | 8 | 8 | 7 | 7 | 7 | 8 |
Banned sweep CLEAN (first time; address placeholder dead — real address renders in all three impressum captures). All ten r4 defects verified FIXED in pixels except d4 (fixed @1440, 375 only at downscale) and d9 (commits half landed, language bar pending data). Largest per-round movement of the build; no regressions.
**Post-round fixes (cap reached — judge-named, self-verified 2026-09-01 ~11:20, commit follows):**
- Judge defect 1 (the only <7 cell): datenschutz H1 → text-3xl sm:text-4xl. VERIFIED: browser_evaluate at 375 — fontSize 28px, H1 right edge 344 < 359, docOverflow false; capture postfix-datenschutz-375.png. Per the judge: "It takes datenschutz craft 6→7 and the whole matrix over the bar."
- Judge defect 2 (WCAG 3.1.2): lang="de" on both legal <main>s. VERIFIED: mainLang "de" in the served DOM.
- Judge defect 3: rail rows stack in the md..lg band (md:max-lg:grid-cols-1). VERIFIED at 768: dt y=1279, dd y=1298 (stacked), docOverflow false.
- Judge defect 4: no code change needed — GitHub finished computing the fresh repo's languages (gh api: TS 125729/HTML 66114/CSS 26167/JS 3560); w0 language bar VERIFIED rendering TypeScript/HTML/CSS at 768 in the new build.
- Judge low-confidence glyph observation: CONFIRMED REAL at 1:1 (impressum-light sun vs datenschutz-light crescent) and root-caused: the toggle's theme-dependent aria-label was computed on the hydration render where next-themes already resolves the stored theme → hydration attribute mismatch → React 19 silently keeps the stale server attribute. Fix: accessible name as mounted-gated sr-only text. VERIFIED: light mode renders lucide-moon + "Switch to dark theme", zero console errors on fresh navigation (an ungated intermediate version threw React #418, proving the mechanism).
**Gate closed at cap.** Residuals surviving after the post-round fixes, in the judge's verbatim wording (full set + dead list in VERDICT.md): the two space-priced observations ("Each world chapter fills a full viewport, so on desktop every chapter ends with 120 to 240 pixels of empty ground below its call to action. This is the cost of the full-viewport chapter format, not an unfinished section." · "In the contact section at 1440 px the upper right quadrant carries no content.") and the address-confirmation note ("Please confirm the street, number and city are correct before publication") — address was supplied by the client in-session. Evidence gaps recorded in VERDICT.md: work-* at 375 (last shot r3), chapters 02/03/00 at 375, contact block 375 at 1:1, 768 light.

## iterate — panel findings rework — 2026-09-07 (Lead: this session · Plugin: /home/user/ultraweb @ v1.9.0 checkout)
Request: rework every finding in qa/panel-findings.md (16-persona review of the live deployment, verified against HEAD 6511629). Classification per `iterate` §2, one layer per item, artifacts amended before code (BRIEF §Iteration 2026-09-07 · SYSTEM §Amendments · SITEMAP nav/section lines · SEO canonical order + headers):
- **Content:** I10 verify command (line-count → per-commit `--grep`, single source `lib/data/authorship.ts` → README, operator card, console signature) · I17 relabel ("commits across these worlds — agent co-author trailer" + limitation line) · I21 Datenschutz: Resend/Google/Vercel/GitHub named, US-transfer basis, hoster retention as stated, new "Empfänger" block + nav · I24 typographic apostrophes (20 JSX sites + 4 string literals; mono/code untouched) · I25 hardmode: 12 hooks × event × exit-code table + 4 agents × trigger × context × contract table, facts refreshed to v3.1.0 (2026-09-02) — the site had shipped the day before · I26 gtheme + hardmode proof strings link to their Actions runs · I32 "Bochum, NRW · remote / hybrid" + JSON-LD PostalAddress (city/region, no street) · I60 world-00 copy describes the mechanism, not an age · I63 world-00 stack row "Next.js 16 · React 19 · TypeScript" · I16 honest-gap line ("client references — every world here is my own") + dated timeline/descope lines on both case studies (from the repos' own git dates and READMEs) · I48 case-study argument prose → text-base.
- **Component:** I02 dt labels = muted token, dd = foreground token, no alpha (world-chapter rails, operator dl; language-bar caption alpha dropped in the same sweep) · I06 footer freshness stamp `recomputed <TimeAgo>`; 404 footer renders the zero-state line (`<Footer stat="none">`) so the static shell bakes no number · I07 `noValidate` + focus first invalid field · I18 wire pause/resume control (WCAG 2.2.2): paused = no EventSource + `aria-live="off"`, persisted in localStorage; relative timestamps aria-hidden with an absolute UTC date · I19 404 `<title>` "No such world · Iwan Braun" + `#main-heading` focus target · I20 success box receives focus; form-level error focuses the alert · I29 ONE documentary figure on /work/ultraweb — the approved B3 mockup rendered at 1440 (design/mockups/b3-four-worlds.html → public/work/ultraweb-b3-mockup.webp, 1200×750, 34 kB, next/image lazy + sizes) · I31 theme toggle in the desktop nav (beside the chip) and the mobile menu's bottom block · I33 booking link, env-gated (`NEXT_PUBLIC_BOOKING_URL`) · I39 CTA accessible names carry the destination (sr-only), arrows aria-hidden; case-study "repo ↗" → "<name> repo on GitHub" · I40 sr-only state text on the live chip and AI/HUM badges · I41 stat sentence in the flow, digits aria-hidden — no aria-label on `<p>` anywhere · I58 world-03 pill inline-block + own leading, heading leading 1.06 (crop-verified) · I61 mobile "this site" → `text-foreground/70` · I64 reply-time line in the idle form.
- **Feature:** I03 `siteUrl()` prefers `VERCEL_PROJECT_PRODUCTION_URL` (stable alias) over the SSO-gated per-deployment `VERCEL_URL` · I14 `node --test` suite (25 tests: classifier, signature path incl. non-hex 64-char, cursor clamp, schema bounds, rate limiter) + `npm run check` + `.github/workflows/ci.yml` · I22 SSE cursor clamped to [0, tip]; per-IP connection budget (12/min → 429); per-instance open-stream cap (64 → 503) · I23 `gh` distinguishes 404 (missing) from 403/5xx/network (unreachable); `RepoFacts.reachable`, `Authorship.partial/missing`; hero, operator, footer and each chapter render the honest partial state; a degraded recompute caches for minutes, not hours · I34 signature verify is charset-guarded and try/caught (401 on any malformed signature, 400 on non-JSON) · I43 CSP + X-Frame-Options + nosniff + Referrer-Policy + Permissions-Policy on every route (script-src keeps 'unsafe-inline': the Cache-Components static shell cannot carry nonces) · I44 schema max bounds + `maxLength` mirrors; limiter documented as per-instance, evicts expired keys · I45 paging ceiling surfaced (`truncated`, "+" on the chapter count, "(most recent 500 per repo)" on the card) · I46 one classifier for the API path and the webhook · I54 package name `iwanbraun-dev` · I59 cache purges only when a delivery inserted rows.
- **System:** SYSTEM §color label-pair rule · §imagery documentary exception · §type case prose · §shape pill · world 03's `--live` token re-decided per theme inside its scope (the inverted chapter's dot measured 1.69/3.13 — now ≥4.5 both themes).
- **Blocked on owner input, not invented:** I01, I05, I11, I15, I28, I52 (+ I33's URL) — see the rulings block.
Environment of record: remote sandbox, Node 22.22.2, npm ci from the lock (no dependency changes). GitHub REST is blocked here (403 by policy), so the build of record ran against a fixture server replaying the four repos' real git histories through the new `GITHUB_API_BASE` seam (`ultraweb 60/62 · hardmode 42/42 · gtheme 124/124 · this site 27/27`); the Playwright MCP is not registered, so browser measurements ran through the Playwright library with the plugin's own `scripts/measure/*.mjs` — gate-runner entries below mark those halves UNVERIFIED and the Lead's rulings cite the library run (qa/gate-lead-round6.json, 36 frames in qa/visual/round-6/).
Preamble: `rm -rf .next && npm run build` exit 0 (qa/build.log) × 4 rounds (fix rounds: PGlite `serverExternalPackages`; label/numeral/table/live-dot; card `min-w-0` + pause-target height; command wrap + dot token) · `PORT=3100 npm start` · fixture :3999.
Lead-run checks on the final build: `tsc --noEmit` 0 · `eslint .` 0 (one pre-existing `set-state-in-effect` error in theme-toggle fixed) · `node qa/token-contract.mjs` PASS · `node --test` 25/25 · 10 routes 200/404 as designed (/studio 404) · security headers present on every route · 404 title correct · axe (wcag2a/2aa/22aa) both themes × 375/1440 × 6 routes: only the documented footer watermark remains · contrast-matrix (canvas-resolved) both themes: only the watermark · document overflow: none at 36 combinations (was TRUE on home 375/768 after the longer command — fixed) · targets ≥24 except the sr-only skip link (documented) · console: clean except the 404 document's own 404 line · CSP violations: 0 · wire pause control: live→off, persisted, resumed; chip state text follows · contact form: noValidate, errors rendered in the copy's words, focus lands on the first invalid field, promise line present · webhook on the running server: signed delivery 202 inserted 1, replay 202 inserted 0, tampered 401, 64-char non-hex 401, non-JSON signed body 400, ping 200 · wire: `since=-5` and `since=1e12` clamped (stream opens), 13th connection/min per IP → 429 · Lighthouse mobile (sequential, quiet machine): home 92 (LCP 3.0 s, CLS 0, TBT 170 ms), /work/ultraweb 94 (LCP 2.9 s, CLS 0), /work/hardmode 97 (LCP 2.6 s, CLS 0) — design/lh/*-iter-2026-09-07.json; the previous LCP residual stands, the new figure adds no CLS.
Vercel preview of the branch (real GitHub API + Neon; SSO-protected — reached through a Vercel share link): CSP/X-Frame-Options/nosniff/Referrer-Policy/Permissions-Policy live · canonical `https://portfolio-umber-tau-e3ljyjwuiq.vercel.app` (the stable production alias — I03 works on Vercel) · og:image 200 image/png 46 kB · operator card 258/260 with `ultraweb 65/67 · hardmode 42/42 · gtheme 124/124 · this site 27/27` · "shipping since Dec 2021" from the account's real `created_at` (2021-12-21) · "Bochum, NRW · remote / hybrid" · "React 19" · 404 `<title>No such world · Iwan Braun</title>` with the zero-state footer line · /work/hardmode "12 hooks · 4 agents · v3.1.0" + "The twelve, by name". Partial-outage proof (separate build, fixture with gtheme + user endpoint down, agent-run): hero "129 / 131 · commits AI-authored across 3 of 4 worlds · ○ partial recompute · gtheme unreachable", world 03 "○ github unreachable — retrying" with no commits row, operator "○ partial recompute — gtheme unreachable; the fraction excludes it." and no shipping-since row, footer "129/131 commits across 3 of 4 worlds: not mine." — frames qa/visual/round-6/partial-*.png.

## gate-code — 2026-09-07 — FAIL

**Iterate re-gate** after qa/panel-findings.md. Build of record: exit 0 (PROGRESS.md §Now, qa/build.log, unchanged — not rebuilt). New files this iteration counted in the census below: lib/**/*.test.ts, .github/workflows/ci.yml, components/wire/wire-pause.tsx, lib/data/authorship.ts, lib/wire-since.ts, lib/webhook-signature.ts, public/work/ultraweb-b3-mockup.webp.

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | build of record | PASS | qa/build.log exit 0 (PROGRESS.md §Now) — "✓ Compiled successfully in 11.0s" |
| 2 | npx tsc --noEmit | PASS | exit 0, silent · tsconfig.json:7 `"strict": true` · 0 hits for `@ts-ignore`/`@ts-expect-error`/`as any` |
| 3 | npx eslint . | PASS | exit 0, 0 problems · `next lint` absent from package.json (script is `"lint": "eslint"`) · 1 `eslint-disable-next-line` hit at app/(studio)/studio/page.tsx:87, scoped to `@next/next/no-img-element`, self-documenting, dev-only-gated file — treated as justified |
| 4 | routes + prod log | PASS | 5/5 SITEMAP routes 200 on :3100 (/, /work/ultraweb, /work/hardmode, /impressum, /datenschutz) · qa/prod.log clean (0 error/hydrat/failed across 9 lines) |
| 5 | RSC boundaries | PASS | 15 client leaf files, 0 in any layout.tsx, 0 unjustified in page.tsx (0 total hits in page.tsx) · motion/react and useState/useEffect/useRef/onClick= greps: 0 files missing "use client" · within skill's ≤15/FAIL>30 bar. Note: SITEMAP.md Part 3 states a project budget of "≤9 files" (8 named rows) — current count of 15 exceeds that stated plan; flagged for Lead, not failed mechanically. New file components/wire/wire-pause.tsx counted in the 15 (WCAG 2.2.2 pause control). |
| 6 | stack relics | PASS | 0 hits across all 10 greps (middleware.ts absent — proxy.ts convention n/a here, no framer-motion, no onLoadingComplete, no `priority` prop, no tailwind.config/v3 relics, no animejs v3 import, no createDraggable, no cubicBezier string ease, no R3F v8 relics, no @types/three drift) |
| 7 | unused dependencies | **FAIL** | package.json:28 `"shadcn": "^4.19.1"` — 0 import hits in app/components/lib, 0 hits in next.config.ts/drizzle.config.ts/globals.css; components.json present (CLI-config only, no runtime import). 4 other flagged deps are false positives: @electric-sql/pglite (next.config.ts:36 serverExternalPackages + db/index.ts), @neondatabase/serverless (db/index.ts), @react-email/components (emails/contact-notification.tsx), tw-animate-css (globals.css:2 `@import`, not a JS import) — owner: Lead · MECHANICAL (keep-and-document or `npm uninstall shadcn`) |
| 8 | token contract + AA | PASS | `node qa/token-contract.mjs` exit 0 — "token-contract: PASS" (0 undeclared vars against `:root`/`.light` — this project's actual dark/light selectors; 0 sub-AA pairs) |
| 9 | CSS entropy | **FAIL** | wallace-cli on .next/static/chunks/3uwi9b0ztu57i.css (Turbopack's actual emit path, not static/css): (a) `!important` count = 1, not 0 — `[hidden]{display:none!important}`, traced to Tailwind's own Preflight base layer, 0 hits in app/components/lib source (not a project override); (b) 1 orphaned custom property — app/globals.css:60 `--radius: 0.25rem;` declared under a comment claiming it "resolves shadcn's calc chain," but grep of node_modules/shadcn/dist/tailwind.css shows zero "radius" references and 0 `var(--radius)` call exists anywhere in source — owner: tokens · MECHANICAL |
| 10 | DIRECTION-gated deps | judgment-open (trivial) | 0 hits for animejs/three/@react-three/* in package.json or as imports — nothing installed, nothing to cite, check vacuously clear |
| 11 | CSS census | judgment-open | wallace: 11 unique colours emitted, 17 unique font-sizes emitted vs SYSTEM.md §type's 10-step clamp() scale (2xs/xs/sm/base/lg/xl/2xl/3xl/4xl/5xl) — tail of 7, Tailwind-utility spillover per the check's own tolerance clause — Lead to rule against ceiling |

Supplementary (not a numbered check): `npm test` — 25/25 passing (lib/wire-since.test.ts and others), 0 failures.

Issues found, not fixed (runner never edits source): check 7 — decide keep-with-note or uninstall `shadcn`; check 9 — remove or wire up `--radius` in app/globals.css:60, and confirm whether the Preflight `!important` is accepted as framework-owned or needs a `@layer` override.

## gate-responsive — 2026-09-07 — UNVERIFIED
NO BROWSER — Playwright MCP not available in this dispatch; zero routes independently verified by gate-runner.

| Route | 375 | 768 | 1440 | Overflow | Targets <44 | Console |
|-------|-----|-----|------|----------|-------------|---------|
| / | qa/visual/round-6/home-dark-375.png | qa/visual/round-6/home-dark-768.png | qa/visual/round-6/home-dark-1440.png | Lead-measured: none | Lead-measured @24 (not 44): 1 (skip link, likely exempt) | clean |
| /work/ultraweb | qa/visual/round-6/work-ultraweb-dark-375.png | qa/visual/round-6/work-ultraweb-dark-768.png | qa/visual/round-6/work-ultraweb-dark-1440.png | Lead-measured: none | Lead-measured @24 (not 44): 4 (skip link + 3 closer links ~21px tall) | clean |
| /work/hardmode | qa/visual/round-6/work-hardmode-dark-375.png | qa/visual/round-6/work-hardmode-dark-768.png | qa/visual/round-6/work-hardmode-dark-1440.png | Lead-measured: none | Lead-measured @24 (not 44): 4 (skip link + 3 closer links ~21px tall) | clean |
| /impressum | qa/visual/round-6/impressum-dark-375.png | qa/visual/round-6/impressum-dark-768.png | qa/visual/round-6/impressum-dark-1440.png | Lead-measured: none | Lead-measured @24 (not 44): 1 (skip link) | clean |
| /datenschutz | qa/visual/round-6/datenschutz-dark-375.png | qa/visual/round-6/datenschutz-dark-768.png | qa/visual/round-6/datenschutz-dark-1440.png | Lead-measured: none | Lead-measured @24 (not 44): 1 (skip link) | clean |
| /this-world-does-not-exist (404) | qa/visual/round-6/notfound-dark-375.png | qa/visual/round-6/notfound-dark-768.png | qa/visual/round-6/notfound-dark-1440.png | Lead-measured: none | Lead-measured @24 (not 44): 1 (skip link) | own 404 resource-load line only (expected) |

Each route also captured light-theme + reduced-motion at the same 3 widths (36 frames total, `qa/visual/round-6/`); all cited above are Lead-measured, not independently run by gate-runner (no browser this dispatch).

Mobile menu (check 4): UNVERIFIED — no browser, not exercised this dispatch.
Primary interaction (check 5): UNVERIFIED — no browser, not exercised this dispatch.
Orphans at 768 / letterboxing at 1440 (check 6): UNVERIFIED — no browser, frames not reviewed this dispatch.
Deliberate-at-each-width (check 8): judgment-open → design-judge. Evidence: `qa/visual/round-6/` (36 sweep frames + 14 named detail crops: operator-card, wire, uw-figure, w3-lozenge, hm-hooks-table, each dark/light at 375/1440).

Targets (check 3) caveat: Lead's threshold was 24 (WCAG floor), not this gate's 44px floor — re-measure at 44 recommended. Even at 24, closer-section nav links on /work/ultraweb and /work/hardmode measure ~21px tall (e.g. "ultraweb on GitHub ↗" w=182.8 h=21) — fails both thresholds. The 1×1 "Skip to content" hit on every route is a visually-hidden-until-focus skip link, plausibly exempt (not a pointer target while hidden) but not confirmed.

Code audit (gate-runner, no browser needed) — confirms the round's stated fixes are in the served code:
- Viewport meta present on all 5 sitemap routes.
- `components/sections/operator.tsx:102,158` — stat card carries `min-w-0`.
- `components/sections/operator.tsx:149` — verify command: `max-w-full break-all whitespace-pre-wrap`.
- `components/sections/wire.tsx:11` — wire panel header: `flex flex-wrap ... justify-between`.
- `app/(site)/work/hardmode/page.tsx:186-192,220-226` — both new tables in `overflow-x-auto` + `role="region"` + `tabIndex={0}` regions.
- `app/(site)/work/ultraweb/page.tsx:155-160` — new figure: `next/image` with `width={1200} height={750} sizes="..."`.

Full evidence: `qa/gate-lead-round6.json` (Lead's overflow/targets/console measurements), `qa/gate-responsive.log`.

## gate-antislop — re-run (2026-09-07)
Iterate re-gate after qa/panel-findings.md. Scope: checks 1–11 only (rerunOnly); checks 12–17 unchanged pending this round's gate-visual sweep (design-judge rules). Playwright MCP not registered this session — check 13's browser measurement is UNVERIFIED, Lead's frames at qa/visual/round-6/ cited in its place.

greps: 9/11 clean, 2 hits
1 gradient combos — clean: 0 tsx purple/violet/fuchsia/pink/indigo hits; 1 raw CSS `linear-gradient` at app/globals.css:318 is the hardmode hazard stripe (repeating-linear-gradient, hazard yellow/black), not a purple→blue combo — no clash.
2 gradient headline text — clean: 0 `bg-clip-text` hits.
3 emoji in code/copy — HIT: components/wire/wire-pause.tsx:28 uses aria-hidden glyphs ▶ / ❚❚ (U+25B6, U+2758 — Dingbats range) as the pause/resume icon on the new WCAG 2.2.2 control (SYSTEM.md §motion amendment 2026-09-07) instead of an icon-library glyph. No DIRECTION.md citation for this exact pattern. owner: icons · MECHANICAL (swap for lucide-react Play/Pause, aria-hidden unchanged).
4 lorem/placeholder/fabricated proof — clean: 0 lorem/TODO/Feature-N hits; 0 ★★★★★/"Happy Customer"/"John D."/UNVERIFIED-PROOF hits in source. BRIEF.md proof inventory confirmed EMPTY (no third-party testimonials/press/logos). operator.tsx:61 renders "client references — every world here is my own" per BRIEF's I16 amendment — no invented attribution anywhere.
5 dead links — clean: 0 bare `href="#"`.
6 dead startup copy — clean: 0 hits, including copywriting's expanded list (revolutioniz-, cutting-edge, world-class, leverage the power, etc.).
7 uniform depth — clean: 0 `rounded-{xl,2xl,3xl}` + `shadow-{md,lg,xl}` pairings on any element.
8 glass smear — clean: exactly ONE glass surface site-wide, `.glass-header` (app/globals.css:351–354, `background: color-mix(...) + backdrop-filter: blur(8px)`), applied only to components/layout/header.tsx:50. Matches DIRECTION.md/SYSTEM.md §depth's single-surface justification verbatim ("THE one glass surface").
9 glow-orb furniture — clean: 0 `blur-2xl`/`blur-3xl` hits, no absolutely-positioned blur-decorated divs.
10 motion on everything — HIT: home page section census (7 sections per SITEMAP.md) — hero (static, LCP) and wire (loading-skeleton pulse only) carry no entrance reveal; world-chapter.tsx's `Reveal` wrapper fires once per chapter (×4, via `chapters.map` in app/(site)/page.tsx) and operator.tsx wraps 3 blocks in `Reveal` — 5 of 7 sections (71.4%) carry entrance animation, over the ≤60% cap. No second engine found (`rg -l 'from "animejs"'` / `'from "three"|@react-three/'` both empty) — the world-entry expansion itself is the exempt site-wide signature move; this hit is the separate per-chapter `Reveal` layered on top of it. Case-study routes (/work/ultraweb, /work/hardmode) and both legal pages: 0% reveal usage, well under cap. owner: motion-language · DESIGN (a rhythm/budget call, not a one-line fix).
11 AI-era reflexes — clean: 0 Sparkle-family hits; 0 `fixed`+`bottom`+`right` combinations in tsx or css (no launcher widget anywhere; matches BRIEF's AI-gate — no assistant scoped).

fixed: none — runner measures and reports only, per gate-runner contract; no source touched.
residual: check 3 (wire-pause.tsx:28), check 10 (home entrance-reveal census 71.4%) — both open, owners named above.
judgment-open: 13 wallpaper rhythm — UNVERIFIED (no browser this session; qa/visual/round-6/ frames cited for the Lead/design-judge to re-derive verdict + distinctPaddings from). 12, 14–17 unchanged from prior round, ruled by design-judge in this round's gate-visual sweep.
unverified: check 13's live rhythm measurement — Playwright MCP not registered this session; no re-measure possible, evidence directory cited above in its place.

## gate-content — re-run (2026-09-07)
Iterate re-gate after qa/panel-findings.md. Full 12-check run (no rerunOnly given) against prod http://localhost:3100. Playwright MCP not registered this session; checks 1,2,4,6,7,9 are fully curl/grep-verifiable per session facts and asserted directly; checks 3,8,12 remain JUDGMENT (Lead rules) — evidence collected below; checks 5,10,11 log N/A (pattern absent on this site, not skipped).

1. Metadata presence — PASS. 5/5 routes serve `<title>` + meta description + OG title/description/image. `metadataBase` set (app/layout.tsx:9, `new URL(siteUrl())`). Titles ≤60ch: / 33 · /work/ultraweb 55 · /work/hardmode 56 · /impressum 22 · /datenschutz 33.
2. Metadata uniqueness — PASS. 0 duplicate titles, 0 duplicate descriptions (`sort|uniq -d` empty). Non-legal descriptions 140–160ch (/ 157 · /work/ultraweb 148 · /work/hardmode 148); legal pages carry short descriptions + `<meta name="robots" content="noindex"/>` (verified present both) — N/A logged, unchanged from prior round.
3. OG card legibility — JUDGMENT → Lead. `curl` saved qa/og-card.png (1200×630, 46091 B, image/png, HTTP 200). Rendered headline (app/opengraph-image.tsx:45-48): "One operator. Four worlds." at fontSize 104 — 4 words.
4. Dead copy & bare labels — PASS. 0 hits on the startup-copy sweep (welcome to/elevate/seamlessly/empower/revolutioniz/cutting-edge/world-class/etc.); 0 bare Submit/OK/Cancel/Learn-more/Click-here; 0 "Learn more" occurrences anywhere.
5. Confirms, tooltips & errors — OBSERVED, N/A pattern (0 AlertDialog/Tooltip/confirm() in source — no destructive actions on this site). Contact-form error copy (app/actions/contact.ts:65,73): "Didn't send — your message is still here. Try again, or email me directly." — names the way back, matches DIRECTION.md's own calibration example verbatim (curly apostrophe present).
6. Proof provenance — PASS. 0 `UNVERIFIED-PROOF` hits root-wide. Deployment mode: production (BRIEF.md:2) — staging/demo exemption does not apply, correctly unused. 11 `<figcaption>` hits inspected: all source-artifact attributions (design/MOCKUPS.md excerpt, tools/demo.py output) — zero third-party names, zero testimonial/review/press components. BRIEF.md's proof inventory remains recorded EMPTY ("no third-party testimonials/press/logos exist"); nothing invented.
7. Heading hygiene — PASS. Exactly 1 H1 per route ×5 (curl-extracted), 0 generic headings, 0 empty headings.
8. Heading narrative — JUDGMENT → Lead. Outlines verbatim:
   - / : H1 "One operator.Four worlds" → H2 wire → H2 ultraweb → H2 hardmode → H2 gtheme → H2 world 00 → H2 "The code is theirs. The standard is mine."
   - /work/ultraweb: H1 → "Why it exists" (3×H3) → "How it works" (3×H3)
   - /work/hardmode: H1 "Advice loses to momentum" → "The enemies" (4×H3) → "The floor" (4×H3, now incl. "The twelve, by name" / "The four, with no loyalty")
   - /impressum: H1 → Diensteanbieter → Kontakt → Verbraucherstreitbeilegung → Hinweis
   - /datenschutz: H1 → Verantwortlicher → Hosting und Server-Logs → Kontaktaufnahme → **Empfänger und Drittlandtransfer** (new this iteration) → Live-Daten von GitHub → Lokale Speicherung → Ihre Rechte
9. Links resolve — PASS-ON-MEASURED (1 external cluster UNVERIFIED, not FAIL). Internal: 6/6 same-origin routes 200 (/, /work/ultraweb, /work/hardmode, /impressum, /datenschutz, /manifest.webmanifest); 0 dead `#`/empty hrefs; 0 empty link texts. 11 anchor fragments checked against their TARGET page's ids — 11/11 resolve (impressum: anbieter/kontakt/vsbg/hinweis; datenschutz: verantwortlicher/hosting/kontakt/empfaenger/github/speicherung/rechte; home: worlds/operator/contact/main). `mailto:iwan.braun2004@gmail.com` — real address, not example.com/555. 404 spot-check: /__gate-content-404 → 404, own designed title "No such world · Iwan Braun" (not the default site title — I19 confirmed fixed). Externals: github.com/blyatiful1/portfolio 200, github.com/blyatiful1/ultraweb 200, ultraweb-site.vercel.app 200 — 3/8 confirmed green. github.com/blyatiful1 (profile), /gtheme, /gtheme/actions, /hardmode, /hardmode/actions — 403 on every attempt (3 retries, GET+HEAD, with/without UA) — logged UNVERIFIED, not assumed dead: sibling repo URLs on the same host resolve 200, so this reads as GitHub-side path-specific bot mitigation through this session's proxy rather than a broken link (session facts named only api.github.com as policy-blocked; this is a broader, inconsistent 403 worth a clean re-check from an unrestricted network).
10-11. Price-history disclosure/scoping — N/A. 0 `line-through`/`<del`/`compareAt`/`statt `/`reduziert` hits anywhere — no priced/discounted surface exists on this portfolio (BRIEF §Backend: rejected — payments/cart/storage). Logged N/A, not skipped.
12. Voice consistency — JUDGMENT → Lead. ≥5 user-facing sections present (hero, wire, 4 world chapters, operator, footer, contact form, error.tsx, not-found.tsx). Quoted strings: hero H1 "One operator. Four worlds."; operator "what I bring / what I don't claim … client references — every world here is my own"; footer zero-state "The commits are not mine. That is the point."; error.tsx "Something broke. Honestly."; contact-form error "Didn't send — your message is still here. Try again, or email me directly." (near-verbatim match to DIRECTION.md's calibration example). Legal pages in Sie-register German, structurally distinct by design (BRIEF-recorded). Against DIRECTION.md tone words (precise/obsessive/wry, Formal↔Casual 3, Reserved↔Bold 4): sampled strings land within stated register — Lead's ruling owed on the full set.

Content-fix verification (this iteration's stated changes, all confirmed live at prodUrl):
- I10/I17 verification command: operator block shows `git log --no-merges -i --grep='co-authored-by: claude' --oneline | wc -l` with per-repo subtotals "ultraweb 60/62 · hardmode 42/42 · gtheme 124/124 · this site 27/27" (253/255 aggregate), relabeled "commits carry an agent co-author trailer … a trailer the tooling writes: it names the tool, not the difficulty."
- Operator block additions (I32/I04/I16): "based in Bochum, NRW · remote / hybrid", "shipping since Dec 2021 — the GitHub account's own date", honest-gap line "client references — every world here is my own" — all present.
- hardmode hooks/agents tables (I25) at v3.1.0 facts: 12 named hooks (destructive-guard … ledger-summary) + 4 named agents (verifier / plan-critic / oracle / scout) rendered as tables (aria-label "The twelve hooks" / "The four agents"); stat line "Python · 12 hooks · 4 agents · v3.1.0" + "10/10 demo scenarios blocked — proven in CI" match v3.1.0. ultraweb page: "4 model-routed subagents" (was 3).
- Datenschutz Empfänger block (I21): new H2 "Empfänger und Drittlandtransfer" names Vercel Inc. (USA), Resend Inc. (USA), Google (Irland/USA) with DPF/SCC transfer basis (Art. 45/46 DSGVO) and the hoster's own log-retention wording ("tarifabhängig Stunden bis wenige Tage").
- 404 title (I19): served title = "No such world · Iwan Braun". Footer stat correctly falls back to the zero-state string ("The commits are not mine. That is the point.") instead of a stale numeric figure (I06 resolved as a side effect of the same fix).
- Accessible link labels (I39): world-chapter CTAs render visible label + `sr-only` destination ("Enter world 01" + " — ultraweb case study"), arrow glyph `aria-hidden`; case-study repo links read "ultraweb repo on GitHub" / "hardmode repo on GitHub" (was bare "repo ↗"). Corroborated by the Lead's browser-based links-collect at qa/gate-lead-round6.json (accessible text field, e.g. "Enter world 01 — ultraweb case study →").
- I26 (beyond stated scope, found in passing): gtheme's "2,610 tests · CI green" and hardmode's proof line are now both linked to their GitHub Actions runs.

fixed: none this round — runner measures and reports only, no source touched.
residual: 1 external-link cluster UNVERIFIED (github.com/blyatiful1 profile + /gtheme + /gtheme/actions + /hardmode + /hardmode/actions) — needs a clean re-check from an unrestricted network; not treated as a content defect.
judgment-open: 3 (OG card legibility), 8 (heading narrative × 5 routes), 12 (voice consistency) — evidence above, Lead rules.
unverified: external link cluster above — 403 through this session's proxy on every attempt (GET+HEAD, with/without UA), while sibling repo URLs on the same host resolve 200. No browser-rendered measurement was blocked this round: checks 5, 10, 11 are N/A by absence of the pattern in source, not by missing Playwright.

## gate-accessibility — UNVERIFIED (2026-09-07): re-gate after panel findings I02, I18, I19, I20, I39, I40, I41, I07

NO BROWSER — Playwright MCP not available this dispatch; zero routes verified directly by the runner. Everything below marked "Lead-measured" comes from /home/user/portfolio/qa/gate-lead-round6.json (axe wcag2a+2aa+22aa, contrast-matrix, landmarks-headings, forms-a11y, alt-and-labels, targets@375, links-collect — both themes, 375+1440 where applicable, all 6 routes) plus a Lead behavior script; cited as evidence only, never asserted PASS by the runner. Everything else below was verified directly by the runner via curl/grep against prodUrl and source.

routes: / /work/ultraweb /work/hardmode /impressum /datenschutz /this-world-does-not-exist · themes: light+dark · viewports: 375/768/1440

### Per-item re-gate findings (panel-findings.md)

- **I02 (contrast — dt labels)** — RESOLVED, code + Lead-measured. `opacity-60` removed from operator.tsx and world-chapter.tsx dt labels (grep: 0 hits, only defect-comment remains); dt now `text-muted-foreground`, dd `text-foreground` — a verified pair per SYSTEM.md §Amendments 2026-09-07. Lead's contrast-matrix: 2476 pairs checked across 24 views, exactly 1 failing pair per view everywhere — always the same node (footer IWAN·BRAUN watermark, ratio 1.34, aria-hidden decorative logotype, the one documented exception, unwidened). Lead's axe: 1 violation (color-contrast, same watermark node) on all 24 views, 0 elsewhere.
- **I18 (wire pause control, WCAG 2.2.2)** — RESOLVED, code-confirmed + Lead behavior-script-confirmed. `components/wire/wire-pause.tsx`: visible `<button aria-pressed={paused}>` with sr-only " the live feed" suffix. `components/wire/status.ts`: localStorage-persisted pause state. `components/wire/wire-live.tsx`: paused → no `EventSource` opened at all, `aria-live="off"`; unpaused → live, `aria-live="polite"`; cleanup always `es.close()`. Lead behavior script independently verified aria-live toggles off when paused and the choice persists.
- **I19 (404 title, WCAG 2.4.2)** — RESOLVED, curl-confirmed. `curl .../this-world-does-not-exist` → `<title>No such world · Iwan Braun</title>`, HTTP 404. `app/not-found.tsx` main carries `id="main" tabIndex={-1}` matching the skip-link target and FocusOnNavigate's convention. Lead behavior script confirmed the focus target independently.
- **I20 (contact form success/error focus)** — RESOLVED, code-confirmed + Lead behavior-script-confirmed. `contact-form.tsx`: `statusRef`/`alertRef` + `useEffect` calling `.focus()` into `role="status" tabIndex={-1}` nodes on both the success and error branches.
- **I39 (link text out of context)** — RESOLVED, code + Lead links-collect-confirmed. World-chapter CTAs and case-study closer links carry an `aria-hidden="true"` arrow span plus either an inline destination name or a `.sr-only` " — {destination}" suffix (world-chapter.tsx:107-109; work/ultraweb/page.tsx:228-236; work/hardmode/page.tsx:293-299). Lead's links-collect sample (home-dark-1440) shows destination-bearing text throughout ("Enter world 01 — ultraweb case study →", "ultraweb on GitHub ↗", etc).
- **I40 (chip/badge meaning only in title=)** — RESOLVED, code-confirmed. `live-chip.tsx`: visible token aria-hidden, `.sr-only` span states "Wire status: live — receiving events from GitHub in real time" / "Wire status: idle"; `title=` kept only as a hover extra. `wire-live.tsx:66-69`: same pattern for the AI/HUM badge.
- **I41 (aria-label on `<p>`)** — RESOLVED, code-confirmed sitewide. `grep -rn "<p...aria-label"` (multiline) across `components/` and `app/` → 0 hits. hero.tsx and operator.tsx both wrap the visible digits in an aria-hidden span with a sibling `.sr-only` sentence inside the same `<p>`.
- **I07 (native validation bubble)** — RESOLVED, code-confirmed. `contact-form.tsx:129`: `noValidate` present on the `<form>`; inputs keep `required`/`type="email"` for AT semantics and mobile keyboards.

### Full checklist (items 1–10)

1. **Contrast** — Lead-measured: 0 failing pairs beyond the documented watermark exception, both themes, 375/1440, all 6 routes (2476 pairs). Focus-ring contrast sampling not in the JSON — unverified.
2. **Keyboard** — UNVERIFIED, no data. `gate-lead-round6.json` carries no `keyboard-walk` key at all — the full tab-order/focus-ring/Escape/modal-trap walk was not run this round. Lead's separate behavior script covered only the wire-pause and contact-form focus moments (folded into I18/I20 above), not a full walk. Anti-pattern sweeps clean: `focus:outline-none`/`focus:outline-hidden` 0 hits; `tabindex="[1-9]`/`tabIndex={[1-9]` 0 hits.
3. **Landmarks & structure** — Lead-measured: `issues: []` on all 6 routes × both themes (12 views, 1440 only in the JSON). curl-derived raw-HTML counts corroborate on 4 routes (1 main/1 h1 each); `/work/ultraweb` and `/work/hardmode` show 2× `<main` in raw SSR text, traced to a Next.js Suspense streaming shell (`<main aria-busy>` placeholder + real `<main id="main">` inside a hidden template, per SITEMAP.md's `/work/*` loading.tsx) — not a real duplicate landmark; Lead's post-hydration measurement already confirms `issues: []` there.
4. **Alt & names** — Lead-measured: `issues: []` on all 6 routes × both themes.
5. **Reduced motion** — No persistent WebGL/canvas scene in this build's DIRECTION.md scope ("no set-design, no showpiece"), so the scene-specific sweep doesn't apply. `grep "prefers-reduced-motion" app/globals.css` → 6 rule blocks: reduce-branch drops `.reveal` transitions and the `world-enter` scroll-timeline animation; no-preference branch gates all entrance motion — matches SYSTEM.md §motion's two-layer policy. Actual re-shot capture under emulation is unverified (no browser).
6. **Targets & obscuring** — Lead-measured @375 only (spec calls for 1440 too — gap): only real undersized targets are the case-study "next" closer links (repo/site/next-world, 3 per route) at h=21px < 24px, both themes, `/work/ultraweb` and `/work/hardmode`. Code-confirmed independent of the browser: those anchors use only `.nav-link` (globals.css:380-399, zero padding) + `text-sm font-mono` (20px line-height), no `py-*` — height is pure line-height and is not viewport-dependent, so the same fail applies at 1440. These are standalone links in a flex-wrap row, not inline prose, so WCAG 2.5.8's "Inline" exception plausibly does not apply. Everything else clean (only the pre-focus 1×1 skip link flagged elsewhere, expected). Obscuring/drag: no `inViewport:false` data this round; `onDragStart`/`draggable=`/`useDrag`/`PointerSensor` — 0 hits, no drag interactions to gate.
7. **Forms** — Lead-measured (home only, both themes): all 4 fields labelled with matching `autocomplete`; 3 open issues — `required-unmarked` on name/email/message (the HTML `required` attribute is present but nothing visible marks the field as required to sighted users). Not one of this round's named panel items — flagged for the Lead, unverified by the runner. curl-confirmed: labels present with matching `for`/`id`; `noValidate` present (I07); focus management on submit confirmed (I20).
8. **Text spacing (1.4.12)** — Lead-measured: `overflowX: false` on all 36 views (375/768/1440 × both themes × 6 routes). The per-element `clipped[]` list wasn't in the summarized JSON, so visual truncation inside fixed-height containers is unverified.
9. **Statement scoping (DE)** — evidence only, Lead rules. market: DE. BRIEF.md §Compliance facts verbatim: "Seat: Germany (assumed from user context). Individual, no employees, no online contract conclusion, nothing sold." SITEMAP.md: "No /barrierefreiheit: BFSG out of scope — no consumer contracts concluded online, individual with 0 employees (microenterprise)." curl: `/impressum` 200, `/datenschutz` 200, `/barrierefreiheit` 404 (not built). Footer legal group: Impressum, Datenschutz only, no barrierefreiheit link, no statement page, no conformance sentence to quote. Re-derived against the finished build (not just the brief): (a) DE → BFSG is the applicable statute in principle; (b) service scope — the site takes no individual consumer request toward concluding a consumer contract (contact form is a lead-gen email, not a contract-conclusion flow) → falls outside § 1 Abs. 3 Nr. 5 BFSG; (c) microenterprise (0 employees) → independently exempt under § 3 Abs. 3 BFSG. Both (b) and (c) say OUT — the prior "recorded OUT" determination still holds on the current build; no statement is owed and none is emitted.
10. **axe sweep** — Lead-measured: 1 violation per view (color-contrast, the footer watermark, `source: "path"`) on all 24 views, 0 elsewhere.

exception: footer aria-hidden "IWAN·BRAUN" watermark (WCAG 1.4.3 decorative/logotype) — the one documented exception, unwidened; confirmed as the sole failing node in every contrast and axe view this round.

verdict: UNVERIFIED (no browser this dispatch). Code-checkable evidence for all 8 named panel items (I02, I18, I19, I20, I39, I40, I41, I07) shows each is resolved in the served markup/source. Outstanding for a browser-equipped re-run: full keyboard walk (item 2, no Lead data at all), focus-ring contrast sampling, 1.4.12 per-element clip list, reduced-motion re-shot capture, targets @1440, and the 3× `required-unmarked` forms-a11y issues (not a named panel item, flagged for the Lead).

log: qa/gate-accessibility.log (70 lines)


## gate-performance — FAIL (2026-09-07)
Runner: gate-runner (Sonnet), plugin /home/user/ultraweb v1.9.0 checkout. NO BROWSER — Playwright MCP not registered this dispatch; zero routes verified live. Lighthouse for /, /work/ultraweb, /work/hardmode is Lead-measured (design/lh/*-iter-2026-09-07.json, sequential mobile run on a quiet machine) — cited as evidence, not asserted by the runner. /impressum and /datenschutz had no prior Lighthouse data, so the runner ran Lighthouse 12 itself (one run each, CHROME_PATH sandbox chromium, sequential, nothing else loading :3100) and asserts those two directly.

**Lighthouse mobile (perf score / LCP / CLS / TBT):**
- / — 92 · 3.0s · 0.00 · 170ms (Lead-measured)
- /work/ultraweb — 94 · 2.9s · 0.00 · 90ms (Lead-measured)
- /work/hardmode — 97 · 2.6s · 0.00 · 40ms (Lead-measured)
- /impressum — 100 · 1.8s · 0.00 · 50ms (runner-measured, qa/lh-impressum.report.json)
- /datenschutz — 99 · 1.9s · 0.00 · 60ms (runner-measured, qa/lh-datenschutz.report.json)
All ≥90. LCP target is 2.5s: home/ultraweb/hardmode still miss it (2.6–3.0s) — the previously recorded "~2.9s, bandwidth-bound" residual stands, unresolved this iteration. LCP elements: / → H1 text "One operator. Four worlds" (next/font, display:"optional", no swap flash — correctly built); /work/ultraweb → body text; /work/hardmode → body text. No image-LCP route. `priority` prop: 0 hits on any `<Image>` (the 3 hits in app/sitemap.ts are XML `priority`, unrelated). `loading="lazy"` on an LCP node: 0 hits.

**Cold-load JS — FAIL, all 5 routes over budget.** No Playwright, so the official network-idle `cold-load-js.mjs` did not run; substitute per Lead instruction: curl each route's HTML for `<script src="/_next/static/...">` tags, GET each with `Accept-Encoding: gzip`, sum real wire bytes (cross-checked against Lighthouse's independent total-byte-weight — consistent). Budget 140kB (marketing):
/ 278kB (12 scripts) · /work/ultraweb 196kB (12) · /work/hardmode 191kB (11) · /impressum 190kB (10) · /datenschutz 190kB (10, same set as impressum). Previous recorded residual was ~160kB — every route is now further over budget than that residual, not just holding it. One chunk on `/` (`3zp4nlwtwf18z.js`, 89kB gzip) bundles `components/motion/reveal.tsx` together with 6 `zod` string hits — a server-validation library apparently reachable from a client chunk; worth the Lead's attribution pass (explicitly out of scope for this gate to fix). Script set not diffed across two runs (single pass only, time-boxed).

**Client bundle — FAIL.** 14 `"use client"` files in app/+components (excluding the `(studio)` route group, which 404s in this prod build and ships nothing to visitors) vs SITEMAP.md Part 3's ≤9-file budget. Plan-named leaves present: providers.tsx, focus-on-navigate.tsx, mobile-menu.tsx (≈ plan's nav-menu.tsx), reveal.tsx, wire-live.tsx, live-chip.tsx, contact-form.tsx. Not in the plan: app/(site)/error.tsx (Next.js requires error boundaries to be Client Components — likely a legitimate exception), components/layout/header.tsx, components/layout/theme-toggle.tsx, components/craft/console-signature.tsx, components/data/time-ago.tsx, components/motion/world-tuner.tsx, components/wire/wire-pause.tsx (the last is the WCAG 2.2.2 pause control shipped this iteration — plausibly justified, just never added to the table). No `motion/react` import anywhere (`git log` shows the `motion` dependency was removed in commit 2496236, "subtractive reveals" — confirmed absent from package.json and source); no LazyMotion requirement applies. `lucide-react` star imports: 0. Raw `<img>`: 0 outside `(studio)`.

**Fonts — FAIL on family count, by design tension.** lib/fonts.ts:5-27 — 3 next/font families (Space Grotesk sans, Fraunces displayUw, IBM Plex Mono mono), all variable, all self-hosted under `/_next/`, zero requests to fonts.googleapis.com/gstatic.com (grep: 0 hits). Gate budget is ≤2; DIRECTION.md's "Type stance" explicitly commissions all 3 by name for the anthology's per-world type gesture. `display:"optional"` on the LCP-critical sans face, `preload:false` on the other two (correctly deprioritized, per the file's own comments) — this is the right implementation of an over-budget decision, not a sloppy one. Lead ruling needed on whether the 3-family commission stands against this gate's default.

**Zero CLS** — 0.00 (rounds down from 0.0003–0.0004) all 5 routes, both Lead- and runner-measured.

**Second engine / renderer** — none. `animejs`/`three`/`@react-three` — 0 hits in source or package.json; DIRECTION.md §We-will-NOT bars both explicitly. No commissioned scene, so the standard (not scene) budgets apply everywhere.

**Dependencies** — confirmed via `git diff HEAD -- package.json` (empty) and `git status --porcelain` (package.json not listed): no runtime dependency added, devDependencies unchanged, this iteration.

**Judgment-open (check 10):** one scroll listener — components/layout/header.tsx:43, `addEventListener("scroll", onScroll, {passive:true})` for hide-on-scroll header chrome; no DIRECTION.md line commissions it by name. `next/dynamic`: 0 real hits (1 hit is a code comment). Lead to rule whether the listener needs JS or is CSS-answerable.

**Unverified (browser-dependent, no Playwright):** true network-idle cold-load JS resource timing · font-requests.mjs (face error-state via document.fonts) · browser_network_requests transfer-weight sum (Lighthouse total-byte-weight stands in: 368/376/331/337/339 KiB, all comfortably under the ~1.5MB budget) · layout-shift-elements detail (moot — CLS already ~0).

failed: check1 (cold-load JS, all routes) · check5 (client bundle, 14 vs ≤9) · check6 (font families, 3 vs ≤2, DIRECTION-commissioned)
judgment-open: check10 (1 scroll listener, header.tsx:43)
qa: full log at qa/gate-performance.log

## iterate — Lead rulings on the gate-runner returns (2026-09-07)
Six gate-runner dispatches (Sonnet, one per gate, in parallel — none touches the browser; their entries are appended above verbatim). Every `judgment-open` marked `rules: Lead` is ruled here; every browser half the runners marked UNVERIFIED is ruled from the Lead's library run of the plugin's own `scripts/measure/*.mjs` (qa/gate-lead-round6.json on the pre-fix build, qa/gate-lead-round7.json on the final build of record 10:42Z) — a library run, never an MCP run, recorded as such.
- **gate-code 7 (shadcn "unused") — REFUTED.** `app/globals.css:3` is `@import "shadcn/tailwind.css"` (the radix-nova preset); the 2026-09-01 entry and CONTEXT-HANDOFF §2 record that uninstalling it broke the build. The runner's grep missed a CSS import. Stays.
- **gate-code 9a (one `!important`) — PASS with exception.** `[hidden]{display:none!important}` is Tailwind v4's preflight, 0 hits in project source.
- **gate-code 9b (`--radius` unreferenced) — FIXED.** Declared once, referenced nowhere (0 `var(--radius)` in the built CSS; the shadcn CLI touches it only at scaffold time). Removed; token-contract PASS.
- **gate-code 10/11 — PASS.** No second engine; 17 emitted font-sizes = the 10-step scale + Tailwind utility spillover (within the check's tolerance clause). Check 5's note: 15 client leaves + wire-pause = 16, the budget the 2026-09-01 gate accepted (SITEMAP Part 3 re-based to say so).
- **gate-responsive 3 (targets) — FIXED / RULED.** Case-study closer links were 21px → `inline-block py-2` (37px; round-7 targets@375: only the sr-only skip link listed, documented). Header anchors measure a 17px box at 1440 because the hit area is a `::before` (the footer links' device): `elementFromPoint` 7px above and below the box resolves to the link — effective 33px ≥ 24 (WCAG 2.5.8). Footer lists 42px effective, unchanged.
- **gate-responsive 1/2/4/5/6/7 — Lead-measured on the final build:** 36/36 frames · overflowX=false at all 36 · console clean except the 404 document's own line · mobile menu and one interaction per page exercised by the behavior script (pause, form, toggle, 404 focus) · 768 orphans ruled by the judge (round 6 → fixed → round 7). Check 8 → design-judge (below).
- **gate-antislop 3 — FIXED** (lucide Pause/Play; emoji-range grep 0 hits). **10 — FIXED** by design decision: the operator carries no entrance reveal (4 of 7 home sections; SYSTEM §motion amended). **13 rhythm — PASS** per the judge's round-6 sweep: four distinct section rhythms on home (hero pt-40/pb-16 · wire py-6 · chapters py-20/28 · operator py-28/40); legal routes one section with 41/58/41 block gaps.
- **gate-content 3 (OG headline) — PASS**, "One operator. Four worlds." 4 words, brand card unchanged. **8 (heading narratives) — PASS**: the new hardmode headings ("The twelve, by name", "The four, with no loyalty") and the Datenschutz "Empfänger und Drittlandtransfer" argue the conversion (technical depth for screeners; legal completeness). **12 (voice) — PASS**: all new copy written to DIRECTION §Voice (precise/obsessive/wry, ≤18 words, jargon-IN list). **Externals UNVERIFIED from the sandbox — RULED reachable:** github.com/blyatiful1{,/gtheme,/hardmode,/*/actions} return 403 here because the session's git proxy scopes github.com to the two configured repos; both repos were cloned through the anonymous git lane this session (hardmode HEAD 33942f1, gtheme HEAD 269e30b) and the same URLs returned 200 in the 2026-09-01 gate and to the panel's verifier.
- **gate-accessibility 6 — FIXED** (as responsive 3). **7 `required-unmarked` — FIXED**: each contact label renders "(required)"; round-7 forms-a11y: 0 issues both themes. **2 keyboard — Lead-measured (round 7):** skip link first, no trap, a visible ring on every stop — home 29 stops, /work/hardmode 22, 404 16. **1 contrast — Lead-measured**: only the documented watermark fails, both themes, 24 views. **5 reduced motion** — frames shot under emulated reduce; the subtractive reveal rule unchanged. **6 targets@1440** — ruled above. **8 text-spacing (1.4.12)** — Lead-measured on home, both case studies, datenschutz at 375/1440: overflowX=false everywhere; every clipped element is either sr-only (clipped by design) or a recorded Edge-Bleed container (`.world-surface` ghost numerals, the legal `§`, the footer watermark) — no text the layout cannot hold. **9 BFSG** — OUT, re-derived by the runner, unchanged. Documented exception unchanged: the aria-hidden footer watermark (WCAG 1.4.3 decorative/logotype).
- **gate-performance 1 (cold-load JS) — REGRESSION FOUND AND FIXED.** The runner's curl-summed 278kB on home was real: importing `CONTACT_LIMITS` from the zod schema module into the client form had pulled zod into the bundle. Split into `lib/schemas/contact-limits.ts`; the gate's own `cold-load-js.mjs` (library run, `waitUntil: load` — networkidle never fires here) now reads home 156kB · /work/ultraweb 158kB · /work/hardmode 152kB encoded — at the 2026-09-01 residual (~160kB vs the 140kB budget; Next 16 runtime + React baseline). Residual stands, unchanged.
- **gate-performance 5 (client leaves) — RULED** at the re-based budget (16), see gate-code 5. **6 (three families) — RULED commissioned:** DIRECTION "Type stance" names Space Grotesk + Fraunces + IBM Plex Mono for the anthology; SYSTEM §type records "2 families + 1 mono — at budget"; implementation is the deprioritized, self-hosted one the runner confirmed. **10 (one passive scroll listener, header hide-on-scroll) — PASS**, pre-existing, the panel's own verifier (I30) confirmed it as the implemented remedy. **LCP** 3.0/2.9/2.6 s simulated mobile vs 2.5 target — the recorded bandwidth-bound residual, unchanged; CLS 0 on every route including the one with the new figure; legal pages 100/99 (runner-measured).
- **Runtime evidence this iteration (Lead):** webhook replay → inserted 0 (purges gated), tampered/non-hex → 401, non-JSON signed body → 400; wire cursor clamp and 13th-connection 429; Vercel preview (share link) canonical on the production alias, og:image 200 image/png, security headers live, real numbers 258/260 with per-repo sub-totals, "shipping since Dec 2021" from the account's `created_at`; partial-outage build proves the honest degraded copy on hero, chapters, operator and footer.

## iterate — panel rulings (2026-09-07) — judgment calls, refuted items, owner-input items
Source: qa/panel-findings.md. Every confirmed item is either FIXED in this iteration (see the iteration entry above and the gate entries below) or BLOCKED ON OWNER INPUT; the panel's judgment calls are ruled here, one line each, so no item is left unruled.
- I09 (no plain-language offer near the top) — RULED: keep the metaphor-first hero. DIRECTION §Voice codifies it; the eyebrow, the header CTA and the first chapter's plain description carry the 60-second scan the BRIEF asks for. Revisit only if a recruiter-persona re-review still fails the scan.
- I12 (AI-authorship framing without an accountability counterweight) — RULED: the operator paragraph already owns problem choice, standard and rejection; the stat is now labelled as what it counts (I17), with the limitation sentence. No further hedge — the BRIEF's load-bearing stance is "stated bold and true, never hedged".
- I13 (no conventional job title) — RULED: keep "agent infrastructure"; JSON-LD carries `jobTitle` for machines; a CV page (I01, owner input) is the right home for conventional titles, not the hero.
- I35 (personal Gmail / handle as contact) — RULED: owner decision (address recorded as client-confirmed in QA.md §round 5); a domain mailbox waits on the domain purchase.
- I38 (German-only legal pages) — RULED: keep; `lang="de"` on both `<main>`s is the correct part-language handling; an English courtesy summary is a nicety the owner may commission.
- I48 (case-study argument prose at caption size) — APPLIED: raised to `text-base` (SYSTEM §type amendment); numerals unchanged.
- I49 (wire rows are engineering shorthand) — RULED: keep the raw log conceit (DIRECTION §Voice, jargon IN list).
- I50 (nothing demoable in place) — RULED: the page IS world 01's demo; no embedded product demo commissioned.
- I51 (no Rechtsform / USt-IdNr) — RULED: legally complete for a natural person (§ 5 DDG Nr. 1 / Nr. 6 "soweit vorhanden"); nothing to invent.
- I52 (no language-skills line) — BLOCKED ON OWNER (proficiency levels are facts only the owner can state); slot is the operator `<dl>`.
- I53 (the R1 rejection excerpt is the strongest evidence and sits on a subpage) — RULED: keep on /work/ultraweb; the raw-markdown rendering is the "ledger verbatim" device.
- I55 (robots.txt blocks AI-training crawlers) — RULED: keep the UrhG §44b reservation (SEO.md); answer-engine fetchers stay allowed, confirmed by the verifier.
- I60 ("as it happens" over day-old content) — APPLIED the verifier's sharper half: world 00's copy no longer claims events are "seconds old"; it describes the mechanism ("delivered by webhook the moment it is pushed"). Wire header unchanged.
- I62 (Impressum "nichts verkauft" under a Work-with-me CTA) — RULED: accurate as scoped ("über diese Website verkauft"); keep.
- I65 (no phone number) — RULED: § 5 DDG satisfied by email + a second rapid channel + the form; no phone.
- Refuted by the verifier, no action: I27 (footer watermark — documented exception stands), I30 (hide-on-scroll header is the implemented remedy), I37 (root `lang=en` + part `lang=de` is correct), I47 (hardmode light link is bronze hue 87, not rust 45), I56 (honeypot is sr-only + aria-hidden + tabindex −1), I57 (the live square IS the period).
- Optional/nit items, ruled: I36 (mailto obfuscation) — NOT applied; the owner chose to publish the address and obfuscation would cost no-JS visitors the link. I42 — applied via I40 (sr-only state text on the chip). I61 — applied (`text-foreground/70`).
- BLOCKED ON OWNER INPUT (facts the studio must not invent; each has its slot ready): I01 CV page + PDF (route `/cv`, nav entry in header/mobile menu/footer, link beside the mailto and in the operator block), I11 LinkedIn/Xing URL (footer CONNECT column + JSON-LD `sameAs`), I05 availability/start/overlap rows (operator `<dl>`), I15 rate band (operator `<dl>`), I28 portrait (operator right column at md, `next/image`, monochrome treatment per SYSTEM), I52 language line, I33 booking URL (`NEXT_PUBLIC_BOOKING_URL` — the link renders the moment it is set).
- Production-side follow-ups the code now supports but only the owner can complete: set `NEXT_PUBLIC_SITE_URL` (or rely on `VERCEL_PROJECT_PRODUCTION_URL`, now preferred) and redeploy so canonicals/og:image/sitemap leave the SSO-gated per-deployment host (I03); re-run gate-accessibility + gate-content against the deployed URL after that deploy (I08).

## gate-visual — round 6 (iterate re-gate, panel findings) — 2026-09-07 — FIX-THEN-SHIP → fixes applied → round 7
Shoot: Lead-run Playwright library (no pixel-qa MCP): 36 viewport frames (6 routes × dark/light × 375/768/1440, reduce emulated, scrolled bottom→top) + 14 crops — qa/visual/round-6/. Judge: design-judge (Opus), fresh context; full verdict qa/visual/round-6/VERDICT.md.
| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | 7 | 8 | 7 | 8 | 8 | 7 |
| work-ultraweb | 8 | 8 | 8 | 8 | 8 | 8 |
| work-hardmode | 8 | 8 | 8 | 8 | 8 | 8 |
| impressum | 8 | 7 | 7 | 7 | 7 | 6 |
| datenschutz | 8 | 7 | 7 | 7 | 7 | 6 |
| notfound | 8 | 8 | 7 | 7 | 7 | 8 |
Verdict verbatim: "FIX-THEN-SHIP. 34/36 cells clear the bar, banned sweep clean a second round." Movement vs round 5: home hier 8→7, uw type 9→8, both legal craft 7→6 — three of the four drops come from evidence round 5 never had (768 in light, legal at 768); one (uw type) is the cost of this round's timeline line. Banned sweep: antislop-12..17 all pass (the round's antislop rulings block draws on this); responsive-8: violations home@768 (hero stat hidden), impressum@768 and datenschutz@768 (rail orphans, § collision); passes elsewhere. The judge rated the hooks table "the round's best new instrument" and the ultraweb hero "the strongest hero in the build, and still is"; the documentary figure uses the §imagery exception "exactly as written".
Fixes applied (each traceable to the ranked list; SITEMAP/SYSTEM amended in the same change):
- d1 hero Framed-Data card re-composed at md (7/5 grid from 768, text-4xl until lg) instead of `hidden lg:block`
- d2+d3 legal Margin Note 3/9 held from lg only; ghost § smaller/lower in the md band — clears both craft 6s and both legal responsive-8 violations
- d4 timeline lines set as a second voice (sentence case, text-sm, ≤58ch, mt-4); hardmode version string "v3.1.0" in both places
- d5 verify command `break-normal whitespace-pre-wrap` — wraps at spaces only
- d6 chapter LiveLine on the world's muted token (no alpha)
- d7 error boundary re-composed left-aligned in the 404's grammar (bracket eyebrow, ghost "!!")
- d8 wire pause control: hairline border + hover border shift; wire header holds its phrase at 375 (`max-sm:basis-full`)
Judge's unverified list (chapter interiors, operator dl + card, footers, Empfänger block, hooks table narrow, lozenge 768) → shot as 48 home sectionals + 53 crops in round 7. Round-7 measurement pass on the fixed build (10:42Z): axe/contrast only the watermark · overflow none · forms 0 issues · keyboard clean · cold-load 156/158/152kB.

## gate-visual — round 7 (verification of the round-6 fixes) — 2026-09-07 — SHIP
Shoot: Lead-run Playwright library: 36 viewport frames + 48 home sectionals (one viewport height per step, both themes, three widths) + 53 crops covering every surface the round-6 judge listed as unverified — qa/visual/round-7/. Judge: design-judge (Opus), fresh context; full verdict qa/visual/round-7/VERDICT.md.
| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | 8 | 8 | 7 | 8 | 8 | 8 |
| work-ultraweb | 8 | 9 | 8 | 8 | 8 | 8 |
| work-hardmode | 8 | 8 | 8 | 8 | 8 | 8 |
| impressum | 8 | 8 | 7 | 7 | 8 | 8 |
| datenschutz | 8 | 8 | 7 | 7 | 8 | 8 |
| notfound | 8 | 8 | 7 | 7 | 8 | 8 |
Verdict verbatim: "SHIP. All 36 cells ≥7 for the first time; sweep clean three rounds running; every route passes responsive-8." Movement vs round 6: home hier +1 craft +1 ("Signature move finally photographed; it holds"), uw type +1 (back to round 5's 9 — "best typography in the build"), impressum type/dist +1 craft +2, datenschutz type/dist +1 craft +2, notfound dist +1 (the error boundary now matches it). Round-6 defect status: d2 d3 d4 d6 d7 d8a FIXED; d1 PARTIAL (fixed at 768, card still hidden below md — mitigated: the operator card is first in DOM on mobile); d5 PARTIAL (breaks at spaces at 1440, still split at hyphens below lg); d8b NOT FIXED (wire header still stranded the dash at 375). antislop-12..17 pass; responsive-8 pass on all six routes (home, impressum, datenschutz were violations in round 6). Judge's "movers I'd still make": the verify command's hyphen breaks, a scroll cue on the hardmode tables at 375, `md:self-start` on the operator card ("closes the build's largest void in one word").
**Post-verdict fixes (judge-named, applied, self-verified — the gate is closed at SHIP; these are the movers):** d1 verify command renders each token `whitespace-nowrap` — lines break only between flags, copy-paste unchanged · d2 "scroll sideways →" cue above both hardmode tables below sm · d3 operator stat card `md:self-start md:mt-2` — sits opposite the copy, the 768 void closes · d5 wire header breaks deliberately at 375 ("THE WIRE" / "ALL WORLDS, AS IT HAPPENS"), no stranded dash · d6 footer "ultraweb-site" in a nowrap span. Ruled, no action: d4 (hero card below md — the operator card is first in DOM on mobile, the number is never more than one section away), d7 (legal section nav after the document below lg — the r3 d5 decision: H1 leads on mobile), d8 (chapter commit rows truncate to one line — the r3 d2 `min-w-0 truncate` device; the full message is one click away on the wire).
Judge's unverified (reported, not guessed): app/(site)/error.tsx has no frame (needs a thrown error — judged from source); the 404 title (verified by curl in the Lead entry); footer@768 light; agents table in light.
Post-fix self-verification on the final build of record (11:03Z): overflowX=false on home and /work/hardmode at 375/768/1440 both themes (a first cut of the token-nowrap put the space INSIDE each span, removed every break opportunity and overflowed home at 375/768 — caught by the re-measure, fixed by moving the space outside) · axe beyond the watermark: none · targets: none under 24 · verify command: 0 tokens split across lines, 3 lines at 375/768, 2 at 1440 · wire header: 2 lines at 375 ("The wire" / "all worlds, as it happens"), 1 at 768/1440 · crops qa/visual/round-7/postfix-*.png. Gate-visual CLOSED at SHIP.
