## Why

The Unity shell exists, but the prototype scene does not yet communicate the one-map Killbox mission layout. This change establishes the readable ugly arena foundation that later enemy, player, economy, tower, and wave slices will build on.

## What Changes

- Update `PrototypeArena` so it has a visible orthographic top-down arena foundation.
- Add placeholder scene elements for the battlefield, two left-side entrances, two merging waypoint paths, one right-side objective, eight fixed build pads, and HUD labels.
- Add simple MonoBehaviours for scene bootstrapping, objective health placeholder data, build pad occupancy state, ordered path routes, HUD placeholder display, and message log text.
- Add documentation and manual checks for opening the scene and verifying map readability.
- Do not add enemies, combat, towers, waves, player controls, shooting, networking, campaign systems, or final art.

## Capabilities

### New Capabilities

- `prototype-map`: Defines the one-map arena, two lanes, merge point, objective, and fixed build pads.
- `hud-and-feedback`: Defines placeholder HUD and message log expectations for prototype readability.
- `combat-damage-health`: Defines the objective health placeholder needed before leak/combat behavior exists.

### Modified Capabilities

- None.

## Impact

- Updates `Assets/_Killbox/Scenes/PrototypeArena.unity`.
- Adds scripts under `Assets/_Killbox/Scripts/Core`, `Towers`, `Waves`, and `UI`.
- Updates `Assets/_Killbox/Docs/ARCHITECTURE.md` and adds a manual scene foundation checklist.
- Adds an OpenSpec change that remains active until this slice is reviewed or archived later.
