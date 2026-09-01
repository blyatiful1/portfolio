# QA — iwanbraun.dev

## Phase 5 — scaffold smoke test (2026-09-01)
- Versions verified live via `npm view` before init; resolved from package-lock: next 16.3.4 · tailwindcss 4.3.3 · motion 13.1.1 · lucide-react 1.38.0 · zod 4.5.4 · next-themes 0.4.6 · radix-ui 1.6.7 (shadcn CLI 4.19.1, style radix-nova). No manifest drift worth noting.
- Dev server: `GET / 200 in 1040ms`, `GET /studio 200` (dev). `npm run build`: EXIT 0, zero type errors, routes: / static, /studio dynamic.
- Deviation (recorded): create-next-app ran in a temp subdir and was hoisted — design/ already lived at project root with the phase-ledger git history; `design/BRIEF.md` verified resolving from project root.
- shadcn init reconciliation: its zero-chroma `:root` overwrite reverted to SYSTEM.md values; its appended `.dark` block DELETED (site is dark-leading — `:root` is dark, `.light` is the re-decision; next-themes defaultTheme="dark"); circular `--font-sans` self-reference fixed; sidebar/chart bridge orphans removed; `--radius: 0.25rem` kept to resolve shadcn's calc chain to the Sharp scale.
- `/studio` is the dev-only construction window: EXEMPT from all gates (gate-antislop, gate-visual, gate-responsive do not measure it); ship's smoke test must get 404 from it in production.
