const { Load } = require("../Schemas/load.schema");
const logMessage = require("./logMessage");
const { STATUS, STATE } = require("../../data/loadData.json");

const assignLoad = async (loadID, driverID) => {
  try {
    return await Load.findByIdAndUpdate(
      { _id: loadID },
      {
        $push: { logs: logMessage("Truck for load was found!") },
        assigned_to: driverID,
        status: STATUS.ASSIGNED,
        state: STATE.EN_ROUTE_TO_PA
      },
      { new: true }
    );
  } catch (error) {
    return null;
  }
};
module.exports = assignLoad;
