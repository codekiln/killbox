import { afterEach, describe, expect, it, vi } from "vitest";
import { describeGameState, installDebugApi } from "../src/game/debug";
import { normalizeDeploymentVersion } from "../src/deployment";
import { applyGameCommand, createInitialGameState } from "../src/game/state";
import type { GameCommand, GameState } from "../src/game/state";

describe("debug observability", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("describes semantic browser state", () => {
    const description = describeGameState(createInitialGameState("debug-test"), "0.1.0+abc1234");

    expect(description.deploymentVersion).toBe("0.1.0+abc1234");
    expect(description.scene).toBe("prototype-arena");
    expect(description.sessionId).toBe("debug-test");
    expect(description.objectiveHp).toBe("1000/1000");
    expect(description.controls).toContain("build-pad:toggle");
    expect(description.controls).toContain("simulation:tick");
    expect(description.activeEnemyCount).toBe(0);
  });

  it("describes active enemy snapshots and wave lifecycle state", () => {
    const waveStarted = applyGameCommand(createInitialGameState("enemy-debug"), {
      type: "wave:set-active",
      active: true
    });
    const description = describeGameState(waveStarted, "0.1.0+enemytest");

    expect(description.wave).toMatchObject({
      active: true,
      enemiesRemaining: 6,
      enemiesSpawned: 6,
      enemiesLeaked: 0,
      completed: false
    });
    expect(description.activeEnemyCount).toBe(6);
    expect(description.enemyPaths).toEqual({ A: 3, B: 3 });
    expect(description.enemies[0]).toMatchObject({
      id: "wave-1-A-01",
      pathId: "A",
      hp: "120/120",
      status: "active",
      progress: 0
    });
    expect(description.enemies[0].position).toEqual(waveStarted.paths[0].entrance);
  });

  it("defaults deployment metadata for local builds", () => {
    expect(normalizeDeploymentVersion(undefined)).toBe("0.1.0+local");
    expect(normalizeDeploymentVersion("  ")).toBe("0.1.0+local");
    expect(normalizeDeploymentVersion("0.1.0+abcdef0")).toBe("0.1.0+abcdef0");
  });

  it("installs an agent-facing debug API and syncs version DOM state when window exists", () => {
    const fakeWindow: { __KILLBOX_DEBUG__?: unknown } = {};
    const fakeApp: { dataset: Record<string, string> } = { dataset: {} };
    const fakeVersion: { dataset: Record<string, string>; textContent: string } = {
      dataset: {},
      textContent: ""
    };
    const fakeSemanticState = { textContent: "" };
    const fakeDocument = {
      querySelector: vi.fn((selector: string) => {
        if (selector === "#app") {
          return fakeApp;
        }
        if (selector === "#deployment-version") {
          return fakeVersion;
        }
        if (selector === "#semantic-state") {
          return fakeSemanticState;
        }
        return null;
      })
    };
    vi.stubGlobal("window", fakeWindow);
    vi.stubGlobal("document", fakeDocument);

    let state: GameState = createInitialGameState("api-test");
    const dispatch = (command: GameCommand) => {
      state = applyGameCommand(state, command);
      return state;
    };

    const api = installDebugApi(() => state, dispatch, "0.1.0+domtest");
    api.dispatch({ type: "build-pad:toggle", padId: "pad-2" });
    api.dispatch({ type: "wave:set-active", active: true });

    expect(fakeWindow.__KILLBOX_DEBUG__).toBe(api);
    expect(api.getState().buildPads[1].occupiedBy).toBe("pulse-tower");
    expect(api.getState().enemies).toHaveLength(6);
    expect(api.describe().deploymentVersion).toBe("0.1.0+domtest");
    expect(fakeApp.dataset.killboxVersion).toBe("0.1.0+domtest");
    expect(fakeApp.dataset.killboxEnemies).toBe("6");
    expect(fakeVersion.dataset.killboxVersion).toBe("0.1.0+domtest");
    expect(fakeVersion.textContent).toBe("Version 0.1.0+domtest");
    expect(fakeSemanticState.textContent).toContain("Version: 0.1.0+domtest");
    expect(fakeSemanticState.textContent).toContain("Enemies: 6 active, 0 leaked");
  });

  it("dispatches deterministic simulation through the debug API", () => {
    let state: GameState = createInitialGameState("simulation-debug");
    const dispatch = (command: GameCommand) => {
      state = applyGameCommand(state, command);
      return state;
    };
    const api = installDebugApi(() => state, dispatch, "0.1.0+simtest");

    api.dispatch({ type: "wave:set-active", active: true });
    const moved = api.dispatch({ type: "simulation:tick", deltaMs: 1000 });
    const completed = api.dispatch({ type: "simulation:tick", deltaMs: 20_000 });

    expect(moved.enemies[0].progress).toBeGreaterThan(0);
    expect(completed.enemies).toHaveLength(0);
    expect(completed.objective.currentHp).toBe(300);
    expect(api.describe().wave.completed).toBe(true);
    expect(api.describe().activeEnemyCount).toBe(0);
    expect(api.describe().objectiveHp).toBe("300/1000");
  });
});
