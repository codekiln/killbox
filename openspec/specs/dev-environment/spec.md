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
