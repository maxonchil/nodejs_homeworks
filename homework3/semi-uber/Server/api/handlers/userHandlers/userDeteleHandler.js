const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../../Schemas/user.schema");
const { Load } = require("../../Schemas/load.schema");
const { Truck } = require("../../Schemas/truck.schema");
const errorHandler = require("../error.handler");
const checkForEdit = require("../../utilits/checkforEdit");

async function userDeleteHandler(req, res) {
  const { id: userID } = req.params;

  const editCheck = await checkForEdit(userID);
  if (editCheck === null) {
    return errorHandler("Can not delete account!", res);
  }
  const user = await User.findByIdAndDelete(userID);

  if (user.status === "Shipper") {
    try {
      await Load.remove({ created_by: userID });
    } catch (error) {
      return errorHandler("Can not delete user data");
    }
  } else {
    try {
      Truck.remove({ created_by: userID });
    } catch (error) {
      return errorHandler("Can not delete user data");
    }
  }
  logger.info("User data was deleted!");
  res.json({
    success: true,
    data: {
      message: "User's account all custom data was successfully deleted"
    },
    error: null
  });
}
module.exports = userDeleteHandler;
