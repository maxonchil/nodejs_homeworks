const { Load } = require("../Schemas/load.schema");
const { Truck } = require("../Schemas/truck.schema");
const { USER_STATUS } = require("../../data/usersData.json");

async function getCustomData(status, userID) {
  if (status === USER_STATUS.SHIPPER) {
    try {
      const loads = await Load.find({ created_by: userID });
      return { loads };
    } catch (error) {
      return error;
    }
  } else {
    try {
      const trucks = await Truck.find({ created_by: userID });
      const assigned_loads = await Load.find({ assigned_to: userID });
      return { trucks, assigned_loads };
    } catch (error) {
      return error;
    }
  }
}

module.exports = getCustomData;
