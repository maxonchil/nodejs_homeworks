const log4js = require("log4js");
const logger = log4js.getLogger();

const errorHandler = (errorMessage, res, status = 400) => {
  logger.error(errorMessage);
  return res.json({
    success: false,
    data: null,
    error: { status, message: errorMessage }
  });
};
module.exports = errorHandler;
