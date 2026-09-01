# System — iwanbraun.dev (Four Worlds)

## §color

Dark-leading (DIRECTION.md justification recorded). `:root` = dark chrome (world 00); `.light` = a first-class re-decision seeded from world 03's temperament. World palettes are theme scopes (§theme-worlds), each internally one-accent.

### Semantic tokens — dark (default)
| token | value | note |
|---|---|---|
| --background | oklch(0.14 0.01 280) | void chrome |
| --foreground | oklch(0.91 0.01 280) | |
| --card | oklch(0.17 0.012 280) | elevation = +0.03 L, not shadow |
| --card-foreground | oklch(0.91 0.01 280) | |
| --popover / -foreground | oklch(0.18 0.012 280) / oklch(0.91 0.01 280) | |
| --primary | oklch(0.91 0.01 280) | chrome-white; the rest-state accent |
| --primary-foreground | oklch(0.14 0.01 280) | |
| --secondary / -foreground | oklch(0.20 0.012 280) / oklch(0.91 0.01 280) | |
| --muted | oklch(0.20 0.012 280) | |
| --muted-foreground | oklch(0.68 0.015 280) | |
| --accent / -foreground | oklch(0.20 0.012 280) / oklch(0.91 0.01 280) | hover surfaces |
| --destructive | oklch(0.70 0.16 25) | error text on bg verified |
| --border | oklch(0.28 0.015 280) | decorative hairlines |
| --input | oklch(0.50 0.015 280) | ≥3:1 non-text verified |
| --ring | var(--world-accent) | the tuning: focus follows the world |
| --live | oklch(0.75 0.17 150) | wire/live semantics, both themes |
| --shadow-color | oklch(0.10 0.01 280) | for §depth |

### Semantic tokens — light (.light, re-decided)
background oklch(0.965 0.008 260) · foreground oklch(0.22 0.02 270) · card oklch(0.99 0.005 260) · popover = card · primary oklch(0.30 0.03 270) / primary-fg oklch(0.97 0.008 260) · secondary/muted oklch(0.93 0.012 260) · muted-foreground oklch(0.46 0.02 265) · accent oklch(0.93 0.012 260) · destructive oklch(0.55 0.19 25) · border oklch(0.88 0.012 260) · input oklch(0.62 0.02 265) · ring var(--world-accent) · --live oklch(0.50 0.14 155) · shadow oklch(0.30 0.02 265)

### World accents (chrome tuning + chapter scopes)
| world | accent | ground | fg | display note |
|---|---|---|---|---|
| 00 this site | oklch(0.91 0.01 280) | oklch(0.14 0.01 280) | oklch(0.91 0.01 280) | Space Grotesk |
| 01 ultraweb | oklch(0.68 0.14 45) terracotta | oklch(0.18 0.012 60) | oklch(0.92 0.02 75) cream · muted oklch(0.72 0.02 70) | Fraunces italic |
| 02 hardmode | oklch(0.85 0.16 95) hazard | oklch(0.15 0.005 90) | oklch(0.90 0.01 90) · muted oklch(0.72 0.01 90) | Plex Mono caps |
| 03 gtheme | oklch(0.52 0.15 255) interactive · oklch(0.60 0.14 250) large-display only | oklch(0.93 0.02 250) LIGHT | oklch(0.30 0.04 260) ink · muted oklch(0.45 0.03 260) | Space Grotesk, pill accents |

### AA verification (canvas-resolved, Playwright 2026-09-01 — script per color skill)
```
00 fg/bg 15.26 · 00 muted-fg/bg 6.87 · 00 muted-fg/card 6.60 · 00 primary-fg/primary 15.26
00 live/bg 9.55 · 00 destructive/bg 6.96 · 00 input/bg 3.29 (≥3 nontext) · ring(live)/bg 9.55
01 cream/ground 14.87 · 01 terra/ground 6.23 · 01 muted/ground 7.60
02 yellow/ground 12.52 · 02 muted/ground 7.91
03 ink/ground 11.11 · 03 accent-0.52/ground 4.54 · 03 accent/card 5.12 · 03 white/pill-0.52 5.42
03 display-0.60/ground 3.19 (LARGE ONLY — enforced by usage rule above) · 03 muted/ground 6.03
L fg/bg 15.72 · L muted-fg/bg 6.45 · L primary-fg/primary 12.54 · L live/bg 5.00
L destructive/bg 4.83 · L input/bg 3.31
```
Decorative hairline --border (1.36:1) carries no meaning alone — separation is also spacing; inputs use --input.

### CVD (Machado full-severity deut/prot/trit, canvas-resolved)
Risky pair live-green vs destructive-red: deuteranopia Δ=23 (dark) / 35 (light) — narrow. Resolution: SECOND CHANNEL, structural — the two never co-occur on a surface as sole carriers; --live always appears inside a labeled chip ("streaming"/"live", mono text), --destructive always as error TEXT with message. Tritanopia/protanopia clear (Δ≥37). World accents are never meaning-opposed (they encode place, redundant with layout + type + content).

## §type

Pairing: **Space Grotesk** (display + body — chrome, worlds 00/03) + **Fraunces** (world-01 display + operator italics, `axes:["opsz"]`, wght 500 + italic) + **IBM Plex Mono** (wire, labels, data, world-02 display; static 400/500). 2 families + 1 mono — at budget. No Inter anywhere.

- lib/fonts.ts: `Space_Grotesk({ subsets:["latin"], variable:"--font-sans" })` (variable wght; use 400/500/700), `Fraunces({ subsets:["latin"], variable:"--font-display-uw", axes:["opsz"], weight:"variable", style:["normal","italic"] })`, `IBM_Plex_Mono({ subsets:["latin"], variable:"--font-mono", weight:["400","500"] })`.
- Fluid scale (390→1440, tokens skill encodes): body --text-base 16→17px; --text-5xl hero clamp 44→96px (5.6× body at 1440 — clears 3.5× floor); --text-4xl 34→64 (world titles); --text-2xl 24→34; caps labels 11–12px +0.08em wt 500.
- Tracking: SG display ≥40px −0.02em; Fraunces display −0.01em; mono labels +0.08em caps; body 0.
- Leading: display 1.0; world titles 1.02; headings 1.15; body 1.6; wire/mono 1.5.
- `text-wrap: balance` on H1–H3; `pretty` on prose. `font-feature-settings:'kern' 1,'liga' 1,'calt' 1` at display scale.
- Measure: body max 62ch (`--container-prose`).
- Breathing Type: SKIPPED — the signature budget is spent on world-entry; a second glyph-level gesture would break the one-move rule.

## §layout

Containers: `--container-prose: 62ch` · `--container-content: 72rem` · `--container-wide: 88rem` · bleed = deliberate breakout only (world chapters are full-bleed surfaces with content at --container-content).

Splits: **Lead 7/5** (world chapters: narrative vs facts rail) · **Margin Note 3/9** (case-study pages: sticky world-rail beside prose) · 6/6 nowhere.

Rhythm map (homepage): hero release (py-28/40) → wire compressed (py-12/16) → world chapters: each `standard` internally (py-20/28) but full-viewport when expanded (the signature move owns their vertical) → operator release (py-28/40) → footer compressed.

Asymmetry (recurring, 2): **Offset Split** — the facts rail in every chapter starts 3rem below the narrative top edge; **Edge Bleed** — expanded worlds bleed media/texture to the viewport edge on one side. Macro-asymmetry: world 03 is the single LIGHT chapter in a dark page — the anthology's loudest deliberate imbalance.

Offscreen: operator + footer + world 03/beyond wrap in `content-visibility:auto` with measured `contain-intrinsic-size` (measured at build; world chapters exempt while scroll-driven). Dev `<GridOverlay/>` included, dev-only.

## §depth

Stance: **flat-minimal** — hairlines carry resting structure (instrument chrome); shadows only for transient overlays. Dark elevation = lightness (+0.03–0.05 L per level, borders oklch(1 0 0/.08) rising to /.14 at levels 3–4) — already encoded in §color's card/popover steps.

Tokens (tinted hue 280, the chrome neutral):
```css
--shadow-md: 0 1px 2px oklch(0.2 0.03 280 / 0.10), 0 2px 6px oklch(0.2 0.03 280 / 0.12);   /* level 2: scrolled header */
--shadow-xl: 0 4px 8px oklch(0.2 0.03 280 / 0.12), 0 16px 36px oklch(0.2 0.03 280 / 0.20); /* levels 3–4: mobile nav, toasts */
```
(alphas already doubled for dark-first use; `.light` halves them via override.) Level map: 0 sections · 1 wire panel/cards/inputs (hairline border, no shadow) · 2 sticky header once scrolled · 3–4 mobile-nav overlay + form toasts. One level climb per interaction.

Glass verdict: ONE surface — the sticky header (`background: color-mix(in oklab, var(--background) 88%, transparent)` + `backdrop-blur(6px)` + hairline bottom). Justification: it floats over four different world grounds, and translucency is what makes the chrome tuning legible while a world scrolls beneath; recorded here per constitution. No other backdrop-blur site-wide.
Forced colors: every level 1–4 surface + the glass header get `@media (forced-colors: active), (prefers-reduced-transparency: reduce) { border: 1px solid CanvasText; box-shadow: none; backdrop-filter: none; background: Canvas; }`.

## §shape

Personality: **Sharp** — instrument chrome. Tokens: `--radius-sm: 0.125rem · --radius-md: 0.25rem · --radius-lg: 0.375rem · --radius-xl: 0.5rem`. `rounded-full` reserved for pills/badges/status dots — world 03's pill headline accent and the live chips are the lawful uses. Concentric formula (inner = outer − padding) applies in cards and the wire panel.

Motif family: **Rule & bracket** — hairline rules, corner ticks, plus-grid ground. Placements (≥3): the wire panel's ruled frame; every chapter's facts-rail left rule; world-number corner brackets (`[ 01 ]`) in chapter eyebrows; footer hairline grid. Parametric world dressing (recorded knobs): hardmode hazard stripe — period 44px, band 22px, angle −45°; chrome plus-grid — cell 32px, mark opacity 4%.

Dividers: space + surface changes (chapters ARE the dividers). Hairlines: 1px foreground at 10% alpha, full-width or 2.5rem accent rule under headings. No `<hr>`, no wave SVGs, no blobs.

## §imagery

Stance: **pure type/data/graphic — zero photography, zero stock, zero AI-image slop.** The site's imagery is its live data made visible (per DIRECTION): language bars, commit sparklines, activity pulses — all generated from real repo data as inline SVG (data-display owns marks). No human face photo unless the user supplies one later (slot noted for handoff, not faked).

Texture kit (all data-URI CSS, pointer-events none):
- Grain: feTurbulence baseFrequency 0.8, 4 octaves, stitchTiles; opacity 0.05, blend soft-light — on world 01/02 grounds only (atmosphere), never on the light world.
- Chrome plus-grid lattice: 32px cell, plus marks at 4% fg alpha — hero + operator grounds.
- World 03 mesh: 3 radial gradients from the gt ramp (0.60/0.14/250 at .12, 0.80/0.06/230 at .18, white) — soft, alpha ≤0.2; no purple-blue anywhere.
- Ceiling: one treatment + grain max per surface.

Every SVG authored animation-ready (one path per animatable element, stable IDs, no baked transforms) per shape-language rules; SVGO preserves IDs.

## §motion

Intensity: **3 (Theatrical), scope-locked** — DIRECTION.md names the one theatrical grant: the world-entry expansion (scroll-driven, pinned/scrubbed). Everything outside it behaves at level 1–2 discipline. Rationale: portfolio energy budget + the signature move is scroll choreography by definition.

Easing family: **Decisive** — `--ease-out: cubic-bezier(0.22,1,0.36,1)` (entrances/hover) · `--ease-in-out: cubic-bezier(0.83,0,0.17,1)` (moves/expansion) · `--ease-in: cubic-bezier(0.64,0,0.78,0)` (exits). Durations: `--dur-micro: 200ms · --dur-small: 320ms · --dur-section: 560ms`. lib/motion.ts mirrors identical values (seconds/arrays). Raw numbers exist ONLY in globals.css + lib/motion.ts.

Choreography plan (homepage):
- Hero: headline is LCP — renders static, zero-delay; only the scroll-hint fades in (once).
- Wire: each ARRIVING event slides in 250ms --ease-out (semantic — a real push happened); no idle animation. Initial render static.
- World-entry (THE move): as a chapter crosses the viewport it expands to full viewport — scroll-position-mapped (CSS animation-timeline view() first; motion useScroll only if scrub-smoothing demands it), transform/opacity/clip-path only; chrome tuning switches at chapter midpoint (200ms color transition — color, not movement). One chapter mid-choreography at a time.
- Chapter internals: one once-only reveal per chapter (heading → copy → facts rail, stagger 60ms, cap 6).
- Operator/footer: single fade+8px rise, once.
- Case-study pages: reveals at level 1 discipline; no pinning off-homepage.
- NEVER: focus outlines, body text mid-read, form inputs, theme switch crossfade (disableTransitionOnChange), ambient loops (none granted).

Reduced motion (two layers, CSS @media no-preference + useReducedMotion): worlds render fully expanded, statically stacked; wire events appear instantly (opacity 150ms max); chrome tuning still applies per section but transitions are dropped (instant color). Zero scrubbing, zero pinning.

## §theme-worlds

Two mechanisms, two axes — reconciled with the accent-only law:
1. **The chrome tuning = the lawful world.** `[data-world="uw|hm|gt|me"]` re-points ONLY `--primary`, `--primary-foreground`, `--ring`, `--accent`, `--selection` to that world's verified accent pair. Applied as static server-rendered attributes on chapter `<section>`s; the sticky header's *visual* tuning follows the active chapter via scroll-driven `animation-timeline` flipping a `--world-accent` var (no JS state, no provider). Nested/adjacent scopes resolve by cascade proximity.
2. **Chapter grounds = section surfaces, not worlds.** Each chapter paints its authored ground/fg from `--w1-*`/`--w2-*`/`--w3-*` tokens (§color table) as an ordinary full-bleed section background — identical in both modes (content-authored surfaces, like imagery), all pairs AA-verified above. `--background`/`--card` are never overridden.
World count: 4, each justified by content (three projects + the self-monitoring site) — none decorative. AA: verified in §color for every world pair, both the dark chrome and `.light`.

