const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const { Truck } = require("../../Schemas/truck.schema");
const { TRUCK_LOGS } = require("../../../data/trucksData.json");
const checkForEdit = require("../../utilits/checkforEdit");
const success = require("../../utilits/successResponse");

const trucksPatchHandler = async (req, res) => {
  const { userID, truckID } = req.body;
  let unassignedTruck;
  let assignedTruck;

  const editChek = await checkForEdit(userID);

  if (editChek === null) {
    return errorHandler(TRUCK_LOGS.ERROR_EDIT, res);
  }
  try {
    unassignedTruck = await Truck.findOneAndUpdate(
      { assigned_to: userID },
      { assigned_to: null }
    );
  } catch (error) {
    return errorHandler(error.message, res);
  }
  if (unassignedTruck !== null) {
    logger.info(TRUCK_LOGS.UNASSIGNED);
  }

  try {
    assignedTruck = await Truck.findByIdAndUpdate(truckID, {
      assigned_to: userID
    });
  } catch (error) {
    return errorHandler(error.message, res);
  }
  if (assignedTruck === null) {
    return errorHandler(TRUCK_LOGS.ERROR_EDIT, res);
  }

  res.json(success(TRUCK_LOGS.ASSIGNED, userID));
};

module.exports = trucksPatchHandler;
