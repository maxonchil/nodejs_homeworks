const { Load } = require("../Schemas/load.schema");
const logMessage = require("./logMessage");
const {
  LOAD_STATUS,
  LOAD_STATE,
  LOAD_LOGS
} = require("../../data/loadData.json");

const assignLoad = async (loadID, driverID) => {
  try {
    return await Load.findByIdAndUpdate(
      { _id: loadID },
      {
        $push: { logs: logMessage(LOAD_LOGS.TRUCK_FOUNDED) },
        assigned_to: driverID,
        status: LOAD_STATUS.ASSIGNED,
        state: LOAD_STATE.EN_ROUTE_TO_PA
      },
      { new: true }
    );
  } catch (error) {
    return null;
  }
};
module.exports = assignLoad;
