const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../../Schemas/user.schema");
const { Load } = require("../../Schemas/load.schema");
const errorHandler = require("../error.handler");

async function userDeleteHandler(req, res) {
  const { id: userID } = req.params;

  User.findByIdAndDelete(userID)
    .then(() => Load.remove({ created_by: userID }))
    .then(() => {
      logger.info(
        "User's account and all custom data was successfully deleted"
      );
      res.json({
        success: true,
        data: {},
        message: "User's account all custom data was successfully deleted"
      });
    })
    .catch(error => {
      return errorHandler(error.message, res);
    });
}
module.exports = userDeleteHandler;
