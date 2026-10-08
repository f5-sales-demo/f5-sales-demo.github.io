# Shared documentation shell

The landing repository owns ecosystem destinations, descriptions, Search labels and locale routing in
`ecosystem/`. Documentation sites retain their document content, navigation, framework bundles and page
assets. They consume coordinated shell releases from `https://f5-sales-demo.github.io/shared/`.

Generate a release from the verified theme package or checkout:

```sh
node scripts/generate-shared.mjs /path/to/docs-theme
node --test tests/ecosystem.test.mjs
```

The generator resolves menu icons, bundles the existing React/Radix renderer, rewrites font URLs, and
validates configuration, hashes and every retained manifest reference. It writes identical bytes only once.
Commit `shared/` with the configuration change. Never delete or overwrite content-addressed assets or retained
release manifests.

`shared/v1/current.json` selects an immutable release manifest. Each release coordinates CSS, the runtime,
menu/Search data, fonts and branding. Compatible menu/style updates deploy only this repository. Builder or
framework changes require an explicit fleet rebuild; a new incompatible consumer contract requires a new
version and migration.

The consumer loads baseline CSS with integrity protection.
On each page load it fetches the active pointer without caching and verifies the manifest and all referenced
assets. It stages CSS and the self-contained runtime before activation. Browser storage retains the last
successful pointer when available. Failed candidates fall back to that release, then the baseline. A complete
root outage keeps framework rendering, local navigation and the ecosystem-directory link available.

For rollback, copy a retained release pointer into `shared/v1/current.json`, preserving its exact manifest
SHA-256 and byte count, and redeploy only the root. Do not rebuild consumers for a compatible rollback.

The `v1` consumer supplies repository identity, document base, locale, and desktop/mobile mount selectors.
Provider sections remain local. `DOCS_SHARED_MODE=local` is the explicit standalone development mode; custom
menus belong to that mode. Production ecosystem mode includes no global menu islands or bundled menu
configuration.
