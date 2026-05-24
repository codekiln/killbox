## Context

Killbox currently keeps most project vocabulary inside specs and implementation. That works while the prototype is small, but terms like "leak" are already crossing state, debug, HUD, and spec language. Without a central glossary, repeated terms can gain slightly different meanings over time.

The desired future direction is a GitHub Pages reference system that sits alongside the game and contains both player-facing information, such as enemies and power-ups, and developer-facing information. This increment only establishes the markdown documentation foundation needed to keep terminology stable.

## Goals / Non-Goals

**Goals:**

- Add a repository-local markdown reference area.
- Add a glossary document with concise, stable definitions for domain terms.
- Prefer established industry or genre terminology when it accurately describes Killbox behavior.
- Define "exit" and "leak" in a way that matches current scripted wave enemy behavior.
- Make the documentation easy to expand into a future reference site without requiring site infrastructure now.

**Non-Goals:**

- Build or configure a GitHub Pages site.
- Add a static site generator, navigation framework, or publishing workflow.
- Create player-facing compendium pages for enemies, power-ups, towers, or maps.
- Change game runtime behavior, state schemas, debug APIs, Phaser rendering, or tests beyond documentation checks if useful.

## Decisions

1. Store reference documentation as plain markdown in the repository.

   A small docs folder is enough for the immediate goal and keeps terminology review close to the code and specs. Future site generation can consume or move these files when the reference system becomes real.

   Alternative considered: add a docs site generator now. That would create premature build and navigation decisions for a single glossary page.

2. Make the glossary the canonical home for reusable domain terms.

   The glossary should define terms that appear in specs, implementation, HUD copy, or developer conversation often enough to risk drift. Definitions should be short and normative, with optional notes only when they clarify player-facing versus developer-facing use. When a term already has an established industry or genre meaning that fits Killbox, the glossary should use that term instead of inventing a local synonym.

   Alternative considered: define terms inline in every spec. Inline definitions are useful locally, but they do not prevent subtle divergence across capabilities.

3. Define "exit" and "leak" around observable game behavior.

   "Exit" should be the noun for the end of an enemy path. "Leak" should be the event when an enemy combatant reaches the exit, leaves active simulation, and applies its configured leak damage to objective HP. This aligns with common tower-defense language while leaving room for future enemy types, maps, and balance values.

   Alternative considered: keep using "defended objective" as the path endpoint noun. That remains useful for the thing whose HP is damaged, but it is clunky for the lane endpoint and less aligned with established tower-defense vocabulary.

## Risks / Trade-offs

- Glossary becomes stale -> Keep the first version small and make future jargon additions explicit tasks in related changes.
- Player-facing and developer-facing meanings diverge -> Prefer one primary definition per term, with notes for audience-specific nuance.
- Future site structure conflicts with the initial folder shape -> Use plain markdown and avoid generator-specific frontmatter or routing assumptions.
