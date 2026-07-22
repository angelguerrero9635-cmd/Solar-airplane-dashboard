# Solar Glider — Project Log Dashboard

A Next.js dashboard for the solar glider project. It reads files
**directly from your docs repo** (`solar-airplane`) via the GitHub API —
there's no separate database. The repo stays the single source of truth;
this is a read-only window into it. All edits happen through Claude Code,
not this app.

This is a **separate app from your docs repo**. It has its own GitHub repo
and its own Vercel project, and talks to your docs repo over the GitHub API
using a personal access token.

## What it does

- **Dashboard** (`/`) — view `CLAUDE.md`
- **Specs** (`/specs`) — component table and datasheet extractions
- **Calc** (`/calculations`) — power budget and battery SOC write-ups
  (the `.py` scripts themselves stay code-only, run through Claude Code)
- **ADRs** (`/decisions`) — browse existing decision records
- **Logs** (`/logs`) — view dated bench test and flight test entries in
  `logs/test_flights.md`
- **Roadmap** (`/docs/roadmap.md`) — view the phase plan

## Setup

### 1. Push this app to its own GitHub repo

```bash
cd solar-glider-dashboard
git init
git add .
git commit -m "Initial dashboard scaffold"
gh repo create solar-glider-dashboard --private --source=. --push
# or create the repo on github.com and `git remote add origin ...` + push
```

### 2. Create a GitHub Personal Access Token

Use a **fine-grained token** scoped to only the docs repo:

1. Go to <https://github.com/settings/personal-access-tokens/new>
2. Repository access → **Only select repositories** → pick
   `solar-airplane`
3. Permissions → **Contents: Read-only** (this app never writes)
4. Generate, copy the token (starts with `github_pat_`)

### 3. Deploy to Vercel

1. Import the `solar-glider-dashboard` repo into Vercel
2. Add these environment variables (Project Settings → Environment
   Variables):

   | Variable | Value |
   |---|---|
   | `GITHUB_OWNER` | your GitHub username/org (owner of the docs repo) |
   | `GITHUB_REPO` | `solar-airplane` |
   | `GITHUB_BRANCH` | the branch to read/write — check whether that's `main` or the `claude/solar-fpv-glider-setup-oq43lr` branch your last Claude Code session pushed to |
   | `GITHUB_TOKEN` | the fine-grained PAT from step 2 |

3. Deploy and visit the URL.

### 4. Local development (optional)

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

## Notes & limitations

- **Read-only.** This app has no write path back to GitHub at all — no
  editor, no save button, no PUT requests. All edits to the docs repo
  happen through Claude Code; this dashboard is just a viewer.
- **No authentication.** This app has no login gate — anyone with the
  deployed URL can view your docs repo's contents. Only deploy it somewhere
  not publicly discoverable, or add your own access control (e.g. Vercel's
  password protection or an allowlist) in front of it if that matters to
  you.
- **Doesn't run the Python scripts.** `calculations/power_budget.py` and
  `battery_soc.py` stay Claude Code's job — this dashboard only displays
  their companion markdown write-ups.
- **Branch awareness.** Since your repo currently has work on a
  `claude/solar-fpv-glider-setup-oq43lr` branch, double check `GITHUB_BRANCH`
  points at wherever your latest committed state actually lives before
  relying on this for viewing.
