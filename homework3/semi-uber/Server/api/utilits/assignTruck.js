const { Truck } = require("../Schemas/truck.schema");
const { trucksStatuses } = require("../../data/trucksData.json");
const { ON_LOAD } = trucksStatuses;

const assignTruck = async _id => {
  try {
    return await Truck.findOneAndUpdate(
      { _id, edit: true },
      { status: ON_LOAD }
    );
  } catch (error) {
    return null;
  }
};
module.exports = assignTruck;
