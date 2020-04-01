const { Load } = require("../../Schemas/load.schema");
const { Truck } = require("../../Schemas/truck.schema");
const { STATUS, STATE } = require("../../../data/loadData.json");
const { trucksStatuses } = require("../../../data/trucksData.json");
const { IN_SERVISE, ON_LOAD } = trucksStatuses;
const errorHandler = require("../error.handler");
const log4js = require("log4js");
const logger = log4js.getLogger();
const logMessage = require("../../utilits/logMessage");

const servicePatchHandler = async (req, res) => {
  const { driverID, loadID } = req.body;
  let updatedLoad;
  let updatedTruck;

  try {
    updatedLoad = await Load.findByIdAndUpdate(loadID, {
      state: STATE.ARRIVED_TO_D,
      status: STATUS.SHIPPED,
      $push: { logs: logMessage(`Load on status ${STATUS.SHIPPED}`) }
    });
  } catch (error) {
    return errorHandler(error.message);
  }

  if (updatedLoad === null) {
    return errorHandler("Loas was allready shipped", res);
  }
  logger.info(`Loads in status ${STATUS.SHIPPED}`);

  try {
    updatedTruck = await Truck.findOneAndUpdate(
      {
        created_by: driverID,
        status: ON_LOAD
      },
      { status: IN_SERVISE }
    );
  } catch (error) {
    return errorHandler(error.message);
  }

  if (updatedTruck === null) {
    return errorHandler("Loas was allready shipped", res);
  }
  logger.info(`Truck in status ${IN_SERVISE}`);

  try {
    await Truck.updateMany(
      { created_by: driverID, edit: false },
      { edit: true }
    );
    logger.info("Edit trucks info is posible now");
  } catch (error) {
    return errorHandler(error.message);
  }

  res.json({
    success: true,
    data: { status: IN_SERVISE },
    error: null
  });
};

module.exports = servicePatchHandler;
