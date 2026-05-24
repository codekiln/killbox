## ADDED Requirements

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
