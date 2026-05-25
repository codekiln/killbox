## ADDED Requirements

### Requirement: Player-facing play route
The playable route SHALL present itself as "Play" and avoid implementation-facing explanatory copy.

#### Scenario: Visitor opens play route
- **WHEN** a visitor opens `/play/`
- **THEN** the page heading and navigation label SHALL use "Play"
- **AND** the page SHALL NOT show implementation notes about Phaser vertical slices or Astro platform requirements

### Requirement: Mobile landscape play surface
The playable route SHALL prioritize the Phaser game surface in mobile landscape browsers.

#### Scenario: Visitor plays in mobile landscape
- **WHEN** a visitor opens `/play/` in a mobile landscape viewport
- **THEN** the site header and page title SHALL be hidden
- **AND** the Phaser game shell SHALL fill the available viewport without horizontal overflow

