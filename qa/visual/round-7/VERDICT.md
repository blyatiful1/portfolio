# design-judge — round 7 (verification re-gate) — 2026-09-07

Scored against `design/DIRECTION.md`, `design/SYSTEM.md` (including **Amendments — iteration 2026-09-07**, which now records the round-6 fixes and governs this round), `skills/taste/SKILL.md`, and `skills/award-canon/references/INVARIANTS.md` (invariants + jury weighting read verbatim, not paraphrased). Compared against `qa/visual/round-6/VERDICT.md`, which I wrote.

**Evidence read.** All **36 sweep frames** (6 routes × 2 themes × 3 widths) at full attention. **24 of the 48 home sectionals**, chosen so that every step of the home page is seen at 1440 in both themes, and every distinct surface (hero, wire, worlds 01/02/03/00, operator, footer) is seen at 375 and 768 in at least one theme and at 1440 in both. **28 of the 54 crops**, covering every crop family in both themes and at least two widths. Nothing exceeded 900px, so **nothing was unjudgeable for height**. Findings that pixels could not settle were root-caused in source and are cited `file:line`, and each such finding says so.

The round-6 report's central complaint — *"the signature move's own surfaces are unphotographed"* — is closed. All four world chapters are now on the record at three widths in both themes, and the operator block is fully photographed. Most of the score movement below comes from that, not from new code.

---

## Scores — round 7

| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | **8** | 8 | 7 | 8 | 8 | **8** |
| work-ultraweb | 8 | **9** | 8 | 8 | 8 | 8 |
| work-hardmode | 8 | 8 | 8 | 8 | 8 | 8 |
| impressum | 8 | **8** | 7 | 7 | **8** | **8** |
| datenschutz | 8 | **8** | 7 | 7 | **8** | **8** |
| notfound | 8 | 8 | 7 | 7 | **8** | 8 |

Movement vs round 6: home hier 7→8, home craft 7→8; uw type 8→9; impressum type 7→8, dist 7→8, craft 6→8; datenschutz the same three; notfound dist 7→8. **Nothing moved down.** Every one of the thirty-six cells is now ≥7.

### home — 8 / 8 / 7 / 8 / 8 / 8

**hier 8 (+1).** The round-6 blocker is dead. `home-dark-768.png` / `home-light-768.png` — the bracket-framed `253 / 255` now renders in the hero's right column at 768, at `text-4xl` with the `/ 255` denominator at `text-2xl`, the mono caption `COMMITS AI-AUTHORED, NOT MINE — THE POINT.` wrapping to two lines, and the live-green `● recomputed just now` beneath. The 7/5 grid is real at 768: H1 x=24–394, card x=485–744, corner ticks at both diagonals. The tablet hero is a composition, not a deletion.

At 375 the card is still `hidden` (`components/sections/hero.tsx:44` — `hidden … md:block`), so the mobile hero runs eyebrow → H1 → subhead → scroll hint → wire with no counterweight. That is a smaller charge than round 6's, and for a reason I can see in the frames rather than infer: `components/sections/operator.tsx:97` carries `max-md:order-first`, so on mobile the same number leads the operator section (`home-dark-375-s5.png` / `-s6.png` — the card sits directly under the `THE OPERATOR` eyebrow, above the h2). The proof is composed for mobile somewhere; it is just not in the first viewport. It stays as defect 4, not as a hierarchy penalty.

The chapters, seen for the first time, hold their own order at every width: bracket eyebrow + LiveLine on one baseline, display, 52ch copy, CTA, then the facts rail as an unmistakable second voice behind a hairline. First, second and third are never in doubt.

**type 8.** 96px display over 17px body = 5.6×. Four voices legible in one viewport, and the chapters add three more per-world display gestures that are genuinely different decisions, not font swaps: Fraunces italic terracotta (01), Plex Mono caps with negative word-spacing (02), Space Grotesk with a rounded pill (03), Space Grotesk with a two-tone foreground/muted split across four lines (00). Held at 8 by one thing: `crop-wire-dark-375.png` / `crop-wire-light-375.png` — the wire header still breaks as `THE WIRE — ALL` / `WORLDS, AS IT HAPPENS`, stranding the em dash at end-of-line and splitting the phrase. The `max-sm:basis-full` change did land — the `updated 4 d ago` + pause row now sits on its own line below the h2 instead of competing for the row — but the phrase is ~337px of tracked mono in ~317px of panel, so it still cannot fit. Structural fix, dimensional problem. Defect 5.

**space 7 (held).** The rhythm map is now visible rather than declared: hero `pt-40 pb-16` / `md:pt-48 md:pb-24`, wire `py-6`, chapters `min-h-svh` with `py-20 md:py-28` and `justify-center`, operator `py-28 md:py-40`, footer compressed. Four distinct values with real compression (the wire) and real release (the chapters, which are deliberately centred in a full viewport — the "chapter bottom air" round 6 priced in turns out to be symmetric top-and-bottom air, i.e. composed, and I withdraw that note).

Held at 7 for one region, and it is a bad one. `home-dark-768-s5.png` / `home-light-768-s5.png` — in the operator at 768 the entire right column, x≈430–744, is empty from y≈100 to y≈880: roughly 314 × 780px of plus-grid and nothing else. Meanwhile the left column is compressed hard enough that the h2 wraps to three lines and the body paragraph runs at ~44 real characters. The stat card that should counterweight it is `md:self-end`, so it drops to the bottom of the grid to pair with the form and leaves the top three-quarters of the section void. At 1440 the same void measures roughly 440 × 510px (`home-dark-1440-s5.png`). That is not whitespace as emphasis budget; the copy beside it is being squeezed at the same time. Defect 3.

**color 8.** Per-world one-accent holds across all four chapters in both themes, now verified rather than assumed. Light mode is a re-decision at every chapter, not an inversion: world 01 becomes warm cream ground with a darker terracotta italic; world 02 becomes ink-on-hazard-paper with the stripe reversed to dark on yellow (`home-light-1440-s2.png` — the build's best single re-decision); world 03 inverts to a dark blue-black chapter with a bright pill, preserving the anthology's one-odd-world asymmetry through the toggle exactly as SYSTEM §theme-worlds promises. The hero is `data-world-rest`, so `Work with me` is chrome-white at rest in both themes. The `LiveLine` alpha is gone — `components/sections/world-chapter.tsx:43,50` now takes `c.muted`, and the rendered `● PUSHED 5 D AGO` reads as a muted token in every chapter frame, with the green dot as the only chromatic event.

**dist 8.** One direction, one signature, executed past comfortable: four full-viewport worlds, each with its own ground, accent, display face and a ghost numeral at `clamp(10rem,32vw,30rem)` bleeding off the right edge. The plus-grid, the bracket frames and the rule-and-bracket motif carry through the hero, the operator card, the form and the footer. Not a second signature anywhere.

**craft 8 (+1).** The pause control is now a control: `crop-wire-dark-1440.png` / `-375.png` show a hairline-bordered `❚❚ PAUSE` box, visually separate from the `● updated 4 d ago` status text beside it. The `(required)` markers render on all three contact fields in mono caps parentheses. The footer differs correctly per route — home carries `253/255 commits: not mine. That is the point. · recomputed 2 min ago`, the 404 carries the sentence without the fraction (`crop-footer-notfound-dark-1440.png`), which is the right call for a page that must not fetch. The ghost wordmark bleeds off both edges under the hairline. Header and footer anchors carry `before:-inset-y-2` / `-inset-y-1.5` hit areas (`components/layout/header.tsx:65,75`, `footer.tsx:61`), clearing 24px on 12px and 14px text.

Two slips keep it off 9, both named below: the verify command's hyphen breaks (defect 1) and the footer's `ultraweb-` / `site` split at 768 (defect 6).

### work-ultraweb — 8 / 9 / 8 / 8 / 8 / 8

**type 9 (+1) — restored.** Round 6 dropped this from 9 solely because of the new timeline line. It is fixed and fixed well. `crop-uw-hero-timeline-dark-1440.png` / `-375.png`: *"First commit 16 July 2026; v1.9.0 on 2 September — seven weeks. On this site's build it binned two full mockup rounds and cut the motion library it had scaffolded."* — sentence case, Space Grotesk at `text-sm`, muted, three lines at ~56 characters, `mt-4` under the mono spec row. It reads as a second voice at a glance; the six-consecutive-lines-of-caps-mono slab is gone at 375 too. The hero remains the best typographic moment on the site — three lines with the middle one Fraunces italic in terracotta, intact at all three widths and both themes, and light mode darkens the terracotta rather than reusing the dark value.

**space 8 / color 8 / dist 8 / craft 8.** Four section rhythms. The documentary figure is now verified beyond dark@1440: `crop-uw-figure-dark-375/768.png` and `-light-375/768.png` all carry the hairline frame and the Fraunces-italic terracotta caption naming the file and the render width, and at 768 the mockup's own multi-coloured headline is legible enough to function as evidence rather than decoration. §imagery's documentary exception used exactly as written. The one thing I would still change is the 375 spec row splitting the link label as `ULTRAWEB REPO ON` / `GITHUB ↗`; it is not enough to move an axis.

### work-hardmode — 8 / 8 / 8 / 8 / 8 / 8

Both round-6 notes inside craft are closed. The timeline is the same corrected second voice, and the version string is now `V3.1.0` in the spec row and `v3.1.0` in the timeline in every frame — verified at 1440, 768 and 375, both themes. `ADVICE LOSES / TO MOMENTUM` in Plex Mono caps with `[word-spacing:-0.35ch]` still reads as a per-world display decision; the hazard stripe clears the glass header at all three widths; ink-on-hazard-paper is the build's second-best light re-decision.

The two identifier tables are now fully on the record. They are correctly built as scrollable regions — `app/(site)/work/hardmode/page.tsx:188–194` and `:222–228` carry `overflow-x-auto`, `role="region"`, `aria-label`, `tabIndex={0}`, a `focus-visible` ring and an `sr-only` caption, with `min-w-[40rem]` / `min-w-[44rem]`. That is better keyboard and AT craft than most award sites manage. The cost is visual: `crop-hm-hooks-table-dark-375.png` shows two of three columns, with row heights inflated by text the reader cannot see; `crop-hm-agents-table-dark-375.png` shows two and a half of four. There is no fade, no rule, no "scroll →" cue, so on mobile the page's two best instruments look like they have empty rows rather than hidden ones. Defect 2. Held inside craft 8 rather than under it, because the region is right and only its affordance is missing.

### impressum — 8 / 8 / 7 / 7 / 8 / 8

**craft 6 → 8.** All three round-6 slips are gone, and one of them was my error.
1. `impressum-dark-768.png` / `impressum-light-768.png` — the 3/9 split now holds only from `lg`. Below it the rail follows the prose as a full-width block, so `[ § ] WORLD 00 · LEGAL` sits on one line and `← ZURÜCK ZU DEN WELTEN` sits on one line. No orphaned separator glyph, no stranded `WELTEN`. Verified at 375 as well.
2. `impressum-light-1440.png` / `impressum-dark-1440.png` — the 3/9 rail is clean at 1440 in both themes, sticky at `top-24`, back-link and `Stand: September 2026` intact.
3. The block gaps I called a spacing slip (41/58/41px) are a coded 2+2 grouping: `LegalBlock`'s `tight` prop sets `mt-8` on *Kontakt* and *Hinweis* and `mt-12` on the others (`app/(legal)/impressum/page.tsx:23`), pairing identity blocks against disclaimer blocks. Measured 53/69/53px at 1440. That is a designed rhythm and I was wrong to price it. Withdrawn.

**type 8 (+1), dist 8 (+1).** With the rail holding at every width, the page's grammar finally reads as one gesture: 64px display over 17px body (3.8×), 11px mono caps labels each with a 2.5rem `after:` accent rule, a 36rem measure, and the ghost `§` bleeding off the right edge — the chapters' ghost-numeral move in legal dress. That is craft in the corners in the sense INVARIANTS 7 means it.

**space 7 / color 7 (held).** One section, one padding pair (`pt-36 pb-24`); the 2+2 grouping is a 16px difference, too subtle to count as a second rhythm value. Colour is chrome-only by design and nothing does real work beyond the `primary/50` hairlines. Both correct for the surface; neither earns an 8.

### datenschutz — 8 / 8 / 7 / 7 / 8 / 8

The same three fixes land identically, plus its own two.

**The ghost `§` collision is gone.** `app/(legal)/datenschutz/page.tsx:38` now carries `md:max-lg:top-40 md:max-lg:text-[9rem]`. In `datenschutz-dark-768.png` / `datenschutz-light-768.png` the glyph is a ~90px `§` sitting at y≈180–290 and bleeding off the right edge, while `Datenschutzerklärung` ends at x≈488, y≈168. Clear separation in both axes at the one width where they used to cross. At 1440 there is ~180px of clearance and at 375 about 12px — tight, but clear, and verified in all six frames.

**The Empfänger block is now on the record.** `crop-ds-empfaenger-dark/light-375/768/1440.png` — `EMPFÄNGER UND DRITTLANDTRANSFER` with the accent rule, then the named processors (Vercel, Resend, Google, GitHub), the EU-U.S. Data Privacy Framework basis (Art. 45) and the fallback to standard contractual clauses (Art. 46 Abs. 2 lit. c). It reads at all three widths in both themes, holds its 36rem measure, and the hosting paragraph's cross-reference now points at something real. Round 6's largest legal evidence gap is closed.

**craft 6 → 8, type 7 → 8, dist 7 → 8** on the same reasoning as impressum. The 7-entry rail nav renders cleanly at 1440 in both themes.

### notfound — 8 / 8 / 7 / 7 / 8 / 8

The page itself is unchanged and still correct at all six frames: left-aligned on the content grid, `[ ?? ] UNCHARTED`, `No such world` with the live-green square period, the bleeding ghost `??` at 5% clearing the H1 at 1440, 768 and 375, and `← BACK TO WORLD 00 — HOME`. Both themes are the same page.

**dist 7 → 8.** Round 6 held this at 7 because the 404's sibling error surface did not share its grammar. `app/(site)/error.tsx` is now rebuilt to match: `plus-grid relative flex min-h-svh flex-col justify-center`, content on `max-w-content`, a `[ !! ] FAULT ON THE WIRE` bracket eyebrow, a ghost `!!` at the same `clamp(10rem,32vw,30rem)` / `opacity-[0.05]` / `max-sm:top-[30%]` as the 404's `??`, an `h1` at `text-5xl display-features max-w-[13ch]`, and a solid `bg-primary` action with a `--ring` focus ring. **Judged from source only — no frame exists for it, because it needs a thrown error; I am saying so rather than scoring it as seen.** The centred island is gone and `text-center` now survives in exactly one place site-wide, the footer's ghost wordmark. One reservation I record without pricing: if `reset()` fails there is no secondary route home, where the 404 offers one.

**space 7 (held).** Still the emptiest page in the build — at 768 the content block occupies 245px of a 1024px viewport — and the recovery link, the page's only job, is still the smallest actionable element on it.

---

## Round-7 change verification — one line per round-6 defect

| # | Round-6 defect | Status | Evidence |
|---|---|---|---|
| 1 | Hero stat card hidden below `lg` | **PARTIAL** | FIXED at 768 (`home-dark-768.png`, `home-light-768.png` — 7/5 grid, `text-4xl` numeral). Still `hidden` below `md` (`hero.tsx:44`); mitigated on mobile by `operator.tsx:97` `max-md:order-first` |
| 2 | Ghost `§` collides with the DS H1 at 768 | **FIXED** | `datenschutz-dark-768.png`, `datenschutz-light-768.png` — `md:max-lg:top-40 md:max-lg:text-[9rem]`, clear in both axes |
| 3 | Legal 3/9 rail orphans two lines at 768 | **FIXED** | `impressum-dark-768.png`, `impressum-light-768.png`, `datenschutz-*-768.png`, both routes at 375 — split held from `lg`, rail follows the prose below it |
| 4 | Timeline line: 140-char uppercase mono, same voice as the spec row | **FIXED** | `crop-uw-hero-timeline-dark-1440/375.png`, `crop-hm-hero-timeline-dark-1440/375.png` — sentence case, `text-sm` body face, ≤58ch, `mt-4`. `v3.1.0` consistent in both hardmode places |
| 5 | Verify command `break-all` splits mid-token | **PARTIAL** | `break-normal whitespace-pre-wrap` landed (`operator.tsx:145`) and wraps at a space at 1440 in both themes (`crop-operator-card-dark/light-1440.png`). Below `lg` the hyphen is still a break opportunity: 768 gives `--` / `grep=` and `-` / `-oneline` (`home-dark-768-s6.png`, `crop-operator-card-dark-768.png`); 375 gives `'co-` / `authored-by:` (`crop-operator-card-dark-375.png`, `home-dark-375-s6.png`) |
| 6 | `opacity-70` on the chapter LiveLine | **FIXED** | `world-chapter.tsx:43,50` take `c.muted`; verified rendered in all four chapters, both themes, at 1440 |
| 7 | Error boundary not in the 404's grammar | **FIXED (source only)** | `app/(site)/error.tsx:13–37`. No frame exists — it needs a thrown error. Stated as source-only |
| 8a | Pause control reads as a status label | **FIXED** | `crop-wire-dark-1440.png`, `crop-wire-light-1440.png`, `crop-wire-*-375.png` — hairline-bordered box, `px-2`, distinct from the status text beside it |
| 8b | Wire header breaks after `ALL` at 375 | **NOT FIXED** | `crop-wire-dark-375.png`, `crop-wire-light-375.png` — still `THE WIRE — ALL` / `WORLDS, AS IT HAPPENS`. `max-sm:basis-full` moved the pause row to its own line but the phrase still exceeds the panel by ~20px |

Also verified this round, from the caller's "since round 6" list: the operator carries no `Reveal` wrapper (4 of 7 home sections reveal — `operator.tsx:26–31` is plain markup); the three contact fields all show `(REQUIRED)` in mono caps (`home-light-768-s5.png`, `home-light-375-s7.png`); case-study closer links are `inline-block py-2` (`work/ultraweb/page.tsx:230,233,236`, `work/hardmode/page.tsx:295,298` — ~33px on 11px mono); header and footer anchors carry `::before` hit areas (`header.tsx:65,75`, `footer.tsx:61`).

---

## Banned-list sweep — antislop screenshot checks 12–17

**antislop-12 — three identical icon-cards in a features row: PASS.** The only 3-ups remain the two case-study stat trios (`work/ultraweb/page.tsx:198`, `work/hardmode/page.tsx:255`) — `bracket-frame p-5`, a `text-5xl` numeral over a mono caps label, zero icons, no filled boxes, the content being the data itself. This is Framed Data, the pattern DIRECTION cites. The footer's three columns are a nav, verified in `crop-footer-home-dark-1440.png`. Newly relevant this round: the four world chapters could have been a card row and are not — each is a full-bleed section with its own ground, accent, display face and numeral, verified across `home-*-s1..s4` in both themes. The opposite of uniform cards.

**antislop-13 — wallpaper rhythm: PASS.** Now demonstrated in-frame rather than from source. Home carries hero 160/64px → wire 24px → chapters `min-h-svh` + 80/112px → operator 112/160px → footer, and the sectional sequence `home-dark-1440-s0..s7` shows the compression and release directly. Both case studies carry `py-8`, `py-14`, `py-16 md:py-24`, `py-20 md:py-28`. **Weakest case, named again:** both legal routes are a single `pt-36 pb-24` section whose internal grouping is a 16px difference. Still a pass; still the thinnest instance in the build.

**antislop-14 — all-centered symmetry: PASS.** Every judged route is left-aligned on the content grid at every width and theme. `text-center` now appears exactly once in the tree — the footer's ghost wordmark — since `error.tsx` was rebuilt. Deliberate asymmetries visible in-frame: the hero's 7/5 split with the framed stat as counterweight (1440 and 768), every chapter's 7/5 Lead split with the rail offset `md:mt-12` below the narrative top edge, four ghost numerals bleeding off the right edge, the 3/9 Margin Note on both legal routes at `lg`, world 03 inverting against the page in both themes, and the operator's `md:self-end` card against a top-aligned form.

**antislop-15 — dark-navy AI-startup template look: PASS.** Ground `oklch(0.14 0.01 280)` — near-black with a trace of violet, not navy. No glow, no gradient, no neon, no glassmorphism beyond the one SYSTEM-declared sticky header. Checked explicitly this round because world 03's light-mode inversion is a dark blue-black chapter with a bright blue pill (`home-light-1440-s3.png`, `home-light-768-s3.png`): it carries no glow, no gradient and no bloom, it is a per-world authored ground with a single flat accent, and it exists to preserve the anthology's asymmetry through the toggle. Not the template look.

**antislop-16 — untouched shadcn look: PASS.** Sharp radii (0.125–0.5rem), authored OKLCH palette with AA-verified pairs, Space Grotesk / Fraunces / IBM Plex Mono with no Inter anywhere, hairline rectangle inputs on `--input` with a world-tuned focus ring, zero resting shadows (elevation is +0.03 L per §depth). The two shadow tokens are scoped to transient overlays.

**antislop-17 — reflexive chat bubble; consent banner with Accept primary and Reject buried: PASS.** No chat widget of any kind in the tree. No consent banner, because the site sets no cookies — stated in the Datenschutz lede and now corroborated by the Empfänger block, which names every processor and its legal basis. The honest form of the pattern: no banner because no tracking.

**Other constitution tells, swept:** no gradient anywhere, no gradient headline text, no emoji in production copy (`❚❚`/`▶` are lucide vectors; `⟶ ← ↗ ○ ●` are typographic marks in a mono face), no dead startup copy, no `href="#"`, no lorem, no fabricated social proof (`253 / 255` renders from one server-side source with per-repo sub-totals and the verify command published beside it), no uniform `rounded-xl + shadow-lg`, no staggered-fade-on-everything (4 of 7 home sections reveal, under the 60% cap). **Clean, third round running.**

---

## gate-responsive check 8 — each route deliberate at 375 / 768 / 1440

- **home: PASS** (was VIOLATION @768). The hero composes as a 7/5 grid with the framed stat at 768, and as a single deliberate column at 375 with the same number leading the operator instead. Residual, not a violation: the wire header wrap at 375 (defect 5) and the operator's empty right column at 768 (defect 3).
- **work-ultraweb: PASS.** Hero re-flows 3 lines → 3 → 3 with the Fraunces italic line intact; the evidence panels move from edge-bleed at `lg` to in-container at `xl` and stack at 375; the figure renders framed and captioned at 375 and 768 in both themes.
- **work-hardmode: PASS**, with a named cost. Hazard stripe, H1, prose and failure-mode list all re-flow deliberately. The two identifier tables are correctly-built horizontally scrollable regions at 375 and 768 (`role`, `aria-label`, `tabIndex`, focus ring) rather than squeezed tables — but they carry no visible scroll cue, so at 375 the reader sees 2 of 3 and 2.5 of 4 columns with no sign there is more (defect 2).
- **impressum: PASS** (was VIOLATION @768). 3/9 from `lg`; below it the rail follows the prose, one line per element.
- **datenschutz: PASS** (was VIOLATION @768). Same rail fix, plus the `§` clamp.
- **notfound: PASS.** Left-aligned on the grid at all three widths, ghost `??` clears the H1 at each, single column at 375.

---

## Ranked defects

**1. The verify command still splits its flags below `lg` — at the hyphen instead of at the character.** `components/sections/operator.tsx:145` — `break-normal whitespace-pre-wrap`. That killed `break-all`'s anywhere-breaks and wraps correctly at a space at 1440 in both themes. But a hyphen is still a line-break opportunity, and the card is only ~247px wide at 768 and ~330px at 375, so the string breaks *inside* its flags: `home-dark-768-s6.png` renders `git log --no-merges -i --` / `grep='co-authored-by: claude' -` / `-oneline | wc -l`, and `crop-operator-card-dark-375.png` renders `--grep='co-` / `authored-by: claude'`. Selecting and copying still yields the correct string, so the harm is legibility rather than function — but this is the one string on the site whose entire purpose is to be read and re-run by a sceptic, on the page that asks to be checked. **Fix:** stop the hyphen from being a break opportunity — `hyphens: none` plus non-breaking hyphens in the rendered string, or wrap each flag in a `white-space: nowrap` span, or give the `<code>` its own `overflow-x: auto` scroll region the way the hardmode tables already do. Owner: **hidden-craft**.

**2. Both hardmode identifier tables lose half their columns at 375 with no visible scroll cue.** `app/(site)/work/hardmode/page.tsx:188–194` and `:222–228`. The regions are built right — `role="region"`, `aria-label`, `tabIndex={0}`, `focus-visible` ring, `sr-only` caption — so keyboard and AT users are served. Sighted mobile users are not told anything: `crop-hm-hooks-table-dark-375.png` shows `HOOK` and `EVENT` with `EXIT CODE MEANS` entirely off-screen, and the rows are visibly taller than their visible content because the hidden column is setting their height, which reads as broken spacing rather than as hidden data. `crop-hm-agents-table-dark-375.png` shows 2.5 of 4 columns. These are the best instruments on the site's most instrument-shaped page. **Fix:** a right-edge mask/fade on the scroll container plus a mono `scroll →` hint above it at `max-md`, or stack each row as a definition list below `md`. Owner: **data-display**.

**3. The operator's right column is empty for ~780px at 768 while its left column is compressed.** `components/sections/operator.tsx:31` (`md:grid-cols-[7fr_5fr]`) with `:97` (`md:self-end`). `home-dark-768-s5.png` / `home-light-768-s5.png` — from the section top to y≈880, x≈430–744 holds nothing but plus-grid, while the h2 wraps to three lines and the body paragraph runs at ~44 real characters in the 7fr column. At 1440 the same void measures roughly 440 × 510px (`home-dark-1440-s5.png`). Whitespace is emphasis budget only when the thing beside it is not being squeezed to pay for it. **Fix:** either let the card start at the grid top at `md` (`md:self-start`) so the copy and the proof read as one spread, or let the copy span both columns above a full-width form/card row at `md`. Owner: **layout-grid**.

**4. The hero's Framed-Data counterweight is still absent below `md`.** `components/sections/hero.tsx:44` — `hidden h-fit min-w-0 p-6 md:block lg:p-7`. At 375 the first viewport carries the claim in words but not as the number, and the number is the brief. Mitigated, and visibly so, by `operator.tsx:97`'s `max-md:order-first`, which makes the same card the first thing in the operator section on mobile (`home-dark-375-s5/s6.png`) — a real composition, just 6 screens later. **Fix:** render the card at every width, stacked under the scroll hint at `max-md` with the numeral at `text-4xl`; Framed Data survives being stacked. Owner: **gate-responsive**.

**5. The wire header still strands the em dash at 375.** `crop-wire-dark-375.png`, `crop-wire-light-375.png` — `THE WIRE — ALL` / `WORLDS, AS IT HAPPENS`. `max-sm:basis-full` did what it says (the pause row dropped to its own line) but the phrase is ~337px of 11px mono at +0.08em tracking in ~317px of panel, so it still cannot fit and still breaks in the wrong place. A line ending on an em dash and a phrase split across `ALL` / `WORLDS` are both typographic errors, not wraps. **Fix:** shorten the string below `sm` (`THE WIRE — ALL WORLDS`), or drop tracking to +0.04em at `max-sm`, or force the break after `THE WIRE` so the em dash leads the second line. Owner: **typography**.

**6. The footer splits a product name at 768.** `components/layout/footer.tsx:21` — `built by world 01 — ultraweb-site` renders as `built by world 01 — ultraweb-` / `site ↗` in `home-dark-768-s6.png`, breaking at the name's own hyphen. This is round 6's footer note, unchanged, and it is the same class of problem as defect 1. **Fix:** a non-breaking hyphen in the label, or `whitespace-nowrap` on the name. Owner: **hidden-craft**.

**7. The legal routes' section nav renders after the document below `lg`.** `app/(legal)/impressum/page.tsx:102` and the identical `aside` on datenschutz — `lg:order-first` moves the rail into the left column only at `lg`, so at 375 and 768 the "Abschnitte" jump-list, the `Stand:` date and the back-link all sit *below* the prose they index (`impressum-dark-768.png`, `impressum-light-768.png`). Source order is right for assistive tech, and this is the deliberate consequence of the round's own fix — but a table of contents you reach after reading the document does no work. **Fix:** at `max-lg` reduce the block to the back-link and the `Stand:` date, or move a horizontal chip row of the same anchors above the H1. Owner: **marginalia**.

**8. Chapter commit rows truncate to a few words at 375.** `components/sections/world-chapter.tsx:156` — `<span className="min-w-0 truncate">`. At 1440 the three recent-commit lines carry real messages; at 375 they read `README: what changed in v1.9.0, for …`, `Context diet v1.9.0: gate-runner, se…`, `Give the compaction test's direct gi…` (`home-dark-375-s2.png`, `-s3.png`). Three rows of half-sentences under a language bar is decoration, not data, on the site whose pitch is that the data is real. **Fix:** at `max-sm` show one commit with two lines of `line-clamp-2` instead of three truncated ones. Owner: **data-display**.

Stopping at eight. Everything else I looked for — the case-study heroes' empty right 40% at 1440 (consistent across both, therefore a decision), the 404's small recovery link, the illegible interior of the ultraweb mockup figure, the hooks table's ~95-character third column at 1440, the `text-foreground/85` on that column, the two theme toggles on desktop (header and footer), and the `(required)` marker on all three fields where marking the optional ones is the usual convention — is priced into the scores above and named in the per-page notes, not padded into this list.

---

## Verdict

**SHIP.**

Six of the eight round-6 defects are closed outright, two are partly closed, and **nothing regressed**. All thirty-six cells clear the ≥7 bar for the first time in the build's history — the two 6s (impressum craft, datenschutz craft) that blocked SHIP last round are now 8s, and they got there by one edit each doing exactly what it was supposed to do. The banned-list sweep is clean for the third consecutive round, and every one of the six routes now passes gate-responsive check 8, against three violations last round.

The three fixes I named as verdict-movers all landed and all worked: the legal 3/9 split held from `lg` cleared two responsive violations and lifted both legal routes' craft by two points; the ghost `§` clamp cleared the collision at the one width where it happened; the hero card re-composed at `md` cleared the last violation and lifted home's hierarchy.

What this round also did — and it matters more than any single fix — is photograph the signature move. Four full-viewport worlds, each with its own authored ground, its own accent, its own display gesture and its own bleeding numeral, re-decided rather than inverted in light mode, with a facts rail whose hierarchy is a verified token pair rather than an alpha. Round 6 scored home on a first viewport and a source read. Seen whole, it is one committed direction executed to an extreme with nothing competing against it, which is INVARIANTS 1 and 2 in the same breath. That, not the defect list, is why the scores moved.

Against the jury model: Design and Usability are both intact — the remaining eight items are craft and legibility, not navigation, keyboard, contrast or load. Nothing here trades a usability point for a creativity point.

**The three fixes I would still make, in order:** defect 1 (the verify command's hyphen breaks — the one string whose job is to be re-run), defect 2 (a scroll cue on the hardmode tables at `max-md`), defect 3 (`md:self-start` on the operator card, which closes the build's largest void with one word). None blocks the ship; all three are one-line edits, and together they would take home space to 8 and hardmode craft to 9.

**Two frames the Lead should look at directly:** `qa/visual/round-7/home-dark-768-s6.png` (the split verify command and the split footer link in one view) and `qa/visual/round-7/home-dark-1440-s2.png` (the signature move, finally on the record).

---

## Evidence gaps — reported, not guessed

No frame exceeded 900px, so nothing was unjudgeable for height, and none of the 137 declared files was missing.

- **`app/(site)/error.tsx` has no frame** and cannot have one without a thrown error. Judged from source, and every claim about it above says so. Its rendered ghost `!!`, its 375 behaviour and its focus ring are unverified in pixels.
- **The 404's page title** cannot be verified from frames that carry no browser chrome. Unchanged from rounds 5 and 6.
- **No footer frame at 768 in light**; the `ultraweb-` / `site` split is verified in dark only (`home-dark-768-s6.png`). The 375 and 1440 footers are verified in both themes.
- **`crop-hm-agents-table` exists in dark only** (375/768/1440). The four-column table's light rendering is unverified; its dark behaviour at every width is not.
- **`crop-hm-hero-timeline` and `crop-uw-hero-timeline` exist in dark only.** The timeline lines are nonetheless verified in light via the sweep frames at all three widths (`work-hardmode-light-375/768/1440.png`, `work-ultraweb-light-*`).
- **24 of the 48 home sectionals and 28 of the 54 crops were read**, selected so that every surface is seen at 1440 in both themes and at 375 and 768 in at least one. The unread files are theme or width twins of read ones at the same step; where a twin was the only evidence for a claim, I read it. No claim above rests on a file I did not open.

Judged as stipulated, unchanged from rounds 5 and 6: the scroll signature cannot appear in statics; dark leads; the wire and stat data are real. The static reduced-motion edition was scored as a first-class deliverable on its own — which is where every defect in this list comes from.
