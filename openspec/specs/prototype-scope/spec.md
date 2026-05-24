# prototype-scope Specification

## Purpose
Define the current one-map browser prototype scope and remote co-op testing direction.
## Requirements
### Requirement: One-map vertical prototype
The prototype SHALL contain exactly one playable mission map until the core browser co-op loop is validated.

#### Scenario: Prototype mission session
- **GIVEN** the player starts the browser prototype
- **WHEN** the Phaser scene loads
- **THEN** the player SHALL enter a single arena with two enemy paths, fixed build pads, two player slots, shared gold, waves, and one objective

### Requirement: Remote co-op prototype direction
The prototype SHALL orient multiplayer testing around remote collaborators rather than same-device local co-op.

#### Scenario: Multiplayer request during prototype
- **GIVEN** multiplayer behavior is requested during the ugly prototype
- **WHEN** implementation is planned
- **THEN** the design SHALL favor browser-testable remote session flows over same-device local co-op setup
