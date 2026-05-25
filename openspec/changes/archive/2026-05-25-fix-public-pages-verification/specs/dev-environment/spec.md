## ADDED Requirements

### Requirement: Repository-base public route verification
Public deployment verification SHALL preserve the configured GitHub Pages repository base path when checking platform routes.

#### Scenario: Verify repository Pages routes
- **GIVEN** the public base URL is `https://codekiln.github.io/killbox/`
- **WHEN** browser verification checks platform subroutes
- **THEN** it SHALL check routes below `/killbox/` rather than the domain root

### Requirement: Public deployment wait honors test timeout
Public deployment verification SHALL allow its configured deployment readiness wait to complete before Playwright's per-test timeout fails the test.

#### Scenario: Pages propagation wait is longer than default timeout
- **GIVEN** deployment verification is configured to wait up to 180 seconds for a version
- **WHEN** the public page initially serves an older version
- **THEN** the Playwright test SHALL continue retrying until the configured readiness deadline or successful version match
