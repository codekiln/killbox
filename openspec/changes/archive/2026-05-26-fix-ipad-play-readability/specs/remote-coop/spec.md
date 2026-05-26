## MODIFIED Requirements

### Requirement: Static host does not imply backend
The GitHub Pages client SHALL not assume that the static host provides persistent multiplayer backend services or display inactive remote player slots as active world actors.

#### Scenario: No relay configured
- **GIVEN** the prototype is served from GitHub Pages without a relay endpoint
- **WHEN** a player starts the prototype
- **THEN** the client SHALL still support single-browser play or mock-session testing without failing to load

#### Scenario: Inactive second player is not rendered
- **GIVEN** Player 2 has not opted into the session
- **WHEN** the Play route renders the initial mission
- **THEN** the world view SHALL show only connected player markers
