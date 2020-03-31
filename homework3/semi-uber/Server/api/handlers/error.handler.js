const log4js = require("log4js");
const logger = log4js.getLogger();

const errorHandler = (errorMessage, res) => {
  logger.error(errorMessage);
  return res.json({
    success: false,
    data: null,
    error: { code: 400, message: errorMessage }
  });
};
module.exports = errorHandler;
