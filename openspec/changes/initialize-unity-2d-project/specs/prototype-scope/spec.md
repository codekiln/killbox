## ADDED Requirements

### Requirement: One-map vertical prototype
The prototype SHALL contain exactly one playable mission map until the core loop is validated.

#### Scenario: Prototype mission session
- **GIVEN** the player starts the prototype
- **WHEN** the scene loads
- **THEN** the player SHALL enter a single arena with two enemy paths, fixed build pads, two heroes, shared gold, waves, and one objective

### Requirement: No online multiplayer in ugly prototype
The prototype SHALL use local co-op or placeholder second-player controls before online networking is implemented.

#### Scenario: Multiplayer request during prototype
- **GIVEN** online multiplayer is requested
- **WHEN** the ugly prototype is not yet fun locally
- **THEN** online multiplayer SHALL be deferred
