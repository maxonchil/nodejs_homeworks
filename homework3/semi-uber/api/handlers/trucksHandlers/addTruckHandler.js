const errorHandler = require("../error.handler");
const { Truck, truckSchemaValidation } = require("../../Schemas/truck.schema");
const getTruckParams = require("../../utilits/trucksParams");
const checkForEdit = require("../../utilits/checkForEdit");
const { TRUCK_LOGS } = require("../../../data/trucksData.json");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");
const checkForAccess = require("../../utilits/checkForAccess");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");

const addTruckHandler = async (req, res) => {
  const { type: truckType } = req.body;
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);

  if (!truckType) {
    return errorHandler(TRUCK_LOGS.ERROR_ADD, res);
  }

  const access = await checkForAccess(userID, USER_ROLE.DRIVER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }
  const editChek = await checkForEdit(userID);
  if (!editChek) {
    return errorHandler(TRUCK_LOGS.ERROR_EDIT, res);
  }

  const { dimensions, payload } = getTruckParams(truckType);

  const truck = {
    created_by: userID,
    type: truckType,
    dimensions,
    payload,
  };

  const { value: validatedTruck, error } = truckSchemaValidation.validate(
    truck
  );

  if (error) {
    return errorHandler(error.message, res);
  }

  if (!editChek) {
    return errorHandler(TRUCK_LOGS.ERROR_EDIT, res);
  }

  const newTruck = new Truck(validatedTruck);

  newTruck
    .save()
    .then(() => res.json({ stats: TRUCK_LOGS.CREATED }))
    .catch((error) => errorHandler(error.message, res));
};

module.exports = addTruckHandler;
