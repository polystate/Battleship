const initializeDOM = () => {
  generateGrid();
};

const generateGrid = () => {
  const grids = document.querySelectorAll(".grid");
  grids.forEach((grid) => {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "grid-cell");
        cell.setAttribute("id", `${row},${col}`);
        grid.appendChild(cell);
      }
    }
  });
};

const displayShips = (shipArr) => {
  const cells = document.querySelectorAll(".grid-cell");

  cells.forEach((cell) => {
    const cellId = cell.id;
    const [row, col] = cellId.split(",");
    const isShipCell = shipArr.some((ship) => {
      return ship.coordinates.some(([shipRow, shipCol]) => {
        return shipRow === Number(row) && shipCol === Number(col);
      });
    });
    if (isShipCell) {
      cell.classList.add("ship");
    } else {
      cell.classList.remove("ship");
    }
  });
};

const handleUserInput = () => {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      const cellId = event.target.id;
    });
  });
};

const updateDOM = (playerBoard, computerBoard) => {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    const cellId = cell.id;
    const [row, col] = cellId.split(",");

    if (playerBoard[row][col].hasShip) {
      cell.classList.add("ship");
    } else {
      cell.classList.remove("ship");
    }

    if (computerBoard[row][col].hasShip) {
      cell.classList.add("enemy-ship");
    } else {
      cell.classList.remove("enemy-ship");
    }

    // more logic here to add more visual updates to game state
  });
};

export { updateDOM, initializeDOM, handleUserInput, displayShips };
