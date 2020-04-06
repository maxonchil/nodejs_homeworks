const errorHandler = require("../error.handler");
const { Truck, truckSchemaValidation } = require("../../Schemas/truck.schema");
const getTruckParams = require("../../utilits/trucksParams");
const checkForEdit = require("../../utilits/checkForEdit");
const success = require("../../utilits/successResponse");
const { TRUCK_LOGS } = require("../../../data/trucksData.json");

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
    return errorHandler(TRUCK_LOGS.ERROR_EDIT, res);
  }

  const newTruck = new Truck(validatedTruck);

  newTruck
    .save()
    .then(truck => {
      res.json(success(TRUCK_LOGS.CREATED, truck));
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = trucksPostHandler;
