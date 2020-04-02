const { Load } = require("../../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const { STATUS } = require("../../../data/loadData.json");

const loadsDeleteHandler = (req, res) => {
  const loadID = req.headers["load"];
  Load.findOneAndRemove({
    _id: loadID,
    status: { $in: [STATUS.NEW, STATUS.SHIPPED] }
  })
    .then(result => {
      if (result === null) {
        throw new Error(
          `Only loads with status ${STATUS.NEW} and ${STATUS.SHIPPED} could be deleted`
        );
      }
      logger.info("Load was successfully deleted");
      res.json({
        success: true,
        data: null,
        error: null
      });
    })
    .catch(error => errorHandler(error.message, res));
};

module.exports = loadsDeleteHandler;
