## Context

Killbox is already a static TypeScript/Vite/Phaser client with a GitHub Pages deployment workflow triggered by pushes to `main`. The current workflow builds and deploys `dist`, but it does not prove that the public Pages URL has begun serving the new build or that the first playable game state still loads after deployment.

The app already exposes browser automation state through `window.__KILLBOX_DEBUG__`, `#app` data attributes, and `#semantic-state`, which makes a public smoke test practical without adding a backend. The missing pieces are build metadata that is visible in the page, a Playwright test that can target either local preview or the public Pages URL, and a post-deploy Actions job that waits for the deployed URL to converge before asserting playability.

## Goals / Non-Goals

**Goals:**

- Publish successful `main` builds to GitHub Pages automatically.
- Include a user-visible and automation-readable version identifier in every built client.
- Verify the public Pages deployment after the deploy job completes.
- Confirm the initial game state is playable enough for the vertical slice: Phaser loads, debug API is available, players/objective/wave/build pads are present, and a basic build-pad command works.
- Keep the verification independent of private services so the static Pages client remains publicly testable.

**Non-Goals:**

- Custom domain setup.
- Release note generation or semantic version bump automation.
- Rollback orchestration.
- Production networking, backend relay deployment, or multiplayer soak testing.
- Full gameplay completion tests.

## Decisions

1. Use GitHub Pages Actions deployment as the publication mechanism.

   The existing `.github/workflows/deploy-pages.yml` is the right place to extend because it already triggers on `main`, builds with the GitHub Pages base path, and deploys with `actions/deploy-pages`. Keeping publication in one workflow avoids splitting build artifacts across multiple CI definitions.

   Alternative considered: deploy from a separate `gh-pages` branch. That adds branch state and synchronization concerns without improving this static-client use case.

2. Generate a deployment version identifier at build time and render it in the DOM.

   The workflow should pass a value such as `${package version}+${short SHA}` or another deterministic main-commit identifier through Vite environment variables. The app should render that value in visible UI and expose it on a stable DOM attribute so Playwright can assert that the public page is serving the expected build.

   Alternative considered: rely only on the GitHub Pages deployment URL or Actions run ID. Those identify the deployment event, but they do not prove that the browser received the expected client bundle.

3. Add a Playwright public smoke test with retry/wait behavior.

   The e2e test should accept a base URL and expected version through environment variables. For public Pages verification, it should poll/retry within a bounded timeout because Pages may take time to serve the new artifact after the deploy action reports success. The same assertions can also run against local preview for faster development feedback.

   Alternative considered: use shell `curl` checks only. HTTP checks can confirm the URL is reachable, but they cannot validate Phaser boot, debug API readiness, or interactive game commands.

4. Verify the beginning of the game through the existing debug contract.

   The test should wait for `window.__KILLBOX_DEBUG__`, inspect `describe()`/`getState()`, and dispatch a simple command such as toggling an open build pad. This checks that the beginning of the game is not merely rendered, but responds to the automation contract needed by future integration tests.

   Alternative considered: assert only on text or screenshot output. Visible text is useful for version proof, but it is weaker than the semantic debug state already designed for browser automation.

## Risks / Trade-offs

- Pages propagation delay may be longer than expected -> Use bounded retries with clear timeout errors that include the expected version and URL.
- Browser caching may serve an older bundle -> Assert the expected visible/DOM version and consider cache-busting navigation in the test URL.
- Public smoke tests can be flaky due to network availability -> Keep the test narrow, retry only deployment readiness, and preserve local e2e coverage for deterministic checks.
- Exposing commit-derived version metadata reveals public repository revision state -> This is acceptable for a public GitHub Pages build; avoid exposing secrets or private runtime data.
- Future debug API changes could break deployment verification -> Keep the playability assertion aligned with the documented browser automation contract and update both together.
