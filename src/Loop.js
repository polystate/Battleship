import { updateDOM, displayShips } from "./DOM.js";
import Player from "./Player.js";
import { Ship, shipChoices } from "./Ship.js";

const player = Player(true);
const computer = Player(false);

const gameLoop = () => {
  const shipPositions = generateShips();
  displayShips(shipPositions);
  updateGameState();
  renderGame();
  // updateDOM(player.grid, computer.grid);
  requestAnimationFrame(gameLoop);
  if (isGameOver()) {
    endGame();
    return;
  }
};

const updateGameState = () => {};

const renderGame = () => {
  // Render the game state to the DOM
};

const isGameOver = () => {
  // Check if the game is over based on the rules of your game
};

const endGame = () => {
  // Perform necessary actions when the game is over
};

const generateShips = () => {
  const shipPositions = [
    {
      coordinates: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
    }, // Carrier
    {
      coordinates: [
        [2, 5],
        [3, 5],
        [4, 5],
        [5, 5],
      ],
    }, // Battleship
    {
      coordinates: [
        [7, 2],
        [7, 3],
        [7, 4],
      ],
    }, // Cruiser
    {
      coordinates: [
        [9, 1],
        [9, 2],
        [9, 3],
      ],
    }, // Submarine
    {
      coordinates: [
        [6, 8],
        [7, 8],
      ],
    }, // Destroyer
  ];

  return shipPositions;
};

export default gameLoop;
