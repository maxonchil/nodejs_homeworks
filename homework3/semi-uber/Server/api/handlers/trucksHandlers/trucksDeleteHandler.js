const { Truck } = require("../../Schemas/truck.schema");
const errorHandler = require("../error.handler");
const success = require("../../utilits/successResponse");
const { TRUCK_LOGS } = require("../../../data/trucksData.json");
const { TRUCK_ID } = require("../../../data/headers.json");

const trucksDeleteHandler = (req, res) => {
  const truckID = req.headers[TRUCK_ID];

  Truck.findOneAndRemove({ _id: truckID, assigned_to: null, edit: true })
    .then((result) => {
      if (!result) {
        throw new Error(TRUCK_LOGS.ERROR_DELETE);
      }
      res.json(success(TRUCK_LOGS.DELETED));
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = trucksDeleteHandler;
