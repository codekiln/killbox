## ADDED Requirements

### Requirement: Multiplayer-ready command boundary
The playable mission SHALL keep player intent represented as commands that can later be carried by the transport abstraction.

#### Scenario: Local command is transport-shaped
- **WHEN** the local player builds a tower, starts a wave, restarts, or advances simulation through automation
- **THEN** the action SHALL be represented as an explicit command suitable for future remote synchronization

### Requirement: No backend dependency for playable slice
The playable mission SHALL remain usable from static hosting without a multiplayer relay.

#### Scenario: Static single-player load
- **WHEN** the GitHub Pages build loads without relay configuration
- **THEN** the single-player mission SHALL still be playable
