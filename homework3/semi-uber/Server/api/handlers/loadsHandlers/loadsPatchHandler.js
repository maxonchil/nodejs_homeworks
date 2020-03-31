const { Load } = require("../../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const logMessage = require("../../utilits/logMessage");
const findTruckForLoad = require("../../utilits/findTruckForLoad");
const { STATUS } = require("../../../data/loadData.json");

const loadsPatchHandler = async (req, res) => {
  const { loadID: _id, status } = req.body;
  let load;

  try {
    load = await Load.findOneAndUpdate(
      { _id, status: STATUS.NEW },
      {
        $push: { logs: logMessage(`Load ${STATUS.POSTED}`) },
        status
      },
      { new: true }
    );
    if (load === null) {
      throw new Error(`Load with status ${STATUS.NEW} could be only edited!`);
      //Chek at null, becouse if somebody gona try to edit Load with status not "NEW", findOneAndUpdate will return null
    }
    logger.info(`Load ${STATUS.POSTED}`);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  const serachResul = await findTruckForLoad(load, res);

  if (serachResul === null) {
    try {
      await Load.findOneAndUpdate(
        { _id, status: STATUS.POSTED },
        {
          $push: { logs: logMessage("Truck for this load was nod found") },
          status: STATUS.NEW
        }
      );
    } catch (error) {
      return errorHandler(error.message, res);
    }

    logger.info(`Load back to status ${STATUS.NEW}`);
    errorHandler("No such truck for this load", res);
  }
};

module.exports = loadsPatchHandler;
