# hud-and-feedback Specification

## Purpose
Define the prototype HUD and readability feedback required before final art exists.
## Requirements
### Requirement: Placeholder HUD
The prototype scene SHALL show browser-rendered placeholder HUD text for objective HP, shared gold, wave, and a center message log.

#### Scenario: Scene opens with HUD placeholders
- **GIVEN** the browser prototype is open
- **WHEN** the scene foundation is visible
- **THEN** objective HP, shared gold, wave, and center message log placeholder values SHALL be readable

### Requirement: Scene readability labels
The prototype scene SHALL include labels or debug-style placeholders that explain the arena layout without final art.

#### Scenario: Developer reads the map
- **GIVEN** no final art exists
- **WHEN** the developer views the browser prototype
- **THEN** the battlefield, entrances, paths, objective, merge point, and build pads SHALL be understandable from placeholder labels
