# Direction — Neo-grotesque Minimal chrome (dark-leading) + twist: theme-worlds anthology
**Why this, for this brief:** The brief's subject is one operator directing agents across wildly different projects — so the site is an anthology: near-black, disciplined chrome (Space Grotesk, hairlines, mono labels) holding full-bleed worlds, each project in its own palette and type. The tone tension "machine-grade but human" lives in exactly that contrast: cold chrome, worlds with personality. Dark-leading is justified in writing: the user's explicit CP2 verdict ("darker, atmospheric, a world not a page") plus an authentic dark personal brand (cyberpunk/solarpunk desktop work) — not the banned AI-startup template; no glow-navy, no gradient headlines, and the runner-up terminal look is barred below.

**Signature move:** "Entering a world" — homepage `/`, the four world chapters. As the visitor scrolls into a chapter it expands to swallow the full viewport (scroll-driven, CSS animation-timeline first, motion/react where scrubbing needs JS); simultaneously the site chrome TUNES itself to that world (nav, selection color, scrollbar, focus rings take the world's accent). The expanded state carries the repo link and deeper live repo data (languages, recent commits, proof line). Budget: this one scroll choreography plus the chrome tuning IS the entire spectacle budget — one move, site-scale, everything else stays disciplined. Reduced motion: chapters render fully expanded, statically stacked, chrome tuning still applies per section (it's a color change, not motion). [user, CP2 R3 notes]

**The worlds (recorded set dressing, from the approved mockup):**
- 00 — this site: void chrome oklch(0.14 0.01 280), Space Grotesk; the live wire; self-verifying claims
- 01 — ultraweb: warm-black oklch(0.18 0.012 60), terracotta oklch(0.68 0.14 45), Fraunces italic display — the project's real brand
- 02 — hardmode: near-black oklch(0.15 0 0), hazard yellow oklch(0.85 0.16 95), mono caps, hazard-stripe edge
- 03 — gtheme: soft light oklch(0.93 0.02 250), GNOME blue oklch(0.6 0.14 250), rounded pill accents — the one LIGHT world (the anthology's deliberate asymmetry)
"More spectacle per world" is commissioned: Phase 6 dresses each world 20% past comfortable within its own palette (texture, scale, per-world type gesture) — but never a second site-scale move.

**Type stance:** Space Grotesk (chrome + world 00/03 display), IBM Plex Mono (wire, labels, data, hardmode display), Fraunces (ultraweb world display + operator italics). Hero ≥3.5× body, clamp()-fluid. No Inter.

**Color stance:** ground = void oklch(0.14 0.01 280); chrome text oklch(0.91 0.01 280); ONE working accent for interactive chrome = the current world's accent (the tuning), defaulting to chrome-white at rest. World palettes as above, each internally one-accent. Light mode exists as a first-class re-decision (world 03's values seed it), but dark leads.

**Motion stance:** micro 150–250ms; world-entry expansion is the single section-scale choreography (scroll-scrubbed); wire events arrive with one 250ms slide+fade (semantic motion — a real event happened); nothing else animates on scroll. One easing family (expo-out). `prefers-reduced-motion`: full content, static, zero scrubbing.

**Live mechanic (the brief's core, carried by the direction):** webhook→SSE wire, per-world accent-colored events; authorship stat recomputed server-side across monitored repos (223/225 at last check) with the verification command displayed; the portfolio's own repo is monitored — world 00 reports its own build.

**References:** One Material World inverted (many worlds, one spine — Nomadic Tribe's conviction per world); Shared-Element Lift + Scroll-as-Journey for the world-entry move (Igloo's route grammar, applied in-page); Type as Evidence for the stat card (Orano). Qualities to chase, never surfaces to copy.

**We will NOT:**
1. The Machine Hall (A2) or any persistent WebGL/canvas scene — no set-design, no showpiece; the spectacle is DOM/CSS/scroll only.
2. The Overgrowth (C2) generative canvas — retired with its round.
3. Data-Dense instrument, Editorial dossier, Brutalist receipts (R1 seats) — retired by verdict.
4. The typeable-terminal / warm-black Dark Tech look — ultraweb-site.vercel.app already owns it; this site may not echo it.
5. NightCityMP anywhere on the site. [user, CP2 R2]
6. Purple-blue gradients, gradient headline text, glassmorphism smears, emoji icons, uniform py-24 rhythm — constitution bans, no exceptions taken.
7. A second animation engine (no anime.js — no SVG choreography commissioned) and no AI chat widget.
8. Star counts as headline metrics (real counts are 0–1; cadence and substance lead).
