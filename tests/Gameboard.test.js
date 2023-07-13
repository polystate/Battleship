import Gameboard from "../src/Gameboard.js";
import { Ship } from "../src/Ship.js";

describe("Component: Gameboard initialization", () => {
  test("When Gameboard is initialized, it should return the following properties: grid, selectOrigin, placeShipVertical, placeShipHorizontal, receiveAttack, isGameOver, and shipPartsHit", () => {
    const gameBoard = Gameboard();
    expect(gameBoard).toStrictEqual({
      grid: expect.any(Object),
      logBoardData: expect.any(Function),
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
    const gameBoard = Gameboard();
    expect(gameBoard.shipPartsHit).toBe(0);
  });
});

describe("Component: Gameboard Setup", () => {
  test("Gameboard should have a grid variable that starts off as a 10x10 2D array filled with false booleans", () => {
    const gameBoard = Gameboard();
    expect(gameBoard.grid).toStrictEqual(
      Array.from({ length: 10 }, () => {
        return Array(10).fill(false);
      })
    );
  });
});

describe("Component: selectOrigin", () => {
  test("Placing a ship's origin at a coordinate updates the grid variable with Ship object in proper location", () => {
    const gameBoard = Gameboard();
    const battleship = Ship("Battleship");
    gameBoard.selectOrigin(battleship, [0, 4]);
    expect(gameBoard.grid[0][4]).toEqual(battleship);
  });
  test("Placing a ship's origin out of bounds should return undefined and break out of the function", () => {
    const gameBoard = Gameboard();
    const submarine = Ship("Submarine");
    const battleship = Ship("Battleship");
    expect(gameBoard.selectOrigin(submarine, [-1, 0])).toBe(undefined);
    expect(gameBoard.selectOrigin(battleship, [0, 10])).toBe(undefined);
  });
  test("Placing a ship's origin on top of another ship should return undefined and break out of the function", () => {
    const gameBoard = Gameboard();
    const battleship = Ship("Battleship");
    const submarine = Ship("Submarine");
    gameBoard.selectOrigin(battleship, [5, 5]);
    expect(gameBoard.selectOrigin(submarine, [5, 5])).toBe(undefined);
  });
});

describe("Component: placeShip", () => {
  test("placeShip should return undefined when placed out of bounds", () => {
    const gameBoard = Gameboard();
    const destroyer = Ship("Destroyer");
    const carrier = Ship("Carrier");
    expect(gameBoard.placeShip(destroyer, [10, 7], "horizontal")).toBe(
      undefined
    );
    expect(gameBoard.placeShip(carrier, [5, 6], "vertical")).toBe(undefined);
  });
  test("Placement of ship should assign the current coordinates to the ship's 2D locations array in its logInfo() method", () => {
    const gameBoard = Gameboard();
    const submarine = Ship("Submarine");
    gameBoard.placeShip(submarine, [4, 4], "horizontal");
    expect(submarine.logInfo().locations).toStrictEqual([
      [4, 4],
      [5, 4],
      [6, 4],
    ]);
  });
  test("Valid placement of a ship should return true from the placeShip function", () => {
    const gameBoard = Gameboard();
    const carrier = Ship("Carrier");
    const destroyer = Ship("Destroyer");
    expect(gameBoard.placeShip(carrier, [5, 5], "vertical")).toBe(true);
    expect(gameBoard.placeShip(destroyer, [5, 2], "vertical")).toBe(true);
  });
  test("placeShip should place 'Cruiser' vertically two squares (or its length - 1) above its origin", () => {
    const gameBoard = Gameboard();
    const cruiser = Ship("Cruiser");
    gameBoard.placeShip(cruiser, [4, 4], "vertical");
    expect(gameBoard.grid[4][5]).toStrictEqual(cruiser);
    expect(gameBoard.grid[4][6]).toStrictEqual(cruiser);
  });
  test("placeShip should place 'Destroyer' horizontally one square (or its length - 1) to the right of its origin", () => {
    const gameBoard = Gameboard();
    const destroyer = Ship("Destroyer");
    gameBoard.placeShip(destroyer, [0, 0], "horizontal");
    expect(gameBoard.grid[1][0]).toStrictEqual(destroyer);
  });
  test("placeShip attempts to place 'Cruiser' vertically two squares but goes out of bounds and it returns undefined", () => {
    const gameBoard = Gameboard();
    const cruiser = Ship("Cruiser");
    expect(gameBoard.placeShip(cruiser, [4, 8], "vertical")).toBe(undefined);
  });
  test("placeShip attempts to place 'Battleship' horizontally two squares but goes out of bounds and it returns undefined", () => {
    const gameBoard = Gameboard();
    const battleship = Ship("Battleship");
    expect(gameBoard.placeShip(battleship, [7, 4], "horizontal")).toBe(
      undefined
    );
  });
  test("placeShip should return undefined when placing a ship on top of an existing ship", () => {
    const gameBoard = Gameboard();
    const destroyer = Ship("Destroyer");
    const cruiser = Ship("Cruiser");

    // Place the cruiser ship on the game board
    gameBoard.placeShip(cruiser, [4, 4], "vertical");

    // Attempt to place another ship on top of the existing one
    expect(gameBoard.placeShip(destroyer, [4, 4], "vertical")).toBe(undefined);

    // Verify that the grid remains unchanged
    expect(gameBoard.grid[4][4]).toStrictEqual(cruiser);
    expect(gameBoard.grid[4][5]).toStrictEqual(cruiser);
  });

  test("placeShip should return undefined when placing a ship at an invalid coordinate", () => {
    const gameBoard = Gameboard();
    const destroyer = Ship("Destroyer");
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
    const gameBoard = Gameboard();
    const cruiser = Ship("Cruiser");
    const destroyer = Ship("Destroyer");
    gameBoard.placeShip(cruiser, [4, 4], "vertical");
    gameBoard.placeShip(destroyer, [0, 0], "horizontal");
    expect(gameBoard.grid[4][4]).toStrictEqual(cruiser);
    expect(gameBoard.grid[4][5]).toStrictEqual(cruiser);
    expect(gameBoard.grid[4][6]).toStrictEqual(cruiser);
    expect(gameBoard.grid[0][0]).toStrictEqual(destroyer);
    expect(gameBoard.grid[1][0]).toStrictEqual(destroyer);
  });
});

describe("Component: Test for Ships that Touch", () => {
  test("Placing two ships that have a gap of one square should return undefined", () => {});
});

describe("Component: Gameboard action methods", () => {
  test("receiveAttack method targets an empty square and returns undefined", () => {
    const gameBoard = Gameboard();
    expect(gameBoard.receiveAttack([5, 5])).toBe(undefined);
  });
  test("receiveAttack function takes a pair of coordinates and determines whether or not the attack hit the ship", () => {
    const gameBoard = Gameboard();
    const battleship = Ship("Battleship");
    const cruiser = Ship("Cruiser");
    gameBoard.placeShipVertical(battleship, [2, 3]);
    gameBoard.placeShipHorizontal(cruiser, [1, 1]);
    expect(gameBoard.receiveAttack([2, 3])).toBe(true);
    expect(gameBoard.receiveAttack([2, 4])).toBe(true);
    expect(gameBoard.receiveAttack([2, 5])).toBe(true);
    expect(gameBoard.receiveAttack([2, 6])).toBe(true);
    expect(gameBoard.receiveAttack([2, 7])).toBe(undefined);
    expect(gameBoard.receiveAttack([1, 1])).toBe(true);
    expect(gameBoard.receiveAttack([2, 1])).toBe(true);
    expect(gameBoard.receiveAttack([3, 1])).toBe(true);
    expect(gameBoard.receiveAttack([4, 1])).toBe(undefined);
    expect(gameBoard.receiveAttack([0, 1])).toBe(undefined);
  });
  test("receiveAttack method targets a ship that is already dead and returns undefined", () => {
    const gameBoard = Gameboard();
    const destroyer = Ship("Destroyer");
    gameBoard.placeShipHorizontal(destroyer, [4, 4]);
    gameBoard.receiveAttack([4, 4]);
    gameBoard.receiveAttack([5, 4]);
    expect(gameBoard.receiveAttack([4, 4])).toBe(undefined);
    expect(gameBoard.receiveAttack([5, 4])).toBe(undefined);
  });

  test("When receiving a hit, should increase shipPartsHit variable by one", () => {
    const gameBoard = Gameboard();
    const battleship = Ship("Battleship");
    const submarine = Ship("Submarine");
    gameBoard.placeShipVertical(battleship, [0, 0]);
    gameBoard.placeShipHorizontal(submarine, [2, 2]);
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([0, 1]);
    gameBoard.receiveAttack([2, 2]);
    gameBoard.receiveAttack([3, 2]);
    gameBoard.receiveAttack([4, 2]);
    expect(gameBoard.logBoardData().hits).toBe(5);
  });
  test("Keeps track of missed shots by updating grid. missed attacks should also be falsey... in this case null...", () => {
    const gameBoard = Gameboard();
    gameBoard.receiveAttack([9, 9]);
    expect(gameBoard.grid[9][9]).toBe(null);
  });
});

describe("Component: Game over. Simulates an entire game of Battleship.", () => {
  test("Gameboards should be able to report whether or not all their ships have been sunk", () => {
    const gameBoard = Gameboard();
    const battleship = Ship("Battleship");
    const carrier = Ship("Carrier");
    const destroyer = Ship("Destroyer");
    const submarine = Ship("Submarine");
    const cruiser = Ship("Cruiser");
    gameBoard.placeShipHorizontal(carrier, [0, 0]);
    gameBoard.placeShipHorizontal(battleship, [0, 1]);
    gameBoard.placeShipVertical(destroyer, [5, 5]);
    gameBoard.placeShipHorizontal(submarine, [2, 2]);
    gameBoard.placeShipVertical(cruiser, [9, 4]);
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([1, 0]);
    gameBoard.receiveAttack([2, 0]);
    gameBoard.receiveAttack([3, 0]);
    gameBoard.receiveAttack([4, 0]);

    gameBoard.receiveAttack([0, 1]);
    gameBoard.receiveAttack([1, 1]);
    gameBoard.receiveAttack([2, 1]);
    gameBoard.receiveAttack([3, 1]);

    gameBoard.receiveAttack([5, 5]);
    gameBoard.receiveAttack([5, 6]);

    gameBoard.receiveAttack([2, 2]);
    gameBoard.receiveAttack([3, 2]);
    gameBoard.receiveAttack([4, 2]);

    gameBoard.receiveAttack([9, 4]);
    gameBoard.receiveAttack([9, 5]);
    gameBoard.receiveAttack([9, 6]);

    expect(gameBoard.isGameOver()).toBe(true);
  });
});
