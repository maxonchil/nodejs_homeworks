const { Truck } = require("../../Schemas/truck.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");

const trucksPutHandler = (req, res) => {
  const { truckID, updatedName } = req.body;

  Truck.findOneAndUpdate(
    { _id: truckID, assigned_to: null, edit: true },
    { name: updatedName }
  )
    .then(result => {
      if (result === null) {
        return errorHandler("Assigned tucks can not be edited", res);
      } else {
        logger.info("Truck was updated!");
        res.json({
          success: true,
          data: { status: "Updated" },
          error: null
        });
      }
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = trucksPutHandler;
