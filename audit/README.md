# Landing page and ecosystem audit

Audit date: 2026-10-08 UTC (2026-10-07 America/Toronto).
Baseline source: `2715267af1fc74826d305496f152c8f9b3a06092`.
The divergent existing Ubuntu checkout was preserved. Work uses isolated issue branches.

Evidence distinguishes confirmed defects, implemented corrections, pilot checks, recommendations,
and unperformed manual acceptance. Source or pilot success does not close published remediation.

## Findings

| ID | Priority | Component | Evidence | Correction | Owner | Acceptance | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NAV-01 | P0 | Root hero | Missing #demo-environment; catalog action was a section jump. | Use /en/demos/ and Demo Resources. | landing | Both actions open useful destinations. | Merged source: PR #1168 |
| COPY-01 | P0 | Marketplace | Root describes partner integrations; rendered page describes xcsh plugins. | Describe xcsh plugins. | landing/docs-theme | Label and description match plugin catalog. | Merged source: PR #1168 |
| COPY-02 | P0 | Origin Server / Traffic Generator / Demo Resources | Azure-only catalog contradicts sibling Azure/AWS offerings. | Describe distinct deployments; no workload/detection parity claims. | demo-resources | Catalog and openings match component guides. | Merged and published: PR #600, Pages 37718930968 |
| COPY-03 | P0 | Root capability claims | Continuous mitigation, service meshes, global scrubbing and tool counts exceed verified demo evidence. | Link capability guides with scoped descriptions and omit counts. | landing | Root describes guides or workflows actually available. | Merged source: PR #1168 |
| IA-01 | P1 | Root and catalogs | 39 equally weighted cards; Canada and other public repositories absent. | Focused showcase, full demo catalog, complete public directory. | landing | 13 demo entries and 58 unique active public repositories discoverable. | Merged source: PR #1168 |
| IA-02 | P1 | Shared navigation | Platform/AI split duplicates xcsh; names differ; redundant portal item. | Audience taxonomy, noun labels, catalog/footer destinations. | docs-theme | Six groups; no duplicate project destinations or redundant home item. | PR #1698; final pilot verified |
| VIS-01 | P1 | 375 × 812 root | No card in opening viewport; duplicated hero/blockquote and illustration. | Concise hero, no illustration or repeated introduction. | landing/docs-theme | First card visible at 375 × 812. | Pilot verified |
| VIS-02 | P1 | LinkCard | Description overflows card boundary at 320/375 despite no horizontal page overflow. | Text-sized grid; fixed decorative icon dimensions. | docs-theme | Card scrollHeight fits clientHeight across browser matrix. | Pilot verified |
| NAV-02 | P0 | Locale catalog links | Explicit /en/demos/ rewritten to /en/en/demos/. | Preserve organization root locale paths. | docs-theme | Tests retain explicit links for en/fr/ar. | Pilot verified |
| ACC-01 | P1 | Root/catalogs/menu | Keyboard Escape, focus restoration and reflow require rendered tests. | Exercise menus, 200% text, 320 CSS pixels, reduced motion. | landing/docs-theme | No overflow; Escape returns focus to trigger. | Pilot verified |
| LOC-01 | P1 | 13 locale roots | English sources changed; existing translations retain old layout/copy. | Smoke existing roots and Arabic RTL; retain source-only English policy. | landing | No overflow; locale roots readable; stale copy explicitly recorded. | Layout verified; translation parity open |
| DEST-01 | P0 | Certificate Management and Demo Resource Template | Certificate page says being prepared; template renders REPLACE placeholders. | Source-only/planned directory labels and owner backlog. | destination repositories | No runnable claim on root or directory. | Directory corrected; backlog #1171 |
| DEST-02 | P1 | Destination openings | Several guides lead with broad product claims and architecture; core opening pages lack useful setup orientation. | Separate owner editorial issues for deeper task-based guides. | destination repositories | Opening answers purpose and next step. | Backlog |
| EXT-01 | P0 | Console / documentation / MyF5 | Rendered console shows sign-in; official docs and support show expected landing content. | Mark authenticated services in menu. | docs-theme | Readers understand service versus public documentation. | Rendered verified |
| SEO-01 | P2 | Titles/canonical/sitemap/social | Metadata needs source and rendered review. | Inspect built output and new route entries. | landing/docs-theme | Unique titles, correct canonicals, locale metadata and sitemap. | Publication pending |
| SEARCH-01 | P1 | Federated search | Menu/search names disagree; federated source attribution needs interaction. | Align labels and inspect a cross-project query. | docs-theme | Search results name source and valid destination. | Publication pending |
| PERF-01 | P2 | Page resources | Unused remote Mermaid script loaded on root with no diagrams. | Suppress landing import and inspect failed resources/page weight. | docs-theme | No remote Mermaid request for landing pages. | Source corrected; final build pending |
| MANUAL-01 | P1 | Screen reader / physical touch | Automated accessibility and keyboard checks do not prove screen-reader speech or physical touch. | Record actual manual acceptance or retain open audit item. | landing/docs-theme | Screen-reader announcements and touch usability observed. | Unperformed |
| DELIVERY-01 | P2 | Published root | Source and pilot are not published acceptance. | Release theme; pin immutable builder; merge root; inspect Pages. | docs-theme/docs-builder/landing | Exact deployment and rendered evidence recorded. | Publication pending |

## Verification evidence

- `tests/test-showcase.sh`: route, hierarchy and 58-entry public directory checks.
- `responsive-results.json`: Chromium, Firefox, WebKit; 320, 375, 390, 768, 1024, 1440, 1920 CSS px; light/dark.
- `interaction-results.json`: keyboard menus, Escape focus restoration, text enlargement, no-JavaScript routing, 13 locale roots and Arabic RTL.
- `rendered-destinations.json`: every project destination plus console, official docs and MyF5 support; public page headings/openings, final URLs and JavaScript errors.
- `content-links.json` and `menu-links.json`: labels, locations and destinations. Heading fragments retain their accessibility purpose.
- `public-projects.json`: public active repository snapshot and directory classification. Source-only entries do not claim release maturity.

The build uses the caller's immutable builder digest. The candidate theme is mounted only for pilot
acceptance until its npm release and immutable builder are verified. Screenshots are inspected locally;
publication receipts will identify the exact final source, image, Pages run and browser versions.

## Scope and limitations

English editorial work precedes locale refresh. Existing locales retain previous copy; the builder
provides English fallback catalog pages. Smoke tests establish layout and routing, not translated
editorial parity. Live demonstrations receive read-only checks only; no infrastructure was changed.
Destination introductory/capability recommendations are separate backlog items. Automated WCAG checks
supplement keyboard review; they do not claim full WCAG 2.2 AA certification or screen-reader acceptance.

## Reproduction

Run `bash tests/test-showcase.sh` from this repository and build with the pinned Pages image.
For browser checks, serve the output and exercise the widths and themes above. Record browser version,
source SHA, builder digest, viewport, theme, and observed results with each new audit.

Writing references: [Microsoft voice guidance](https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice),
[Cloudflare voice guidance](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/style-guide/style-and-grammar/voice-and-tone.mdx),
[Cloudflare overview guidance](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/style-guide/documentation-content-strategy/content-types/overview.mdx),
and the repository `STYLE_GUIDE.md`. Navigation uses noun phrases.

## Delivery progress

Landing source merged as `b51e8151e45fef3f701fe5a64e837961b7d72e1a` (PR #1168).
Demo Resources merged as `be9cc21566572abb3503397be7599a53dc8bfc64` (PR #600);
[Pages 37718930968](https://github.com/f5-sales-demo/demo-resources/actions/runs/37718930968) succeeded,
and Chromium confirmed the cloud-specific catalog and component introductions.
Deeper destination work is tracked in [#1171](https://github.com/f5-sales-demo/f5-sales-demo.github.io/issues/1171).
Final publication uses [#1172](https://github.com/f5-sales-demo/f5-sales-demo.github.io/issues/1172) to
pin the verified immutable builder; the root caller is explicitly opted out of managed propagation.

Header control hit testing includes 1280 px in addition to the seven-width matrix. Search `origin`
returned 641 results and source labels with no failed requests. Duplicate page-title suffixes are
removed; new catalog canonical and sitemap routes are correct. The landing no longer requests
remote Mermaid code. Existing locale copy remains an explicit editorial follow-up.

Manual accessibility and locale acceptance is tracked in [#1173](https://github.com/f5-sales-demo/f5-sales-demo.github.io/issues/1173).

The final candidate browser regression passed (`BASE_URL=http://127.0.0.1:8766/en/ npx playwright test tests/visual/showcase.spec.ts`).
Initial page load used 17 local resources totaling 707,162 decoded bytes; no remote dependency
request was observed before opening search. Federated search loads remote indices on demand.
These are local cold-load measurements, not a production performance score.

Final link inventory: 133 content links, 64 unique destinations, all returned the expected public page. `all-content-links.json` records labels and locations; `link-status-results.json` records final URLs and HTTP redirects. Meta-refresh locale roots were resolved before assessing content.

Pilot screenshots in `screenshots/` show the root at 375 and 1440 CSS pixels in light and dark themes. `screenshot-receipts.json` records SHA-256, browser versions, candidate source and baseline image. Screenshots contain only public portal content and were visually inspected.
