import { convertToArrCoord, clickHandlerRef } from "./Setup";

const initializeGame = async (self, other) => {
  await finishSetUp();
  changeDOMElements();
  startGame(self, other);
};

const changeDOMElements = () => {
  document.getElementById("start-game").remove();
  const p1grid = document.getElementById("p1grid");
  p1grid.removeEventListener("click", clickHandlerRef);
  const logContainer = document.getElementById("log-container");
  const logContent = document.createElement("div");
  logContent.setAttribute("id", "log-content");
  logContainer.appendChild(logContent);
  const alignBtn = document.getElementById("align-swap");
  alignBtn.textContent = "Reset";
};

const startGame = (self, other) => {
  const p1grid = document.getElementById("p1grid");
  const p2grid = document.getElementById("p2grid");
  p2grid.style.zIndex = 0;
  p2grid.style.pointerEvents = "auto";
  p2grid.addEventListener("click", (e) => {
    const isGameOver = gameAnnouncer(self, other);
    if (isGameOver) return;
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
      const randAttack = other.randomAttack();
      const [rY, rX] = randAttack;
      other.attackEnemy(self, [rY, rX]);
      const p1Nodes = Array.from(p1grid.childNodes);
      p1Nodes.forEach((node) => {
        const [cX, cY] = convertToArrCoord(node.id);
        if (JSON.stringify([cX, cY]) === JSON.stringify([rX, rY])) {
          const randDelay = Math.random() * (1500 - 500) + 500;
          if (
            typeof self.grid[cX][cY] === "object" &&
            self.grid[cX][cY] !== null
          ) {
            setTimeout(() => {
              node.classList.remove("ship");
              node.classList.add("found-ship");
            }, randDelay);
          } else {
            setTimeout(() => {
              node.classList.add("missed-shot");
            }, randDelay);
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

const gameAnnouncer = (self, other) => {
  const logContent = document.getElementById("log-content");
  if (self.isGameOver()) {
    logContent.textContent = "Computer has won.";
    return true;
  } else if (other.isGameOver()) {
    logContent.textContent = "Player has won.";
    return true;
  } else {
    logContent.textContent = `Player Ships Hit: ${
      self.logBoardData().hits
    } | Computer Ships Hit: ${other.logBoardData().hits}`;
    return false;
  }
};

export { initializeGame };
