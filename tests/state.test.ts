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
    expect(waveStarted.wave.enemiesRemaining).toBe(12);
  });
});
