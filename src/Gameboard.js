import { shipChoices } from "./Ship.js";

const Gameboard = () => {
  const grid = Array.from({ length: 10 }, () => Array(10).fill(false));
  let shipPartsHit = 0;
  const logBoardData = () => {
    return {
      hits: shipPartsHit,
    };
  };
  const outOfBounds = (x, y) => {
    return x < 0 || x > 9 || y < 0 || y > 9;
  };
  const invalidCoordinate = (x, y) => {
    return outOfBounds(x, y) || grid[x][y] !== false;
  };
  const isTouching = (x, y) => {
    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x - 1, y - 1],
    ];

    return neighbors.some(([nx, ny]) => {
      return !outOfBounds(nx, ny) && typeof grid[nx][ny] === "object";
    });
  };
  const isTailValid = (ship, coord, align) => {
    if (invalidCoordinate(coord[0], coord[1]) || isTouching(coord[0], coord[1]))
      return;
    const [x, y] = coord;
    const tailLength = ship.logInfo().length - 1;
    for (let i = 1; i <= tailLength; i++) {
      let tailX = x;
      let tailY = y;
      align === "vertical" ? (tailY += i) : (tailX += i);
      if (invalidCoordinate(tailX, tailY)) {
        return;
      }
    }
    return true;
  };
  const appendTail = (ship, coord, align, tail) => {
    const [x, y] = coord;
    for (let i = 1; i <= tail; i++) {
      if (align === "vertical") {
        grid[x][y + i] = ship;
        ship.logInfo().locations.push([x, y + i]);
      } else if (align === "horizontal") {
        grid[x + i][y] = ship;
        ship.logInfo().locations.push([x + i, y]);
      }
    }
  };
  const placeShip = (ship, coord, align) => {
    if (!isTailValid(ship, coord, align)) return;
    const [x, y] = coord;
    grid[x][y] = ship;
    const tail = ship.logInfo().length - 1;
    ship.logInfo().locations.push([x, y]); //push origin
    appendTail(ship, coord, align, tail);
    return true;
  };
  const placeShipVertical = (ship, coord) => {
    placeShip(ship, coord, "vertical");
  };
  const placeShipHorizontal = (ship, coord) => {
    placeShip(ship, coord, "horizontal");
  };
  const receiveAttack = (coord) => {
    const [x, y] = coord;
    if (!grid[x][y]) {
      grid[x][y] = null;
      return;
    }
    if (typeof grid[x][y] === "object") {
      if (grid[x][y].isSunk()) return;
      grid[x][y].getHit();
      shipPartsHit++;
      return true;
    }
  };

  const isGameOver = () => {
    return logBoardData().hits == 17 ? true : false;
  };
  return {
    grid,
    logBoardData,
    isTailValid,
    isTouching,
    placeShip,
    placeShipVertical,
    placeShipHorizontal,
    receiveAttack,
    isGameOver,
    shipPartsHit,
  };
};

export default Gameboard;
