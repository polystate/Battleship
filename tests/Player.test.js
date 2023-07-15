import Player from "../src/Player.js";
import { Ship } from "../src/Ship.js";

//Helper Test Functions
const generateTestArr = (x, y) => {
  let testArr = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      testArr.push([i, j]);
    }
  }
  testArr.splice(
    testArr.findIndex((coord) => coord[0] === x && coord[1] === y),
    1
  );
  return testArr;
};

//Tests
describe("Component: Initialize Players", () => {
  test("The Player factory should inherit all methods from the Gameboard factory", () => {
    const player = Player();
    expect(player.grid).toStrictEqual(
      Array.from({ length: 10 }, () => Array(10).fill(false))
    );
  });
  test("First Player() to be initialized should go first,and isTurn() should return true, second player should be false", () => {
    const player = Player(true);
    const computer = Player(false);
    expect(player.isTurn()).toBe(true);
    expect(computer.isTurn()).toBe(false);
  });
  test("Players should be able to use their gameBoard to place a ship on it", () => {
    const player = Player(true);
    const computer = Player(false);
    const carrier = Ship("Carrier");
    const battleship = Ship("Battleship");
    player.placeShipHorizontal(carrier, [3, 4]);
    computer.placeShipHorizontal(battleship, [3, 4]);
  });
});

describe("Component: Gameplay", () => {
  test("Player should be able to attack the other player and the other player should receive the attack", () => {
    const player = Player(true);
    const computer = Player(false);
    const receiveAttackMock = jest.fn();
    computer.receiveAttack = receiveAttackMock;
    player.attackEnemy(computer, [5, 5]);
    expect(receiveAttackMock).toHaveBeenCalledWith([5, 5]);
  });
  test("Players' turn should update when someone commits an action", () => {
    const player = Player(true);
    const computer = Player(false);
    player.attackEnemy(computer, [2, 2]);
    expect(computer.isTurn()).toBe(true);
  });
});

describe("Component: Computer Gameplay", () => {
  test("The Player factory should keep track of all of its attempted shots", () => {
    const computer = Player(true);
    const player = Player(false);
    computer.attackEnemy(player, [5, 9]);
    player.attackEnemy(computer, [5, 9]);
    computer.attackEnemy(player, [6, 9]);
    expect(computer.getAttempts()).toEqual([
      [5, 9],
      [6, 9],
    ]);
  });
  test("The Player factory should filter out its attempted shots", () => {
    const computer = Player(true);
    const player = Player(false);
    computer.attackEnemy(player, [7, 5]);
    player.attackEnemy(computer, [3, 2]);
    const testArr = generateTestArr(7, 5);
    expect(computer.filterMoves()).toEqual(expect.arrayContaining(testArr));
  });
  test("The Player factory should be able to make a random attack based off its filtered coordinates", () => {
    const computer = Player(true);
    const player = Player(false);
    computer.attackEnemy(player, [2, 4]);
    player.attackEnemy(computer, [7, 7]);
    computer.attackEnemy(player, [5, 1]);
    player.attackEnemy(computer, [9, 7]);
    const validMoves = computer.filterMoves(player);
    const randomAttack = computer.randomAttack();
    expect(validMoves).toContainEqual(randomAttack);
  });
});

describe("[***generateRandomShips***]", () => {
  test("Select a random coordinate from 0 to 9", () => {
    const player = Player();
    const randomCoordinate = player.selectRandCoord();
    expect(randomCoordinate).toBeDefined();
    expect(randomCoordinate[0]).toBeGreaterThanOrEqual(0);
    expect(randomCoordinate[0]).toBeLessThan(10);
    expect(randomCoordinate[1]).toBeGreaterThanOrEqual(0);
    expect(randomCoordinate[1]).toBeLessThan(10);
  });
  test("placeAllHorizontal/placeAllVertical should place an entire ship on the grid", () => {
    const player = Player();
    const computer = Player();
    const destroyer = Ship("Destroyer");
    const submarine = Ship("Submarine");
    player.grid[0][0] = destroyer;
    player.grid[1][0] = destroyer;
    player.grid[4][4] = submarine;
    player.grid[4][5] = submarine;
    player.grid[4][6] = submarine;
    computer.placeAllHorizontal(destroyer, [0, 0]);
    computer.placeAllVertical(submarine, [4, 4]);
    expect(computer.grid).toMatchObject(player.grid);
  });
  test("placeShipRandom should select a random coordinate and place an entire ship (*all of its parts*) on the grid", () => {
    const player = Player();
    const carrier = Ship("Carrier");
    player.placeShipRandom(carrier);
    for (const [x, y] of carrier.logInfo().locations) {
      expect(player.grid[x][y]).toBe(carrier);
    }
  });
});
