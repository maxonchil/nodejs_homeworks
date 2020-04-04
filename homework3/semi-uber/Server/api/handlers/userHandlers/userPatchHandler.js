const config = require("config");
const { User } = require("../../Schemas/user.schema");
const saltRounds = Number(config.get("saltRounds"));
const errorHandler = require("../error.handler");
const hashPassword = require("../../utilits/hashPassword");
const success = require("../../utilits/successResponse");
const { USER_LOGS } = require("../../../data/usersData.json");

async function userPatchHandler(req, res) {
  const { newPassword, userID } = req.body;
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

  res.json(success(USER_LOGS.PASSWORD));
}
module.exports = userPatchHandler;
