const errorHandler = require("../error.handler");
const findTruckForLoad = require("../../utilits/findTruckForLoad");
const { LOAD_STATUS, LOAD_LOGS } = require("../../../data/loadData.json");
const changeLoadStatus = require("../../utilits/changeLoadStatus");
const success = require("../../utilits/successResponse");

const loadsPatchHandler = async (req, res) => {
  const { loadID } = req.body;

  const load = await changeLoadStatus(
    loadID,
    LOAD_STATUS.NEW,
    LOAD_STATUS.POSTED
  );

  if (load === null) {
    return errorHandler(LOAD_LOGS.ERROR_UPDATE, res);
  }

  const serachResult = await findTruckForLoad(load);

  if (serachResult === null) {
    await changeLoadStatus(loadID, LOAD_STATUS.POSTED, LOAD_STATUS.NEW);

    if (changeLoadStatus === null) {
      return errorHandler(LOAD_LOGS.ERROR_UPDATE, res);
    }
    return errorHandler(LOAD_LOGS.ERROR_MATCH, res);
  }
  res.json(success(LOAD_LOGS.ASSIGNED, serachResult));
};

module.exports = loadsPatchHandler;
