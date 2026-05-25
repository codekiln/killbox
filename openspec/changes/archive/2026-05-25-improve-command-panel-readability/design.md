## Context

The first playable Phaser scene draws the map, HUD, command rail, tower cards, wave buttons, and recent logs with immediate-mode graphics/text. The selected browser region shows the command rail as the weak point: the top title, mission log, build header, and tower controls are too close together.

## Goals / Non-Goals

**Goals:**

- Make the command rail visually structured and easy to scan.
- Keep the implementation as a small Phaser layout change.
- Preserve command dispatch and semantic debug behavior.

**Non-Goals:**

- No new gameplay systems.
- No new art/audio/dependencies.
- No broad responsive UI framework migration.

## Decisions

- Define a small set of command-panel layout constants inside `PrototypeScene` so card positions are stable and obvious.
- Replace loose panel labels with sectioned cards: mission status/log, build choices, wave actions, and hints.
- Keep all text inside the right panel and use fixed widths to prevent collisions.
- Leave the simulation and content modules unchanged.

## Risks / Trade-offs

- [Risk] Phaser text can still collide if copy expands. -> Mitigate with short labels, fixed widths, and vertical spacing.
- [Risk] Visual-only changes are easy to miss in unit tests. -> Mitigate with build/e2e smoke and browser inspection.

## Migration Plan

1. Update command-panel drawing in `PrototypeScene`.
2. Run typecheck/tests/build/spec validation.
3. Visually inspect the running browser page.

Rollback:
- Revert `PrototypeScene` layout edits.
