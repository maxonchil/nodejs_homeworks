const { Load } = require("../../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");

const loadsDeleteHandler = (req, res) => {
  const loadID = req.headers["load"];
  Load.findByIdAndRemove(loadID)
    .then(() => logger.info("Load was successfully deleted"))
    .then(() =>
      res.json({
        success: true,
        data: null,
        error: null
      })
    )
    .catch(error => errorHandler(error.message, res));
};

module.exports = loadsDeleteHandler;
