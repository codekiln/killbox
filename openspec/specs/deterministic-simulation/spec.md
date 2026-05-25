# deterministic-simulation Specification

## Purpose
Define fixed-tick, command-driven simulation behavior needed for repeatable tests and future multiplayer experiments.

## Requirements
### Requirement: Fixed-tick command simulation
The gameplay core SHALL advance authoritative simulation through fixed ticks and explicit commands rather than render-frame-dependent deltas.

#### Scenario: Same commands produce same outcome
- **WHEN** two initial mission states receive the same ordered commands and same number of fixed simulation ticks
- **THEN** their serialized snapshots SHALL match

#### Scenario: Render frame does not mutate rules
- **WHEN** the Phaser scene renders a snapshot without dispatching commands
- **THEN** authoritative gameplay state SHALL NOT change

### Requirement: Replay-friendly state
The gameplay state SHALL remain serializable enough for future replay, lockstep, or rollback experiments.

#### Scenario: Snapshot clone preserves state
- **WHEN** a full-match state is serialized and cloned
- **THEN** the clone SHALL preserve mission outcome, entities, resources, wave state, and objective HP

### Requirement: Stable simulation ordering
Simulation systems SHALL process entities and commands in deterministic stable order.

#### Scenario: Stable targeting tie-break
- **WHEN** a tower has multiple equally valid targets
- **THEN** the chosen target SHALL be determined by stable game-state data rather than JavaScript insertion timing or render order
