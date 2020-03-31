const { Load } = require("../Schemas/load.schema");
const { Truck } = require("../Schemas/truck.schema");
const { trucksStatuses } = require("../../data/trucksData.json");
const { IN_SERVISE, ON_LOAD } = trucksStatuses;
const logMessage = require("./logMessage");
const { STATUS, STATE } = require("../../data/loadData.json");
const errorHandler = require("../handlers/error.handler");

const updateLoad = async (loadID, driverID) => {
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
    return error;
  }
};

const updateTruck = async id => {
  return await Truck.findByIdAndUpdate(id, { status: ON_LOAD });
};

const findTruckForLoad = async (load, res) => {
  const { dimensions, payload: loadPayload, _id: loadID } = load;
  const {
    width: loadWidth,
    height: loadHeight,
    length: loadLength
  } = dimensions;
  let truck;

  try {
    truck = await Truck.findOne({
      status: IN_SERVISE,
      assigned_to: { $ne: null },
      "dimensions.width": { $gte: loadWidth },
      "dimensions.height": { $gte: loadHeight },
      "dimensions.length": { $gte: loadLength },
      payload: { $gte: loadPayload }
    });
  } catch (error) {
    return errorHandler(error.message, res);
  }

  if (truck === null) {
    console.error("Im in error");
    return null;
  }

  const { _id: truckID, assigned_to: driverID } = truck;
  
  try {
    await updateLoad(loadID, driverID);
  } catch (error) {
    return errorHandler(error.message, res);
  }
  try {
    await updateTruck(truckID);
  } catch (error) {
    return errorHandler(error.message, res);
  }
};

module.exports = findTruckForLoad;
