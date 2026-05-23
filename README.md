# Killbox

Project tooling is managed with [mise](https://mise.jdx.dev/).

## Setup

```sh
mise install
```

## Unity

Killbox is initialized as a Unity 2D project shell for an ugly one-map cooperative action tower-defense prototype.

Expected editor: Unity `6000.0.40f1`, installed through Unity Hub. `ProjectSettings/ProjectVersion.txt` is the source of truth.

Open the repository root in Unity Hub:

1. Add this folder as an existing project.
2. Open scene `Assets/_Killbox/Scenes/PrototypeArena.unity`.
3. Keep generated folders such as `Library/`, `Temp/`, `Obj/`, `Logs/`, and `UserSettings/` untracked.

The first slice intentionally contains no gameplay implementation. Architecture notes live at `Assets/_Killbox/Docs/ARCHITECTURE.md`.

## OpenSpec

OpenSpec is installed by mise from the npm package `@fission-ai/openspec`.

```sh
mise run openspec:help
mise run openspec -- <args>
```

Current initialization change:

```sh
mise run openspec -- status --change initialize-unity-2d-project
```

## Useful Tasks

```sh
mise run status
mise run spec-check
mise run unity:doctor
mise run unity:open
mise run unity:batch-check
mise run clean-unity-cache
mise run clean-unity-builds
```
