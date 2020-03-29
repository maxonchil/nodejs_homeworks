const config = require("config");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { User } = require("../../Schemas/user.schema");
const bcrypt = require("bcrypt");
const saltRounds = Number(config.get("saltRounds"));
const errorHandler = require("../error.handler");

const hashPassword = (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

async function userPatchHandler(req, res) {
  const { newPassword, id: userID } = req.body;
  const hashedPass = await hashPassword(newPassword, saltRounds);
  if (!hashPassword) {
    return errorHandler("Password chanching was failt!", res);
  }
  const updatedUser = await User.findByIdAndUpdate(userID, {
    password: hashedPass
  });
  if (!updatedUser) {
    return errorHandler("Password chanching was failt!", res);
  }

  logger.info("Password was updated!");

  res.json({
    success: true,
    data: {},
    message: "Password was updated!"
  });
}
module.exports = userPatchHandler;
