## 1. Build Version Metadata

- [x] 1.1 Define the deployment version format used by local builds and GitHub Actions builds.
- [x] 1.2 Add Vite environment handling so the client can read the deployment version at runtime.
- [x] 1.3 Render the deployment version visibly in the app shell and expose it through stable DOM state for automation.
- [x] 1.4 Add or update unit coverage for version metadata defaults and DOM/debug exposure.

## 2. Browser Verification

- [x] 2.1 Add Playwright e2e coverage for initial game readiness using the existing debug API.
- [x] 2.2 Assert that the version visible in the page matches an expected version when one is provided.
- [x] 2.3 Add bounded retry/wait behavior for public Pages verification so propagation delay can settle before failing.
- [x] 2.4 Add package and mise task entry points for local e2e verification and public deployment verification.

## 3. GitHub Pages Workflow

- [x] 3.1 Update the Pages workflow build step to pass the expected deployment version into the Vite build.
- [x] 3.2 Expose the deployed Pages URL and expected version to a post-deploy verification job.
- [x] 3.3 Install Playwright browser dependencies in CI and run the public deployment verification after deployment.
- [x] 3.4 Ensure the workflow fails clearly when the public site never serves the expected version or the initial game is not playable.

## 4. Validation

- [x] 4.1 Run the unit test suite.
- [x] 4.2 Run the local Playwright e2e test suite against production preview.
- [x] 4.3 Run the production build.
- [x] 4.4 Run strict OpenSpec validation.
