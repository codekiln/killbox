## Why

Main branch changes should become a publicly playable GitHub Pages build without manual intervention, and the project needs an integration check that proves the published site is actually serving the new version. This closes the gap between "the workflow deployed" and "the latest game is publicly available and playable."

## What Changes

- Automatically publish successful `main` builds to GitHub Pages.
- Add a post-deploy verification path that waits for the public Pages URL to become available, then checks that the beginning of the game loads into a playable state.
- Expose a build/version identifier in the rendered app so automation can prove the public site is serving the newly deployed revision.
- Add browser-level integration coverage for the published Pages URL, separate from local preview checks.
- Keep the static client usable without any backend relay or private test service.
- Non-goals: custom domains, release notes, production multiplayer infrastructure, analytics, rollback automation, and artifact signing.

## Capabilities

### New Capabilities

### Modified Capabilities

- `web-game-structure`: Require automatic GitHub Pages publication from `main`, a visible deployed version identifier, and public post-deploy playability verification.
- `dev-environment`: Require deployment-oriented integration test entry points that can verify a public Pages build after publication.

## Impact

- Affected GitHub Actions workflow: `.github/workflows/deploy-pages.yml`
- Affected app code: boot/render path that can expose the deployed version in the DOM and debug state
- Affected tests: Playwright/e2e coverage for local preview and public Pages verification
- Affected configuration: package scripts, Playwright configuration or test parameters, and build-time environment variables for version metadata
