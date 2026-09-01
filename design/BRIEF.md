# Brief — iwanbraun.dev (working name)
Deployment mode: production

## Site type & energy budget
Portfolio (developer, hireability). Energy budget per the constitution: the site IS the portfolio — spend boldly. The real-time GitHub organism is itself the proof-of-skill artifact.

## Audience
Lena, 41 — engineering lead at a mid-size German software company, screening applications between meetings. Opens the link from an application email on her laptop and gives it 90 seconds before deciding whether Iwan gets 30 minutes. Distrusts: template portfolios (she has seen fifty AI-generated ones this quarter), buzzword skill lists, claims without commits. What convinces her: evidence of sustained self-directed building — and a site that is itself a working demonstration of the candidate's engineering.
Secondary reader: a non-technical recruiter on a phone — the 60-second scan path (who, what, how to contact) must survive without the spectacle.

## Goals
Primary conversion: contact — a "work with me" path (contact form + email) leading to interviews.
Secondary: GitHub profile visit (github.com/blyatiful1).
Success: a screener leaves believing "this person ships relentlessly, and the proof updated itself while I watched."
Load-bearing stance [user, CP1]: the AI-native workflow is the SUBJECT, stated bold and true, never hedged — "I direct AI agents; they write the code. That is the point, not a disclaimer." The site's job is to show what that produces when held to a standard.

## Tone
Precise, obsessive, wry. Tension pair: machine-grade but human.
Sample sentence: "Every commit on this page arrived on its own — I built the pipeline; GitHub does the talking."
Voice source: the user's GitHub profile README — direct, evidence-first, self-aware ("Whether that's worth much is a fair question — these repos are exactly where you'd check"). Copywriting matches it.

## Pages
- `/` — the living index: identity, the real-time GitHub organism, curated project index, hireability CTA. Serves primary + secondary conversion.
- `/work/ultraweb` — case study: a design studio for Claude Code — the pipeline that built THIS site (recursive proof). Serves primary conversion (depth for technical screeners). [user, interview R1]
- `/work/hardmode` — case study: deterministic discipline floor for AI coding agents. Serves primary conversion. [user, interview R1]
- `/imprint`, `/privacy` — legal obligation pages (German resident; see Compliance facts). No conversion job.
Contact is a homepage section + persistent CTA, not a page.

## Content inventory
`/`: name Iwan Braun; role positioning "agent infrastructure — I direct AI agents; they write the code" [user, CP1]; headline stat: 254 of 256 content commits AI-marked (per-repo: ultraweb 60/62, hardmode 39/39, gtheme 124/124, NightCityMP 31/31 — source: user README 2026-08-31; the site recomputes live where feasible rather than hardcoding, so the number can never go stale); the verification one-liner (`git log … | grep -ci claude`) is content, shown to the reader as an invitation to check; what's human: choosing the problem, writing the standard, binning what fails it; ultraweb-site live proof URL (ultraweb-site.vercel.app); GitHub since Dec 2021; curated repos (live API data): ultraweb (JS — design studio for Claude Code), hardmode (Python — discipline plugin, v3.0.0), gtheme (Python — GNOME theming GUI), ultraweb-site (TS — ultraweb's live proof). NightCityMP: not shown [user, CP2 R2]. Live signals shown: pushes, commit messages, languages, cadence, streaks. Star counts are NEVER headline metrics (real counts are 0–1; substance and cadence lead). Contact: email + form.
`/work/ultraweb`: guided design session → full pipeline (scoping interview, three mockup candidates, 12 phases, 80+ specialist skills, adversarial QA gates). Hook: this portfolio was built by it — the case study is self-demonstrating.
`/work/hardmode`: deterministic hook floor + independent verification agents for Claude Code; 6 hooks incl. loop-alarm and destructive-guard; thesis: advice loses to momentum, determinism doesn't.
Proof inventory: no third-party testimonials/press/logos exist → recorded EMPTY. Credibility = live commits + working artifacts only.

## Compliance facts
Seat: Germany (assumed from user context). Individual, no employees, no online contract conclusion, nothing sold.
counsel-needed: whether a personal hireability portfolio is "geschäftsmäßig" under §5 DDG → Impressum + Datenschutzerklärung included defensively; the contact form processes personal data, so a DSGVO privacy notice is required regardless.

## Backend: needs
- `api-design` → GitHub webhook receiver (push/release/star events in) + SSE stream out to open pages: the real-time channel. [user, interview R1: true real-time]
- `database` → event store persisting webhook payloads — the organism's memory; history survives redeploys.
- `server-actions` + `email` → contact form delivered to inbox (Resend).

## Backend: rejected
- `auth` — no accounts; nothing saved per visitor.
- `payments`, `storage`, `cart` — nothing sold, nothing uploaded.
- `content-cms` — two case studies are fully designed pages, not prose documents; MDX would flatten them.
- AI chat/search — default reject; a portfolio needs proof, not a chatbot.
- `analytics` — keeps the consent surface at zero for v1; can be added later on request.

## Assumed facts
- Working name "iwanbraun.dev" — creative; no domain exists yet, deploys to a Vercel subdomain until one is bought.
- Site language English; legal pages German — creative (dev-industry hiring norm; legal pages address German law).
- Role positioning "agent infrastructure / AI-native developer" — user-confirmed at CP1 ("make it bold and true"), no longer assumed.
- Real name forward (Iwan Braun), handle secondary — creative, follows the employer audience.
- Curated repo list: ultraweb, hardmode, gtheme (+ ultraweb-site as ultraweb's live proof, + this portfolio's own repo as the recursive fourth world); NightCityMP removed at user's instruction [user, CP2 R2: "dont show it"]; excluded: profile-README repo, forks (CyberpunkMP, RED4ext.SDK).
- Authorship stat: README's 254/256 spans four repos incl. the cut NightCityMP — the site computes the number live across MONITORED repos only (223/225 for ultraweb+hardmode+gtheme at last check) so displayed claims always match displayed work.
- Contact email iwan.braun2004@gmail.com rendered on the public site — material, unconfirmed.
- Impressum requires full name + postal address on the page — material, unconfirmed.
- Ship-time user actions: configure GitHub webhooks on curated repos; provide a server-side GitHub PAT for API rate limits — material, unconfirmed.
- Brand mark: an invented starting mark (IWAN·BRAUN wordmark + IB monogram, Space Grotesk 700 outlines, square-counter cut — see design/IDENTITY.md); the user may replace it — creative.
