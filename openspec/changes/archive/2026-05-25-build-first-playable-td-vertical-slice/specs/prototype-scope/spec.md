## MODIFIED Requirements

### Requirement: One-map vertical prototype
The prototype SHALL contain exactly one playable mission map until the core browser co-op loop is validated.

#### Scenario: Prototype mission session
- **GIVEN** the player starts the browser prototype
- **WHEN** the Phaser scene loads
- **THEN** the player SHALL enter a single playable mission with enemy paths, fixed build pads, tower construction, shared gold, escalating waves, two player-shaped session slots, and one objective

### Requirement: Remote co-op prototype direction
The prototype SHALL orient multiplayer testing around remote collaborators rather than same-device local co-op.

#### Scenario: Multiplayer request during prototype
- **GIVEN** multiplayer behavior is requested during the ugly prototype
- **WHEN** implementation is planned
- **THEN** the design SHALL favor browser-testable remote session flows over same-device local co-op setup
