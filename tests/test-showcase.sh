#!/usr/bin/env bash
# Catalog and destination contracts run with the existing shell-test CI job.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - <<'PY'
from pathlib import Path
import json
import re

root = Path('docs/en/index.mdx').read_text()
assert "link: /en/demos/" in root, 'hero must open the demo catalog'
assert 'link: https://f5-sales-demo.github.io/demo-resources/en/' in root, 'environment must open a destination'
assert not re.search(r"link: ['\"]?#", root), 'hero section jumps are not destinations'
assert not root.count('> Pre-built'), 'remove repeated hero orientation'
headings = re.findall(r'^## (.+)$', root, re.M)
assert headings == ['Demos', 'Demo environment', 'Operations', 'Developer tools', 'Ecosystem directory'], headings
catalog = Path('docs/en/demos/index.mdx').read_text()
ecosystem = Path('docs/en/ecosystem/index.mdx').read_text()
projects = json.loads(Path('audit/public-projects.json').read_text())
assert len(projects) == len({p['repo'] for p in projects}), 'duplicate project'
for p in projects:
    assert p['url'] in ecosystem, f"directory missing {p['repo']}"
    if p['group'] in ('Security', 'Networking and performance'):
        assert p['url'] in catalog, f"demo catalog missing {p['repo']}"
assert 'https://f5-sales-demo.github.io/canada/en/' in catalog
assert 'https://f5-sales-demo.github.io/docs-builder/' not in root, 'platform internals belong in directory'
assert 'href="/en/ecosystem/"' in root
assert 'without interactive turns' not in root
assert not re.search(r'50\+|67\+|hosting 9|global scrubbing|service meshes|continuous mitigation', root, re.I)
print(f'PASS: showcase routes, taxonomy and {len(projects)} public project entries')
PY
