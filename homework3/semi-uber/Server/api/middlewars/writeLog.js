const fs = require("fs");
const config = require("config");
const { logsPath } = config.get("webServer");
const defaultDataStructure = {
  logs: []
};

const readFile = (filePath, encode) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, encode));
  }
  fs.writeFileSync(filePath, JSON.stringify(defaultDataStructure));
  return defaultDataStructure;
};

const updateFile = (filePath, logs) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify({ logs }));
  } catch (err) {
    console.error(err);
    throw err;
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
  logs.push(newLog);
  updateFile(logsPath, logs);
  next();
};
module.exports = writeLog;
