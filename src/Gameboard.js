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
    return outOfBounds(x, y) || grid[x][y];
  };
  const selectOrigin = (ship, [x, y]) => {
    if (invalidCoordinate(x, y)) return;
    grid[x][y] = ship;
    return [x, y];
  };
  // const isTailValid = (coordinate, direction, tailLength) => {
  //   const [x, y] = coordinate;
  //   for (let i = 1; i <= tailLength; i++) {
  //     direction === "vertical" ? (y += i) : (x += i);
  //     if (invalidCoordinate(x, y)) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };
  const placeShip = (ship, coordinate, direction) => {
    // get origin check if it's valid
    const origin = selectOrigin(ship, coordinate);
    if (!origin) return;

    //get origin and tail number
    const [x, y] = origin;
    const tail = ship.logInfo().length - 1;

    //loop through tail number
    for (let i = 1; i <= tail; i++) {
      //create clone x/y for tail
      let targetX = x;
      let targetY = y;

      //increment targetX or targetY
      if (direction === "vertical") {
        targetY += i;
      } else if (direction === "horizontal") {
        targetX += i;
      }

      //are tail targetX/targetY valid coordinates/do they go out of bounds
      //or do they overlap with another ship, if so return undefined
      if (invalidCoordinate(targetX, targetY)) {
        return;
      }
    }

    //push origin to locations
    ship.logInfo().locations.push([x, y]);

    //pushing the tail to locations
    for (let i = 1; i <= tail; i++) {
      if (direction === "vertical") {
        grid[x][y + i] = ship;
        //push tail to locations
        ship.logInfo().locations.push([x, y + i]);
      } else if (direction === "horizontal") {
        grid[x + i][y] = ship;
        //push tail to locations
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
    placeShip,
    placeShipVertical,
    placeShipHorizontal,
    receiveAttack,
    isGameOver,
    shipPartsHit,
  };
};

export default Gameboard;
