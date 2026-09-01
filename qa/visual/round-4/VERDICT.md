# design-judge — round 4 (FINAL) — verbatim verdict — 2026-09-01

Recorded unedited from the design-judge subagent's report (task a6ef56f61560ab1cd).
Round 4 was the declared final round; this verdict closes gate-visual.

---

I read `design/DIRECTION.md`, `design/SYSTEM.md`, the taste constitution, `award-canon/references/INVARIANTS.md`, and QA.md rounds 1–3, then viewed all 32 captures in `/home/crocco/portfolio/qa/visual/round-4/` at full attention.

## Scores — round 4

| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | 7 | 8 | 7 | 8 | 8 | **6** |
| work-ultraweb | 8 | 9 | 7 | 8 | 8 | 7 |
| work-hardmode | 8 | 8 | 7 | 8 | 8 | 7 |
| impressum | 7 | **6** | **6** | 7 | **6** | 7 |
| datenschutz | 7 | **6** | **6** | 7 | **6** | 7 |
| notfound | 8 | 8 | **6** | **6** | **6** | 7 |

**home** — hier 7: at 1440 the read order is unmistakable (H1 → framed 225/227 → subhead → wire), but at 375 the authorship stat is deferred to the operator and the wire loses its payload, so the mobile hierarchy is materially weaker than the desktop one. type 8: 96px/17px = 5.6× contrast, four genuinely different display voices, ghost numerals doing Type-as-the-Image. space 7: real compression/release, but the operator's right half is dead for ~730px and the static chapters carry large empty bottom bands. color 8: per-world one-accent discipline holds, chrome tuning is now visible in pixels (terracotta/hazard/blue CTA in w1/w2/w3), light-mode world inversion is the best decision in the build. dist 8: one committed direction, one signature, dressed per world. craft 6: three separate 375 slips plus a light-mode chrome latch (below).

**work-ultraweb** — the strongest page. type 9: the Fraunces italic middle line is the site's best typographic moment; body measure ~64 chars. dist 8: quoting this site's own `design/MOCKUPS.md` and `design/DIRECTION.md` as evidence is an original content move, not a borrowed surface. craft 7 held back by the evidence-panel bleed.

**work-hardmode** — hazard stripe clears the glass header, mono-caps display carries real mass, ink-on-hazard-paper light is a true re-decision (color 8). Same panel-bleed craft ding.

**impressum / datenschutz** — hier 7 and craft 7 (rail index underlined, accent rules, Stand date, back link, live footer stat all verified). type 6 and space 6: prose measure runs ~76–83 real characters against SYSTEM §type's ≈70 ceiling, and the block rhythm is near-uniform (54px, 54px, 53px, 54px). dist 6: strip the `[ § ]` eyebrow and this page belongs to any site.

**notfound** — hier 8 / type 8 (the H1 holds one line at 375, 768 and 1440 — good fluid work). space 6 / color 6 / dist 6: the only centered page on a site built from left-aligned asymmetry, ~350px of dead band at 768, and one green square as the entire chromatic event.

## Banned-list sweep

Clean except one open, tracked hit. No gradients, no gradient headlines, no shadcn default look, no emoji, no icon-card row (the 3-up stats are Framed Data with bracket corners, not cards), no glassmorphism beyond the one SYSTEM-declared header, no uniform `py-24`, no dead startup copy, no glow-navy, no animation spam. **The r3 fabricated-proof hit is dead**: hero, operator and footer all read `225/227` from one source in every capture, at both themes and both widths (d1 verified in pixels). Remaining hit: `[Anschrift wird vor Veröffentlichung ergänzt]` in `impressum-dark.png`/`impressum-light.png` — visible placeholder copy, the tracked material-unconfirmed production blocker, not a new finding.

## Round-3 fix verification (pixels)

Verified: d1 (live footer stat), d2 at 1440 (rail values land at x 968, right edge at 1264, no overhang), d3 (text-5xl titles + per-world ghost numerals bleeding right in all four chapters), d6 (header CTA and live chip take the world accent), d7 (one bracket grammar; operator big number present at 375 and absent at 1440; `git log --no-merges | grep -ci claude` on one line at both widths), d8 (dark plus-grid marks in light hero; case pages keep cream/hazard-paper in light), d9 (no 0% segments; `PYTHON 98% · CSS 1% · SHELL 1%` with true widths; dominant segment takes the accent), and most of d10.
**Not verified: d10's "aligned ghost button"** — see defect 4. **Unverified this round: d2's 768 half, d4 (768 case panels), d5 (legal at 375)** — no 768 home/case captures and no 375 legal captures exist in round 4; the only 768 shot is the 404.

## Ranked defects

**1. The wire drops its message text at 375 — the site's core mechanic renders as content-free rows.** *Where:* `m375-hero.png` (rows at y≈640/678/716/754/792) and confirmed in `home-375-light.png`. Each row shows only `19 h ago | ultraweb | [AI]` — the space between the world name and the AI chip is blank, at the same 38px row pitch as desktop, so nothing wrapped below. *Why it hurts:* the panel header still promises "THE WIRE — ALL WORLDS, AS IT HAPPENS" and then shows six near-identical rows with no event. The live mechanic is DIRECTION's stated core and the homepage's second-most-important element; on the majority device class it becomes decoration, and six identical stripped rows read as exactly the uniform-row filler the constitution bans. This is a Usability + Content hit (70% of the jury weight sits in Design + Usability). *Fix:* stack the row below `sm` — line 1 `time · world` in mono caps, line 2 the message at body size, chip inline right; row grows to ~64px, show 4 events instead of 6. Owned by the wire panel's responsive rules (gate-responsive / data-display).

**2. The operator's right half is dead at 1440, and its framed note is a caption for a number that isn't on screen.** *Where:* `home-sec-operator.png` and `home-sec-operator-light.png`. The framed note occupies y 250–380; from y 400 to the form's bracket close at y 1131 the entire right half (x≈700–1424) is empty plus-grid while the form is confined to a 430px column inside a 1104px container. The note reads "THE NUMBER ABOVE, VERIFIED" — but at 1440 "above" is ~4,000px of scroll away, and d7 deliberately removed the number here. *Why it hurts:* the section opens a two-column structure and then abandons it; whitespace stops reading as emphasis and starts reading as unfinished layout. *Fix:* make the note self-contained (a small inline `225 / 227` above "VERIFIED") and move it down to sit opposite the form, or widen the form to the Lead 7/5 split SYSTEM already names. Award-canon: this column wants **Framed Data** with its subject inside the frame.

**3. Header chrome tuning does not release after the last chapter — and light mode exposes it.** *Where:* `home-sec-operator-light.png` and `home-sec-footer-light.png` show the CTA still in world-01 terracotta at the operator and footer; `home-sec-operator.png` / `home-sec-footer.png` show rest chrome at the identical scroll positions. Same position, different value → the tuning is history-dependent, not position-dependent (the light run visited w1 last; the dark run visited w0, whose accent happens to equal rest chrome, which is why dark looks correct by luck). *Why it hurts:* DIRECTION specifies the accent defaults "to chrome-white at rest"; the signature move's chrome half is left latched on a world the visitor has left. *Fix:* give the operator/footer an explicit rest scope (`data-world` unset or reset) so the tuning releases; one scroll to the footer in light mode confirms it either way.

**4. Ghost "GitHub" button breaks the left edge at 375 — d10's alignment fix did not land at narrow.** *Where:* `m375-footer.png`, "GitHub ↗" text edge at x≈60 while the section's left margin (THE OPERATOR label, H1, footer column labels) is x≈18 — a ~42px indent. At 1440 (`home-sec-footer.png`) the same link's text edge sits at x≈200 versus the primary button's label at x≈205, i.e. the box is ~5px left of the form fields. *Why it hurts:* it's the last visible element of the contact block and the one place the page's left edge visibly breaks; borderless ghost buttons must be optically aligned on the text, not the box. *Fix:* negative inline padding compensation on the ghost variant so the glyph edge lands on the field edge at every width.

**5. The bleeding evidence panels read as empty slabs, not as code crossing the edge.** *Where:* `work-ultraweb-dark.png` / `work-ultraweb-light.png` (the `design/MOCKUPS.md` and `design/DIRECTION.md` panels) and `work-hardmode-dark.png` / `work-hardmode-light.png` (both `TOOLS/DEMO.PY` panels). The panel starts at x≈630 and bleeds past the 1425 viewport edge, but the text wraps at x≈1096 — roughly 330–370px of empty panel is visible before the edge. *Why it hurts:* d12's stated intent was "the code itself carried across the edge"; as shot, the Edge Bleed asymmetry SYSTEM §layout promises reads as a container that's wider than its contents. It's most obvious in light, where the panel is near-white on cream. *Fix:* either raise the code measure so lines actually meet the viewport edge, or pull the panel's right edge back to `--container-content` at ≥1280 and keep the bleed for the mid range.

**6. Legal prose measure runs ~76–83 characters — over SYSTEM §type's ≈70 ceiling.** *Where:* `datenschutz-dark.png` / `-light.png`, prose column x 480→1147 (667px at 17px body); e.g. "Sie haben nach der DSGVO das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16)," = 81 characters; same on `impressum-*.png`. The legal body is taking the 9-column width of the Margin Note grid, not `--container-prose`. *Why it hurts:* r2's d3 recorded 55ch as the site-wide answer; the two densest German text pages are the ones that didn't get it, and long-line fatigue is worst exactly there. *Fix:* apply `--container-prose` inside the 9-col — the column stays, the text stops at ~70 chars.

**7. Ghost numeral collides with the chapter CTA at 375.** *Where:* `m375-w1.png` — the `01` ghost spans y≈430–560 and "ENTER WORLD 01 →" sits at y≈518 directly on the numeral's bowl. *Why it hurts:* the terracotta-on-ground pair verified at 6.23:1 in SYSTEM §color is no longer the pair being rendered under that link; the AA evidence doesn't cover it. *Fix:* clamp the ghost's mobile floor below 14rem, or push it behind the copy block only (offset it above the CTA) so no interactive text sits over it.

**8. Footer collapses to 2+1 at 375 and wraps its link labels mid-phrase.** *Where:* `m375-footer.png` and `notfound-375.png` — "ultraweb — case / study" and "hardmode — case / study" both wrap, with LEGAL orphaned below and a large empty area to its right. 768 is fine (`notfound-768.png` shows three clean columns). *Fix:* single column below `sm`, or shorter labels at that width.

**9. World 00's facts rail is the thinnest of the four — the self-monitoring chapter carries the least evidence.** *Where:* `home-sec-w0.png` — three rows (FEED / CLAIMS / BUILT BY), no language bar, no commit lines, against a rail hairline that runs 480px past its last row. *Why it hurts:* the copy claims "the page you are reading reports on itself being built" and the rail beside it is emptier than every other world's. *Fix:* give world 00 its own language bar and three recent commits from this repo — the data already exists; the wire is reading it.

**10. Minor craft, one line each.** `WHAT I DON'T / CLAIM` wraps to two lines in the operator spec list at both 1440 and 375 while its value stays on one — the same wrapping-label defect r1's d8 fixed on the hardmode stats; rename or widen the label column. The 404 is the only page that abandons the site's left-aligned grammar and carries no live element or ghost numeral — award-canon's craft-in-the-corners test wants the corners to *match*, so the fix is the site's own move, not a new one: left-align the block on the content grid with a bleeding ghost `??`, or put a three-row wire strip under the back link ("the wire is still running; this address just isn't on it").

## Verdict

**FIX-THEN-SHIP.** The gate's bar (≥7 on all six axes, every page) is not met: home craft 6; impressum and datenschutz type/space/dist 6; notfound space/color/dist 6. Movement since round 3 is real and positive — home type/space/color/dist +1 each, uw type/color/craft +1, hm color/craft +1, legal hier/craft +1, notfound flat — and no round-3 fix regressed. But round 4's new evidence (375 sectionals, light sectionals) surfaced one usability-class defect that did not exist in the evidence before.

Fixes that move the verdict, in order:
1. **Defect 1 (wire message at <640).** This one is not an acceptance residual — it's the only defect in the set that breaks a stated core mechanic on the majority device class. Landing it alone takes home craft to 7 and puts home, work-ultraweb and work-hardmode fully over the bar.
2. **Defect 6 + one page-specific gesture on the legal pages** (prose to 55ch, plus e.g. a bleeding ghost `§` matching the chapters' ghost numerals or the Stand date as Framed Data) — takes impressum/datenschutz type 6→7 and dist 6→7.
3. **Defect 10's 404 half** — left-align on the content grid with a ghost `??` or a live wire strip — takes notfound space/color/dist 6→7.

## Residuals, if this is the last round (quotable at acceptance verbatim)

- "The Impressum street address is still the placeholder `[Anschrift wird vor Veröffentlichung ergänzt]`. This is material the client must supply; it blocks production publication under § 5 DDG and is not a design finding."
- "At 375px the live wire panel renders each event as timestamp, world name and AI chip only — the commit message itself is not displayed. The panel's promise, 'THE WIRE — ALL WORLDS, AS IT HAPPENS', is not kept on phones."
- "On the two German legal pages the body text runs to roughly 80 characters per line, above the 70-character measure the design system sets for every other surface."
- "The Impressum, the Datenschutzerklärung and the 404 page score 6 of 10 on distinctiveness: they are correct, disciplined and consistent with the site's chrome, but they carry none of the site's own moves — no world temperature, no live data, no bleeding numeral. Against the award canon's craft-in-the-corners test, these three pages are the site's weakest surfaces."
- "The 404 page is the only page in the build that centres its content; the rest of the site is built on a left-aligned asymmetric grid."
- "In light mode the header call-to-action remains tinted with world 01's terracotta at the operator section and the footer, where the chrome is specified to return to its rest colour."
- "The contact section's right half at 1440px carries no content below the verification note — roughly 730 pixels of empty ground beside a 430-pixel-wide form."

## Evidence gaps (report, don't guess)

- **768 unverified for home and both case pages.** The only 768 capture is `notfound-768.png`. Round 3's d2 ("768 measure restored") and d4 ("evidence panels unclipped at 768") therefore remain unverified in this round's evidence.
- **375 unverified for both legal pages.** Round 3's d5 (H1-first order at 375) is unverified here.
- **Light-mode chapter interiors for worlds 02, 03 and 00** exist only inside the downscaled `home-light.png` full-page; no 1:1 sectional. Fine detail there — notably the facts-rail contrast on hardmode's hazard-paper ground — is unverified at native resolution.
- Judged as stipulated: the scroll signature cannot appear in statics, dark leads, wire data is real. The static (reduced-motion) edition was scored as a first-class deliverable on its own, which is where defects 1, 2 and 9 come from.

Screenshots referenced: `qa/visual/round-4/m375-hero.png`, `qa/visual/round-4/home-375-light.png`, `qa/visual/round-4/home-sec-operator.png`, `qa/visual/round-4/home-sec-operator-light.png`, `qa/visual/round-4/home-sec-footer-light.png`, `qa/visual/round-4/m375-footer.png`, `qa/visual/round-4/m375-w1.png`, `qa/visual/round-4/home-sec-w0.png`, `qa/visual/round-4/work-ultraweb-light.png`, `qa/visual/round-4/datenschutz-dark.png`, `qa/visual/round-4/notfound-768.png`.
