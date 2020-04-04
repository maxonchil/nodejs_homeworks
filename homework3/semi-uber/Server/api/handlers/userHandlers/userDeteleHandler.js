const { User } = require("../../Schemas/user.schema");
const { Load } = require("../../Schemas/load.schema");
const { Truck } = require("../../Schemas/truck.schema");
const errorHandler = require("../error.handler");
const checkForEdit = require("../../utilits/checkforEdit");
const { USER_STATUS, USER_LOGS } = require("../../../data/usersData.json");
const success = require("../../utilits/successResponse");

async function userDeleteHandler(req, res) {
  const { id: userID } = req.params;

  const editCheck = await checkForEdit(userID);

  if (editCheck === null) {
    return errorHandler(USER_LOGS.ERROR_DELETE, res);
  }
  
  const user = await User.findByIdAndDelete(userID);

  if (user.status === USER_STATUS.SHIPPER) {
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
module.exports = userDeleteHandler;
