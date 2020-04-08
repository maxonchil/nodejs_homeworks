const { Truck } = require("../Schemas/truck.schema");
const { User } = require("../Schemas/user.schema");
const { Load } = require("../Schemas/load.schema");
const { LOAD_STATUS } = require("../../data/loadData.json");
const { USER_ROLE } = require("../../data/usersData.json");

const checkForEdit = async (userID) => {
  const user = await User.findById(userID);
  let result;
  user.role === USER_ROLE.DRIVER
    ? (result = await Truck.findOne({ created_by: userID, edit: false }))
    : (result = await Load.findOne({
        created_by: userID,
        status: LOAD_STATUS.ASSIGNED,
      }));

  if (result !== null) {
    return null;
  }
  return true;
};
module.exports = checkForEdit;
