const shipChoices = {
  Carrier: 5,
  Battleship: 4,
  Cruiser: 3,
  Submarine: 3,
  Destroyer: 2,
};

const Ship = (name) => {
  if (!(name in shipChoices)) {
    throw new Error(`Invalid ship name: ${name}`);
  }
  const length = shipChoices[name];
  let timesHit = 0;
  const logInfo = () => {
    return {
      health: length - timesHit,
      name: name,
    };
  };
  const getHit = () => {
    if (timesHit === length) {
      console.error(`Ship ${name} has already been sunk.`);
    } else {
      timesHit++;
      console.log(`Ship ${name} has been hit ${timesHit} times.`);
    }
  };
  const isSunk = () => {
    return timesHit === length;
  };
  return { getHit, isSunk, logInfo };
};

export default Ship;
