import Gameboard from "./Gameboard.js";

const Player = (turnBoolean = true) => {
  const player = Object.create(Gameboard());
  let turn = turnBoolean;
  player.switchTurn = () => {
    turn = !turn;
  };
  player.isTurn = () => {
    return turn;
  };
  player.attackEnemy = (other, coordinate) => {
    other.receiveAttack(coordinate);
    player.switchTurn();
    other.switchTurn();
  };

  return player;
};

export default Player;
