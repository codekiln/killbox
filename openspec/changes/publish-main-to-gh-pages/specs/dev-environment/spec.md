## ADDED Requirements

### Requirement: Public deployment integration test entry point
The repository SHALL provide a command entry point for verifying a published GitHub Pages deployment with browser automation.

#### Scenario: Verify published deployment
- **GIVEN** dependencies are installed and a public Pages URL is available
- **WHEN** a developer or CI job runs the public deployment verification command with the expected version identifier
- **THEN** Playwright SHALL check that the public page serves the expected version and that the beginning of the game is playable

### Requirement: Deployment readiness wait
The public deployment verification SHALL allow a bounded wait for GitHub Pages to begin serving the newly published version.

#### Scenario: Pages propagation delay
- **GIVEN** the Pages deployment action has completed but the public URL may still serve an older build
- **WHEN** the public deployment verification starts
- **THEN** it SHALL retry until the expected version is observed or fail with a clear timeout
