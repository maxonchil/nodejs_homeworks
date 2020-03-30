const { Load } = require("../../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");

const loadsPatchHandler = (req, res) => {
  const { loadID: id, status } = req.body;
  
  Load.findByIdAndUpdate(id, { status })
    .then(user => {
      logger.info("Load status was updated!");
      res.json({
        success: true,
        data: { status: "POSTED" },
        error: null
      });
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = loadsPatchHandler;
