# Killbox

Killbox is a browser-playable cooperative action tower-defense prototype. The active implementation is TypeScript, Vite, and Phaser so the first playable loop can be shared publicly, tested in a browser, and inspected by automation.

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

Vite serves the prototype locally. The first screen is the playable Phaser arena foundation with two lanes, a merge point, one objective, eight fixed build pads, HUD state, and semantic debug state for browser automation.

## Useful Tasks

```sh
mise tasks
mise run dev
mise run test
mise run build
mise run spec-check
mise run check
```

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

The debug API can describe the current scene, active players, objective HP, wave state, build-pad occupancy, and supported commands. The app also mirrors coarse state onto `#app` data attributes and `#semantic-state` text for browser-level inspection.
