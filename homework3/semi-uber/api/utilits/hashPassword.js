const bcrypt = require("bcrypt");
const config = require("config");
const saltRounds = Number(config.get("saltRounds"));

const hashPassword = (password) => {
  try {
    return bcrypt.hash(password, saltRounds);
  } catch (error) {
    return null;
  }
};
module.exports = hashPassword;
