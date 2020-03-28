const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../../Schemas/user.schema");
const errorHandler = require("../error.handler");

async function userDeleteHandler(req, res) {
  const { id: userID } = req.params;

  User.findByIdAndDelete(userID)
    .then(() => {
      logger.info("User's account was successfully deleted");
      res.json({
        success: true,
        data: {},
        message: "User's account was successfully deleted"
      });
    })
    .catch(error => {
      return errorHandler(error.message, res);
    });
}
module.exports = userDeleteHandler;
