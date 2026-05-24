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
