#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/validate-shared.mjs
node --test tests/ecosystem.test.mjs
# Every immutable path already published by the base must retain its exact blob.
python3 - <<'CHECK'
import json
import os
import subprocess
base = "origin/main"
event_path = os.environ.get("GITHUB_EVENT_PATH")
if event_path:
    with open(event_path, encoding="utf-8") as stream:
        event = json.load(stream)
    base = event.get("pull_request", {}).get("base", {}).get("sha", base)
if subprocess.run(["git", "cat-file", "-e", base], capture_output=True).returncode:
    subprocess.run(["git", "fetch", "--no-tags", "origin", base], check=True)
    base = "FETCH_HEAD"
paths = subprocess.check_output(
    ["git", "ls-tree", "-r", "--name-only", base, "shared/assets", "shared/v1/releases"],
    text=True,
).splitlines()
for path in paths:
    before = subprocess.check_output(["git", "rev-parse", f"{base}:{path}"], text=True).strip()
    after = subprocess.check_output(["git", "hash-object", path], text=True).strip()
    if before != after:
        raise ValueError(f"Published immutable asset changed: {path}")
print(f"Verified retention of {len(paths)} published immutable files")
CHECK
