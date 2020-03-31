const log4js = require("log4js");
const logger = log4js.getLogger();
const compareTrucks = require("./compareTrucks");
const assignLoad = require("./assignLoad");
const assignTruck = require("./assignTruck");
const banTrucksEdit = require("./banTrucksEdit");

const findTruckForLoad = async (load, res) => {
  const { dimensions, payload, _id: loadID } = load;

  const truck = await compareTrucks(dimensions, payload);

  if (truck === null) {
    return null;
  }
  logger.info("Truck for this load was found!");

  const { _id: truckID, assigned_to: driverID } = truck;
  const asignedLoad = await assignLoad(loadID, driverID);
  logger.info("Load status was updated to 'ASSIGNED'");

  if (asignedLoad === null) {
    return null;
  }

  const assignedTruck = await assignTruck(truckID);
  const banedTrucks = await banTrucksEdit();
  logger.info("Truck status was updated to OL");

  if (assignedTruck === null || banedTrucks === null) {
    return null;
  }
};

module.exports = findTruckForLoad;
