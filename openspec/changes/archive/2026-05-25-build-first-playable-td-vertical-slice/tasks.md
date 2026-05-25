## 1. Deterministic Core And Content

- [x] 1.1 Add first-playable content definitions for the original mission map, curated pads, tower archetypes, enemy archetypes, and scripted waves.
- [x] 1.2 Replace placeholder state shape with a serializable ECS-compatible mission state containing entities, components, resources, wave progress, outcome, and feedback events.
- [x] 1.3 Implement fixed-tick command processing for build, wave start, restart, and simulation step commands while preserving public state/debug entry points.
- [x] 1.4 Implement deterministic enemy movement, wave spawning, leaks, victory, defeat, and fast restart.

## 2. Tower Defense Combat

- [x] 2.1 Implement deterministic ranged, artillery, magic, and blocker tower behavior from content data.
- [x] 2.2 Implement enemy damage, health, rewards, resistance/behavior differences, slow/block effects, and combat feedback events.
- [x] 2.3 Add full-match deterministic replay tests for identical command/tick sequences, including victory and defeat cases.

## 3. Phaser Playability And Onboarding

- [x] 3.1 Update the Phaser scene to render the playable mission map, tower pads, tower choices, enemies, blockers, effects, health bars, HUD, and outcome states from snapshots.
- [x] 3.2 Add pointer-driven build selection, wave start, restart, and onboarding UI that dispatches simulation commands only.
- [x] 3.3 Preserve and expand semantic debug DOM/API state for automation, including content counts, towers, enemies, waves, outcome, and commands.

## 4. Documentation And Verification

- [x] 4.1 Update README and reference docs with setup, local run, GitHub Pages build behavior, gameplay loop, architecture boundaries, and future multiplayer notes.
- [x] 4.2 Update unit and e2e tests for the playable mission, onboarding visibility, build commands, wave progression, restart, and debug API.
- [x] 4.3 Run lint, unit tests, build, e2e where feasible, GitHub Pages build verification, and OpenSpec validation.
- [x] 4.4 Self-audit implementation against the proposal acceptance criteria and remove critical TODO/dead placeholder code.
