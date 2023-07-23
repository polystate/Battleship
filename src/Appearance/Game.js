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
    if (self.isGameOver()) {
      console.log("Computer has won.");
    } else if (other.isGameOver()) {
      console.log("Player has won.");
    } else {
      console.clear();
      console.log(
        `Amount of Player Ship Parts Hit: ${self.logBoardData().hits}`
      );
      console.log(
        `Amount of Computer Ship Parts Hit: ${other.logBoardData().hits}`
      );
      //player
      const cellClicked = e.target;
      if (!cellClicked.classList.contains("cell")) return;
      const [pX, pY] = convertToArrCoord(cellClicked.id);
      const uniqueShot = self
        .filterMoves()
        .some(([xF, yF]) => xF === pX && yF === pY);
      if (uniqueShot) {
        if (self.attackEnemy(other, [pX, pY])) {
          cellClicked.classList.add("found-ship");
        } else {
          cellClicked.classList.add("missed-shot");
        }
        //computer
        // const [rX, rY] = other.randomAttack();
        let randAttack = other.randomAttack();
        let [rY, rX] = randAttack;
        other.attackEnemy(self, [rY, rX]);
        const p1Nodes = Array.from(p1grid.childNodes);
        p1Nodes.forEach((node) => {
          const [cX, cY] = convertToArrCoord(node.id);
          if (JSON.stringify([cX, cY]) === JSON.stringify([rX, rY])) {
            if (
              typeof self.grid[cX][cY] === "object" &&
              self.grid[cX][cY] !== null
            ) {
              setTimeout(() => {
                node.classList.remove("ship");
                node.classList.add("found-ship");
              }, 500);
            } else {
              setTimeout(() => {
                node.classList.add("missed-shot");
              }, 500);
            }
          }
        });
      }
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
