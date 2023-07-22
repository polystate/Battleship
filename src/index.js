import gameLoop from "./Appearance/Game";
import { displayGrid, clickGrid, placeShip } from "./Appearance/Setup";
import Player from "./Functionality/Player";
import "./styles.css";

const player = Player(true);
player.placeFleetRandom();

displayGrid(player, "p1grid");
clickGrid(player, "p1grid");
