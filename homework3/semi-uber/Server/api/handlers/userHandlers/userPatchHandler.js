const config = require("config");
const { User } = require("../../Schemas/user.schema");
const saltRounds = Number(config.get("saltRounds"));
const errorHandler = require("../error.handler");
const hashPassword = require("../../utilits/hashPassword");
const success = require("../../utilits/successResponse");
const { USER_LOGS } = require("../../../data/usersData.json");
const comparePasswords = require("../../utilits/comparePasswords");

async function userPatchHandler(req, res) {
  const { newPassword, userID, curentPassword } = req.body;
  let user;

  const hashedPass = await hashPassword(newPassword, saltRounds);
  if (!hashedPass) {
    return errorHandler(USER_LOGS.ERROR_HASHING, res);
  }

  try {
    user = await User.findById(userID);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  const comparedPass = await comparePasswords(curentPassword, user.password);

  if (!comparedPass) {
    return errorHandler(USER_LOGS.ERROR_PASSWORD, res);
  }

  try {
    await User.findByIdAndUpdate(userID, {
      password: hashedPass,
    });
  } catch (error) {
    return errorHandler(error.message, res);
  }

  res.json(success(USER_LOGS.PASSWORD));
}
module.exports = userPatchHandler;
