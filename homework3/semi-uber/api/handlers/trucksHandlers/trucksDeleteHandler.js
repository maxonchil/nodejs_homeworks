const { Truck } = require("../../Schemas/truck.schema");
const errorHandler = require("../error.handler");
const success = require("../../utilits/successResponse");
const { TRUCK_LOGS } = require("../../../data/trucksData.json");
const checkForAccess = require("../../utilits/checkForAccess");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");

const trucksDeleteHandler = async (req, res) => {
  const truckID = req.params.id;
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);

  const access = await checkForAccess(userID, USER_ROLE.DRIVER);
  if (!access) {
    return errorHandler(USER_LOGS.ERROR_ACCESS, res);
  }

  Truck.findOneAndRemove({ _id: truckID, assigned_to: null, edit: true })
    .then((result) => {
      if (!result) {
        throw new Error(TRUCK_LOGS.ERROR_DELETE);
      }
      res.json(success(TRUCK_LOGS.DELETED));
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = trucksDeleteHandler;
