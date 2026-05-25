## ADDED Requirements

### Requirement: Escalating multi-wave script
The mission SHALL contain multiple deterministic waves that escalate from sparse introductory pressure to mixed archetype pressure.

#### Scenario: Waves escalate
- **WHEN** the player advances through the mission waves
- **THEN** later waves SHALL contain more enemies, tougher enemies, or more mixed behaviors than earlier waves

### Requirement: Five readable enemy archetypes
The mission SHALL include at least five original enemy archetypes with readable behavior differences.

#### Scenario: Enemy archetypes appear in waves
- **WHEN** a full mission is played or simulated
- **THEN** at least five enemy archetype identifiers SHALL appear across the wave script

#### Scenario: Enemy behavior is inspectable
- **WHEN** debug state describes active enemies
- **THEN** each enemy SHALL expose enough archetype/state information for tests to distinguish behavior-relevant differences
