## 1. State Model And Wave Spawning

- [ ] 1.1 Add serializable enemy types and extend `GameState`/`WaveState` with active enemy and wave lifecycle fields needed by the specs.
- [ ] 1.2 Define the fixed deterministic wave 1 enemy batch across existing path A and path B, using stable enemy IDs and path entrances.
- [ ] 1.3 Update the wave start command so starting wave 1 spawns enemies once, sets coherent counters, and logs the wave start.
- [ ] 1.4 Add state unit tests for initial enemy-free snapshots, deterministic wave 1 spawning, and duplicate-start prevention.

## 2. Deterministic Simulation

- [ ] 2.1 Add a deterministic simulation advance command to `GameCommand` and route it through `applyGameCommand`.
- [ ] 2.2 Implement waypoint movement along existing path geometry with repeatable positions/progress for a known duration.
- [ ] 2.3 Implement objective leaks that remove enemies from active simulation, decrement objective HP without going below zero, update counters, and log leak events.
- [ ] 2.4 Mark the wave inactive and log completion when no active enemies remain.
- [ ] 2.5 Add state unit tests for movement snapshots, leak damage, enemy removal, objective HP clamping, and wave completion.

## 3. Debug API And Inspectable State

- [ ] 3.1 Extend `describeGameState` so browser agents can inspect active enemy count, positions, HP/status, path IDs, and wave lifecycle state.
- [ ] 3.2 Add the simulation advance command to the debug API controls list and ensure debug dispatch returns updated serializable snapshots.
- [ ] 3.3 Update DOM semantic summary data/text where useful so enemy and wave state are browser-inspectable without parsing Phaser graphics.
- [ ] 3.4 Add debug unit tests for enemy snapshot fields, simulation dispatch, objective leak visibility, and supported controls.

## 4. Phaser Rendering And HUD Feedback

- [ ] 4.1 Render active enemies in `PrototypeScene` as simple placeholder shapes at their current state positions.
- [ ] 4.2 Update HUD wave/enemy text so active enemy counts and wave readiness/completion are readable.
- [ ] 4.3 Ensure message log rendering remains coherent for wave start, enemy leaks, and wave completion.
- [ ] 4.4 Keep all rendering state derived from the serializable game model, with no enemy lifecycle owned by Phaser.

## 5. Validation

- [ ] 5.1 Run the focused unit test suite for state and debug behavior.
- [ ] 5.2 Run the full unit test suite.
- [ ] 5.3 Run the production build or typecheck entry point used by the project.
- [ ] 5.4 Run strict OpenSpec validation for `add-scripted-wave-enemies`.
