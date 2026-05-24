## MODIFIED Requirements

### Requirement: Objective health placeholder
The defended objective SHALL expose maximum HP and current HP values through serializable game state, and current HP SHALL decrease when enemies leak into the objective.

#### Scenario: Objective placeholder state
- **GIVEN** the browser prototype is open before enemies leak
- **WHEN** the objective is displayed through the HUD or semantic debug state
- **THEN** objective max HP and current HP SHALL be available as inspectable values

#### Scenario: Objective takes leak damage
- **GIVEN** a wave enemy reaches the defended objective
- **WHEN** the enemy leaks into the objective
- **THEN** objective current HP SHALL decrease by the enemy's leak damage without dropping below zero
