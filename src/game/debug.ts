import type { GameCommand, GameState, GameStateSnapshot } from "./state";
import { getSerializableSnapshot } from "./state";

export interface KillboxDebugState {
  scene: GameState["scene"];
  sessionId: string;
  activePlayers: number;
  objectiveHp: string;
  wave: {
    index: number;
    active: boolean;
    enemiesRemaining: number;
  };
  buildPads: Array<{
    id: string;
    occupied: boolean;
  }>;
  controls: string[];
}

export interface KillboxDebugApi {
  getState(): GameStateSnapshot;
  describe(): KillboxDebugState;
  dispatch(command: GameCommand): GameStateSnapshot;
}

declare global {
  interface Window {
    __KILLBOX_DEBUG__?: KillboxDebugApi;
  }
}

export function describeGameState(state: GameState): KillboxDebugState {
  return {
    scene: state.scene,
    sessionId: state.sessionId,
    activePlayers: state.players.filter((player) => player.connected).length,
    objectiveHp: `${state.objective.currentHp}/${state.objective.maxHp}`,
    wave: { ...state.wave },
    buildPads: state.buildPads.map((pad) => ({
      id: pad.id,
      occupied: Boolean(pad.occupiedBy)
    })),
    controls: ["player:set-ready", "build-pad:toggle", "wave:set-active"]
  };
}

export function installDebugApi(
  getState: () => GameState,
  dispatch: (command: GameCommand) => GameState
): KillboxDebugApi {
  const api: KillboxDebugApi = {
    getState: () => getSerializableSnapshot(getState()),
    describe: () => describeGameState(getState()),
    dispatch: (command) => getSerializableSnapshot(dispatch(command))
  };

  if (typeof window !== "undefined") {
    window.__KILLBOX_DEBUG__ = api;
    syncDebugDom(api.describe());
  }

  return api;
}

export function syncDebugDom(debugState: KillboxDebugState): void {
  if (typeof document === "undefined") {
    return;
  }

  const app = document.querySelector<HTMLElement>("#app");
  const semanticState = document.querySelector<HTMLElement>("#semantic-state");

  if (app) {
    app.dataset.killboxScene = debugState.scene;
    app.dataset.killboxSession = debugState.sessionId;
    app.dataset.killboxPlayers = String(debugState.activePlayers);
    app.dataset.killboxWave = debugState.wave.active ? "active" : "idle";
  }

  if (semanticState) {
    const occupied = debugState.buildPads.filter((pad) => pad.occupied).length;
    semanticState.textContent = [
      `Scene: ${debugState.scene}`,
      `Players: ${debugState.activePlayers}/2`,
      `Objective: ${debugState.objectiveHp}`,
      `Wave: ${debugState.wave.active ? "active" : "idle"} (${debugState.wave.enemiesRemaining})`,
      `Build pads: ${occupied}/${debugState.buildPads.length}`
    ].join("\n");
  }
}
