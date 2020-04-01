const { Truck } = require("../Schemas/truck.schema");

const checkForEdit = async userID => {
  try {
    const result = await Truck.findOne({ created_by: userID, edit: false });
    if (result !== null) {
      return null;
    }
    return true;
  } catch (error) {
    return null;
  }
};
module.exports = checkForEdit;
