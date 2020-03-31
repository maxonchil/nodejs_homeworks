const { Load } = require("../Schemas/load.schema");
const { Truck } = require("../Schemas/truck.schema");

async function getCustomData(stats, userID) {
  if (stats === "Shipper") {
    try {
      const loads = await Load.find({ created_by: userID });
      return { loads };
    } catch (error) {
      return error;
    }
  } else {
    try {
      const trucks = await Truck.find({ created_by: userID });
      return { trucks };
    } catch (error) {
      return error;
    }
  }
}

module.exports = getCustomData;
