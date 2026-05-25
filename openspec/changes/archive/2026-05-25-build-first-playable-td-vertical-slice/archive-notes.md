# Archive Notes: build-first-playable-td-vertical-slice

## Rationale

This change turned the existing Phaser arena scaffold into a first playable tower-defense mission while keeping the project legally distinct, web-first, and compatible with future remote co-op. The implementation favored a vertical slice over campaign scaffolding: one original map, four tower archetypes, five enemy archetypes, scripted waves, victory/defeat, restart, and semantic browser verification.

Phaser remains the rendering/input layer because it already fits the repository and the browser deployment target. Deterministic gameplay moved into serializable TypeScript state and content modules so future networking work can build on commands, snapshots, and fixed simulation ticks instead of scene-local mutable state.

## Lessons Learned

- The previous debug API made it cheap to migrate behavior because tests could assert semantic state instead of only canvas pixels.
- Treating Phaser as a snapshot renderer kept combat rules testable in Node and prevented browser frame timing from becoming gameplay logic.
- A lightweight ECS-compatible state shape was enough for towers, enemies, blockers, effects, and pads; adding an ECS library would have slowed the playable slice.
- Data as typed TypeScript modules was the fastest safe step for collaborator tuning while preserving a future path to JSON or editor tooling.
- The existing GitHub Pages base-path setup held up after the gameplay rewrite; explicit `GITHUB_PAGES=true npm run build` remains a useful compatibility check.

## Tech Debt

- Balance is intentionally first-pass. Tower/enemy numbers should be tuned from actual play sessions before expanding content.
- Rendering still uses Phaser primitives and text; no asset pipeline, animation system, audio, or accessibility-focused UI layer exists yet.
- `src/game/state.ts` now contains several systems in one module. It is readable for the slice, but future work should split movement, targeting, wave, and outcome systems once behavior stabilizes.
- Blockers use simple deterministic contact/damage behavior rather than richer squad AI.
- The bundle-size warning is expected with Phaser in a single static chunk, but code splitting can be revisited before broader public sharing.
- Future multiplayer still needs protocol design, input delay/rollback decisions, desync detection, and relay/session infrastructure.
