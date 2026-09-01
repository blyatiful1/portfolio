# Sitemap — iwanbraun.dev

## Pages
| Page | Route | Purpose (one sentence) | Conversion goal | Nav |
|---|---|---|---|---|
| Home | / | The four-worlds living index: identity, live wire, one expanding chapter per world, operator block. | Contact (Work with me) | header (anchors) |
| ultraweb case study | /work/ultraweb | Deep-dive into the design studio that built this site — the recursive proof for technical screeners. | Contact (exit: repo ↗) | via world 01 |
| hardmode case study | /work/hardmode | Deep-dive into the discipline floor — how the agents are held to a standard. | Contact (exit: repo ↗) | via world 02 |
| Impressum | /impressum | DACH-mandated §5 DDG provider identification (German resident; defensive include per BRIEF §Compliance). | — | footer/legal |
| Datenschutz | /datenschutz | GDPR Art. 13 notice — contact form processing, webhook/log data, no cookies beyond theme preference. | — | footer/legal |

No /work index (2 items — home IS the index; hardcoded routes, no [slug]). gtheme gets no case study — world 03 exits to GitHub ↗ [user, interview R1 scope]. World 00's "audit the build ledger" exits to the portfolio's own GitHub repo ↗ (ship-time: repo must be public — added to assumed facts). No /barrierefreiheit: BFSG out of scope — no consumer contracts concluded online, individual with 0 employees (microenterprise); reasoning recorded per EAA rule, gate-accessibility re-derives.

## Navigation
Header (glass, chrome-tuned): Worlds → /#worlds · Operator → /#operator · [● live chip] + CTA: Work with me → /#contact
On /work/*: ← All worlds → / · same CTA. Active-state: exact for /, prefix for /work/*.
Footer: worlds: ultraweb case study, hardmode case study, gtheme ↗, GitHub profile ↗ · site: build ledger ↗, ultraweb-site ↗ (built by world 01) · legal: Impressum, Datenschutz.

## Route tree
app/
  (site)/page.tsx                    ← home
  (site)/work/ultraweb/page.tsx
  (site)/work/hardmode/page.tsx
  (legal)/impressum/page.tsx
  (legal)/datenschutz/page.tsx
  api/github/webhook/route.ts        ← webhook receiver (not a page)
  api/wire/route.ts                  ← SSE stream (not a page)
  not-found.tsx                      ← designed 404: "no such world" (build: routing)
  error.tsx                          ← honest failure, wire degrades gracefully (build: routing)
Segments needing loading.tsx: /work/* (light skeleton). (build: routing)

---

# Part 2 — Section blueprints

Site-level: header — skill: navigation — variant: slim-bar, glass (the one glass surface), chrome-tuned to active world — density: wordmark + 2 anchors + live chip + 1 CTA — job: orient, pulse, ask.
Site-level: footer — skill: footer — variant: columnar sitemap (3 groups per part 1) + monogram closing — density: 3 groups ≤4 links each + mono wordmark + legal line — job: exits, obligations, one last wink.

### / (Home) — goal: contact (Work with me)
1. hero — skill: hero — variant: typographic — density: H1 ≤6 words + sub ≤30 words + scroll-hint (no CTA button: the header carries the ask; the page IS the argument) — width: contained — rhythm: open, extra air below — job: state the stance (one operator, four worlds)
2. wire — skill: data-display — variant: live feed panel — density: 5 latest events (time·repo·msg·AI-chip) + streaming status — width: contained — rhythm: tight after hero, quiet neighbor of the signature — job: prove "live" within 10 seconds
3. world-01-ultraweb — skill: feature-sections — variant: world chapter (Lead 7/5, facts rail offset +3rem) — density: eyebrow + H2 ≤7 words + ≤45 words + 4 facts + case-study CTA + live repo strip (languages bar + last 3 commits) — width: full-bleed ground, contained content — rhythm: FULL-VIEWPORT on entry — job: the flagship, entered — SIGNATURE: world-entry expansion — scroll-scrubbed chapter growth to full viewport + chrome tuning, scope: chapters 01→02→03→00 on / (reduced-motion/static fallback: chapters render fully expanded, statically stacked; tuning applies instantly per section)
4. world-02-hardmode — skill: feature-sections — variant: world chapter (as 01, hazard-stripe edge) — density: as 01, proof line = tools/demo.py CI — width: full-bleed — rhythm: same choreography, internals quiet — job: the discipline, entered
5. world-03-gtheme — skill: feature-sections — variant: world chapter, THE LIGHT ONE (page's macro-asymmetry) — density: as 01 minus case-study CTA (GitHub ↗ exit) — width: full-bleed — rhythm: the palette inversion is the moment; internals quietest — job: the gentle one, entered
6. world-00-site — skill: feature-sections — variant: world chapter (chrome ground = void-2) — density: eyebrow + H2 + ≤50 words + 4 facts + build-ledger ↗ + self-referential wire line — width: full-bleed — rhythm: closes the loop, compressed — job: the recursion, stated plainly
7. operator — skill: feature-sections — variant: split 7/5 with stat card (Framed Data) — density: H2 + ≤80 words + 3-line what-I-bring list + 223/225 stat card w/ verify command + 2 CTAs (mailto primary, GitHub ghost) — width: contained — rhythm: release before the ask, double air — job: the human, the ask
Mobile: chapters stack (expansion becomes fade-through states, facts rails fold under copy); wire drops msg column; operator stat card moves above the list; nothing reorders otherwise.

### /work/ultraweb — goal: contact (exit: repo ↗)
1. case-hero — skill: hero — variant: editorial-offset, world-01 dressed (Fraunces) — density: eyebrow + H1 ≤8 words + standfirst ≤35 words + repo facts line — width: contained — rhythm: open — job: what this is, why it matters
2. the-problem — skill: feature-sections — variant: numbered editorial list — density: 3 items ≤25 words (why AI sites are slop; what a studio does; why install one) — width: narrow — rhythm: compressed — job: name the enemy
3. how-it-works — skill: feature-sections — variant: alternating split — density: 2 splits (interview→mockups→pipeline; gates+checkpoints) ≤40 words each + real design/*.md excerpts as media — width: full-bleed media — rhythm: offset, media bleeds right — job: show the machine
4. the-recursion — skill: data-display — variant: stat block — density: 3 stats (skills count, phases, this-site's gate results LIVE) + 1 line: "this page is output of the process it describes" — width: contained — rhythm: air — job: the proof is the page
5. next — skill: feature-sections — variant: full-width closer — density: repo ↗ + ultraweb-site ↗ + Work with me + ← hardmode — width: full-bleed — rhythm: double space before — job: exits
Mobile: 3 stacks media-first; 4 drops to 2 stats.

### /work/hardmode — goal: contact (exit: repo ↗)
1. case-hero — skill: hero — variant: typographic, world-02 dressed (mono caps) — density: eyebrow + H1 ≤8 words + standfirst ≤35 words — width: contained — rhythm: open — job: the thesis (advice loses to momentum)
2. failure-modes — skill: feature-sections — variant: numbered editorial list — density: 4 items ≤20 words (the repeatable agent failures) — width: narrow — rhythm: compressed — job: name the enemies
3. the-floor — skill: feature-sections — variant: alternating split — density: 2 splits (hooks that can't be talked out of; verifiers with no loyalty) ≤40 words + real hook-output excerpts — width: full-bleed media — rhythm: offset — job: show the enforcement
4. proof — skill: data-display — variant: stat block — density: 3 stats (hooks, agents, CI: demo.py planted-failure run) — width: contained — rhythm: air — job: it blocks what it claims
5. next — skill: feature-sections — variant: full-width closer — density: repo ↗ + Work with me + ← ultraweb — width: full-bleed — rhythm: double space — job: exits
Mobile: 3 stacks media-first.

### /impressum · /datenschutz — goal: —
Single prose sections — skill: copywriting (headed plain-language structure per sitemap legal rules) — width: narrow (prose container) — chrome unthemed (world 00). Mobile: as-is.

