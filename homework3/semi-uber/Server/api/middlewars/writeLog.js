const fs = require("fs");
const config = require("config");
const log4js = require("log4js");
const logger = log4js.getLogger();

const { logsPath } = config.get("webServer");
const defaultDataStructure = {
  logs: []
};

logger.level = "info";

const readFile = (filePath, encode) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, encode));
  }
  fs.writeFileSync(filePath, JSON.stringify(defaultDataStructure));
  return defaultDataStructure;
};

const updateData = (newData, filePath, logs) => {
  try {
    logs.push(newData);
    logger.info(newData);
    fs.writeFileSync(filePath, JSON.stringify({ logs }));
  } catch (err) {
    console.error(err.name);
    return;
  }
};

const writeLog = (req, res, next) => {
  const { url, method } = req;
  const newLog = {
    url,
    method,
    time: new Date().getTime()
  };
  const { logs } = readFile(logsPath, "utf8");
  updateData(newLog, logsPath, logs);
  next();
};
module.exports = writeLog;
