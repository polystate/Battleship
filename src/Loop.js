import { updateDOM } from "./DOM.js";
import Player from "./Player.js";
import { Ship } from "./Ship.js";

const player = Player(true);
const computer = Player(false);

const gameLoop = () => {
  updateGameState();
  renderGame();
  updateDOM(player.grid, computer.grid);
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

export default gameLoop;
