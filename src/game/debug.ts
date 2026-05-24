import { getDeploymentVersion } from "../deployment";
import type { GameCommand, GameState, GameStateSnapshot } from "./state";
import { getSerializableSnapshot } from "./state";

export interface KillboxDebugState {
  deploymentVersion: string;
  scene: GameState["scene"];
  sessionId: string;
  activePlayers: number;
  objectiveHp: string;
  wave: {
    index: number;
    active: boolean;
    enemiesRemaining: number;
    enemiesSpawned: number;
    enemiesLeaked: number;
    completed: boolean;
  };
  enemies: Array<{
    id: string;
    pathId: string;
    position: {
      x: number;
      y: number;
    };
    hp: string;
    status: string;
    progress: number;
  }>;
  activeEnemyCount: number;
  enemyPaths: Record<string, number>;
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

export function describeGameState(
  state: GameState,
  deploymentVersion = getDeploymentVersion()
): KillboxDebugState {
  return {
    deploymentVersion,
    scene: state.scene,
    sessionId: state.sessionId,
    activePlayers: state.players.filter((player) => player.connected).length,
    objectiveHp: `${state.objective.currentHp}/${state.objective.maxHp}`,
    wave: { ...state.wave },
    enemies: state.enemies.map((enemy) => ({
      id: enemy.id,
      pathId: enemy.pathId,
      position: { ...enemy.position },
      hp: `${enemy.currentHp}/${enemy.maxHp}`,
      status: enemy.status,
      progress: enemy.progress
    })),
    activeEnemyCount: state.enemies.length,
    enemyPaths: state.enemies.reduce<Record<string, number>>((counts, enemy) => {
      counts[enemy.pathId] = (counts[enemy.pathId] ?? 0) + 1;
      return counts;
    }, {}),
    buildPads: state.buildPads.map((pad) => ({
      id: pad.id,
      occupied: Boolean(pad.occupiedBy)
    })),
    controls: ["player:set-ready", "build-pad:toggle", "wave:set-active", "simulation:tick"]
  };
}

export function installDebugApi(
  getState: () => GameState,
  dispatch: (command: GameCommand) => GameState,
  deploymentVersion = getDeploymentVersion()
): KillboxDebugApi {
  const api: KillboxDebugApi = {
    getState: () => getSerializableSnapshot(getState()),
    describe: () => describeGameState(getState(), deploymentVersion),
    dispatch: (command) => {
      const snapshot = getSerializableSnapshot(dispatch(command));
      syncDebugDom(api.describe());
      return snapshot;
    }
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
  const deploymentVersion = document.querySelector<HTMLElement>("#deployment-version");
  const semanticState = document.querySelector<HTMLElement>("#semantic-state");

  if (app) {
    app.dataset.killboxVersion = debugState.deploymentVersion;
    app.dataset.killboxScene = debugState.scene;
    app.dataset.killboxSession = debugState.sessionId;
    app.dataset.killboxPlayers = String(debugState.activePlayers);
    app.dataset.killboxWave = debugState.wave.active ? "active" : "idle";
    app.dataset.killboxEnemies = String(debugState.activeEnemyCount);
    app.dataset.killboxObjectiveHp = debugState.objectiveHp;
  }

  if (deploymentVersion) {
    deploymentVersion.textContent = `Version ${debugState.deploymentVersion}`;
    deploymentVersion.dataset.killboxVersion = debugState.deploymentVersion;
  }

  if (semanticState) {
    const occupied = debugState.buildPads.filter((pad) => pad.occupied).length;
    semanticState.textContent = [
      `Version: ${debugState.deploymentVersion}`,
      `Scene: ${debugState.scene}`,
      `Players: ${debugState.activePlayers}/2`,
      `Objective: ${debugState.objectiveHp}`,
      `Wave: ${formatWaveState(debugState)}`,
      `Enemies: ${debugState.activeEnemyCount} active, ${debugState.wave.enemiesLeaked} leaked`,
      `Build pads: ${occupied}/${debugState.buildPads.length}`
    ].join("\n");
  }
}

function formatWaveState(debugState: KillboxDebugState): string {
  if (debugState.wave.completed) {
    return `complete (${debugState.wave.enemiesRemaining})`;
  }

  return `${debugState.wave.active ? "active" : "idle"} (${debugState.wave.enemiesRemaining})`;
}
