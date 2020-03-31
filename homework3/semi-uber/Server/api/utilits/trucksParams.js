const { trucksParams } = require("../../data/trucksData.json");

const getTruckParams = truckType => {
  const { width, height, length, payload } = trucksParams[truckType];
  const trackParams = {
    dimensions: {
      width,
      height,
      length
    },
    payload
  };

  return trackParams;
};

module.exports = getTruckParams;
