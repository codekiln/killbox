## ADDED Requirements

### Requirement: Rich debug state for playable mission
The debug API SHALL expose mission, tower, enemy, wave, command, outcome, and content summary state for automated verification.

#### Scenario: Debug state describes combat entities
- **WHEN** automation calls `window.__KILLBOX_DEBUG__.describe()`
- **THEN** the response SHALL include active towers, active enemies, wave progress, mission outcome, available commands, and content counts

#### Scenario: Debug command drives full match
- **WHEN** automation dispatches supported build, wave, restart, and simulation commands
- **THEN** the debug API SHALL return serializable snapshots that reflect deterministic mission progress
