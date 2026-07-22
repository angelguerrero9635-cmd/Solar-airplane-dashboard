# Solar Glider — Project Log Dashboard

A Next.js dashboard for the solar glider project. It renders a **bundled
snapshot** of the docs repo's (`solar-airplane`) markdown files — the
content lives in `content/` inside this repo, not fetched live from
GitHub. `solar-airplane` stays the actual source of truth; this app is a
read-only, offline-friendly viewer over a copy of it. All edits happen
through Claude Code, in the `solar-airplane` repo — not here.

This is a **separate app from your docs repo**. It has its own GitHub repo
and its own Vercel project, and needs no GitHub credentials or API access
to run — it only reads its own bundled `content/` folder.

## What it does

- **Dashboard** (`/`) — view `CLAUDE.md`
- **Specs** (`/specs`) — component table and datasheet extractions
- **Wiring** (`/wiring`) — block-level power and signal diagram
- **Calc** (`/calculations`) — power budget and battery SOC write-ups
  (the `.py` scripts themselves stay code-only, run through Claude Code)
- **ADRs** (`/decisions`) — browse existing decision records
- **Logs** (`/logs`) — view dated bench test and flight test entries in
  `logs/test_flights.md`
- **Roadmap** (`/docs/roadmap.md`) — view the phase plan

The status pill in the header shows which `solar-airplane` commit the
bundled content was last synced from (`content/_meta.json`), not a live
sync indicator.

Markdown files can embed images (e.g. `specs/wiring_diagram.svg`) using
normal relative-path syntax, the same as they'd render on GitHub. The
`/api/content/asset` route and `MarkdownViewer`'s image-path resolution
handle serving them from the bundled `content/` folder — see
`scripts/sync-content.sh` to make sure new image files get copied over
too when you add one.

## Keeping content up to date

Since content is bundled, not fetched live, it goes stale as
`solar-airplane` changes. Refresh it with:

```bash
scripts/sync-content.sh /path/to/local/solar-airplane-checkout [branch]
```

This overwrites `content/` from that checkout and rewrites
`content/_meta.json` with the source commit it copied from. Commit and
push (or redeploy) afterward for the change to show up.

## Setup

### 1. Push this app to its own GitHub repo

```bash
cd solar-airplane-dashboard
git init
git add .
git commit -m "Initial dashboard scaffold"
gh repo create solar-airplane-dashboard --private --source=. --push
# or create the repo on github.com and `git remote add origin ...` + push
```

### 2. Deploy to Vercel

1. Import the `solar-airplane-dashboard` repo into Vercel
2. Deploy — no environment variables needed.

### 3. Local development

```bash
npm install
npm run dev
```

## Notes & limitations

- **Read-only.** This app has no write path anywhere — no editor, no save
  button, no API calls that mutate anything. All edits to the docs happen
  through Claude Code, in the `solar-airplane` repo.
- **Bundled snapshot, not live.** Unlike a database-backed or
  API-backed app, this dashboard cannot reflect a change in
  `solar-airplane` until someone runs `scripts/sync-content.sh` and
  redeploys. If you need live-as-of-right-now data, this isn't that.
- **No authentication.** This app has no login gate — anyone with the
  deployed URL can view the bundled content. Only deploy it somewhere not
  publicly discoverable, or add your own access control (e.g. Vercel's
  password protection or an allowlist) in front of it if that matters to
  you.
- **Doesn't run the Python scripts.** `calculations/power_budget.py` and
  `battery_soc.py` stay Claude Code's job — this dashboard only displays
  their companion markdown write-ups (and doesn't even bundle the `.py`
  files themselves).
