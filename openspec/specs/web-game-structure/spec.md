# web-game-structure Specification

## Purpose
Define the TypeScript, Vite, and Phaser browser project structure used by the active Killbox prototype.

## Requirements
### Requirement: Browser-playable static prototype
The system SHALL run as a static web application deployable to GitHub Pages without requiring native engine software.

#### Scenario: Public prototype access
- **GIVEN** a successful production build from the main branch
- **WHEN** the static files are deployed to GitHub Pages
- **THEN** a player SHALL be able to open the prototype in a browser without installing native software

### Requirement: Phaser game entry point
The repository SHALL contain a TypeScript Phaser client with explicit source folders for scenes, systems, network abstractions, and shared game state.

#### Scenario: Developer inspects the web project
- **GIVEN** a developer has cloned the repository
- **WHEN** they inspect `src/`
- **THEN** they SHALL find the Phaser boot path, prototype scene code, game state model, and network abstraction entry points

### Requirement: GitHub Pages-compatible build
The web client SHALL build into static assets suitable for GitHub Pages hosting.

#### Scenario: Static production build
- **GIVEN** dependencies are installed
- **WHEN** the developer runs the build task
- **THEN** the build output SHALL be generated as static browser assets under `dist/`

### Requirement: Automatic main branch Pages publication
The system SHALL publish every successful production build from `main` to GitHub Pages without manual deployment steps.

#### Scenario: Main branch deployment
- **GIVEN** a change has been pushed to `origin/main`
- **WHEN** the GitHub Actions deployment workflow completes successfully
- **THEN** the public GitHub Pages URL SHALL serve the built Killbox client for that change

### Requirement: Visible deployed version identifier
The browser client SHALL display a deployment version identifier that automation can read from the public page.

#### Scenario: Published version is visible
- **GIVEN** a production build includes a deployment version identifier
- **WHEN** a browser opens the published GitHub Pages URL
- **THEN** the page SHALL visibly show that version identifier and expose the same value through stable DOM state

### Requirement: Public post-deploy playability verification
The system SHALL verify after GitHub Pages publication that the beginning of the game is playable from the public URL.

#### Scenario: Public playable smoke check
- **GIVEN** GitHub Pages has deployed a new build
- **WHEN** the post-deploy browser verification runs against the public URL
- **THEN** the Phaser scene SHALL load, the debug API SHALL report the initial game state, and a build-pad command SHALL update game state successfully
