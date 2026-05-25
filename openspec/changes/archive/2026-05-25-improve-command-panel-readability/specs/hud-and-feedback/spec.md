## ADDED Requirements

### Requirement: Readable command panel hierarchy
The playable mission command panel SHALL organize mission status, tower choices, wave actions, tactical hints, and recent messages so text does not overlap and controls are easy to scan.

#### Scenario: Command panel is readable
- **WHEN** the browser prototype renders the command panel
- **THEN** mission status, build controls, wave controls, and hints SHALL appear in visually distinct areas without overlapping text

#### Scenario: Tower choices remain actionable
- **WHEN** the player inspects tower choices in the command panel
- **THEN** each tower option SHALL show its label, cost, and role and remain clickable through the existing build command path
