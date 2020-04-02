const { Load } = require("../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const logMessage = require("./logMessage");

const changeLoadStatus = async (_id, from, updatedStatus) => {
  try {
    const result = await Load.findOneAndUpdate(
      { _id, status: from },
      {
        $push: { logs: logMessage(`Load status is ${updatedStatus}`) },
        status: updatedStatus
      },
      { new: true }
    );
    logger.info(`Load status is ${updatedStatus}`);
    return result;
  } catch (error) {
    return null;
  }
};
module.exports = changeLoadStatus;
