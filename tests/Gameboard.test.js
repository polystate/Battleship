import Gameboard from "../src/Gameboard.js";
import { Ship } from "../src/Ship.js";

//Helper Methods
const destroyEntireShip = (board, ship, origin, alignment) => {
  const [x, y] = origin;
  for (let i = 0; i < ship.logInfo().length; i++) {
    if (alignment === "vertical") {
      board.receiveAttack([x, y + i]);
    } else {
      board.receiveAttack([x + i, y]);
    }
  }
};

const placeEntireShip = (board, ship, origin, alignment) => {
  const [x, y] = origin;
  for (let i = 0; i < ship.logInfo().length; i++) {
    if (alignment === "vertical") {
      board.grid[x][y + i] = ship;
    } else {
      board.grid[x + i][y] = ship;
    }
  }
};

//Tests
describe("[***Gameboard Module***]", () => {
  //Test Variables
  let gameBoard;
  let battleship;
  let cruiser;
  let submarine;
  let carrier;
  let destroyer;

  beforeEach(() => {
    gameBoard = Gameboard();
    battleship = Ship("Battleship");
    cruiser = Ship("Cruiser");
    submarine = Ship("Submarine");
    carrier = Ship("Carrier");
    destroyer = Ship("Destroyer");
  });
  describe("[***Initialization***]", () => {
    test("When Gameboard is initialized, it should return the following properties: grid, selectOrigin, placeShipVertical, placeShipHorizontal, receiveAttack, isGameOver, and shipPartsHit", () => {
      expect(gameBoard).toStrictEqual({
        grid: expect.any(Object),
        logBoardData: expect.any(Function),
        selectOrigin: expect.any(Function),
        isTailValid: expect.any(Function),
        placeShip: expect.any(Function),
        placeShipVertical: expect.any(Function),
        placeShipHorizontal: expect.any(Function),
        receiveAttack: expect.any(Function),
        isGameOver: expect.any(Function),
        shipPartsHit: expect.any(Number),
      });
    });
    test("Gameboard should initialize a shipPartsHit counter to 0", () => {
      expect(gameBoard.shipPartsHit).toBe(0);
    });
  });

  describe("Setup", () => {
    test("Gameboard should have a grid variable that starts off as a 10x10 2D array filled with false booleans", () => {
      expect(gameBoard.grid).toStrictEqual(
        Array.from({ length: 10 }, () => {
          return Array(10).fill(false);
        })
      );
    });
  });

  describe("[***selectOrigin Method***]", () => {
    test("Placing a ship's origin at a coordinate updates the grid variable with Ship object in proper location", () => {
      gameBoard.selectOrigin(battleship, [0, 4]);
      expect(gameBoard.grid[0][4]).toEqual(battleship);
    });
    test("Placing a ship's origin out of bounds should return undefined and break out of the function", () => {
      expect(gameBoard.selectOrigin(submarine, [-1, 0])).toBe(undefined);
      expect(gameBoard.selectOrigin(battleship, [0, 10])).toBe(undefined);
    });
    test("Placing a ship's origin on top of another ship should return undefined and break out of the function", () => {
      gameBoard.selectOrigin(battleship, [5, 5]);
      expect(gameBoard.selectOrigin(submarine, [5, 5])).toBe(undefined);
    });
  });

  describe("[***isTailValid Method***]", () => {
    test("After placing 'Carrier' at a high coordinate vertically, isTailValid() should return undefined", () => {
      expect(gameBoard.isTailValid(carrier, [6, 6], "vertical")).toBe(
        undefined
      );
    });
    test("Placing 'Carrier' at a lower coordinate should return true", () => {
      expect(gameBoard.isTailValid(carrier, [2, 2], "vertical")).toBe(true);
    });
    test("Placing 'Destroyer' (who only has a length of 2) at the edge horizontally should return true", () => {
      expect(gameBoard.isTailValid(destroyer, [8, 9], "horizontal")).toBe(true);
    });
    test("Placing two ships whose tails overlap should return undefined", () => {
      placeEntireShip(gameBoard, carrier, [4, 4], "horizontal");
      expect(gameBoard.isTailValid(battleship, [4, 1], "vertical")).toBe(
        undefined
      );
    });
  });

  describe("[***placeShip Method***]", () => {
    test("placeShip should return undefined when placed out of bounds", () => {
      expect(gameBoard.placeShip(destroyer, [10, 7], "horizontal")).toBe(
        undefined
      );
      expect(gameBoard.placeShip(carrier, [5, 6], "vertical")).toBe(undefined);
    });
    test("Placement of ship should assign the current coordinates to the ship's 2D locations array in its logInfo() method", () => {
      gameBoard.placeShip(submarine, [4, 4], "horizontal");
      expect(submarine.logInfo().locations).toStrictEqual([
        [4, 4],
        [5, 4],
        [6, 4],
      ]);
    });
    test("Valid placement of a ship should return true from the placeShip function", () => {
      expect(gameBoard.placeShip(carrier, [5, 5], "vertical")).toBe(true);
      expect(gameBoard.placeShip(destroyer, [5, 2], "vertical")).toBe(true);
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
      // Place the cruiser ship on the game board
      gameBoard.placeShip(cruiser, [4, 4], "vertical");

      // Attempt to place another ship on top of the existing one
      expect(gameBoard.placeShip(destroyer, [4, 4], "vertical")).toBe(
        undefined
      );

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
      gameBoard.placeShip(cruiser, [4, 4], "vertical");
      gameBoard.placeShip(destroyer, [0, 0], "horizontal");
      expect(gameBoard.grid[4][4]).toStrictEqual(cruiser);
      expect(gameBoard.grid[4][5]).toStrictEqual(cruiser);
      expect(gameBoard.grid[4][6]).toStrictEqual(cruiser);
      expect(gameBoard.grid[0][0]).toStrictEqual(destroyer);
      expect(gameBoard.grid[1][0]).toStrictEqual(destroyer);
    });
  });

  describe("[***Action Methods***]", () => {
    test("receiveAttack method targets an empty square and returns undefined", () => {
      expect(gameBoard.receiveAttack([5, 5])).toBe(undefined);
    });
    test("receiveAttack function takes a pair of coordinates and determines whether or not the attack hit the ship", () => {
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
      gameBoard.placeShipHorizontal(destroyer, [4, 4]);
      destroyEntireShip(gameBoard, destroyer, [4, 4], "horizontal");
      expect(gameBoard.receiveAttack([4, 4])).toBe(undefined);
      expect(gameBoard.receiveAttack([5, 4])).toBe(undefined);
    });

    test("When receiving a hit, should increase shipPartsHit variable by one", () => {
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
      gameBoard.receiveAttack([9, 9]);
      expect(gameBoard.grid[9][9]).toBe(null);
    });
  });

  describe("[***Game Over. Simulates an entire game of Battleship***]", () => {
    test("Gameboards should be able to report whether or not all their ships have been sunk", () => {
      gameBoard.placeShipHorizontal(carrier, [0, 0]);
      gameBoard.placeShipHorizontal(battleship, [0, 1]);
      gameBoard.placeShipVertical(destroyer, [5, 5]);
      gameBoard.placeShipHorizontal(submarine, [2, 2]);
      gameBoard.placeShipVertical(cruiser, [9, 4]);
      destroyEntireShip(gameBoard, carrier, [0, 0], "horizontal");
      destroyEntireShip(gameBoard, battleship, [0, 1], "horizontal");
      destroyEntireShip(gameBoard, destroyer, [5, 5], "vertical");
      destroyEntireShip(gameBoard, submarine, [2, 2], "horizontal");
      destroyEntireShip(gameBoard, cruiser, [9, 4], "vertical");

      expect(gameBoard.isGameOver()).toBe(true);
    });
  });
});
