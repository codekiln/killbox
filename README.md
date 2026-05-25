# Killbox

Killbox is a browser-playable tower-defense prototype. The current build is a legally distinct, single-player first playable made with TypeScript, Vite, and Phaser, with a deterministic simulation core shaped for future remote co-op experiments.

A pre-pivot checkpoint is preserved by git tag:

```sh
git checkout pre-phaser-pivot
```

## Setup

Project tooling is managed with [mise](https://mise.jdx.dev/).

```sh
mise install
mise run install
```

## Run

```sh
mise run dev
```

Vite serves the playable prototype locally. The first screen is **Saltmarsh Crossing**, an original one-map mission with two bending lanes, a merge chokepoint, one defended gate, eight curated build pads, shared gold, escalating scripted waves, victory/defeat, and instant restart.

## Gameplay Loop

Build towers on fixed pads, start waves, earn gold from defeated enemies, and keep enemies from leaking into the gate. The first playable has four original tower archetypes:

- Ranger Post: fast single-target physical damage
- Blast Foundry: slower splash damage
- Veil Spire: arcane damage and slow pressure
- Stoneward Lodge: deterministic blockers near chokepoints

The scripted mission includes five original enemy archetypes: Skitter, Brute, Shieldbearer, Glider, and Mender. These are simple geometric shapes for now; the focus is readable combat pacing and deterministic rules, not final art.

## Useful Tasks

```sh
mise tasks
mise run dev
mise run test
mise run build
mise run spec-check
mise run check
```

For GitHub Pages compatibility, the Vite base path is selected with `GITHUB_PAGES=true`:

```sh
GITHUB_PAGES=true npm run build
```

## Reference Docs

Shared Killbox terminology lives in the markdown reference docs at [docs/reference](docs/reference/README.md). Use the [glossary](docs/reference/glossary.md) for canonical definitions of recurring game and development terms.

The current architecture keeps deterministic simulation and Phaser rendering separated:

- `src/game/content.ts` defines mission, map, tower, enemy, and wave data.
- `src/game/state.ts` owns serializable mission state, commands, fixed ticks, combat, rewards, leaks, victory, defeat, and restart.
- `src/scenes/PrototypeScene.ts` renders snapshots and dispatches player commands.
- `src/game/debug.ts` exposes semantic browser state for tests and agents.
- `src/net/transport.ts` remains a protocol-shaped mock transport for future remote co-op work.

## OpenSpec

OpenSpec is installed by mise from the npm package `@fission-ai/openspec`.

```sh
mise run openspec -- <args>
mise run spec-check
```

## Browser Automation Contract

The web prototype exposes semantic state for tests and coding agents through:

```ts
window.__KILLBOX_DEBUG__
```

The debug API can describe the current mission, active players, objective HP, shared gold, wave state, tower and enemy entities, content counts, build-pad occupancy, outcome state, and supported commands. The app also mirrors coarse state onto `#app` data attributes and `#semantic-state` text for browser-level inspection.
