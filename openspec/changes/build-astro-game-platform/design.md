## Context

The current Killbox browser client is a Vite-built TypeScript/Phaser prototype. It already proves static GitHub Pages deployment, a playable Phaser scene, a debug API, and deterministic tests. The next increment needs to broaden that single-page prototype into a production-grade public site without replacing the runtime game systems that already exist.

Astro is a good fit because the documentation, galleries, catalogs, and validation reports are mostly static, while the playable game remains a client-only island. The design keeps `src/game`, `src/scenes`, `src/net`, and `src/systems` as runtime-oriented modules and adds Astro pages, layouts, components, and content modules around them.

## Goals / Non-Goals

**Goals:**
- Make Astro the canonical static web shell for GitHub Pages.
- Embed the existing Phaser runtime as a client-only component on a playable route.
- Add typed theme, design-token, asset, rendering, and gameplay documentation data that can power both pages and future runtime decisions.
- Keep local, CI, and Pages builds deterministic and fast.
- Add browser-level visual inspection and regression checks for the implemented site surface.
- Document the enforced OpenSpec stage cycle and apply-time visual validation loop.

**Non-Goals:**
- No backend service, asset CDN, multiplayer relay, or procedural content generator.
- No final production art, audio implementation, shader engine, or atlas packer.
- No rewrite of the existing simulation, command application, debug API, or Phaser scene logic.

## Decisions

1. Astro owns routing; Phaser remains a client-only island.
   - Rationale: Astro can statically build documentation and galleries while the existing Phaser code continues to run only in the browser.
   - Alternative considered: keep Vite as the only app and hand-roll routes. This would preserve fewer dependencies but would make documentation and design-system growth harder to maintain.

2. Theme and design-system data live in typed TypeScript modules under `src/content`.
   - Rationale: TypeScript gives compile-time validation, deterministic imports, and easy reuse by Astro pages, tests, and later runtime adapters.
   - Alternative considered: Markdown frontmatter or JSON-only content. Those are useful later, but TypeScript is the fastest path to typed manifests and validation without adding content pipeline complexity.

3. The runtime boundary is explicit.
   - Rationale: `src/runtime` can expose a Phaser mount adapter while `src/game`, `src/scenes`, and `src/net` continue to represent simulation/rendering/networking boundaries. Astro components call the adapter rather than importing Phaser scene internals directly.
   - Alternative considered: boot Phaser directly from an Astro component. That would work but blur ownership and make teardown/testing harder.

4. GitHub Pages keeps using `dist`.
   - Rationale: The existing workflow already uploads `dist`, so the deployment change stays small: `npm run build` becomes an Astro build that emits static files to the same directory.
   - Alternative considered: separate `site-dist` output. That would add deployment churn without providing value in this increment.

5. Validation includes both data-level tests and browser visual inspection.
   - Rationale: Typed data tests catch manifest/catalog issues, while Playwright and screenshot inspection catch broken routes, blank Phaser canvases, and incoherent layout.
   - Alternative considered: rely on unit tests only. That would violate the apply workflow requirement and miss the highest-risk part of this change: the actual browser UI.

## Risks / Trade-offs

- Astro integration could accidentally bundle Phaser in server-rendered paths -> Use a client-only mount adapter and avoid importing Phaser from static pages except through the runtime component.
- Static content could drift from runtime game data -> Keep sample theme/content manifests typed, tested, and documented as canonical preview data rather than pretending they are final runtime balance.
- Pages base paths can break assets under repository hosting -> Configure Astro `base` from `GITHUB_PAGES` and keep Playwright smoke tests pointed at the built output.
- Visual quality is subjective -> Add route coverage, screenshot review, and targeted fixes for visible layout/rendering defects during apply.
- Scope is broad -> Implement a strong platform skeleton and representative data now, leaving production art/audio/procedural generation to later OpenSpec cycles.

## Migration Plan

1. Introduce Astro dependencies, config, pages, layouts, and static content modules.
2. Move the Vite entrypoint behavior behind a Phaser mount adapter and embed it on the playable route.
3. Replace the root `index.html` flow with Astro-generated pages while preserving deployment version visibility and debug API behavior.
4. Add tests for theme manifests, route contracts, and browser playability.
5. Run local build, dev/preview server, browser inspection, and full checks.
6. Sync specs, archive the change, and leave `main` ready for the GitHub Pages workflow to deploy after merge.

Rollback is straightforward: revert the Astro dependency/config/pages commit and restore the prior Vite entrypoint if the Pages build path fails.
