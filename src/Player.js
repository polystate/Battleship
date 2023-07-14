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

    return validMoves;
  };

  return player;
};

export default Player;

// player.filterMoves = (other, filtered) => {
//   const legalMoves = [];
//   for (let row = 0; row < other.grid.length; row++) {
//     for (let col = 0; col < other.grid[row].length; col++) {
//       if (other.grid[row][col] !== filtered) {
//         legalMoves.push([row, col]);
//       }
//     }
//   }
//   return legalMoves;
// };
