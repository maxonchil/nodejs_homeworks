const { Load } = require("../../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");

const loadsPutHandler = (req, res) => {
  const { dimensions, payload, id } = req.body;
  Load.findByIdAndUpdate(id, { status: "NEW", dimensions, payload })
    .then(() => {
      logger.info("Load info was updated!");
      res.json({
        success: true,
        data: { status: "Updated" },
        error: null
      });
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = loadsPutHandler;
