import Phaser from "phaser";
import { describeGameState, syncDebugDom } from "../game/debug";
import type { GameCommand, GameState, PathId, Vec2 } from "../game/state";

const WORLD_WIDTH = 1280;
const WORLD_HEIGHT = 720;

const colors = {
  background: 0x121418,
  field: 0x23362f,
  fieldEdge: 0x6bb39b,
  pathA: 0xd98b55,
  pathB: 0x6da7d9,
  merge: 0xf2c14e,
  objective: 0xd95d5d,
  padOpen: 0xf5f0df,
  padOccupied: 0x79c26d,
  playerOne: 0x7ed7ff,
  playerTwo: 0xb88cff,
  text: "#f5f0df",
  mutedText: "#a7b3ad"
};

export class PrototypeScene extends Phaser.Scene {
  private graphics?: Phaser.GameObjects.Graphics;
  private hudText?: Phaser.GameObjects.Text;
  private logText?: Phaser.GameObjects.Text;
  private labelGroup?: Phaser.GameObjects.Group;

  constructor(
    private readonly getState: () => GameState,
    private readonly dispatch: (command: GameCommand) => GameState
  ) {
    super("PrototypeScene");
  }

  create(): void {
    this.cameras.main.setBackgroundColor(colors.background);
    this.graphics = this.add.graphics();
    this.labelGroup = this.add.group();
    this.hudText = this.add.text(24, 20, "", {
      color: colors.text,
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "18px",
      lineSpacing: 8
    });
    this.logText = this.add.text(420, 38, "", {
      color: colors.text,
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "18px",
      align: "center",
      fixedWidth: 440
    });

    this.renderState();
    this.scale.on(Phaser.Scale.Events.RESIZE, () => this.renderState());
    window.addEventListener("killbox:state-change", () => this.renderState());
  }

  private renderState(): void {
    const state = this.getState();
    this.graphics?.clear();
    this.labelGroup?.clear(true, true);

    this.drawArena();
    for (const path of state.paths) {
      this.drawPath(path.id, path.entrance, path.waypoints);
    }
    this.drawBuildPads(state.buildPads);
    this.drawObjective(state.objective.position);
    this.drawPlayers(state.players);
    this.drawLabels();

    this.hudText?.setText([
      `Objective ${state.objective.currentHp}/${state.objective.maxHp}`,
      `Shared gold ${state.sharedGold}`,
      `Wave ${state.wave.index} ${state.wave.active ? "active" : "ready"}`,
      `Session ${state.sessionId}`
    ]);
    this.logText?.setText(state.messageLog.join("\n"));
    syncDebugDom(describeGameState(state));
  }

  private drawArena(): void {
    const graphics = this.requireGraphics();
    graphics.fillStyle(colors.field, 1);
    graphics.lineStyle(4, colors.fieldEdge, 1);
    graphics.fillRoundedRect(55, 88, WORLD_WIDTH - 150, WORLD_HEIGHT - 150, 8);
    graphics.strokeRoundedRect(55, 88, WORLD_WIDTH - 150, WORLD_HEIGHT - 150, 8);
    graphics.fillStyle(0x18201d, 1);
    graphics.fillRect(0, 0, WORLD_WIDTH, 72);
  }

  private drawPath(id: PathId, entrance: Vec2, waypoints: Vec2[]): void {
    const graphics = this.requireGraphics();
    const color = id === "A" ? colors.pathA : colors.pathB;
    const points = [entrance, ...waypoints];

    graphics.lineStyle(22, color, 0.28);
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) {
      graphics.lineTo(point.x, point.y);
    }
    graphics.strokePath();

    graphics.lineStyle(4, color, 0.95);
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) {
      graphics.lineTo(point.x, point.y);
    }
    graphics.strokePath();

    graphics.fillStyle(color, 1);
    graphics.fillCircle(entrance.x, entrance.y, 18);
  }

  private drawBuildPads(buildPads: GameState["buildPads"]): void {
    const graphics = this.requireGraphics();
    for (const pad of buildPads) {
      const occupied = Boolean(pad.occupiedBy);
      graphics.fillStyle(occupied ? colors.padOccupied : colors.padOpen, occupied ? 0.95 : 0.18);
      graphics.lineStyle(3, occupied ? colors.padOccupied : colors.padOpen, 1);
      graphics.fillRoundedRect(pad.position.x - 31, pad.position.y - 31, 62, 62, 8);
      graphics.strokeRoundedRect(pad.position.x - 31, pad.position.y - 31, 62, 62, 8);

      const hit = this.add
        .zone(pad.position.x, pad.position.y, 70, 70)
        .setInteractive({ cursor: "pointer" });
      hit.once("pointerdown", () => {
        this.dispatch({ type: "build-pad:toggle", padId: pad.id });
        this.renderState();
      });
      this.labelGroup?.add(hit);
    }
  }

  private drawObjective(position: Vec2): void {
    const graphics = this.requireGraphics();
    graphics.fillStyle(colors.objective, 0.95);
    graphics.lineStyle(4, 0xf5f0df, 1);
    graphics.fillRoundedRect(position.x - 48, position.y - 64, 96, 128, 8);
    graphics.strokeRoundedRect(position.x - 48, position.y - 64, 96, 128, 8);
  }

  private drawPlayers(players: GameState["players"]): void {
    const graphics = this.requireGraphics();
    for (const player of players) {
      graphics.fillStyle(player.id === "p1" ? colors.playerOne : colors.playerTwo, player.connected ? 1 : 0.38);
      graphics.fillCircle(player.position.x, player.position.y, 22);
      this.addLabel(player.position.x - 34, player.position.y + 28, player.label, 14);
    }
  }

  private drawLabels(): void {
    this.addLabel(80, 130, "Entrance A", 15);
    this.addLabel(80, 586, "Entrance B", 15);
    this.addLabel(610, 372, "Merge", 16, "#f2c14e");
    this.addLabel(1034, 436, "Objective", 16);
    this.addLabel(270, 650, "Fixed build pads", 15, colors.mutedText);
  }

  private addLabel(x: number, y: number, text: string, size: number, color = colors.text): void {
    const label = this.add.text(x, y, text, {
      color,
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: `${size}px`
    });
    this.labelGroup?.add(label);
  }

  private requireGraphics(): Phaser.GameObjects.Graphics {
    if (!this.graphics) {
      throw new Error("PrototypeScene graphics not initialized");
    }
    return this.graphics;
  }
}

export const prototypeSceneSize = {
  width: WORLD_WIDTH,
  height: WORLD_HEIGHT
} as const;
