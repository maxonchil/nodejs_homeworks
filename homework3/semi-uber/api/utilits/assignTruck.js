const { Truck } = require("../Schemas/truck.schema");
const { TRUCK_STATUS } = require("../../data/trucksData.json");

const assignTruck = async _id => {
  try {
    return await Truck.findOneAndUpdate(
      { _id, edit: true },
      { status: TRUCK_STATUS.ON_LOAD }
    );
  } catch (error) {
    return null;
  }
};
module.exports = assignTruck;
