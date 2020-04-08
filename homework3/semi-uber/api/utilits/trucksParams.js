const { TRUCK_PARAMS } = require("../../data/trucksData.json");

const getTruckParams = truckType => {
  const { width, height, length, payload } = TRUCK_PARAMS[truckType];
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
