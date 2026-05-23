## Why

Killbox needs a Unity 2D project shell and written prototype boundaries before gameplay work begins. Establishing repository hygiene, development entry points, and baseline product specs now keeps the ugly prototype focused on validating the shared-economy local co-op tower-defense loop.

## What Changes

- Add baseline OpenSpec specifications for product thesis, prototype scope, Unity project structure, and developer environment.
- Add Unity repository hygiene so editor caches and build artifacts stay out of version control.
- Add a lightweight Unity 2D project shell layout for the `Killbox` project and the intended `PrototypeArena` scene.
- Document how to open the project in Unity and where prototype architecture notes live.
- Add mise task entry points for repo status, OpenSpec validation, and cleaning local Unity-generated folders.

## Capabilities

### New Capabilities

- `product-thesis`: Defines the cooperative action tower-defense identity and prototype-first product direction.
- `prototype-scope`: Defines the one-map ugly prototype boundary and explicitly defers online multiplayer and progression systems.
- `unity-project-structure`: Defines the Unity 2D project layout, scene location, and ignored generated files.
- `dev-environment`: Defines mise task entry points and README setup expectations.

### Modified Capabilities

- None.

## Impact

- Adds Unity project shell files under `Assets/`, `Packages/`, and `ProjectSettings/`.
- Updates `.gitignore`, `README.md`, and `mise.toml`.
- Adds architecture documentation under `Assets/_Killbox/Docs/`.
- Adds OpenSpec baseline specs and a tracked change for the initialization slice.
