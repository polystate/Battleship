import Gameboard from "../src/Gameboard.js";
import { Ship } from "../src/Ship.js";

const gameBoard = Gameboard();
const battleship = Ship("Battleship");
const cruiser = Ship("Cruiser");
const destroyer = Ship("Destroyer");

describe("Component: Gameboard initialization", () => {
  test("When Gameboard is initialized, it should return the following properties: grid, selectOrigin, placeShipVertical, placeShipHorizontal, receiveAttack, isGameOver, and shipPartsHit", () => {
    expect(Gameboard()).toStrictEqual({
      grid: expect.any(Object),
      selectOrigin: expect.any(Function),
      placeShip: expect.any(Function),
      placeShipVertical: expect.any(Function),
      placeShipHorizontal: expect.any(Function),
      receiveAttack: expect.any(Function),
      isGameOver: expect.any(Function),
      shipPartsHit: expect.any(Number),
    });
  });
  test("Gameboard should initialize a shipPartsHit counter to 0", () => {
    expect(Gameboard().shipPartsHit).toBe(0);
  });
});

describe("Component: Gameboard Setup", () => {
  test("Gameboard should have a grid variable that starts off as a 10x10 2D array filled with false booleans", () => {
    expect(gameBoard.grid).toStrictEqual(
      Array.from({ length: 10 }, () => {
        return Array(10).fill(false);
      })
    );
  });
});

describe("Component: selectOrigin", () => {
  test("Placing a ship's origin at a coordinate updates the grid variable with Ship object in proper location", () => {
    gameBoard.selectOrigin(battleship, [0, 4]);
    expect(gameBoard.grid[0][4]).toEqual(battleship);
  });
  test("Placing a ship's origin out of bounds should return undefined and break out of the function", () => {
    expect(gameBoard.selectOrigin(Ship("Submarine"), [-1, 0])).toBe(undefined);
    expect(gameBoard.selectOrigin(battleship, [0, 10])).toBe(undefined);
  });
  test("Placing a ship's origin on top of another ship should return undefined and break out of the function", () => {
    gameBoard.selectOrigin(battleship, [5, 5]);
    expect(gameBoard.selectOrigin(Ship("Submarine"), [5, 5])).toBe(undefined);
  });
});

describe("Component: placeShip", () => {
  test("placeShip should return undefined when placed out of bounds", () => {
    expect(gameBoard.placeShip(destroyer, [10, 7], "horizontal")).toBe(
      undefined
    );
  });
  test("placeShip should place 'Cruiser' vertically two squares (or its length - 1) above its origin", () => {
    gameBoard.placeShip(cruiser, [4, 4], "vertical");
    expect(gameBoard.grid[4][5]).toStrictEqual(cruiser);
    expect(gameBoard.grid[4][6]).toStrictEqual(cruiser);
  });
  test("placeShip should place 'Destroyer' horizontally one square (or its length - 1) to the right of its origin", () => {
    gameBoard.placeShip(destroyer, [0, 0], "horizontal");
    expect(gameBoard.grid[1][0]).toStrictEqual(destroyer);
  });
  test("placeShip attempts to place 'Cruiser' vertically two squares but goes out of bounds and it returns undefined", () => {
    expect(gameBoard.placeShip(cruiser, [4, 8], "vertical")).toBe(undefined);
  });
  test("placeShip attempts to place 'Battleship' horizontally two squares but goes out of bounds and it returns undefined", () => {
    expect(gameBoard.placeShip(battleship, [7, 4], "horizontal")).toBe(
      undefined
    );
  });
  test("placeShip should return undefined when placing a ship on top of an existing ship", () => {
    // Attempt to place another ship on top of the existing one
    expect(gameBoard.placeShip(destroyer, [4, 4], "vertical")).toBe(undefined);

    // Verify that the grid remains unchanged
    expect(gameBoard.grid[4][4]).toStrictEqual(cruiser);
    expect(gameBoard.grid[4][5]).toStrictEqual(cruiser);
  });

  test("placeShip should return undefined when placing a ship at an invalid coordinate", () => {
    const initialGrid = gameBoard.grid.map((row) => [...row]);

    expect(gameBoard.placeShip(destroyer, [-1, 0], "horizontal")).toBe(
      undefined
    );
    expect(gameBoard.placeShip(destroyer, [0, -1], "horizontal")).toBe(
      undefined
    );
    expect(gameBoard.placeShip(destroyer, [10, 0], "horizontal")).toBe(
      undefined
    );
    expect(gameBoard.placeShip(destroyer, [0, 10], "horizontal")).toBe(
      undefined
    );

    // Verify that the grid remains unchanged
    expect(gameBoard.grid).toStrictEqual(initialGrid);
  });

  test("placeShip should place multiple ships without overlapping", () => {
    // Place the first ship
    gameBoard.placeShip(cruiser, [4, 4], "vertical");

    // Place a second ship
    gameBoard.placeShip(destroyer, [0, 0], "horizontal");

    // Verify the grid
    expect(gameBoard.grid[4][4]).toStrictEqual(cruiser);
    expect(gameBoard.grid[4][5]).toStrictEqual(cruiser);
    expect(gameBoard.grid[4][6]).toStrictEqual(cruiser);
    expect(gameBoard.grid[0][0]).toStrictEqual(destroyer);
    expect(gameBoard.grid[1][0]).toStrictEqual(destroyer);
  });
});

describe("Component: Gameboard action methods", () => {
  test("Uses a receiveAttack function that takes a pair of coordinates and determines whether or not the attack hit the ship", () => {
    Gameboard.placeShip(Ship("Battleship"), [2, 3]);
    expect(Gameboard.receiveAttack([2, 3])).toBe(true);
  });
  test("When receiving a hit, should increase shipPartsHit variable by one. There are 17 total parts per board.", () => {
    Gameboard.placeShip(Ship("Battleship"), [5, 6]);
    Gameboard.placeShip(Ship("Submarine"), [2, 2]);
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
