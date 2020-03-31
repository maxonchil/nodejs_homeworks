const { Truck } = require("../../Schemas/truck.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");

const trucksDeleteHandler = (req, res) => {
  const truckID = req.headers["truck"];
  Truck.findOneAndRemove({ _id: truckID, assigned_to: null })
    .then(() => logger.info("Truck was successfully deleted"))
    .then(() =>
      res.json({
        success: true,
        data: null,
        error: null
      })
    )
    .catch(error => errorHandler(error.message, res));
};

module.exports = trucksDeleteHandler;
