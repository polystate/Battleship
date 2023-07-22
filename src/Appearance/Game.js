import Player from "../Functionality/Player";

let setUpComplete = false;

const startGame = () => {
  if (setUpComplete) {
    console.log("start game");
    const p2grid = document.getElementById("p2grid");
    p2grid.style.zIndex = 0;
    p2grid.style.pointerEvents = "auto";
    p2grid.addEventListener("click", (e) => {
      console.log("clicked");
    });
  }
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
      setUpComplete = true;
      resolve();
    });
    //   p2grid.style.pointerEvents = "none";
  });
};

export { finishSetUp, startGame };
