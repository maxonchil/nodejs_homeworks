const { Load, loadSchemaValidation } = require("../../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const logMessage = require("../../utilits/logMessage");

const loadsPostHandler = (req, res) => {
  const { id, dimensions, payload } = req.body;
  const load = {
    created_by: id,
    logs: [logMessage("Created load")],
    assigned_to: "Not assigned",
    status: "NEW",
    state: "Created",
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
      logger.info("New load was added");
      res.json({
        success: true,
        data: newLoad,
        error: null
      });
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = loadsPostHandler;
