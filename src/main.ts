import "./styles.css";
import { mountKillboxGame } from "./runtime/phaserApp";

const gameRoot = document.querySelector<HTMLElement>("#game-root");

if (gameRoot) {
  mountKillboxGame({ parent: gameRoot });
}
