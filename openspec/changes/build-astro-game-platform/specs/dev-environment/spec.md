## ADDED Requirements

### Requirement: Astro development workflow
The repository SHALL expose local development, preview, validation, and CI commands for the Astro-hosted game platform.

#### Scenario: Developer runs the platform locally
- **GIVEN** dependencies are installed
- **WHEN** the developer runs the dev task
- **THEN** Astro SHALL serve the site locally and the playable route SHALL mount the Phaser prototype

### Requirement: Platform check command
The repository SHALL provide a check command that validates TypeScript, tests, static build output, browser smoke coverage, and OpenSpec state for the Astro platform.

#### Scenario: Developer validates the platform
- **GIVEN** dependencies are installed
- **WHEN** the developer runs the check task
- **THEN** linting, unit tests, production build validation, browser smoke checks, and OpenSpec validation SHALL run from one command

