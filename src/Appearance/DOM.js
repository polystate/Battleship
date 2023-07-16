import Player from "../Functionality/Player";

const initializeDOM = () => {
  const player = Player();
  const computer = Player();
  generateGrid(player, "p1grid");
  generateGrid(computer, "p2grid");
  generateShips(player, "p1grid");
  generateShips(computer, "p2grid");
  clickShip(player, "p1grid");
};

const clickShip = (entity, id) => {
  const grid = document.getElementById(id);
  grid.addEventListener("click", (e) => {
    let cellClass = e.target.className.split(" ");
    if (cellClass[cellClass.length - 1] === "ship") {
      const shipID = e.target.id;
      const strCoord = shipID.substring(shipID.indexOf("-") + 1);
      const arrCoord = strCoord.split(",").map(Number);
      const entityShip = entity.grid[arrCoord[0]][arrCoord[1]];
      console.log(entityShip);
    }
  });
};

const generateShips = (entity, id) => {
  const nodeList = document.getElementById(id).querySelectorAll(".grid-cell");
  entity.placeFleetRandom();
  for (let i = 0; i < entity.grid.length; i++) {
    for (let j = 0; j < entity.grid[i].length; j++) {
      if (typeof entity.grid[i][j] === "object") {
        const element = nodeList[i * entity.grid[i].length + j];
        element.classList.add("ship");
      }
    }
  }
};

const generateGrid = (entity, id) => {
  const grid = document.getElementById(id);
  const squares = entity.grid;
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", `grid-cell grid-cell-${id[1]}`);
      cell.setAttribute("id", `${id}-${i},${j}`);
      grid.appendChild(cell);
    }
  }
};

export { initializeDOM };
