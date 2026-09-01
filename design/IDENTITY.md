# Identity — Iwan Braun
**Origin:** invented starting mark (logged in BRIEF.md §Assumed facts — the user may replace it; documented for a successor to extend). Generated from real Space Grotesk 700 outlines (fontTools instancer, wght 700), not traced, not image-model output.

## Construction
- Wordmark: `IWAN·BRAUN` — Space Grotesk 700 (the committed display face), caps, tracking −0.02em at 100-unit reference size. One path per letter, stable IDs (`lt-0-i` … `lt-9-n`), animation-ready.
- Custom cut (the ONE decision): the word divider is a **square interpunct** (`#dot-live`), side = the I's stem width (132 units), optically centered on cap-midheight. On the live site it may take `--live` color while the wire is streaming — the brand carries the site's pulse. Everything else stays Space Grotesk as drawn.
- Monogram: `IB` — the same I and B outlines, gap 90 units, square viewBox (1181²); **the B's lower counter is replaced by a 172-unit square** — the interpunct gesture as negative space at favicon scale. IDs `mono-i`, `mono-b`.

## Geometry
- x = the I stem width (132 units of the 1000-upm master).
- Clear space 1.5x all sides · min wordmark width 140px (verified legible at 180px; below 140 the interpunct muddies) · min monogram 16px (verified) · print 20mm.

## Color
`currentColor` throughout, `fill-rule="evenodd"` · accent role: `#dot-live` may take `--live` (site chrome only, never in print/mono) · mono = the same 1-bit files (`wordmark-mono.svg` is the identical single-color mark, kept for pipeline contract).

## Misuse
- Never re-set in Fraunces or Plex Mono — the mark is chrome, and chrome is Space Grotesk.
- Never a round interpunct — the square IS the mark.
- Never place the wordmark inside a world chapter's accent field (it lives on chrome surfaces).
- Never rotate, arc, outline, or shadow.
- Never color individual letters with world accents — only `#dot-live` may ever change color, only to `--live`.
- Never rebuild the monogram by cropping the wordmark's I — it has its own gap and counter cut.

## Files
design/brand/ (→ moved to public/brand/ at scaffold): wordmark.svg · wordmark-mono.svg · monogram.svg
components/brand/ (authored in Phase 5/6): wordmark.tsx · monogram.tsx · og-template.tsx — og-template: void ground, monogram top-left 96px, title Space Grotesk 72/1.05, the square dot in `--live`, per-route strings passed in by seo.
Verification: rendered 16/32/64/180/320px, dark + light-world grounds, 2026-09-01 (brand-preview screenshots).
