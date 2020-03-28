const config = require("config");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../../Schemas/user.schema");
const jwt = require("jsonwebtoken");
const { secret } = config.get("JWT");
const errorHandler = require("../error.handler");

const userGetHandler = (req, res) => {
  const pageID = req.params.id;
  const token = req.headers["token"];
  const userID = jwt.verify(token, secret);

  if (pageID !== userID) {
    return errorHandler("Access rejected", res);
  }

  User.findById(userID)
    .then(userData => {
      logger.info("User data successfully received");
      res.json({
        success: true,
        data: {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          status: userData.status
        },
        error: null
      });
    })
    .catch(error => {
      return errorHandler(error.message, res);
    });
};
module.exports = userGetHandler;
