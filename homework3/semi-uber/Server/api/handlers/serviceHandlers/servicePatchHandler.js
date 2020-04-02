const { Load } = require("../../Schemas/load.schema");
const { Truck } = require("../../Schemas/truck.schema");
const { LOAD_STATUS, LOAD_STATE } = require("../../../data/loadData.json");
const { TRUCK_STATUS, TRUCK_LOGS } = require("../../../data/trucksData.json");
const errorHandler = require("../error.handler");
const log4js = require("log4js");
const logger = log4js.getLogger();
const logMessage = require("../../utilits/logMessage");
const success = require("../../utilits/successResponse");

const servicePatchHandler = async (req, res) => {
  const { driverID, loadID } = req.body;
  let updatedLoad;
  let updatedTruck;

  try {
    updatedLoad = await Load.findByIdAndUpdate(loadID, {
      state: LOAD_STATE.ARRIVED_TO_D,
      status: LOAD_STATUS.SHIPPED,
      assigned_to: null,
      $push: { logs: logMessage(`Load in status ${LOAD_STATUS.SHIPPED}`) }
    });
  } catch (error) {
    return errorHandler(error.message);
  }

  if (updatedLoad === null) {
    return errorHandler(LOAD_LOGS.ERROR_SHIPPED, res);
  }
  logger.info(`Loads in status ${LOAD_STATUS.SHIPPED}`);

  try {
    updatedTruck = await Truck.findOneAndUpdate(
      {
        created_by: driverID,
        status: TRUCK_STATUS.ON_LOAD
      },
      { status: TRUCK_STATUS.IN_SERVICE }
    );
  } catch (error) {
    return errorHandler(error.message);
  }

  if (updatedTruck === null) {
    return errorHandler(LOAD_LOGS.ERROR_SHIPPED, res);
  }
  logger.info(`Truck in status ${TRUCK_STATUS.IN_SERVICE}`);

  try {
    await Truck.updateMany(
      { created_by: driverID, edit: false },
      { edit: true }
    );
  } catch (error) {
    return errorHandler(error.message);
  }

  res.json(success(TRUCK_LOGS.ERROR_EDIT, { status: TRUCK_STATUS.IN_SERVICE }));
};

module.exports = servicePatchHandler;