## Why

The Astro platform deployed to GitHub Pages, but the public verification job failed because its route smoke checks did not preserve the repository base path and the deployment readiness wait exceeded Playwright's default per-test timeout. The deployment workflow must verify the public `/killbox/` site reliably after Pages propagation.

## What Changes

- Make public e2e route checks resolve relative to the configured Pages base URL instead of the domain root.
- Extend the Playwright test timeout when waiting for a specific deployed version.
- Keep the existing public version, debug API, and playable smoke expectations intact.

## Capabilities

### New Capabilities

### Modified Capabilities
- `dev-environment`: Public deployment verification must support repository-base URLs and bounded Pages propagation waits without timing out early.

## Impact

- Updates Playwright e2e helpers only.
- Re-runs local checks and public GitHub Pages deployment verification.
