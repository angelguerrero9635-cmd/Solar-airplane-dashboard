#!/usr/bin/env bash
# Refreshes content/ from a local checkout of the solar-airplane docs repo.
#
# Usage: scripts/sync-content.sh <path-to-solar-airplane-checkout> [branch]
# If [branch] is omitted, uses whatever branch that checkout currently has
# checked out.
set -euo pipefail

SOURCE_DIR="${1:?Usage: sync-content.sh <path-to-solar-airplane-checkout> [branch]}"
BRANCH="${2:-$(git -C "$SOURCE_DIR" branch --show-current)}"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/content"

cp "$SOURCE_DIR/CLAUDE.md" "$DEST/CLAUDE.md"
cp "$SOURCE_DIR/docs/roadmap.md" "$DEST/docs/roadmap.md"
cp "$SOURCE_DIR/logs/test_flights.md" "$DEST/logs/test_flights.md"
cp "$SOURCE_DIR/calculations/power_budget.md" "$DEST/calculations/power_budget.md"
cp "$SOURCE_DIR/calculations/battery_soc.md" "$DEST/calculations/battery_soc.md"
cp "$SOURCE_DIR/specs/components.md" "$DEST/specs/components.md"
cp "$SOURCE_DIR/specs/wiring_diagram.md" "$DEST/specs/wiring_diagram.md"
cp "$SOURCE_DIR/specs/wiring_diagram.svg" "$DEST/specs/wiring_diagram.svg"
cp "$SOURCE_DIR/specs/datasheets/sunpower_c60.md" "$DEST/specs/datasheets/sunpower_c60.md"

# decisions/ can grow over time (new ADRs), so sync the whole directory.
rm -f "$DEST"/decisions/*.md
cp "$SOURCE_DIR"/decisions/*.md "$DEST/decisions/"

COMMIT_SHA=$(git -C "$SOURCE_DIR" rev-parse "$BRANCH")
COMMIT_MSG=$(git -C "$SOURCE_DIR" log -1 --format=%s "$BRANCH")

cat > "$DEST/_meta.json" <<EOF
{
  "sourceRepo": "angelguerrero9635-cmd/solar-airplane",
  "sourceBranch": "$BRANCH",
  "sourceCommit": "$COMMIT_SHA",
  "sourceCommitMessage": "$COMMIT_MSG",
  "copiedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

echo "Synced content/ from $SOURCE_DIR@$BRANCH ($COMMIT_SHA)"
