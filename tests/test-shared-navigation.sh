#!/usr/bin/env bash
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
cd "$root"
node --test tests/ecosystem.test.mjs tests/retained-shared-assets.test.mjs
