# BACKPACK OS PWA hardening checkpoint — 18 November 2026

Branch: `main`

This checkpoint records the offline-resilience refresh. It does not claim a successful Vercel deployment or physical-device offline test.

## Changes pushed
- `2f5200dc4ea018ac89aee549af85126daeace1ea` — request persistent browser storage on startup, best-effort and non-blocking.
- `d77eedc680e7189f041b587b16c07b1aa98b57de` — improve public navigation recovery: exact request, canonical pathname without query parameters, cached root app shell, then offline page. A transient origin 5xx now uses the same recovery path.
- `1da780332c9471ef2a7a049bb777335c1863cff4` — verify canonical fallback, independent cache versions and persistent-storage request.
- `7ff9f70eb85a82bda35a45e6a767b706bd1edead` — document the offline resilience contract and its limits.

## Cache versions
- Shell: `backpack-os-shell-v7`
- Media: `backpack-os-media-v6`

The Iteration 13 cache namespaces are untouched. Private/member routes and API requests remain outside public HTML caching. The explicit user-approved Refresh lifecycle and native install flow are preserved.

## Offline boundary
Browser-local workspace records and local-only interactions can continue while the cached app shell is available. UploadThing uploads, external links, remote services, server delivery and cross-device synchronization still require connectivity. No background write queue was introduced.

## Verification status
The repository's `verify:offline` checks were extended, but this checkpoint does not represent a local build, successful hosted build, deployment or Android offline/install QA. Those remain to be confirmed by the actual checks and product-owner device test.
