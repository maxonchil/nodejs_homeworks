const { Truck } = require("../../Schemas/truck.schema");
const errorHandler = require("../error.handler");
const success = require("../../utilits/successResponse");
const { TRUCK_LOGS } = require("../../../data/trucksData.json");

const trucksPutHandler = (req, res) => {
  const { truckID, updatedName } = req.body;

  Truck.findOneAndUpdate(
    { _id: truckID, assigned_to: null, edit: true },
    { name: updatedName }
  )
    .then((result) => {
      if (!result) {
        throw new Error(TRUCK_LOGS.ERROR_EDIT);
      }
      res.json(success(TRUCK_LOGS.UPDATED, { message: TRUCK_LOGS.UPDATED }));
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = trucksPutHandler;
