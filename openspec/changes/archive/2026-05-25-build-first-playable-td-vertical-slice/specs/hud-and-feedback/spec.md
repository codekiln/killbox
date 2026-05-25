## ADDED Requirements

### Requirement: Playable mission HUD
The HUD SHALL communicate objective HP, shared gold, wave progress, mission outcome, selected pad state, and tower choices.

#### Scenario: HUD updates after building
- **WHEN** the player builds a tower
- **THEN** the HUD SHALL update shared gold and selected pad/tower information

#### Scenario: HUD updates during waves
- **WHEN** a wave is active
- **THEN** the HUD SHALL show current wave progress and remaining enemy pressure

### Requirement: Combat feedback readability
The scene SHALL show clear placeholder feedback for tower ranges, attacks, splash or magic effects, blockers, enemy health, leaks, victory, and defeat.

#### Scenario: Attack feedback visible
- **WHEN** towers attack enemies
- **THEN** the player SHALL see transient feedback connecting attacks to affected enemies
