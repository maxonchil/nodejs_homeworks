const log4js = require("log4js");
const logger = log4js.getLogger();
const { USER_LOGS } = require("../../data/usersData.json");
const { User } = require("../Schemas/user.schema");

const updatePassword =  (userID, newPass) => {
  let user;
  try {
    user =  User.findByIdAndUpdate(userID, {
      password: newPass,
    });
  } catch (error) {
    return null;
  }
  logger.info(USER_LOGS.PASSWORD);
  return user;
};
module.exports = updatePassword;
