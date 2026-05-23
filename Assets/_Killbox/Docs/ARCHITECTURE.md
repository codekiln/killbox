# Killbox Prototype Architecture

This project is an ugly Unity 2D prototype for one local cooperative action tower-defense map. The first goal is to test whether two players sharing one gold pool can fight, build, upgrade, repair, revive, and survive waves together.

## Scene

- `PrototypeArena` is the only planned playable scene for the early prototype.
- The camera is orthographic and top-down.
- Later slices will add a rectangular arena, two left-side enemy entrances, waypoint paths that merge near one right-side objective, eight fixed build pads, two heroes, and placeholder HUD.

## Runtime Modules

- `Core`: `GameManager`, `SharedEconomy`, `Objective`, session state, victory, and defeat.
- `Combat`: `Health`, `Damageable`, `Projectile`, damage events, and simple targeting helpers.
- `Players`: `PlayerHero`, local movement, shooting, downed state, and revive interaction.
- `Enemies`: `Enemy`, hardcoded enemy role stats, waypoint following, leaks, and tower harassment behavior.
- `Towers`: `BuildPad`, `Tower`, Gun Tower, Slow Field, Mortar, Barricade, upgrade, repair, and sell flows.
- `Waves`: `WaveManager` and hardcoded five-wave prototype sequence.
- `UI`: `HUDController`, `MessageLog`, shared gold, objective HP, wave status, player health, and prompts.

## Boundaries

- No ECS, online networking, procedural generation, save system, campaign progression, monetization, accounts, cosmetics, localization, or final art in the ugly prototype.
- Use fixed build pads instead of free placement.
- Use waypoint paths instead of dynamic pathfinding.
- Prefer simple MonoBehaviours and hardcoded balance values until the loop proves fun.
