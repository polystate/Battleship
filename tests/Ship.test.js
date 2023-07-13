import { Ship, shipChoices } from "../src/Ship.js";

describe("Component: Ship Creation", () => {
  test("Ship constructor accepts valid ship name choices and doesn't throw an error", () => {
    const validShipNames = Object.keys(shipChoices);
    validShipNames.forEach((name) => {
      expect(() => Ship(name)).not.toThrow();
    });
  });
  test("Ship constructor throws error for invalid ship names", () => {
    const invalidShipNames = ["Cruiserr", 772, "", ["Cruiser"]];
    invalidShipNames.forEach((name) => {
      expect(() => Ship(name)).toThrowError("Invalid ship name");
    });
  });
  test("Ship initialization with name 'Carrier' should return its proper object properties that are methods", () => {
    expect(Ship("Carrier")).toStrictEqual({
      getHit: expect.any(Function),
      isSunk: expect.any(Function),
      logInfo: expect.any(Function),
    });
  });
});

describe("Component: logInfo", () => {
  test("logInfo should log name of ship 'Cruiser' and its health of 3, length, its undefined locations array, and its surrounding . It returns an object.", () => {
    const cruiser = Ship("Cruiser");
    expect(cruiser.logInfo()).toMatchObject({
      name: "Cruiser",
      length: 3,
      locations: [],
      getSurroundings: expect.any(Function),
    });
  });
  test("Inside of logInfo for 'Destroyer', getSurroundings should correctly compute and return an array of its 10 unique surrounding squares", () => {
    const destroyer = Ship("Destroyer");
    destroyer.logInfo().locations.push([3, 3], [4, 3]);
    expect(destroyer.logInfo().getSurroundings()).toEqual([
      [2, 3],
      [3, 2],
      [3, 4],
      [2, 2],
      [4, 4],
      [4, 2],
      [2, 4],
      [5, 3],
      [5, 4],
      [5, 2],
    ]);
  });
});

describe("Component: getHit()", () => {
  test("getHit() should return a console error if ship is already sunk.", () => {
    const submarine = Ship("Submarine");
    const consoleErrorSpy = jest.spyOn(console, "error");
    submarine.getHit();
    submarine.getHit();
    submarine.getHit();
    submarine.getHit();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Ship Submarine has already been sunk.`
    );
  });
  test("getHit() should return a log of the correct amount of times hit.", () => {
    const battleship = Ship("Battleship");
    const consoleLogSpy = jest.spyOn(console, "log");
    battleship.getHit();
    battleship.getHit();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Ship Battleship has been hit 2 times.`
    );
  });
});

describe("Component: isSunk()", () => {
  test("if ship isSunk() works properly", () => {
    const destroyer = Ship("Destroyer");
    const destroyer2 = Ship("Destroyer");
    destroyer.getHit();
    destroyer.getHit();
    destroyer2.getHit();
    expect(destroyer.isSunk()).toBe(true);
    expect(destroyer2.isSunk()).toBe(false);
  });
});
