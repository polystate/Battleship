import Gameboard from "./Gameboard.js";

describe("Component: Gameboard initialization", () => {
  test("Gameboard initialize method should return a 10x10 2D array grid that stores null", () => {
    expect(Gameboard.initialize()).toStrictEqual(
      Array.from({ length: 10 }, () => {
        return Array(10).fill(null);
      })
    );
  });
  test("Gameboard should initialize a shipPartsHit counter to 0", () => {
    Gameboard.initialize();
    Gameboard.shipPartsHit = 0;
  });
});

describe("Component: Gameboard setup", () => {
  const gameBoard = Gameboard();
  gameBoard.initialize();
  test("Place a particular ship at specific coordinate", () => {
    expect(Gameboard.placeShip(Ship(4, "Battleship"), [0, 4]));
  });
  test("Placing a ship out of bounds should return an error and no ship should be placed there", () => {
    expect(Gameboard.placeShip(Ship(3, "Courier"), [-1, 0]));
  });
  test("Placing a ship that overlaps with another ship directly should return an error and no ship should be placed there", () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    gameBoard.placeShip(Ship(2, "Destroyer"), [8, 9]);
    gameBoard.placeShip(Ship(3, "Submarine"), [7, 9]);
    expect(gameBoard.grid[(8, 9)]).toBe(true);
    expect(gameBoard.grid[(7, 9)]).toBe(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Illegal placement. Ship Submarine overlaps with Ship Destroyer.`
    );
  });
});

describe("Component: Gameboard action methods", () => {
  test("Uses a receiveAttack function that takes a pair of coordinates and determines whether or not the attack hit the ship", () => {
    Gameboard.placeShip(Ship(4, "Battleship"), [2, 3]);
    expect(Gameboard.receiveAttack([2, 3])).toBe(true);
  });
  test("When receiving a hit, should increase shipPartsHit variable by one. There are 17 total parts per board.", () => {
    Gameboard.placeShip(Ship(4, "Battleship"), [5, 6]);
    Gameboard.placeShip(Ship(3, "Submarine"), [2, 2]);
    Gameboard.receiveAttack([5, 6]);
    Gameboard.receiveAttack([2, 2]);
    expect(Gameboard.shipPartsHit).toBe(2);
  });
  test("Keeps track of missed shots by updating grid", () => {
    Gameboard.receiveAttack([0, 0]);
    expect(Gameboard.grid[0][0]).toBe(true);
  });
});

describe("Component: Game over", () => {
  test("Gameboards should be able to report whether or not all their ships have been sunk", () => {
    const gameBoard = Gameboard.initialize();
    gameBoard.shipPartsHit = 17;
    expect(gameBoard.isGameOver().toBe(true));
  });
});
