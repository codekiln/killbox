## Context

Killbox currently boots a static TypeScript/Vite/Phaser client, renders a two-lane prototype map, exposes `window.__KILLBOX_DEBUG__`, and applies immutable game commands through `src/game/state.ts`. The existing scaffold is good for browser automation and GitHub Pages, but the gameplay model is still a placeholder: build pads toggle generic occupancy, enemies only move/leak, and time advances through arbitrary `deltaMs` commands.

The vertical slice should keep the repo's current stack and browser-first shape while moving authoritative gameplay into a deterministic, data-driven core. Phaser should become a renderer/input adapter for serializable snapshots, not the owner of combat rules.

## Goals / Non-Goals

**Goals:**

- Deliver one original, playable tower-defense mission with onboarding, escalating waves, economy, victory, defeat, and restart.
- Support four tower archetypes and at least five enemy archetypes using original names, simple shapes, and legally distinct data.
- Make simulation fixed-tick and command-driven so identical initial state plus identical commands produces identical full-match snapshots.
- Keep map, tower, enemy, and wave definitions externalized from rule code for fast collaborator iteration.
- Preserve GitHub Pages compatibility, debug API inspectability, and the existing mock transport boundary.

**Non-Goals:**

- No live multiplayer, backend relay, accounts, campaign map, monetization, procedural generation, Unity migration, or production art/audio.
- No copying Kingdom Rush assets, names, dialogue, code, exact map topology, or proprietary balance data.
- No broad ECS framework migration unless the lightweight entity/component shape blocks deterministic tests.

## Decisions

### Keep Phaser, isolate simulation

Use Phaser for canvas rendering, pointer input, layout, and simple visual feedback. Move authoritative state transitions into pure TypeScript modules under `src/game/`, with Phaser dispatching commands and rendering snapshots.

Alternatives considered:
- Switch to PixiJS. Pixi is excellent for rendering, but the repo already uses Phaser and the first playable benefits from Phaser's scene/input ergonomics.
- Hand-roll Canvas. This would reduce dependency surface but slow UI/playability iteration.

### Use a lightweight ECS-compatible state model

Represent towers, enemies, blockers, projectiles/effects, pads, and wave state as entity records/components inside serializable game state. Systems operate in stable order over sorted entity IDs. This keeps the model ECS-compatible without adding a library.

Alternatives considered:
- Adopt an ECS package now. Deferred because the prototype needs a vertical slice more than a framework decision.
- Keep bespoke arrays only. Too brittle for blockers, effects, targeting, and future multiplayer replay.

### Fixed-tick command simulation

Introduce a deterministic tick size and commands such as `tower:build`, `wave:start`, `mission:restart`, and `simulation:step`. Browser frames may dispatch one or more fixed steps, but game rules should not depend on render delta. Unit tests will replay command/tick sequences and compare final snapshots.

Alternatives considered:
- Continue arbitrary `deltaMs` ticks. This is easy but weaker for replay/lockstep.
- Fully implement rollback now. Deferred; the snapshot/command/tick design should keep rollback possible later.

### Data-driven content

Create content definitions for the first mission map, tower definitions, enemy definitions, and wave scripts. Data should use original names and small numeric values tuned for readability. The first implementation can keep data as TypeScript modules for type safety and hot reload, with JSON export remaining possible later.

Alternatives considered:
- Put all content in JSON immediately. TS modules are faster and safer for this repo's current tests.
- Hard-code in systems. Rejected because collaborator balance iteration is a core requirement.

### Rendering favors clarity over asset production

Use polished vector-like Phaser primitives, labels, health bars, range rings, projectile/effect shapes, and UI panels. This satisfies readability and legal distinction without introducing an asset pipeline.

Alternatives considered:
- Generate art assets. Deferred until combat feel is validated.
- Use third-party assets. Avoided for licensing and iteration simplicity.

## Risks / Trade-offs

- [Risk] The one-change scope is large. -> Mitigate by sequencing toward a playable vertical slice first: data model, deterministic waves, towers, onboarding, docs, verification.
- [Risk] Determinism can be broken by floating point drift, unordered iteration, or render-time mutation. -> Mitigate with fixed ticks, rounding/snapshot normalization where needed, stable ID ordering, and tests that compare full-match snapshots.
- [Risk] Phaser event handlers could accidentally own gameplay state. -> Mitigate by making scene handlers dispatch commands only.
- [Risk] Blocker/barracks behavior can become complex. -> Mitigate with deterministic lane interceptors that delay/absorb enemies through simple contact rules rather than free-moving squad AI.
- [Risk] GitHub Pages base-path regressions could create a blank public page. -> Mitigate with `GITHUB_PAGES=true npm run build` or equivalent build verification plus existing e2e smoke coverage.
- [Risk] Southport inspiration could drift too close to protected expression. -> Mitigate with original map layout, terms, enemy/tower names, copy, visuals, and balance values; only abstract pacing lessons are used.

## Migration Plan

1. Add data modules and deterministic simulation helpers while preserving current exported `createInitialGameState`, `applyGameCommand`, and debug API concepts.
2. Replace pad toggling with explicit build commands and tower state.
3. Add fixed-step wave, enemy, tower, projectile/effect, blocker, economy, victory/defeat, and restart behavior.
4. Update Phaser scene to render the richer snapshot and dispatch commands.
5. Expand tests for deterministic combat and browser playability.
6. Update README and docs, sync specs, validate, then archive.

Rollback:
- Revert scene changes independently from simulation/data modules if rendering breaks.
- Preserve or restore the previous debug command compatibility for smoke tests if needed.
- Keep new content isolated so a problematic archetype can be removed without undoing the core loop.

## Open Questions

- Exact balance values will be tuned during implementation against the "first playable" feel rather than frozen in the design.
- Production-grade coop networking protocol details remain deferred; this change should only keep command/snapshot boundaries ready.
