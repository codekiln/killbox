import { afterEach, describe, expect, it, vi } from "vitest";
import { describeGameState, installDebugApi } from "../src/game/debug";
import { applyGameCommand, createInitialGameState } from "../src/game/state";
import type { GameCommand, GameState } from "../src/game/state";

describe("debug observability", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("describes semantic browser state", () => {
    const description = describeGameState(createInitialGameState("debug-test"));

    expect(description.scene).toBe("prototype-arena");
    expect(description.sessionId).toBe("debug-test");
    expect(description.objectiveHp).toBe("1000/1000");
    expect(description.controls).toContain("build-pad:toggle");
  });

  it("installs an agent-facing debug API when window exists", () => {
    const fakeWindow: { __KILLBOX_DEBUG__?: unknown } = {};
    vi.stubGlobal("window", fakeWindow);

    let state: GameState = createInitialGameState("api-test");
    const dispatch = (command: GameCommand) => {
      state = applyGameCommand(state, command);
      return state;
    };

    const api = installDebugApi(() => state, dispatch);
    api.dispatch({ type: "build-pad:toggle", padId: "pad-2" });

    expect(fakeWindow.__KILLBOX_DEBUG__).toBe(api);
    expect(api.getState().buildPads[1].occupiedBy).toBe("pulse-tower");
  });
});
