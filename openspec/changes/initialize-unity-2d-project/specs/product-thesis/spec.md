## ADDED Requirements

### Requirement: Cooperative action tower-defense identity
Killbox SHALL combine active hero combat, fixed-pad tower defense, shared team economy, and scripted enemy waves.

#### Scenario: Two players defend one objective
- **GIVEN** two players are in the prototype map
- **WHEN** enemies spawn from multiple lanes
- **THEN** both players SHALL be able to personally attack enemies and build defenses using shared gold

### Requirement: Prototype-first development
The project SHALL prioritize an ugly one-map prototype before campaign systems, final art, monetization, networking, or progression.

#### Scenario: Early implementation scope
- **GIVEN** a requested feature is not necessary to test the one-map co-op loop
- **WHEN** implementation is planned
- **THEN** the feature SHALL be deferred unless explicitly approved
