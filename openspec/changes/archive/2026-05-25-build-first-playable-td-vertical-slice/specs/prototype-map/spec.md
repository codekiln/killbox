## ADDED Requirements

### Requirement: Readable tactical lane topology
The playable mission map SHALL use original lane geometry with bends, a merge pressure point, chokepoint opportunities, and curated tower pads.

#### Scenario: Map communicates choke pressure
- **WHEN** the mission renders in the browser
- **THEN** the player SHALL be able to identify entrances, lane bends, the merge point, curated pads, and the defended objective

#### Scenario: Pad positions support tactical variety
- **WHEN** the player inspects available build pads
- **THEN** some pads SHALL visibly favor early lane coverage, some SHALL favor merge coverage, and some SHALL favor objective cleanup
