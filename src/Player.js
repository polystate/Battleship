import Gameboard from "./Gameboard.js";

const generateAllCoords = () => {
  let testArr = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      testArr.push([i, j]);
    }
  }
  return testArr;
};

const Player = (turnBoolean = true) => {
  const player = Object.create(Gameboard());
  const shotsFired = [];
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
    shotsFired.push(coordinate);
  };
  player.getAttempts = () => {
    return shotsFired;
  };

  player.filterMoves = () => {
    const attemptedShots = player.getAttempts();
    const allCoordinates = generateAllCoords();
    const validMoves = allCoordinates.filter((coord) => {
      return !attemptedShots.some((shot) => {
        return shot[0] === coord[0] && shot[1] === coord[1];
      });
    });
    player.randomAttack = () => {
      const validMoves = player.filterMoves();
      const randomIndex = Math.floor(Math.random() * validMoves.length);
      return validMoves[randomIndex];
    };

    return validMoves;
  };

  return player;
};

export default Player;
