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
  const selectOrigin = (ship, [x, y]) => {
    if (invalidCoordinate(x, y)) return;
    grid[x][y] = ship;
    return [x, y];
  };
  const isTailValid = (ship, coord, align) => {
    const origin = selectOrigin(ship, coord);
    if (!origin) return;
    const [x, y] = origin;
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
  const placeShip = (ship, coord, align) => {
    if (!isTailValid(ship, coord, align)) return;

    const [x, y] = coord;
    const tail = ship.logInfo().length - 1;

    ship.logInfo().locations.push([x, y]);

    for (let i = 1; i <= tail; i++) {
      if (align === "vertical") {
        grid[x][y + i] = ship;
        ship.logInfo().locations.push([x, y + i]);
      } else if (align === "horizontal") {
        grid[x + i][y] = ship;
        ship.logInfo().locations.push([x + i, y]);
      }
    }
    return true;
  };

  const placeShipVertical = (ship, coordinate) => {
    placeShip(ship, coordinate, "vertical");
  };
  const placeShipHorizontal = (ship, coordinate) => {
    placeShip(ship, coordinate, "horizontal");
  };
  const receiveAttack = (coordinate) => {
    const [x, y] = coordinate;
    if (!grid[x][y]) {
      grid[x][y] = null; //mark square as missed or null
      return; //it's an empty square
    }
    if (typeof grid[x][y] === "object") {
      // then it's a ship part
      if (grid[x][y].isSunk()) return; //dead ship, skip
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
    selectOrigin,
    isTailValid,
    placeShip,
    placeShipVertical,
    placeShipHorizontal,
    receiveAttack,
    isGameOver,
    shipPartsHit,
  };
};

export default Gameboard;
