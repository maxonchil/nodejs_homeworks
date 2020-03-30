const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const { Truck } = require("../../Schemas/truck.schema");

const trucksPatchHandler = async (req, res) => {
  const { userID, truckID } = req.body;

  try {
    const clearAssign = await Truck.updateMany(
      { created_by: userID },
      { $set: { assigned_to: null } }
    );
  } catch (error) {
    return errorHandler(error.message, res);
  }
  logger.info("All trucks is not assigned");
  try {
    const assignedTruck = await Truck.findByIdAndUpdate(truckID, {
      assigned_to: userID
    });
  } catch (error) {
    return errorHandler(error.message, res);
  }
  logger.info("Truck was succesfully assigned");
  res.json({
    success: true,
    data: userID,
    error: null
  });
};

module.exports = trucksPatchHandler;
