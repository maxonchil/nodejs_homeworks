const { Truck } = require("../Schemas/truck.schema");
const { User } = require("../Schemas/user.schema");
const { Load } = require("../Schemas/load.schema");
const { STATUS } = require("../../data/loadData.json");

const checkForEdit = async userID => {
  const user = await User.findById(userID);

  if (user.status === "Driver") {
    try {
      const result = await Truck.findOne({ created_by: userID, edit: false });
      if (result !== null) {
        return null;
      }
      return true;
    } catch (error) {
      return null;
    }
  } else {
    try {
      const result = await Load.findOne({
        created_by: userID,
        status: STATUS.ASSIGNED
      });
      if (result !== null) {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
};
module.exports = checkForEdit;
