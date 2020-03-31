const { Truck } = require("../Schemas/truck.schema");

const banTrucksEdit = async () => {
  try {
    return await Truck.updateMany({ edit: true }, { edit: false });
  } catch (error) {
    return null;
  }
};

module.exports = banTrucksEdit;
