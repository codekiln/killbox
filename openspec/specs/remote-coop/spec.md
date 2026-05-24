# remote-coop Specification

## Purpose
Define the remote co-op testing direction and staged multiplayer transport expectations for the web prototype.
## Requirements
### Requirement: Remote co-op first
The prototype SHALL treat remote collaborative play as the primary multiplayer testing mode.

#### Scenario: Two remote players join a session
- **GIVEN** one player creates or hosts a prototype session
- **WHEN** another player joins using a session link or code
- **THEN** both players SHALL participate in the same authoritative game state

### Requirement: Staged multiplayer transport
The system SHALL separate game simulation from transport so networking can progress from local simulation to mock sessions to a real relay.

#### Scenario: Two-tab mock session
- **GIVEN** the prototype is running in two browser contexts
- **WHEN** both contexts use the mock transport
- **THEN** automated tests SHALL be able to drive both players against the same protocol-shaped session flow

### Requirement: Static host does not imply backend
The GitHub Pages client SHALL not assume that the static host provides persistent multiplayer backend services.

#### Scenario: No relay configured
- **GIVEN** the prototype is served from GitHub Pages without a relay endpoint
- **WHEN** a player starts the prototype
- **THEN** the client SHALL still support single-browser play or mock-session testing without failing to load
