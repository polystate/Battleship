import Ship from "../src/Ship.js";

describe("Component: Ship Creation", () => {
  test("if ship object is created with 0 length its undefined and obj doesn't get created", () => {
    expect(Ship(0)).toBe(undefined);
  });
});

describe("Component: logInfo should log the proper health and ship name", () => {
  const ship = Ship(3, "Striker");
  test("logInfo should log name of ship 'Striker' and its health of 3. returns object.", () => {
    expect(ship.logInfo()).toStrictEqual({
      health: 3,
      name: "Striker",
    });
  });
  test("logInfo should log name of ship 'Striker' and its health should be 2 after getting hit. returns object.", () => {
    ship.getHit();
    expect(ship.logInfo()).toStrictEqual({
      health: 2,
      name: "Striker",
    });
  });
});

describe("Component: getHit()", () => {
  test("getHit() should return a console error if ship is already sunk.", () => {
    const ship = Ship(1, "Striker");
    const consoleErrorSpy = jest.spyOn(console, "error");
    ship.getHit();
    ship.getHit();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Ship Striker has already been sunk.`
    );
  });
  test("getHit() should return a log of the correct amount of times hit.", () => {
    const ship = Ship(3, "Striker");
    const consoleLogSpy = jest.spyOn(console, "log");
    ship.getHit();
    ship.getHit();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Ship Striker has been hit 2 times.`
    );
  });
});

describe("Component: isSunk()", () => {
  test("if ship isSunk() works properly", () => {
    const ship = Ship(2, "Striker");
    const ship2 = Ship(2, "Striker");
    ship.getHit();
    ship.getHit();
    ship2.getHit();
    expect(ship.isSunk()).toBe(true);
    expect(ship2.isSunk()).toBe(false);
  });
});
