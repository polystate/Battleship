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
    locations: [],
    getSurroundings() {
      let surroundings = [];
      for (let [x, y] of this.locations) {
        surroundings.push([x - 1, y]);
        surroundings.push([x + 1, y]);
        surroundings.push([x, y - 1]);
        surroundings.push([x, y + 1]);
        surroundings.push([x - 1, y - 1]);
        surroundings.push([x + 1, y + 1]);
        surroundings.push([x + 1, y - 1]);
        surroundings.push([x - 1, y + 1]);
      }
      surroundings = surroundings.filter((item1) => {
        return !this.locations.some((item2) => {
          return item1.every((value, index) => value === item2[index]);
        });
      });
      surroundings = new Set(surroundings.map(JSON.stringify));
      surroundings = Array.from(surroundings, JSON.parse);
      console.log(surroundings);
      console.log(surroundings.length);
      return surroundings;
    },
  };
  const getHit = () => {
    if (timesHit === length) {
      console.error(`Ship ${name} has already been sunk.`);
    } else {
      timesHit++;
      console.log(`Ship ${name} has been hit ${timesHit} times.`);
    }
  };
  const logInfo = () => shipInfo;
  const isSunk = () => {
    return timesHit === length;
  };
  return { getHit, isSunk, logInfo };
};

export { Ship, shipChoices };
