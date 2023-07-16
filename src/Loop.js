import { updateDOM, displayShips, handleUserInput } from "./DOM.js";
import Player from "./Player.js";
import { Ship, shipChoices } from "./Ship.js";

const gameLoop = () => {
  const shipPositions = generateShips();
  displayShips(shipPositions);
  requestAnimationFrame(gameLoop);
  if (isGameOver()) {
    return;
  }
};

const isGameOver = () => {};

const generateShips = () => {
  const player = Player();
  player.placeFleetRandom();

  const shipPositions = Object.values(shipChoices).map((length) => {
    const coordinates = [];
    for (let row = 0; row < player.grid.length; row++) {
      for (let col = 0; col < player.grid[row].length; col++) {
        if (
          player.grid[row][col] &&
          player.grid[row][col].logInfo().length === length
        ) {
          coordinates.push([row, col]);
        }
      }
    }
    return { coordinates };
  });

  return shipPositions;
};

export { gameLoop, generateShips };
