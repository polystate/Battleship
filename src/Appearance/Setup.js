let shipClickedFlag = false;
let currentAlign;

const clickGrid = (entity, id) => {
  const grid = document.getElementById(id);
  const gridCells = Array.from(grid.childNodes);
  grid.addEventListener("click", function clickHandler(e) {
    const cellClicked = e.target;
    if (!cellClicked.classList.contains("cell")) return;
    clickShip(entity, gridCells, cellClicked);
  });
};

const placeShipGrid = (entity, gridCells, cellClicked) => {
  const highlightedCells = gridCells.filter((cell) =>
    cell.classList.contains("highlight")
  );

  if (highlightedCells.length && !cellClicked.classList.contains("ship")) {
    const [originX, originY] = convertToArrCoord(highlightedCells[0].id);
    const selectedShip = entity.grid[originX][originY];
    const shipInfo = selectedShip.logInfo();
    currentAlign = shipInfo.align;
    let prevLocations = shipInfo.locations.slice(0, shipInfo.length);
    const [targetX, targetY] = convertToArrCoord(cellClicked.id);

    prevLocations.forEach(([x, y]) => {
      entity.grid[x][y] = false;
    });
    removeHighlights(gridCells, false);
    if (!entity.isTailValid(selectedShip, [targetY, targetX], currentAlign)) {
      prevLocations.forEach(([x, y]) => {
        entity.grid[x][y] = selectedShip;
        gridCells.forEach((cell) => {
          const coordArr = convertToArrCoord(cell.id);
          if (JSON.stringify(coordArr) === JSON.stringify([x, y])) {
            cell.classList.add("ship");
          }
        });
      });
      return;
    }

    //if entity can place ship legally, it places it there
    //or if the surrounding squares are not touching a ship and are legal, you can place it there
    entity.placeShip(selectedShip, [targetY, targetX], currentAlign);
    shipInfo.locations = shipInfo.locations.slice(shipInfo.length);

    //add it onto the grid
    gridCells.forEach((cell) => {
      let arrCoord = convertToArrCoord(cell.id);
      if (
        shipInfo.locations.some(
          (location) =>
            location[0] === arrCoord[0] && location[1] === arrCoord[1]
        )
      ) {
        cell.classList.add("ship");
      }
    });
  }
};

const clickShip = (entity, gridCells, cellClicked) => {
  if (cellClicked.className.includes("ship") && !shipClickedFlag) {
    highlightShip(entity, gridCells, cellClicked);
    shipClickedFlag = true;
  } else {
    placeShipGrid(entity, gridCells, cellClicked);
    removeHighlights(gridCells, true);
    shipClickedFlag = false;
  }
};

const highlightShip = (entity, gridCells, cellClicked) => {
  const [x, y] = convertToArrCoord(cellClicked.id);
  const locations = entity.grid[x][y].logInfo().locations;
  locations.forEach((location) => {
    gridCells.forEach((cell) => {
      const cellLocation = convertToArrCoord(cell.id);
      if (JSON.stringify(cellLocation) === JSON.stringify(location)) {
        cell.classList.remove("ship");
        cell.classList.add("highlight");
      }
    });
  });
};

const removeHighlights = (gridCells, isShipAdded) => {
  gridCells.forEach((cell) => {
    if (cell.classList.contains("highlight")) {
      cell.classList.remove("highlight");
      if (isShipAdded) cell.classList.add("ship");
    }
  });
};

const displayGrid = (entity, id) => {
  const grid = document.getElementById(id);
  for (let i = 0; i < entity.grid.length; i++) {
    for (let j = 0; j < entity.grid[i].length; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", `${i},${j}`);
      if (typeof entity.grid[i][j] === "object") {
        cell.className = `cell cell-${id[1]} ship`;
      } else {
        cell.className = `cell cell-${id[1]}`;
      }
      grid.appendChild(cell);
    }
  }
};

const convertToArrCoord = (str) => {
  return str.split(",").map((num) => Number(num));
};

export { displayGrid, clickGrid, placeShipGrid };
