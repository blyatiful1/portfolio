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
