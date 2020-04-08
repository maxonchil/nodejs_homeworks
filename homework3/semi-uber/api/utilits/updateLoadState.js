const { Load } = require("../Schemas/load.schema");
const log4js = require("log4js");
const logger = log4js.getLogger();
const logMessage = require("./logMessage");

const changeLoadState = async (_id, from, updatedState) => {
  try {
    const result = await Load.findOneAndUpdate(
      { _id, state: from },
      {
        $push: { logs: logMessage(`Load status is ${updatedState}`) },
        state: updatedState,
      },
      { new: true }
    );
    logger.info(`Load state is ${updatedState}`);
    return result;
  } catch (error) {
    return null;
  }
};
module.exports = changeLoadState;
