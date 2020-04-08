const { User } = require("../Schemas/user.schema");

const checkForAccess = async (userID, role) => {
  let user;
  try {
    user = await User.findById(userID);
  } catch (error) {
    return null;
  }
  if (user.role !== role) {
    return null;
  }
  return user;
};
module.exports = checkForAccess;
