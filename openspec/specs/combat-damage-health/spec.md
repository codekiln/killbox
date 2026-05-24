# combat-damage-health Specification

## Purpose
Define inspectable objective health state before combat and leak damage are implemented.
## Requirements
### Requirement: Objective health placeholder
The defended objective SHALL expose maximum HP and current HP values through serializable game state before combat or leak damage is implemented.

#### Scenario: Objective placeholder state
- **GIVEN** the browser prototype is open
- **WHEN** the objective placeholder is displayed through the HUD or semantic debug state
- **THEN** objective max HP and current HP SHALL be available as placeholder values
