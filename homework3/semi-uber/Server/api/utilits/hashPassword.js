const bcrypt = require("bcrypt");

const hashPassword = (password, saltRounds) => {
  try {
    return bcrypt.hash(password, saltRounds);
  } catch (error) {
    return null;
  }
};
module.exports = hashPassword;
