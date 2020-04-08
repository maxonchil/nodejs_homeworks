const log4js = require("log4js");
const logger = log4js.getLogger();
const { USER_LOGS } = require("../../data/usersData.json");
const { User } = require("../Schemas/user.schema");

const updatePassword = async (userID, newPass) => {
  let user;
  try {
    user = await User.findOneAndUpdate(
      { _id: userID, email: { $exists: true } },
      {
        password: newPass,
      }
    );
    if (!user) {
      return null;
    }
  } catch (error) {
    return null;
  }
  logger.info(USER_LOGS.PASSWORD);
  return user;
};
module.exports = updatePassword;
