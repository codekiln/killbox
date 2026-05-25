## Context

The Astro platform currently uses one shared header for all routes and renders the full nav link set at the mobile breakpoint. The `/play/` page also includes implementation-oriented explanatory text above the canvas, which reduces playable area and reads like an engineering note.

## Goals / Non-Goals

**Goals:**
- Make `/play/` read as the canonical player-facing game page.
- Preserve standard site navigation on desktop.
- Use a mobile hamburger menu for non-game routes.
- Let mobile landscape `/play/` dedicate the viewport to the Phaser canvas.

**Non-Goals:**
- Do not change Phaser game rules, scene layout, debug API, or command semantics.
- Do not add a new fullscreen JavaScript permission flow in this increment.

## Decisions

1. Use a CSS/HTML hamburger disclosure in the shared Astro layout.
   - Rationale: It is deterministic, static-site friendly, and avoids client JavaScript for navigation.

2. Add a route-scoped shell class for the play page.
   - Rationale: The play route needs immersive mobile landscape behavior that should not affect documentation routes.

3. Use viewport-based CSS for mobile landscape.
   - Rationale: Chrome's browser UI constrains the visual viewport; the page should fill the available web viewport without relying on privileged fullscreen APIs.

## Risks / Trade-offs

- Mobile browser chrome still consumes physical screen space -> The page fills the available viewport and removes site chrome in landscape.
- CSS-only hamburger remains open until toggled -> Acceptable for a static site and accessible through the native disclosure control.
