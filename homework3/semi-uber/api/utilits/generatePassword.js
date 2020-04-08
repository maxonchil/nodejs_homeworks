const generator = require("generate-password");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { USER_LOGS } = require("../../data/usersData.json");

const generatePassword = () => {
  logger.info(USER_LOGS.PASSWORD_GEN);
  return generator.generate({
    length: 7,
    numbers: true,
    symbols: true,
    uppercase: true,
  });
};
module.exports = generatePassword;
