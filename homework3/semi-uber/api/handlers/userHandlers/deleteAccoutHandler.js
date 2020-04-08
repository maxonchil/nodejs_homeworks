const { User } = require("../../Schemas/user.schema");
const { Load } = require("../../Schemas/load.schema");
const { Truck } = require("../../Schemas/truck.schema");
const errorHandler = require("../error.handler");
const checkForEdit = require("../../utilits/checkForEdit");
const { USER_ROLE, USER_LOGS } = require("../../../data/usersData.json");
const success = require("../../utilits/successResponse");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../../data/headers.json");
const config = require("config");
const { secret } = config.get("JWT");

async function deleteAccoutHandler(req, res) {
  const userID = jwt.verify(req.headers[JWT_TOKEN], secret);

  const editCheck = await checkForEdit(userID);

  if (!editCheck) {
    return errorHandler(USER_LOGS.ERROR_DELETE, res);
  }

  const user = await User.findByIdAndDelete(userID);

  if (user.role === USER_ROLE.SHIPPER) {
    try {
      await Load.remove({ created_by: userID });
    } catch (error) {
      return errorHandler(USER_LOGS.ERROR_DELETE);
    }
  } else {
    try {
      Truck.remove({ created_by: userID });
    } catch (error) {
      return errorHandler(USER_LOGS.ERROR_DELETE);
    }
  }
  res.json(success(USER_LOGS.DELETED, { message: USER_LOGS.DELETED }));
}
module.exports = deleteAccoutHandler;
