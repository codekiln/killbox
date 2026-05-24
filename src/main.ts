import Phaser from "phaser";
import "./styles.css";
import { getDeploymentVersion } from "./deployment";
import { installDebugApi } from "./game/debug";
import { applyGameCommand, createInitialGameState } from "./game/state";
import type { GameCommand, GameState } from "./game/state";
import { MockSessionTransport } from "./net/transport";
import { PrototypeScene, prototypeSceneSize } from "./scenes/PrototypeScene";

let gameState: GameState = createInitialGameState("local-mock");
const deploymentVersion = getDeploymentVersion();
const transport = new MockSessionTransport(gameState.sessionId);

function dispatch(command: GameCommand): GameState {
  gameState = applyGameCommand(gameState, command);
  window.dispatchEvent(new CustomEvent("killbox:state-change", { detail: command }));
  void transport.send({
    sessionId: gameState.sessionId,
    playerId: "local",
    command,
    snapshot: structuredClone(gameState)
  });
  return gameState;
}

installDebugApi(() => gameState, dispatch, deploymentVersion);
void transport.connect();

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game-root",
  width: prototypeSceneSize.width,
  height: prototypeSceneSize.height,
  backgroundColor: "#121418",
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [new PrototypeScene(() => gameState, dispatch)]
});
