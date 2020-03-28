const log4js = require("log4js");
const logger = log4js.getLogger();

const errorHandler = (errorMessage, res) => {
  logger.error(errorMessage);
  return res.json({
    success: false,
    data: {},
    error: { code: 400, message: errorMessage }
  });
};
module.exports = errorHandler;
