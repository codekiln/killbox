## Context

The Astro platform now has a dedicated `/play/` page for the interactive Phaser surface. The public Pages verification job still opens the site root for the playable smoke test, which can fail while GitHub Pages serves a freshly deployed `/play/` page but a stale root index from an edge cache.

## Goals / Non-Goals

**Goals:**

- Make the playable smoke test open the canonical `/play/` route.
- Keep public deployment version checks on the DOM/debug state produced by the Phaser embed.
- Leave the home page and route inventory test intact.

**Non-Goals:**

- Do not change Phaser runtime behavior.
- Do not remove the home page's platform preview.
- Do not loosen deployment version checks for the playable route.

## Decisions

- Resolve a canonical play URL from Playwright `baseURL` before running the playable smoke test. This matches the user-facing route and still works for both local preview and GitHub Pages subpath deployments.
- Keep `baseURL` root navigation in the route inventory test. This continues to prove the site shell and docs routes render without making root propagation the blocker for the playable game contract.

## Risks / Trade-offs

- Root and play route freshness can diverge briefly on GitHub Pages -> The verifier now treats `/play/` as the gameplay deployment source of truth and still checks root separately for navigation/rendering.
- URL joining can regress subpath deployments -> Use the existing route resolver helper so `/killbox/` and local `/` bases behave consistently.
