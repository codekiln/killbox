## Why

Killbox has a browser-playable Phaser prototype, but the project needs a canonical public interface that can explain, inspect, validate, and theme the game as it grows. Moving the static client into an Astro site makes GitHub Pages more than a build host: it becomes the living game design system, asset catalog, gameplay documentation surface, and playable runtime entry point.

## What Changes

- Add an Astro static site as the top-level browser application while keeping Phaser runtime code isolated as an embedded interactive surface.
- Add routes for playable builds, biome/theme galleries, faction previews, design-system documentation, rendering experiments, asset previews, and gameplay mechanic documentation.
- Introduce theme manifests that describe biomes, factions, enemy themes, tilesets, environment FX, UI themes, audio themes, gameplay modifiers, asset lineage, and rendering/readability rules.
- Add data-driven preview pages that render theme, token, asset, and gameplay documentation from shared TypeScript content modules.
- Add asset pipeline visibility for generated asset metadata, atlas inspection stubs, validation reports, and theme consistency checks.
- Update deployment and local commands so deterministic Astro builds deploy automatically to GitHub Pages and remain verifiable in CI.
- Document the enforced OpenSpec cycle: `/opsx:propose -> /opsx:apply -> /opsx:sync -> /opsx:archive`, with commits after each stage and visual inspection at the end of every apply.

Non-goals:
- Do not replace the existing Phaser prototype gameplay loop, simulation rules, or debug API.
- Do not add production multiplayer, procedural generation, campaign progression, or final art.
- Do not build a backend asset service; this increment uses static metadata and generated reports.

## Capabilities

### New Capabilities
- `astro-game-platform`: Astro site architecture, route model, Phaser embedding, and static GitHub Pages behavior.
- `themeable-game-system`: Theme manifests, biome/faction/enemy/tile/UI/audio theme metadata, asset lineage, rendering rules, and future procedural expansion hooks.
- `living-design-system`: Visual tokens, typography rules, palette systems, component docs, shader/particle previews, readability validation, and responsive preview behavior.
- `asset-pipeline-visibility`: Generated asset previews, atlas inspection, metadata browsing, validation reports, and theme consistency reporting.
- `openspec-workflow-discipline`: Required OpenSpec stage ordering, stage commits, and apply-time UI inspection/fix loops.

### Modified Capabilities
- `web-game-structure`: The browser app becomes an Astro static site that embeds the existing Phaser runtime and preserves Pages-compatible production builds.
- `dev-environment`: Local scripts and checks expand from Vite-only commands to Astro-based development, validation, preview, and deployment verification.
- `reference-documentation`: Repository documentation explains the Astro platform, game/design-system boundaries, theme data, asset pipeline visibility, and OpenSpec workflow discipline.
- `content-data`: Game content expands from first playable mission data into theme-aware metadata that can drive both runtime previews and documentation pages.

## Impact

- Adds Astro and related TypeScript configuration while retaining Phaser, Vitest, Playwright, and OpenSpec validation.
- Restructures browser entry files so Astro owns pages/layouts and Phaser boot code is imported only inside client-side components.
- Adds static content modules for themes, factions, design tokens, assets, rendering experiments, gameplay documentation, validation reports, and route cards.
- Updates GitHub Pages workflow to build the Astro output from `dist/`.
- Adds tests and documentation covering deterministic content data, route contracts, theme validation, and the apply-time visual inspection loop.
