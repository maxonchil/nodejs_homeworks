const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");
const { Truck } = require("../../Schemas/truck.schema");
const errorHandler = require("../error.handler");
const { TRUCK_LOGS } = require("../.././../data/trucksData.json");
const checkForAccess = require("../../utilits/checkForAccess");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");

const getTrucksHandler = async (req, res) => {
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);
  let trucks;

  const access = await checkForAccess(userID, USER_ROLE.DRIVER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }

  try {
    trucks = Truck.find({ created_by: userID, assigned_to: { $ne: null } });
  } catch (error) {
    return errorHandler(error.message, res);
  }
  res.json({ status: TRUCK_LOGS.CREATED, trucks });
};
module.exports = getTrucksHandler;
