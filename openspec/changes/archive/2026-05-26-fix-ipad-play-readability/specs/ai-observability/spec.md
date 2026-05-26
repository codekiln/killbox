## MODIFIED Requirements

### Requirement: Semantic browser state
The system SHALL expose enough semantic game state for automated agents to inspect scenes, player slots, objective HP, wave state, enemy state, entities, build pads, and major controls without requiring the semantic debug output to be visible by default.

#### Scenario: Agent inspects game state
- **GIVEN** the prototype is running in a browser
- **WHEN** an automated test queries the page
- **THEN** it SHALL be able to determine the current scene, active players, objective HP, wave state, active enemy positions, enemy HP/status, enemy path IDs, and major interactable controls

#### Scenario: Semantic output is present but not player-facing
- **WHEN** the Play route loads in a normal browser session
- **THEN** semantic debug text SHALL remain available in stable DOM/debug API state
- **AND** it SHALL NOT be visible as a default overlay
