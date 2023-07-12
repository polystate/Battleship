import Player from "../src/Player.js";
import { Ship } from "../src/Ship.js";

describe("Component: Initialize Players", () => {
  test("The Player factory should inherit all methods from the Gameboard factory", () => {
    const player = Player();
    expect(player.grid).toStrictEqual(
      Array.from({ length: 10 }, () => Array(10).fill(false))
    );
  });
  test("Starting turns for both players", () => {
    const player = Player();
    const computer = Player();
    expect(player.isTurn()).toBe(true);
    expect(computer.isTurn()).toBe(false);
  });
  test("Players should be able to use their gameBoard to place a ship on it", () => {
    const player = Player();
    const computer = Player();
    const carrier = Ship("Carrier");
    const battleship = Ship("Battleship");
    player.placeShipHorizontal(carrier, [3, 4]);
    computer.placeShipHorizontal(battleship, [3, 4]);
  });
});

describe("Component: Gameplay", () => {
  test("Player should be able to attack the other player and the other player should receive the attack", () => {
    const player = Player();
    const computer = Player();
    const receiveAttackMock = jest.fn();
    computer.receiveAttack = receiveAttackMock;
    player.attackEnemy(computer, [5, 5]);
    expect(receiveAttackMock).toHaveBeenCalledWith([5, 5]);
  });
  test("Players' turn should update when someone commits an action", () => {
    const player = Player();
    const computer = Player();
    player.attackEnemy(computer, [2, 2]);
    expect(computer.isTurn()).toBe(true);
  });
});
