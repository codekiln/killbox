## ADDED Requirements

### Requirement: mise task entry points
The repository SHALL expose common development commands through mise tasks when practical.

#### Scenario: Developer lists tasks
- **GIVEN** mise is installed
- **WHEN** the developer runs `mise tasks`
- **THEN** common project tasks SHALL be discoverable

### Requirement: Unity project instructions
The repository SHALL document how to open the Unity project and what Unity version is expected.

#### Scenario: New developer setup
- **GIVEN** a developer has cloned the repository
- **WHEN** they read the README
- **THEN** they SHALL understand how to open the Unity project and run the prototype scene
