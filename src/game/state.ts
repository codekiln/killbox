export type PlayerId = "p1" | "p2";
export type PathId = "A" | "B";

export interface Vec2 {
  x: number;
  y: number;
}

export interface PlayerState {
  id: PlayerId;
  label: string;
  connected: boolean;
  ready: boolean;
  position: Vec2;
}

export interface ObjectiveState {
  maxHp: number;
  currentHp: number;
  position: Vec2;
}

export interface WaveState {
  index: number;
  active: boolean;
  enemiesRemaining: number;
}

export interface BuildPadState {
  id: string;
  position: Vec2;
  occupiedBy: string | null;
}

export interface EnemyPathState {
  id: PathId;
  entrance: Vec2;
  waypoints: Vec2[];
}

export interface GameState {
  scene: "prototype-arena";
  sessionId: string;
  sharedGold: number;
  players: PlayerState[];
  objective: ObjectiveState;
  wave: WaveState;
  buildPads: BuildPadState[];
  paths: EnemyPathState[];
  messageLog: string[];
}

export type GameStateSnapshot = Readonly<GameState>;

export type GameCommand =
  | { type: "player:set-ready"; playerId: PlayerId; ready: boolean }
  | { type: "build-pad:toggle"; padId: string; towerType?: string }
  | { type: "wave:set-active"; active: boolean };

const upperPath: EnemyPathState = {
  id: "A",
  entrance: { x: 84, y: 170 },
  waypoints: [
    { x: 250, y: 180 },
    { x: 450, y: 250 },
    { x: 650, y: 350 },
    { x: 930, y: 350 }
  ]
};

const lowerPath: EnemyPathState = {
  id: "B",
  entrance: { x: 84, y: 550 },
  waypoints: [
    { x: 250, y: 540 },
    { x: 450, y: 470 },
    { x: 650, y: 350 },
    { x: 930, y: 350 }
  ]
};

const buildPadPositions: Vec2[] = [
  { x: 275, y: 112 },
  { x: 395, y: 214 },
  { x: 540, y: 282 },
  { x: 775, y: 282 },
  { x: 275, y: 608 },
  { x: 395, y: 506 },
  { x: 540, y: 438 },
  { x: 775, y: 438 }
];

export function createInitialGameState(sessionId = "local-dev"): GameState {
  return {
    scene: "prototype-arena",
    sessionId,
    sharedGold: 250,
    players: [
      {
        id: "p1",
        label: "Player 1",
        connected: true,
        ready: false,
        position: { x: 985, y: 302 }
      },
      {
        id: "p2",
        label: "Player 2",
        connected: false,
        ready: false,
        position: { x: 985, y: 398 }
      }
    ],
    objective: {
      maxHp: 1000,
      currentHp: 1000,
      position: { x: 1088, y: 350 }
    },
    wave: {
      index: 1,
      active: false,
      enemiesRemaining: 0
    },
    buildPads: buildPadPositions.map((position, index) => ({
      id: `pad-${index + 1}`,
      position,
      occupiedBy: null
    })),
    paths: [upperPath, lowerPath],
    messageLog: ["Prototype arena online", "Mock session ready"]
  };
}

export function applyGameCommand(state: GameState, command: GameCommand): GameState {
  switch (command.type) {
    case "player:set-ready":
      return withLog(
        {
          ...state,
          players: state.players.map((player) =>
            player.id === command.playerId ? { ...player, ready: command.ready } : player
          )
        },
        `${command.playerId.toUpperCase()} ${command.ready ? "ready" : "standing by"}`
      );
    case "build-pad:toggle":
      return withLog(
        {
          ...state,
          buildPads: state.buildPads.map((pad) =>
            pad.id === command.padId
              ? {
                  ...pad,
                  occupiedBy: pad.occupiedBy ? null : command.towerType ?? "pulse-tower"
                }
              : pad
          )
        },
        `${command.padId} toggled`
      );
    case "wave:set-active":
      return withLog(
        {
          ...state,
          wave: {
            ...state.wave,
            active: command.active,
            enemiesRemaining: command.active ? Math.max(state.wave.enemiesRemaining, 12) : 0
          }
        },
        command.active ? "Wave started" : "Wave reset"
      );
  }
}

export function getSerializableSnapshot(state: GameState): GameStateSnapshot {
  return structuredClone(state);
}

function withLog(state: GameState, entry: string): GameState {
  return {
    ...state,
    messageLog: [entry, ...state.messageLog].slice(0, 4)
  };
}
