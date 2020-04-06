const { User } = require("../../Schemas/user.schema");
const errorHandler = require("../error.handler");
const hashPassword = require("../../utilits/hashPassword");
const success = require("../../utilits/successResponse");
const { USER_LOGS } = require("../../../data/usersData.json");
const comparePasswords = require("../../utilits/comparePasswords");
const updatePassword = require("../../utilits/updatePassword");

async function userPatchHandler(req, res) {
  const { newPassword, userID, curentPassword } = req.body;
  let user;

  const hashedPass = await hashPassword(newPassword);
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

  const updatedPass = await updatePassword(userID, hashedPass);
  if (!updatedPass) {
    return errorHandler(USER_LOGS.ERROR_PASS_UPD, res);
  }

  res.json(success(USER_LOGS.RECEIVED));
}
module.exports = userPatchHandler;
