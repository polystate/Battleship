import Gameboard from "./Gameboard.js";

const Player = () => {
  const player = {};

  player.additionalProperty = "Some value";
  player.isTurn = () => {
    // Some functionality
  };

  Object.setPrototypeOf(player, Gameboard());
  return player;
};

export default Player;
