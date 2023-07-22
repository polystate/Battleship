import { finishSetUp, startGame } from "./Appearance/Game";
import { Setup } from "./Appearance/Setup";
import Player from "./Functionality/Player";
import "./styles.css";

const player = Player(true);
const computer = Player(false);
player.placeFleetRandom();
computer.placeFleetRandom();

Setup(player, "p1grid");
Setup(computer, "p2grid");

const initializeGame = async () => {
  await finishSetUp();
  startGame();
};

initializeGame();
