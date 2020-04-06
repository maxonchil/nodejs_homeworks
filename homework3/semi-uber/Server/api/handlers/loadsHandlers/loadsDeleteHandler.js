const { Load } = require("../../Schemas/load.schema");
const errorHandler = require("../error.handler");
const { LOAD_STATUS, LOAD_LOGS } = require("../../../data/loadData.json");
const success = require("../../utilits/successResponse");
const { LOAD_ID } = require("../../../data/headers.json");

const loadsDeleteHandler = (req, res) => {
  const loadID = req.headers[LOAD_ID];
  Load.findOneAndRemove({
    _id: loadID,
    status: { $in: [LOAD_STATUS.NEW, LOAD_STATUS.SHIPPED] },
  })
    .then((result) => {
      if (result === null) {
        throw new Error(LOAD_LOGS.ERROR_DELETE);
      }
      res.json(success(LOAD_LOGS.DELETED));
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = loadsDeleteHandler;
