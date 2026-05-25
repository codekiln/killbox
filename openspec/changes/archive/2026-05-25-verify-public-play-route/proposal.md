## Why

The public Pages verifier still treats the site root as the primary playable surface, even though the canonical game route is now `/play/`. This lets GitHub Pages propagation for the marketing/design-system home page block deployment verification after the playable route is already correct.

## What Changes

- Verify the playable game smoke test against `/play/` for both local and public e2e runs.
- Pass Astro's rendered deployment version into the mounted Phaser runtime so the debug API does not overwrite static DOM state with a local fallback.
- Keep the broader route smoke test on the root and documentation routes.
- Preserve deployment version checks for the actual Phaser surface so CI still catches stale playable builds.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `astro-game-platform`: Clarify that runtime/public deployment verification targets the canonical Play route.

## Impact

- Affects Playwright e2e route resolution, the Astro-to-Phaser deployment metadata handoff, and public Pages verification behavior.
- No gameplay, UI layout, or deployment dependency changes.
