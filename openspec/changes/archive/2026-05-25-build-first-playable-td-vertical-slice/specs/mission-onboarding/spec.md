## ADDED Requirements

### Requirement: In-game onboarding
The mission SHALL teach the first playable loop through concise in-game guidance without relying on README instructions.

#### Scenario: First screen guidance
- **WHEN** the browser prototype loads the mission
- **THEN** the player SHALL see guidance for building towers, starting waves, defending the objective, and restarting

#### Scenario: Contextual build guidance
- **WHEN** the player selects an empty pad
- **THEN** the game SHALL present the available tower choices with readable costs and roles

### Requirement: Fast retry loop
The mission SHALL provide a fast restart path after defeat, victory, or while testing the mission.

#### Scenario: Restart after defeat
- **WHEN** the objective reaches zero HP
- **THEN** the player SHALL be able to restart the mission and return to the initial playable state

#### Scenario: Restart after victory
- **WHEN** the final wave is completed and the objective remains alive
- **THEN** the player SHALL be able to restart the mission without reloading the page
