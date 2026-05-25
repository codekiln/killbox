## Context

The current Play route is production-facing, but the embedded Phaser scene still contains prototype-era visual affordances. The semantic debug output is a visible overlay at tablet widths, the scene draws disconnected player slots with reduced alpha, and the command panel uses fixed text coordinates that can collide once the canvas is scaled down.

## Goals / Non-Goals

**Goals:**

- Keep debug state available through DOM text, data attributes, and `window.__KILLBOX_DEBUG__` without showing debug panels by default.
- Draw only connected players in the world view.
- Improve the command panel layout by reserving predictable rows and columns for status, tower labels, costs, roles, hints, and messages.
- Validate the iPad landscape view visually and through automated checks.

**Non-Goals:**

- Do not add a multiplayer join UI.
- Do not change wave, tower, economy, or combat rules.
- Do not remove the debug API or semantic DOM text automation relies on.

## Decisions

- Hide `#semantic-state` globally with a visually-hidden pattern instead of removing it from the DOM. This keeps automation and screen-reader-style semantic text available while preventing player-facing overlays.
- Keep the deployment version badge available for deployment verification, but leave semantic mission details hidden unless a future explicit debug mode is added.
- Filter player rendering to connected players. P2 remains in state for remote-coop shape and automation, but it does not render as an in-world marker until connected.
- Tune command-panel text positions and label widths inside the existing 1280x720 scene instead of changing the game world dimensions. This preserves current scaling behavior and keeps the fix narrowly scoped.

## Risks / Trade-offs

- Hidden semantic output can still be tested but is not visible to humans -> Preserve DOM text and debug API state, and update e2e tests to assert hidden-but-present behavior.
- Fixed-canvas text can regress at specific aspect ratios -> Capture iPad landscape screenshots during apply validation and keep panel row spacing explicit.
- P2 visibility is future-facing -> Keep the disconnected P2 state intact so a future opt-in/join flow can turn it on without data-model churn.
