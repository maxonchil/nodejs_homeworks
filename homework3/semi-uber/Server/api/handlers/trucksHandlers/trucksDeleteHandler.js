const { Truck } = require("../../Schemas/truck.schema");
const errorHandler = require("../error.handler");
const success = require("../../utilits/successResponse");
const { TRUCK_LOGS } = require("../../../data/trucksData.json");

const trucksDeleteHandler = (req, res) => {
  const truckID = req.headers["truck"];

  Truck.findOneAndRemove({ _id: truckID, assigned_to: null, edit: true })
    .then(result => {
      if (result === null) {
        errorHandler(TRUCK_LOGS.ERROR_DELETE, res);
      } else {
        res.json(success(TRUCK_LOGS.DELETED));
      }
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = trucksDeleteHandler;
