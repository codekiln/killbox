## ADDED Requirements

### Requirement: Astro-hosted game structure
The browser game structure SHALL host the public site through Astro while keeping Phaser runtime modules identifiable and client-only.

#### Scenario: Developer inspects Astro game structure
- **WHEN** a developer inspects `src/`
- **THEN** they SHALL be able to distinguish Astro pages/components/content from Phaser runtime mounting, game state, scenes, systems, and network abstractions

### Requirement: Pages-compatible Astro build
The GitHub Pages build path SHALL publish the Astro static output without requiring a runtime server.

#### Scenario: Static Astro production build
- **GIVEN** dependencies are installed
- **WHEN** the developer runs the production build task
- **THEN** the build output SHALL be generated as static browser assets under `dist/` with repository Pages base-path compatibility

