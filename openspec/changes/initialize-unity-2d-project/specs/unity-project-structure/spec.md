## ADDED Requirements

### Requirement: Unity 2D project layout
The repository SHALL contain a Unity 2D project with game code under `Assets/_Killbox`.

#### Scenario: Developer opens the project
- **GIVEN** the repository has been cloned
- **WHEN** the developer opens the Unity project
- **THEN** Unity SHALL load a project named Killbox with a prototype scene available under `Assets/_Killbox/Scenes`

### Requirement: Unity generated files excluded
The repository SHALL ignore Unity-generated local files and build artifacts.

#### Scenario: Git status after opening Unity
- **GIVEN** the developer opens the project in Unity
- **WHEN** Unity generates local cache files
- **THEN** `Library/`, `Temp/`, `Obj/`, `Logs/`, `UserSettings/`, and build outputs SHALL not appear as tracked changes
