import { initializeGame } from "./Appearance/Game";
import { Setup, displayGrid } from "./Appearance/Setup";
import Player from "./Functionality/Player";
import "./styles.css";

const player = Player(true);
const computer = Player(false);
player.placeFleetRandom();
computer.placeFleetRandom();

Setup(player, "p1grid");
displayGrid(computer, "p2grid");

initializeGame(player, computer);
