const fs = require("fs");
const config = require("config");
const log4js = require("log4js");
const logger = log4js.getLogger();
const errorHandler = require("../handlers/error.handler");
const { logsPath } = config.get("webServer");
const {
  LOGGER,
  CHARSET,
  DEFAULT_STRUCTURE,
  LOGS
} = require("../../data/logData.json");

logger.level = LOGGER.LEVEL;

const readFile = (filePath, encode) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, encode));
  }
  fs.writeFileSync(filePath, JSON.stringify(DEFAULT_STRUCTURE));
  return DEFAULT_STRUCTURE;
};

const updateData = (newData, filePath, logs) => {
  try {
    logs.push(newData);
    logger.info(newData);
    fs.writeFileSync(filePath, JSON.stringify({ logs }));
  } catch (error) {
    return null;
  }
};

const writeLog = (req, res, next) => {
  const { url, method } = req;
  const newLog = {
    url,
    method,
    time: new Date().getTime()
  };
  const { logs } = readFile(logsPath, CHARSET);
  const updatedData = updateData(newLog, logsPath, logs);
  if (updatedData === null) {
    return errorHandler(LOGS.ERROR_LOG, res);
  }
  next();
};
module.exports = writeLog;
