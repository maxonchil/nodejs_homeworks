const log4js = require("log4js");
const logger = log4js.getLogger();
const compareTrucks = require("./compareTrucks");
const assignLoad = require("./assignLoad");
const assignTruck = require("./assignTruck");
const banTrucksEdit = require("./banTrucksEdit");
const { TRUCK_STATUS } = require("../../data/trucksData.json");
const {
  LOAD_STATUS,
  LOAD_STATE,
  LOAD_LOGS,
} = require("../../data/loadData.json");

const findTruckForLoad = async (load) => {
  const { dimensions, payload, _id: loadID } = load;

  const truck = await compareTrucks(dimensions, payload);

  if (!truck) {
    return null;
  }

  logger.info(LOAD_LOGS.TRUCK_FOUNDED);

  const { _id: truckID, assigned_to: driverID } = truck;
  const asignedLoad = await assignLoad(loadID, driverID);

  logger.info(`Load status is ${LOAD_STATUS.ASSIGNED}`);

  if (!asignedLoad) {
    return null;
  }

  const assignedTruck = await assignTruck(truckID);
  if (!assignedTruck) {
    return null;
  }

  const banedTrucks = await banTrucksEdit(driverID);
  logger.info(`Truck status is ${TRUCK_STATUS.ON_LOAD}`);
  if (!banedTrucks) {
    return null;
  }

  const loadUpdatedData = {
    status: LOAD_STATUS.ASSIGNED,
    state: LOAD_STATE.EN_ROUTE_TO_PA,
    assigned_to: driverID,
  };
  return loadUpdatedData;
};

module.exports = findTruckForLoad;
