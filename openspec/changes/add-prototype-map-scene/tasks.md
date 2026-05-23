## 1. OpenSpec

- [x] 1.1 Create change `add-prototype-map-scene`.
- [x] 1.2 Add specs for `prototype-map`, `hud-and-feedback`, and objective-only `combat-damage-health`.

## 2. Scene Foundation Scripts

- [x] 2.1 Add `PrototypeBootstrap`.
- [x] 2.2 Add `Objective` with max/current HP placeholder state.
- [x] 2.3 Add `BuildPad` with occupied/unoccupied state.
- [x] 2.4 Add `PathRoute` with ordered waypoint transforms.
- [x] 2.5 Add `HUDController` and `MessageLog` placeholder display scripts.

## 3. PrototypeArena Scene

- [x] 3.1 Attach `PrototypeBootstrap` to the scene bootstrap object.
- [x] 3.2 Configure orthographic camera framing for the full arena.
- [x] 3.3 Generate visible placeholders for battlefield, entrances, paths, merge point, objective, eight build pads, labels, and HUD text.

## 4. Documentation

- [x] 4.1 Update architecture notes with the scene foundation responsibilities.
- [x] 4.2 Add a manual test checklist for scene readability and git hygiene.

## 5. Validation

- [x] 5.1 Run `mise run spec-check`.
- [x] 5.2 Confirm git status does not include Unity cache/generated folders.
- [x] 5.3 Commit as `feat(scene): add prototype arena foundation`.
