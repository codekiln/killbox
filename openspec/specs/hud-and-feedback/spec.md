# hud-and-feedback Specification

## Purpose
Define the prototype HUD and readability feedback required before final art exists.
## Requirements
### Requirement: Playable mission HUD
The HUD SHALL communicate objective HP, shared gold, wave progress, mission outcome, selected pad state, and tower choices.

#### Scenario: Scene opens with HUD state
- **GIVEN** the browser prototype is open
- **WHEN** the scene foundation is visible
- **THEN** objective HP, shared gold, wave, enemy count, and message log values SHALL be readable

#### Scenario: HUD updates after building
- **WHEN** the player builds a tower
- **THEN** the HUD SHALL update shared gold and selected pad/tower information

#### Scenario: HUD reflects wave enemy state
- **GIVEN** wave 1 has spawned enemies
- **WHEN** enemies move, leak, or finish the wave
- **THEN** the HUD wave text and message log SHALL reflect the current enemy count, leak events, and wave completion coherently

### Requirement: Scene readability labels
The prototype scene SHALL include labels or debug-style placeholders that explain the arena layout without final art.

#### Scenario: Developer reads the map
- **GIVEN** no final art exists
- **WHEN** the developer views the browser prototype
- **THEN** the battlefield, entrances, paths, objective, merge point, and build pads SHALL be understandable from placeholder labels

### Requirement: Combat feedback readability
The scene SHALL show clear prototype feedback for tower ranges, attacks, splash or magic effects, blockers, enemy health, leaks, victory, and defeat.

#### Scenario: Attack feedback visible
- **WHEN** towers attack enemies
- **THEN** the player SHALL see transient feedback connecting attacks to affected enemies
