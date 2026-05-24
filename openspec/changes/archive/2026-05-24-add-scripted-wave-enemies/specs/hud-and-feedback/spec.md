## MODIFIED Requirements

### Requirement: Placeholder HUD
The prototype scene SHALL show browser-rendered placeholder HUD text for objective HP, shared gold, wave state, enemy counts, and a center message log.

#### Scenario: Scene opens with HUD placeholders
- **GIVEN** the browser prototype is open
- **WHEN** the scene foundation is visible
- **THEN** objective HP, shared gold, wave, enemy count, and center message log placeholder values SHALL be readable

#### Scenario: HUD reflects wave enemy state
- **GIVEN** wave 1 has spawned enemies
- **WHEN** enemies move, leak, or finish the wave
- **THEN** the HUD wave text and message log SHALL reflect the current enemy count, leak events, and wave completion coherently
