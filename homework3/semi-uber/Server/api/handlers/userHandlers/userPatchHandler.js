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
  let hashedPass;

  try {
    hashedPass = await hashPassword(newPassword, saltRounds);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  try {
    await User.findByIdAndUpdate(userID, {
      password: hashedPass
    });
  } catch (error) {
    return errorHandler(error.message, res);
  }

  logger.info("Password was updated!");

  res.json({
    success: true,
    data: {},
    message: "Password was updated!"
  });
}
module.exports = userPatchHandler;
