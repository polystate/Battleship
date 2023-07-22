const shipChoices = {
  Carrier: 5,
  Battleship: 4,
  Cruiser: 3,
  Submarine: 3,
  Destroyer: 2,
};

const Ship = (name) => {
  if (!(name in shipChoices) || typeof name !== "string") {
    throw new Error(`Invalid ship name: ${name}`);
  }
  let timesHit = 0;
  const length = shipChoices[name];
  const shipInfo = {
    name: name,
    length: length,
    align: undefined,
    thisPartHit: false,
    locations: [],
    getSurroundings() {
      const surroundings = new Set();
      for (const [x, y] of this.locations) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
            const newX = x + i;
            const newY = y + j;
            if (
              !this.locations.some(
                ([shipX, shipY]) => shipX === newX && shipY === newY
              )
            ) {
              const key = `${newX},${newY}`;
              surroundings.add(key);
            }
          }
        }
      }
      return Array.from(surroundings, (key) => key.split(",").map(Number));
    },

    clearLocations() {
      this.locations = [];
    },
  };
  const getHit = () => {
    if (timesHit === length) {
      console.error(`Ship ${name} has already been sunk.`);
    } else {
      timesHit++;
      logInfo().thisPartHit = true;
    }
  };
  const logInfo = () => shipInfo;
  const isSunk = () => {
    return timesHit === length;
  };
  return { getHit, isSunk, logInfo };
};

export { Ship, shipChoices };
