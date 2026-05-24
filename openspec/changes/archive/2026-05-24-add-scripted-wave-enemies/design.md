## Context

Killbox currently has a static browser-playable prototype arena with two enemy paths, fixed build pads, objective HP placeholders, wave placeholder state, and a debug API that exposes serializable snapshots. The `wave:set-active` command marks a wave active and sets a placeholder enemy count, but no enemy entities exist, no movement simulation runs, and objective HP does not change.

This change introduces the first real combat-loop state transition while preserving the current TypeScript/Vite/Phaser structure. The model remains the source of truth; Phaser renders whatever serializable state exists, and browser automation drives the same command path as interactive controls.

## Goals / Non-Goals

**Goals:**

- Represent active enemies in serializable game state.
- Spawn a fixed deterministic wave 1 batch across existing path A and path B.
- Advance enemy movement through an explicit deterministic command or tick path.
- Apply objective damage and remove enemies when they reach the objective.
- Keep wave counters, enemy statuses, and message log entries coherent.
- Render readable placeholder enemies in Phaser.
- Expose enemy and wave details through `window.__KILLBOX_DEBUG__`.
- Cover the behavior with focused state and debug API tests.

**Non-Goals:**

- Player attacks, tower targeting, tower projectiles, or damage-over-time systems.
- Enemy death from combat damage beyond placeholder HP/status fields.
- Additional maps, enemy types, economy changes, balance systems, or content randomization.
- Backend relay, production networking, or remote authoritative simulation.
- Visual polish beyond placeholder shapes and labels.

## Decisions

1. Keep enemy simulation inside `src/game/state.ts`.

   Enemy position, progress, status, and leak handling should be derived by pure state transitions so unit tests and browser automation can advance the game without depending on Phaser frame timing. `PrototypeScene` should continue to read state and redraw, not own enemy lifecycle logic.

   Alternative considered: move enemies in Phaser update loops first and sync state later. That would make the prototype feel animated earlier, but it would weaken deterministic tests and make the debug API less trustworthy.

2. Add an explicit simulation command for deterministic movement.

   Extend `GameCommand` with a command such as `simulation:tick` carrying elapsed milliseconds or seconds. Debug API dispatches can use this command, and future interactive or timed loops can call the same path. The implementation should clamp or ignore non-positive deltas so tests cannot accidentally create invalid progress.

   Alternative considered: have `wave:set-active` immediately simulate the full wave. That would prove leak damage, but it would skip inspectable intermediate states and make Phaser rendering less useful.

3. Spawn fixed wave 1 data from existing path definitions.

   Wave 1 should be deterministic and small enough to inspect manually. Each enemy should have a stable ID, path ID, max/current HP placeholder values, speed, leak damage, status, and current position. Spawning should use the existing entrances and waypoint arrays for paths A and B rather than duplicating map geometry.

   Alternative considered: introduce a general wave/balance table now. That is tempting, but it adds abstraction before there is more than one wave or enemy type.

4. Treat leaked enemies as removed from active simulation while retaining observable results.

   When an enemy reaches the objective, the state transition should reduce objective HP, remove it from the active `enemies` list or mark it as leaked before excluding it from active counters, update wave counters, and append a concise message log entry. Objective HP should not drop below zero.

   Alternative considered: keep all leaked enemies forever in the main enemy list. That helps historical debugging, but it complicates the first renderer and counters. If needed later, a compact leak history can be added separately.

5. Expand debug descriptions without replacing snapshots.

   `getState()` should remain the complete serializable source for tests. `describe()` should add summarized enemy and wave details that are easy for agents to read: active enemy count, path distribution, positions, HP/status, and supported controls including the simulation tick command.

   Alternative considered: expose only the raw snapshot. Raw snapshots are sufficient for unit tests, but the semantic description makes browser automation and human debugging faster.

## Risks / Trade-offs

- Deterministic movement can diverge from future animated movement -> Keep the deterministic state transition as the single source of truth and let Phaser interpolate later only as a presentation layer.
- Message log expectations may become brittle -> Test important entries and ordering lightly, while keeping exact copy concise and stable.
- Removing leaked enemies loses per-enemy history -> Preserve leak effects in objective HP, wave counters, and message log for this increment; add history only when a real consumer needs it.
- Debug API shape may grow quickly -> Add only the enemy fields needed by tests and agents now, and keep the full snapshot available for deeper inspection.
- Future networking may need authoritative simulation -> The command-based tick path is compatible with later replay or server-authoritative command streams, even though this increment stays local.
