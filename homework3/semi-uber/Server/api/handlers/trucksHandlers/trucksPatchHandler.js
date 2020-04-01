const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const { Truck } = require("../../Schemas/truck.schema");
const { trucksStatuses } = require("../../../data/trucksData.json");
const { ON_LOAD } = trucksStatuses;
const checkForEdit = require("../../utilits/checkforEdit");

const trucksPatchHandler = async (req, res) => {
  const { userID, truckID } = req.body;
  let unassignedTruck;
  let assignedTruck;

  const editChek = await checkForEdit(userID);

  if (editChek === null) {
    return errorHandler("Can not edit truck. Edit error!", res);
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
    logger.info("Unassigned previous truck");
  }

  try {
    assignedTruck = await Truck.findByIdAndUpdate(truckID, {
      assigned_to: userID
    });
  } catch (error) {
    return errorHandler(error.message, res);
  }
  if (assignedTruck === null) {
    return errorHandler(
      `Trucks info can not be edited, when one of them is in status ${ON_LOAD}`,
      res
    );
  }
  logger.info("Truck was succesfully assigned");

  res.json({
    success: true,
    data: userID,
    error: null
  });
};

module.exports = trucksPatchHandler;
