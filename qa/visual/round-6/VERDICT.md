# design-judge — round 6 (iterate re-gate) — 2026-09-07

Scored against `design/DIRECTION.md`, `design/SYSTEM.md` (including the **Amendments — iteration 2026-09-07** section, which governs this round), the ultraweb constitution `skills/taste/SKILL.md`, and `skills/award-canon/references/INVARIANTS.md` (invariants + jury weighting read verbatim, not paraphrased). Compared against `qa/visual/round-5/VERDICT.md` and `design/QA.md` §"gate-visual — round 5".

Evidence: 36 viewport frames (6 routes × 2 themes × 3 widths) + 14 crops in `qa/visual/round-6/`. Every frame ≤900px tall — **nothing was unjudgeable for height this round**. All 50 files were viewed at full attention. Findings that could not be settled from pixels were root-caused in source and are cited with `file:line`; each such finding says so.

---

## Scores — round 6

| Page | hier | type | space | color | dist | craft |
|---|---|---|---|---|---|---|
| home | **7** | 8 | 7 | 8 | 8 | 7 |
| work-ultraweb | 8 | **8** | 8 | 8 | 8 | 8 |
| work-hardmode | 8 | 8 | 8 | 8 | 8 | 8 |
| impressum | 8 | 7 | 7 | 7 | 7 | **6** |
| datenschutz | 8 | 7 | 7 | 7 | 7 | **6** |
| notfound | 8 | 8 | 7 | 7 | 7 | 8 |

Movement vs round 5: home hier 8→7, work-ultraweb type 9→8, impressum craft 7→6, datenschutz craft 7→6 (it was fixed to 7 post-round-5; it is 6 again for two different, newly-visible defects). Everything else holds. **No score moved up.** Three of the four drops come from evidence round 5 did not have — round 5 shot 768 in dark only and shot no legal page at 768 at all; this round's 36-frame matrix exposes what that gap was hiding. One (uw type) is a genuine cost of a change made this round.

### home — 7 / 8 / 7 / 8 / 8 / 7

**hier 7 (−1).** At 1440 the order is unmistakable and excellent: `AGENT INFRASTRUCTURE · GERMANY` → the 96px H1 with its live-green square period → the bracket-framed `253 / 255` → subhead → wire. That is Type as Evidence doing exactly what DIRECTION commissioned it to do. At **768 the framed stat card does not exist**: `components/sections/hero.tsx:43` sets it `hidden h-fit p-7 lg:block`, so below 1024px the site's headline proof — the number the entire brief is about — is removed rather than re-composed. The consequence is visible in `home-dark-768.png` / `home-light-768.png`: the H1 occupies x=24–394 of a 744px content width, the subhead reaches x=663, and the right half of the hero carries nothing at all, with a further ~105px of dead ground between the scroll hint and the wire panel. The number returns only in the operator block at the bottom of the page. A page whose second-most-important element is `display:none` on the tablet class cannot hold an 8 on hierarchy.

**type 8.** 96px display over 17px body = 5.6×, clearing the 3.5× floor with room. Four distinct voices are legible in a single viewport (Space Grotesk display, Space Grotesk body, Plex Mono labels at +0.18em, Plex Mono wire rows) and none of them is decorative. Tracking on the H1 is genuinely tight. Against it: at 375 the wire panel's header breaks as `THE WIRE — ALL` / `WORLDS, AS IT HAPPENS`, stranding the em dash at end-of-line and splitting the phrase "ALL WORLDS" — visible in `crop-wire-dark-375.png` and `crop-wire-light-375.png` and in both home 375 frames.

**space 7.** The rhythm map is real and varied — hero `pt-40 pb-16` / `md:pt-48 md:pb-24`, wire `py-6` (the compression), chapters `py-20/28`, operator `py-28/40` (the release). Four distinct section values, so no wallpaper. Held at 7 rather than raised because the 768 hero's empty right half and the gap above the wire read as unfilled rather than composed, and round 5's chapter-bottom air and empty operator upper-right quadrant are both still priced in here.

**color 8.** Per-world one-accent holds. The hero is `data-world-rest`, so the tuning releases to chrome-white at rest — verified in `home-dark-1440.png` (the `Work with me` button is chrome-white, not a world accent) and its light twin. The live-green chip and the `● recomputed just now` line are the only chromatic events in the hero, which is the correct budget. Light mode is a re-decision, not an inversion: the wire's per-world identifiers hold their coding at both themes and all three widths (`ultraweb` terracotta, `hardmode` a darkened mustard in light — distinct from terracotta, checked at 1:1 in `crop-wire-light-1440.png`).

**dist 8.** One direction, one signature. The static edition still carries the anthology grammar in the first viewport: bracket eyebrows, the mono chrome, the plus-grid ground, the live square period. The world-03 pill is a real per-world gesture (see the fix table).

**craft 7.** The new pause control is correctly built — `min-h-6` (24px, clears WCAG 2.5.8 AA), a real lucide `Pause`/`Play` at `size-3`, `aria-pressed`, and a focus ring on `--ring` (`components/wire/wire-pause.tsx:23–36`). Against it: it is styled identically to the static `updated 4 d ago` beside it (same `text-2xs`, same `text-muted-foreground`, no border, no box), so the only control in the panel reads as a status label at rest; the 375 header wrap above; and the operator card's `break-all` verify command (defect 5).

### work-ultraweb — 8 / 8 / 8 / 8 / 8 / 8

**The strongest hero in the build, and still is.** `The studio that / built the page / you're reading` — three lines, the middle one Fraunces italic in terracotta, is the single best typographic moment on the site, and it survives both themes and all three widths intact (`work-ultraweb-*-1440/768/375.png`). Light mode darkens the terracotta rather than reusing the dark value: a real re-decision.

**type 8 (−1 from round 5's 9).** The hero is still 9-grade. The round's new **timeline line** is not. At 1440 it runs the full 1104px container in 11px uppercase mono — roughly 140 characters per line, double the site's own `≈70 real characters` ceiling in §type — and orphans `HAD SCAFFOLDED.` onto a two-word second line. At 375 it becomes four stacked lines of the same treatment, sitting directly under the three-line spec row in an identical face, size, case and tracking: six or seven consecutive lines of small caps mono that the eye cannot separate into two kinds of fact. A 9 means there is no typographic decision I would change. I would change this one.

**space 8.** `py-8`, `py-14`, `py-16/24`, `py-20/28` — four values, real compression and release. The evidence panels bleed to the viewport edge at `lg` and pull back in at `xl` (`lg:mr-[calc(50%-50vw)] … xl:mr-0`), which is Edge Bleed used deliberately rather than decoratively.

**color 8 / dist 8 / craft 8.** The new documentary figure (`crop-uw-figure-dark-1440.png`) uses the §imagery exception exactly as written: a hairline-framed render of the studio's own approved mockup, captioned in Fraunces italic terracotta with the file path and the render width, below the fold. One honest reservation, recorded but not scored as a defect: at its rendered size nothing inside the screenshot is legible, so it functions as a composition reference rather than a readable exhibit — which the caption makes clear enough that I will not price it.

### work-hardmode — 8 / 8 / 8 / 8 / 8 / 8

`ADVICE LOSES / TO MOMENTUM` in Plex Mono caps with `[word-spacing:-0.35ch]` is a committed per-world display gesture, not a font swap. The hazard stripe clears the glass header at all three widths and both themes; light mode's ink-on-hazard-paper is the build's second-best re-decision after world 03's inversion.

**The new hooks table** (`crop-hm-hooks-table-dark-1440.png`) is the best new surface of the round: 12 rows, `HOOK / EVENT / EXIT CODE MEANS`, identifiers in hazard yellow, hairline rules, muted column heads. It reads as an instrument, which is the whole point of world 02. Two small things sit inside craft 8 rather than under it: the third column runs ~95 mono characters and orphans single words (`repo`, `edit`) onto their own lines; and the facts row reads `V3.1.0` while the timeline two lines below reads `V3.1` — a version-string inconsistency on the page whose subject is deterministic checking.

The timeline line carries the same over-long measure as ultraweb's (defect 4) — one 135-character uppercase line at 1440, four at 375.

### impressum — 8 / 7 / 7 / 7 / 7 / 6

Hierarchy is clean (H1 → labelled blocks with 2.5rem accent rules → sticky rail), the real postal address renders in all six frames, and the ghost `§` plus the `[ § ] WORLD 00 · LEGAL` eyebrow keep the site's grammar in the corner. Type, space, colour and distinctiveness are all held at 7: the measure fix from round 5 survives, but the page has one display moment and one body size, and its section padding is a single `pt-36 pb-24`.

**craft 6 (−1).** Three slips, all newly visible now that 768 is shot:
1. `impressum-dark-768.png` / `impressum-light-768.png` — the 3fr rail is ~165px wide at that breakpoint (content 720px, `md:grid-cols-[3fr_9fr]` with `gap-x-12`), so `[ § ] WORLD 00 · LEGAL` breaks into `[ § ] WORLD 00` / `· LEGAL`. A line that begins with an orphaned separator glyph is a typographic error, not a wrap.
2. Same frames — `← ZURÜCK ZU DEN` / `WELTEN` strands the last word of the only back-link on the page.
3. `impressum-light-1440.png` — the gaps between labelled blocks measure 41px, 58px, 41px. The 17px outlier after `KONTAKT` is not a designed variation; it reads as a spacing slip on a page whose job is precision.

Contributing, below the scored surface: the footer at 768 wraps `built by world 01 — ultraweb-` / `site ↗`, splitting a product name across lines.

### datenschutz — 8 / 7 / 7 / 7 / 7 / 6

**Round 5's blocker is dead and verified.** `datenschutz-dark-375.png` / `datenschutz-light-375.png` — `Datenschutzerklärung` at `text-3xl` (28px) ends at x≈308 with the 16px right gutter intact. The `sm:text-4xl` step-up holds at 768 and 1440. `app/(legal)/datenschutz/page.tsx:34` also carries `lang="de"`, closing round 5's defect 2 (source-verified; invisible in pixels by nature).

The new **Empfänger** nav entry renders in the rail at 768 and 1440 in both themes, and the hosting paragraph now ends `Die Übermittlung in die USA erfolgt auf der unter „Empfänger" genannten Grundlage.` — the cross-reference lands. The block it points at is below the first viewport and is not in this round's evidence.

**craft 6 (−1).** The two impressum rail slips apply here identically (same grid, same eyebrow, same back-link), plus one of its own: **the ghost `§` collides with the H1 at 768.** `app/(legal)/datenschutz/page.tsx:38` sizes it `text-[clamp(10rem,24vw,20rem)]` at `right-[-0.06em]`; at 768 that is a 184px glyph spanning roughly x=657–779, while `Datenschutzerklärung` runs to x≈731. The title's last two or three letters sit on the decoration in both `datenschutz-dark-768.png` and `datenschutz-light-768.png`. At 1440 there is 180px of clearance and at 375 about 12px; 768 is the one width where the clamp and the title length cross. The 5% opacity keeps it from destroying legibility, which is why this is craft and not usability — but it is a collision on the largest element of the page, and the site's whole pitch is that details are checked.

### notfound — 8 / 8 / 7 / 7 / 7 / 8

Holds round 5's result exactly, verified across all six frames. Left-aligned on the content grid at x=168/24/16, `[ ?? ] UNCHARTED` bracket eyebrow, `No such world` with the live-green square period, the bleeding ghost `??` at 5% opacity, `← BACK TO WORLD 00 — HOME`. It is the site's move in the site's grammar and it is the same page in both themes. (The large square forms under each `?` are the question marks' own dots at display size, not a clipping artifact — checked at 1440, 768 and 375.)

space 7: at 768 the content block occupies 245px of a 1024px viewport. That is a deliberate centring with air, but it is the emptiest page in the build. The recovery link — the page's only job — is 13px mono, the smallest actionable element on it.

The 404's sibling error surface does **not** match it (defect 7).

---

## Round-6 change verification

| Change | Status | Evidence |
|---|---|---|
| home — hero stat relabel "commits AI-authored, not mine — the point." | **LANDED @1440 only** | `home-dark-1440.png` / `home-light-1440.png`; absent below `lg` — defect 1 |
| home — wire header gains `❚❚ pause` | **LANDED** | all 4 wire crops + all 6 home frames; `wire-pause.tsx:23–36` confirms 24px target, `aria-pressed`, lucide icon, `--ring` focus |
| home — facts rail dt = muted / dd = foreground, no alpha | **SOURCE-VERIFIED** | `world-chapter.tsx:117`, `operator.tsx:49–55`; **no chapter frame this round** — unverified in pixels |
| home — world 03 pill `inline-block`, own leading | **LANDED, CLEAN** | all 4 `crop-w3-lozenge-*` — the lozenge clears the descenders of `gtheme, for` in both themes at 1440 and 375; heading leading reads ~1.06. Panel I58 closed |
| home — world 00 gains a 5th fact row (stack) | **UNVERIFIED** | no chapter frame at any width |
| home — operator gains "based in" / "shipping since" rows | **SOURCE-VERIFIED** | `operator.tsx:63–75`; not in any frame |
| home — stat card per-repo sub-totals + longer verify command | **SOURCE-VERIFIED, DEFECT** | `operator.tsx:138–148`; not in any frame — see defect 5 |
| home — header theme toggle beside the live chip | **LANDED** | all 24 frames at ≥768, all six routes: sun in dark, crescent in light, no exceptions. **This also settles round 5's low-confidence glyph note** — every light frame carries the crescent, every dark frame the sun; there is no wrong-state icon on any route |
| uw — body-size argument prose | **LANDED** | `work-ultraweb-dark-768.png` / `-light-768.png` — "Purple gradients, three icon-cards, glassmorphism smeared over a template…" reads at body size beside the `01` numeral. Amendment I48 satisfied |
| uw — timeline line under the eyebrow | **LANDED, DEFECT** | all 6 uw frames — see defect 4 |
| uw — rendered mockup figure as a third split | **LANDED (dark@1440 only)** | `crop-uw-figure-dark-1440.png` — hairline frame, Fraunces-italic terracotta caption naming the file and the render width. The §imagery documentary exception used exactly as written. Light and narrow renderings unverified |
| uw — longer link labels | **LANDED** | `ultraweb repo on GitHub ↗` in the hero meta row; `ultraweb-site, the live proof ↗` at `ultraweb/page.tsx:231` (below fold) |
| hm — v3.1 facts (12 hooks · 4 agents) | **LANDED** | all 6 hardmode frames; version string inconsistent with the timeline line (see hardmode note) |
| hm — timeline line | **LANDED, DEFECT** | all 6 hardmode frames — see defect 4 |
| hm — two identifier tables after "The floor" | **1 of 2 CAPTURED** | `crop-hm-hooks-table-dark-1440.png` — clean. Second table, both light renderings, and 768/375 behaviour of a 3-column table all unverified |
| ds — "Empfänger und Drittlandtransfer" block + nav entry | **NAV ENTRY LANDED; BLOCK UNVERIFIED** | rail entry in all 4 frames at ≥768; the cross-reference lands in the hosting paragraph. The block itself is below the first viewport |
| 404 — own title | **UNVERIFIED** | frames carry no browser chrome |
| 404 — footer without the live fraction | **UNVERIFIED** | the footer is below the fold at all three widths |

---

## Banned-list sweep — antislop screenshot checks 12–17

**antislop-12 — three identical icon-cards in a features row: PASS.** The only 3-ups in the build are the two case-study stat trios (`app/(site)/work/ultraweb/page.tsx:198`, `app/(site)/work/hardmode/page.tsx:255`), rendered as `bracket-frame p-5` with a `text-5xl` numeral over a mono caps label. Zero icons, no filled card boxes, and the content is the data itself — this is Framed Data, the pattern DIRECTION cites (Orano). The footer's three columns are a nav, not cards. Both trios are below the first viewport, so this is a source-grounded ruling, consistent with round 5's.

**antislop-13 — wallpaper rhythm (fewer than two distinct section paddings, no compression/release): PASS.** home carries four distinct section rhythms — hero `pt-40 pb-16`/`md:pt-48 md:pb-24`, wire `py-6`, chapters `py-20 md:py-28`, operator `py-28 md:py-40`. Both case studies carry `py-8`, `py-14`, `py-16 md:py-24`, `py-20 md:py-28`. The compression (wire) and the release (operator) are visible in-frame, not merely declared. **Weakest case, named:** both legal routes are a single section (`pt-36 pb-24`) whose internal block gaps measure 41 / 58 / 41px at 1440 — variation by accident rather than by design. Still a pass; it is the thinnest instance in the build.

**antislop-14 — all-centered symmetry, no deliberate asymmetric moment: PASS.** Every judged route is left-aligned on the content grid at every width. `text-center` appears exactly twice in the tree: the footer's ghost wordmark and `app/(site)/error.tsx:10` (not a judged route — see defect 7). Deliberate asymmetries visible in-frame: the hero's 7/5 split with the framed stat as counterweight (1440), the 3/9 margin-note grid on both legal routes, the bleeding ghost `§` and `??` glyphs breaking the right edge, and the world-03 light chapter inverting against a dark page.

**antislop-15 — dark-navy AI-startup template look: PASS.** The ground is `oklch(0.14 0.01 280)` — near-black with a trace of violet, not navy. No glow, no gradient, no neon, no glassmorphism beyond the one SYSTEM-declared sticky header. The accents are terracotta, hazard yellow, GNOME blue and chrome-white, each scoped to a world, and light mode is a full re-decision rather than an inversion filter. DIRECTION bars this look by name and the build honours it.

**antislop-16 — untouched shadcn look: PASS.** Radii are the Sharp scale (0.125–0.5rem), not the shadcn 0.5rem default; the palette is an authored OKLCH system with AA-verified pairs; the type is Space Grotesk / Fraunces / IBM Plex Mono with no Inter anywhere; inputs are hairline rectangles on `--input` with a world-tuned focus ring; resting surfaces carry no shadow at all (elevation is +0.03 L, per §depth). The two shadow tokens exist and are scoped to transient overlays.

**antislop-17 — reflexive bottom-right chat bubble; consent banner with Accept primary and Reject buried: PASS.** No chat widget of any kind exists in the tree (no intercom/crisp/drift, no floating button). No consent banner exists because the site sets no cookies — the Datenschutzerklärung states it in its own lede — so there is no Accept-primary/Reject-buried pattern to grade. This is the honest form of the pattern: no banner because no tracking.

**Other constitution tells, swept:** no gradient anywhere, no gradient headline text, no emoji in production copy (the `❚❚`/`▶` are lucide vector icons, `⟶`/`←`/`↗`/`○`/`●` are typographic marks in a mono face), no dead startup copy, no `href="#"`, no lorem, no fabricated social proof (`253 / 255` renders from one server-side source and the verify command is published beside it), no uniform `rounded-xl + shadow-lg`, no staggered-fade-on-everything. **Clean, second round running.**

---

## gate-responsive check 8 — each route deliberate at 375 / 768 / 1440

- **home: VIOLATION — home@768.** The hero's framed stat is `hidden … lg:block` (`components/sections/hero.tsx:43`); the tablet hero is the 1440 composition with its counterweight deleted and the right half of the container empty. Squeezed, not designed.
- **work-ultraweb: PASS.** The hero re-flows from 3 lines at 1440 to 3 at 768 to 3 at 375 with the Fraunces italic line intact; the evidence panels move from edge-bleed at `lg` to in-container at `xl` and stack cleanly at 375; the margin-note numeral column survives at 768.
- **work-hardmode: PASS.** Hazard stripe, H1 and prose all re-flow deliberately; the failure-mode list keeps its `4.5rem` numeral column at 768 and stacks at 375.
- **impressum: VIOLATION — impressum@768.** The 3fr rail collapses to ~165px, orphaning `· LEGAL` and `WELTEN` onto their own lines.
- **datenschutz: VIOLATION — datenschutz@768.** The same rail collapse, plus the ghost `§` running under the H1's final letters.
- **notfound: PASS.** Left-aligned on the grid at all three widths, ghost `??` clears the H1 at each, single-column at 375.

---

## Ranked defects

**1. The hero's Framed Data counterweight is deleted below 1024px, not re-composed.** `components/sections/hero.tsx:43` — `hidden h-fit p-7 lg:block`. At 768 the H1 uses 370 of 744 content pixels and the right half of the hero holds nothing; the `253 / 255` claim, which DIRECTION names as this site's Type-as-Evidence moment, is absent from the first viewport on the entire tablet class and returns only at the foot of the page. **Fix:** render the card at `md` beneath the subhead (or as a full-width band above the wire), rather than hiding it — the pattern is Framed Data, and it survives being stacked. Owner: **gate-responsive** (with type-scale for the number's step at md). Frames: `home-dark-768.png`, `home-light-768.png`.

**2. The ghost `§` collides with the Datenschutz H1 at 768, in both themes.** `app/(legal)/datenschutz/page.tsx:38` — `text-[clamp(10rem,24vw,20rem)]` at `right-[-0.06em]` puts a 184px glyph at x≈657–779 while `Datenschutzerklärung` runs to x≈731. The largest element on the page overlaps its own decoration at exactly one breakpoint. **Fix:** lower the vw term (or cap at `md`) so the glyph clears the prose column at every width — the same clamp on `not-found.tsx:36` clears its H1 because that title is shorter, which is luck, not design. Owner: **shape-language** (motif placements). Frames: `datenschutz-light-768.png`, `datenschutz-dark-768.png`.

**3. The legal rail orphans two lines at 768 on both legal routes, both themes.** `app/(legal)/datenschutz/page.tsx:42` and the identical grid on impressum — `md:grid-cols-[3fr_9fr]` with `gap-x-12` leaves ~165px for a 22-character tracked mono eyebrow, so `[ § ] WORLD 00 · LEGAL` breaks into `[ § ] WORLD 00` / `· LEGAL` and `← ZURÜCK ZU DEN WELTEN` strands `WELTEN`. A line opening with a separator glyph is an error, not a wrap. **Fix:** hold the 3/9 split only from `lg`, or widen the rail column at `md`. This is the single edit that takes both legal routes' craft 6→7. Owner: **gate-responsive**. Frames: `impressum-dark-768.png`, `datenschutz-light-768.png`.

**4. The new timeline line runs at ~140 uppercase mono characters and is typographically identical to the spec line above it.** `app/(site)/work/hardmode/page.tsx:82` and the matching line on `app/(site)/work/ultraweb/page.tsx` — same face, size, case, tracking and colour role as the `PYTHON · 12 HOOKS · …` row 12px above it. At 1440 it fills the container and orphans a two-word line; at 375 it stacks four lines under a three-line spec row, producing six or seven consecutive lines of 11px caps mono that read as one undifferentiated slab. §type caps body measure at ≈70 real characters; this is double it. **Fix:** constrain it to the `56ch` measure the prose above already uses and differentiate it — sentence case, or a rule, or the muted/foreground pair the amendment established for the facts rails. Owner: **type-scale**. Frames: `work-ultraweb-dark-375.png`, `work-hardmode-dark-1440.png`.

**5. The verify command wraps mid-token.** `components/sections/operator.tsx:145` — `<code className="block max-w-full break-all whitespace-pre-wrap">`. `break-all` breaks at any character, so `git log --no-merges -i --grep='co-authored-by: claude' --oneline | wc -l` (74 chars) splits mid-flag inside a ~359px card. Its longest single token is 23 characters and fits, so `break-words` / `overflow-wrap: anywhere` would wrap at the spaces and never split a flag. This is the one string on the site whose entire purpose is to be read and re-run. **Unverified in pixels — no frame in this round shows the operator stat card.** Owner: **taste** (craft in the last 2%).

**6. `opacity-70` on 11px uppercase mono survives in every world chapter — the pattern the 2026-09-07 amendment banned for text.** `components/sections/world-chapter.tsx:41` and `:48` — the `LiveLine` (`● pushed 4 d ago` / `○ github unreachable — retrying`) sets hierarchy by alpha on the inherited world foreground. The amendment fixed the `dt`/`dd` pair in the same component (the comment at `:117` records it) and missed these two. World 03's light chapter is the risky pair: ink at 70% over its light ground lands near the 4.5:1 line for 11px text. **Fix:** the same muted-token/foreground-token pair used for the rail. **Unverified in pixels — no chapter frame this round; contrast must be re-measured rendered, not eyeballed.** Owner: **color**.

**7. The error boundary does not share the 404's grammar.** `app/(site)/error.tsx:10` — `flex min-h-svh flex-col items-center justify-center px-6 text-center`. It keeps the `[ !! ] FAULT ON THE WIRE` bracket eyebrow, then centres everything, drops the ghost glyph, drops the content-grid alignment and offers only `Try again`. Round 5 rebuilt the 404 left-aligned on the grid with a bleeding ghost `??` specifically to close this axis; the sibling error surface was not brought with it, and it is now the only centred layout in the build. INVARIANTS 7 (404/contact/archive match the homepage) and the constitution's "craft the corners" both name this. **Not in the frame set.** Owner: **taste**.

**8. The wire panel's only control reads as a label, and its header breaks badly at 375.** `components/wire/wire-pause.tsx:27` gives the pause button the same `text-2xs text-muted-foreground` as the static `updated 4 d ago` immediately left of it, with no border, box or underline at rest — so the WCAG 2.2.2 control the panel gained this round is visually indistinguishable from status text until hover. Separately, at 375 the header wraps as `THE WIRE — ALL` / `WORLDS, AS IT HAPPENS`, stranding the em dash. **Fix:** give the button the resting affordance the `LIVE` chip already demonstrates (hairline box), and let the header break after `THE WIRE`. Owner: **motion-language** (the live region's controls) with states for the affordance. Frames: `crop-wire-dark-375.png`, `crop-wire-light-1440.png`.

Stopping at eight. Everything else I looked for — the chapter bottom bands, the operator's empty upper-right quadrant, the legal pages' near-uniform block rhythm, the 404's small recovery link, the illegible interior of the ultraweb mockup figure, the `V3.1.0`/`V3.1` mismatch on hardmode, and the `ultraweb-`/`site` footer wrap at 768 — is priced into the scores above and named in the per-page notes, not padded into this list.

---

## Verdict

**FIX-THEN-SHIP.**

Thirty-four of thirty-six cells clear the ≥7 bar and the banned-list sweep is clean for the second round running — but two cells sit at 6 (impressum craft, datenschutz craft), and a page under 7 on any axis cannot get SHIP. The round's four named surfaces all landed and three of them landed well: the world-03 pill is fixed and clean in all four crops, the hooks table is the best new instrument on the site, and the documentary figure uses the §imagery exception exactly as written. What the round did not do is protect the corners it opened — the legal 768 breakpoint and the tablet hero — and the two additions that hurt (the timeline line's measure, the hero card's disappearance below `lg`) are both one-line fixes.

**The three fixes that move the verdict:**
1. **Defect 3** — hold the legal 3/9 split from `lg`, or widen the rail at `md`. One edit; takes both legal routes' craft 6→7, clears two of the three responsive-8 violations, and puts every cell over the bar.
2. **Defect 2** — clamp the ghost `§` so it clears the H1 at 768. One value.
3. **Defect 1** — re-compose the hero stat at `md` instead of hiding it. Takes home hier 7→8 and clears the last responsive-8 violation.

**Two frames the Lead should look at directly:** `qa/visual/round-6/datenschutz-light-768.png` (the rail orphan and the `§` collision in one view) and `qa/visual/round-6/home-dark-768.png` (the empty tablet hero).

---

## Evidence gaps — reported, not guessed

No frame exceeded 900px, so nothing was unjudgeable for height and no frame was missing from the declared 36. The gap is one of **coverage**, and it is large enough to name precisely: every frame is a first viewport, so most of the surfaces this round changed were not photographed.

- **The signature move's own surfaces are unphotographed.** None of the four world chapters appears in any frame at any width or theme. The world-03 pill crop is the only chapter evidence in the round. That means the 5th world-00 fact row, the dt/dd token pair in all four rails, the `LiveLine` alpha (defect 6), and the chapter grounds themselves are judged from source only.
- **The operator block is unphotographed except its form.** The four `<dl>` rows, the stat card's per-repo sub-totals and the wrapped verify command (defect 5) appear in no frame. `crop-operator-card-*` shows the contact form only.
- **No footer appears in any frame** at any width or theme — including the 404's new footer-without-the-live-fraction, which was a named change this round.
- **`crop-w3-lozenge`** has no 768 pair; **`crop-uw-figure`** and **`crop-hm-hooks-table`** exist in dark@1440 only. A brand-new three-column table has no evidence at 768 or 375 in either theme, which is exactly where a three-column table fails.
- **The 404's page title** cannot be verified from frames that carry no browser chrome.
- **The Datenschutz "Empfänger und Drittlandtransfer" block** is below the first viewport; only its nav entry and its cross-reference are verified.

Judged as stipulated, unchanged from round 5: the scroll signature cannot appear in statics; dark leads; the wire and stat data are real. The static reduced-motion edition was scored as a first-class deliverable on its own — which is where defects 1, 2, 3, 4 and 8 come from.
