const Gameboard = () => {
  const grid = Array.from({ length: 10 }, () => Array(10).fill(false));
  let shipPartsHit = 0;
  const placeShipOrigin = (ship, coordinate) => {
    const [x, y] = coordinate;
    if (x < 0 || x > 9 || y < 0 || y > 9 || typeof grid[x][y] === "object")
      return;
    grid[x][y] = ship;
    return grid[x][y];
  };
  const placeShipVertical = (ship, coordinate) => {
    const origin = placeShipOrigin(ship, coordinate);
    if (!origin) return;
    return "something";
  };
  const placeShipHorizontal = () => {};
  const receiveAttack = () => {};
  const isGameOver = () => {};
  return {
    grid,
    placeShipOrigin,
    placeShipVertical,
    placeShipHorizontal,
    receiveAttack,
    isGameOver,
    shipPartsHit,
  };
};

export default Gameboard;
