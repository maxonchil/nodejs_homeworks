const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const { Truck } = require("../../Schemas/truck.schema");

const trucksPatchHandler = async (req, res) => {
  const { userID, truckID } = req.body;

  try {
    await Truck.findOneAndUpdate(
      { assigned_to: userID, edit: true },
      { assigned_to: null }
    );
  } catch (error) {
    return errorHandler(error.message, res);
  }

  logger.info("Unassigned previous truck");

  try {
    await Truck.findOneAndUpdate(
      { _id: truckID, edit: true },
      {
        assigned_to: userID
      }
    );
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
