# dev-environment Specification

## Purpose
Define the project command surface for TypeScript, Phaser, OpenSpec, and deployment-oriented development.
## Requirements
### Requirement: mise task entry points
The repository SHALL expose common TypeScript, Phaser, OpenSpec, and deployment-related commands through mise tasks when practical.

#### Scenario: Developer lists tasks
- **GIVEN** mise is installed
- **WHEN** the developer runs `mise tasks`
- **THEN** common web project tasks SHALL be discoverable

### Requirement: Web development workflow
The repository SHALL expose web development, validation, and production build commands through mise tasks.

#### Scenario: Developer runs the web prototype
- **GIVEN** dependencies are installed
- **WHEN** the developer runs the dev task
- **THEN** Vite SHALL serve the Phaser prototype locally for browser testing

### Requirement: Automated project checks
The repository SHALL provide a single check task that runs linting, tests, production build, and OpenSpec validation.

#### Scenario: Developer validates the pivot
- **GIVEN** dependencies are installed
- **WHEN** the developer runs the check task
- **THEN** linting, unit tests, build validation, and OpenSpec validation SHALL run from one command

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
