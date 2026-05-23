## Context

`initialize-unity-2d-project` remains active and validated. The repo has a minimal Unity scene with a camera and bootstrap object, but no map foundation. Unity is not available in this environment for editor-driven scene authoring, so this slice uses simple scripts and hand-maintained scene metadata.

## Goals / Non-Goals

**Goals:**

- Make `PrototypeArena` readable as the intended single Killbox map.
- Keep all visuals ugly and temporary: flat primitives, labels, and lines only.
- Provide simple scene foundation components that later gameplay slices can extend.
- Keep the camera orthographic and framing the full arena.
- Add manual acceptance checks for scene readability and git hygiene.

**Non-Goals:**

- No enemy spawning, movement, leaks, combat, player controls, player shooting, tower placement, tower targeting, waves, networking, or campaign systems.
- No final art assets or production UI.
- No dynamic pathfinding or free placement.

## Decisions

- Use `PrototypeBootstrap` with `[ExecuteAlways]` to create placeholder objects in edit mode and play mode. The generated children are marked as not saved so Unity can render them without committing generated scene clutter.
- Use world-space `TextMesh`, primitive cubes, and line renderers so no art package or TextMeshPro setup is required.
- Keep objective health data in an `Objective` component with `maxHitPoints` and `currentHitPoints`, but do not implement damage yet.
- Keep `BuildPad` limited to pad identity and occupied state. Build interaction arrives in a later economy slice.
- Keep `PathRoute` as an ordered list of waypoint transforms plus gizmo drawing. Enemy path following arrives in the next enemy slice.
- Keep `HUDController` and `MessageLog` able to display placeholder text now, while later slices can bind real gameplay values.

## Risks / Trade-offs

- Generated edit-mode placeholders may not appear until Unity compiles scripts and opens the scene. Mitigation: the scene has the bootstrap component attached, and the manual checklist calls this out.
- Hand-authored Unity YAML may be normalized by Unity on first save. Mitigation: keep the scene small and rely on `.gitignore` to prevent cache noise.
- The scene communicates layout through generated placeholders rather than serialized art objects. Mitigation: this is acceptable for the ugly prototype foundation and avoids premature asset work.

## Migration Plan

1. Add OpenSpec specs for the map, placeholder HUD, and objective health placeholder.
2. Add scene foundation MonoBehaviours.
3. Attach `PrototypeBootstrap` to the existing scene bootstrap object.
4. Update architecture docs and manual test checklist.
5. Validate OpenSpec and commit the slice.
