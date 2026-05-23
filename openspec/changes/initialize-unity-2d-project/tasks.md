## 1. Repository Hygiene

- [x] 1.1 Add Unity ignore rules for editor caches, generated project files, and build artifacts.
- [x] 1.2 Preserve existing mise and OpenSpec setup.
- [x] 1.3 Confirm ignored Unity-generated folders are not tracked.

## 2. Unity Project Shell

- [x] 2.1 Add minimal Unity project metadata under `Packages/` and `ProjectSettings/`.
- [x] 2.2 Add the required `Assets/_Killbox` folder layout.
- [x] 2.3 Add a minimal `PrototypeArena` scene under `Assets/_Killbox/Scenes`.

## 3. Documentation

- [x] 3.1 Update README with Unity opening instructions and expected editor version.
- [x] 3.2 Add `Assets/_Killbox/Docs/ARCHITECTURE.md` describing planned prototype modules.
- [x] 3.3 Document that this slice excludes gameplay, final art, online multiplayer, and campaign systems.

## 4. Developer Tasks

- [x] 4.1 Add mise task for repository status.
- [x] 4.2 Add mise task for OpenSpec validation.
- [x] 4.3 Add mise task for cleaning local Unity-generated folders.

## 5. Validation

- [x] 5.1 Run OpenSpec validation for the initialization change.
- [x] 5.2 Run mise formatting/checks where practical.
- [x] 5.3 Commit the initialization slice as `chore(repo): initialize Unity 2D project shell`.
