const { Truck } = require("../Schemas/truck.schema");

const banTrucksEdit = async driverID => {
  try {
    return await Truck.updateMany(
      { created_by: driverID, edit: true },
      { edit: false }
    );
  } catch (error) {
    return null;
  }
};

module.exports = banTrucksEdit;
