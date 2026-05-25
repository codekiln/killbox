## Why

The deployed play page currently exposes implementation-facing copy and a large multi-link mobile header that crowds the game, especially in Chrome on mobile landscape. The play route must behave like a player-facing full-screen game surface rather than a documentation page.

## What Changes

- Rename the player-facing playable route label and page heading to "Play".
- Remove implementation copy from the play page.
- Replace the expanded mobile navigation links with a compact hamburger menu.
- Make the play route prioritize the Phaser canvas in mobile landscape by hiding surrounding chrome and filling the available viewport.
- Keep desktop navigation and documentation routes intact.

## Capabilities

### New Capabilities

### Modified Capabilities
- `astro-game-platform`: The playable route must present as a player-facing "Play" surface and support full-screen mobile landscape play.
- `living-design-system`: Mobile navigation must collapse behind a hamburger control instead of rendering many links inline.

## Impact

- Updates Astro layout, route metadata, play page markup, responsive CSS, and e2e route expectations.
- No simulation, Phaser scene, command, or content-balance changes.
