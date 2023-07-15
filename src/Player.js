import Gameboard from "./Gameboard.js";
import { Ship } from "./Ship.js";

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
  player.randomAttack = () => {
    const validMoves = player.filterMoves();
    const randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex];
  };
  player.selectRandCoord = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };
  player.placeAllHorizontal = (ship, coord) => {
    const [x, y] = coord;
    for (let i = 0; i < ship.logInfo().length; i++) {
      player.placeShipHorizontal(ship, [x + i, y]);
    }
  };
  player.placeAllVertical = (ship, coord) => {
    const [x, y] = coord;
    for (let i = 0; i < ship.logInfo().length; i++) {
      player.placeShipVertical(ship, [x, y + i]);
    }
  };
  player.placeShipRandom = (ship) => {
    const randCoord = player.selectRandCoord();
    const align =
      Math.random() < 0.5 ? player.placeAllHorizontal : player.placeAllVertical;
    const result = align(ship, randCoord);
    return result;
  };

  return player;
};

export default Player;
