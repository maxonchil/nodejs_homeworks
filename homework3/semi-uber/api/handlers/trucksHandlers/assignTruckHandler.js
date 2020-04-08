const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const { Truck } = require("../../Schemas/truck.schema");
const { TRUCK_LOGS } = require("../../../data/trucksData.json");
const checkForEdit = require("../../utilits/checkForEdit");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");
const checkForAccess = require("../../utilits/checkForAccess");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");

const assignTruckHandler = async (req, res) => {
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);
  const truckID = req.params.id;
  let unassignedTruck;
  let assignedTruck;

  const access = await checkForAccess(userID, USER_ROLE.DRIVER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }
  const editChek = await checkForEdit(userID);

  if (!editChek) {
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
      assigned_to: userID,
    });
  } catch (error) {
    return errorHandler(error.message, res);
  }
  if (!assignedTruck) {
    return errorHandler(TRUCK_LOGS.ERROR_EDIT, res);
  }

  res.json({ status: TRUCK_LOGS.ASSIGNED });
};

module.exports = assignTruckHandler;
