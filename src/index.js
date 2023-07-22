import gameLoop from "./Appearance/Game";
import { Setup } from "./Appearance/Setup";
import Player from "./Functionality/Player";
import "./styles.css";

const player = Player(true);
player.placeFleetRandom();

Setup(player, "p1grid");
