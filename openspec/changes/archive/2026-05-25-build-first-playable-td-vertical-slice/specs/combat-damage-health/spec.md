## ADDED Requirements

### Requirement: Mission outcome state
The mission SHALL expose active, victory, and defeat states based on wave completion and objective health.

#### Scenario: Victory after final wave
- **WHEN** all scripted waves are completed and objective HP remains above zero
- **THEN** the mission SHALL enter a victory state

#### Scenario: Defeat when objective falls
- **WHEN** objective current HP reaches zero
- **THEN** the mission SHALL enter a defeat state and stop active enemy pressure until restarted

### Requirement: Health bars and damage feedback
Combatants and the objective SHALL provide readable health and damage feedback through rendering or semantic debug state.

#### Scenario: Enemy health changes after attack
- **WHEN** a tower damages an active enemy
- **THEN** the enemy's current HP SHALL decrease and the change SHALL be visible or inspectable
