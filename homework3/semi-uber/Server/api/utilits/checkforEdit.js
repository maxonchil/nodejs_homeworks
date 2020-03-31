const { Truck } = require("../Schemas/truck.schema");

const checkForEdit = async () => {
  try {
    const result = await Truck.findOne({ edit: false });
    if (result !== null) {
      return null;
    }
    return true;
  } catch (error) {
    return null;
  }
};
module.exports = checkForEdit;
