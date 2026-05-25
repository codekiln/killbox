## Why

Killbox already has a browser-ready TypeScript/Vite/Phaser scaffold with inspectable state, fixed pads, two lanes, and a mock transport, but it is not yet a playable tower-defense loop. The next best increment is a legally distinct first playable mission that proves pacing, onboarding, wave economy, combat readability, and deterministic simulation boundaries before adding real networking or broader content.

## Problem

The current prototype lets automation inspect a scene, toggle pads, and spawn a small enemy batch, but players cannot make meaningful tactical choices: towers do not attack, enemy archetypes are shallow, waves do not escalate, and the update loop is not yet shaped as a fixed-tick, input-driven simulation suitable for replay or future lockstep/rollback.

## Motivation

The fastest path to a useful prototype is a single polished map with enough combat and onboarding to evaluate the feel. This keeps iteration cheap for two remote collaborators while preventing the project from drifting into engine migration, backend work, or overly broad campaign scaffolding.

## Constraints

- The implementation MUST be legally distinct from Kingdom Rush and MUST NOT copy its copyrighted assets, names, art, audio, code, or dialogue.
- The first playable MUST remain deployable as static GitHub Pages output.
- The primary stack remains TypeScript, Vite, and Phaser unless implementation reveals a blocker.
- Phaser MUST be treated as presentation/input infrastructure; deterministic gameplay rules MUST live in serializable game-state modules.
- Simulation changes MUST favor fixed ticks, explicit commands, stable ordering, deterministic math, replay-friendly snapshots, and no singleton/global mutable state.
- The entity model MUST be ECS-compatible even if the implementation stays lightweight for this vertical slice.
- Towers, enemies, waves, and map data MUST be data-driven enough for fast balance iteration.
- Multiplayer work remains future-facing: no live networking, backend relay, accounts, monetization, MMO systems, procedural generation, Unity migration, or exact Kingdom Rush cloning.

## Research Summary

- Phaser remains suitable for this increment because the project is already Phaser-based and Phaser is a browser-focused 2D framework with WebGL/Canvas support and TypeScript usage; PixiJS is a strong renderer, but its official docs frame it around rendering systems rather than full game-loop/game-object ergonomics, so switching would slow the first playable without reducing deterministic-core risk ([Phaser GitHub](https://github.com/phaserjs/phaser), [PixiJS renderers](https://pixijs.com/8.x/guides/components/renderers)).
- Deterministic simulation should use a fixed-step, input-driven loop with update/render separation. Lockstep designs advance frames from known inputs, and fixed timestep literature emphasizes repeatable outputs from identical inputs ([Gaffer on Games: deterministic lockstep](https://gafferongames.com/post/deterministic_lockstep/), [Game Programming Patterns: game loop](https://gameprogrammingpatterns.com/game-loop.html)).
- Vite and GitHub Pages remain compatible if builds produce static `dist` assets and the repository Pages base path is configured correctly, which the current `vite.config.ts` already supports through `GITHUB_PAGES=true` ([Vite static deploy guide](https://github.com/vitejs/vite/blob/main/docs/guide/static-deploy.md), [GitHub Pages docs](https://docs.github.com/pages/getting-started-with-github-pages/creating-a-github-pages-site)).
- Southport-like onboarding/pacing can be studied at the level of public facts: it is an introductory, small-wave map with fixed strategic points, initially limited tower availability, and waves that grow from sparse enemies into denser later pressure. Killbox will use only this abstract teaching arc and tactical grammar, with original names, visuals, data, layout, copy, and enemy/tower identities ([Kingdom Rush Wiki: Southport](https://kingdomrushtd.fandom.com/wiki/Southport), [StrategyWiki: Southport](https://strategywiki.org/wiki/Kingdom_Rush/Southport)).
- Open-source browser TD examples validate that Phaser/Vite is a common stack for lightweight web TD prototypes, while deterministic multiplayer-oriented projects show the value of separating browser rendering from shared core simulation ([SerhiiChoGames/tower-defense](https://github.com/SerhiiChoGames/tower-defense), [OpenFront core simulation overview](https://openfrontio-openfrontio.mintlify.app/technical/core-simulation)).

## What Changes

- Add a playable single-player mission loop on the existing one-map foundation:
  - original map dressing and lane layout with bends, merge pressure, chokepoints, and curated pads
  - clear onboarding prompts and fast restart/next-run controls
  - escalating scripted waves with gold income and leak/loss/victory states
- Introduce four original tower archetypes:
  - ranged direct-damage tower
  - artillery splash tower
  - magic armor-piercing/slow tower
  - blocker/barracks tower that creates deterministic interceptors
- Introduce at least five original enemy archetypes with readable behavior differences.
- Convert combat into deterministic fixed-tick simulation driven by explicit commands:
  - build tower
  - start wave early/when ready
  - restart mission
  - fixed simulation tick advancement
- Externalize map, tower, enemy, and wave data from the core rules enough for collaborators to tune content quickly.
- Separate simulation modules from Phaser rendering and keep snapshots serializable/debuggable.
- Expand unit/e2e tests for deterministic full-match runs, tower combat, wave progression, onboarding visibility, restart, and GitHub Pages build compatibility.
- Update README and architecture/reference docs to match the actual playable slice.

## Capabilities

### New Capabilities

- `tower-defense-combat`: Covers data-driven tower archetypes, targeting, projectiles/effects, blocker behavior, economy spend/refund rules where applicable, and deterministic enemy defeat.
- `mission-onboarding`: Covers in-game first-run guidance, readable controls, restart/victory/defeat flow, and fast retry behavior.
- `deterministic-simulation`: Covers fixed-tick, command-driven simulation, serializable snapshots, replay/full-match determinism, and future lockstep/rollback readiness.
- `content-data`: Covers externalized map, tower, enemy, and wave data contracts used by both simulation and rendering.

### Modified Capabilities

- `prototype-scope`: Expand the one-map prototype from arena scaffold to playable single-player mission while preserving remote-coop direction.
- `prototype-map`: Refine the map requirement from placeholder lanes/pads to a polished readable lane topology with chokepoints and curated pad roles.
- `scripted-wave-enemies`: Expand from one deterministic enemy batch to escalating multi-wave scripted content with multiple archetypes.
- `combat-damage-health`: Expand leak-only objective damage to include tower damage, enemy health depletion, victory, defeat, and reward flow.
- `hud-and-feedback`: Add player-facing combat/economy/wave feedback and onboarding-readable states.
- `ai-observability`: Expose richer semantic debug state for tests, replay, commands, towers, waves, and full-match outcomes.
- `remote-coop`: Clarify future multiplayer boundaries around input-driven deterministic simulation without implementing live networking.
- `web-game-structure`: Document the new simulation/render/data boundaries and Pages-compatible build checks.
- `reference-documentation`: Update glossary/docs with the actual first playable architecture and legally distinct terminology.

## Architecture Impact

- `src/game/state.ts` will either shrink into orchestration or be split into simulation-focused modules under `src/game/` for deterministic entities, commands, ticks, systems, and snapshots.
- Phaser scene code in `src/scenes/PrototypeScene.ts` will render snapshots and dispatch commands but MUST NOT own authoritative combat rules.
- New content data files will define mission map geometry, pads, tower definitions, enemy definitions, and wave scripts.
- Tests will treat the simulation as the primary correctness surface and Phaser/browser e2e as playability/readability verification.
- The debug API will remain the automation contract and expand without depending on Phaser internals.

## Acceptance Criteria

- Local setup, run, test, and deployment instructions are documented.
- `npm run lint`, `npm run test`, `npm run build`, and `npm run spec-check` pass.
- GitHub Pages-compatible Vite build behavior is preserved and documented.
- One original playable map exists with bends/chokepoints, curated tower pads, readable lanes, and one objective.
- The player can build all four tower archetypes, start waves, earn/spend gold, win, lose, and restart quickly.
- At least five enemy archetypes appear across escalating waves with readable differences.
- Onboarding is understandable in-game without external explanation.
- Combat feedback communicates targeting, hits, leaks, defeats, wave state, economy, victory, and defeat.
- A full match simulation is deterministic from the same initial state and command/tick sequence.
- Game state remains serializable, replay-friendly, input-driven, and free of simulation-critical global mutable singletons.
- README, architecture/reference docs, OpenSpec specs, and implementation remain synchronized.
- No critical TODO placeholders remain in the completed vertical slice.

## Rollback Strategy

- Keep the change scoped to one OpenSpec change and small coherent implementation steps so individual file groups can be reverted if needed.
- Preserve existing public debug API concepts where possible; if a new API shape breaks tests, restore the prior `createInitialGameState`/`applyGameCommand` contract and reintroduce features behind additive commands.
- Avoid irreversible asset/dependency migrations. If Phaser-specific rendering work fails, keep deterministic simulation/data modules and roll back only the scene layer.
- If a full playable slice becomes too large for one pass, complete the deterministic single-wave combat loop first, mark remaining tasks incomplete, and do not archive until specs/docs/tasks honestly reflect reality.

## Non-goals

- No Unity migration, backend-heavy infra, live multiplayer, accounts, monetization, procedural generation, MMO systems, or exact Kingdom Rush clone.
- No copyrighted Kingdom Rush names, dialogue, art, audio, code, map layout, or asset tracing.
- No production ECS library adoption unless the lightweight model blocks deterministic tests or content iteration.
