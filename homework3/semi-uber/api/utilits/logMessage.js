const logMessage = message => {
  return { message, time: new Date().getTime() };
};
module.exports = logMessage;
