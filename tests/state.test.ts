import { describe, expect, it } from "vitest";
import {
  applyGameCommand,
  createInitialGameState,
  getSerializableSnapshot
} from "../src/game/state";

describe("prototype game state", () => {
  it("creates an inspectable one-map arena snapshot", () => {
    const state = createInitialGameState("test-session");
    const snapshot = getSerializableSnapshot(state);

    expect(snapshot.scene).toBe("prototype-arena");
    expect(snapshot.sessionId).toBe("test-session");
    expect(snapshot.paths).toHaveLength(2);
    expect(snapshot.buildPads).toHaveLength(8);
    expect(snapshot.objective.currentHp).toBe(snapshot.objective.maxHp);
    expect(snapshot.enemies).toEqual([]);
    expect(snapshot.wave).toMatchObject({
      active: false,
      enemiesRemaining: 0,
      enemiesSpawned: 0,
      enemiesLeaked: 0,
      completed: false
    });
  });

  it("applies build pad and wave commands immutably", () => {
    const initial = createInitialGameState();
    const withTower = applyGameCommand(initial, {
      type: "build-pad:toggle",
      padId: "pad-1",
      towerType: "test-tower"
    });
    const waveStarted = applyGameCommand(withTower, {
      type: "wave:set-active",
      active: true
    });

    expect(initial.buildPads[0].occupiedBy).toBeNull();
    expect(withTower.buildPads[0].occupiedBy).toBe("test-tower");
    expect(waveStarted.wave.active).toBe(true);
    expect(waveStarted.wave.enemiesRemaining).toBe(6);
  });

  it("spawns a deterministic wave 1 enemy batch across both paths", () => {
    const initial = createInitialGameState();
    const waveStarted = applyGameCommand(initial, {
      type: "wave:set-active",
      active: true
    });
    const duplicateStart = applyGameCommand(waveStarted, {
      type: "wave:set-active",
      active: true
    });

    expect(waveStarted.enemies.map((enemy) => enemy.id)).toEqual([
      "wave-1-A-01",
      "wave-1-A-02",
      "wave-1-A-03",
      "wave-1-B-01",
      "wave-1-B-02",
      "wave-1-B-03"
    ]);
    expect(waveStarted.enemies.map((enemy) => enemy.pathId)).toEqual(["A", "A", "A", "B", "B", "B"]);
    expect(waveStarted.enemies[0].position).toEqual(initial.paths[0].entrance);
    expect(waveStarted.enemies[3].position).toEqual(initial.paths[1].entrance);
    expect(waveStarted.wave.enemiesSpawned).toBe(6);
    expect(waveStarted.messageLog[0]).toBe("Wave 1 started: 6 enemies inbound");
    expect(duplicateStart).toBe(waveStarted);
  });

  it("advances active enemies deterministically along their assigned paths", () => {
    const firstState = applyGameCommand(createInitialGameState(), {
      type: "wave:set-active",
      active: true
    });
    const secondState = applyGameCommand(createInitialGameState(), {
      type: "wave:set-active",
      active: true
    });

    const firstAdvanced = applyGameCommand(firstState, {
      type: "simulation:tick",
      deltaMs: 1000
    });
    const secondAdvanced = applyGameCommand(secondState, {
      type: "simulation:tick",
      deltaMs: 1000
    });

    expect(firstAdvanced.enemies[0].position).not.toEqual(firstState.paths[0].entrance);
    expect(firstAdvanced.enemies[3].position).not.toEqual(firstState.paths[1].entrance);
    expect(firstAdvanced.enemies.every((enemy) => enemy.progress > 0)).toBe(true);
    expect(firstAdvanced.enemies.map((enemy) => enemy.pathId)).toEqual(firstState.enemies.map((enemy) => enemy.pathId));
    expect(firstAdvanced.enemies).toEqual(secondAdvanced.enemies);
    expect(firstAdvanced.wave).toEqual(secondAdvanced.wave);
  });

  it("removes leaked enemies, clamps objective HP, and completes the wave", () => {
    const waveStarted = applyGameCommand(
      {
        ...createInitialGameState(),
        objective: {
          ...createInitialGameState().objective,
          currentHp: 200
        }
      },
      {
        type: "wave:set-active",
        active: true
      }
    );
    const completed = applyGameCommand(waveStarted, {
      type: "simulation:tick",
      deltaMs: 20_000
    });

    expect(completed.enemies).toEqual([]);
    expect(completed.objective.currentHp).toBe(0);
    expect(completed.wave).toMatchObject({
      active: false,
      enemiesRemaining: 0,
      enemiesSpawned: 6,
      enemiesLeaked: 6,
      completed: true
    });
    expect(completed.messageLog[0]).toBe("Wave 1 complete");
    expect(completed.messageLog.some((entry) => entry.includes("leaked for"))).toBe(true);
  });
});
