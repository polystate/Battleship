const Ship = (length, name) => {
  if (!length) return;
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
