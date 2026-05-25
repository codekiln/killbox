## ADDED Requirements

### Requirement: Simulation-render-data separation
The web game structure SHALL keep deterministic simulation, content data, debug state, and Phaser rendering in identifiable modules.

#### Scenario: Developer inspects source structure
- **WHEN** a developer inspects `src/`
- **THEN** they SHALL be able to identify content definitions, simulation rules, debug API, transport boundary, and Phaser scene rendering

### Requirement: GitHub Pages build remains verified
The project SHALL retain a build path that produces static assets compatible with repository GitHub Pages hosting.

#### Scenario: Pages-compatible build check
- **WHEN** the production build is run for GitHub Pages configuration
- **THEN** static assets SHALL build successfully with the repository base path
