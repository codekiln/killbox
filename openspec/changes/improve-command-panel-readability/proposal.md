## Why

The right-side command panel in the first playable currently feels sloppy: labels crowd each other, the log/status text competes with the panel title, and the build/wave controls do not read as a clean command surface. This undermines onboarding because the panel is where players decide what to build and when to start or restart waves.

## Problem

The selected browser region shows panel text stacked too tightly near the top, inconsistent hierarchy between status/log/build sections, and low visual separation between tower choices and wave controls. The combat map is readable enough, but the control rail needs a clearer layout before more gameplay is layered onto it.

## Motivation

This is a narrow UX polish increment that improves comprehension without changing simulation behavior. The quickest win is to make the panel feel like an organized tool surface: title/status, tower choices, wave actions, tactical hints, and recent log messages in distinct rows.

## Constraints

- Keep the existing TypeScript/Vite/Phaser stack and deterministic simulation untouched.
- Do not add assets, new dependencies, or backend behavior.
- Preserve existing debug API and e2e command behavior.
- Keep the UI original and legally distinct.
- Commit after each OPSX phase.

## What Changes

- Rework the right-side Phaser command panel layout in `PrototypeScene`.
- Move recent message log text into a clearly bounded section instead of colliding with the command header.
- Use consistent section labels, spacing, button/card heights, and muted helper text.
- Keep tower buttons and wave/restart controls pointer-driven through the same commands.
- Add/update tests only if semantic UI text or debug state changes.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `hud-and-feedback`: Improve the readable HUD/control-panel requirement to explicitly cover non-overlapping command-panel hierarchy.

## Impact

- Affects `src/scenes/PrototypeScene.ts` primarily.
- May affect browser e2e expectations if visible text changes.
- No gameplay-state, content, transport, or deployment architecture changes are intended.

## Acceptance Criteria

- The right command panel has a clear title, status/log area, build choices, wave actions, and hints without overlapping text.
- Tower choice cards remain clickable and show label, cost, and role.
- Start Wave and Restart remain clickable and dispatch existing commands.
- HUD/debug state remains compatible with existing tests.
- `npm run lint`, `npm run test`, `npm run build`, and `npm run spec-check` pass.

## Rollback Strategy

- Revert the scene layout changes if visual polish regresses playability.
- Because simulation state is out of scope, rollback should not affect deterministic tests or content data.
