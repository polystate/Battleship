let shipClickedFlag = false;
let currentAlign = "vertical";
let clickHandlerRef;

const Setup = (entity, id) => {
  if (id === "p1grid") {
    switchAlign();
  }
  displayGrid(entity, id);
  clickGrid(entity, id);
};

const clickGrid = (entity, id) => {
  const grid = document.getElementById(id);
  const gridCells = Array.from(grid.childNodes);
  clickHandlerRef = (e) => clickHandler(entity, gridCells, e);
  grid.addEventListener("click", clickHandlerRef);
};

const clickHandler = (entity, gridCells, e) => {
  const cellClicked = e.target;
  if (!cellClicked.classList.contains("cell")) return;
  clickShip(entity, gridCells, cellClicked);
};

const placeShipGrid = (entity, gridCells, cellClicked) => {
  const highlightedCells = gridCells.filter((cell) =>
    cell.classList.contains("highlight")
  );

  if (highlightedCells.length && !cellClicked.classList.contains("ship")) {
    const [originX, originY] = convertToArrCoord(highlightedCells[0].id);
    const selectedShip = entity.grid[originX][originY];
    const shipInfo = selectedShip.logInfo();
    shipInfo.align = currentAlign;
    let prevLocations = shipInfo.locations.slice(0, shipInfo.length);
    const [targetX, targetY] = convertToArrCoord(cellClicked.id);
    prevLocations.forEach(([x, y]) => {
      entity.grid[x][y] = false;
    });
    removeHighlights(gridCells, false);
    if (!entity.isTailValid(selectedShip, [targetY, targetX], shipInfo.align)) {
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

    entity.placeShip(selectedShip, [targetY, targetX], shipInfo.align);
    shipInfo.locations = shipInfo.locations.slice(shipInfo.length);

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

const switchAlign = () => {
  const alignBtn = document.getElementById("align-swap");
  alignBtn.addEventListener("click", () => {
    if (currentAlign === "vertical") {
      currentAlign = "horizontal";
      alignBtn.textContent = `Set ${currentAlign}`;
    } else {
      currentAlign = "vertical";
      alignBtn.textContent = `Set ${currentAlign}`;
    }
  });
};

const convertToArrCoord = (str) => {
  return str.split(",").map((num) => Number(num));
};

export { Setup, displayGrid, convertToArrCoord, clickHandlerRef };
