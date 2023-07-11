import Gameboard from "../src/Gameboard.js";
import { Ship } from "../src/Ship.js";

const gameBoard = Gameboard();

describe("Component: Gameboard initialization", () => {
  test("When Gameboard is initialized, it should return the following methods: placeShipVertical, placeShipHorizontal, receiveAttack, isGameOver, and shipPartsHit", () => {
    expect(Gameboard()).toStrictEqual({
      grid: expect.any(Object),
      placeShipOrigin: expect.any(Function),
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

describe("Component: Gameboard setup and placeShipOrigin", () => {
  const battleship = Ship("Battleship");
  test("Gameboard should have a grid variable that starts off as a 10x10 2D array filled with false booleans", () => {
    expect(gameBoard.grid).toStrictEqual(
      Array.from({ length: 10 }, () => {
        return Array(10).fill(false);
      })
    );
  });

  test("Placing a ship's origin at a coordinate updates the grid variable with Ship object in proper location", () => {
    gameBoard.placeShipOrigin(battleship, [0, 4]);
    expect(gameBoard.grid[0][4]).toEqual(battleship);
  });
  test("Placing a ship's origin out of bounds should return undefined and break out of the function", () => {
    expect(gameBoard.placeShipOrigin(Ship("Submarine"), [-1, 0])).toBe(
      undefined
    );
    expect(gameBoard.placeShipOrigin(battleship, [0, 10])).toBe(undefined);
  });
  test("Placing a ship's origin on top of another ship should return undefined and break out of the function", () => {
    gameBoard.placeShipOrigin(battleship, [5, 5]);
    expect(gameBoard.placeShipOrigin(Ship("Submarine"), [5, 5])).toBe(
      undefined
    );
  });
});

describe("Component: placeShipVertical and placeShipHorizontal", () => {
  const cruiser = Ship("Cruiser");
  const destroyer = Ship("Destroyer");
  test("placeShipVertical should have a defined origin variable from the placeShipOrigin method", () => {
    expect(gameBoard.placeShipVertical(cruiser, [4, 4])).not.toBe(undefined);
    expect(gameBoard.placeShipVertical(destroyer, [10, 7])).toBe(undefined);
  });
  test("placeShipVertical should place 'Cruiser' vertically four squares above its origin", () => {
    gameBoard.placeShipVertical(cruiser, [4, 4]);
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
