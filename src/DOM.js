const initializeDOM = () => {
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

const updateDOM = (playerBoard, computerBoard) => {
  const cells = document.querySelectorAll(".grid-cell");

  cells.forEach((cell) => {
    const cellId = cell.id;
    const [row, col] = cellId.split(",");

    // Update the visual representation for the player's gameboard
    if (playerBoard[row][col].hasShip) {
      cell.classList.add("ship");
    } else {
      cell.classList.remove("ship");
    }

    // Update the visual representation for the computer's gameboard
    if (computerBoard[row][col].hasShip) {
      cell.classList.add("enemy-ship");
    } else {
      cell.classList.remove("enemy-ship");
    }

    // You can add more logic here to handle other visual updates based on the game state
  });
};

const handleUserInput = () => {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      const cellId = event.target.id;
      console.log(cellId);
    });
  });
};

const displayShips = (shipArr) => {
  const cells = document.querySelectorAll(".grid-cell");

  cells.forEach((cell) => {
    const cellId = cell.id;
    const [row, col] = cellId.split(",");

    // Check if the current cell's coordinates match the coordinates of any ship
    const matchingShip = shipArr.find((ship) => {
      return ship.coordinates.some(([shipRow, shipCol]) => {
        return shipRow === Number(row) && shipCol === Number(col);
      });
    });

    if (matchingShip) {
      cell.classList.add("ship");
    } else {
      cell.classList.remove("ship");
    }
  });
};

export { updateDOM, initializeDOM, handleUserInput, displayShips };
