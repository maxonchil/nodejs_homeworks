const { Truck } = require("../Schemas/truck.schema");
const { trucksStatuses } = require("../../data/trucksData.json");
const { IN_SERVISE } = trucksStatuses;

const compareTrucks = async (dimensions, payload) => {
  const {
    width: loadWidth,
    height: loadHeight,
    length: loadLength
  } = dimensions;
  const loadPayload = payload;

  try {
    return await Truck.findOne({
      status: IN_SERVISE,
      assigned_to: { $ne: null },
      "dimensions.width": { $gte: loadWidth },
      "dimensions.height": { $gte: loadHeight },
      "dimensions.length": { $gte: loadLength },
      payload: { $gte: loadPayload }
    });
  } catch (error) {
    return null;
  }
};
module.exports = compareTrucks;
