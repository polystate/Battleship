import Player from "../Functionality/Player";
import { convertToArrCoord } from "./Setup";

const initializeGame = async (self, other) => {
  await finishSetUp();
  startGame(self, other);
};

const startGame = (self, other) => {
  const p1grid = document.getElementById("p1grid");
  const p2grid = document.getElementById("p2grid");
  p2grid.style.zIndex = 0;
  p2grid.style.pointerEvents = "auto";
  p2grid.addEventListener("click", (e) => {
    const cellClicked = e.target;
    if (!cellClicked.classList.contains("cell")) return;
    const [x, y] = convertToArrCoord(cellClicked.id);
    const uniqueShot = self
      .filterMoves()
      .some(([xF, yF]) => xF === x && yF === y);
    if (uniqueShot) {
      if (self.attackEnemy(other, [x, y])) {
        cellClicked.classList.add("ship");
      } else {
        cellClicked.classList.add("missed-shot");
      }
      const randAttack = other.randomAttack();
      other.attackEnemy(self, randAttack);
      const p1Nodes = Array.from(p1grid.childNodes);
      p1Nodes.forEach((node) => {
        const [x, y] = convertToArrCoord(node.id);
        if (JSON.stringify([x, y]) === JSON.stringify(randAttack)) {
          if (typeof self.grid[x][y] === "object" && self.grid[x][y] !== null) {
            console.log("Computer found a ship");
            setTimeout(() => {
              node.classList.remove("ship");
              node.classList.add("found-ship");
            }, 500);
          } else {
            console.log("Computer missed");
            setTimeout(() => {
              node.classList.add("missed-shot");
            }, 500);
          }
        }
      });
    }
  });
};

const finishSetUp = () => {
  return new Promise((resolve) => {
    const startBtn = document.getElementById("start-game");
    startBtn.addEventListener("click", () => {
      const p1grid = document.getElementById("p1grid");
      const p2grid = document.getElementById("p2grid");
      p1grid.style.pointerEvents = "none";

      const p2cells = p2grid.querySelectorAll(".cell");
      p2cells.forEach((cell) => {
        cell.style.cursor = "pointer";
        cell.classList.remove("ship");
      });
      p2grid.classList.add("overlay");
      resolve();
    });
  });
};

const gameLog = () => {
  const shipTargeted = other.grid[y][x];
  if (shipTargeted) {
    if (shipTargeted.isSunk()) {
      console.log(`Ship ${shipTargeted.logInfo().name} has been sunk!`);
    } else {
      console.log(`Ship ${shipTargeted.logInfo().name} was attacked!`);
    }
  }
};

export { initializeGame };
