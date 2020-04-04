const { Load, loadSchemaValidation } = require("../../Schemas/load.schema");
const errorHandler = require("../error.handler");
const logMessage = require("../../utilits/logMessage");
const success = require("../../utilits/successResponse");
const { LOAD_LOGS } = require("../../../data/loadData.json");

const loadsPostHandler = (req, res) => {
  const { userID, dimensions, payload } = req.body;
  const load = {
    created_by: userID,
    logs: [logMessage(LOAD_LOGS.CREATED)],
    dimensions,
    payload
  };
  const { value: validatedLoad, error } = loadSchemaValidation.validate(load);

  if (error) {
    return errorHandler(error.message, res);
  }

  const newLoad = new Load(validatedLoad);

  newLoad
    .save()
    .then(() => {
      res.json(success(LOAD_LOGS.ADDED, newLoad));
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = loadsPostHandler;
