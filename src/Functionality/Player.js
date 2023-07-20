import Gameboard from "./Gameboard.js";
import { Ship, shipChoices } from "./Ship.js";

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
  player.placeShipRandom = (ship) => {
    const randCoord = player.selectRandCoord();
    const align =
      Math.random() < 0.5
        ? player.placeShipHorizontal
        : player.placeShipVertical;
    const result = align(ship, randCoord);
    if (!result) return false;
    return true;
  };
  player.resetGrid = () => {
    player.grid = Array.from({ length: 10 }, () => Array(10).fill(false));
  };
  player.displayGrid = () => {
    return player.grid;
  };
  player.removeShip = (ship) => {
    const shipLocations = ship.logInfo().locations;
    for (const [x, y] of shipLocations) {
      player.grid[x][y] = false;
    }
  };

  player.placeFleetRandom = () => {
    let isPlaced = false;
    for (let shipName in shipChoices) {
      let ship = Ship(shipName);
      isPlaced = false;
      while (!isPlaced) {
        if (player.placeShipRandom(ship)) {
          // ship.logInfo().align === "horizontal"
          //   ? (ship.logInfo().align = "vertical")
          //   : (ship.logInfo().align = "horizontal");
          isPlaced = true;
        }
      }
    }
  };
  return player;
};

//add an additional check to placeFleetRandom and use the power of each ship to get all of its surrounding squares, check to make sure none of the surroundings squares are an object, end of story. fuck all of testing bullshit and fuck this waste of time project.

export default Player;

// player.placeFleetRandom = () => {
//   for (let shipName in shipChoices) {
//     let ship = Ship(shipName);
//     let isPlaced = false;
//     let align;

//     while (!isPlaced) {
//       align = Math.random() < 0.5 ? "horizontal" : "vertical";
//       if (player.placeShip(ship, player.selectRandCoord(), align)) {
//         ship.logInfo().align = align;
//         isPlaced = true;
//       }
//     }
//   }
// };

//not yet, but i did test and simulate a full game and it seemed like it worked ok.  my current DOM logic is a mess because i'm still working on it. i'm struggling with the idea that the DOM logic and Game/Gameloop logic is suppose to be fully separate, right now my DOM logic is very coupled with my functional logic bc i don't really know how i'm suppose to keep my DOM logic isolated like it says without actually doing anything. this is my player class anyway//
