## ADDED Requirements

### Requirement: Theme-aware content data
Content data SHALL include theme, faction, asset, and rendering metadata that can drive documentation previews without changing core combat simulation.

#### Scenario: Developer inspects content modules
- **WHEN** a developer inspects content modules
- **THEN** they SHALL find theme manifests, faction summaries, asset metadata, rendering experiment metadata, and validation report data separate from combat system code

### Requirement: Shared preview data
Theme and asset content SHALL be reusable by Astro preview pages and future runtime adapters.

#### Scenario: Preview data is reused
- **WHEN** a preview page renders theme or asset information
- **THEN** it SHALL read from shared typed content data rather than duplicating user-facing metadata in page markup
