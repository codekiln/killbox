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
  enemiesSpawned: number;
  enemiesLeaked: number;
  completed: boolean;
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

export type EnemyStatus = "active";

export interface EnemyState {
  id: string;
  pathId: PathId;
  position: Vec2;
  maxHp: number;
  currentHp: number;
  status: EnemyStatus;
  progress: number;
  distanceTravelled: number;
  speed: number;
  leakDamage: number;
}

export interface GameState {
  scene: "prototype-arena";
  sessionId: string;
  sharedGold: number;
  players: PlayerState[];
  objective: ObjectiveState;
  wave: WaveState;
  enemies: EnemyState[];
  buildPads: BuildPadState[];
  paths: EnemyPathState[];
  messageLog: string[];
}

export type GameStateSnapshot = Readonly<GameState>;

export type GameCommand =
  | { type: "player:set-ready"; playerId: PlayerId; ready: boolean }
  | { type: "build-pad:toggle"; padId: string; towerType?: string }
  | { type: "wave:set-active"; active: boolean }
  | { type: "simulation:tick"; deltaMs: number };

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

interface WaveEnemyDefinition {
  id: string;
  pathId: PathId;
  maxHp: number;
  speed: number;
  leakDamage: number;
}

const waveOneEnemies: WaveEnemyDefinition[] = [
  { id: "wave-1-A-01", pathId: "A", maxHp: 120, speed: 96, leakDamage: 100 },
  { id: "wave-1-A-02", pathId: "A", maxHp: 120, speed: 88, leakDamage: 100 },
  { id: "wave-1-A-03", pathId: "A", maxHp: 160, speed: 72, leakDamage: 150 },
  { id: "wave-1-B-01", pathId: "B", maxHp: 120, speed: 96, leakDamage: 100 },
  { id: "wave-1-B-02", pathId: "B", maxHp: 120, speed: 88, leakDamage: 100 },
  { id: "wave-1-B-03", pathId: "B", maxHp: 160, speed: 72, leakDamage: 150 }
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
      enemiesRemaining: 0,
      enemiesSpawned: 0,
      enemiesLeaked: 0,
      completed: false
    },
    enemies: [],
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
      return command.active ? startWave(state) : resetWave(state);
    case "simulation:tick":
      return advanceSimulation(state, command.deltaMs);
  }
}

export function getSerializableSnapshot(state: GameState): GameStateSnapshot {
  return structuredClone(state);
}

function startWave(state: GameState): GameState {
  if (state.wave.active && state.enemies.length > 0) {
    return state;
  }

  const enemies = spawnWaveOneEnemies(state.paths);
  return withLog(
    {
      ...state,
      wave: {
        ...state.wave,
        active: true,
        enemiesRemaining: enemies.length,
        enemiesSpawned: enemies.length,
        enemiesLeaked: 0,
        completed: false
      },
      enemies
    },
    `Wave ${state.wave.index} started: ${enemies.length} enemies inbound`
  );
}

function resetWave(state: GameState): GameState {
  return withLog(
    {
      ...state,
      wave: {
        ...state.wave,
        active: false,
        enemiesRemaining: 0,
        enemiesSpawned: 0,
        enemiesLeaked: 0,
        completed: false
      },
      enemies: []
    },
    `Wave ${state.wave.index} reset`
  );
}

function spawnWaveOneEnemies(paths: EnemyPathState[]): EnemyState[] {
  return waveOneEnemies.map((definition) => {
    const path = requirePath(paths, definition.pathId);
    return {
      id: definition.id,
      pathId: definition.pathId,
      position: { ...path.entrance },
      maxHp: definition.maxHp,
      currentHp: definition.maxHp,
      status: "active",
      progress: 0,
      distanceTravelled: 0,
      speed: definition.speed,
      leakDamage: definition.leakDamage
    };
  });
}

function advanceSimulation(state: GameState, deltaMs: number): GameState {
  if (!state.wave.active || state.enemies.length === 0 || !Number.isFinite(deltaMs) || deltaMs <= 0) {
    return state;
  }

  const deltaSeconds = deltaMs / 1000;
  const activeEnemies: EnemyState[] = [];
  const logEntries: string[] = [];
  let objectiveHp = state.objective.currentHp;
  let leakedThisTick = 0;

  for (const enemy of state.enemies) {
    const path = requirePath(state.paths, enemy.pathId);
    const totalDistance = getPathTotalDistance(path);
    const nextDistance = enemy.distanceTravelled + enemy.speed * deltaSeconds;

    if (nextDistance >= totalDistance) {
      objectiveHp = Math.max(0, objectiveHp - enemy.leakDamage);
      leakedThisTick += 1;
      logEntries.push(`${enemy.id} leaked for ${enemy.leakDamage} damage`);
      continue;
    }

    activeEnemies.push({
      ...enemy,
      distanceTravelled: nextDistance,
      progress: roundForSnapshot(nextDistance / totalDistance),
      position: pointAtDistance(path, nextDistance)
    });
  }

  const waveComplete = activeEnemies.length === 0;
  if (waveComplete) {
    logEntries.push(`Wave ${state.wave.index} complete`);
  }

  return withLogEntries(
    {
      ...state,
      objective: {
        ...state.objective,
        currentHp: objectiveHp
      },
      wave: {
        ...state.wave,
        active: !waveComplete,
        enemiesRemaining: activeEnemies.length,
        enemiesLeaked: state.wave.enemiesLeaked + leakedThisTick,
        completed: waveComplete
      },
      enemies: activeEnemies
    },
    logEntries
  );
}

function requirePath(paths: EnemyPathState[], pathId: PathId): EnemyPathState {
  const path = paths.find((candidate) => candidate.id === pathId);
  if (!path) {
    throw new Error(`Missing enemy path ${pathId}`);
  }
  return path;
}

function getPathPoints(path: EnemyPathState): Vec2[] {
  return [path.entrance, ...path.waypoints];
}

function getPathTotalDistance(path: EnemyPathState): number {
  const points = getPathPoints(path);
  return points.slice(1).reduce((total, point, index) => total + distance(points[index], point), 0);
}

function pointAtDistance(path: EnemyPathState, targetDistance: number): Vec2 {
  const points = getPathPoints(path);
  let remainingDistance = targetDistance;

  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1];
    const end = points[index];
    const segmentDistance = distance(start, end);

    if (remainingDistance <= segmentDistance) {
      const segmentProgress = segmentDistance === 0 ? 0 : remainingDistance / segmentDistance;
      return {
        x: roundForSnapshot(lerp(start.x, end.x, segmentProgress)),
        y: roundForSnapshot(lerp(start.y, end.y, segmentProgress))
      };
    }

    remainingDistance -= segmentDistance;
  }

  return { ...points[points.length - 1] };
}

function distance(a: Vec2, b: Vec2): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function roundForSnapshot(value: number): number {
  return Number(value.toFixed(3));
}

function withLog(state: GameState, entry: string): GameState {
  return withLogEntries(state, [entry]);
}

function withLogEntries(state: GameState, entries: string[]): GameState {
  if (entries.length === 0) {
    return state;
  }

  return {
    ...state,
    messageLog: [...entries.reverse(), ...state.messageLog].slice(0, 4)
  };
}
