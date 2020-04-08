const { User } = require("../Schemas/user.schema");
const { Load } = require("../Schemas/load.schema");
const { USER_ROLE } = require("../../data/usersData.json");

const getLoads = async (userID) => {
  const user = await User.findById(userID);
  let loads;
  if (user.role === USER_ROLE.SHIPPER) {
    try {
      loads = await Load.find({ created_by: userID });
    } catch (error) {
      return error;
    }
  } else {
    try {
      loads = await Load.find({ assigned_to: userID });
    } catch (error) {
      return error;
    }
  }
  return loads;
};
module.exports = getLoads;
