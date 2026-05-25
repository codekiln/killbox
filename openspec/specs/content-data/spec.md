# content-data Specification

## Purpose
Define how first playable mission content is separated from core simulation rules.

## Requirements
### Requirement: Data-driven mission content
The first playable mission SHALL define map, tower, enemy, and wave content outside the core combat systems.

#### Scenario: Content inspection
- **WHEN** a developer inspects the game content modules
- **THEN** the mission map, tower definitions, enemy definitions, and wave script SHALL be identifiable without reading combat system code

### Requirement: Original legally distinct content
Mission content SHALL use original names, copy, visuals, wave data, and layout values.

#### Scenario: Content terminology
- **WHEN** a developer inspects user-facing mission strings and content identifiers
- **THEN** they SHALL NOT use Kingdom Rush names, dialogue, asset references, or exact level/wave identifiers

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
