const log4js = require("log4js");
const logger = log4js.getLogger();

const success = (logMessage, data = null) => {
  logger.info(logMessage);
  return {
    success: true,
    data,
    error: null
  };
};
module.exports = success;
