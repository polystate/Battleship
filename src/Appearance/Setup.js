import Player from "../Functionality/Player";

const initializeDOM = () => {
  const player = Player(true);
  const computer = Player(false);
  generateGrid(player, "p1grid");
  generateGrid(computer, "p2grid");
  generateShips(player, "p1grid");
  generateShips(computer, "p2grid");
  clickShip(player, "p1grid", [selectEntireShip, moveEntireShip]);
};

const moveEntireShip = (grid, entityShip) => {
  console.log(grid);
  console.log(entityShip);
};

const selectEntireShip = (grid, entityShip) => {
  const locations = entityShip.logInfo().locations;
  const nodes = Array.from(grid.querySelectorAll(".grid-cell"));
  for (let node of nodes) {
    const arrCoord = convertIDStrToArr(node.id);
    if (node.classList.contains("highlight")) {
      node.classList.remove("highlight");
      node.classList.add("ship");
    }
    locations.forEach((location) => {
      if (JSON.stringify(location) === JSON.stringify(arrCoord)) {
        node.classList.remove("ship");
        node.classList.add("highlight");
      }
    });
  }
};

const clickShip = (entity, id, callbackArr) => {
  const grid = document.getElementById(id);
  grid.addEventListener("click", (e) => {
    const cellClass = e.target.className.split(" ");
    if (cellClass.includes("ship")) {
      const arrCoord = convertIDStrToArr(e.target.id);
      const entityShip = entity.grid[arrCoord[0]][arrCoord[1]];
      callbackArr.forEach((callback) => {
        callback(grid, entityShip);
      });
    }
  });
};

const convertIDStrToArr = (idStr) => {
  const strCoord = idStr.substring(idStr.indexOf("-") + 1);
  const arrCoord = strCoord.split(",").map(Number);
  return arrCoord;
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
