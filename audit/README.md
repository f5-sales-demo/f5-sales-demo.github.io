# Landing page and ecosystem audit

Audit date: 2026-10-08 UTC (2026-10-07 America/Toronto).
Baseline source: `2715267af1fc74826d305496f152c8f9b3a06092`.
The divergent existing Ubuntu checkout was preserved. Work uses isolated issue branches.

Evidence distinguishes confirmed defects, implemented corrections, pilot checks, recommendations,
and unperformed manual acceptance. Source or pilot success does not close published remediation.

## Findings

| ID | Priority | Component | Evidence | Correction | Owner | Acceptance | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NAV-01 | P0 | Root hero | Missing #demo-environment; catalog action was a section jump. | Use /en/demos/ and Demo Resources. | landing | Both actions open useful destinations. | Source verified |
| COPY-01 | P0 | Marketplace | Root describes partner integrations; rendered page describes xcsh plugins. | Describe xcsh plugins. | landing/docs-theme | Label and description match plugin catalog. | Source verified |
| COPY-02 | P0 | Origin Server / Traffic Generator / Demo Resources | Azure-only catalog contradicts sibling Azure/AWS offerings. | Describe distinct deployments; no workload/detection parity claims. | demo-resources | Catalog and openings match component guides. | PR #600 pending |
| COPY-03 | P0 | Root capability claims | Continuous mitigation, service meshes, global scrubbing and tool counts exceed verified demo evidence. | Link capability guides with scoped descriptions and omit counts. | landing | Root describes guides or workflows actually available. | Source verified |
| IA-01 | P1 | Root and catalogs | 39 equally weighted cards; Canada and other public repositories absent. | Focused showcase, full demo catalog, complete public directory. | landing | 13 demo entries and 58 unique active public repositories discoverable. | Source verified |
| IA-02 | P1 | Shared navigation | Platform/AI split duplicates xcsh; names differ; redundant portal item. | Audience taxonomy, noun labels, catalog/footer destinations. | docs-theme | Six groups; no duplicate project destinations or redundant home item. | PR #1698 pending |
| VIS-01 | P1 | 375 × 812 root | No card in opening viewport; duplicated hero/blockquote and illustration. | Concise hero, no illustration or repeated introduction. | landing/docs-theme | First card visible at 375 × 812. | Pilot verified |
| VIS-02 | P1 | LinkCard | Description overflows card boundary at 320/375 despite no horizontal page overflow. | Text-sized grid; fixed decorative icon dimensions. | docs-theme | Card scrollHeight fits clientHeight across browser matrix. | Pilot verified |
| NAV-02 | P0 | Locale catalog links | Explicit /en/demos/ rewritten to /en/en/demos/. | Preserve organization root locale paths. | docs-theme | Tests retain explicit links for en/fr/ar. | Pilot verified |
| ACC-01 | P1 | Root/catalogs/menu | Keyboard Escape, focus restoration and reflow require rendered tests. | Exercise menus, 200% text, 320 CSS pixels, reduced motion. | landing/docs-theme | No overflow; Escape returns focus to trigger. | Pilot verified |
| LOC-01 | P1 | 13 locale roots | English sources changed; existing translations retain old layout/copy. | Smoke existing roots and Arabic RTL; retain source-only English policy. | landing | No overflow; locale roots readable; stale copy explicitly recorded. | Layout verified; translation parity open |
| DEST-01 | P0 | Certificate Management and Demo Resource Template | Certificate page says being prepared; template renders REPLACE placeholders. | Source-only/planned directory labels and owner backlog. | destination repositories | No runnable claim on root or directory. | Directory corrected; owner follow-up open |
| DEST-02 | P1 | Destination openings | Several guides lead with broad product claims and architecture; core opening pages lack useful setup orientation. | Separate owner editorial issues for deeper task-based guides. | destination repositories | Opening answers purpose and next step. | Backlog |
| EXT-01 | P0 | Console / documentation / MyF5 | Rendered console shows sign-in; official docs and support show expected landing content. | Mark authenticated services in menu. | docs-theme | Readers understand service versus public documentation. | Rendered verified |
| SEO-01 | P2 | Titles/canonical/sitemap/social | Metadata needs source and rendered review. | Inspect built output and new route entries. | landing/docs-theme | Unique titles, correct canonicals, locale metadata and sitemap. | In progress |
| SEARCH-01 | P1 | Federated search | Menu/search names disagree; federated source attribution needs interaction. | Align labels and inspect a cross-project query. | docs-theme | Search results name source and valid destination. | In progress |
| PERF-01 | P2 | Page resources | Unused remote Mermaid script loaded on root with no diagrams. | Suppress landing import and inspect failed resources/page weight. | docs-theme | No remote Mermaid request for landing pages. | Source corrected; final build pending |
| MANUAL-01 | P1 | Screen reader / physical touch | Automated accessibility and keyboard checks do not prove screen-reader speech or physical touch. | Record actual manual acceptance or retain open audit item. | landing/docs-theme | Screen-reader announcements and touch usability observed. | Unperformed |
| DELIVERY-01 | P2 | Published root | Source and pilot are not published acceptance. | Release theme; pin immutable builder; merge root; inspect Pages. | docs-theme/docs-builder/landing | Exact deployment and rendered evidence recorded. | In progress |

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
