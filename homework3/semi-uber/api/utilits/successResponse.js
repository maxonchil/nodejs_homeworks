const log4js = require("log4js");
const logger = log4js.getLogger();

const success = (logMessage, data = null, status = 200) => {
  logger.info(logMessage);
  return {
    success: true,
    status,
    data,
    error: null
  };
};
module.exports = success;
