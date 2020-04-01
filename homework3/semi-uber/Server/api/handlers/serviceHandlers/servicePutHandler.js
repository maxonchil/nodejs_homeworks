const errorHandler = require("../error.handler");
const findTruckForLoad = require("../../utilits/findTruckForLoad");
const { STATUS } = require("../../../data/loadData.json");
const changeLoadStatus = require("../../utilits/changeLoadStatus");

const loadsPatchHandler = async (req, res) => {
  const { loadID } = req.body;

  const load = await changeLoadStatus(loadID, STATUS.NEW, STATUS.POSTED);

  if (load === null) {
    return errorHandler(
      `Only loads woth status ${STATUS.NEW} could be updated`,
      res
    );
  }

  const serachResult = await findTruckForLoad(load);

  if (serachResult === null) {
    await changeLoadStatus(loadID, STATUS.POSTED, STATUS.NEW);

    if (changeLoadStatus === null) {
      return errorHandler("Error when try to update back load status", res);
    }
    return errorHandler("No such truck for this load", res);
  }
  res.json({
    success: true,
    data: serachResult,
    error: null
  });
};

module.exports = loadsPatchHandler;
