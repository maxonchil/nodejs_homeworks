const { LOAD_STATUS, LOAD_STATE } = require("../../data/loadData.json");
const changeLoadStatus = require("../utilits/changeLoadStatus");
const updateLoadState = require("../utilits/updateLoadState");
const log4js = require("log4js");
const logger = log4js.getLogger();

const updateDeliveredLoad = async (loadID) => {
  const updStatus = await changeLoadStatus(
    loadID,
    LOAD_STATUS.ASSIGNED,
    LOAD_STATUS.SHIPPED
  );
  if (!updStatus) {
    return null;
  }

  const updState = await updateLoadState(
    loadID,
    LOAD_STATE.EN_ROUTE_TO_PA,
    LOAD_STATE.ARRIVED_TO_D
  );
  if (!updState) {
    return null;
  }

  logger.info(`Loads in status ${LOAD_STATUS.SHIPPED}`);
  return true;
};
module.exports = updateDeliveredLoad;
