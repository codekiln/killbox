## Why

Killbox is starting to accumulate domain terms such as "leak" that are useful shorthand but can drift if their meaning only lives inside implementation or isolated specs. A small markdown reference surface gives shared vocabulary a stable home now, before the future player/developer reference site grows around it.

## What Changes

- Add markdown-based project reference documentation with a glossary.
- Define "leak" in the glossary as the stable term for an enemy reaching the defended objective, leaving active simulation, and applying objective damage.
- Establish a lightweight structure that can later grow into a GitHub Pages reference system alongside the game.
- Keep the first version repository-local and static; no site generator, navigation system, enemy compendium, power-up compendium, or publishing workflow is required in this increment.

## Capabilities

### New Capabilities
- `reference-documentation`: Defines repository markdown reference docs, glossary ownership, and required term-definition behavior.

### Modified Capabilities
- None.

## Impact

- Affected docs: new markdown reference documentation under the repository.
- Affected specs: new consolidated capability for reference documentation after archival.
- Affected implementation: no runtime game behavior, debug API, Phaser rendering, backend, or build pipeline changes are expected.
- Affected workflow: future specs and docs should use the glossary for reusable domain terms instead of inventing local-only jargon.
