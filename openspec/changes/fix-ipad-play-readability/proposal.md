## Why

The iPad play view exposes implementation-facing debug text over the game, renders an inactive second-player marker by default, and lets command-panel labels collide at tablet scale. These issues make the production play surface feel like an engineering overlay instead of a clean playable build.

## What Changes

- Hide semantic debug output by default while keeping machine-readable debug state available to automation.
- Render only connected/active player markers so Player 2 is opt-in and does not appear on first load.
- Rework command-panel text placement so tower labels, roles, costs, wave controls, hints, and recent messages do not overlap on iPad landscape.
- Add browser/e2e checks that cover default debug visibility, active player count, and P2 absence.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `hud-and-feedback`: Player-facing HUD and command panel must remain readable on iPad-scale viewports without default debug overlays.
- `remote-coop`: Static single-player load must not display inactive remote player slots as in-world players.
- `ai-observability`: Semantic/debug state must remain available to automated agents without being visible as default player-facing UI.

## Impact

- Affects Phaser scene rendering, game debug DOM presentation, and e2e assertions.
- No new dependencies, backend services, or multiplayer relay behavior.
