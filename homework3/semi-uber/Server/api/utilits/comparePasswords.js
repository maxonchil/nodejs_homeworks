const bcrypt = require("bcrypt");
const comparePasswords = (curentPassword, comparedPassword) => {
  try {
    return bcrypt.compare(curentPassword, comparedPassword);
  } catch (error) {
    return null;
  }
};
module.exports = comparePasswords;
