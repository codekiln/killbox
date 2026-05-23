## Context

The repository currently contains mise and OpenSpec setup but no Unity project shell. The first prototype slice needs enough Unity structure for contributors to open the project, understand the intended one-scene layout, and avoid committing editor-generated caches.

## Goals / Non-Goals

**Goals:**

- Establish the Killbox Unity 2D project shell without implementing gameplay.
- Preserve the existing mise and OpenSpec setup.
- Add repository hygiene for Unity-generated folders, build outputs, and IDE files.
- Document the initial module boundaries for the ugly cooperative action tower-defense prototype.
- Add safe mise tasks for common repository checks and local Unity cache cleanup.

**Non-Goals:**

- No online multiplayer, networking, accounts, monetization, localization, campaign progression, cosmetics, or save system.
- No final art or production assets.
- No enemy pathing, player shooting, tower behavior, wave logic, economy behavior, or HUD implementation in this slice.
- No Unity-generated `Library/`, `Temp/`, `Obj/`, `Logs/`, `UserSettings/`, or build artifacts.

## Decisions

- Use `Assets/_Killbox` as the game-owned root so prototype code and scenes are separated from Unity packages or future third-party assets.
- Use manually created Unity shell files because Unity/Unity Hub is not available in this environment; Unity will regenerate local caches when opened by a developer.
- Keep the first scene as `PrototypeArena` with only minimal scene metadata and camera setup; later OpenSpec changes will add arena placeholders, paths, objective, pads, and HUD.
- Use the classic Unity project layout with `Packages/manifest.json`, `ProjectSettings/ProjectVersion.txt`, and `Assets/_Killbox` folders rather than introducing custom build tooling.
- Add mise tasks that are safe to run outside Unity: repo status, OpenSpec validation, and cleanup of ignored Unity-generated folders.

## Risks / Trade-offs

- Manually authored Unity YAML may need Unity to normalize scene/project settings on first open. Mitigation: keep the scene minimal and document the expected editor version.
- Empty Unity folders need placeholder files until Unity generates `.meta` files. Mitigation: use `.gitkeep` files only where needed to preserve the required layout.
- `clean-unity-generated` deletes local Unity caches. Mitigation: it only targets ignored/generated folders and build output directories, not source assets.

## Migration Plan

1. Add Unity ignore rules and preserve existing mise/OpenSpec files.
2. Add `Assets/_Killbox` folder layout, minimal `PrototypeArena` scene, package manifest, and project version marker.
3. Add README setup instructions and architecture notes.
4. Add mise tasks for common workflow commands.
5. Validate OpenSpec and commit the initialization slice.
