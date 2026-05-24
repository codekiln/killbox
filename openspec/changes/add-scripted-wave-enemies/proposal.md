## Why

Killbox has a readable arena, objective HP placeholders, and a browser debug API, but it does not yet have enemies that make the defense loop real. Scripted wave enemies are the next smallest increment that turns the map into a deterministic combat-loop foundation while staying testable before attacks, towers, projectiles, or networking are added.

## What Changes

- Add serializable enemy state to the game model, including enemy IDs, path IDs, positions, HP/status, progress, and leak damage metadata.
- Make starting wave 1 spawn a fixed deterministic enemy batch split across the existing path A and path B waypoints.
- Add a deterministic simulation tick/debug command so tests and browser agents can advance enemy movement without depending on wall-clock Phaser timing.
- Remove enemies that reach the defended objective and apply objective HP damage for each leak.
- Keep wave active/enemy counters and message log entries coherent as enemies spawn, move, leak, and finish the wave.
- Render active enemies in Phaser with readable placeholder shapes on the existing two-lane prototype map.
- Expose enemy positions, HP/status, path IDs, and wave lifecycle state through `window.__KILLBOX_DEBUG__`.
- Add focused unit tests for deterministic spawning, movement, leak damage, wave completion, and inspectable debug snapshots.
- Non-goals: player attacks, tower targeting, projectiles, enemy death from real damage, new maps, new enemy types, balance systems, backend relay work, production networking, and visual polish beyond readable placeholders.

## Capabilities

### New Capabilities

- `scripted-wave-enemies`: Defines deterministic wave 1 enemy spawning, path movement, objective leaks, enemy lifecycle state, and placeholder enemy rendering.

### Modified Capabilities

- `combat-damage-health`: Objective HP changes from a static placeholder to leak-damaged state when enemies reach the defended objective.
- `hud-and-feedback`: HUD wave/counter text and message log must reflect spawned enemies, leaks, and wave completion coherently.
- `ai-observability`: Browser debug snapshots and commands must expose enemy/wave state and provide deterministic simulation advancement.

## Impact

- Affected game state: `src/game/state.ts` enemy model, wave model, command handling, deterministic simulation tick, and serializable snapshots.
- Affected debug API: `src/game/debug.ts` description payload, command list, and DOM/debug summary for enemies and simulation.
- Affected rendering: `src/scenes/PrototypeScene.ts` placeholder enemy drawing and HUD/log updates after deterministic state changes.
- Affected app wiring: `src/main.ts` dispatch path continues to route debug and interactive commands through the same state transition API.
- Affected tests: `tests/state.test.ts`, `tests/debug.test.ts`, and any focused e2e readiness assertions that depend on wave/debug state.
- No new runtime dependencies or backend services are expected.
