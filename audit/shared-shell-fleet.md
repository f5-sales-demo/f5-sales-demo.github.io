# Shared-shell fleet acceptance

The root publishes the coordinated v1 shell at
[the active manifest](https://f5-sales-demo.github.io/shared/v1/current.json).
All 34 active documentation sites use the shared consumer. Their content,
framework assets, local navigation and Search indices remain local.

The [receipt](shared-shell-fleet.json) records exact public revisions, builder
digests, snapshot provenance and successful Pages deployments. The complete
mobile-menu matrix passed 102 traversals across Chromium, Firefox and WebKit.
Live Search attribution passed in all three browsers.

An unchanged Canada deployment adopted a root-only menu/style update, reused
the verified release with warm caches during a simulated manifest outage, and
adopted both an actual deployed rollback and its restoration. The root rollback
and restoration used retained immutable releases; consumers were not rebuilt.

The current release contains 19 assets totaling 751,614 bytes. An identical
Canada content sample reduced local framework assets from 917,612 to 411,409
bytes, including removal of ten local fonts totaling 269,348 bytes. This sample
compares the previous 4.11.6 theme with the qualified 4.12.0 consumer and includes
that version delta. It is not a fleet transfer estimate.

Managed-file convergence is still pending. Final acceptance requires every
applicable canonical blob and required-absent path to match the current manifest.
