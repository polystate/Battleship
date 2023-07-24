import { initializeGame } from "./Appearance/Game";
import { Setup, displayGrid } from "./Appearance/Setup";
import { setFavicon } from "./Utils/utils.js";
import Player from "./Functionality/Player";

import Icon from "./Assets/battleship.png";
import "./styles.css";

setFavicon(Icon);

const player = Player(true);
const computer = Player(false);
player.placeFleetRandom();
computer.placeFleetRandom();

Setup(player, "p1grid");
displayGrid(computer, "p2grid");

initializeGame(player, computer);
