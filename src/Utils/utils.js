const setFavicon = (url) => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const existingFavicon = document.getElementById("favicon");
  if (existingFavicon) {
    head.removeChild(existingFavicon);
  }
  const newFavicon = document.createElement("link");
  newFavicon.id = "favicon";
  newFavicon.rel = "icon";
  newFavicon.href = url;
  head.appendChild(newFavicon);
};

const generateAllCoords = () => {
  let testArr = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      testArr.push([i, j]);
    }
  }
  return testArr;
};

//Helper Test Functions

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

export {
  setFavicon,
  generateAllCoords,
  generateTestArr,
  destroyEntireShip,
  placeEntireShip,
};
