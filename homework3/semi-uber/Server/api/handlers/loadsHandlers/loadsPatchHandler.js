const { Load } = require("../../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../error.handler");
const logMessage = require("../../utilits/logMessage");
const findTruckForLoad = require("../../utilits/findTruckForLoad");

const loadsPatchHandler = async (req, res) => {
  const { loadID: _id, status } = req.body;
  let load;

  try {
    load = await Load.findOneAndUpdate(
      { _id, status: "NEW" },
      {
        $push: { logs: logMessage("Load posted") },
        status
      },
      { new: true }
    );
    if (load === null) {
      throw new Error("POSTED load can not be edited");
      //Chek at null, becouse if somebody gona try to edit Load with status not "NEW", findOneAndUpdate will return null
    }
  } catch (error) {
    return errorHandler(error.message, res);
  }
  const serachResul = await findTruckForLoad(load, res);
};

module.exports = loadsPatchHandler;
