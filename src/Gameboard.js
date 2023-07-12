const Gameboard = () => {
  const grid = Array.from({ length: 10 }, () => Array(10).fill(false));
  let shipPartsHit = 0;
  const logBoardData = () => {
    return {
      hits: shipPartsHit,
    };
  };
  const isValidCoordinate = (x, y) => {
    return x >= 0 && x <= 9 && y >= 0 && y <= 9;
  };
  const selectOrigin = (ship, coordinate) => {
    const [x, y] = coordinate;
    if (!isValidCoordinate(x, y) || grid[x][y] !== false) return;
    grid[x][y] = ship;
    return [x, y];
  };
  const placeShip = (ship, coordinate, direction) => {
    const origin = selectOrigin(ship, coordinate);
    if (!origin) return;

    const [x, y] = origin;
    const tail = ship.logInfo().length - 1;

    for (let i = 1; i <= tail; i++) {
      let targetX = x;
      let targetY = y;

      if (direction === "vertical") {
        targetY += i;
      } else if (direction === "horizontal") {
        targetX += i;
      }

      if (
        !isValidCoordinate(targetX, targetY) ||
        grid[targetX][targetY] !== false
      ) {
        return; // Check for overlapping ships
      }
    }

    for (let i = 1; i <= tail; i++) {
      if (direction === "vertical") {
        grid[x][y + i] = ship;
      } else if (direction === "horizontal") {
        grid[x + i][y] = ship;
      }
    }
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
    placeShip,
    placeShipVertical,
    placeShipHorizontal,
    receiveAttack,
    isGameOver,
    shipPartsHit,
  };
};

export default Gameboard;
