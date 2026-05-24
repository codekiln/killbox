# prototype-map Specification

## Purpose
Define the readable one-map arena foundation used by the browser prototype.
## Requirements
### Requirement: One arena with two lanes
The prototype map SHALL include two enemy entrances, two waypoint paths, one merge point, and one defended objective rendered in a Phaser scene.

#### Scenario: Enemy path A
- **GIVEN** an enemy spawns on path A
- **WHEN** it follows its waypoints
- **THEN** it SHALL move from the upper-left entrance toward the shared objective

#### Scenario: Enemy path B
- **GIVEN** an enemy spawns on path B
- **WHEN** it follows its waypoints
- **THEN** it SHALL move from the lower-left entrance toward the shared objective

#### Scenario: Paths merge before objective
- **GIVEN** the browser prototype is open
- **WHEN** the player or automated test inspects the waypoint placeholders
- **THEN** both paths SHALL visibly merge before reaching the defended objective

### Requirement: Fixed build pads
The prototype map SHALL use fixed build pads rather than free placement.

#### Scenario: Build pads visible
- **GIVEN** the browser prototype is open
- **WHEN** the player or automated test inspects the arena
- **THEN** exactly eight fixed build pads SHALL be visible around the lanes
