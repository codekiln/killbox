# Manual Prototype Checks

## PrototypeArena Scene Foundation

Use this checklist after opening the repository in Unity 2022.3 LTS or newer.

- [ ] Open `Assets/_Killbox/Scenes/PrototypeArena.unity`.
- [ ] Confirm the camera is orthographic and frames the full arena.
- [ ] Confirm one rectangular battlefield is visible.
- [ ] Confirm `ENTRANCE A` is visible on the upper-left side.
- [ ] Confirm `ENTRANCE B` is visible on the lower-left side.
- [ ] Confirm two colored waypoint paths are visible.
- [ ] Confirm both paths merge near the right-side objective.
- [ ] Confirm exactly eight build pads are visible and labeled.
- [ ] Confirm the objective placeholder is visible on the right.
- [ ] Confirm HUD placeholder text is readable: objective HP, shared gold, wave, and message log.
- [ ] Confirm no enemies, towers, player controls, shooting, or waves are active yet.
- [ ] After closing Unity, run `git status --short` and confirm no `Library/`, `Temp/`, `Obj/`, `Logs/`, `UserSettings/`, `Build/`, or `Builds/` files appear.
