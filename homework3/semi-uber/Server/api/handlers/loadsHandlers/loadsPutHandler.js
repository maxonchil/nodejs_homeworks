const { Load } = require("../../Schemas/load.schema");
const errorHandler = require("../error.handler");
const logMessage = require("../../utilits/logMessage");
const { LOAD_STATUS, LOAD_LOGS } = require("../../../data/loadData.json");
const success = require("../../utilits/successResponse");

const loadsPutHandler = (req, res) => {
  const { dimensions, payload, id } = req.body;

  Load.findOneAndUpdate(
    { _id: id, status: LOAD_STATUS.NEW },
    {
      dimensions,
      payload,
      $push: { logs: logMessage(LOAD_LOGS.UPDATED) }
    }
  )
    .then(result => {
      if (result === null) {
        return errorHandler(LOAD_LOGS.ERROR_EDIT, res);
      } else {
        res.json(success(LOAD_LOGS.UPDATED, { status: LOAD_STATUS.UPDATED }));
      }
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = loadsPutHandler;
