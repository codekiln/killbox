# ai-observability Specification

## Purpose
Define the semantic browser state and test-facing commands that make the prototype inspectable by automated agents.
## Requirements
### Requirement: Semantic browser state
The system SHALL expose enough semantic game state for automated agents to inspect scenes, player slots, objective HP, wave state, entities, build pads, and major controls.

#### Scenario: Agent inspects game state
- **GIVEN** the prototype is running in a browser
- **WHEN** an automated test queries the page
- **THEN** it SHALL be able to determine the current scene, active players, objective HP, wave state, and major interactable controls

### Requirement: Agent-drivable actions
The system SHALL provide stable browser-visible controls or debug commands for prototype actions that automated tests need to exercise.

#### Scenario: Agent simulates a basic action
- **GIVEN** the prototype is running in a test or development browser
- **WHEN** an automated test triggers a supported player action
- **THEN** the game state SHALL update through the same command path used by interactive play

### Requirement: Deterministic inspectable state snapshots
The system SHALL make core prototype state serializable so tests can compare before-and-after snapshots.

#### Scenario: Test compares simulation state
- **GIVEN** a test has captured a state snapshot
- **WHEN** the simulation advances after a known action
- **THEN** the next snapshot SHALL expose predictable changes for objective, wave, player, and build-pad state
