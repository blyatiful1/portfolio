# design-judge — round 5 (LAST, cap 5) — verbatim verdict — 2026-09-01

Recorded unedited from the design-judge subagent's report (task a0934343f36b3c5f4).
Round 5 was user-commissioned at CP6; the flagship cap of 5 rounds is reached.
Post-round fix evidence: see design/QA.md §round 5 and postfix-datenschutz-375.png.

---

I read `design/DIRECTION.md`, `design/SYSTEM.md`, the taste constitution at `/home/crocco/.claude/skills/ultraweb/skills/taste/SKILL.md`, `award-canon/references/INVARIANTS.md`, `design/QA.md` rounds 1–4 and `qa/visual/round-4/VERDICT.md`, then viewed all 41 captures in `/home/crocco/portfolio/qa/visual/round-5/` at full attention. Three findings are grounded in source, cited below.

## Scores — round 5

| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | 8 | 8 | 7 | 8 | 8 | 7 |
| work-ultraweb | 8 | 9 | 8 | 8 | 8 | 8 |
| work-hardmode | 8 | 8 | 8 | 8 | 8 | 8 |
| impressum | 8 | 7 | 7 | 7 | 7 | 7 |
| datenschutz | 8 | 7 | 7 | 7 | 7 | **6** |
| notfound | 8 | 8 | 7 | 7 | 7 | 8 |

**home** — hier 8 (+1): the 375 wire now carries its payload, so the second-most-important element reads on phones; desktop order H1 → framed `247/249` → subhead → wire is unmistakable. type 8: 96/17 = 5.6×, four distinct display voices, ghost numerals doing Type as the Image. space 7: real compression/release, but every chapter ends in 120–240px of empty ground and the operator's upper-right quadrant is unfilled. color 8: per-world one-accent holds, the tuning now releases to rest chrome (verified), light-mode inversion still the best decision in the build. dist 8: one direction, one signature, each world dressed past comfortable. craft 7: 768 rail cramping and w0's missing language bar are the remaining visible slips.

**work-ultraweb** — the strongest page, and the round's biggest movement. space/craft +1 each: the evidence panels are no longer empty slabs; they end on the container line at x≈1264 with code filling them, and 768 renders them in-container, unclipped. type 9 for the Fraunces italic middle line.

**work-hardmode** — same panel fix, hazard stripe clears the glass header at 1440 and 768, ink-on-hazard-paper light is a true re-decision.

**impressum / datenschutz** — type 7 (+1): measure now 46–69 real characters (`max-w-[36rem]`), against ~76–83 last round. dist 7 (+1): the bleeding ghost `§` plus the `[ § ] WORLD 00 · LEGAL` eyebrow put the site's own grammar in the corner. datenschutz craft 6 for the clipped H1 (defect 1) — impressum's shorter H1 escapes it.

**notfound** — space/color/dist +1, craft +1: left-aligned on the content grid at x=168, bracket eyebrow `[ ?? ] UNCHARTED`, bleeding ghost `??`, the live-green square period, `← BACK TO WORLD 00`. It is now the site's move in the site's grammar, verified at 1440, 768 and 375, both themes.

## Banned-list sweep — CLEAN, zero violations

No gradients or gradient headlines, no untouched shadcn look (Sharp radii, authored palette, custom focus), no emoji, no icon-card row (the 3-ups are Framed Data with bracket corners — no boxes, no icons), no glassmorphism beyond the one SYSTEM-declared header, no uniform `py-24` (full-viewport chapters vs compressed wire vs 3/9 legal grid vs left-aligned 404), no dead startup copy, no glow-navy template, no animation spam, no fabricated proof — `247/249` renders from one source in the hero, the operator panel and the footer of every route, both themes, all three widths.

**The round-1→4 placeholder hit is dead.** `impressum-dark.png` / `-light.png` / `-375.png` now render `Iwan Braun / Poststr. 153a / 44809 Bochum`. This is the first round with a clean sweep.

## Round-4 defect fix verification (pixels)

| # | Status | Evidence |
|---|---|---|
| d1 wire message at 375 | **FIXED** | `m375-hero.png` / `m375-wire.png` — rows stack: line 1 `6 min ago · this site` + AI chip right, line 2 the message at body size; 4 events. Also correct at 768 (`home-768.png`) |
| d2 operator right half / orphan note | **FIXED** | `home-dark.png` + `home-sec-footer.png` — the framed note moved down opposite the form and now carries its own `247 / 249` plus the verify command inside the frame |
| d3 chrome tuning latch (light) | **FIXED** | `home-sec-operator-light.png` / `home-sec-footer-light.png` — CTA is ink-on-white rest chrome at the exact scroll positions where r4 showed world-01 terracotta |
| d4 ghost GitHub button alignment | **FIXED @1440, partial @375** | `home-sec-footer.png` — glyph edge x=161 = the section margin, outside the form frame (bracket closes at 634,137). At 375 no 1:1 crop exists; no indent visible in the 3.5×-downscaled `home-375-light.png` |
| d5 evidence panels as empty slabs | **FIXED** | all four `work-*` 1440 captures — panel right edge on the container line, code fills it; `work-*-768.png` in-container and unclipped (also closes r3 d4) |
| d6 legal prose measure | **FIXED** | `datenschutz-dark.png` — "Sie haben nach der DSGVO das Recht auf Auskunft (Art. 15)," = 58 chars; longest measured line 69. Was 81 |
| d7 ghost numeral over the CTA at 375 | **FIXED** | `m375-w1.png` — numeral raised (`max-sm:top-[30%]`), CTA at y≈518 clear of it |
| d8 footer 2+1 collapse at 375 | **FIXED** | `m375-footer.png`, `notfound-375.png`, `impressum-375.png` — single column, no label wraps mid-phrase |
| d9 world 00's thin rail | **PARTIAL** | `home-sec-w0.png` — `COMMITS 22 · 22 AI-AUTHORED` + three real commit lines now present; the language bar the other three carry is still absent |
| d10a label wrap | **FIXED** | `home-sec-operator.png` — `WHAT I DON'T CLAIM` on one line |
| d10b 404 restructure | **FIXED** | `notfound-dark/light/375/768.png` — see score note above |
| legal ghost-§ gesture | **LANDED** | both legal pages, both themes — ghost `§` bleeding the right edge, `[ § ] WORLD 00 · LEGAL` eyebrow |
| r3 d2 @768 (unverified in r4) | **VERIFIED** | `home-768.png` — rail no longer overhangs; but see defect 3 |
| r3 d5 legal @375 (unverified in r4) | **VERIFIED** | `impressum-375.png` / `datenschutz-375.png` — H1 first, rail after content |

## Ranked defects

**1. The Datenschutzerklärung H1 is clipped at 375 — the page title loses its last letters.** *Where:* `qa/visual/round-5/datenschutz-375.png`, the H1 runs from x=16 to the viewport edge at x=360 with zero right gutter, while every other element on the page respects the 16px margin. *Root cause (source-verified):* `app/(legal)/datenschutz/page.tsx:34` puts `overflow-x-clip` on `<main>`; line 42 sets `px-4` (328px of content at 375); line 48 sets the H1 to `text-4xl`, which `app/globals.css:210` clamps to a 34px floor. "Datenschutzerklärung" at 34px Space Grotesk Bold measures ~360px — roughly 32px wider than its box, and there is no `hyphens` rule anywhere in the repo to break it. *Why it hurts:* it is the largest element on the page, on the majority device class, on a German-language site where long compounds are the norm — and the site's whole pitch is verification discipline. *Fix:* `lang="de"` + `hyphens-auto` on the legal prose column, or `text-3xl md:text-4xl` for that one H1 — typography scale rules own the clamp floor, `gate-responsive` owns the breakpoint check. This is the only cell under 7 in the entire matrix.

**2. Both German legal pages are served declared as English — WCAG 2.2 AA 3.1.2.** *Where:* `app/layout.tsx:33` is the only `lang=` in the codebase (`lang="en"`); the Impressum and the Datenschutzerklärung are 100% German. *Why it hurts:* screen readers pronounce German with English phonetics on the two pages a DACH visitor is most likely to need read aloud, and it is an AA failure axe cannot auto-detect — which is why `gate-accessibility` passed it. INVARIANTS names accessibility as the corpus's recurring weak axis and the free Design-tier point ultraweb normally banks. *Fix:* `lang="de"` on the legal `<main>` (same edit as defect 1's hyphenation). Invisible in pixels; reported because I found it root-causing defect 1.

**3. The facts rail collapses to a ~137px value column at 768.** *Where:* `home-768.png`, all four chapters — `NEXT.JS PIPELINE · 80 SKILLS`, `TOOLS/DEMO.PY — CI PROVES EVERY HOOK BLOCKS` and `PYTHON · GTK4 / LIBADWAITA` all wrap to two lines, and the commit lines truncate after a few words. *Root cause:* `components/sections/world-chapter.tsx:78` splits `md:grid-cols-[7fr_5fr]` with a 64px gap (rail ≈ 273px at 768, ≈ 249px inside the border and `pl-6`), while line 104 holds a fixed `grid-cols-[6.5rem_1fr]` label column — 104px of it goes to the label. *Why it hurts:* the rail is the chapter's evidence half; at the tablet breakpoint it reads as a squeezed table, not an instrument. *Fix:* stack label over value below `lg` (the pattern already exists at `max-sm`), or shrink the label column to `5rem` at `md`. Owned by the layout/responsive rules.

**4. World 00 is the only chapter whose rail carries no language bar.** *Where:* `home-sec-w0.png` / `home-sec-w0-light.png` versus w1/w2/w3, which all show one. *Root cause:* `world-chapter.tsx:118` renders the bar only when `repoFacts.languages.length > 0`; the newly-public repo returned none at capture time. *Why it hurts:* the chapter claiming "the page you are reading reports on itself" is still the least-evidenced of the four, and the inconsistency is visible across a single scroll. *Fix:* the data path, not the design — confirm the language endpoint resolves for the portfolio repo now that it is public. Half of r4's d9; the commits half landed.

I am stopping at four. Everything else I looked for (chapter bottom bands, the operator's empty upper-right, the near-uniform legal block rhythm) is priced into the space scores above, not a separate defect.

**Low-confidence, verify at 1:1 before shipping:** the footer theme-toggle glyph in `impressum-light.png` (1250,1201) reads to me as a sun where `datenschutz-light.png` (1206,1798), `notfound-light.png` and both `work-*-light.png` read as a crescent. At ~12px in a downscaled frame I cannot call this reliably — it is either a wrong-state icon on one route or my glyph perception. One 1:1 crop settles it.

## Verdict

**FIX-THEN-SHIP — one defect from SHIP.**

The bar (≥7 on all six axes, every page, zero banned-list hits) is met on 35 of 36 cells and the banned sweep is clean for the first time in five rounds. The single blocker is datenschutz craft 6.

Fixes that move the verdict:
1. **Defect 1** — unclip the Datenschutzerklärung H1 at 375. One line. It takes datenschutz craft 6→7 and the whole matrix over the bar.
2. **Defect 2** — `lang="de"` on the legal pages. Same two files, same edit session; it protects the AA claim the build advertises.

Nothing else needs to happen before this ships. Movement since round 4 is the largest of any round: uw space/craft +1, hm space/craft +1, home hier +1, legal type/dist +1, notfound space/color/dist/craft +1, and the two long-running blockers (the address placeholder, the light-mode chrome latch) are both dead.

## Residuals — exact wording for the client acceptance conversation

- "On phones (375 px) the headline of the Datenschutzerklärung is wider than the page: its last letters run past the right margin and are cut off at the screen edge. Every other headline on the site fits its column."
- "The Impressum and the Datenschutzerklärung are written in German but are delivered to browsers and screen readers declared as English. That is a WCAG 2.2 AA point (3.1.2, Language of Parts) on a site that otherwise meets AA."
- "At tablet width (768 px) the facts rail beside each world keeps a fixed label column, leaving about 137 pixels for the values. Most values wrap onto two lines and the commit lines truncate after a few words."
- "World 00 — the chapter about this site — is the only one of the four whose facts rail shows no language bar. The other three show one. The bar only paints real data, and none was returned for this repository at capture time."
- "Each world chapter fills a full viewport, so on desktop every chapter ends with 120 to 240 pixels of empty ground below its call to action. This is the cost of the full-viewport chapter format, not an unfinished section."
- "In the contact section at 1440 px the upper right quadrant carries no content. The verification panel now sits opposite the form, as agreed in round 4; the space above it is left empty."
- "The Impressum now shows a real postal address. Please confirm the street, number and city are correct before publication — a design review can verify that a real address renders, not that it is yours."

Dead residuals from round 4, for the record: the address placeholder, the missing wire message at 375, the ~80-character legal measure, the light-mode terracotta latch at the operator and footer, the centred 404, and the distinctiveness-6 corners are all resolved and verified in this round's pixels.

## Evidence gaps (reported, not guessed)

- **375 unverified for both case-study routes.** No `work-ultraweb-375` / `work-hardmode-375` in this round; the last evidence is round 3. Two routes have an unverified breakpoint.
- **375 unverified for chapters 02, 03 and 00.** Only `m375-w1.png` exists; the hazard stripe, the light-world pill headline and world 00's H1 are unverified at narrow this round.
- **The contact block at 375 was not captured at 1:1** — `m375-operator.png` ends at the spec list and `m375-footer.png` begins below the GitHub link, so d4's alignment at 375 is verified only at 3.5× downscale.
- **768 was shot in dark only.** All four 768 captures are dark; light mode at tablet width is unverified.
- Judged as stipulated: the scroll signature cannot appear in statics, dark leads, wire and stat data are real. The static reduced-motion edition was scored as a first-class deliverable on its own — which is where defects 1, 3 and 4 come from.
