import Ship from "../src/Ship.js";

test("get ship's name", () => {
  expect(Ship("Bobby")).toBe("Bobby");
});
