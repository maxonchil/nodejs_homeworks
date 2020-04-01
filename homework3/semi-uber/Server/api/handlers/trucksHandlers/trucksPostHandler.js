const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const { Truck, truckSchemaValidation } = require("../../Schemas/truck.schema");
const getTruckParams = require("../../utilits/trucksParams");
const checkForEdit = require("../../utilits/checkforEdit");

const trucksPostHandler = async (req, res) => {
  const { truckData, userID } = req.body;
  const { truckType, truckName } = truckData;
  const { dimensions, payload } = getTruckParams(truckType);
  const truck = {
    created_by: userID,
    type: truckType,
    dimensions,
    payload,
    name: truckName
  };

  const { value: validatedTruck, error } = truckSchemaValidation.validate(
    truck
  );

  if (error) {
    return errorHandler(error.message, res);
  }

  const editChek = await checkForEdit(userID);

  if (editChek === null) {
    return errorHandler(
      "Can not add a truck, when one of them in status 'OL",
      res
    );
  }

  const newTruck = new Truck(validatedTruck);

  newTruck
    .save()
    .then(truck => {
      logger.info("New truck was successfully created");
      res.json({
        success: true,
        data: truck,
        error: null
      });
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = trucksPostHandler;
