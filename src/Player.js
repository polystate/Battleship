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

  player.scanMoves = (other) => {
    const nullCoordinates = [];
    const legalMoves = [];

    for (let row = 0; row < other.grid.length; row++) {
      for (let col = 0; col < other.grid[row].length; col++) {
        const coordinate = [row, col];

        if (other.grid[row][col] === null) {
          nullCoordinates.push(coordinate);
        } else {
          legalMoves.push(coordinate);
        }
      }
    }

    // console.log(nullCoordinates);
    // console.log(legalMoves);
    return legalMoves;
  };

  return player;
};

export default Player;
