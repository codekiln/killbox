# scripted-wave-enemies Specification

## Purpose
Define deterministic scripted enemy waves for the prototype arena, including spawn data, movement, leak handling, and placeholder rendering.

## Requirements
### Requirement: Deterministic wave 1 enemy spawn
Starting wave 1 SHALL create a fixed deterministic batch of enemy entities split across path A and path B on the existing prototype map.

#### Scenario: Wave 1 starts with enemies on both paths
- **GIVEN** the prototype game state has no active enemies and wave 1 is ready
- **WHEN** wave 1 is started
- **THEN** the game state SHALL contain active enemies with stable IDs on path A and path B at their path entrances

#### Scenario: Repeated wave start does not duplicate enemies
- **GIVEN** wave 1 is already active with spawned enemies
- **WHEN** wave 1 is started again
- **THEN** the active enemy batch SHALL remain deterministic without duplicate spawned enemies

### Requirement: Enemy waypoint movement
Active enemies SHALL move deterministically along their assigned path waypoints when simulation time advances.

#### Scenario: Enemy advances along assigned path
- **GIVEN** wave 1 has active enemies on path A and path B
- **WHEN** the simulation advances by a known duration
- **THEN** each active enemy SHALL report a new position and progress along only its assigned path waypoints

#### Scenario: Movement snapshots are repeatable
- **GIVEN** two identical game states with wave 1 active
- **WHEN** both states advance by the same known simulation duration
- **THEN** their enemy positions, progress, statuses, and wave counters SHALL match

### Requirement: Enemy objective leaks
Enemies that reach the defended objective SHALL leak, leave active simulation, and apply their leak damage to objective HP.

#### Scenario: Enemy leaks into objective
- **GIVEN** an active enemy is near the end of its assigned path
- **WHEN** the simulation advances enough for the enemy to reach the objective
- **THEN** the enemy SHALL no longer count as active and the objective current HP SHALL be reduced by that enemy's leak damage

#### Scenario: Wave completes after all enemies leave active simulation
- **GIVEN** wave 1 is active and all remaining enemies are able to reach the objective
- **WHEN** the simulation advances until no active enemies remain
- **THEN** the wave SHALL no longer be active and the wave counters SHALL report no enemies remaining

### Requirement: Placeholder enemy rendering
The Phaser prototype scene SHALL render active enemies as readable placeholder shapes positioned on the existing two-lane map.

#### Scenario: Active enemies are visible
- **GIVEN** wave 1 has spawned active enemies
- **WHEN** the prototype scene renders the current game state
- **THEN** placeholder enemy shapes SHALL be visible at their current path positions

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
